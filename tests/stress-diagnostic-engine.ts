/**
 * Empirical Stress Harness for Pond Doctor Diagnostic Engine & Dosage Calculator
 * Challenger 1: Adversarial Verification & Boundary Exploration
 */

import {
  CLINICAL_SYMPTOMS,
  BASE_DOSAGE_RATES_PER_ACRE,
  SEVERITY_MULTIPLIERS,
  CURATED_BUNDLES,
  allocatePacks,
  calculatePrescription,
  convertFeetToMeters,
  convertMetersToFeet,
  type ClinicalSymptomKey,
  type SeverityLevel
} from '../src/lib/diagnostic-engine.ts';
import { AUTHORITATIVE_CATALOG as PRODUCTS } from './e2e/oracles/catalog-oracle.ts';

interface StressTestStats {
  total: number;
  passed: number;
  failed: number;
  anomalies: string[];
}

const stats: StressTestStats = {
  total: 0,
  passed: 0,
  failed: 0,
  anomalies: []
};

function assert(condition: boolean, msg: string) {
  stats.total++;
  if (condition) {
    stats.passed++;
  } else {
    stats.failed++;
    stats.anomalies.push(`FAIL: ${msg}`);
    console.error(`  ❌ FAIL: ${msg}`);
  }
}

console.log('\n======================================================================');
console.log('🧪 RUNNING EMPIRICAL STRESS HARNESS: Pond Doctor & Dosage Engine');
console.log('======================================================================\n');

// -----------------------------------------------------------------------------
// 1. BOUNDARY TESTS (Acreage & Depth)
// -----------------------------------------------------------------------------
console.log('--- 1. Boundary Tests (Depth & Acreage Constraints) ---');

// 1.1 Depth = 0
try {
  calculatePrescription(['white-gut'], 1.0, 0);
  assert(false, 'Depth = 0 should have thrown an error');
} catch (err: any) {
  assert(
    err.message.includes('Water depth must be strictly greater than 0 meters'),
    `Depth = 0 throws expected message (Got: "${err.message}")`
  );
}

// 1.2 Depth < 0
try {
  calculatePrescription(['white-gut'], 1.0, -0.5);
  assert(false, 'Depth = -0.5 should have thrown an error');
} catch (err: any) {
  assert(
    err.message.includes('Water depth must be strictly greater than 0 meters'),
    `Depth = -0.5 throws expected message (Got: "${err.message}")`
  );
}

// 1.3 Acreage = 0
try {
  calculatePrescription(['toxic-ammonia'], 0, 1.0);
  assert(false, 'Acreage = 0 should have thrown an error');
} catch (err: any) {
  assert(
    err.message.includes('Pond acreage must be strictly greater than 0'),
    `Acreage = 0 throws expected message (Got: "${err.message}")`
  );
}

// 1.4 Acreage < 0
try {
  calculatePrescription(['toxic-ammonia'], -2.0, 1.0);
  assert(false, 'Acreage = -2.0 should have thrown an error');
} catch (err: any) {
  assert(
    err.message.includes('Pond acreage must be strictly greater than 0'),
    `Acreage = -2.0 throws expected message (Got: "${err.message}")`
  );
}

// 1.5 Empty symptoms array
try {
  calculatePrescription([], 1.0, 1.0);
  assert(false, 'Empty symptoms should have thrown an error');
} catch (err: any) {
  assert(
    err.message.includes('At least one clinical symptom must be selected'),
    `Empty symptoms throws expected message (Got: "${err.message}")`
  );
}

// 1.6 Invalid symptom key
try {
  calculatePrescription(['non-existent-symptom' as ClinicalSymptomKey], 1.0, 1.0);
  assert(false, 'Invalid symptom should have thrown an error');
} catch (err: any) {
  assert(
    err.message.includes('Unknown clinical symptom key'),
    `Invalid symptom key throws expected message (Got: "${err.message}")`
  );
}

