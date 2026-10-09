/**
 * Authoritative Pond Doctor Diagnostic Oracle
 * Source: ORIGINAL_REQUEST.md (R2), PROJECT.md (§ Pond Doctor), survey_catalog_assets.md.
 */

export type ClinicalSymptomKey =
  | 'white-gut'
  | 'toxic-ammonia'
  | 'benthic-sludge'
  | 'vibrio-red'
  | 'molting-cramps';

export type SeverityLevel = 'low' | 'moderate' | 'acute';

export interface SymptomDefinition {
  key: ClinicalSymptomKey;
  label: string;
  primaryProductSlug: string;
  supportProductSlug: string;
  clinicalDescription: string;
}

export const CLINICAL_SYMPTOMS: Record<ClinicalSymptomKey, SymptomDefinition> = {
  'white-gut': {
    key: 'white-gut',
    label: 'White Gut / White Feces',
    primaryProductSlug: 'next-gut',
    supportProductSlug: 'next-viro-nill',
    clinicalDescription: 'Enteric pathogen colonization (Vibrio, microsporidia), trailing fecal strands, and sharp feed drop.'
  },
  'toxic-ammonia': {
    key: 'toxic-ammonia',
    label: 'Toxic Ammonia & Gas Spikes',
    primaryProductSlug: 'next-converter',
    supportProductSlug: 'next-remedy',
    clinicalDescription: 'Nitrogenous waste accumulation, NH3 > 0.5 ppm, NO2 > 1.0 ppm, and rotten egg H2S odor.'
  },
  'benthic-sludge': {
    key: 'benthic-sludge',
    label: 'Benthic Sludge & Black Mud',
    primaryProductSlug: 'next-sludge',
    supportProductSlug: 'next-pro-plus',
    clinicalDescription: 'Central drainage pit blackening, dead organic sedimentation, and anaerobic bottom crust.'
  },
  'vibrio-red': {
    key: 'vibrio-red',
    label: 'Vibrio / Red Disease / EMS',
    primaryProductSlug: 'next-vibriosis',
    supportProductSlug: 'next-viro-nill',
    clinicalDescription: 'Virulent green TCBS Vibrio colonies (>100 CFU), red antennae/pleopods, and hepatopancreas necrosis.'
  },
  'molting-cramps': {
    key: 'molting-cramps',
    label: 'Molting Cramps & Soft Shell',
    primaryProductSlug: 'next-min',
    supportProductSlug: 'next-softner',
    clinicalDescription: 'Ionic calcium/magnesium deficit, soft carapaces > 4h post-ecdysis, and white muscle spasms.'
  }
};

export const BASE_DOSAGE_RATES_PER_ACRE: Record<string, number> = {
  'next-viro-nill': 1.0,
  'next-gut': 2.0,
  'next-converter': 2.0,
  'next-sludge': 2.0,
  'next-vibriosis': 1.5,
  'next-min': 5.0,
  'next-food-pro': 1.0,
  'next-softner': 2.0,
  'next-remedy': 1.0,
  'next-pro-plus': 1.0,
  'next-pro': 1.0
};

export const SEVERITY_MULTIPLIERS: Record<SeverityLevel, number> = {
  low: 1.0,
  moderate: 1.5,
  acute: 2.0
};

export interface ProductPrescriptionAllocation {
  productSlug: string;
  role: 'primary' | 'support';
  requiredLitersOrKg: number;
  cans5L: number;
  bottles1L: number;
  totalCostInr: number;
}

export interface DiagnosticResult {
  symptoms: ClinicalSymptomKey[];
  acreage: number;
  waterDepthMeters: number;
  severity: SeverityLevel;
  depthFactor: number;
  allocations: ProductPrescriptionAllocation[];
  bundleTotalInr: number;
  bundleItems: Array<{
    productId: string;
    packSize: '5L' | '1L';
    quantity: number;
    unitPrice: number;
  }>;
}

/**
 * Converts depth from feet to standard aquaculture meters.
 */
export function convertFeetToMeters(feet: number): number {
  return feet * 0.3048;
}

/**
 * Calculates pack allocation according to economical pricing rules:
 * 5L Cans @ Rs. 5,000 (Rs. 1,000/L)
 * 1L Bottles @ Rs. 1,199 (Rs. 1,199/L)
 */
export function allocatePacks(totalLiters: number): { cans5L: number; bottles1L: number; totalCost: number } {
  if (totalLiters <= 0) {
    return { cans5L: 0, bottles1L: 0, totalCost: 0 };
  }

  const roundedTotal = Math.round(totalLiters * 100) / 100;
  const cans5L = Math.floor(roundedTotal / 5);
  const remainder = roundedTotal % 5;
  const bottles1L = Math.ceil(remainder);

  const totalCost = cans5L * 5000 + bottles1L * 1199;
  return { cans5L, bottles1L, totalCost };
}

/**
 * Computes authoritative clinical prescription for given symptoms, acreage, depth, and severity.
 */
export function calculatePrescription(
  symptoms: ClinicalSymptomKey[],
  acreage: number,
  depthMeters: number,
  severity: SeverityLevel = 'moderate'
): DiagnosticResult {
  if (!symptoms || symptoms.length === 0) {
    throw new Error('At least one clinical symptom must be selected.');
  }
  if (acreage <= 0) {
    throw new Error('Pond acreage must be strictly greater than 0.');
  }
  if (depthMeters <= 0) {
    throw new Error('Water depth must be strictly greater than 0 meters.');
  }

  const depthFactor = depthMeters / 1.0;
  const severityMultiplier = SEVERITY_MULTIPLIERS[severity] ?? 1.5;

  const productRoles = new Map<string, 'primary' | 'support'>();

  for (const symptomKey of symptoms) {
    const symDef = CLINICAL_SYMPTOMS[symptomKey];
    if (!symDef) {
      throw new Error(`Unknown clinical symptom key: ${symptomKey}`);
    }
    // Set primary
    productRoles.set(symDef.primaryProductSlug, 'primary');
    // Set support if not already primary
    if (!productRoles.has(symDef.supportProductSlug)) {
      productRoles.set(symDef.supportProductSlug, 'support');
    }
  }

  const allocations: ProductPrescriptionAllocation[] = [];
  const bundleItems: Array<{
    productId: string;
    packSize: '5L' | '1L';
    quantity: number;
    unitPrice: number;
  }> = [];

  let bundleTotalInr = 0;

  for (const [slug, role] of productRoles.entries()) {
    const baseRate = BASE_DOSAGE_RATES_PER_ACRE[slug] ?? 1.0;
    const requiredQty = acreage * depthFactor * baseRate * severityMultiplier;
    const { cans5L, bottles1L, totalCost } = allocatePacks(requiredQty);

    allocations.push({
      productSlug: slug,
      role,
      requiredLitersOrKg: Math.round(requiredQty * 100) / 100,
      cans5L,
      bottles1L,
      totalCostInr: totalCost
    });

    bundleTotalInr += totalCost;

    if (cans5L > 0) {
      bundleItems.push({
        productId: slug,
        packSize: '5L',
        quantity: cans5L,
        unitPrice: 5000
      });
    }
    if (bottles1L > 0) {
      bundleItems.push({
        productId: slug,
        packSize: '1L',
        quantity: bottles1L,
        unitPrice: 1199
      });
    }
  }

  return {
    symptoms,
    acreage,
    waterDepthMeters: depthMeters,
    severity,
    depthFactor,
    allocations,
    bundleTotalInr,
    bundleItems
  };
}
