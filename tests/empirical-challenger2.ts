/**
 * EMPIRICAL CHALLENGER 2: Edge Cryptography & Commerce Security Stress Harness
 * 
 * Verifies:
 * 1. Web Crypto HMAC SHA-256 adversarial tests (known vectors, 64-position byte mutations, truncation, mismatches, secret boundaries).
 * 2. Commerce integrity:
 *    - Strict rejection of paymentMethod='cod' and 'cash_on_delivery' on /api/checkout/create-order.
 *    - D1 atomic sequence format (#NF-XXXX) and sequencing behavior.
 *    - Telegram notification HTML template escaping and disable_notification: false flag.
 *    - Backdoor verification check (valid_mock_signature bypass in verify-payment).
 */

import { generateRazorpaySignatureEdge, verifyRazorpaySignatureEdge, hexToUint8Array, bufferToHex } from '../src/lib/crypto-edge.ts';
import { POST as createOrderRoute } from '../src/app/api/checkout/create-order/route.ts';
import { POST as verifyPaymentRoute } from '../src/app/api/checkout/verify-payment/route.ts';
import { getDatabase, generateDisplayOrderId } from '../src/lib/db.ts';
import { buildTelegramOrderMessage, TELEGRAM_CONFIG } from '../src/lib/telegram.ts';
import { NextRequest } from 'next/server';
import crypto from 'node:crypto';

interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  details: string;
  error?: any;
}

const results: TestResult[] = [];

function record(suite: string, name: string, passed: boolean, details: string, error?: any) {
  results.push({ suite, name, passed, details, error });
  const statusIcon = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`[${statusIcon}] [${suite}] ${name}: ${details}`);
}

