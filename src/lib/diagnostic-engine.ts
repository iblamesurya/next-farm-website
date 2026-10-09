/**
 * Pond Doctor Diagnostic Engine
 * Authoritative diagnostic rules, depth-adjusted volumetric math, and pack allocation
 * Source: ORIGINAL_REQUEST.md (R2), PROJECT.md (§ Pond Doctor), survey_catalog_assets.md
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
  indication: string;
  recommendedSchedule: Array<{
    day: string;
    action: string;
    instructions: string;
  }>;
}

export const CLINICAL_SYMPTOMS: Record<ClinicalSymptomKey, SymptomDefinition> = {
  'white-gut': {
    key: 'white-gut',
    label: 'White Gut / White Feces',
    primaryProductSlug: 'next-gut',
    supportProductSlug: 'next-viro-nill',
    clinicalDescription:
      'Enteric pathogen colonization (Vibrio, microsporidia), trailing fecal strands, and sharp feed drop.',
    indication: 'Midgut mucosal biofilm defense & enzyme activation',
    recommendedSchedule: [
      {
        day: 'Day 1–2 (Shock Dose)',
        action: 'Feed Top-Dress + Water Broadcast',
        instructions:
          'Top-dress Next Gut @ 15–20 mL/kg feed across all daily meals. Broadcast Next Viro Nill @ 1.0 L/Acre in morning aeration.'
      },
      {
        day: 'Day 3–5 (Recovery)',
        action: 'Continued Feed Probiotic',
        instructions:
          'Continue Next Gut @ 10 mL/kg feed. Monitor fecal trays for clearing of white strings.'
      }
    ]
  },
  'toxic-ammonia': {
    key: 'toxic-ammonia',
    label: 'Toxic Ammonia & Gas Spikes',
    primaryProductSlug: 'next-converter',
    supportProductSlug: 'next-remedy',
    clinicalDescription:
      'Nitrogenous waste accumulation, NH3 > 0.5 ppm, NO2 > 1.0 ppm, and rotten egg H2S odor.',
    indication: 'Rapid biological nitrification & sulfide oxidation',
    recommendedSchedule: [
      {
        day: 'Day 1 (Morning 8 AM)',
        action: 'Shock Gas Neutralization',
        instructions:
          'Broadcast 60% of Next Converter requirement directly in front of paddlewheel aerators.'
      },
      {
        day: 'Day 2 (Morning 8 AM)',
        action: 'Secondary Clearance Dose',
        instructions:
          'Broadcast remaining 40% of Next Converter. Test TAN levels with water test kit.'
      },
      {
        day: 'Day 3 (Color Stabilization)',
        action: 'Microbial Equilibrium Support',
        instructions:
          'Apply Next Remedy @ 1.0 L/Acre if green water transparency is below 25 cm.'
      }
    ]
  },
  'benthic-sludge': {
    key: 'benthic-sludge',
    label: 'Benthic Sludge & Black Mud',
    primaryProductSlug: 'next-sludge',
    supportProductSlug: 'next-pro-plus',
    clinicalDescription:
      'Central drainage pit blackening, dead organic sedimentation, and anaerobic bottom crust.',
    indication: 'Deep fungal enzymatic hydrolysis of benthic organic waste',
    recommendedSchedule: [
      {
        day: 'Day 1 (Evening)',
        action: 'Sludge Pit Broadcasting',
        instructions:
          'Mix Next Sludge with fine dry sand and broadcast directly over central drain and feeding zones.'
      },
      {
        day: 'Day 4 (Morning)',
        action: 'Botanical Benthic Conditioning',
        instructions:
          'Broadcast Next Pro Plus to stimulate zooplankton bloom and nourish beneficial benthic microflora.'
      }
    ]
  },
  'vibrio-red': {
    key: 'vibrio-red',
    label: 'Vibrio / Red Disease / EMS',
    primaryProductSlug: 'next-vibriosis',
    supportProductSlug: 'next-viro-nill',
    clinicalDescription:
      'Virulent green TCBS Vibrio colonies (>100 CFU), red antennae/pleopods, and hepatopancreas necrosis.',
    indication: 'Natural bacteriocin suppression & hepatopancreas defense',
    recommendedSchedule: [
      {
        day: 'Day 1 (Shock Biosecurity)',
        action: 'Dual Water & Feed Administration',
        instructions:
          'Broadcast Next Vibriosis @ 2.0 L/Acre during morning aeration. Coat 15 mL/kg Next Vibriosis onto feed.'
      },
      {
        day: 'Day 3 (Sanitization)',
        action: 'Sediment Vector Reduction',
        instructions:
          'Apply Next Viro Nill @ 1.0 L/Acre to eliminate sediment viral/bacterial vectors.'
      }
    ]
  },
  'molting-cramps': {
    key: 'molting-cramps',
    label: 'Molting Cramps & Soft Shell',
    primaryProductSlug: 'next-min',
    supportProductSlug: 'next-softner',
    clinicalDescription:
      'Ionic calcium/magnesium deficit, soft carapaces > 4h post-ecdysis, and white muscle spasms.',
    indication: 'Complete ionic Ca:Mg bio-mineral osmoregulation',
    recommendedSchedule: [
      {
        day: 'Day 1 (Pre-Conditioning)',
        action: 'Water Chelation (If High Hardness)',
        instructions:
          'Apply Next Softner @ 2.0 L/Acre in morning to unlock bound calcium carbonates.'
      },
      {
        day: 'Day 2 (Night 8 PM – 2 AM)',
        action: 'Ionic Mineral Replenishment',
        instructions:
          'Broadcast Next-Min powder during nighttime peak ecdysis. Rapid shell hardening within 2–4 hours.'
      }
    ]
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
 * Converts depth from meters to feet.
 */