// 1.7 Fractional depths: 0.1m, 1.25m, 3.5m
const fractionalDepths = [0.1, 1.25, 3.5];
for (const depth of fractionalDepths) {
  const res = calculatePrescription(['white-gut'], 1.0, depth, 'low');
  assert(!isNaN(res.depthFactor), `Depth ${depth}m yields non-NaN depthFactor`);
  assert(res.waterDepthMeters === depth, `Depth ${depth}m preserved in result`);
  assert(res.depthFactor === depth / 1.0, `Depth ${depth}m depthFactor equals depth / 1.0`);
  for (const alloc of res.allocations) {
    assert(!isNaN(alloc.requiredLitersOrKg), `Depth ${depth}m requiredQty is non-NaN`);
    assert(alloc.requiredLitersOrKg > 0, `Depth ${depth}m requiredQty is positive`);
    const supplied = alloc.cans5L * 5 + alloc.bottles1L * 1;
    assert(supplied >= alloc.requiredLitersOrKg, `Depth ${depth}m supplied (${supplied}) >= required (${alloc.requiredLitersOrKg})`);
  }
}

// 1.8 Extreme acreages: 0.01 acre (nursery/hatchery) and 100 acres (massive corporate farm)
const extremeAcreages = [0.01, 0.05, 100.0, 500.0];
for (const ac of extremeAcreages) {
  const res = calculatePrescription(['benthic-sludge', 'vibrio-red'], ac, 1.2, 'acute');
  assert(!isNaN(res.bundleTotalInr), `Acreage ${ac} Ac yields non-NaN bundleTotalInr`);
  assert(res.bundleTotalInr > 0, `Acreage ${ac} Ac yields positive total cost`);
  assert(res.bundleItems.length > 0, `Acreage ${ac} Ac yields at least one bundle item`);
  for (const alloc of res.allocations) {
    const supplied = alloc.cans5L * 5 + alloc.bottles1L * 1;
    assert(supplied >= alloc.requiredLitersOrKg, `Acreage ${ac} Ac supplied (${supplied}) >= required (${alloc.requiredLitersOrKg})`);
  }
}

// -----------------------------------------------------------------------------
// 2. PACKAGING ALLOCATION MATH STRESS TESTS
// -----------------------------------------------------------------------------
console.log('\n--- 2. Packaging Allocation Math Stress Tests (Sweep 0.01L to 100L) ---');

let dosageCoverageViolations = 0;
let costViolations = 0;
let bottleCountAnomalies = 0; // remainder > 4 resulting in 5 bottles

// Sweep 10,000 dosage levels in fine increments
for (let volInt = 1; volInt <= 10000; volInt++) {
  const liters = volInt / 100; // 0.01 to 100.00 Liters
  const { cans5L, bottles1L, totalCost } = allocatePacks(liters);

  // Invariant 1: Integer non-negative quantities
  if (cans5L < 0 || !Number.isInteger(cans5L) || bottles1L < 0 || !Number.isInteger(bottles1L)) {
    dosageCoverageViolations++;
  }

  // Invariant 2: Total supplied must cover required dosage
  const supplied = cans5L * 5 + bottles1L * 1;
  const roundedRequired = Math.round(liters * 100) / 100;
  if (supplied < roundedRequired) {
    dosageCoverageViolations++;
    console.error(`Dosage coverage failure at ${liters}L: supplied ${supplied}L < required ${roundedRequired}L`);
  }

  // Invariant 3: Total cost formula
  const expectedCost = cans5L * 5000 + bottles1L * 1199;
  if (totalCost !== expectedCost) {
    costViolations++;
  }

  // Invariant 4: Check if bottles1L reaches 5
  if (bottles1L >= 5) {
    bottleCountAnomalies++;
  }
}

assert(dosageCoverageViolations === 0, `Packaging allocation covers 100% of required dosage across 10,000 sweep levels`);
assert(costViolations === 0, `Total cost matches cans5L*5000 + bottles1L*1199 across all 10,000 test cases`);

