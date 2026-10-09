/**
 * Authoritative Catalog Oracle
 * Source: ORIGINAL_REQUEST.md (R1), PROJECT.md (§ Product Catalog), and pomelli_export.
 */

export interface ProductCatalogEntry {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'water-conditioner' | 'feed-supplement' | 'pathogen-control' | 'organic-digestion' | 'mineral-supplement';
  indications: string[];
  pricing: {
    can5L: number;    // Standard: 5000 INR
    bottle1L: number; // Standard: 1199 INR
  };
  regulatoryBadges: {
    caaApproved: boolean;
    isoCertified: boolean;
    antibioticFree: boolean;
  };
  strains: string[];
  cfuCount: string;
  biologicalMechanism: string;
  dosageProtocol: {
    preventive: string;
    curative: string;
    schedule: Array<{ stage: string; dosage: string; frequency: string }>;
  };
  packshotImage: string;
  galleryImages: string[];
  specSheetPdf: string;
}

export const AUTHORITATIVE_CATALOG: ProductCatalogEntry[] = [
  {
    id: 'prod-01',
    slug: 'next-viro-nill',
    name: 'Next Viro Nill',
    tagline: 'Advanced Microbial Biosecurity: Scientifically Reduce Viral Load & Bottom Pathogens',
    category: 'water-conditioner',
    indications: ['WSSV biosecurity', 'viral vector elimination', 'organic benthic sanitization', 'external shell hygiene'],
    pricing: { can5L: 5000, bottle1L: 1199 },
    regulatoryBadges: { caaApproved: true, isoCertified: true, antibioticFree: true },
    strains: ['Bacillus subtilis', 'Bacillus licheniformis', 'Pediococcus acidilactici'],
    cfuCount: '5 Billion CFU/ml',
    biologicalMechanism: 'Deploys high-potency Bacillus and Pediococcus strains that rapidly colonize the benthic water-sediment interface, hydrolyzing organic detritus and depriving viral vectors of nutrients while secreting anti-microbial lipopeptides.',
    dosageProtocol: {
      preventive: '500 mL / Acre every 7 to 10 days',
      curative: '1.5 L / Acre immediately; repeat after 48 hours',
      schedule: [
        { stage: 'Pond Prep', dosage: '1.0 L / Acre', frequency: '3 days pre-stocking' },
        { stage: 'DOC 30-Harvest', dosage: '500 mL / Acre', frequency: 'Every 7-10 days' },
        { stage: 'Emergency', dosage: '1.5 L / Acre', frequency: 'Immediate + 48h repeat' }
      ]
    },
    packshotImage: '/images/products/product_next_viro_nill.png',
    galleryImages: ['/images/products/product_next_viro_nill.png'],
    specSheetPdf: '/docs/TDS_Next_Viro_Nill.pdf'
  },
  {
    id: 'prod-02',
    slug: 'next-gut',
    name: 'Next Gut',
    tagline: 'Complete Enteric Protection: Multi-Strain Gut Probiotic for Peak Growth & FCR',
    category: 'feed-supplement',
    indications: ['White Gut Disease', 'White Feces Syndrome', 'digestive tract colonization', 'feed drop'],
    pricing: { can5L: 5000, bottle1L: 1199 },
    regulatoryBadges: { caaApproved: true, isoCertified: true, antibioticFree: true },
    strains: ['Citrobacter sp.', 'Lactobacillus sporogenes', 'Bifidobacteria', 'Saccharomyces cerevisiae'],
    cfuCount: '10 Billion CFU/g',
    biologicalMechanism: 'Forms a thick protective mucosal biofilm along the microvilli of the shrimp midgut and hindgut, producing lactic acid and bacteriocins that lower intestinal pH and halt White Feces colonization.',
    dosageProtocol: {
      preventive: '5-10 g/kg feed twice daily',
      curative: '15-20 g/kg feed continuously for 5-7 days',
      schedule: [
        { stage: 'DOC 15-45', dosage: '5 g / kg feed', frequency: 'Morning meal' },
        { stage: 'DOC 46-Harvest', dosage: '10 g / kg feed', frequency: 'Twice daily' },
        { stage: 'White Gut Outbreak', dosage: '20 g / kg feed', frequency: 'All meals for 5 days' }
      ]
    },
    packshotImage: '/images/products/product_next_gut.png',
    galleryImages: ['/images/products/product_next_gut.png'],
    specSheetPdf: '/docs/TDS_Next_Gut.pdf'
  },
  {
    id: 'prod-03',
    slug: 'next-converter',
    name: 'Next Converter',
    tagline: 'Rapid Nitrogen Cycle Neutralizer: Ammonia, Nitrite & H2S Digestion',
    category: 'water-conditioner',
    indications: ['Toxic Ammonia Spikes (>0.5 ppm)', 'Nitrite toxicity', 'Hydrogen sulfide odor', 'gasping shrimp'],
    pricing: { can5L: 5000, bottle1L: 1199 },
    regulatoryBadges: { caaApproved: true, isoCertified: true, antibioticFree: true },
    strains: ['Bacillus polymyxa', 'Nitrosomonas stimulants', 'Candida sp.'],
    cfuCount: '4 Billion CFU/ml',
    biologicalMechanism: 'Enzymatically converts un-ionized toxic ammonia (NH3) into stable ammonium (NH4+) and metabolizes nitrites into atmospheric nitrogen via aerobic biological denitrification.',
    dosageProtocol: {
      preventive: '1.0 L / Acre every 10 days',
      curative: '2.5 L / Acre broadcast during high aeration',
      schedule: [
        { stage: 'Maintenance', dosage: '1.0 L / Acre', frequency: 'Every 10 days' },
        { stage: 'Ammonia Spike', dosage: '2.5 L / Acre', frequency: 'Immediate morning application' }
      ]
    },
    packshotImage: '/images/products/product_next_converter.png',
    galleryImages: ['/images/products/product_next_converter.png'],
    specSheetPdf: '/docs/TDS_Next_Converter.pdf'
  },
  {
    id: 'prod-04',
    slug: 'next-sludge',
    name: 'Next Sludge',
    tagline: 'Deep Benthic Bioremediation: Digest Central Pit Black Sludge & Waste Shells',
    category: 'organic-digestion',
    indications: ['Benthic sludge accumulation', 'black mud pit', 'anaerobic soil crust', 'dead plankton fallout'],
    pricing: { can5L: 5000, bottle1L: 1199 },
    regulatoryBadges: { caaApproved: true, isoCertified: true, antibioticFree: true },
    strains: ['Rhizopus', 'Cunninghemella', 'Chrysosporium', 'Mucor', 'Aspergillus'],
    cfuCount: 'Bio-Catalytic Enzymatic Complex (Chitinase + Protease)',
    biologicalMechanism: 'High-density fungal consortia secrete extracellular chitinase and cellulase enzymes that digest hard molt shells, feces, and excess feed crust at the pond bottom.',
    dosageProtocol: {
      preventive: '1.0 kg / Acre every 15 days',
      curative: '2.0 kg / Acre concentrated over central drainage pit',
      schedule: [
        { stage: 'DOC 30-60', dosage: '1.0 kg / Acre', frequency: 'Bi-weekly' },
        { stage: 'DOC 60-Harvest', dosage: '2.0 kg / Acre', frequency: 'Weekly over sludge pit' }
      ]
    },
    packshotImage: '/images/products/product_next_sludge.png',
    galleryImages: ['/images/products/product_next_sludge.png'],
    specSheetPdf: '/docs/TDS_Next_Sludge.pdf'
  },
  {
    id: 'prod-05',
    slug: 'next-vibriosis',
    name: 'Next Vibriosis',
    tagline: 'Targeted Bacteriocin Defense: Suppress Luminous Vibrio & EMS/AHPND',
    category: 'pathogen-control',
    indications: ['Vibrio green colonies (>100 CFU)', 'Red disease', 'antennae/tail rot', 'hepatopancreas necrosis'],
    pricing: { can5L: 5000, bottle1L: 1199 },
    regulatoryBadges: { caaApproved: true, isoCertified: true, antibioticFree: true },
    strains: ['Lactobacillus plantarum', 'Lactobacillus curvatus', 'Pediococcus acidilactici', 'Streptomyces griseus'],
    cfuCount: '8 Billion CFU/ml',
    biologicalMechanism: 'Secretes potent natural organic acids and bacteriocins that competitively displace pathogenic Vibrio harveyi and Vibrio parahaemolyticus from water and carapace surfaces.',
    dosageProtocol: {
      preventive: '1.0 L / Acre every 7 days',
      curative: '2.0 L / Acre for 2 consecutive days',
      schedule: [
        { stage: 'Weekly Protection', dosage: '1.0 L / Acre', frequency: 'Every 7 days' },
        { stage: 'Outbreak Protocol', dosage: '2.0 L / Acre', frequency: 'Day 1 and Day 2' }
      ]
    },
    packshotImage: '/images/products/product_next_vibriosis.png',
    galleryImages: ['/images/products/product_next_vibriosis.png'],
    specSheetPdf: '/docs/TDS_Next_Vibriosis.pdf'
  },
  {
    id: 'prod-06',
    slug: 'next-min',
    name: 'Next-Min',
    tagline: 'Bioavailable Macro & Micro Minerals: Rapid Exoskeleton Hardening & Osmoregulation',
    category: 'mineral-supplement',
    indications: ['Soft shell post-molt (>4h)', 'muscle cramps', 'incomplete molting deaths', 'low salinity stress'],
    pricing: { can5L: 5000, bottle1L: 1199 },
    regulatoryBadges: { caaApproved: true, isoCertified: true, antibioticFree: true },
    strains: ['Ionic Ca 22%', 'Mg 11%', 'P 4.5%', 'K 3%', 'Trace Minerals (Zn, Mn, Cu, Se)'],
    cfuCount: '100% Water Soluble Bioactive Ionic Formulation',
    biologicalMechanism: 'Provides chelated ionic calcium and magnesium in a bio-identical 1:3 ratio, restoring hemolymph electrolyte balance and inducing shell sclerotization within hours of ecdysis.',
    dosageProtocol: {
      preventive: '5.0 kg / Acre on lunar molting cycles',
      curative: '10.0 kg / Acre broadcast during cramp incidence',
      schedule: [
        { stage: 'New Moon / Full Moon', dosage: '5.0 kg / Acre', frequency: '2 days prior to peak molt' },
        { stage: 'Cramping Emergency', dosage: '10.0 kg / Acre', frequency: 'Immediate broadcast with aerators' }
      ]
    },
    packshotImage: '/images/products/product_next_min.png',
    galleryImages: ['/images/products/product_next_min.png'],
    specSheetPdf: '/docs/TDS_Next_Min.pdf'
  },
  {
    id: 'prod-07',
    slug: 'next-food-pro',
    name: 'next food pro',
    tagline: 'Feed-Grade Bio-Nutrition Probiotic: Enhanced Nutrient Absorption & FCR',
    category: 'feed-supplement',
    indications: ['Sluggish growth', 'high feed conversion ratio', 'gut enzyme deficiency', 'immune conditioning'],
    pricing: { can5L: 5000, bottle1L: 1199 },
    regulatoryBadges: { caaApproved: true, isoCertified: true, antibioticFree: true },
    strains: ['Bacillus subtilis', 'Lactobacillus acidophilus', 'Enterococcus faecium', 'Beta-glucans'],
    cfuCount: '6 Billion CFU/g',
    biologicalMechanism: 'Supplements animal digestive flora with exogenous amylases and phytases while prebiotic beta-glucans stimulate the shrimp prophenoloxidase (proPO) innate immune cascade.',
    dosageProtocol: {
      preventive: '5.0 g / kg feed in regular feeding',
      curative: '10.0 g / kg feed during growth lags',
      schedule: [
        { stage: 'Daily Feed', dosage: '5.0 g / kg feed', frequency: 'Regular feeding cycle' },
        { stage: 'Growth Boosting', dosage: '10.0 g / kg feed', frequency: '14 consecutive days' }
      ]
    },
    packshotImage: '/images/products/product_next_food_pro.png',
    galleryImages: ['/images/products/product_next_food_pro.png'],
    specSheetPdf: '/docs/TDS_Next_Food_Pro.pdf'
  },
  {
    id: 'prod-08',
    slug: 'next-softner',
    name: 'Next Softner',
    tagline: 'Water Hardness Conditioner: Carbonate Scale Dissolution & Heavy Metal Chelation',
    category: 'water-conditioner',
    indications: ['High total hardness (>300 ppm)', 'carbonate scale formation', 'heavy metal toxicity', 'borewell salinity'],
    pricing: { can5L: 5000, bottle1L: 1199 },
    regulatoryBadges: { caaApproved: true, isoCertified: true, antibioticFree: true },
    strains: ['Acetobacter', 'Arthrobacter', 'Azotobacter', 'Natural Organic Polycarboxylic Acids'],
    cfuCount: 'Organic Acid Poly-Chelex Complex',
    biologicalMechanism: 'Natural organic chelation agents bind excess divalent calcium and magnesium carbonate precipitates, lowering excessive water tension and softening pond water.',
    dosageProtocol: {
      preventive: '1.0 L / Acre every 15 days',
      curative: '3.0 L / Acre in severe hardness (>400 ppm)',
      schedule: [
        { stage: 'Water Prep', dosage: '2.0 L / Acre', frequency: 'Prior to stocking' },
        { stage: 'Hardness Spike', dosage: '3.0 L / Acre', frequency: '2 consecutive mornings' }
      ]
    },
    packshotImage: '/images/products/product_next_softner.png',
    galleryImages: ['/images/products/product_next_softner.png'],
    specSheetPdf: '/docs/TDS_Next_Softner.pdf'
  },
  {
    id: 'prod-09',
    slug: 'next-remedy',
    name: 'Next Remedy',
    tagline: 'Phytoplankton Equilibrium: Suppress Toxic Blue-Green Algae & Bloom Crashes',
    category: 'water-conditioner',
    indications: ['Toxic blue-green algae blooms', 'Microcystis scum', 'pea-soup water', 'sudden bloom crash'],
    pricing: { can5L: 5000, bottle1L: 1199 },
    regulatoryBadges: { caaApproved: true, isoCertified: true, antibioticFree: true },
    strains: ['Candida sp.', 'Rhodococcus', 'Arthrobacter', 'Rhodotorula'],
    cfuCount: '5 Billion CFU/ml',
    biologicalMechanism: 'Antagonistic yeasts and soil actinomycetes outcompete cyanobacteria for trace micronutrients and secrete natural algicidal enzymes that gently lyse toxic blue-green algae cell walls without sudden oxygen collapse.',
    dosageProtocol: {
      preventive: '1.0 L / Acre every 10 days',
      curative: '2.5 L / Acre applied on sunny mornings',
      schedule: [
        { stage: 'Preventive Color', dosage: '1.0 L / Acre', frequency: 'Every 10 days' },
        { stage: 'Bloom Emergency', dosage: '2.5 L / Acre', frequency: '10:00 AM bright sunlight' }
      ]
    },
    packshotImage: '/images/products/product_next_remedy.png',
    galleryImages: ['/images/products/product_next_remedy.png'],
    specSheetPdf: '/docs/TDS_Next_Remedy.pdf'
  },
  {
    id: 'prod-10',
    slug: 'next-pro-plus',
    name: 'Next Pro Plus',
    tagline: 'Botanical Amino Acid Enrichment: Natural Zooplankton Bloom & Benthic Vitality',
    category: 'water-conditioner',
    indications: ['Live food zooplankton deficiency', 'nursery post-larvae stress', 'black soil deodorization'],
    pricing: { can5L: 5000, bottle1L: 1199 },
    regulatoryBadges: { caaApproved: true, isoCertified: true, antibioticFree: true },
    strains: ['Botanical L-amino acid complex (20%)', 'Bacillus subtilis', 'Bacillus megaterium'],
    cfuCount: '3 Billion CFU/ml',
    biologicalMechanism: 'Botanical phytonutrients and free amino acids serve as rich prebiotic substrate that multiplies rotifers and copepods, while selective Bacillus deodorize pond sediment.',
    dosageProtocol: {
      preventive: '1.0 L / Acre every 7 days in nursery stage',
      curative: '2.0 L / Acre pre-stocking to bloom zooplankton',
      schedule: [
        { stage: 'Pre-Stocking Bloom', dosage: '2.0 L / Acre', frequency: '4 days prior to stocking' },
        { stage: 'Nursery DOC 1-30', dosage: '1.0 L / Acre', frequency: 'Every 7 days' }
      ]
    },
    packshotImage: '/images/products/product_next_pro_plus.png',
    galleryImages: ['/images/products/product_next_pro_plus.png'],
    specSheetPdf: '/docs/TDS_Next_Pro_Plus.pdf'
  },
  {
    id: 'prod-11',
    slug: 'next-pro',
    name: 'Next Pro',
    tagline: 'Comprehensive Biological Dominance: Dual Water Purification & Growth Probiotic',
    category: 'water-conditioner',
    indications: ['General water column purification', 'pathogen exclusion', 'routine water maintenance', 'ADG boost'],
    pricing: { can5L: 5000, bottle1L: 1199 },
    regulatoryBadges: { caaApproved: true, isoCertified: true, antibioticFree: true },
    strains: ['Bacillus subtilis', 'Bacillus licheniformis', 'Lactobacillus sporogenes', 'Bacillus megaterium'],
    cfuCount: '15 Billion CFU/ml',
    biologicalMechanism: 'Two-phase biological action: high-density Bacillus clears suspended organic detritus in the water column while Lactobacillus colonizes shrimp intestinal microflora when ingested with feed.',
    dosageProtocol: {
      preventive: '1.0 L / Acre every 7 to 10 days',
      curative: '2.0 L / Acre water dose + 10 mL/kg feed coating',
      schedule: [
        { stage: 'Water Maintenance', dosage: '1.0 L / Acre', frequency: 'Every 7-10 days' },
        { stage: 'Feed Coating', dosage: '10 mL / kg feed', frequency: 'Twice daily' }
      ]
    },
    packshotImage: '/images/products/product_next_pro.png',
    galleryImages: ['/images/products/product_next_pro.png'],
    specSheetPdf: '/docs/TDS_Next_Pro.pdf'
  }
];