export function convertMetersToFeet(meters: number): number {
  return meters / 0.3048;
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

/**
 * Curated Pre-Set Diagnostic Bundles (from survey_catalog_assets.md § 4.4)
 */
export interface CuratedBundle {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  targetSymptoms: ClinicalSymptomKey[];
  items: Array<{
    productId: string;
    productName: string;
    packSize: '5L' | '1L';
    quantity: number;
    unitPrice: number;
  }>;
  bundlePrice: number;
  originalPrice: number;
  savings: number;
}

export const CURATED_BUNDLES: CuratedBundle[] = [
  {
    id: 'bundle-gut-rescue',
    name: 'Gut Shield & Enteric Rescue Pack',
    tagline: 'Target: White Gut Disease, White Feces Syndrome, Feed Drop',
    badge: 'Clinical White Gut Protocol',
    targetSymptoms: ['white-gut'],
    items: [
      { productId: 'next-gut', productName: 'Next Gut', packSize: '5L', quantity: 1, unitPrice: 5000 },
      { productId: 'next-viro-nill', productName: 'Next Viro Nill', packSize: '1L', quantity: 1, unitPrice: 1199 },
      { productId: 'next-food-pro', productName: 'next food pro', packSize: '1L', quantity: 1, unitPrice: 1199 }
    ],
    originalPrice: 7398,
    bundlePrice: 6499,
    savings: 899
  },
  {
    id: 'bundle-sludge-detox',
    name: 'Water & Bottom Sludge Detox System',
    tagline: 'Target: Toxic Ammonia Spikes, Benthic Black Mud, H2S Rotten Gas',
    badge: 'Zero Toxic Gas Guarantee',
    targetSymptoms: ['toxic-ammonia', 'benthic-sludge'],
    items: [
      { productId: 'next-converter', productName: 'Next Converter', packSize: '5L', quantity: 1, unitPrice: 5000 },
      { productId: 'next-sludge', productName: 'Next Sludge', packSize: '5L', quantity: 1, unitPrice: 5000 },
      { productId: 'next-remedy', productName: 'Next Remedy', packSize: '1L', quantity: 1, unitPrice: 1199 }
    ],
    originalPrice: 11199,
    bundlePrice: 9999,
    savings: 1200
  },
  {
    id: 'bundle-vibrio-eradication',
    name: 'Vibrio & Pathogen Eradication Kit',
    tagline: 'Target: Luminous Vibrio, Green Colony Outbreaks, Red Disease, EMS/AHPND',
    badge: 'TCBS Pathogen Clearance',
    targetSymptoms: ['vibrio-red'],
    items: [
      { productId: 'next-vibriosis', productName: 'Next Vibriosis', packSize: '5L', quantity: 1, unitPrice: 5000 },
      { productId: 'next-viro-nill', productName: 'Next Viro Nill', packSize: '5L', quantity: 1, unitPrice: 5000 },
      { productId: 'next-gut', productName: 'Next Gut', packSize: '1L', quantity: 1, unitPrice: 1199 }
    ],
    originalPrice: 11199,
    bundlePrice: 9999,
    savings: 1200
  },
  {
    id: 'bundle-molt-hardening',
    name: 'Molt & Shell Hardening Suite',
    tagline: 'Target: Soft Shell Syndrome, Incomplete Molt, Muscle Cramps, Low Salinity',
    badge: 'Lunar Molt Protection',
    targetSymptoms: ['molting-cramps'],
    items: [
      { productId: 'next-min', productName: 'Next-Min', packSize: '5L', quantity: 2, unitPrice: 5000 },
      { productId: 'next-softner', productName: 'Next Softner', packSize: '5L', quantity: 1, unitPrice: 5000 }
    ],
    originalPrice: 15000,
    bundlePrice: 13499,
    savings: 1501
  },
  {
    id: 'bundle-master-biosecurity',
    name: 'Total Pond Biosecurity Master Protocol',
    tagline: 'Target: Comprehensive Complete Pond Overhaul (Stocking to Harvest)',
    badge: 'Complete Farm Biosecurity',
    targetSymptoms: ['white-gut', 'toxic-ammonia', 'benthic-sludge', 'vibrio-red', 'molting-cramps'],
    items: [
      { productId: 'next-viro-nill', productName: 'Next Viro Nill', packSize: '5L', quantity: 1, unitPrice: 5000 },
      { productId: 'next-pro-plus', productName: 'Next Pro Plus', packSize: '5L', quantity: 1, unitPrice: 5000 },
      { productId: 'next-converter', productName: 'Next Converter', packSize: '5L', quantity: 1, unitPrice: 5000 },
      { productId: 'next-sludge', productName: 'Next Sludge', packSize: '5L', quantity: 1, unitPrice: 5000 },
      { productId: 'next-gut', productName: 'Next Gut', packSize: '5L', quantity: 1, unitPrice: 5000 },
      { productId: 'next-min', productName: 'Next-Min', packSize: '5L', quantity: 1, unitPrice: 5000 }
    ],
    originalPrice: 30000,
    bundlePrice: 25999,
    savings: 4001
  }
];
