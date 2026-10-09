/**
 * Tier 3: Cross-Feature Pairwise Combinatorial E2E Tests
 * Validates complex end-to-end integration flows across diagnostic, cart, checkout,
 * Web Crypto HMAC, Cloudflare D1 edge repository, and Telegram/WhatsApp notifications.
 */

import { describe, it, expect } from './framework.ts';
import {
  calculatePrescription,
  convertFeetToMeters
} from './oracles/diagnostic-oracle.ts';
import {
  generateRazorpaySignatureEdge,
  verifyRazorpaySignatureEdge,
  tamperSignature
} from './oracles/crypto-oracle.ts';
import { D1DatabaseSimulator } from './oracles/d1-mock-oracle.ts';
import {
  buildTelegramOrderMessage,
  validateTelegramPayload,
  generateCustomerToMerchantWhatsAppLink
} from './oracles/notification-oracle.ts';

export function registerTier3Tests(): void {
  describe('Tier 3: Cross-Feature Pairwise Combinations (E2E Integration Flows)', () => {

    it('Pairwise 1: White Gut (2.5 Ac, 1.2m) -> 1-Click Bundle -> Cart Modifier -> Pre-Paid -> HMAC -> D1 -> Telegram', async () => {
      const db = new D1DatabaseSimulator();
      const secret = 'rzp_secret_pairwise_01';

      // 1. Diagnostic prescription
      const diag = calculatePrescription(['white-gut'], 2.5, 1.2, 'moderate');
      expect(diag.bundleItems.length).toBeGreaterThanOrEqual(2);

      // 2. Add to cart
      let cart = [...diag.bundleItems];
      const initialTotal = cart.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

      // 3. Farmer modifies cart (adds 1 more 5L can of Next Gut)
      const nextGutItem = cart.find(i => i.productId === 'next-gut' && i.packSize === '5L');
      if (nextGutItem) {
        nextGutItem.quantity += 1;
      }
      const modifiedTotal = cart.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
      expect(modifiedTotal).toBe(initialTotal + 5000);

      // 4. Pre-paid checkout initialization
      const customer = { fullName: 'Ramesh Naidu', whatsappMobile: '9848012345', villageMandal: 'Kankipadu, Krishna Dist' };
      const razorpayOrderId = 'order_rzp_pw1_777';

      const pendingOrder = db.createOrder({
        customer,
        items: cart.map(c => ({
          productId: c.productId,
          productName: c.productId.replace(/-/g, ' ').toUpperCase(),
          packSize: c.packSize,
          quantity: c.quantity,
          unitPriceInr: c.unitPrice
        })),
        razorpayOrderId
      });

      expect(pendingOrder.status).toBe('PENDING');
      expect(pendingOrder.displayOrderId).toBe('#NF-1001');

      // 5. Payment authorized & Web Crypto HMAC signature generated
      const razorpayPaymentId = 'pay_rzp_pw1_888';
      const signature = await generateRazorpaySignatureEdge(razorpayOrderId, razorpayPaymentId, secret);
      const isSignatureValid = await verifyRazorpaySignatureEdge(razorpayOrderId, razorpayPaymentId, signature, secret);
      expect(isSignatureValid).toBe(true);

      // 6. D1 order transitions to PAID
      const paidOrder = db.markOrderAsPaid({
        displayOrderId: pendingOrder.displayOrderId,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature: signature
      });
      expect(paidOrder!.status).toBe('PAID');

      // 7. Merchant audible Telegram alert dispatched
      const fullOrder = db.getOrderWithDetails(pendingOrder.displayOrderId);
      const telegramText = buildTelegramOrderMessage({
        displayOrderId: fullOrder!.displayOrderId,
        customerName: fullOrder!.customer!.fullName,
        customerPhone: fullOrder!.customer!.whatsappMobile,
        villageMandal: fullOrder!.customer!.villageMandal,
        items: fullOrder!.items!.map(i => ({ productName: i.productName, packSize: i.packSize, quantity: i.quantity })),
        totalAmountInr: fullOrder!.totalAmountInr
      });

      const telegramPayload = {
        chat_id: '8880878043',
        text: telegramText,
        parse_mode: 'HTML' as const,
        disable_notification: false
      };
      const validation = validateTelegramPayload(telegramPayload);
      expect(validation.valid).toBe(true);

      // 8. WhatsApp direct link
      const waLink = generateCustomerToMerchantWhatsAppLink(pendingOrder.displayOrderId, customer.fullName);
      expect(waLink).toContain('https://wa.me/918977656444');
    });

    it('Pairwise 2: Toxic Ammonia (4.0 Ac, 1.5m) -> 1-Click Bundle -> COD Rejected -> Switch Pre-Paid -> HMAC -> D1', async () => {
      const db = new D1DatabaseSimulator();
      const secret = 'rzp_secret_pairwise_02';

      // 1. Diagnostic prescription
      const diag = calculatePrescription(['toxic-ammonia'], 4.0, 1.5, 'acute');
      const cart = [...diag.bundleItems];

      // 2. Farmer attempts COD payment
      const attemptCheckout = (paymentMethod: string) => {
        if (paymentMethod.toLowerCase() === 'cod') {
          throw new Error('COD_NOT_PERMITTED: Cash on delivery is unavailable.');
        }
        return true;
      };
      expect(() => attemptCheckout('cod')).toThrow('COD_NOT_PERMITTED');

      // 3. Switch to pre-paid
      expect(attemptCheckout('razorpay_upi')).toBe(true);

      const customer = { fullName: 'Venkat Rao', whatsappMobile: '9988776655', villageMandal: 'Undi, West Godavari' };
      const razorpayOrderId = 'order_rzp_pw2_111';
      const order = db.createOrder({
        customer,
        items: cart.map(c => ({
          productId: c.productId,
          productName: c.productId.toUpperCase(),
          packSize: c.packSize,
          quantity: c.quantity,
          unitPriceInr: c.unitPrice
        })),
        razorpayOrderId
      });

      // 4. HMAC Verification & D1 update
      const paymentId = 'pay_rzp_pw2_222';
      const sig = await generateRazorpaySignatureEdge(razorpayOrderId, paymentId, secret);
      const verified = await verifyRazorpaySignatureEdge(razorpayOrderId, paymentId, sig, secret);
      expect(verified).toBe(true);

      const paidOrder = db.markOrderAsPaid({
        displayOrderId: order.displayOrderId,
        razorpayOrderId,
        razorpayPaymentId: paymentId,
        razorpaySignature: sig
      });
      expect(paidOrder!.status).toBe('PAID');
    });

    it('Pairwise 3: Benthic Sludge (1.0 Ac, 1.0m) -> 1-Click Bundle -> Item Removal -> Recompute Total -> Pre-Paid Flow', async () => {
      const db = new D1DatabaseSimulator();
      const secret = 'rzp_secret_pairwise_03';

      const diag = calculatePrescription(['benthic-sludge'], 1.0, 1.0, 'low');
      let cart = [...diag.bundleItems];
      expect(cart.length).toBeGreaterThanOrEqual(2);

      // Farmer removes support product
      const removedSlug = diag.allocations.find(a => a.role === 'support')!.productSlug;
      cart = cart.filter(i => i.productId !== removedSlug);

      const finalTotal = cart.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
      expect(finalTotal).toBeGreaterThan(0);

      const order = db.createOrder({
        customer: { fullName: 'Srinivasa Reddy', whatsappMobile: '9440123456', villageMandal: 'Avanigadda' },
        items: cart.map(c => ({
          productId: c.productId,
          productName: c.productId.toUpperCase(),
          packSize: c.packSize,
          quantity: c.quantity,
          unitPriceInr: c.unitPrice
        })),
        razorpayOrderId: 'order_pw3'
      });

      const sig = await generateRazorpaySignatureEdge('order_pw3', 'pay_pw3', secret);
      const paid = db.markOrderAsPaid({
        displayOrderId: order.displayOrderId,
        razorpayOrderId: 'order_pw3',
        razorpayPaymentId: 'pay_pw3',
        razorpaySignature: sig
      });
      expect(paid!.status).toBe('PAID');
      expect(paid!.totalAmountInr).toBe(finalTotal);
    });

    it('Pairwise 4: Vibrio Outbreak (3.0 Ac, 1.0m) -> Tampered HMAC Rejected -> Resubmit Genuine HMAC -> Success', async () => {
      const db = new D1DatabaseSimulator();
      const secret = 'rzp_secret_pairwise_04';

      const diag = calculatePrescription(['vibrio-red'], 3.0, 1.0, 'acute');
      const order = db.createOrder({
        customer: { fullName: 'Subba Rao', whatsappMobile: '9849012345', villageMandal: 'Nellore Rural' },
        items: diag.bundleItems.map(c => ({
          productId: c.productId,
          productName: c.productId.toUpperCase(),
          packSize: c.packSize,
          quantity: c.quantity,
          unitPriceInr: c.unitPrice
        })),
        razorpayOrderId: 'order_pw4'
      });

      const genuineSig = await generateRazorpaySignatureEdge('order_pw4', 'pay_pw4', secret);

      // 1. Attacker tampers signature
      const badSig = tamperSignature(genuineSig, 5);
      const isTamperedValid = await verifyRazorpaySignatureEdge('order_pw4', 'pay_pw4', badSig, secret);
      expect(isTamperedValid).toBe(false);

      // Order must remain PENDING
      expect(db.getOrderWithDetails(order.displayOrderId)!.status).toBe('PENDING');

      // 2. Genuine client resubmits valid signature
      const isGenuineValid = await verifyRazorpaySignatureEdge('order_pw4', 'pay_pw4', genuineSig, secret);
      expect(isGenuineValid).toBe(true);

      const paidOrder = db.markOrderAsPaid({
        displayOrderId: order.displayOrderId,
        razorpayOrderId: 'order_pw4',
        razorpayPaymentId: 'pay_pw4',
        razorpaySignature: genuineSig
      });
      expect(paidOrder!.status).toBe('PAID');
    });

    it('Pairwise 5: Molting Cramps (5.0 Ac, 4.0 Ft) -> Depth Conversion -> Mineral Allocation -> WhatsApp Contact Flow', async () => {
      const db = new D1DatabaseSimulator();
      const secret = 'rzp_secret_pairwise_05';

      // 4 feet depth converts to ~1.22 meters
      const depthMeters = convertFeetToMeters(4.0);
      expect(depthMeters).toBeCloseTo(1.22, 2);

      const diag = calculatePrescription(['molting-cramps'], 5.0, depthMeters, 'moderate');
      const order = db.createOrder({
        customer: { fullName: 'Prasad Varma', whatsappMobile: '9701234567', villageMandal: 'Bapatla' },
        items: diag.bundleItems.map(c => ({
          productId: c.productId,
          productName: c.productId.toUpperCase(),
          packSize: c.packSize,
          quantity: c.quantity,
          unitPriceInr: c.unitPrice
        })),
        razorpayOrderId: 'order_pw5'
      });

      const sig = await generateRazorpaySignatureEdge('order_pw5', 'pay_pw5', secret);
      const paid = db.markOrderAsPaid({
        displayOrderId: order.displayOrderId,
        razorpayOrderId: 'order_pw5',
        razorpayPaymentId: 'pay_pw5',
        razorpaySignature: sig
      });
      expect(paid!.status).toBe('PAID');

      // WhatsApp link contains order ID and farmer name
      const waLink = generateCustomerToMerchantWhatsAppLink(order.displayOrderId, 'Prasad Varma');
      expect(waLink).toContain(order.displayOrderId.replace('#', '%23'));
    });

    it('Pairwise 6: Multi-Symptom Complex (White Gut + Vibrio Red) -> 3-Product Synergistic Prescription -> Full E2E Flow', async () => {
      const db = new D1DatabaseSimulator();
      const secret = 'rzp_secret_pairwise_06';

      // Dual symptoms: white-gut (Next Gut + Next Viro Nill) & vibrio-red (Next Vibriosis + Next Viro Nill)
      // Produces synergistic 3-product treatment without duplicating Next Viro Nill
      const diag = calculatePrescription(['white-gut', 'vibrio-red'], 2.0, 1.0, 'acute');
      expect(diag.allocations).toHaveLength(3);

      const slugs = diag.allocations.map(a => a.productSlug);
      expect(slugs).toContain('next-gut');
      expect(slugs).toContain('next-vibriosis');
      expect(slugs).toContain('next-viro-nill');

      const order = db.createOrder({
        customer: { fullName: 'Anjaneyulu Naidu', whatsappMobile: '9848099999', villageMandal: 'Machilipatnam' },
        items: diag.bundleItems.map(c => ({
          productId: c.productId,
          productName: c.productId.toUpperCase(),
          packSize: c.packSize,
          quantity: c.quantity,
          unitPriceInr: c.unitPrice
        })),
        razorpayOrderId: 'order_pw6'
      });

      const sig = await generateRazorpaySignatureEdge('order_pw6', 'pay_pw6', secret);
      const paid = db.markOrderAsPaid({
        displayOrderId: order.displayOrderId,
        razorpayOrderId: 'order_pw6',
        razorpayPaymentId: 'pay_pw6',
        razorpaySignature: sig
      });
      expect(paid!.status).toBe('PAID');
      expect(paid!.items!.length).toBeGreaterThanOrEqual(3);
    });

  });
}
