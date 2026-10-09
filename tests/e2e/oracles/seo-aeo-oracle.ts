/**
 * Authoritative SEO / AEO Manifests & Structured Data Oracle
 * Source: ORIGINAL_REQUEST.md (R5), PROJECT.md (§ Search & AI Discovery), survey_integrations.md.
 */

import { VALID_SLUGS } from './catalog-oracle.ts';

export const EXPECTED_AI_BOTS = ['Googlebot', 'GPTBot', 'PerplexityBot', 'ClaudeBot'];

export function validateRobotsTxtContent(content: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const bot of EXPECTED_AI_BOTS) {
    const botPattern = new RegExp(`User-agent:\\s*${bot}`, 'i');
    if (!botPattern.test(content)) {
      errors.push(`robots.txt missing User-agent rule for AI crawler: ${bot}`);
    }
  }

  if (!/Sitemap:\s*https?:\/\/[^\s]+\/sitemap\.xml/i.test(content)) {
    errors.push('robots.txt missing Sitemap directive referencing /sitemap.xml');
  }

  return { valid: errors.length === 0, errors };
}

export function validateSitemapUrls(urls: string[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  const requiredPaths = [
    '/',
    '/pond-doctor',
    ...VALID_SLUGS.map(slug => `/products/${slug}`)
  ];

  for (const reqPath of requiredPaths) {
    const found = urls.some(u => {
      try {
        const parsed = new URL(u);
        return parsed.pathname === reqPath || parsed.pathname === `${reqPath}/`;
      } catch {
        return u.endsWith(reqPath);
      }
    });

    if (!found) {
      errors.push(`Sitemap missing expected route: ${reqPath}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

export function validateLlmsManifest(content: string, isFull: boolean = false): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!content.includes('Next Farm Bio Sciences')) {
    errors.push('Manifest missing brand title "Next Farm Bio Sciences"');
  }

  // Acceptance criteria: semantic index for white gut, ammonia, and WSSV treatments
  const clinicalKeywords = ['White Gut', 'Ammonia', 'WSSV', 'Vibrio', '8977656444'];
  for (const kw of clinicalKeywords) {
    if (!content.includes(kw)) {
      errors.push(`llms manifest missing required clinical keyword: "${kw}"`);
    }
  }

  if (isFull) {
    // Deep clinical protocol must mention CFU counts and all 11 formulations
    for (const slug of VALID_SLUGS) {
      if (!content.toLowerCase().includes(slug.replace(/-/g, ' '))) {
        errors.push(`llms-full.txt missing formulation reference: ${slug}`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

export function validateJsonLdStructuredData(jsonLdArray: any[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  const types = jsonLdArray.map(obj => obj['@type']);

  if (!types.includes('VeterinaryBusiness') && !types.includes('LocalBusiness')) {
    errors.push('Missing VeterinaryBusiness or LocalBusiness schema in structured data');
  }

  const productSchemas = jsonLdArray.filter(obj => obj['@type'] === 'Product');
  if (productSchemas.length === 0) {
    errors.push('Missing Product schemas in structured data');
  } else {
    for (const prod of productSchemas) {
      if (!prod.name) errors.push('Product schema missing name');
      if (!prod.offers || (prod.offers.price !== 5000 && prod.offers.price !== 1199)) {
        errors.push(`Product schema ${prod.name} has invalid offer price`);
      }
      if (prod.offers?.priceCurrency !== 'INR') {
        errors.push(`Product schema ${prod.name} has invalid priceCurrency (expected 'INR')`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