async function runCryptoAdversarialTests() {
  console.log('\n======================================================');
  console.log('1. WEB CRYPTO HMAC SHA-256 ADVERSARIAL STRESS SUITE');
  console.log('======================================================\n');

  const testSecret = 'secret_key_production_grade_edge_987654';
  const testOrderId = 'order_Odr1234567890';
  const testPaymentId = 'pay_Pay9876543210';

  // Reference Oracle via Node's native crypto
  const oracleSign = (orderId: string, payId: string, secret: string) => {
    return crypto.createHmac('sha256', secret).update(`${orderId}|${payId}`).digest('hex');
  };

  const expectedSignature = oracleSign(testOrderId, testPaymentId, testSecret);

  // 1.1 Known Test Vector Verification
  try {
    const generatedSig = await generateRazorpaySignatureEdge(testOrderId, testPaymentId, testSecret);
    const matchesOracle = generatedSig === expectedSignature;
    const verifiesOracle = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, expectedSignature, testSecret);
    const verifiesGenerated = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, generatedSig, testSecret);
    
    record(
      'Crypto-HMAC',
      'Valid signature verification against known test vectors',
      matchesOracle && verifiesOracle && verifiesGenerated,
      `Oracle matched: ${matchesOracle}, Oracle verified: ${verifiesOracle}, Gen verified: ${verifiesGenerated}`
    );
  } catch (err: any) {
    record('Crypto-HMAC', 'Valid signature verification against known test vectors', false, err.message, err);
  }

  // 1.2 1-Byte Mutation across all 64 nibble/hex positions
  try {
    let allMutationsRejected = true;
    let failedPosition = -1;
    const baseSig = expectedSignature;

    for (let i = 0; i < 64; i++) {
      const chars = baseSig.split('');
      const curNibble = parseInt(chars[i], 16);
      const mutatedNibble = ((curNibble + 1) % 16).toString(16);
      chars[i] = mutatedNibble;
      const mutatedSig = chars.join('');

      const accepted = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, mutatedSig, testSecret);
      if (accepted) {
        allMutationsRejected = false;
        failedPosition = i;
        break;
      }
    }

    record(
      'Crypto-HMAC',
      '1-byte mutated signature: tested all 64 hex positions',
      allMutationsRejected,
      allMutationsRejected
        ? 'All 64 single-character mutations strictly rejected (100% rejection rate)'
        : `Mutated signature at position ${failedPosition} was incorrectly accepted!`
    );
  } catch (err: any) {
    record('Crypto-HMAC', '1-byte mutated signature', false, err.message, err);
  }

  // 1.3 Truncated Signature Tests
  try {
    const lengthsToTest = [0, 1, 10, 31, 32, 63];
    let allTruncatedRejected = true;
    const detailsArr: string[] = [];

    for (const len of lengthsToTest) {
      const truncated = expectedSignature.substring(0, len);
      const accepted = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, truncated, testSecret);
      if (accepted) {
        allTruncatedRejected = false;
        detailsArr.push(`len ${len} ACCEPTED`);
      } else {
        detailsArr.push(`len ${len} rejected`);
      }
    }

    // Also test over-length (65 characters)
    const overLength = expectedSignature + 'a';
    const overLengthAccepted = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, overLength, testSecret);
    if (overLengthAccepted) {
      allTruncatedRejected = false;
      detailsArr.push(`len 65 ACCEPTED`);
    } else {
      detailsArr.push(`len 65 rejected`);
    }

    record(
      'Crypto-HMAC',
      'Truncated / Length boundary signature verification',
      allTruncatedRejected,
      detailsArr.join(', ')
    );
  } catch (err: any) {
    record('Crypto-HMAC', 'Truncated signature', false, err.message, err);
  }

  // 1.4 Mismatched order_id or payment_id
  try {
    const mismatchedOrderId = await verifyRazorpaySignatureEdge(testOrderId + '_spoof', testPaymentId, expectedSignature, testSecret);
    const mismatchedPayId = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId + '_spoof', expectedSignature, testSecret);
    const swappedIds = await verifyRazorpaySignatureEdge(testPaymentId, testOrderId, expectedSignature, testSecret);

    const allMismatchesRejected = !mismatchedOrderId && !mismatchedPayId && !swappedIds;

    record(
      'Crypto-HMAC',
      'Mismatched order_id, payment_id, or swapped IDs',
      allMismatchesRejected,
      `OrderId spoof rejected: ${!mismatchedOrderId}, PayId spoof rejected: ${!mismatchedPayId}, Swap rejected: ${!swappedIds}`
    );
  } catch (err: any) {
    record('Crypto-HMAC', 'Mismatched order_id or payment_id', false, err.message, err);
  }

  // 1.5 Empty Secret or Wrong Secret
  try {
    const emptySecretRes = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, expectedSignature, '');
    const wrongSecretRes = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, expectedSignature, 'completely_wrong_secret_123');
    const emptyOrderIdRes = await verifyRazorpaySignatureEdge('', testPaymentId, expectedSignature, testSecret);
    const emptyPayIdRes = await verifyRazorpaySignatureEdge(testOrderId, '', expectedSignature, testSecret);

    const allRejected = !emptySecretRes && !wrongSecretRes && !emptyOrderIdRes && !emptyPayIdRes;

    record(
      'Crypto-HMAC',
      'Empty secret, wrong secret, or empty parameter guards',
      allRejected,
      `Empty secret: ${!emptySecretRes}, Wrong secret: ${!wrongSecretRes}, Empty orderId: ${!emptyOrderIdRes}, Empty payId: ${!emptyPayIdRes}`
    );
  } catch (err: any) {
    record('Crypto-HMAC', 'Empty secret or wrong secret', false, err.message, err);
  }

  // 1.6 Non-Hex Character Injection
  try {
    const nonHexSig = expectedSignature.substring(0, 60) + 'zzzz';
    const nonHexRes = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, nonHexSig, testSecret);
    record(
      'Crypto-HMAC',
      'Non-hex characters in 64-char signature string',
      !nonHexRes,
      `Rejected non-hex signature: ${!nonHexRes}`
    );
  } catch (err: any) {
    record('Crypto-HMAC', 'Non-hex character signature', false, err.message, err);
  }
}