export const VALID_SLUGS = AUTHORITATIVE_CATALOG.map(p => p.slug);

/**
 * Checks for unescaped LaTeX math syntax (e.g. \text{, \frac{, $$, $, \approx).
 * Acceptance criteria strictly mandates: 0 LaTeX or broken math syntax in product copy.
 */
export function hasLatexSyntax(text: string): boolean {
  if (!text) return false;
  const latexPatterns = [
    /\\[a-zA-Z]+\{.*?\}/,      // \text{...}, \frac{...}
    /\$\$.*?\$\$/,              // $$...$$
    /(?<!\\)\$.+?\$/,           // $...$ inline math
    /\\approx/,
    /\\times/,
    /\\pm/
  ];
  return latexPatterns.some(pattern => pattern.test(text));
}

export function validateProductContract(product: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!product.id || typeof product.id !== 'string') errors.push('Missing or invalid id');
  if (!product.slug || typeof product.slug !== 'string') errors.push('Missing or invalid slug');
  if (!product.name || typeof product.name !== 'string') errors.push('Missing or invalid name');
  if (!product.tagline || typeof product.tagline !== 'string') errors.push('Missing or invalid tagline');
  if (!product.category || typeof product.category !== 'string') errors.push('Missing or invalid category');

  // Pricing verification: 5L Can @ Rs. 5000, 1L Bottle @ Rs. 1199
  if (!product.pricing) {
    errors.push('Missing pricing object');
  } else {
    if (product.pricing.can5L !== 5000) errors.push(`can5L price must be 5000, got ${product.pricing.can5L}`);
    if (product.pricing.bottle1L !== 1199) errors.push(`bottle1L price must be 1199, got ${product.pricing.bottle1L}`);
  }

  // Regulatory badges
  if (!product.regulatoryBadges) {
    errors.push('Missing regulatoryBadges object');
  } else {
    if (product.regulatoryBadges.caaApproved !== true) errors.push('caaApproved badge must be true');
    if (product.regulatoryBadges.isoCertified !== true) errors.push('isoCertified badge must be true');
    if (product.regulatoryBadges.antibioticFree !== true) errors.push('antibioticFree badge must be true');
  }

  // Strains & CFU
  if (!Array.isArray(product.strains) || product.strains.length === 0) {
    errors.push('Strains array must be non-empty');
  }
  if (!product.cfuCount || typeof product.cfuCount !== 'string') {
    errors.push('cfuCount must be non-empty string');
  }

  // Zero LaTeX check
  const textFields = [
    product.name,
    product.tagline,
    product.biologicalMechanism,
    product.dosageProtocol?.preventive,
    product.dosageProtocol?.curative
  ];
  for (const text of textFields) {
    if (text && hasLatexSyntax(text)) {
      errors.push(`LaTeX syntax detected in text: "${text.substring(0, 40)}..."`);
    }
  }

  return { valid: errors.length === 0, errors };
}
