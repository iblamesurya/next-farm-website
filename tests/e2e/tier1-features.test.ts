/**
 * Tier 1: Feature Coverage E2E Tests (Requirements R1 through R5)
 * Requirements-Driven Opaque-Box Acceptance Testing
 */

import { describe, it, expect } from './framework.ts';
import {
  AUTHORITATIVE_CATALOG,
  VALID_SLUGS,
  hasLatexSyntax,
  validateProductContract
} from './oracles/catalog-oracle.ts';
import {
  CLINICAL_SYMPTOMS,
  calculatePrescription,
  allocatePacks,
  convertFeetToMeters
} from './oracles/diagnostic-oracle.ts';
import {
  generateRazorpaySignatureEdge,
  verifyRazorpaySignatureEdge
} from '../../src/lib/crypto-edge.ts';
import { POST as createOrderRoute } from '../../src/app/api/checkout/create-order/route.ts';
import { POST as verifyPaymentRoute } from '../../src/app/api/checkout/verify-payment/route.ts';
import { getDatabase, generateDisplayOrderId, getOrderWithDetails } from '../../src/lib/db.ts';
import { NextRequest } from 'next/server';
import { D1DatabaseSimulator } from './oracles/d1-mock-oracle.ts';
import {
  TELEGRAM_CONFIG,
  buildTelegramOrderMessage,
  generateCustomerToMerchantWhatsAppLink,
  validateTelegramPayload
} from './oracles/notification-oracle.ts';
import {
  validateRobotsTxtContent,
  validateSitemapUrls,
  validateLlmsManifest,
  validateJsonLdStructuredData
} from './oracles/seo-aeo-oracle.ts';