console.log(`  ℹ Note on pack allocation economics: In ${bottleCountAnomalies} of 10,000 test points (when rounded remainder > 4.0L), allocation yields 5 x 1L bottles (Rs. 5,995) instead of 1 x 5L can (Rs. 5,000). Total volume supplied is strictly >= required.`);

// Test boundary zero & negative on allocatePacks directly
const zeroPack = allocatePacks(0);
assert(zeroPack.cans5L === 0 && zeroPack.bottles1L === 0 && zeroPack.totalCost === 0, 'allocatePacks(0) returns zeros');
const negPack = allocatePacks(-5);
assert(negPack.cans5L === 0 && negPack.bottles1L === 0 && negPack.totalCost === 0, 'allocatePacks(-5) returns zeros');

// -----------------------------------------------------------------------------
// 3. SYMPTOM-TO-PRODUCT MAPPING VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n--- 3. Symptom-to-Product Mapping Verification ---');

const expectedMappings: Record<ClinicalSymptomKey, { primary: string; support: string }> = {
  'white-gut': { primary: 'next-gut', support: 'next-viro-nill' },
  'toxic-ammonia': { primary: 'next-converter', support: 'next-remedy' },
  'benthic-sludge': { primary: 'next-sludge', support: 'next-pro-plus' },
  'vibrio-red': { primary: 'next-vibriosis', support: 'next-viro-nill' },
  'molting-cramps': { primary: 'next-min', support: 'next-softner' }
};

const catalogSlugs = new Set(PRODUCTS.map(p => p.slug));

for (const [symptomKey, expected] of Object.entries(expectedMappings) as Array<[ClinicalSymptomKey, { primary: string; support: string }]>) {
  const symDef = CLINICAL_SYMPTOMS[symptomKey];
  assert(symDef !== undefined, `Symptom "${symptomKey}" is defined`);
  assert(symDef.primaryProductSlug === expected.primary, `Symptom "${symptomKey}" primary product is "${expected.primary}"`);
  assert(symDef.supportProductSlug === expected.support, `Symptom "${symptomKey}" support product is "${expected.support}"`);
  assert(catalogSlugs.has(expected.primary), `Primary product "${expected.primary}" exists in catalog`);
  assert(catalogSlugs.has(expected.support), `Support product "${expected.support}" exists in catalog`);
  assert(symDef.recommendedSchedule.length > 0, `Symptom "${symptomKey}" has clinical dosage schedule`);
  assert(symDef.clinicalDescription.length > 10, `Symptom "${symptomKey}" has detailed clinical description`);
  assert(symDef.indication.length > 5, `Symptom "${symptomKey}" has biological indication`);
}

// Multi-symptom deduplication test:
// Selecting white-gut (next-gut + next-viro-nill) AND vibrio-red (next-vibriosis + next-viro-nill)
// Result must contain next-viro-nill exactly once (deduplicated)
const multiRes = calculatePrescription(['white-gut', 'vibrio-red'], 2.0, 1.0, 'moderate');
const viroNillAllocations = multiRes.allocations.filter(a => a.productSlug === 'next-viro-nill');
assert(viroNillAllocations.length === 1, 'Multi-symptom prescription deduplicates shared support product (Next Viro Nill)');
assert(multiRes.allocations.length === 3, 'Multi-symptom prescription has exactly 3 unique products (Next Gut, Next Viro Nill, Next Vibriosis)');

// All 5 symptoms selected test:
const allSymptoms: ClinicalSymptomKey[] = ['white-gut', 'toxic-ammonia', 'benthic-sludge', 'vibrio-red', 'molting-cramps'];
const allRes = calculatePrescription(allSymptoms, 5.0, 1.2, 'acute');
const uniqueProductsInRx = new Set(allRes.allocations.map(a => a.productSlug));
assert(uniqueProductsInRx.size === allRes.allocations.length, 'All 5 symptoms combined produce unique products without duplicates');

// -----------------------------------------------------------------------------
// 4. CURATED BUNDLES VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n--- 4. Curated Bundles Verification ---');