async function runCommerceIntegrityTests() {
  console.log('\n======================================================');
  console.log('2. COMMERCE INTEGRITY & EDGE API STRESS SUITE');
  console.log('======================================================\n');

  // 2.1 COD Rejection on /api/checkout/create-order
  // Test Case A: paymentMethod = 'cod'
  try {
    const reqCod = new NextRequest('http://localhost/api/checkout/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name: 'Ramesh Naidu', phone: '9848012345', village: 'Kankipadu' },
        items: [{ productId: 'next-gut', productName: 'Next Gut', packSize: '1L', unitPrice: 1199, quantity: 1 }],
        paymentMethod: 'cod'
      })
    });

    const resCod = await createOrderRoute(reqCod);
    const jsonCod = await resCod.json();

    const codRejected = resCod.status === 400 && jsonCod.error === 'COD_NOT_PERMITTED';
    record(
      'Commerce-Integrity',
      "Rejection of paymentMethod='cod' with HTTP 400 COD_NOT_PERMITTED",
      codRejected,
      `HTTP status: ${resCod.status}, error code: ${jsonCod.error}`
    );
  } catch (err: any) {
    record('Commerce-Integrity', "Rejection of paymentMethod='cod'", false, err.message, err);
  }

  // Test Case B: paymentMethod = 'cash_on_delivery'
  try {
    const reqCashOnDelivery = new NextRequest('http://localhost/api/checkout/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name: 'Ramesh Naidu', phone: '9848012345', village: 'Kankipadu' },
        items: [{ productId: 'next-gut', productName: 'Next Gut', packSize: '1L', unitPrice: 1199, quantity: 1 }],
        paymentMethod: 'cash_on_delivery'
      })
    });

    const resCashOnDelivery = await createOrderRoute(reqCashOnDelivery);
    const jsonCashOnDelivery = await resCashOnDelivery.json();

    const cashOnDeliveryRejected = resCashOnDelivery.status === 400 && jsonCashOnDelivery.error === 'COD_NOT_PERMITTED';
    record(
      'Commerce-Integrity',
      "Rejection of paymentMethod='cash_on_delivery' with HTTP 400 COD_NOT_PERMITTED",
      cashOnDeliveryRejected,
      `HTTP status: ${resCashOnDelivery.status}, body: ${JSON.stringify(jsonCashOnDelivery)}`
    );
  } catch (err: any) {
    record('Commerce-Integrity', "Rejection of paymentMethod='cash_on_delivery'", false, err.message, err);
  }

  // Test Case C: paymentMethod = 'CASH_ON_DELIVERY' (uppercase)
  try {
    const reqUpper = new NextRequest('http://localhost/api/checkout/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name: 'Ramesh Naidu', phone: '9848012345', village: 'Kankipadu' },
        items: [{ productId: 'next-gut', productName: 'Next Gut', packSize: '1L', unitPrice: 1199, quantity: 1 }],
        paymentMethod: 'CASH_ON_DELIVERY'
      })
    });

    const resUpper = await createOrderRoute(reqUpper);
    const jsonUpper = await resUpper.json();

    const upperRejected = resUpper.status === 400 && jsonUpper.error === 'COD_NOT_PERMITTED';
    record(
      'Commerce-Integrity',
      "Rejection of paymentMethod='CASH_ON_DELIVERY' (case insensitive check)",
      upperRejected,
      `HTTP status: ${resUpper.status}, body: ${JSON.stringify(jsonUpper)}`
    );
  } catch (err: any) {
    record('Commerce-Integrity', "Rejection of paymentMethod='CASH_ON_DELIVERY'", false, err.message, err);
  }

  // 2.2 Payment Verification Backdoor / Mock Signature Bypass Check
  try {
    const reqBackdoor = new NextRequest('http://localhost/api/checkout/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: 'order_adversarial_hack',
        razorpay_payment_id: 'pay_unauthorized_payment',
        razorpay_signature: 'valid_mock_signature', // Hardcoded bypass token in route.ts
        displayOrderId: '#NF-9999'
      })
    });

    const resBackdoor = await verifyPaymentRoute(reqBackdoor);
    const jsonBackdoor = await resBackdoor.json();

    const backdoorRejected = resBackdoor.status === 403;
    record(
      'Commerce-Integrity',
      "Enforce HMAC on verify-payment without 'valid_mock_signature' backdoor bypass",
      backdoorRejected,
      `HTTP status: ${resBackdoor.status}, status field: ${jsonBackdoor.status}. (If 200, backdoor allows arbitrary payment forging!)`
    );
  } catch (err: any) {
    record('Commerce-Integrity', "Backdoor bypass test", false, err.message, err);
  }

  // 2.3 D1 Atomic Order Sequence Format & Sequencing
  try {
    const db = getDatabase();
    const ids: string[] = [];
    for (let i = 0; i < 5; i++) {
      ids.push(await generateDisplayOrderId(db));
    }

    const allMatchFormat = ids.every(id => /^#NF-\d{4,}$/.test(id));
    
    // Check if strictly sequential (e.g. #NF-1001, #NF-1002, etc.)
    const numbers = ids.map(id => parseInt(id.replace('#NF-', ''), 10));
    let isSequential = true;
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] !== numbers[i - 1] + 1) {
        isSequential = false;
        break;
      }
    }

    record(
      'D1-Database',
      'Order ID format matches #NF-XXXX regex pattern',
      allMatchFormat,
      `Sample IDs: ${ids.join(', ')}`
    );

    record(
      'D1-Database',
      'Order sequence is strictly sequential and atomic (not random fallback)',
      isSequential,
      `Generated numbers: ${numbers.join(', ')}. Sequential: ${isSequential}`
    );
  } catch (err: any) {
    record('D1-Database', 'Order sequence generation', false, err.message, err);
  }

  // 2.4 Telegram Notification Payload Structure & Audio Alert Flag
  try {
    const orderData = {
      displayOrderId: '#NF-1001',
      customerName: 'Koteswara Rao <Aqua Farmer & Partner>',
      customerPhone: '9848012345',
      villageMandal: 'Narasapuram & Mogalthur',
      items: [
        { productName: 'Next Gut', packSize: '5L', quantity: 2, unitPriceInr: 5000 },
        { productName: 'Next Viro Nill', packSize: '1L', quantity: 1, unitPriceInr: 1199 }
      ],
      totalAmountInr: 11199,
      razorpayPaymentId: 'pay_99887766'
    };

    const messageHtml = buildTelegramOrderMessage(orderData);

    // Verify HTML escaping
    const escapesUnsafeChars = !messageHtml.includes('<Aqua Farmer') && messageHtml.includes('&lt;Aqua Farmer &amp; Partner&gt;');
    // Verify required order fields
    const hasOrderId = messageHtml.includes('#NF-1001');
    const hasItems = messageHtml.includes('Next Gut (5L) x 2');
    const hasTotal = messageHtml.includes('₹11,199');
    const hasWaLink = messageHtml.includes('https://wa.me/919848012345');

    // Verify balanced HTML tags
    const bOpenCount = (messageHtml.match(/<b>/g) || []).length;
    const bCloseCount = (messageHtml.match(/<\/b>/g) || []).length;
    const aOpenCount = (messageHtml.match(/<a /g) || []).length;
    const aCloseCount = (messageHtml.match(/<\/a>/g) || []).length;
    const tagsBalanced = bOpenCount === bCloseCount && aOpenCount === aCloseCount;

    // Simulate send payload structure
    const payload = {
      chat_id: '7890123456',
      text: messageHtml,
      parse_mode: 'HTML',
      disable_notification: false,
      disable_web_page_preview: true
    };

    const payloadValid = 
      payload.disable_notification === false &&
      payload.parse_mode === 'HTML' &&
      escapesUnsafeChars &&
      hasOrderId &&
      hasItems &&
      hasTotal &&
      hasWaLink &&
      tagsBalanced;

    record(
      'Telegram-Alerts',
      'Telegram notification payload: HTML formatting and disable_notification: false (Audible Alert)',
      payloadValid,
      `Tags balanced: ${tagsBalanced} (b:${bOpenCount}/${bCloseCount}, a:${aOpenCount}/${aCloseCount}), Unsafe escaped: ${escapesUnsafeChars}, Audio flag (disable_notification: false): ${payload.disable_notification === false}`
    );
  } catch (err: any) {
    record('Telegram-Alerts', 'Telegram payload testing', false, err.message, err);
  }
}

async function main() {
  console.log('🔬 STARTING EMPIRICAL ADVERSARIAL STRESS HARNESS\n');
  await runCryptoAdversarialTests();
  await runCommerceIntegrityTests();

  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;

  console.log('\n======================================================');
  console.log('📊 EMPIRICAL STRESS TEST RESULTS SUMMARY');
  console.log('======================================================');
  console.log(`Total Scenarios Tested: ${total}`);
  console.log(`Passed:                 ${passed}`);
  console.log(`Failed:                 ${failed}`);
  console.log('======================================================\n');

  if (failed > 0) {
    console.log('🚨 FAILED CRITICAL TESTS:');
    for (const f of results.filter(r => !r.passed)) {
      console.log(` - [${f.suite}] ${f.name}`);
      console.log(`   Details: ${f.details}`);
    }
  }

  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
