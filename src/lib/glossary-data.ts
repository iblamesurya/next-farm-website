export interface GlossaryTerm {
  slug: string;
  term: string;
  acronym?: string;
  category: 'Pathology & Disease' | 'Water Quality & Chemistry' | 'Nutrition & Feed Management' | 'Pond Soil & Bioremediation' | 'Microbiology & Probiotics';
  shortDefinition: string;
  detailedExplanation: string;
  clinicalImportance: string;
  teluguExplanation: string;
  optimalRangeOrIndicator?: string;
  relatedProducts?: {
    name: string;
    slug: string;
  }[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: 'fcr-feed-conversion-ratio',
    term: 'Feed Conversion Ratio',
    acronym: 'FCR',
    category: 'Nutrition & Feed Management',
    shortDefinition: 'Feed Conversion Ratio (FCR) is the quantitative metric representing kilograms of commercial feed required to produce one kilogram of wet shrimp biomass.',
    detailedExplanation: 'FCR is calculated as: Total Feed Administered (kg) ÷ Total Biomass Harvested (kg). In intensive Litopenaeus vannamei culture, an FCR between 1.20 and 1.35 represents top-tier digestive assimilation. When FCR exceeds 1.55, it indicates overfeeding, unobserved check tray mortality, digestive tract inflammation, or microsporidian (EHP) infection.',
    clinicalImportance: 'Feed accounts for 55–65% of total aquaculture operational expenditure. Lowering FCR from 1.50 to 1.30 saves ₹40,000–₹60,000 per acre while drastically reducing unconsumed organic sludge at the pond bottom.',
    teluguExplanation: 'ఫీడ్ కన్వర్షన్ రేషియో (FCR) అంటే ఒక కిలో రొయ్య బరువు పెరగడానికి ఎన్ని కిలోల మేత తిన్నదో తెలిపే నిష్పత్తి. FCR 1.2 నుండి 1.35 మధ్య ఉంటే రైతుకు అత్యధిక లాభం వస్తుంది.',
    optimalRangeOrIndicator: '1.20 – 1.35 (Optimal) | > 1.55 (Critical Inefficiency)',
    relatedProducts: [
      { name: 'Next Converter', slug: 'next-converter' },
      { name: 'Next Gut', slug: 'next-gut' }
    ]
  },
  {
    slug: 'abw-average-body-weight',
    term: 'Average Body Weight',
    acronym: 'ABW',
    category: 'Nutrition & Feed Management',
    shortDefinition: 'Average Body Weight (ABW) is the mean individual mass (in grams) of a cultured shrimp population, determined by weekly cast-net sampling.',
    detailedExplanation: 'ABW is calculated by weighing 100 random shrimp caught across multiple check tray quadrants: Total Weight (g) ÷ Number of Shrimp. Tracking ABW over Days of Culture (DOC) establishes the Average Daily Growth (ADG) rate, usually 0.25 to 0.40 grams/day in healthy vannamei ponds.',
    clinicalImportance: 'Accurate ABW determines the exact daily feed ration and biological medicine dosage. Underestimating ABW causes underfeeding and cannibalism; overestimating ABW triggers water pollution and toxic ammonia spikes.',
    teluguExplanation: 'యావరేజ్ బాడీ వెయిట్ (ABW) అంటే చెరువులోని రొయ్యల సగటు బరువు (గ్రాములలో). ప్రతి వారం వల వేసి 100 రొయ్యలను తూకం వేసి ABW లెక్కిస్తారు.',
    optimalRangeOrIndicator: '0.25 – 0.40 g/day growth rate',
    relatedProducts: [
      { name: 'Next Grow Max', slug: 'next-grow-max' }
    ]
  },
  {
    slug: 'ehp-enterocytozoon-hepatopenaei',
    term: 'Enterocytozoon hepatopenaei',
    acronym: 'EHP',
    category: 'Pathology & Disease',
    shortDefinition: 'Enterocytozoon hepatopenaei (EHP) is an obligate intracellular microsporidian parasite that replicates within the tubule epithelial cells of the shrimp hepatopancreas.',
    detailedExplanation: 'EHP does not cause sudden catastrophic mass mortality by itself; instead, it causes severe, irreversible growth stunting (size jumping). Microsporidian spores inject sporoplasm through a polar tube into host hepatopancreatic cells, hijacking host cellular energy (ATP) and rupturing the digestive epithelium.',
    clinicalImportance: 'EHP is the primary biological driver of crop failure across India. It opens the gateway for secondary opportunistic Vibrio infections (White Feces Syndrome). Chemical treatments fail because spore walls are chitinous; only competitive biological gut exclusion and pond bottom chlorination are effective.',
    teluguExplanation: 'EHP అనేది రొయ్యల కాలేయంలో (Hepatopancreas) చేరే సూక్ష్మ పరాన్నజీవి. దీనివల్ల రొయ్యల ఎదుగుదల పూర్తిగా ఆగిపోయి సైజు తేడాలు (Size jumping) వస్తాయి.',
    optimalRangeOrIndicator: '0 spores/g on PCR screening (Strict Target)',
    relatedProducts: [
      { name: 'Next Gut', slug: 'next-gut' },
      { name: 'Next Eco Bio Clean', slug: 'next-eco-bio-clean' }
    ]
  },
  {
    slug: 'tan-total-ammonia-nitrogen',
    term: 'Total Ammonia Nitrogen',
    acronym: 'TAN',
    category: 'Water Quality & Chemistry',
    shortDefinition: 'Total Ammonia Nitrogen (TAN) is the sum of un-ionized toxic ammonia (NH3) and relatively non-toxic ionized ammonium (NH4+) in pond water.',
    detailedExplanation: 'The equilibrium between NH3 and NH4+ depends heavily on pH and water temperature. At high pH (>8.5) and high temperature (>30°C), the toxic NH3 fraction increases exponentially. Toxic NH3 diffuses across shrimp gill membranes, disrupting internal osmoregulation and causing lethal gill tissue necrosis.',
    clinicalImportance: 'Un-ionized NH3 levels above 0.1 mg/L cause severe respiratory distress, lethargy, and feeding cessation. Above 0.5 mg/L, mass mortality occurs within hours.',
    teluguExplanation: 'టోటల్ అమ్మోనియా నైట్రోజన్ (TAN) అంటే చెరువు నీటిలోని విషపూరిత అమ్మోనియా మొత్తం పరిమాణం. pH ఎక్కువగా ఉన్నప్పుడు అమ్మోనియా తీవ్రత పెరిగి రొయ్యలు చనిపోతాయి.',
    optimalRangeOrIndicator: '< 0.5 ppm TAN (< 0.05 ppm toxic NH3)',
    relatedProducts: [
      { name: 'Next Quick Gas Nill', slug: 'next-quick-gas-nill' },
      { name: 'Next Super PS', slug: 'next-super-ps' }
    ]
  },
  {
    slug: 'nitrite-toxicity-no2',
    term: 'Nitrite Toxicity',
    acronym: 'NO2-',
    category: 'Water Quality & Chemistry',
    shortDefinition: 'Nitrite (NO2-) is an intermediate oxidation byproduct in the nitrification cycle produced when ammonia is converted by Nitrosomonas bacteria.',
    detailedExplanation: 'In shrimp, nitrite enters hemolymph via chloride uptake pumps in the gills. Once inside, nitrite oxidizes oxygen-carrying hemocyanin into non-functional methemocyanin ("brown blood"), causing tissue hypoxia even when pond dissolved oxygen levels are saturated.',
    clinicalImportance: 'Nitrite toxicity is inversely proportional to water salinity and chloride ion concentration. Low-salinity ponds (<5 ppt) in Krishna and West Godavari are exceptionally vulnerable to nitrite poisoning.',
    teluguExplanation: 'నైట్రైట్ (NO2) అనేది అమ్మోనియా కుళ్ళినప్పుడు ఏర్పడే ప్రమాదకరమైన రసాయనం. ఇది రొయ్య రక్తంలో ఆక్సిజన్ మోసుకెళ్లే శక్తిని నాశనం చేసి ఊపిరాడకుండా చేస్తుంది.',
    optimalRangeOrIndicator: '< 0.2 ppm in low salinity | < 1.0 ppm in seawater',
    relatedProducts: [
      { name: 'Next Converter', slug: 'next-converter' },
      { name: 'Next Quick Gas Nill', slug: 'next-quick-gas-nill' }
    ]
  },
  {
    slug: 'dissolved-oxygen-do',
    term: 'Dissolved Oxygen',
    acronym: 'DO',
    category: 'Water Quality & Chemistry',
    shortDefinition: 'Dissolved Oxygen (DO) is the volume of free, non-compound O2 dissolved in aquaculture pond water, measured in milligrams per liter (mg/L or ppm).',
    detailedExplanation: 'Pond DO fluctuates diurnally due to phytoplankton photosynthesis (producing DO by day) and nocturnal respiration (consuming DO by night). Between 3:00 AM and 6:00 AM, DO drops to its lowest level. Litopenaeus vannamei requires continuous DO > 4.5 ppm for healthy metabolism and feed assimilation.',
    clinicalImportance: 'DO falling below 3.0 ppm triggers immediate check tray feed drop. Below 2.0 ppm, shrimp suffocate, molt with fatal cramps, and succumb to opportunistic Vibrio bacteremia.',
    teluguExplanation: 'డిసాల్వ్డ్ ఆక్సిజన్ (DO) అంటే చెరువు నీటిలో కరిగి ఉన్న ప్రాణవాయువు. రొయ్యల ఆరోగ్యకరమైన ఎదుగుదలకు ఎల్లప్పుడూ 4.5 ppm కంటే ఎక్కువ ఆక్సిజన్ ఉండాలి.',
    optimalRangeOrIndicator: '4.5 – 7.5 ppm (Target) | < 3.0 ppm (Danger Threshold)',
    relatedProducts: [
      { name: 'Next Oxy Fresh', slug: 'next-oxy-fresh' }
    ]
  },
  {
    slug: 'total-alkalinity',
    term: 'Total Alkalinity',
    acronym: 'Alkalinity',
    category: 'Water Quality & Chemistry',
    shortDefinition: 'Total Alkalinity is the measure of pond water buffering capacity to neutralize acids, primarily composed of carbonate (CO32-) and bicarbonate (HCO3-) ions.',
    detailedExplanation: 'Expressed in mg/L equivalent of calcium carbonate (CaCO3). Alkalinity stabilizes pond pH between sunrise and sunset. Shrimp consume bicarbonate ions during post-molt exoskeleton remineralization.',
    clinicalImportance: 'If alkalinity falls below 100 ppm, pH fluctuates wildly (>0.8 variation between morning and evening), stressing the shrimp and preventing shell hardening after molting.',
    teluguExplanation: 'ఆల్కలీనిటీ అంటే నీటిలో ఉండే బైకార్బోనేట్ మరియు కార్బోనేట్ ల పరిమాణం. ఇది నీటి pH హెచ్చుతగ్గులు లేకుండా నిలకడగా ఉంచుతుంది మరియు రొయ్యల కుబుసం గట్టిపడటానికి అవసరం.',
    optimalRangeOrIndicator: '120 – 180 ppm CaCO3 equivalent',
    relatedProducts: [
      { name: 'Next Speed Mineral', slug: 'next-speed-mineral' }
    ]
  },
  {
    slug: 'tcbs-agar-vibrio-enumeration',
    term: 'TCBS Agar Culture',
    acronym: 'TCBS',
    category: 'Microbiology & Probiotics',
    shortDefinition: 'Thiosulfate-Citrate-Bile Salts-Sucrose (TCBS) agar is the standard selective microbiological culture medium used to enumerate pathogenic Vibrio colonies in aquaculture.',
    detailedExplanation: 'Vibrio species differentiate by color on TCBS: Yellow colonies (sucrose-fermenting, e.g., V. cholerae, V. alginolyticus) vs. Green colonies (non-sucrose-fermenting, e.g., V. parahaemolyticus, V. vulnificus). Green colonies are significantly more virulent and toxic to shrimp.',
    clinicalImportance: 'Pond water green Vibrio counts exceeding 1 × 10³ CFU/ml indicate an imminent outbreak of EMS/AHPND or White Gut Syndrome, requiring immediate biological intervention.',
    teluguExplanation: 'TCBS అగార్ అనేది చెరువు నీటిలో లేదా రొయ్య కాలేయంలో ఉండే విబ్రియో బ్యాక్టీరియాను లెక్కించే ల్యాబ్ పరీక్ష. పచ్చని (Green) కాలనీలు ఎక్కువైతే ప్రమాద సంకేతం.',
    optimalRangeOrIndicator: 'Total Vibrio < 1×10⁴ CFU/ml | Green Vibrio < 1×10² CFU/ml',
    relatedProducts: [
      { name: 'Next Viro Nill', slug: 'next-viro-nill' },
      { name: 'Next Gut', slug: 'next-gut' }
    ]
  },
  {
    slug: 'atm-aggregated-transformed-microvilli',
    term: 'Aggregated Transformed Microvilli',
    acronym: 'ATM',
    category: 'Pathology & Disease',
    shortDefinition: 'ATM is the microscopic pathognomonic lesion of White Feces Syndrome, formed when sloughed microvilli from hepatopancreatic tubules aggregate in the midgut.',
    detailedExplanation: 'Under light microscopy, ATM structures resemble vermiform gregarine protozoan trophozoites, which led to decades of misdiagnosis. In reality, ATM consists of denuded microvillar membranes and cellular debris detached from epithelial cells following EHP and Vibrio toxin injury.',
    clinicalImportance: 'Recognizing ATM confirms that white fecal strings are cellular tissue loss from the shrimp digestive organ rather than simple indigestion, proving the need for epithelial barrier restorative probiotics.',
    teluguExplanation: 'ATM అనేది తెల్ల మలం (White Feces) వ్యాధిలో కనిపించే కాలేయ కణాల పొరల వ్యర్థాలు. ఇవి పురుగుల్లా కనిపించినా, అసలు రొయ్య పేగు లోపలి గోడలు ఊడిపోయి ఏర్పడిన వ్యర్థాలు.',
    optimalRangeOrIndicator: 'Zero ATM in midgut smear',
    relatedProducts: [
      { name: 'Next Gut', slug: 'next-gut' }
    ]
  },
  {
    slug: 'benthic-sludge-oxidation',
    term: 'Benthic Sludge Oxidation',
    category: 'Pond Soil & Bioremediation',
    shortDefinition: 'Benthic sludge oxidation is the biological breakdown of accumulated anaerobic organic mud (dead algae, feces, unconsumed feed) at the bottom of the pond.',
    detailedExplanation: 'When organic matter settles in low-aeration blind spots, oxygen is depleted and anaerobic sulfur-reducing bacteria produce black ferrous sulfide (FeS) and hydrogen sulfide gas (H2S). Probiotic bioremediators utilize Bacillus megaterium and Thiobacillus denitrificans to consume carbon and oxidize sulfides into harmless sulfate (SO42-).',
    clinicalImportance: 'Bottom black mud is the direct cause of black gill disease, foul odor, and benthic Vibrio colonization. Regular bottom oxidation eliminates the toxic core of the pond.',
    teluguExplanation: 'బెంతిక్ స్లడ్జ్ ఆక్సిడేషన్ అంటే చెరువు అడుగున చేరిన కుళ్ళిన నల్ల మట్టి, పాచి మరియు రొయ్య మలాన్ని బ్యాక్టీరియా ద్వారా తినిపించి శుభ్రం చేయడం.',
    optimalRangeOrIndicator: 'Redox potential (ORP) > -100 mV',
    relatedProducts: [
      { name: 'Next Eco Bio Clean', slug: 'next-eco-bio-clean' },
      { name: 'Next Super PS', slug: 'next-super-ps' }
    ]
  },
  {
    slug: 'check-tray-observation',
    term: 'Check Tray Observation',
    category: 'Nutrition & Feed Management',
    shortDefinition: 'Check tray observation is the manual monitoring of feeding nets (usually 4 trays per acre) suspended 5–10 cm above the pond bottom to calibrate feed consumption.',
    detailedExplanation: 'Check trays are inspected 2 to 2.5 hours after feeding. Clean trays indicate strong appetite; leftover feed indicates overfeeding, low DO, high ammonia, or disease onset. Check trays also provide the earliest visual check for white fecal strings, molt carapaces, and dead shrimp.',
    clinicalImportance: 'Proper check tray management prevents 80% of overfeeding disasters, maintaining water clarity and preventing bottom sludge buildup.',
    teluguExplanation: 'చెక్ ట్రేల పరిశీలన అంటే చెరువులో అమర్చిన ఫీడింగ్ ట్రేలను మేత వేసిన 2 గంటల తర్వాత పైకి తీసి, రొయ్యలు ఎంత తిన్నాయి మరియు వాటి పేగులు ఎలా ఉన్నాయో గమనించడం.',
    optimalRangeOrIndicator: 'Tray cleared in 1.5 – 2.0 hours',
    relatedProducts: [
      { name: 'Next Converter', slug: 'next-converter' }
    ]
  },
  {
    slug: 'biofloc-cn-ratio',
    term: 'Biofloc C:N Ratio',
    category: 'Water Quality & Chemistry',
    shortDefinition: 'The Carbon-to-Nitrogen (C:N) ratio is the chemical stoichiometric proportion between organic carbon and nitrogen required for heterotrophic bacteria to convert toxic ammonia into bacterial protein.',
    detailedExplanation: 'Standard commercial feed has a C:N ratio of approximately 10:1. Adding molasses, jaggery, or tapioca flour elevates the pond C:N ratio to 15:1 – 20:1, stimulating heterotrophic microbial consortia to assimilate inorganic ammonium directly into single-cell protein flocs without requiring water exchange.',
    clinicalImportance: 'Maintaining a balanced C:N ratio prevents toxic ammonia spikes in zero-exchange intensive shrimp ponds while producing supplemental microbial nutrition for grazing shrimp.',
    teluguExplanation: 'బయోఫ్లాక్ C:N నిష్పత్తి అంటే నీటిలోని కార్బన్ మరియు నైట్రోజన్ ల సమతుల్యత. బెల్లం లేదా మొలాసెస్ కలపడం ద్వారా మంచి బ్యాక్టీరియా వృద్ధి చెంది అమ్మోనియాను ఆహారంగా మారుస్తుంది.',
    optimalRangeOrIndicator: '15:1 – 20:1 (Biofloc Standard)',
    relatedProducts: [
      { name: 'Next Eco Bio Clean', slug: 'next-eco-bio-clean' }
    ]
  },
  {
    slug: 'plankton-crash',
    term: 'Plankton Crash',
    category: 'Water Quality & Chemistry',
    shortDefinition: 'A plankton crash is the sudden, catastrophic mass die-off of beneficial microalgae (diatoms or chlorophytes) in an aquaculture pond.',
    detailedExplanation: 'Triggered by sudden weather shifts, heavy rainfall, cloudy days, or nutrient depletion. Water turns from rich brownish-green to clear or turbid grayish-brown within 12 hours. Dead algal cells settle to the bottom, decaying rapidly and consuming vast quantities of dissolved oxygen while releasing toxic ammonia.',
    clinicalImportance: 'A plankton crash triggers severe nocturnal hypoxia and sudden mass molting. Immediate broadcast of oxygen donors and algal bloom stimulants is required.',
    teluguExplanation: 'ప్లాంక్టన్ క్రాష్ అంటే చెరువులోని ఆల్గే (పాచి) అకస్మాత్తుగా చనిపోయి నీరు రంగు మారడం. దీనివల్ల నీటిలో ఆక్సిజన్ ఒక్కసారిగా పడిపోయి అమ్మోనియా పెరుగుతుంది.',
    optimalRangeOrIndicator: 'Secchi disc depth: 25 – 35 cm',
    relatedProducts: [
      { name: 'Next Oxy Fresh', slug: 'next-oxy-fresh' },
      { name: 'Next Plankton Boom', slug: 'next-plankton-boom' }
    ]
  },
  {
    slug: 'luminescent-vibriosis',
    term: 'Luminescent Vibriosis',
    category: 'Pathology & Disease',
    shortDefinition: 'Luminescent Vibriosis is an acute bacterial infection primarily caused by bioluminescent Vibrio harveyi that causes infected shrimp and pond water to glow in the dark.',
    detailedExplanation: 'Vibrio harveyi produces luciferase enzymes via quorum sensing autoinducers when bacterial cell density exceeds critical thresholds. Pathogenic strains produce hemolysins and extracellular proteases that liquefy shrimp hepatopancreas tissue and muscle fibers.',
    clinicalImportance: 'Highly virulent in high salinity marine hatcheries and coastal grow-out ponds. Causes up to 100% larval mortality within 48 hours if left untreated.',
    teluguExplanation: 'లూమినిసెంట్ విబ్రియోసిస్ అనేది విబ్రియో హార్వేయి బ్యాక్టీరియా వల్ల వచ్చే వ్యాధి. రాత్రి వేళల్లో చీకటిలో చూసినప్పుడు చెరువు నీరు మరియు రొయ్యల శరీరాలు ఆకుపచ్చగా వెలుగుతాయి.',
    optimalRangeOrIndicator: 'Zero luminescent colonies on agar',
    relatedProducts: [
      { name: 'Next Viro Nill', slug: 'next-viro-nill' }
    ]
  },
  {
    slug: 'competitive-exclusion',
    term: 'Competitive Exclusion',
    category: 'Microbiology & Probiotics',
    shortDefinition: 'Competitive exclusion is the microbiological principle where non-pathogenic probiotic bacteria outcompete and displace harmful pathogens for intestinal receptor sites and nutritional resources.',
    detailedExplanation: 'When beneficial bacteria such as Bacillus subtilis and Lactobacillus acidophilus saturate the mucosal lining of the shrimp digestive tract, they produce bacteriocins (surfactin, subtilosin) and alter the microenvironment pH, physically preventing pathogenic Vibrio from docking or colonizing.',
    clinicalImportance: 'Competitive exclusion is the core scientific mechanism that allows 100% antibiotic-free shrimp farming to achieve superior survival rates and zero export rejections.',
    teluguExplanation: 'కాంపిటీటివ్ ఎక్స్‌క్లూజన్ అంటే మంచి బ్యాక్టీరియా (ప్రొబయోటిక్స్) పేగుల గోడలను ఆక్రమించి, చెడు విబ్రియో బ్యాక్టీరియాకు చోటు లేకుండా చేసి బయటకు పంపే జీవ ప్రక్రియ.',
    optimalRangeOrIndicator: '> 1×10⁸ CFU/ml beneficial gut microflora',
    relatedProducts: [
      { name: 'Next Gut', slug: 'next-gut' },
      { name: 'Next Converter', slug: 'next-converter' }
    ]
  }
];