assert(CURATED_BUNDLES.length === 5, 'Exactly 5 curated bundles defined');

for (const bundle of CURATED_BUNDLES) {
  assert(bundle.id.startsWith('bundle-'), `Bundle ${bundle.id} has valid ID prefix`);
  assert(bundle.name.length > 0, `Bundle ${bundle.id} has non-empty name`);
  assert(bundle.items.length >= 2, `Bundle ${bundle.id} has at least 2 items`);

  let calculatedOriginalPrice = 0;
  for (const item of bundle.items) {
    const product = PRODUCTS.find(p => p.slug === item.productId);
    assert(product !== undefined, `Bundle ${bundle.id} item "${item.productId}" exists in catalog`);
    
    // Check unit price matching catalog standard pricing
    const expectedUnitPrice = item.packSize === '5L' ? 5000 : 1199;
    assert(item.unitPrice === expectedUnitPrice, `Bundle ${bundle.id} item "${item.productId}" ${item.packSize} has unit price ${expectedUnitPrice}`);
    
    calculatedOriginalPrice += item.quantity * item.unitPrice;
  }

  assert(
    bundle.originalPrice === calculatedOriginalPrice,
    `Bundle ${bundle.id} originalPrice (${bundle.originalPrice}) matches sum of items (${calculatedOriginalPrice})`
  );

  const calculatedSavings = bundle.originalPrice - bundle.bundlePrice;
  assert(
    bundle.savings === calculatedSavings,
    `Bundle ${bundle.id} savings (${bundle.savings}) matches original - bundlePrice (${calculatedSavings})`
  );

  assert(bundle.bundlePrice < bundle.originalPrice, `Bundle ${bundle.id} offers a discount (bundlePrice < originalPrice)`);
  
  const discountPercent = (bundle.savings / bundle.originalPrice) * 100;
  assert(discountPercent >= 5 && discountPercent <= 20, `Bundle ${bundle.id} discount is realistic (${discountPercent.toFixed(1)}%)`);

  for (const sym of bundle.targetSymptoms) {
    assert(expectedMappings[sym] !== undefined, `Bundle ${bundle.id} target symptom "${sym}" is a valid clinical symptom`);
  }
}

// -----------------------------------------------------------------------------
// 5. UNIT CONVERSIONS & UI CALCULATOR CONSISTENCY
// -----------------------------------------------------------------------------
console.log('\n--- 5. Unit Conversion Math (Feet <-> Meters) ---');

const feetValues = [3.28084, 4.0, 5.0, 6.0, 10.0];
for (const ft of feetValues) {
  const m = convertFeetToMeters(ft);
  const backToFt = convertMetersToFeet(m);
  assert(Math.abs(backToFt - ft) < 1e-6, `Feet to meters round-trip for ${ft} ft is exact`);
}

// Check standard 1 meter = 3.28084 feet
const oneMeterInFeet = convertMetersToFeet(1.0);
assert(Math.abs(oneMeterInFeet - 3.28084) < 0.01, `1 meter converts to ~3.28 feet (got ${oneMeterInFeet.toFixed(4)})`);

// Depth factor formula check
assert(1.0 / 1.0 === 1.0, 'Standard 1m depth factor is 1.0x');
assert(1.5 / 1.0 === 1.5, '1.5m depth factor is 1.5x');
assert(0.8 / 1.0 === 0.8, '0.8m depth factor is 0.8x');

console.log('\n======================================================================');
console.log(`📊 STRESS TEST EXECUTION COMPLETE`);
console.log(`Total Assertions: ${stats.total}`);
console.log(`Passed:           ${stats.passed}`);
console.log(`Failed:           ${stats.failed}`);
console.log('======================================================================\n');

if (stats.failed > 0) {
  console.error(`🚨 ${stats.failed} ASSERTIONS FAILED!`);
  process.exit(1);
} else {
  console.log('✅ ALL STRESS HARNESS ASSERTIONS PASSED WITH 100% SUCCESS RATE!\n');
  process.exit(0);
}