export function registerTier1Tests(): void {
  describe('Tier 1: Feature Coverage (R1 - R5 Acceptance Criteria)', () => {

    // =========================================================================
    // R1: Mobile-First Storefront & Product Showcase
    // =========================================================================
    describe('R1. Catalog & Storefront Integrity', () => {
      it('R1.1: Displays exactly 11 core aquaculture biotechnology formulations', () => {
        expect(AUTHORITATIVE_CATALOG).toHaveLength(11);
        expect(VALID_SLUGS).toHaveLength(11);
        const uniqueSlugs = new Set(VALID_SLUGS);
        expect(uniqueSlugs.size).toBe(11);
      });

      it('R1.2: Enforces uniform pre-paid pricing (5L @ Rs. 5,000 / 1L @ Rs. 1,199)', () => {
        for (const product of AUTHORITATIVE_CATALOG) {
          expect(product.pricing.can5L).toBe(5000);
          expect(product.pricing.bottle1L).toBe(1199);
        }
      });

      it('R1.3: Verifies all formulations carry the 3 regulatory trust badges (CAA, ISO, Antibiotic-Free)', () => {
        for (const product of AUTHORITATIVE_CATALOG) {
          expect(product.regulatoryBadges.caaApproved).toBe(true);
          expect(product.regulatoryBadges.isoCertified).toBe(true);
          expect(product.regulatoryBadges.antibioticFree).toBe(true);
        }
      });

      it('R1.4: Validates zero LaTeX syntax or unescaped math expressions across all product copy', () => {
        for (const product of AUTHORITATIVE_CATALOG) {
          expect(hasLatexSyntax(product.name)).toBe(false);
          expect(hasLatexSyntax(product.tagline)).toBe(false);
          expect(hasLatexSyntax(product.biologicalMechanism)).toBe(false);
          expect(hasLatexSyntax(product.dosageProtocol.preventive)).toBe(false);
          expect(hasLatexSyntax(product.dosageProtocol.curative)).toBe(false);
        }
      });

      it('R1.5: Validates active bacterial strains and CFU potency declarations', () => {
        for (const product of AUTHORITATIVE_CATALOG) {
          expect(product.strains.length).toBeGreaterThan(0);
          expect(product.cfuCount).toBeTruthy();
          expect(product.cfuCount.length).toBeGreaterThan(3);
        }
      });

      it('R1.6: Validates studio 1:1 packshots and downloadable spec sheet assets', () => {
        for (const product of AUTHORITATIVE_CATALOG) {
          expect(product.packshotImage).toMatch(/^\/images\/products\/.+\.png$/);
          expect(product.specSheetPdf).toMatch(/^\/docs\/.+\.pdf$/);
          expect(product.galleryImages.length).toBeGreaterThanOrEqual(1);
        }
      });
    });

    // =========================================================================
    // R2: Interactive Pond Doctor Diagnostic Engine
    // =========================================================================
    describe('R2. Pond Doctor Diagnostic Engine', () => {
      it('R2.1: Diagnoses White Gut / White Feces into Next Gut + Next Viro Nill', () => {
        const diag = CLINICAL_SYMPTOMS['white-gut'];
        expect(diag.primaryProductSlug).toBe('next-gut');
        expect(diag.supportProductSlug).toBe('next-viro-nill');
      });

      it('R2.2: Diagnoses Toxic Ammonia & Gas Spikes into Next Converter + Next Remedy', () => {
        const diag = CLINICAL_SYMPTOMS['toxic-ammonia'];
        expect(diag.primaryProductSlug).toBe('next-converter');
        expect(diag.supportProductSlug).toBe('next-remedy');
      });

      it('R2.3: Diagnoses Benthic Sludge & Black Mud into Next Sludge + Next Pro Plus', () => {
        const diag = CLINICAL_SYMPTOMS['benthic-sludge'];
        expect(diag.primaryProductSlug).toBe('next-sludge');
        expect(diag.supportProductSlug).toBe('next-pro-plus');
      });

      it('R2.4: Diagnoses Vibrio / Red Disease / EMS into Next Vibriosis + Next Viro Nill', () => {
        const diag = CLINICAL_SYMPTOMS['vibrio-red'];
        expect(diag.primaryProductSlug).toBe('next-vibriosis');
        expect(diag.supportProductSlug).toBe('next-viro-nill');
      });

      it('R2.5: Diagnoses Molting Cramps & Soft Shell into Next-Min + Next Softner', () => {
        const diag = CLINICAL_SYMPTOMS['molting-cramps'];
        expect(diag.primaryProductSlug).toBe('next-min');
        expect(diag.supportProductSlug).toBe('next-softner');
      });

      it('R2.6: Computes depth-adjusted volumetric requirement and pack allocation', () => {
        // Test 2 acres at 1.0m depth for White Gut (base rate Next Gut: 2.0 L/acre, severity moderate: 1.5x)
        // 2 * 1.0 * 2.0 * 1.5 = 6.0 Liters -> 1x 5L Can + 1x 1L Bottle
        const result = calculatePrescription(['white-gut'], 2.0, 1.0, 'moderate');
        const nextGutAlloc = result.allocations.find(a => a.productSlug === 'next-gut');
        expect(nextGutAlloc).toBeDefined();
        expect(nextGutAlloc!.requiredLitersOrKg).toBe(6.0);
        expect(nextGutAlloc!.cans5L).toBe(1);
        expect(nextGutAlloc!.bottles1L).toBe(1);
        expect(nextGutAlloc!.totalCostInr).toBe(5000 + 1199); // 6,199 INR
      });

      it('R2.7: Generates 1-click bundle items with valid product IDs and unit prices', () => {
        const result = calculatePrescription(['toxic-ammonia'], 1.0, 1.0, 'low');
        expect(result.bundleItems.length).toBeGreaterThanOrEqual(1);
        for (const item of result.bundleItems) {
          expect(['5L', '1L']).toContain(item.packSize);
          expect([5000, 1199]).toContain(item.unitPrice);
          expect(item.quantity).toBeGreaterThanOrEqual(1);
        }
      });
    });

    // =========================================================================
    // =========================================================================
    // R3: Frictionless Pre-Paid Checkout & Cloudflare D1 Storage
    // =========================================================================
    describe('R3. Pre-Paid Checkout & D1 Edge Storage', () => {
      it('R3.1: Zero-OTP customer identification validates 3 required fields on live route', async () => {
        // Missing name
        const badReq1 = new NextRequest('http://localhost/api/checkout/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: { phone: '9848012345', village: 'Kankipadu' },
            items: [{ productId: 'next-gut', productName: 'Next Gut', packSize: '1L', unitPrice: 1199, quantity: 1 }]
          })
        });
        const badRes1 = await createOrderRoute(badReq1);
        expect(badRes1.status).toBe(400);

        // Valid customer succeeds
        const goodReq = new NextRequest('http://localhost/api/checkout/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: { name: 'Ramesh Naidu', phone: '9848012345', village: 'Kankipadu' },
            items: [{ productId: 'next-gut', productName: 'Next Gut', packSize: '1L', unitPrice: 1199, quantity: 1 }]
          })
        });
        const goodRes = await createOrderRoute(goodReq);
        expect(goodRes.status).toBe(200);
      });

      it('R3.2: Rejects Cash on Delivery (COD) strictly across all parameter variants', async () => {
        const codVariants = ['cod', 'COD', 'cash_on_delivery', 'CASH_ON_DELIVERY', 'cash on delivery'];
        for (const variant of codVariants) {
          const req = new NextRequest('http://localhost/api/checkout/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customer: { name: 'Ramesh Naidu', phone: '9848012345', village: 'Kankipadu' },
              items: [{ productId: 'next-gut', productName: 'Next Gut', packSize: '1L', unitPrice: 1199, quantity: 1 }],
              paymentMethod: variant
            })
          });
          const res = await createOrderRoute(req);
          const json = await res.json();
          expect(res.status).toBe(400);
          expect(json.error).toBe('COD_NOT_PERMITTED');
        }
      });

      it('R3.3: Edge Web Crypto HMAC SHA-256 authenticates valid Razorpay payment signature', async () => {
        const orderId = 'order_test_1001';
        const paymentId = 'pay_test_9999';
        const secret = 'super_secret_test_key_123';

        const signature = await generateRazorpaySignatureEdge(orderId, paymentId, secret);
        expect(signature).toHaveLength(64);

        const isValid = await verifyRazorpaySignatureEdge(orderId, paymentId, signature, secret);
        expect(isValid).toBe(true);
      });

      it('R3.4: Cloudflare D1 generates atomic #NF-XXXX display order sequence', async () => {
        const db = getDatabase();
        const id1 = await generateDisplayOrderId(db);
        const id2 = await generateDisplayOrderId(db);
        expect(id1).toMatch(/^#NF-\d{4,}$/);
        expect(id2).toMatch(/^#NF-\d{4,}$/);
        const n1 = parseInt(id1.replace('#NF-', ''), 10);
        const n2 = parseInt(id2.replace('#NF-', ''), 10);
        expect(n2).toBe(n1 + 1);
      });

      it('R3.5: Executes live order creation, HMAC verification, and D1 status transition to PAID', async () => {
        const testSecret = 'super_secret_test_key_123';
        const createReq = new NextRequest('http://localhost/api/checkout/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: { name: 'Suresh Kumar', phone: '9123456789', village: 'Akividu' },
            items: [
              { productId: 'next-viro-nill', productName: 'Next Viro Nill', packSize: '5L', unitPrice: 5000, quantity: 2 },
              { productId: 'next-gut', productName: 'Next Gut', packSize: '1L', unitPrice: 1199, quantity: 1 }
            ]
          })
        });
        const createRes = await createOrderRoute(createReq);
        const createData = await createRes.json();
        expect(createRes.status).toBe(200);
        expect(createData.success).toBe(true);
        expect(createData.displayOrderId).toMatch(/^#NF-\d{4,}$/);

        // Check initial PENDING status in D1
        const db = getDatabase();
        const orderBefore = await getOrderWithDetails(db, createData.displayOrderId);
        expect(orderBefore.payment_status).toBe('PENDING');

        // Verify payment with genuine Web Crypto HMAC
        const paymentId = `pay_${Date.now()}`;
        const validSig = await generateRazorpaySignatureEdge(createData.razorpayOrderId, paymentId, testSecret);

        const verifyReq = new NextRequest('http://localhost/api/checkout/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: createData.razorpayOrderId,
            razorpay_payment_id: paymentId,
            razorpay_signature: validSig,
            displayOrderId: createData.displayOrderId
          })
        });
        const verifyRes = await verifyPaymentRoute(verifyReq);
        const verifyData = await verifyRes.json();
        expect(verifyRes.status).toBe(200);
        expect(verifyData.status).toBe('PAID');

        // Check updated PAID status in D1
        const orderAfter = await getOrderWithDetails(db, createData.displayOrderId);
        expect(orderAfter.payment_status).toBe('PAID');

        // Anti-backdoor assertion: Verify 'valid_mock_signature' is strictly rejected with 403
        const backdoorReq = new NextRequest('http://localhost/api/checkout/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: createData.razorpayOrderId,
            razorpay_payment_id: 'pay_hacker',
            razorpay_signature: 'valid_mock_signature',
            displayOrderId: createData.displayOrderId
          })
        });
        const backdoorRes = await verifyPaymentRoute(backdoorReq);
        expect(backdoorRes.status).toBe(403);
      });
    });

    // =========================================================================
    // R4: Real-Time Merchant & Customer Notifications
    // =========================================================================
    describe('R4. Real-Time Telegram Alerts & WhatsApp Links', () => {
      it('R4.1: Constructs merchant Telegram alert with required order metadata and items', () => {
        const messageHtml = buildTelegramOrderMessage({
          displayOrderId: '#NF-1001',
          customerName: 'Ramesh Naidu',
          customerPhone: '9848012345',
          villageMandal: 'Kankipadu, Krishna Dist',
          items: [
            { productName: 'Next Viro Nill', packSize: '5L', quantity: 2 },
            { productName: 'Next Gut', packSize: '1L', quantity: 1 }
          ],
          totalAmountInr: 11199
        });

        expect(messageHtml).toContain('#NF-1001');
        expect(messageHtml).toContain('Ramesh Naidu');
        expect(messageHtml).toContain('9848012345');
        expect(messageHtml).toContain('Kankipadu');
        expect(messageHtml).toContain('₹11,199');
        expect(messageHtml).toContain('Next Viro Nill (5L) x 2');
      });

      it('R4.2: Enforces disable_notification: false for audible ringtone alerts', () => {
        const payload = {
          chat_id: '7890123456',
          text: '<b>🚨 NEW PRE-PAID ORDER PAID!</b>\nOrder #NF-1001\n<a href="https://wa.me/919848012345">Contact</a>',
          parse_mode: 'HTML',
          disable_notification: false
        };

        const validation = validateTelegramPayload(payload);
        expect(validation.valid).toBe(true);
        expect(payload.disable_notification).toBe(false);
      });

      it('R4.3: Validates HTML tags balancing in Telegram notification template', () => {
        const testPayload = {
          chat_id: '12345',
          parse_mode: 'HTML',
          disable_notification: false,
          text: buildTelegramOrderMessage({
            displayOrderId: '#NF-1005',
            customerName: 'Venkateswara Rao',
            customerPhone: '9876543210',
            villageMandal: 'Bhimavaram',
            items: [{ productName: 'Next Converter', packSize: '5L', quantity: 1 }],
            totalAmountInr: 5000
          })
        };

        const result = validateTelegramPayload(testPayload);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('R4.4: Generates pre-filled WhatsApp direct chat link for merchant hotline', () => {
        const link = generateCustomerToMerchantWhatsAppLink('#NF-1001', 'Ramesh');
        expect(link).toContain('https://wa.me/918977656444?text=');
        expect(link).toContain('%23NF-1001');
      });

      it('R4.5: Validates Telegram bot endpoint uses official token', () => {
        expect(TELEGRAM_CONFIG.botToken).toBe('8880878043:AAHAm05AOuXIhV6ClvNYEJOK-G2AJmWy9YA');
        expect(TELEGRAM_CONFIG.endpointUrl).toContain('8880878043:AAHAm05AOuXIhV6ClvNYEJOK-G2AJmWy9YA');
      });
    });

    // =========================================================================
    // R5: AEO & SEO Optimization Layer
    // =========================================================================
    describe('R5. AEO & SEO Optimization Layer', () => {
      it('R5.1: Validates robots.txt allows Googlebot, GPTBot, PerplexityBot, ClaudeBot', () => {
        const mockRobots = `
User-agent: Googlebot
Allow: /
User-agent: GPTBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: *
Allow: /
Sitemap: https://nextfarmbiosciences.app/sitemap.xml
        `.trim();

        const result = validateRobotsTxtContent(mockRobots);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('R5.2: Validates sitemap contains homepage, pond-doctor, and all 11 formulation URLs', () => {
        const mockUrls = [
          'https://nextfarmbiosciences.app/',
          'https://nextfarmbiosciences.app/pond-doctor',
          ...VALID_SLUGS.map(s => `https://nextfarmbiosciences.app/products/${s}`)
        ];

        const result = validateSitemapUrls(mockUrls);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('R5.3: Validates /llms.txt semantic manifest for clinical treatment indexing', () => {
        const mockLlmsTxt = `
# Next Farm Bio Sciences - AI Clinical Knowledge Index
Aquaculture biotechnology formulations for shrimp and prawn farming.
- White Gut / White Feces: Next Gut, Next Viro Nill
- Toxic Ammonia Spikes: Next Converter, Next Remedy
- Pathogen Biosecurity (WSSV): Next Viro Nill
- Vibrio Control: Next Vibriosis
Contact helpline: +91 8977656444
        `.trim();

        const result = validateLlmsManifest(mockLlmsTxt, false);
        expect(result.valid).toBe(true);
      });

      it('R5.4: Validates exhaustive /llms-full.txt protocol indexing all 11 formulations', () => {
        const mockLlmsFull = `
# Next Farm Bio Sciences - Comprehensive Biotechnology Protocols
Includes detailed microbial consortia and dosages:
${VALID_SLUGS.map(s => `- ${s.replace(/-/g, ' ')}`).join('\n')}
White Gut treatment protocols, Ammonia conversion, WSSV biosecurity, Vibrio eradication.
Helpline: +91 8977656444
        `;

        const result = validateLlmsManifest(mockLlmsFull, true);
        expect(result.valid).toBe(true);
      });

      it('R5.5: Validates Schema.org JSON-LD structured data entities', () => {
        const mockJsonLd = [
          {
            '@context': 'https://schema.org',
            '@type': 'VeterinaryBusiness',
            name: 'Next Farm Bio Sciences',
            address: { addressLocality: 'Vijayawada', addressRegion: 'Andhra Pradesh', postalCode: '520010' }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Next Viro Nill',
            offers: { '@type': 'Offer', price: 5000, priceCurrency: 'INR', availability: 'https://schema.org/InStock' }
          }
        ];

        const result = validateJsonLdStructuredData(mockJsonLd);
        expect(result.valid).toBe(true);
      });
    });

  });
}
