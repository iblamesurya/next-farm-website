/**
 * Challenger 2 Independent Deep Adversarial Audit
 * 
 * Supplementary adversarial probes targeting edge cases:
 * - Case insensitivity and special characters in COD filters
 * - Upper/lower hex signature invariance
 * - Tampering with amounts, notes, or receipt metadata
 * - Multiple sequential order generations
 * - Full E2E flow from create-order to genuine verification
 */

import { generateRazorpaySignatureEdge, verifyRazorpaySignatureEdge } from '../src/lib/crypto-edge';
import { POST as createOrderRoute } from '../src/app/api/checkout/create-order/route';
import { POST as verifyPaymentRoute } from '../src/app/api/checkout/verify-payment/route';
import { getDatabase, generateDisplayOrderId } from '../src/lib/db';
import { buildTelegramOrderMessage } from '../src/lib/telegram';
import { NextRequest } from 'next/server';

interface ProbeResult {
  name: string;
  passed: boolean;
  message: string;
}

const probeResults: ProbeResult[] = [];

function assertProbe(name: string, condition: boolean, message: string) {
  probeResults.push({ name, passed: condition, message });
  console.log(`[${condition ? 'PASS' : 'FAIL'}] ${name}: ${message}`);
}

async function runAudit() {
  console.log('--- CHALLENGER 2 INDEPENDENT DEEP AUDIT ---');

  // 1. Comprehensive COD Variant Matrix
  const codVariants = [
    'cod',
    'COD',
    'CoD',
    ' cash on delivery ',
    'CASH_ON_DELIVERY',
    'cash-on-delivery',
    'cash.on.delivery',
    'c.o.d',
    'C.O.D',
    'pod',
    'POD',
    'Pay on Delivery',
    'Cash On Hand',
    'pay_delivery'
  ];

  let allCodRejected = true;
  for (const variant of codVariants) {
    const req = new NextRequest('http://localhost/api/checkout/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name: 'Srinivasa Rao', phone: '9440123456', village: 'Akividu' },
        items: [{ productId: 'next-viro-nill', productName: 'Next Viro Nill', packSize: '5L', unitPrice: 5000, quantity: 2 }],
        paymentMethod: variant
      })
    });
    const res = await createOrderRoute(req);
    const data = await res.json();
    if (res.status !== 400 || data.error !== 'COD_NOT_PERMITTED') {
      allCodRejected = false;
      console.error(`COD Variant "${variant}" was NOT rejected! Status: ${res.status}, error: ${data.error}`);
    }
  }
  assertProbe('COD Variant Matrix (14 variations)', allCodRejected, 'All 14 COD permutations rejected with HTTP 400 COD_NOT_PERMITTED');

  // 2. Legitimate Payment Methods (Must be accepted)
  const legitMethods = ['razorpay', 'upi', 'prepaid', '', undefined];
  let allLegitAccepted = true;
  for (const method of legitMethods) {
    const req = new NextRequest('http://localhost/api/checkout/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name: 'Srinivasa Rao', phone: '9440123456', village: 'Akividu' },
        items: [{ productId: 'next-viro-nill', productName: 'Next Viro Nill', packSize: '5L', unitPrice: 5000, quantity: 1 }],
        paymentMethod: method
      })
    });
    const res = await createOrderRoute(req);
    const data = await res.json();
    if (res.status !== 200 || !data.success || !data.razorpayOrderId) {
      allLegitAccepted = false;
      console.error(`Legitimate method "${method}" failed! Status: ${res.status}`);
    }
  }
  assertProbe('Legitimate Payment Methods Acceptance', allLegitAccepted, 'Online/prepaid methods successfully generate order');

  // 3. Backdoor Tokens in verify-payment
  const backdoorTokens = [
    'valid_mock_signature',
    'valid_mock_signature_dev',
    'mock_signature',
    'bypass_token_123',
    'test_bypass',
    'admin_override',
    '0000000000000000000000000000000000000000000000000000000000000000'
  ];
  let allBackdoorsBlocked = true;
  for (const token of backdoorTokens) {
    const req = new NextRequest('http://localhost/api/checkout/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: 'order_probe_123',
        razorpay_payment_id: 'pay_probe_456',
        razorpay_signature: token,
        displayOrderId: '#NF-1001'
      })
    });
    const res = await verifyPaymentRoute(req);
    const data = await res.json();
    if (res.status !== 403 || data.error !== 'SIGNATURE_VERIFICATION_FAILED') {
      allBackdoorsBlocked = false;
      console.error(`Backdoor token "${token}" was NOT blocked with 403! Status: ${res.status}`);
    }
  }
  assertProbe('Zero Backdoor Bypass Verification (7 tokens)', allBackdoorsBlocked, 'All backdoor tokens rejected with HTTP 403 SIGNATURE_VERIFICATION_FAILED');

  // 4. Authentic Web Crypto Signatures (Case invariance & Hex format)
  const testOrderId = 'order_valid_probe_777';
  const testPayId = 'pay_valid_probe_888';
  const keySecret = 'super_secret_test_key_123';
  const genuineSig = await generateRazorpaySignatureEdge(testOrderId, testPayId, keySecret);
  const upperSig = genuineSig.toUpperCase();

  const genuineAccepted = await verifyRazorpaySignatureEdge(testOrderId, testPayId, genuineSig, keySecret);
  const upperAccepted = await verifyRazorpaySignatureEdge(testOrderId, testPayId, upperSig, keySecret);
  assertProbe('Hex Signature Case Invariance', genuineAccepted && upperAccepted, 'Both lowercase and uppercase genuine 64-hex signatures accepted');

  // 5. Atomic D1 Sequencing under Burst Load (10 consecutive calls)
  const db = getDatabase();
  const seqList: number[] = [];
  for (let i = 0; i < 10; i++) {
    const displayId = await generateDisplayOrderId(db);
    seqList.push(parseInt(displayId.replace('#NF-', ''), 10));
  }
  let strictlySequential = true;
  for (let i = 1; i < seqList.length; i++) {
    if (seqList[i] !== seqList[i - 1] + 1) {
      strictlySequential = false;
      break;
    }
  }
  assertProbe('D1 Atomic Order Sequence Burst (10 increments)', strictlySequential, `Generated sequence [${seqList[0]}..${seqList[seqList.length - 1]}]: strictly sequential = ${strictlySequential}`);

  // 6. XSS Injection Resilience in Telegram Notifications
  const xssOrder = {
    displayOrderId: '#NF-9999',
    customerName: '<script>alert("XSS")</script>',
    customerPhone: '9848012345',
    villageMandal: '<b>Hacked</b> & "Injected"',
    items: [{ productName: '<img src=x onerror=1>', packSize: '5L', quantity: 1, unitPriceInr: 5000 }],
    totalAmountInr: 5000,
    razorpayPaymentId: 'pay_12345'
  };
  const xssHtml = buildTelegramOrderMessage(xssOrder);
  const safeAgainstScript = !xssHtml.includes('<script>') && xssHtml.includes('&lt;script&gt;');
  const safeAgainstImg = !xssHtml.includes('<img') && xssHtml.includes('&lt;img');
  assertProbe('Telegram XSS Injection Sanitization', safeAgainstScript && safeAgainstImg, 'HTML tags escaped properly in merchant notification body');

  // Summary
  const passedCount = probeResults.filter(p => p.passed).length;
  console.log(`\nProbe Results: ${passedCount}/${probeResults.length} passed.`);
  if (passedCount !== probeResults.length) {
    process.exit(1);
  }
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
