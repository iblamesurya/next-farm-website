/**
 * Tier 2: Boundary & Corner Cases E2E Tests (Requirements R1 through R5)
 * Requirements-Driven Opaque-Box Adversarial & Stress Testing
 */

import { describe, it, expect } from './framework.ts';
import {
  AUTHORITATIVE_CATALOG,
  hasLatexSyntax,
  validateProductContract
} from './oracles/catalog-oracle.ts';
import {
  calculatePrescription,
  allocatePacks,
  convertFeetToMeters
} from './oracles/diagnostic-oracle.ts';
import {
  generateRazorpaySignatureEdge,
  verifyRazorpaySignatureEdge,
  tamperSignature,
  truncateSignature
} from './oracles/crypto-oracle.ts';
import { D1DatabaseSimulator } from './oracles/d1-mock-oracle.ts';
import {
  escapeTelegramHtml,
  validateTelegramPayload,
  buildTelegramOrderMessage
} from './oracles/notification-oracle.ts';
import {
  validateRobotsTxtContent,
  validateSitemapUrls,
  validateLlmsManifest,
  validateJsonLdStructuredData
} from './oracles/seo-aeo-oracle.ts';

export function registerTier2Tests(): void {
  describe('Tier 2: Boundary, Adversarial & Corner Cases (R1 - R5)', () => {

    // =========================================================================
    // R1 Boundary Cases: Catalog & Contract Invariants
    // =========================================================================
    describe('R1 Boundaries: Catalog Data & Formatting', () => {
      it('R1-B1: Rejects product entry with non-standard price or zero price', () => {
        const invalidProduct = {
          ...AUTHORITATIVE_CATALOG[0],
          pricing: { can5L: 0, bottle1L: 1199 }
        };
        const result = validateProductContract(invalidProduct);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('can5L price must be 5000'))).toBe(true);
      });

      it('R1-B2: Rejects product entry if any regulatory badge is false or missing', () => {
        const uncertifiedProduct = {
          ...AUTHORITATIVE_CATALOG[0],
          regulatoryBadges: { caaApproved: false, isoCertified: true, antibioticFree: true }
        };
        const result = validateProductContract(uncertifiedProduct);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('caaApproved badge must be true'))).toBe(true);
      });

      it('R1-B3: Detects and rejects LaTeX mathematical syntax in product copy', () => {
        const latexSnippets = [
          'Dosage is calculated as $\\text{Rate} \\times \\text{Area}$',
          'Dissolve in $$\\frac{20}{2}$$ liters of water',
          'Efficacy is \\approx 99.9%',
          'Yield \\pm 5%'
        ];
        for (const snippet of latexSnippets) {
          expect(hasLatexSyntax(snippet)).toBe(true);
        }
      });

      it('R1-B4: Rejects product with empty microbial strains array', () => {
        const emptyStrainsProduct = {
          ...AUTHORITATIVE_CATALOG[0],
          strains: []
        };
        const result = validateProductContract(emptyStrainsProduct);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('Strains array must be non-empty'))).toBe(true);
      });

      it('R1-B5: Rejects product with missing or empty cfuCount', () => {
        const noCfuProduct = {
          ...AUTHORITATIVE_CATALOG[0],
          cfuCount: ''
        };
        const result = validateProductContract(noCfuProduct);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('cfuCount must be non-empty string'))).toBe(true);
      });
    });

    // =========================================================================
    // R2 Boundary Cases: Diagnostic Math & Volumetric Edge Values
    // =========================================================================
    describe('R2 Boundaries: Acreage & Depth Calculator Constraints', () => {
      it('R2-B1: Throws error when pond water depth is zero', () => {
        expect(() => calculatePrescription(['white-gut'], 2.0, 0.0)).toThrow(
          'Water depth must be strictly greater than 0 meters.'
        );
      });

      it('R2-B2: Throws error when pond water depth is negative', () => {
        expect(() => calculatePrescription(['toxic-ammonia'], 1.5, -0.5)).toThrow(
          'Water depth must be strictly greater than 0 meters.'
        );
      });

      it('R2-B3: Throws error when pond acreage is zero', () => {
        expect(() => calculatePrescription(['benthic-sludge'], 0.0, 1.0)).toThrow(
          'Pond acreage must be strictly greater than 0.'
        );
      });

      it('R2-B4: Throws error when pond acreage is negative', () => {
        expect(() => calculatePrescription(['vibrio-red'], -2.0, 1.2)).toThrow(
          'Pond acreage must be strictly greater than 0.'
        );
      });

      it('R2-B5: Throws error when no symptom is selected', () => {
        expect(() => calculatePrescription([], 1.0, 1.0)).toThrow(
          'At least one clinical symptom must be selected.'
        );
      });

      it('R2-B6: Handles extreme micro-acreage (0.05 acre nursery tank) without NaN', () => {
        const result = calculatePrescription(['white-gut'], 0.05, 1.0, 'low');
        expect(result.bundleTotalInr).toBeGreaterThan(0);
        // Minimum allocation should be at least 1 precision bottle (1L)
        expect(result.bundleItems.some(i => i.packSize === '1L')).toBe(true);
      });

      it('R2-B7: Handles extreme macro-acreage (500 acres corporate farm) accurately', () => {
        const result = calculatePrescription(['toxic-ammonia'], 500.0, 1.0, 'low');
        // Base rate Next Converter: 2.0 L/acre -> 500 * 2.0 = 1000 Liters -> 200 cans of 5L
        const converterAlloc = result.allocations.find(a => a.productSlug === 'next-converter');
        expect(converterAlloc!.cans5L).toBe(200);
        expect(converterAlloc!.bottles1L).toBe(0);
        expect(converterAlloc!.totalCostInr).toBe(200 * 5000);
      });
    });

    // =========================================================================
    // R3 Boundary Cases: Checkout Validation & Web Crypto HMAC Tampering
    // =========================================================================
    describe('R3 Boundaries: Security & Checkout Guards', () => {
      const secret = 'rzp_test_secret_key_boundary_999';

      it('R3-B1: Detects 1-byte tampering in Razorpay HMAC signature and rejects payment proof', async () => {
        const orderId = 'order_tamper_test';
        const paymentId = 'pay_tamper_test';
        const genuineSig = await generateRazorpaySignatureEdge(orderId, paymentId, secret);

        // Tamper byte 10
        const tamperedSig = tamperSignature(genuineSig, 10);
        expect(tamperedSig).not.toBe(genuineSig);

        const isValid = await verifyRazorpaySignatureEdge(orderId, paymentId, tamperedSig, secret);
        expect(isValid).toBe(false);
      });

      it('R3-B2: Rejects truncated HMAC signature (<64 hex characters)', async () => {
        const orderId = 'order_trunc_test';
        const paymentId = 'pay_trunc_test';
        const genuineSig = await generateRazorpaySignatureEdge(orderId, paymentId, secret);

        const truncatedSig = truncateSignature(genuineSig, 40);
        const isValid = await verifyRazorpaySignatureEdge(orderId, paymentId, truncatedSig, secret);
        expect(isValid).toBe(false);
      });

      it('R3-B3: Rejects signature verified against incorrect secret key', async () => {
        const orderId = 'order_key_test';
        const paymentId = 'pay_key_test';
        const genuineSig = await generateRazorpaySignatureEdge(orderId, paymentId, secret);

        const wrongSecret = 'wrong_secret_key_888';
        const isValid = await verifyRazorpaySignatureEdge(orderId, paymentId, genuineSig, wrongSecret);
        expect(isValid).toBe(false);
      });

      it('R3-B4: Rejects signature when orderId or paymentId is modified in transit', async () => {
        const orderId = 'order_original';
        const paymentId = 'pay_original';
        const signature = await generateRazorpaySignatureEdge(orderId, paymentId, secret);

        const spoofedOrderId = 'order_spoofed';
        const isValid = await verifyRazorpaySignatureEdge(spoofedOrderId, paymentId, signature, secret);
        expect(isValid).toBe(false);
      });

      it('R3-B5: Validates Indian phone number boundaries (rejects <10, >10, letters)', () => {
        const isValidIndianPhone = (phone: string): boolean => {
          const cleaned = phone.replace(/\D/g, '').slice(-10);
          return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
        };

        expect(isValidIndianPhone('9848012345')).toBe(true);
        expect(isValidIndianPhone('+91 9848012345')).toBe(true);
        expect(isValidIndianPhone('09848012345')).toBe(true);

        // Invalid boundaries
        expect(isValidIndianPhone('')).toBe(false);
        expect(isValidIndianPhone('12345')).toBe(false);           // Too short
        expect(isValidIndianPhone('984801234')).toBe(false);       // 9 digits
        expect(isValidIndianPhone('1234567890')).toBe(false);       // Does not start with 6-9
        expect(isValidIndianPhone('984801234A')).toBe(false);       // Alphabetic
      });

      it('R3-B6: Rejects empty cart or checkout with 0 total', () => {
        const validateCartTotal = (items: Array<{ unitPrice: number; quantity: number }>): boolean => {
          if (!items || items.length === 0) return false;
          const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
          return total > 0;
        };

        expect(validateCartTotal([])).toBe(false);
        expect(validateCartTotal([{ unitPrice: 5000, quantity: 0 }])).toBe(false);
        expect(validateCartTotal([{ unitPrice: 5000, quantity: -1 }])).toBe(false);
        expect(validateCartTotal([{ unitPrice: 5000, quantity: 1 }])).toBe(true);
      });
    });

    // =========================================================================
    // R4 Boundary Cases: Notification Formatting & HTML Sanitization
    // =========================================================================
    describe('R4 Boundaries: Notification Sanitization & Safeguards', () => {
      it('R4-B1: Sanitizes HTML special characters (<, >, &) in customer village/name for Telegram', () => {
        const dangerousInput = 'Farmer & Sons <Bio-Tech> Village';
        const escaped = escapeTelegramHtml(dangerousInput);
        expect(escaped).toBe('Farmer &amp; Sons &lt;Bio-Tech&gt; Village');
        expect(escaped.includes('<Bio-Tech>')).toBe(false);
      });

      it('R4-B2: Telegram validator catches unclosed HTML tags in message', () => {
        const malformedPayload = {
          chat_id: '12345',
          parse_mode: 'HTML',
          disable_notification: false,
          text: '<b>🚨 NEW ORDER PAID!\nOrder #NF-1001\n<a href="https://wa.me/919848012345">Contact' // unclosed tags
        };

        const result = validateTelegramPayload(malformedPayload);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('Mismatched <b> tags') || e.includes('Mismatched <a> tags'))).toBe(true);
      });

      it('R4-B3: Telegram validator flags violation when disable_notification is set to true', () => {
        const silentPayload = {
          chat_id: '12345',
          parse_mode: 'HTML',
          disable_notification: true, // Violation of acceptance criteria (audible sound required)
          text: '<b>🚨 NEW PRE-PAID ORDER PAID!</b>\nOrder #NF-1001\n<a href="https://wa.me/919848012345">Contact</a>'
        };

        const result = validateTelegramPayload(silentPayload);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('disable_notification must be explicitly false'))).toBe(true);
      });

      it('R4-B4: WhatsApp link safely encodes special characters and spaces without corruption', () => {
        const villageWithSpecialChars = 'Machilipatnam / Beach Road & Ward #4';
        const rawText = `Order for ${villageWithSpecialChars}`;
        const encoded = encodeURIComponent(rawText);
        expect(encoded).not.toContain(' ');
        expect(encoded).not.toContain('&');
        expect(encoded).not.toContain('#');
        expect(decodeURIComponent(encoded)).toBe(rawText);
      });

      it('R4-B5: Telegram validator rejects payload with missing chat_id or empty text', () => {
        const missingChatId = {
          chat_id: '',
          parse_mode: 'HTML',
          disable_notification: false,
          text: '<b>🚨 NEW PRE-PAID ORDER PAID!</b>\nOrder #NF-1001\n<a href="https://wa.me/919848012345">Contact</a>'
        };
        const res1 = validateTelegramPayload(missingChatId);
        expect(res1.valid).toBe(false);
        expect(res1.errors.some(e => e.includes('Missing chat_id'))).toBe(true);

        const emptyText = {
          chat_id: '12345',
          parse_mode: 'HTML',
          disable_notification: false,
          text: ''
        };
        const res2 = validateTelegramPayload(emptyText);
        expect(res2.valid).toBe(false);
        expect(res2.errors.some(e => e.includes('Missing or invalid text field'))).toBe(true);
      });
    });

    // =========================================================================
    // R5 Boundary Cases: SEO / AEO Manifest Validators
    // =========================================================================
    describe('R5 Boundaries: Manifest Validation Failures', () => {
      it('R5-B1: robots.txt validator flags missing AI crawler rules', () => {
        const incompleteRobots = `
User-agent: Googlebot
Allow: /
Sitemap: https://nextfarm.in/sitemap.xml
        `.trim();

        const result = validateRobotsTxtContent(incompleteRobots);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('GPTBot'))).toBe(true);
        expect(result.errors.some(e => e.includes('PerplexityBot'))).toBe(true);
        expect(result.errors.some(e => e.includes('ClaudeBot'))).toBe(true);
      });

      it('R5-B2: Sitemap validator flags missing product PDP paths', () => {
        const partialUrls = [
          'https://nextfarm.in/',
          'https://nextfarm.in/products/next-viro-nill'
        ];
        const result = validateSitemapUrls(partialUrls);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('next-gut'))).toBe(true);
      });

      it('R5-B3: llms.txt validator flags manifest missing clinical keywords', () => {
        const invalidLlms = 'Generic product catalog with no shrimp diseases.';
        const result = validateLlmsManifest(invalidLlms, false);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('White Gut'))).toBe(true);
      });

      it('R5-B4: JSON-LD validator rejects invalid product offer price or missing priceCurrency', () => {
        const invalidPriceJsonLd = [
          { '@type': 'VeterinaryBusiness', name: 'Next Farm' },
          {
            '@type': 'Product',
            name: 'Next Viro Nill',
            offers: { price: 9999, priceCurrency: 'USD' } // Invalid price & currency
          }
        ];
        const result = validateJsonLdStructuredData(invalidPriceJsonLd);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('invalid offer price'))).toBe(true);
        expect(result.errors.some(e => e.includes('invalid priceCurrency'))).toBe(true);
      });

      it('R5-B5: JSON-LD validator rejects structured data missing VeterinaryBusiness schema', () => {
        const noBusinessJsonLd = [
          {
            '@type': 'Product',
            name: 'Next Viro Nill',
            offers: { price: 5000, priceCurrency: 'INR' }
          }
        ];
        const result = validateJsonLdStructuredData(noBusinessJsonLd);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('Missing VeterinaryBusiness'))).toBe(true);
      });
    });

  });
}
