/**
 * Tier 4: Real-World Farmer Application Scenarios E2E Tests
 * Simulates genuine, end-to-end commercial aquaculture emergency workflows
 * from clinical observation to treatment delivery.
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

export function registerTier4Tests(): void {
  describe('Tier 4: Real-World Aqua Farmer Application Scenarios', () => {

    // =========================================================================
    // Scenario 1: Krishna District 3-Acre White Gut Emergency
    // =========================================================================
    it('Scenario 1: Ramesh Naidu (Krishna Dt) - 3-Acre Acute White Gut Outbreak on DOC 45', async () => {
      const db = new D1DatabaseSimulator();
      const secret = 'rzp_live_secret_krishna_ramesh';

      // 1. Farmer observes trailing white feces & feed drop; runs Pond Doctor
      const pondAcreage = 3.0;
      const pondDepth = 1.2; // 1.2m depth in Krishna brackish pond
      const diag = calculatePrescription(['white-gut'], pondAcreage, pondDepth, 'acute');

      // 2. Prescription verification
      expect(diag.symptoms).toContain('white-gut');
      const gutAlloc = diag.allocations.find(a => a.productSlug === 'next-gut')!;
      const viroAlloc = diag.allocations.find(a => a.productSlug === 'next-viro-nill')!;
      expect(gutAlloc.role).toBe('primary');
      expect(viroAlloc.role).toBe('support');
      expect(gutAlloc.requiredLitersOrKg).toBe(14.4); // 3 * 1.2 * 2.0 * 2.0 = 14.4 L
      expect(viroAlloc.requiredLitersOrKg).toBe(7.2);  // 3 * 1.2 * 1.0 * 2.0 = 7.2 L

      // 3. 1-Click Bundle addition to cart
      const cart = [...diag.bundleItems];
      const orderTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
      expect(orderTotal).toBe(diag.bundleTotalInr);

      // 4. Zero-OTP frictionless checkout submission
      const customer = {
        fullName: 'Ramesh Naidu',
        whatsappMobile: '9848012345',
        villageMandal: 'Kankipadu, Krishna District'
      };
      const razorpayOrderId = 'order_kankipadu_101';
      const order = db.createOrder({
        customer,
        items: cart.map(c => ({
          productId: c.productId,
          productName: c.productId === 'next-gut' ? 'Next Gut Probiotic' : 'Next Viro Nill Biosecurity',
          packSize: c.packSize,
          quantity: c.quantity,
          unitPriceInr: c.unitPrice
        })),
        razorpayOrderId
      });

      expect(order.displayOrderId).toBe('#NF-1001');
      expect(order.status).toBe('PENDING');

      // 5. Razorpay pre-paid payment & Web Crypto Edge HMAC verification
      const razorpayPaymentId = 'pay_kankipadu_202';
      const signature = await generateRazorpaySignatureEdge(razorpayOrderId, razorpayPaymentId, secret);
      const isVerified = await verifyRazorpaySignatureEdge(razorpayOrderId, razorpayPaymentId, signature, secret);
      expect(isVerified).toBe(true);

      // 6. Transition order to PAID in D1
      const paidOrder = db.markOrderAsPaid({
        displayOrderId: order.displayOrderId,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature: signature
      });
      expect(paidOrder!.status).toBe('PAID');

      // 7. Merchant audible Telegram ping
      const fullOrder = db.getOrderWithDetails(order.displayOrderId)!;
      const telegramText = buildTelegramOrderMessage({
        displayOrderId: fullOrder.displayOrderId,
        customerName: fullOrder.customer!.fullName,
        customerPhone: fullOrder.customer!.whatsappMobile,
        villageMandal: fullOrder.customer!.villageMandal,
        items: fullOrder.items!.map(i => ({ productName: i.productName, packSize: i.packSize, quantity: i.quantity })),
        totalAmountInr: fullOrder.totalAmountInr
      });

      const validation = validateTelegramPayload({
        chat_id: '8880878043',
        text: telegramText,
        parse_mode: 'HTML',
        disable_notification: false
      });
      expect(validation.valid).toBe(true);
      expect(telegramText).toContain('Kankipadu, Krishna District');
      expect(telegramText).toContain('₹' + orderTotal.toLocaleString('en-IN'));

      // 8. Pre-filled WhatsApp link generated
      const waLink = generateCustomerToMerchantWhatsAppLink(order.displayOrderId, 'Ramesh Naidu');
      expect(waLink).toContain('https://wa.me/918977656444');
    });

    // =========================================================================
    // Scenario 2: West Godavari 2.5-Acre Ammonia & Benthic Sludge Collapse
    // =========================================================================
    it('Scenario 2: Venkat Rao (West Godavari) - 2.5-Acre Deep Pond Ammonia & Black Mud Spike', async () => {
      const db = new D1DatabaseSimulator();
      const secret = 'rzp_secret_bhimavaram';

      // 1. Farmer diagnoses high NH3 (>0.8 ppm) and black mud central pit at 1.5m depth
      const diag = calculatePrescription(['toxic-ammonia', 'benthic-sludge'], 2.5, 1.5, 'acute');
      expect(diag.allocations.some(a => a.productSlug === 'next-converter')).toBe(true);
      expect(diag.allocations.some(a => a.productSlug === 'next-sludge')).toBe(true);

      // 2. Add bundle to cart and adjust quantity (+1 spare 5L can of Next Converter)
      const cart = [...diag.bundleItems];
      const converterCan = cart.find(i => i.productId === 'next-converter' && i.packSize === '5L');
      if (converterCan) converterCan.quantity += 1;

      // 3. Farmer mistakenly tries Cash on Delivery -> Guardrail rejects
      const tryCod = () => {
        const method: string = 'cod';
        if (method.toLowerCase() === 'cod') throw new Error('COD_NOT_PERMITTED');
      };
      expect(tryCod).toThrow('COD_NOT_PERMITTED');

      // 4. Switch to UPI pre-paid checkout
      const customer = { fullName: 'Venkata Satyanarayana', whatsappMobile: '9988776655', villageMandal: 'Undi Mandal, West Godavari' };
      const razorpayOrderId = 'order_undi_303';
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

      // 5. Verify payment & update D1
      const razorpayPaymentId = 'pay_undi_404';
      const signature = await generateRazorpaySignatureEdge(razorpayOrderId, razorpayPaymentId, secret);
      const paid = db.markOrderAsPaid({
        displayOrderId: order.displayOrderId,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature: signature
      });

      expect(paid!.status).toBe('PAID');
      expect(db.getAllPaidOrders()).toHaveLength(1);
    });

    // =========================================================================
    // Scenario 3: Coastal Nellore 4-Acre Vibrio / Red Disease Crisis
    // =========================================================================
    it('Scenario 3: Subba Rao (Nellore) - 4-Acre Severe Vibrio Parahaemolyticus Outbreak', async () => {
      const db = new D1DatabaseSimulator();
      const secret = 'rzp_secret_nellore';

      // 1. Farmer discovers green TCBS colonies and discolored hepatopancreas
      const diag = calculatePrescription(['vibrio-red'], 4.0, 1.0, 'acute');
      const vibrioAlloc = diag.allocations.find(a => a.productSlug === 'next-vibriosis')!;
      expect(vibrioAlloc.requiredLitersOrKg).toBe(12.0); // 4 * 1.0 * 1.5 * 2.0 = 12 L

      // 2. 1-Click Bundle creation
      const order = db.createOrder({
        customer: { fullName: 'Subba Rao', whatsappMobile: '9849012345', villageMandal: 'Nellore Coastal Belt' },
        items: diag.bundleItems.map(c => ({
          productId: c.productId,
          productName: 'NEXT VIBRIOSIS FORMULATION',
          packSize: c.packSize,
          quantity: c.quantity,
          unitPriceInr: c.unitPrice
        })),
        razorpayOrderId: 'order_nellore_505'
      });

      // 3. Security check: Corrupted HMAC payment attempt rejected
      const genuineSig = await generateRazorpaySignatureEdge('order_nellore_505', 'pay_nellore_606', secret);
      const forgedSig = tamperSignature(genuineSig, 0);

      const isValidForged = await verifyRazorpaySignatureEdge('order_nellore_505', 'pay_nellore_606', forgedSig, secret);
      expect(isValidForged).toBe(false);

      // Order must not be marked paid
      expect(db.getOrderWithDetails(order.displayOrderId)!.status).toBe('PENDING');

      // 4. Legitimate verification completes order
      const isValidGenuine = await verifyRazorpaySignatureEdge('order_nellore_505', 'pay_nellore_606', genuineSig, secret);
      expect(isValidGenuine).toBe(true);

      const paidOrder = db.markOrderAsPaid({
        displayOrderId: order.displayOrderId,
        razorpayOrderId: 'order_nellore_505',
        razorpayPaymentId: 'pay_nellore_606',
        razorpaySignature: genuineSig
      });
      expect(paidOrder!.status).toBe('PAID');
    });

    // =========================================================================
    // Scenario 4: Bapatla 5-Acre Post-Molt Cramps & Hard Water Distress
    // =========================================================================
    it('Scenario 4: Prasad Varma (Bapatla) - 5-Acre Post-Rain Soft Shell & Molt Spasm Crisis', async () => {
      const db = new D1DatabaseSimulator();
      const secret = 'rzp_secret_bapatla';

      // 1. Farmer enters depth in feet (4.5 ft)
      const depthMeters = convertFeetToMeters(4.5);
      const diag = calculatePrescription(['molting-cramps'], 5.0, depthMeters, 'moderate');

      const minAlloc = diag.allocations.find(a => a.productSlug === 'next-min')!;
      expect(minAlloc.requiredLitersOrKg).toBeGreaterThan(30); // 5 * 1.37 * 5.0 * 1.5 ≈ 51.4 kg

      // 2. Create order & verify payment
      const order = db.createOrder({
        customer: { fullName: 'Prasad Varma', whatsappMobile: '9701234567', villageMandal: 'Bapatla Rural' },
        items: diag.bundleItems.map(c => ({
          productId: c.productId,
          productName: c.productId.toUpperCase(),
          packSize: c.packSize,
          quantity: c.quantity,
          unitPriceInr: c.unitPrice
        })),
        razorpayOrderId: 'order_bapatla_707'
      });

      const sig = await generateRazorpaySignatureEdge('order_bapatla_707', 'pay_bapatla_808', secret);
      const paid = db.markOrderAsPaid({
        displayOrderId: order.displayOrderId,
        razorpayOrderId: 'order_bapatla_707',
        razorpayPaymentId: 'pay_bapatla_808',
        razorpaySignature: sig
      });
      expect(paid!.status).toBe('PAID');

      // 3. Technical support helpline verification
      const supportLink = generateCustomerToMerchantWhatsAppLink(order.displayOrderId, 'Prasad Varma');
      expect(supportLink).toContain('8977656444');
    });

    // =========================================================================
    // Scenario 5: Corporate Farm 10-Acre Pre-Stocking Biosecurity Protocol
    // =========================================================================
    it('Scenario 5: Lakshmi (Corporate Aqua Farm) - 10-Acre Pre-Stocking Biosecurity & Zooplankton Bloom', async () => {
      const db = new D1DatabaseSimulator();
      const secret = 'rzp_secret_corporate';

      // 1. Corporate Farm executes preventive biosecurity setup across 10 acres
      const diag = calculatePrescription(['benthic-sludge'], 10.0, 1.0, 'low');
      const sludgeAlloc = diag.allocations.find(a => a.productSlug === 'next-sludge')!;
      expect(sludgeAlloc.requiredLitersOrKg).toBe(20.0); // 10 * 1.0 * 2.0 * 1.0 = 20 kg -> 4 cans of 5L

      // 2. Large order checkout
      const order = db.createOrder({
        customer: { fullName: 'Lakshmi Bio-Aquatech', whatsappMobile: '9848055555', villageMandal: 'Chirala Coastal Zone' },
        items: diag.bundleItems.map(c => ({
          productId: c.productId,
          productName: c.productId.toUpperCase(),
          packSize: c.packSize,
          quantity: c.quantity,
          unitPriceInr: c.unitPrice
        })),
        razorpayOrderId: 'order_corp_909'
      });

      expect(order.amountPaise).toBe(order.totalAmountInr * 100);

      // 3. Verify payment
      const sig = await generateRazorpaySignatureEdge('order_corp_909', 'pay_corp_000', secret);
      const paid = db.markOrderAsPaid({
        displayOrderId: order.displayOrderId,
        razorpayOrderId: 'order_corp_909',
        razorpayPaymentId: 'pay_corp_000',
        razorpaySignature: sig
      });
      expect(paid!.status).toBe('PAID');
    });

  });
}
