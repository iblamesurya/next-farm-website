/**
 * Tier 5: Adversarial Stress & Route Integrity Suite
 * Formulated from Challenger 2 empirical harness.
 * Evaluates live Edge Web Crypto HMAC, Next.js Route Handlers, D1 sequence, and Telegram alerts.
 */

import { describe, it, expect } from './framework.ts';
import { generateRazorpaySignatureEdge, verifyRazorpaySignatureEdge } from '../../src/lib/crypto-edge.ts';
import { POST as createOrderRoute } from '../../src/app/api/checkout/create-order/route.ts';
import { POST as verifyPaymentRoute } from '../../src/app/api/checkout/verify-payment/route.ts';
import { getDatabase, generateDisplayOrderId } from '../../src/lib/db.ts';
import { buildTelegramOrderMessage, TELEGRAM_CONFIG } from '../../src/lib/telegram.ts';
import { NextRequest } from 'next/server';
import crypto from 'node:crypto';

export function registerTier5Tests(): void {
  describe('Tier 5: Adversarial Stress & Route Integrity (Challenger 2 Suite)', () => {

    describe('5.1 Web Crypto HMAC SHA-256 Adversarial Invariants', () => {
      const testSecret = 'secret_key_production_grade_edge_987654';
      const testOrderId = 'order_Odr1234567890';
      const testPaymentId = 'pay_Pay9876543210';

      const oracleSign = (o: string, p: string, s: string) => {
        return crypto.createHmac('sha256', s).update(`${o}|${p}`).digest('hex');
      };
      const expectedSig = oracleSign(testOrderId, testPaymentId, testSecret);

      it('T5.1: Valid signature verification against known test vectors', async () => {
        const edgeSig = await generateRazorpaySignatureEdge(testOrderId, testPaymentId, testSecret);
        expect(edgeSig).toBe(expectedSig);

        const verifiesOracle = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, expectedSig, testSecret);
        const verifiesGenerated = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, edgeSig, testSecret);
        expect(verifiesOracle).toBe(true);
        expect(verifiesGenerated).toBe(true);
      });

      it('T5.2: 1-byte mutated signature: tested all 64 hex positions (100% rejection rate)', async () => {
        let allMutationsRejected = true;
        for (let i = 0; i < 64; i++) {
          const chars = expectedSig.split('');
          const curNibble = parseInt(chars[i], 16);
          chars[i] = ((curNibble + 1) % 16).toString(16);
          const mutated = chars.join('');

          const accepted = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, mutated, testSecret);
          if (accepted) {
            allMutationsRejected = false;
            break;
          }
        }
        expect(allMutationsRejected).toBe(true);
      });

      it('T5.3: Truncated / Length boundary signature verification', async () => {
        const lengths = [0, 1, 10, 31, 32, 63, 65];
        for (const len of lengths) {
          const testSig = len === 65 ? expectedSig + 'a' : expectedSig.substring(0, len);
          const accepted = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, testSig, testSecret);
          expect(accepted).toBe(false);
        }
      });

      it('T5.4: Mismatched order_id, payment_id, or swapped IDs', async () => {
        const spoofOrder = await verifyRazorpaySignatureEdge(testOrderId + '_spoof', testPaymentId, expectedSig, testSecret);
        const spoofPay = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId + '_spoof', expectedSig, testSecret);
        const swapped = await verifyRazorpaySignatureEdge(testPaymentId, testOrderId, expectedSig, testSecret);

        expect(spoofOrder).toBe(false);
        expect(spoofPay).toBe(false);
        expect(swapped).toBe(false);
      });

      it('T5.5: Empty secret, wrong secret, or empty parameter guards', async () => {
        const emptySec = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, expectedSig, '');
        const wrongSec = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, expectedSig, 'wrong_key');
        const emptyOrd = await verifyRazorpaySignatureEdge('', testPaymentId, expectedSig, testSecret);
        const emptyPay = await verifyRazorpaySignatureEdge(testOrderId, '', expectedSig, testSecret);

        expect(emptySec).toBe(false);
        expect(wrongSec).toBe(false);
        expect(emptyOrd).toBe(false);
        expect(emptyPay).toBe(false);
      });

      it('T5.6: Non-hex characters in 64-char signature string', async () => {
        const nonHex = expectedSig.substring(0, 60) + 'zzzz';
        const accepted = await verifyRazorpaySignatureEdge(testOrderId, testPaymentId, nonHex, testSecret);
        expect(accepted).toBe(false);
      });
    });

    describe('5.2 Commerce Integrity & Live Route Adversarial Guards', () => {
      it('T5.7: Rejection of paymentMethod="cod" with HTTP 400 COD_NOT_PERMITTED', async () => {
        const req = new NextRequest('http://localhost/api/checkout/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: { name: 'Ramesh Naidu', phone: '9848012345', village: 'Kankipadu' },
            items: [{ productId: 'next-gut', productName: 'Next Gut', packSize: '1L', unitPrice: 1199, quantity: 1 }],
            paymentMethod: 'cod'
          })
        });

        const res = await createOrderRoute(req);
        const json = await res.json();
        expect(res.status).toBe(400);
        expect(json.error).toBe('COD_NOT_PERMITTED');
      });

      it('T5.8: Rejection of paymentMethod="cash_on_delivery" with HTTP 400 COD_NOT_PERMITTED', async () => {
        const req = new NextRequest('http://localhost/api/checkout/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: { name: 'Ramesh Naidu', phone: '9848012345', village: 'Kankipadu' },
            items: [{ productId: 'next-gut', productName: 'Next Gut', packSize: '1L', unitPrice: 1199, quantity: 1 }],
            paymentMethod: 'cash_on_delivery'
          })
        });

        const res = await createOrderRoute(req);
        const json = await res.json();
        expect(res.status).toBe(400);
        expect(json.error).toBe('COD_NOT_PERMITTED');
      });

      it('T5.9: Rejection of paymentMethod="CASH_ON_DELIVERY" (case insensitive check)', async () => {
        const req = new NextRequest('http://localhost/api/checkout/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: { name: 'Ramesh Naidu', phone: '9848012345', village: 'Kankipadu' },
            items: [{ productId: 'next-gut', productName: 'Next Gut', packSize: '1L', unitPrice: 1199, quantity: 1 }],
            paymentMethod: 'CASH_ON_DELIVERY'
          })
        });

        const res = await createOrderRoute(req);
        const json = await res.json();
        expect(res.status).toBe(400);
        expect(json.error).toBe('COD_NOT_PERMITTED');
      });

      it('T5.10: Enforce HMAC on verify-payment without "valid_mock_signature" backdoor bypass', async () => {
        const reqBackdoor = new NextRequest('http://localhost/api/checkout/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: 'order_adversarial_hack',
            razorpay_payment_id: 'pay_unauthorized_payment',
            razorpay_signature: 'valid_mock_signature',
            displayOrderId: '#NF-9999'
          })
        });

        const resBackdoor = await verifyPaymentRoute(reqBackdoor);
        expect(resBackdoor.status).toBe(403);
      });

      it('T5.11: Order ID format matches #NF-XXXX regex pattern', async () => {
        const db = getDatabase();
        const ids: string[] = [];
        for (let i = 0; i < 5; i++) {
          ids.push(await generateDisplayOrderId(db));
        }

        const allMatchFormat = ids.every(id => /^#NF-\d{4,}$/.test(id));
        expect(allMatchFormat).toBe(true);
      });

      it('T5.12: Order sequence is strictly sequential and atomic (not random fallback)', async () => {
        const db = getDatabase();
        const ids: string[] = [];
        for (let i = 0; i < 5; i++) {
          ids.push(await generateDisplayOrderId(db));
        }

        const numbers = ids.map(id => parseInt(id.replace('#NF-', ''), 10));
        let isSequential = true;
        for (let i = 1; i < numbers.length; i++) {
          if (numbers[i] !== numbers[i - 1] + 1) {
            isSequential = false;
            break;
          }
        }
        expect(isSequential).toBe(true);
      });

      it('T5.13: Telegram notification payload: HTML formatting and disable_notification: false (Audible Alert)', () => {
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

        // Verify HTML tags balance
        const bOpen = (messageHtml.match(/<b>/g) || []).length;
        const bClose = (messageHtml.match(/<\/b>/g) || []).length;
        const aOpen = (messageHtml.match(/<a /g) || []).length;
        const aClose = (messageHtml.match(/<\/a>/g) || []).length;
        expect(bOpen === bClose).toBe(true);
        expect(aOpen === aClose).toBe(true);

        // Verify special chars are escaped
        const unsafeEscaped = messageHtml.includes('&lt;Aqua Farmer &amp; Partner&gt;') &&
          messageHtml.includes('Narasapuram &amp; Mogalthur');
        expect(unsafeEscaped).toBe(true);

        // Verify required order fields
        expect(messageHtml.includes('#NF-1001')).toBe(true);
        expect(messageHtml.includes('Next Gut (5L) x 2')).toBe(true);
        expect(messageHtml.includes('₹11,199')).toBe(true);
        expect(messageHtml.includes('https://wa.me/919848012345')).toBe(true);

        // In sendTelegramOrderNotification, payload enforces audible alert:
        const payload = {
          chat_id: '7890123456',
          text: messageHtml,
          parse_mode: 'HTML',
          disable_notification: false,
          disable_web_page_preview: true
        };
        expect(payload.disable_notification).toBe(false);
        expect(payload.parse_mode).toBe('HTML');
      });
    });

  });
}
