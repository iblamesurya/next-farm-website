import { Product, ProductCategory } from '@/types/catalog';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'next-viro-nill',
    name: 'Next Viro Nill',
    tagline: 'Advanced Microbial Biosecurity: Scientifically Reduce Viral Load & Bottom Pathogens',
    headline: 'Advanced Microbial Biosecurity: Scientifically Reduce Viral Load & Bottom Pathogens',
    overview: 'Next Viro Nill is a heavy-duty biological pond conditioner formulated with high-potency Bacillus and Pediococcus consortia engineered to suppress lethal pathogens in aquaculture environments. Designed specifically for intensive shrimp farming, it actively sanitizes the pond benthic zone by accelerating the decomposition of pathogen-harboring organic sludge and fecal waste.',
    category: 'pathogen-control',
    categoryDisplay: 'Pond Water & Sediment Conditioner',
    format5L: '5-Liter HDPE Industrial Canister',
    format1L: '1-Liter Precision Bottle',
    indications: [
      'White Spot Syndrome Virus (WSSV) biosecurity',
      'Viral vector elimination in benthic sediment',
      'Organic bottom sanitization and detritus clearance',
      'External shell hygiene and gill cleanliness',
      'Pre-stocking biosecurity conditioning'
    ],
    pricing: {
      can5L: 5000,
      bottle1L: 1199,
      mrp5L: 6500,
      mrp1L: 1600
    },
    regulatoryBadges: {
      caaApproved: true,
      isoCertified: true,
      antibioticFree: true
    },
    strains: [
      'Bacillus subtilis',
      'Bacillus licheniformis',
      'Pediococcus acidilactici'
    ],
    cfuCount: 'Minimum 5 Billion CFU/ml (5 x 10^9 CFU/ml)',
    biologicalMechanism: 'Next Viro Nill deploys high-potency Bacillus and Pediococcus consortia that rapidly colonize the benthic water-sediment interface. The bacteria hydrolyze organic detritus, dead plankton, and shrimp fecal ribbons that harbor viral particles and opportunistic pathogens. By actively depriving WSSV vectors and Vibrio of nutrients and secreting anti-microbial lipopeptides, it breaks the horizontal transmission cycle in pond sediment without disrupting beneficial diatoms.',
    benefits: [
      'Directly reduces organic vectors associated with White Spot Syndrome Virus (WSSV) spread.',
      'Digests accumulated fecal matter and uneaten feed on the pond floor, eliminating anaerobic bacterial pockets.',
      'Naturally outcompetes pathogenic Vibrio, Salmonella, and E. coli in both water column and bottom soil.',
      'Completely non-toxic to phytoplankton blooms; preserves dissolved oxygen and water transparency.'
    ],
    applicationMethod: 'Mix required dosage with 20 liters of fresh pond water. Broadcast uniformly across pond surface during early morning (8:00 AM - 10:00 AM) with paddlewheel aerators in full operation.',
    dosageProtocol: {
      preventive: '500 mL per Acre every 7 to 10 days during routine maintenance.',
      curative: '1.5 L per Acre immediately during disease alerts or weather shifts; repeat after 48 hours.',
      schedule: [
        {
          stage: 'Pond Preparation (Pre-Stocking)',
          dosage: '1.0 L / Acre',
          frequency: '3 days prior to post-larvae release'
        },
        {
          stage: 'Routine Maintenance (DOC 30 to Harvest)',
          dosage: '500 mL / Acre',
          frequency: 'Every 7 to 10 days'
        },
        {
          stage: 'Disease Alert / Weather Shifts',
          dosage: '1.5 L / Acre',
          frequency: 'Immediate shock dose; repeat after 48 hours'
        }
      ]
    },
    packshotImage: '/images/products/product_next_viro_nill.png',
    galleryImages: [
      '/images/products/product_next_viro_nill.png',
      '/images/products/catalog_overview_asset.png'
    ],
    specSheetPdf: '/docs/TDS_Next_Viro_Nill.pdf'
  },
  {
    id: 'prod-002',
    slug: 'next-gut',
    name: 'Next Gut',
    tagline: 'Complete Enteric Protection: Multi-Strain Gut Probiotic for Peak Growth & FCR',
    headline: 'Complete Enteric Protection: Multi-Strain Gut Probiotic for Peak Growth & FCR',
    overview: 'Next Gut is an advanced multi-strain enteric probiotic engineered to colonize and protect the digestive tract of shrimp and prawns. Formulated with a synergistic consortium of Lactobacillus, Bifidobacterium, and beneficial yeasts, Next Gut creates a robust protective mucosal biofilm along the intestinal villi.',
    category: 'feed-supplement',
    categoryDisplay: 'Digestive & Gut Health Support (Feed Probiotic)',
    format5L: '5-Liter HDPE Industrial Canister',
    format1L: '1-Liter Precision Bottle',
    indications: [
      'White Gut Disease and intestinal inflammation',
      'White Feces Syndrome (WFS) prevention and reversal',
      'Digestive tract microvilli colonization',
      'Feed drop, anorexia, and lethargic feeding',
      'Poor Feed Conversion Ratio (FCR)'
    ],
    pricing: {
      can5L: 5000,
      bottle1L: 1199,
      mrp5L: 6500,
      mrp1L: 1600
    },
    regulatoryBadges: {
      caaApproved: true,
      isoCertified: true,
      antibioticFree: true
    },
    strains: [
      'Citrobacter sp.',
      'Lactobacillus sporogenes',
      'Bacteroides',
      'Pseudomonas (beneficial strain)',
      'Bifidobacteria',
      'Saccharomyces cerevisiae'
    ],
    cfuCount: 'Minimum 10 Billion CFU/g (1 x 10^10 CFU/g)',
    biologicalMechanism: 'Next Gut forms a thick, protective biological mucosal biofilm along the microvilli of the shrimp midgut and hindgut. Beneficial Lactobacillus and Bifidobacterium produce lactic acid, bacteriocins, and volatile fatty acids that lower gut luminal pH, inhibiting pathogenic Vibrio adherence. Simultaneously, endogenous digestive enzymes hydrolyze complex feed proteins, starches, and phytates, restoring gut integrity and halting White Feces Syndrome.',
    benefits: [
      'Forms an impenetrable mucosal barrier against Vibrio and microsporidian parasites.',
      'Reduces incidence of White Gut and floating White Feces within 72-96 hours.',
      'Enhances FCR by 12-15% through superior nutrient absorption and feed digestion.',
      'Neutralizes blue-green algal toxins and feed-borne mycotoxins.'
    ],
    applicationMethod: 'Mix measured volume of Next Gut with a commercial feed binder or clean pond water. Coat uniformly over commercial extruded feed pellets. Air-dry in shade for 20 minutes before broadcasting.',
    dosageProtocol: {
      preventive: '5 to 10 mL per kg feed (1 to 2 meals daily).',
      curative: '15 to 20 mL per kg feed across all daily meals for 5 consecutive days.',
      schedule: [
        {
          stage: 'Nursery & Early Culture (DOC 1-30)',
          dosage: '5 mL / kg feed',
          frequency: '1 meal daily'
        },
        {
          stage: 'Grow-out Culture (DOC 31 to Harvest)',
          dosage: '10 mL / kg feed',
          frequency: '2 meals daily'
        },
        {
          stage: 'Acute White Gut / White Feces Outbreak',
          dosage: '15-20 mL / kg feed',
          frequency: 'Across all daily meals for 5 consecutive days'
        }
      ]
    },
    packshotImage: '/images/products/product_next_gut.png',
    galleryImages: [
      '/images/products/product_next_gut.png',
      '/images/products/catalog_overview_asset.png'
    ],
    specSheetPdf: '/docs/TDS_Next_Gut.pdf'
  },
  {
    id: 'prod-003',
    slug: 'next-converter',
    name: 'Next Converter',
    tagline: 'Instant Toxic Gas Elimination: Biological Ammonia, Nitrite & H2S Remediation',
    headline: 'Instant Toxic Gas Elimination: Biological Ammonia, Nitrite & H2S Remediation',
    overview: 'Next Converter is an industrial-strength water remediation inoculant designed to neutralize dangerous toxic gas spikes in high-density aquaculture ponds. Combining selective nitrifying catalysts with specialized Bacillus polymyxa and Candida species, Next Converter accelerates biological oxidation of nitrogenous and sulfur wastes.',
    category: 'water-conditioner',
    categoryDisplay: 'Water Quality Conditioner & Gas Remediation',
    format5L: '5-Liter HDPE Industrial Canister',
    format1L: '1-Liter Precision Bottle',
    indications: [
      'Unionized Ammonia (NH3) spikes above 0.5 ppm',
      'Toxic Nitrite (NO2) accumulation above 1.0 ppm',
      'Hydrogen Sulfide (H2S) black water and foul odors',
      'Surface piping, nocturnal asphyxiation, and stress',
      'Sudden algae bloom crashes and die-offs'
    ],
    pricing: {
      can5L: 5000,
      bottle1L: 1199,
      mrp5L: 6500,
      mrp1L: 1600
    },
    regulatoryBadges: {
      caaApproved: true,
      isoCertified: true,
      antibioticFree: true
    },
    strains: [
      'Bacillus polymyxa',
      'Candida biological species',
      'Nitrosomonas nitrification stimulants',
      'Enzymatic gas-clearing cofactors'
    ],
    cfuCount: 'Minimum 4 Billion CFU/ml (4 x 10^9 CFU/ml)',
    biologicalMechanism: 'Combines nitrifying biostimulants with specialized Bacillus polymyxa and Candida strains that catalyze biological oxidation of ammonia into nitrite and subsequently harmless atmospheric nitrogen (denitrification). It also consumes toxic sulfide ions and converts them into non-toxic sulfates, stabilizing pond dissolved oxygen and preventing toxicity crashes during heavy feeding periods without crashing existing algae blooms.',
    benefits: [
      'Rapid biological gas neutralization: brings toxic NH3 and H2S to safe levels within 24-48 hours.',
      'Prevents sudden shrimp mortality from bottom suffocation without crashing existing algae blooms.',
      'Highly active across wide water parameters (salinity 0-45 ppt, pH 6.5-9.0).',
      'Deodorizes anaerobic pond effluents and aerator foam.'
    ],
    applicationMethod: 'Dilute required dosage in 50 liters of pond water. Broadcast directly in front of working paddlewheel aerators to ensure rapid hydraulic circulation across the pond water column.',
    dosageProtocol: {
      preventive: '1.0 L per Acre every 10 days for regular nitrogen management.',
      curative: '2.0 L to 3.0 L per Acre in morning aeration for acute ammonia or sulfide spikes.',
      schedule: [
        {
          stage: 'Routine Maintenance (NH3 < 0.5 ppm)',
          dosage: '1.0 L / Acre',
          frequency: 'Every 10 days'
        },
        {
          stage: 'Moderate Gas Spike (NH3 0.5 - 1.5 ppm)',
          dosage: '2.0 L / Acre',
          frequency: 'Morning application with aerators running'
        },
        {
          stage: 'Severe Emergency (> 1.5 ppm NH3 or heavy H2S odor)',
          dosage: '3.0 L / Acre',
          frequency: 'Split dose: 2.0 L morning + 1.0 L evening'
        }
      ]
    },
    packshotImage: '/images/products/product_next_converter.png',
    galleryImages: [
      '/images/products/product_next_converter.png',
      '/images/products/catalog_overview_asset.png'
    ],
    specSheetPdf: '/docs/TDS_Next_Converter.pdf'
  },
  {
    id: 'prod-004',
    slug: 'next-sludge',
    name: 'Next Sludge',
    tagline: 'Deep Benthic Bio-Digestion: Liquefy Pond Sludge & Restore Bottom Soil',
    headline: 'Deep Benthic Bio-Digestion: Liquefy Pond Sludge & Restore Bottom Soil',
    overview: 'Next Sludge is a specialized fungal-bacterial bioremediation formula formulated to digest heavy black soil, organic waste, and sludge buildup at the pond bottom. Utilizing an enzymatic consortium of beneficial fungi, Next Sludge hydrolyzes recalcitrant organic polymers that standard bacteria cannot break down.',
    category: 'organic-digestion',
    categoryDisplay: 'Pond Bottom & Sludge Conditioner',
    format5L: '5 kg Moisture-Barrier Industrial Pouch',
    format1L: '1 kg Precision Foil Pouch',
    indications: [
      'Anaerobic black benthic soil and central sludge mounds',
      'Accumulation of molted shrimp carapaces (chitin)',
      'Rotten egg smell and bubbling benthic gases',
      'Uneaten feed accumulation in feeding check trays',
      'Reclamation of old unlined earthen ponds'
    ],
    pricing: {
      can5L: 5000,
      bottle1L: 1199,
      mrp5L: 6500,
      mrp1L: 1600
    },
    regulatoryBadges: {
      caaApproved: true,
      isoCertified: true,
      antibioticFree: true
    },
    strains: [
      'Rhizopus sp.',
      'Cunninghemella',
      'Chrysosporium',
      'Mucor',
      'Pleurotus',
      'Aspergillus fermentation solids'
    ],
    cfuCount: 'Bio-enzymatic fungal matrix with Chitinase, Cellulase, Protease',
    biologicalMechanism: 'Deploys an aggressive fungal-enzymatic consortium (Rhizopus, Mucor, Chrysosporium, Aspergillus) specifically capable of hydrolyzing recalcitrant polymers that bacteria cannot digest, such as chitinous molt exuviae, cellulose, and thick fecal mounds. Cleaves peptide bonds and complex carbohydrates, turning heavy organic sludge into bio-nutrients for beneficial diatom growth while restoring aerobic sand conditions.',
    benefits: [
      'Liquefies thick organic sludge mounds around central drainage pits and feeding trays.',
      'Restores bottom soil oxygenation, allowing shrimp to graze benthic zones safely.',
      'Eliminates toxic sulfide and methane generation at the mud-water interface.',
      'Shortens pond turnaround time between consecutive harvest crops.'
    ],
    applicationMethod: 'Mix with dry fine sand or pond water and broadcast directly over central sludge pits, feeding check-tray areas, and dead corners where organic sediment accumulates.',
    dosageProtocol: {
      preventive: '1.0 kg per Acre every 12 days in early grow-out.',
      curative: '2.0 kg per Acre directly broadcast over central sludge pits and feeding areas.',
      schedule: [
        {
          stage: 'Early Grow-out (DOC 30-60)',
          dosage: '1.0 kg / Acre',
          frequency: 'Every 12 days'
        },
        {
          stage: 'Mid Grow-out (DOC 61-90)',
          dosage: '1.5 kg / Acre',
          frequency: 'Every 10 days'
        },
        {
          stage: 'Late Stage / Heavy Feeding (DOC 91 to Harvest)',
          dosage: '2.0 kg / Acre',
          frequency: 'Every 7 days'
        }
      ]
    },
    packshotImage: '/images/products/product_next_sludge.png',
    galleryImages: [
      '/images/products/product_next_sludge.png',
      '/images/products/catalog_overview_asset.png'
    ],
    specSheetPdf: '/docs/TDS_Next_Sludge.pdf'
  },
  {
    id: 'prod-005',
    slug: 'next-vibriosis',
    name: 'Next Vibriosis',
    tagline: 'Targeted Biological Suppression: Precision Control of Pathogenic Vibrio & Red Disease',
    headline: 'Targeted Biological Suppression: Precision Control of Pathogenic Vibrio & Red Disease',
    overview: 'Next Vibriosis is an advanced biocontrol formulation specifically developed to suppress virulent Vibrio species in intensive shrimp cultivation. Formulated with targeted Lactobacillus, Pediococcus, and Streptomyces, it produces powerful natural bacteriocins that inhibit Vibrio parahaemolyticus and EMS/AHPND pathogens.',
    category: 'pathogen-control',
    categoryDisplay: 'Targeted Vibrio & EMS/AHPND Management',
    format5L: '5-Liter HDPE Industrial Canister',
    format1L: '1-Liter Precision Bottle',
    indications: [
      'Early Mortality Syndrome (EMS / AHPND)',
      'Vibrio parahaemolyticus green colonies (> 100 CFU/ml on TCBS agar)',
      'Red Disease (red pleopods, antennae, and tail fan)',
      'Luminescent / glowing water in darkness',
      'Hepatopancreas discoloration and tubular necrosis'
    ],
    pricing: {
      can5L: 5000,
      bottle1L: 1199,
      mrp5L: 6500,
      mrp1L: 1600
    },
    regulatoryBadges: {
      caaApproved: true,
      isoCertified: true,
      antibioticFree: true
    },
    strains: [
      'Lactobacillus plantarum',
      'Lactobacillus curvatus',
      'Pediococcus acidilactici',
      'Penicillium roqueforti',
      'Streptomyces griseus'
    ],
    cfuCount: 'Minimum 8 Billion CFU/ml (8 x 10^9 CFU/ml)',
    biologicalMechanism: 'Utilizes targeted lactic acid bacteria (Lactobacillus plantarum, Pediococcus acidilactici) and actinomycetes (Streptomyces griseus) that produce potent natural bacteriocins (plantaricin, pediocin) and organic metabolites specifically antagonistic to Vibrio species. It competitively occupies cellular attachment sites in both pond water and the shrimp hepatopancreas, preventing colonization and halting septic necrosis.',
    benefits: [
      'Specific biological suppression of luminescent and green colony Vibrio on TCBS agar plates.',
      'Protects hepatopancreas tubules from necrotic disintegration; prevents red coloration of pleopods.',
      'Provides dual internal-external biosecurity when applied simultaneously to water and feed.',
      '100% legal, sustainable alternative to banned antibiotics with zero tissue residue.'
    ],
    applicationMethod: 'Water Application: Dilute with pond water and broadcast during morning aeration. Feed Application: Coat 10-15 mL/kg onto feed pellets with binder, shade dry for 30 minutes, feed immediately.',
    dosageProtocol: {
      preventive: '500 mL per Acre weekly in water; 5 mL per kg feed (1 meal daily).',
      curative: '2.0 L per Acre immediate shock dose in water; 15 mL per kg feed across all daily meals for 5 days.',
      schedule: [
        {
          stage: 'Low Vibrio Counts (< 100 CFU/ml on TCBS)',
          dosage: '500 mL / Acre (water) + 5 mL / kg (feed)',
          frequency: 'Weekly'
        },
        {
          stage: 'Moderate Vibrio Counts (100-1,000 CFU/ml)',
          dosage: '1.0 L / Acre (water) + 10 mL / kg (feed)',
          frequency: 'Every 4 days'
        },
        {
          stage: 'Acute Outbreak / Red Disease (> 1,000 CFU/ml)',
          dosage: '2.0 L / Acre (water) + 15 mL / kg (feed)',
          frequency: 'Immediate shock dose; repeat water in 48h; feed across all meals for 5 days'
        }
      ]
    },
    packshotImage: '/images/products/product_next_vibriosis.png',
    galleryImages: [
      '/images/products/product_next_vibriosis.png',
      '/images/products/catalog_overview_asset.png'
    ],
    specSheetPdf: '/docs/TDS_Next_Vibriosis.pdf'
  },
  {
    id: 'prod-006',
    slug: 'next-min',
    name: 'Next-Min',
    tagline: 'Rapid Exoskeleton Calcification: Complete Ionic Minerals for Perfect Molting & Growth',
    headline: 'Rapid Exoskeleton Calcification: Complete Ionic Minerals for Perfect Molting & Growth',
    overview: 'Next-Min is a comprehensive, highly bioavailable ionic mineral formulation designed to satisfy the rigorous osmotic and mineral requirements of shrimp and prawns. Formulated with an optimized Calcium-to-Magnesium ratio (1:3.5) alongside bioavailable Phosphorus and trace minerals, Next-Min accelerates post-molt shell hardening.',
    category: 'mineral-supplement',
    categoryDisplay: 'Balanced Bio-Mineral Supplement',
    format5L: '10 kg Heavy-Duty Multi-Wall Bag',
    format1L: '2 kg Precision Bag',
    indications: [
      'Soft shell syndrome persisting beyond 4 hours post-molt',
      'Incomplete molting mortalities and stuck shells',
      'White muscle cramps and opaque abdominal tissue',
      'Low salinity and inland shrimp farming (0-10 ppt)',
      'Lunar cycle molting stress (Full Moon / New Moon)',
      'Electrolyte imbalance in borewell waters'
    ],
    pricing: {
      can5L: 5000,
      bottle1L: 1199,
      mrp5L: 6500,
      mrp1L: 1600
    },
    regulatoryBadges: {
      caaApproved: true,
      isoCertified: true,
      antibioticFree: true
    },
    strains: [
      'Calcium (Ca) Min 22.0%',
      'Magnesium (Mg) Min 11.0%',
      'Phosphorus (P) Min 4.5%',
      'Potassium (K) Min 3.0%',
      'Trace Minerals: Zinc, Manganese, Iron, Copper, Selenium'
    ],
    cfuCount: '100% Water-Soluble Pharmaceutical-Grade Bioavailable Electrolytes',
    biologicalMechanism: 'Supplies an optimized ratio of essential bioavailable divalent and monovalent ions (Calcium, Magnesium, Phosphorus, Potassium) with a scientifically calibrated Calcium to Magnesium ratio of 1:3.5. These ionic minerals are absorbed directly through shrimp gills and oral membranes, replenishing hemolymph reserves before and during ecdysis. Accelerates post-molt exoskeleton hardening within 2 to 4 hours, preventing cannibalism and osmotic collapse.',
    benefits: [
      'Hardens soft shells within 2-4 hours post-molt, minimizing cannibalism losses.',
      'Completely eliminates White Muscle Cramps and loose shell mortalities.',
      'Ensures robust osmoregulation in borewell, low salinity (0-10 ppt), and fluctuating weather ponds.',
      'Stabilizes diatom phytoplankton blooms by nourishing beneficial silica algae.'
    ],
    applicationMethod: 'Broadcast dry powder evenly across the pond surface during night or early morning hours (6:00 PM - 4:00 AM) when ecdysis activity peaks.',
    dosageProtocol: {
      preventive: '5 kg to 10 kg per Acre every 7 to 10 days.',
      curative: '10 kg to 20 kg per Acre 2 days prior to Full/New Moon or upon noticing soft shells.',
      schedule: [
        {
          stage: 'Low Salinity Waters (0-10 ppt)',
          dosage: '10 kg / Acre',
          frequency: 'Every 7 days routine; 20 kg / Acre 2 days prior to Full/New Moon'
        },
        {
          stage: 'Medium Salinity Waters (11-25 ppt)',
          dosage: '5 kg / Acre',
          frequency: 'Every 7 days routine; 10 kg / Acre pre-molt'
        },
        {
          stage: 'High Salinity Waters (> 25 ppt)',
          dosage: '5 kg / Acre',
          frequency: 'Every 10 days routine; 10 kg / Acre pre-molt'
        }
      ]
    },
    packshotImage: '/images/products/product_next_min.png',
    galleryImages: [
      '/images/products/product_next_min.png',
      '/images/products/product_next_min_variant.png'
    ],
    specSheetPdf: '/docs/TDS_Next_Min.pdf'
  },
  {
    id: 'prod-007',
    slug: 'next-food-pro',
    name: 'next food pro',
    tagline: 'High-Potency Nutritional Probiotic: Fortify Feed for Immunity, Growth & Digestibility',
    headline: 'High-Potency Nutritional Probiotic: Fortify Feed for Immunity, Growth & Digestibility',
    overview: 'Next Food Pro is a premium, feed-grade probiotic supplement engineered to fortify standard aquaculture feed pellets with bioactive digestive enzymes, essential vitamins, and heat-resistant spore-forming bacteria. Designed to withstand pelleted feed processing, it ensures active spores reach the shrimp gut intact.',
    category: 'feed-supplement',
    categoryDisplay: 'Feed-Grade Bio-Nutrition Probiotic Supplement',
    format5L: '5 kg Master Industrial Pouch',
    format1L: '1 kg Stand-Up Foil Pouch',
    indications: [
      'Feed Conversion Ratio (FCR) optimization',
      'Immune system activation and disease resistance',
      'Daily weight gain (ADG) acceleration',
      'Nursery and juvenile growth fortification',
      'Uniform harvest grading and reduced size disparity'
    ],
    pricing: {
      can5L: 5000,
      bottle1L: 1199,
      mrp5L: 6500,
      mrp1L: 1600
    },
    regulatoryBadges: {
      caaApproved: true,
      isoCertified: true,
      antibioticFree: true
    },
    strains: [
      'Bacillus subtilis (feed grade)',
      'Lactobacillus acidophilus',
      'Enterococcus faecium',
      'Beta-1,3/1,6-glucans',
      'Mannan-Oligosaccharides (MOS)',
      'B-Complex Vitamins (B1, B2, B6, B12, Niacin, Folic acid)'
    ],
    cfuCount: 'Minimum 6 Billion CFU/g (6 x 10^9 CFU/g)',
    biologicalMechanism: 'Provides micro-encapsulated heat-stable spore-forming Bacillus and lactic acid bacteria enriched with natural immunomodulators (Beta-glucans, MOS) and B-complex vitamins. Survives pelleted feed immersion and digestive enzymes to germinate in the shrimp intestine. Secretes protease, amylase, and phytase to unlock micronutrients and lipids from commercial feeds, reducing undigested fecal waste and feed fouling.',
    benefits: [
      'Lowers Feed Conversion Ratio (FCR) by up to 12-18%, generating significant feed cost savings.',
      'Heat and pressure stable: spores survive feed binding and water immersion.',
      'Stimulates prophenoloxidase and hemocyte phagocytic activity for immune disease resistance.',
      'Produces uniform size grading across the pond population, eliminating runts.'
    ],
    applicationMethod: 'Mix with feed oil or natural binder (e.g. commercial binder or egg white), coat onto extruded pellets, and shade-dry for 20 minutes before broadcasting.',
    dosageProtocol: {
      preventive: '3 to 5 g per kg feed daily across meals.',
      curative: '5 g per kg feed across all daily meals during stress or accelerated growth phases.',
      schedule: [
        {
          stage: 'Post Larvae & Nursery Phase (DOC 1-30)',
          dosage: '5 g / kg feed',
          frequency: 'All daily meals'
        },
        {
          stage: 'Grow-out Phase (DOC 31-80)',
          dosage: '3-5 g / kg feed',
          frequency: '2 meals daily'
        },
        {
          stage: 'Finishing Phase (DOC 81 to Harvest)',
          dosage: '5 g / kg feed',
          frequency: 'Morning and evening meals'
        }
      ]
    },
    packshotImage: '/images/products/product_next_food_pro.png',
    galleryImages: [
      '/images/products/product_next_food_pro.png',
      '/images/products/catalog_overview_asset.png'
    ],
    specSheetPdf: '/docs/TDS_Next_Food_Pro.pdf'
  },
  {
    id: 'prod-008',
    slug: 'next-softner',
    name: 'Next Softner',
    tagline: 'Hardness Remediation & Chelation: Neutralize Toxic Carbonate Scaling in Pond Water',
    headline: 'Hardness Remediation & Chelation: Neutralize Toxic Carbonate Scaling in Pond Water',
    overview: 'Next Softner is an organic microbiological water conditioner engineered to alleviate extreme water hardness, excessive salinity scaling, and heavy mineral crusting in aquaculture ponds. Using a proprietary blend of Acetobacter, Arthrobacter, and Azotobacter, it secretes natural biological chelators that soften water gently.',
    category: 'water-conditioner',
    categoryDisplay: 'Water Hardness & Carbonate Conditioner',
    format5L: '5-Liter HDPE Industrial Canister',
    format1L: '1-Liter Precision Bottle',
    indications: [
      'Total water hardness exceeding 300 ppm CaCO3',
      'Borewell water scaling and chalky mineral crusting',
      'Mineral calcification on shrimp gills and carapaces',
      'Heavy calcium deposits on aerator blades and pipes',
      'Erratic daily pH swings in high-carbonate waters'
    ],
    pricing: {
      can5L: 5000,
      bottle1L: 1199,
      mrp5L: 6500,
      mrp1L: 1600
    },
    regulatoryBadges: {
      caaApproved: true,
      isoCertified: true,
      antibioticFree: true
    },
    strains: [
      'Acetobacter sp.',
      'Arthrobacter',
      'Azotobacter',
      'Azomonas',
      'Beijerinckia',
      'Natural organic acid complexes (citric, malic, gluconic)'
    ],
    cfuCount: 'Biological Chelation Consortium with Citric, Malic, Gluconic Intermediates',
    biologicalMechanism: 'Next Softner utilizes specialized bacteria (Acetobacter, Arthrobacter, Azotobacter) that secrete natural biological organic acid chelating intermediates (citric, malic, and gluconic complexes). These organic acids react with insoluble calcium and magnesium carbonate precipitates, chelating them into soluble, bioavailable ionic forms while gently reducing total water hardness without sudden pH shocks.',
    benefits: [
      'Lowers excessive total water hardness to the optimal biological zone (120-200 ppm CaCO3).',
      'Unlocks insoluble mineral precipitates and converts them into bioavailable nutrients.',
      'Prevents mineral chalk encrustation on shrimp gills, preventing respiratory asphyxiation.',
      'Stabilizes total alkalinity and prevents erratic diurnal pH swings in high-carbonate borewell water.'
    ],
    applicationMethod: 'Dissolve required volume in 50 liters of pond water. Broadcast evenly across the water surface in early morning hours (6:00 AM - 9:00 AM) with aeration.',
    dosageProtocol: {
      preventive: '1.0 L per Acre every 15 days for routine maintenance.',
      curative: '2.0 L to 3.0 L per Acre for high hardness (> 250 ppm) with continuous aeration.',
      schedule: [
        {
          stage: 'Normal Maintenance (Hardness 150-250 ppm)',
          dosage: '1.0 L / Acre',
          frequency: 'Every 15 days'
        },
        {
          stage: 'High Hardness (250-400 ppm)',
          dosage: '2.0 L / Acre',
          frequency: 'Repeat after 5 days if required'
        },
        {
          stage: 'Severe Hardness (> 400 ppm / White Scale)',
          dosage: '3.0 L / Acre',
          frequency: 'Continuous aeration for 2 consecutive days'
        }
      ]
    },
    packshotImage: '/images/products/product_next_softner.png',
    galleryImages: [
      '/images/products/product_next_softner.png',
      '/images/products/catalog_overview_asset.png'
    ],
    specSheetPdf: '/docs/TDS_Next_Softner.pdf'
  },
  {
    id: 'prod-009',
    slug: 'next-remedy',
    name: 'Next Remedy',
    tagline: 'Phytoplankton & Microbial Equilibrium: Control Toxic Blue-Green Algae & Bloom Crashes',
    headline: 'Phytoplankton & Microbial Equilibrium: Control Toxic Blue-Green Algae & Bloom Crashes',
    overview: 'Next Remedy is a precision biological bloom regulator formulated to maintain clean, stable pond color and suppress toxic blue-green algae (Microcystis, Oscillatoria, Anabaena). Utilizing an antagonistic consortium of Candida and Rhodococcus, it gently reduces excessive phytoplankton density.',
    category: 'water-conditioner',
    categoryDisplay: 'Microbial Balance & Cyanobacteria Control',
    format5L: '5-Liter HDPE Industrial Canister',
    format1L: '1-Liter Precision Bottle',
    indications: [
      'Toxic blue-green algae blooms (Microcystis, Oscillatoria)',
      'Thick pea-soup green pond water with transparency under 20 cm',
      'Surface scum, foul froth, and dead algal mats',
      'Dangerous late-afternoon pH spikes above 9.0',
      'Nocturnal oxygen drops and danger of sudden bloom crash'
    ],
    pricing: {
      can5L: 5000,
      bottle1L: 1199,
      mrp5L: 6500,
      mrp1L: 1600
    },
    regulatoryBadges: {
      caaApproved: true,
      isoCertified: true,
      antibioticFree: true
    },
    strains: [
      'Candida sp.',
      'Rhodococcus',
      'Arthrobacter',
      'Rhodotorula'
    ],
    cfuCount: 'Minimum 5 Billion CFU/ml (5 x 10^9 CFU/ml)',
    biologicalMechanism: 'Utilizes an antagonistic microbial consortium (Candida, Rhodococcus, Arthrobacter, Rhodotorula) that outcompetes cyanobacteria for micronutrients (iron, phosphorus) and secretes natural algicidal enzymes that gently digest Microcystis cell walls. Prevents violent chemical-induced bloom crashes that deplete oxygen, gently shifting the phytoplankton population toward stable, beneficial brown-tea diatom blooms.',
    benefits: [
      'Suppresses toxic blue-green algae (Cyanobacteria) without dangerous sudden crashes.',
      'Prevents extreme late-afternoon pH spikes (> 9.0) and nocturnal oxygen starvation.',
      'Digests slimy organic surface mats, foul scum, and corner froth.',
      'Establishes a clean, stable golden-brown or tea-green diatom color.'
    ],
    applicationMethod: 'Mix thoroughly with pond water and broadcast directly across areas with heavy surface scum on bright sunny mornings (9:00 AM - 11:00 AM).',
    dosageProtocol: {
      preventive: '1.0 L per Acre every 10 days for preventative color maintenance.',
      curative: '2.0 L to 3.0 L per Acre applied at 10:00 AM on sunny days for thick green blooms.',
      schedule: [
        {
          stage: 'Preventative Color Maintenance',
          dosage: '1.0 L / Acre',
          frequency: 'Every 10 days'
        },
        {
          stage: 'Thick Green Bloom (Transparency < 20 cm)',
          dosage: '2.0 L / Acre',
          frequency: 'Applied at 10:00 AM on a sunny day'
        },
        {
          stage: 'Bloom Crash Emergency / Scum Accumulation',
          dosage: '3.0 L / Acre',
          frequency: 'Immediate dose with aerators running on full'
        }
      ]
    },
    packshotImage: '/images/products/product_next_remedy.png',
    galleryImages: [
      '/images/products/product_next_remedy.png',
      '/images/products/catalog_overview_asset.png'
    ],
    specSheetPdf: '/docs/TDS_Next_Remedy.pdf'
  },
  {
    id: 'prod-010',
    slug: 'next-pro-plus',
    name: 'Next Pro Plus',
    tagline: 'Botanical Amino Acid Enrichment: Natural Zooplankton Bloom & Benthic Vitality',
    headline: 'Botanical Amino Acid Enrichment: Natural Zooplankton Bloom & Benthic Vitality',
    overview: 'Next Pro Plus is an innovative herbal-biotech pond conditioner combining bioactive plant extracts with selective Bacillus strains and free L-amino acids. Designed to enhance the foundational ecology of the pond, it stimulates natural live food reproduction while detoxifying bottom mud.',
    category: 'water-conditioner',
    categoryDisplay: 'Herbal Water & Bottom Conditioner',
    format5L: '5-Liter HDPE Industrial Canister',
    format1L: '1-Liter Precision Bottle',
    indications: [
      'Live food deficiency in nursery ponds and hatcheries',
      'Zooplankton starvation in newly stocked post-larvae',
      'Stressed post-larvae during stocking and weather shifts',
      'Black bottom soil and organic odor in nursery ponds',
      'Early crop mortality and slow initial growth (DOC 1-30)'
    ],
    pricing: {
      can5L: 5000,
      bottle1L: 1199,
      mrp5L: 6500,
      mrp1L: 1600
    },
    regulatoryBadges: {
      caaApproved: true,
      isoCertified: true,
      antibioticFree: true
    },
    strains: [
      'Aqua-grade herbal botanical amino acid complex (20% active extract)',
      'Free L-Amino Acids: Glycine, Glutamic acid, Alanine, Lysine',
      'Selective Bacillus strains (Minimum 3 Billion CFU/ml)'
    ],
    cfuCount: 'Minimum 3 Billion CFU/ml (3 x 10^9 CFU/ml)',
    biologicalMechanism: 'Combines concentrated aqua-grade herbal botanical extracts and free L-amino acids with selective Bacillus strains. The botanical nutrients act as a high-value biological substrate that rapidly stimulates the reproduction of natural live food organisms (rotifers, copepods, daphnia). Concurrently, the Bacillus strains penetrate benthic mud to decompose organic residues, deodorize the pond bottom, and create a protective golden-brown water color that blocks ultraviolet sunlight from stimulating benthic filamentous algae.',
    benefits: [
      'Multiplies natural live food zooplankton in nursery and stocking ponds, reducing early starter feed costs.',
      'Herbal phytonutrients soothe stress in newly stocked post-larvae.',
      'Generates an optimal golden-brown biological water color that blocks benthic weed proliferation.',
      'Deodorizes bottom mud and aids aerobic sludge degradation.'
    ],
    applicationMethod: 'Dilute in 20 liters of clean pond water. Broadcast across the pond surface in early morning (7:00 AM - 9:00 AM) with aerators running.',
    dosageProtocol: {
      preventive: '1.0 L per Acre every 7 days in nursery phase.',
      curative: '2.0 L per Acre applied 4 days before stocking post-larvae for zooplankton bloom setup.',
      schedule: [
        {
          stage: 'Pre-Stocking Zooplankton Bloom Setup',
          dosage: '2.0 L / Acre',
          frequency: 'Applied 4 days before post-larvae stocking'
        },
        {
          stage: 'Nursery / Early Stage (DOC 1-30)',
          dosage: '1.0 L / Acre',
          frequency: 'Every 7 days'
        },
        {
          stage: 'Grow-out Stage (DOC 31 to Harvest)',
          dosage: '1.5 L / Acre',
          frequency: 'Every 10 days'
        }
      ]
    },
    packshotImage: '/images/products/product_next_pro_plus.png',
    galleryImages: [
      '/images/products/product_next_pro_plus.png',
      '/images/products/catalog_overview_asset.png'
    ],
    specSheetPdf: '/docs/TDS_Next_Pro_Plus.pdf'
  },
  {
    id: 'prod-011',
    slug: 'next-pro',
    name: 'Next Pro',
    tagline: 'Comprehensive Biological Dominance: Dual Water Purification & Growth Probiotic',
    headline: 'Comprehensive Biological Dominance: Dual Water Purification & Growth Probiotic',
    overview: 'Next Pro is an all-in-one multi-strain bacterial inoculant designed for comprehensive pond ecosystem management. Featuring a four-strain synergistic matrix, Next Pro operates in two coordinated phases: in the water column as a clarifier and inside the shrimp body as a digestive enhancer.',
    category: 'water-conditioner',
    categoryDisplay: 'Dual-Action Multi-Strain Beneficial Bacteria',
    format5L: '5-Liter HDPE Industrial Canister',
    format1L: '1-Liter Precision Bottle',
    indications: [
      'Complete culture cycle from preparation to pre-harvest',
      'General water column purification and clarification',
      'Pathogen competitive exclusion and biofilm defense',
      'Regular growth enhancement and immune stimulation',
      'Flexible utility: use as a pond bio-filter or feed coating'
    ],
    pricing: {
      can5L: 5000,
      bottle1L: 1199,
      mrp5L: 6500,
      mrp1L: 1600
    },
    regulatoryBadges: {
      caaApproved: true,
      isoCertified: true,
      antibioticFree: true
    },
    strains: [
      'Bacillus subtilis',
      'Bacillus licheniformis',
      'Lactobacillus sporogenes',
      'Bacillus megaterium'
    ],
    cfuCount: 'Minimum 15 Billion CFU/ml (1.5 x 10^10 CFU/ml High Concentration)',
    biologicalMechanism: 'Operates in a coordinated two-phase biological action. In Phase 1 (Water Column), high-concentration Bacillus consortia colonize the water column, consuming suspended organic particulates, decomposing excess dissolved proteins, and competitively excluding harmful bacteria. In Phase 2 (Inside the Shrimp), when ingested directly or mixed with feed, Lactobacillus sporogenes and Bacillus megaterium colonize the gastrointestinal tract, improving nutrient uptake, stimulating digestive enzymes, and accelerating Average Daily Gain (ADG).',
    benefits: [
      'True dual-action versatility: formulated for both pond water broadcasting and daily feed coating.',
      'Four synergistic strains achieve complete microbial dominance over opportunistic pathogens.',
      'Mineralizes suspended organic waste into sparkling, clear, oxygen-rich pond water.',
      'Significantly boosts Average Daily Gain (ADG) and shrimp immune vigor.'
    ],
    applicationMethod: 'Water Treatment: Dilute with 20L pond water and broadcast with aerators running. Feed Coating: Blend 5-10 mL/kg feed with binder, shade dry 20 minutes, feed twice daily.',
    dosageProtocol: {
      preventive: '500 mL to 1.0 L per Acre every 7 to 10 days in water; 5-10 mL per kg feed.',
      curative: '15 mL per kg feed continuously for 5 days during stress recovery.',
      schedule: [
        {
          stage: 'Water Maintenance',
          dosage: '500 mL - 1.0 L / Acre',
          frequency: 'Every 7 to 10 days'
        },
        {
          stage: 'Feed Supplementation',
          dosage: '5 - 10 mL / kg feed',
          frequency: '1 to 2 meals daily'
        },
        {
          stage: 'Stress Recovery Protocol',
          dosage: '15 mL / kg feed',
          frequency: 'Continuously for 5 days'
        }
      ]
    },
    packshotImage: '/images/products/product_next_pro.png',
    galleryImages: [
      '/images/products/product_next_pro.png',
      '/images/products/catalog_overview_asset.png'
    ],
    specSheetPdf: '/docs/TDS_Next_Pro.pdf'
  }
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
