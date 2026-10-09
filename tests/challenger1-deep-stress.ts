/**
 * Deep Adversarial Empirical Stress Test Suite for Gate 2
 * Challenger 1: Pond Doctor Diagnostic Engine & Acreage Math
 * Target: src/lib/diagnostic-engine.ts & UI Calculator contracts
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

interface AssertionResult {
  total: number;
  passed: number;
  failed: number;
  failures: string[];
  findings: string[];
}

const report: AssertionResult = {
  total: 0,
  passed: 0,
  failed: 0,
  failures: [],
  findings: []
};

function check(condition: boolean, description: string) {
  report.total++;
  if (condition) {
    report.passed++;
  } else {
    report.failed++;
    report.failures.push(description);
    console.error(`  ❌ FAILED: ${description}`);
  }
}

function recordFinding(finding: string) {
  report.findings.push(finding);
  console.log(`  🔍 EMPIRICAL OBSERVATION: ${finding}`);
}

console.log('========================================================================');
console.log('🔬 CHALLENGER 1: ADVERSARIAL STRESS TEST SUITE (GATE 2)');
console.log('   Pond Doctor Diagnostic Engine & Volumetric Packaging Math');
console.log('========================================================================\n');

// ============================================================================
// 1. BOUNDARY & CORNER CASE EXPLORATION
// ============================================================================
console.log('--- 1. Boundary & Corner Cases (Depth, Acreage, Symptoms) ---');

// 1.1 Zero & Negative Depth
const invalidDepths = [0, -0.0001, -0.1, -1.0, -10.0];
for (const d of invalidDepths) {
  try {
    calculatePrescription(['white-gut'], 1.0, d, 'low');
    check(false, `calculatePrescription should reject depth = ${d}`);
  } catch (err: any) {
    check(
      err.message.includes('Water depth must be strictly greater than 0 meters'),
      `Rejects invalid depth = ${d} with clear message: "${err.message}"`
    );
  }
}

// 1.2 Zero & Negative Acreage
const invalidAcreages = [0, -0.0001, -0.5, -2.0, -100.0];
for (const a of invalidAcreages) {
  try {
    calculatePrescription(['toxic-ammonia'], a, 1.0, 'low');
    check(false, `calculatePrescription should reject acreage = ${a}`);
  } catch (err: any) {
    check(
      err.message.includes('Pond acreage must be strictly greater than 0'),
      `Rejects invalid acreage = ${a} with clear message: "${err.message}"`
    );
  }
}

// 1.3 Empty / Missing Symptoms
try {
  calculatePrescription([], 1.0, 1.0);
  check(false, 'calculatePrescription should reject empty symptoms array');
} catch (err: any) {
  check(
    err.message.includes('At least one clinical symptom must be selected'),
    `Rejects empty symptoms array: "${err.message}"`
  );
}

// 1.4 Invalid symptom keys
const bogusKeys = ['unknown-syndrome', 'covid-shrimp', '', '123'];
for (const k of bogusKeys) {
  try {
    calculatePrescription([k as ClinicalSymptomKey], 1.0, 1.0);
    check(false, `calculatePrescription should reject bogus key "${k}"`);
  } catch (err: any) {
    check(
      err.message.includes('Unknown clinical symptom key'),
      `Rejects bogus key "${k}": "${err.message}"`
    );
  }
}

// 1.5 Fractional depths explicitly required: 0.1m, 1.25m, 3.5m
const specifiedDepths = [0.1, 1.25, 3.5];
for (const depth of specifiedDepths) {
  const res = calculatePrescription(['white-gut'], 1.0, depth, 'moderate');
  check(res.waterDepthMeters === depth, `Fractional depth ${depth}m preserved in result`);
  check(res.depthFactor === depth / 1.0, `Fractional depth ${depth}m depthFactor correct`);
  check(!isNaN(res.bundleTotalInr) && res.bundleTotalInr > 0, `Depth ${depth}m produces positive total cost`);
  for (const alloc of res.allocations) {
    const supplied = alloc.cans5L * 5 + alloc.bottles1L * 1;
    check(supplied >= alloc.requiredLitersOrKg, `Depth ${depth}m supplied ${supplied}L >= required ${alloc.requiredLitersOrKg}L`);
  }
}

// 1.6 Extreme Acreage: 0.01 acre (nursery/hatchery) and 100 acres (massive commercial farm)
const resMicro = calculatePrescription(['white-gut'], 0.01, 1.0, 'low');
check(resMicro.acreage === 0.01, '0.01 Acreage preserved in micro-farm calculation');
check(resMicro.allocations.length === 2, '0.01 Acreage returns allocations for both primary & support');
check(resMicro.bundleTotalInr > 0, '0.01 Acreage at 1.0m produces non-zero bundle cost');

// Note on micro-acreage at ultra-shallow depth:
const resUltraSmall = calculatePrescription(['white-gut'], 0.01, 0.1, 'low');
if (resUltraSmall.bundleTotalInr === 0) {
  recordFinding('Under-delivery threshold on ultra-micro pond: 0.01 Acre at 0.1m depth requires 0.002L, which rounds to 0.00L, resulting in 0 cans, 0 bottles, and Rs. 0 total.');
}

const resMacro = calculatePrescription(['white-gut'], 100.0, 1.0, 'low');
check(resMacro.acreage === 100.0, '100 Acres preserved in macro-farm calculation');
check(resMacro.bundleTotalInr > 0, '100 Acres produces valid total cost');
const macroGut = resMacro.allocations.find(a => a.productSlug === 'next-gut')!;
// 100 acres * 1.0m * 2.0 L/ac * 1.0 = 200 L -> 40 cans of 5L, 0 bottles
check(macroGut.requiredLitersOrKg === 200, '100 Acres requires exactly 200 Liters Next Gut');
check(macroGut.cans5L === 40, '100 Acres allocates exactly 40 x 5L cans Next Gut');
check(macroGut.bottles1L === 0, '100 Acres allocates 0 x 1L bottles Next Gut');
check(macroGut.totalCostInr === 40 * 5000, '100 Acres total cost is 40 * 5000 = 200,000 INR');

// ============================================================================
// 2. PACKAGING ALLOCATION MATH STRESS TESTS
// ============================================================================
console.log('\n--- 2. Packaging Allocation Math Stress Tests (Sweep 0.01L to 200L) ---');

let underSupplyCount = 0;
let invalidIntCount = 0;
let costMismatchCount = 0;
let subOptimalPackCount = 0;

for (let i = 1; i <= 20000; i++) {
  const vol = i / 100; // 0.01 to 200.00 Liters in 0.01L steps
  const { cans5L, bottles1L, totalCost } = allocatePacks(vol);

  // Invariant 1: Non-negative integers
  if (cans5L < 0 || bottles1L < 0 || !Number.isInteger(cans5L) || !Number.isInteger(bottles1L)) {
    invalidIntCount++;
  }

  // Invariant 2: Total supplied must cover required volume
  const supplied = cans5L * 5 + bottles1L * 1;
  const roundedVol = Math.round(vol * 100) / 100;
  if (supplied < roundedVol) {
    underSupplyCount++;
  }

  // Invariant 3: Cost formula exactness
  const expectedCost = cans5L * 5000 + bottles1L * 1199;
  if (totalCost !== expectedCost) {
    costMismatchCount++;
  }

  // Invariant 4: Sub-optimal economic condition (5 bottles cost 5995 INR vs 1 can 5000 INR)
  if (bottles1L === 5) {
    subOptimalPackCount++;
  }
}

check(invalidIntCount === 0, 'Pack allocations always yield non-negative integers');
check(underSupplyCount === 0, 'Pack allocations strictly deliver >= required volume across 20,000 sweep cases');
check(costMismatchCount === 0, 'Pack allocation totalCost strictly equals cans*5000 + bottles*1199 across 20,000 sweep cases');

recordFinding(`Sub-optimal economic pack allocation detected in ${subOptimalPackCount} / 20,000 cases: when remainder > 4.0L, algorithm allocates 5x 1L bottles (Rs. 5,995) instead of 1x 5L can (Rs. 5,000), costing the farmer an unnecessary premium of Rs. 995.`);

// Boundary values for allocatePacks directly:
const zeroPack = allocatePacks(0);
check(zeroPack.cans5L === 0 && zeroPack.bottles1L === 0 && zeroPack.totalCost === 0, 'allocatePacks(0) returns all zeros');
const negPack = allocatePacks(-10);
check(negPack.cans5L === 0 && negPack.bottles1L === 0 && negPack.totalCost === 0, 'allocatePacks(-10) returns all zeros');
const exact5L = allocatePacks(5.0);
check(exact5L.cans5L === 1 && exact5L.bottles1L === 0 && exact5L.totalCost === 5000, 'allocatePacks(5.0) allocates exactly 1 can 5L');
const exact10L = allocatePacks(10.0);
check(exact10L.cans5L === 2 && exact10L.bottles1L === 0 && exact10L.totalCost === 10000, 'allocatePacks(10.0) allocates exactly 2 cans 5L');

// ============================================================================
// 3. SYMPTOM-TO-PRODUCT MAPPING (ALL 5 SYMPTOMS + COMBINATIONS)
// ============================================================================
console.log('\n--- 3. Symptom-to-Product Mapping & Deduplication ---');

const symptomsList: ClinicalSymptomKey[] = [
  'white-gut',
  'toxic-ammonia',
  'benthic-sludge',
  'vibrio-red',
  'molting-cramps'
];

const expectedMap: Record<ClinicalSymptomKey, { primary: string; support: string }> = {
  'white-gut': { primary: 'next-gut', support: 'next-viro-nill' },
  'toxic-ammonia': { primary: 'next-converter', support: 'next-remedy' },
  'benthic-sludge': { primary: 'next-sludge', support: 'next-pro-plus' },
  'vibrio-red': { primary: 'next-vibriosis', support: 'next-viro-nill' },
  'molting-cramps': { primary: 'next-min', support: 'next-softner' }
};

for (const symKey of symptomsList) {
  const symDef = CLINICAL_SYMPTOMS[symKey];
  check(symDef !== undefined, `Symptom "${symKey}" is registered in CLINICAL_SYMPTOMS`);
  check(symDef.primaryProductSlug === expectedMap[symKey].primary, `Symptom "${symKey}" maps to primary product "${expectedMap[symKey].primary}"`);
  check(symDef.supportProductSlug === expectedMap[symKey].support, `Symptom "${symKey}" maps to support product "${expectedMap[symKey].support}"`);
  
  // Verify schedule
  check(symDef.recommendedSchedule.length >= 2, `Symptom "${symKey}" includes stage-wise clinical schedule`);
  for (const step of symDef.recommendedSchedule) {
    check(step.day.length > 0 && step.action.length > 0 && step.instructions.length > 0, `Schedule step is complete for "${symKey}"`);
  }

  // Single-symptom prescription test
  const rx = calculatePrescription([symKey], 2.0, 1.0, 'moderate');
  check(rx.allocations.length === 2, `Single symptom "${symKey}" produces exactly 2 allocations (primary + support)`);
  check(rx.allocations.some(a => a.productSlug === expectedMap[symKey].primary && a.role === 'primary'), `Primary role assigned correctly for "${symKey}"`);
  check(rx.allocations.some(a => a.productSlug === expectedMap[symKey].support && a.role === 'support'), `Support role assigned correctly for "${symKey}"`);
}

// Adversarial test: Multi-symptom power-set (all 31 non-empty subsets)
console.log('Testing all 31 non-empty symptom combinations for deduplication and integrity...');
let combinationDeduplicationFailures = 0;
let combinationBundleCostMismatch = 0;

for (let mask = 1; mask < 32; mask++) {
  const subset: ClinicalSymptomKey[] = [];
  for (let i = 0; i < 5; i++) {
    if (mask & (1 << i)) {
      subset.push(symptomsList[i]);
    }
  }

  const res = calculatePrescription(subset, 3.0, 1.2, 'moderate');

  // Check unique products in allocations
  const slugs = res.allocations.map(a => a.productSlug);
  const uniqueSlugs = new Set(slugs);
  if (slugs.length !== uniqueSlugs.size) {
    combinationDeduplicationFailures++;
  }

  // Check bundleTotalInr matches sum of allocations
  const sumCost = res.allocations.reduce((sum, a) => sum + a.totalCostInr, 0);
  if (res.bundleTotalInr !== sumCost) {
    combinationBundleCostMismatch++;
  }

  // Check bundle items unit price and pack size consistency
  for (const item of res.bundleItems) {
    if (!['5L', '1L'].includes(item.packSize) || ![5000, 1199].includes(item.unitPrice)) {
      combinationBundleCostMismatch++;
    }
  }
}

check(combinationDeduplicationFailures === 0, 'All 31 symptom combinations cleanly deduplicate shared products');
check(combinationBundleCostMismatch === 0, 'All 31 symptom combinations maintain exact bundleTotalInr equality');

// ============================================================================
// 4. CURATED BUNDLES VERIFICATION
// ============================================================================
console.log('\n--- 4. Curated Bundles Verification ---');

check(CURATED_BUNDLES.length === 5, 'Exactly 5 curated bundles configured');

for (const bundle of CURATED_BUNDLES) {
  check(bundle.id.length > 0 && bundle.name.length > 0, `Bundle ${bundle.id} has ID and name`);
  check(bundle.items.length >= 2, `Bundle ${bundle.id} has at least 2 items`);

  let calculatedOriginalPrice = 0;
  for (const item of bundle.items) {
    const catalogItem = PRODUCTS.find(p => p.slug === item.productId);
    check(catalogItem !== undefined, `Bundle ${bundle.id} references catalog product "${item.productId}"`);
    
    const expectedUnitPrice = item.packSize === '5L' ? 5000 : 1199;
    check(item.unitPrice === expectedUnitPrice, `Bundle ${bundle.id} item "${item.productId}" ${item.packSize} has correct unitPrice ${expectedUnitPrice}`);

    calculatedOriginalPrice += item.quantity * item.unitPrice;
  }

  check(
    bundle.originalPrice === calculatedOriginalPrice,
    `Bundle ${bundle.id} originalPrice (${bundle.originalPrice}) matches item sum (${calculatedOriginalPrice})`
  );

  check(
    bundle.savings === bundle.originalPrice - bundle.bundlePrice,
    `Bundle ${bundle.id} savings (${bundle.savings}) matches originalPrice - bundlePrice`
  );

  check(
    bundle.bundlePrice < bundle.originalPrice,
    `Bundle ${bundle.id} bundlePrice (${bundle.bundlePrice}) < originalPrice (${bundle.originalPrice})`
  );
}

// ============================================================================
// 5. UNIT CONVERSION MATH & UI COUPLING
// ============================================================================
console.log('\n--- 5. Unit Conversion Math (Feet <-> Meters) ---');

const testMeters = [0.1, 0.5, 1.0, 1.25, 1.5, 2.0, 3.0, 5.0];
for (const m of testMeters) {
  const ft = convertMetersToFeet(m);
  const backM = convertFeetToMeters(ft);
  check(Math.abs(backM - m) < 1e-9, `Round-trip conversion for ${m}m is exact to 9 decimal places`);
}

// Test UI display conversion stability
const uiFeet = 3.3; // 1.00584 meters
const uiMeters = Math.round(uiFeet * 0.3048 * 100) / 100;
check(uiMeters === 1.01, 'UI 3.3 feet converts to 1.01 meters');
const uiDisplayFeet = Math.round((uiMeters / 0.3048) * 10) / 10;
check(uiDisplayFeet === 3.3, 'UI 1.01 meters converts back to 3.3 feet display value');

console.log('\n========================================================================');
console.log('📊 CHALLENGER 1 STRESS TEST SUMMARY');
console.log(`   Total Assertions Executed: ${report.total}`);
console.log(`   Passed:                    ${report.passed}`);
console.log(`   Failed:                    ${report.failed}`);
console.log('========================================================================\n');

if (report.failed > 0) {
  console.error(`🚨 ${report.failed} FAILURES ENCOUNTERED IN EMPIRICAL STRESS TEST!`);
  process.exit(1);
} else {
  console.log('✅ ALL CHALLENGER 1 STRESS ASSERTIONS PASSED WITH 100% SUCCESS RATE!\n');
  process.exit(0);
}
