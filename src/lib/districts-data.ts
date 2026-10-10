export interface DistrictGuide {
  slug: string;
  name: string;
  district: string;
  state: string;
  teluguName: string;
  metaTitle: string;
  metaDescription: string;
  keyGeography: string[];
  averageSalinity: string;
  salinityType: 'Freshwater / Low Saline' | 'Brackish Water' | 'Hypersaline Marine' | 'Estuarine Delta';
  primarySpecies: string[];
  stockingDensity: string;
  primaryWaterSource: string;
  soilCharacteristics: string;
  pathologyRisks: {
    disease: string;
    severity: 'High' | 'Severe' | 'Critical' | 'Moderate';
    trigger: string;
    clinicalSigns: string;
    preventativeProtocol: string;
  }[];
  recommendedFormulations: {
    productName: string;
    productSlug: string;
    dosage: string;
    timing: string;
    indication: string;
  }[];
  localFieldAdvisory: {
    teluguAdvisory: string;
    englishSummary: string;
    seasonalChecklist: string[];
  };
  contactHelpline: string;
}

export const DISTRICT_GUIDES: DistrictGuide[] = [
  {
    slug: 'bhimavaram-west-godavari',
    name: 'Bhimavaram & West Godavari Hub',
    district: 'West Godavari',
    state: 'Andhra Pradesh',
    teluguName: 'భీమవరం & పశ్చిమ గోదావరి ఆక్వా హబ్',
    metaTitle: 'Bhimavaram Prawn Medicine & Probiotics | West Godavari Shrimp Aquaculture',
    metaDescription: 'Authoritative aquaculture clinic guide for Bhimavaram & West Godavari. Clinical treatment for White Gut, mineral deficiency, and benthic sludge in Vannamei ponds.',
    keyGeography: ['Bhimavaram', 'Akividu', 'Mogalthur', 'Palakollu', 'Narsapur', 'Kolleru lake fringe'],
    averageSalinity: '2 – 15 ppt',
    salinityType: 'Brackish Water',
    primarySpecies: ['Litopenaeus vannamei', 'Penaeus monodon', 'Freshwater Scampi'],
    stockingDensity: '50 – 85 PL/m² (Intensive)',
    primaryWaterSource: 'Upputeru Canal, Godavari delta irrigation channels, deep bore brackish water',
    soilCharacteristics: 'Alluvial clay-loam with high organic sediment accumulation',
    pathologyRisks: [
      {
        disease: 'White Gut & White Feces Syndrome (WGS/WFS)',
        severity: 'Critical',
        trigger: 'Summer high water temperature (>33°C) combined with high stocking organic accumulation',
        clinicalSigns: 'White fecal ribbons on check trays, midgut microvilli sloughing, feed drop by 30-50%',
        preventativeProtocol: 'Feed top-dressing with Next Gut (20 ml/kg) + morning Next Viro Nill water broadcast'
      },
      {
        disease: 'Benthic Black Sludge & Anaerobic H2S Production',
        severity: 'Severe',
        trigger: 'Continuous unconsumed feed pellet accumulation in high-density check tray culture',
        clinicalSigns: 'Blackened pond bottom, rotten egg odor, shrimp lethargy at pond center',
        preventativeProtocol: 'Weekly probiotic oxidation with Next Eco Bio Clean (1 L/acre) + Next Super PS'
      },
      {
        disease: 'Mineral Imbalance & Soft Shell Syndrome',
        severity: 'High',
        trigger: 'Low ionic ratio (Mg:Ca:K imbalance in groundwater bore intake)',
        clinicalSigns: 'Shrimp fail to harden post-molt, muscle cramps, cannibalism during new moon cycles',
        preventativeProtocol: 'Fortnightly ionic balancing with Next Speed Mineral (10 kg/acre)'
      }
    ],
    recommendedFormulations: [
      {
        productName: 'Next Gut',
        productSlug: 'next-gut',
        dosage: '15–20 ml/kg feed',
        timing: 'Morning and afternoon meals daily for 5 days',
        indication: 'White Gut Disease & EHP microvilli repair'
      },
      {
        productName: 'Next Eco Bio Clean',
        productSlug: 'next-eco-bio-clean',
        dosage: '1.0 L / acre',
        timing: 'Apply every 7 days during high aeration',
        indication: 'Digestion of bottom black mud & organic matter'
      },
      {
        productName: 'Next Speed Mineral',
        productSlug: 'next-speed-mineral',
        dosage: '10 kg / acre',
        timing: 'Apply 24 hours prior to full moon / new moon molting peak',
        indication: 'Ionic replenishment of Ca, Mg, and K'
      }
    ],
    localFieldAdvisory: {
      teluguAdvisory: 'భీమవరం మరియు పశ్చిమ గోదావరి పరిసరాల్లో అధిక సాంద్రత సాగులో తెల్ల పేగు (White Gut) మరియు నల్ల మట్టి సమస్య ప్రధానం. చెక్ ట్రేలను గమనించి, మధ్యాహ్నం వేడిలో ఫీడింగ్ తగ్గించి, నెక్స్ట్ గట్ ప్రొబయోటిక్ వాడటం ద్వారా వ్యాధిని సమర్థవంతంగా అరికట్టవచ్చు.',
      englishSummary: 'Bhimavaram farmers face heavy organic loads in check trays. Reducing feed during noon peak heat and maintaining continuous bottom probiotic digestion prevents lethal summer Vibrio crashes.',
      seasonalChecklist: [
        'Perform check tray inspection every 2 hours during peak daylight',
        'Verify bore water Ca:Mg:K ratio before stocking PL',
        'Run aerators continuously between 11 PM and 6 AM to prevent midnight hypoxia'
      ]
    },
    contactHelpline: '+91 8977656444'
  },
  {
    slug: 'nellore-coastal',
    name: 'Nellore Coastal Aquaculture Hub',
    district: 'SPSR Nellore',
    state: 'Andhra Pradesh',
    teluguName: 'నెల్లూరు కోస్టల్ రొయ్యల సాగు హబ్',
    metaTitle: 'Nellore Shrimp Medicine & Probiotics | Coastal Prawn Disease Management',
    metaDescription: 'Specialized aquaculture biosecurity and marine shrimp medicine protocol for Nellore district. Manage high-salinity Vibrio, WSSV biosecurity, and toxic ammonia.',
    keyGeography: ['Kandukur', 'Kavali', 'Gudur', 'Kota', 'Vakadu', 'Buckingham Canal belt'],
    averageSalinity: '25 – 38 ppt',
    salinityType: 'Hypersaline Marine',
    primarySpecies: ['Litopenaeus vannamei', 'Penaeus monodon (Black Tiger)'],
    stockingDensity: '60 – 100 PL/m²',
    primaryWaterSource: 'Bay of Bengal seawater intake, Buckingham Canal, tidal creek estuaries',
    soilCharacteristics: 'Sandy marine loam with rapid percolation and high sulfate content',
    pathologyRisks: [
      {
        disease: 'Virulent Luminescent Vibriosis (Vibrio harveyi & V. parahaemolyticus)',
        severity: 'Critical',
        trigger: 'High salinity marine environment (>30 ppt) combined with excessive nutrient broth',
        clinicalSigns: 'Shrimp glow green in the dark, severe hepatopancreatic atrophy, 80% mortality in 72 hours',
        preventativeProtocol: 'Proactive virucidal suppression with Next Viro Nill (1.5 L/acre) + Next Gut'
      },
      {
        disease: 'Toxic Ammonia (TAN) & Nitrite Spikes',
        severity: 'Severe',
        trigger: 'High salinity reduces ammonia gas stripping efficiency, causing chemical toxicity',
        clinicalSigns: 'Shrimp swim near dyke surface, red antenna, flared gills, check tray feed cessation',
        preventativeProtocol: 'Emergency broadcast of Next Quick Gas Nill (1.5 L/acre) with deep aeration'
      }
    ],
    recommendedFormulations: [
      {
        productName: 'Next Viro Nill',
        productSlug: 'next-viro-nill',
        dosage: '1.5 L / acre',
        timing: 'Broadcast at 6:00 AM with all aerators running',
        indication: 'Broad-spectrum suppression of pathogenic Vibrio reservoirs'
      },
      {
        productName: 'Next Quick Gas Nill',
        productSlug: 'next-quick-gas-nill',
        dosage: '1.5–2.0 L / acre',
        timing: 'Immediate application upon TAN > 1.0 ppm',
        indication: 'Rapid chemical neutralization of toxic NH3 and NO2'
      }
    ],
    localFieldAdvisory: {
      teluguAdvisory: 'నెల్లూరు తీర ప్రాంతాల్లో అధిక ఉప్పదనం (High Salinity) కారణంగా విబ్రియో బ్యాక్టీరియా తీవ్రత ఎక్కువ. సాయంత్రం వేళల్లో రొయ్యలు వెలుగుతున్నాయా లేదా అని గమనించండి. నెక్స్ట్ విరో నిల్ ద్వారా నీటిని శుద్ధి చేయండి.',
      englishSummary: 'High coastal salinity accelerates luminescent Vibrio blooms. Regular TCBS agar monitoring and early-morning biological sanitization are vital.',
      seasonalChecklist: [
        'Monitor TCBS agar green vs yellow colony counts weekly',
        'Check dissolved oxygen at 4 AM to prevent high-salinity suffocation',
        'Flush pond dykes after coastal squalls to prevent salinity drops'
      ]
    },
    contactHelpline: '+91 8977656444'
  },
  {
    slug: 'krishna-kaikaluru',
    name: 'Krishna & Kaikaluru Aquaculture Zone',
    district: 'Krishna',
    state: 'Andhra Pradesh',
    teluguName: 'కృష్ణా & కైకలూరు ఆక్వా క్లినిక్',
    metaTitle: 'Krishna District Prawn & Fish Medicine | Kaikaluru Aquaculture Clinic',
    metaDescription: 'Low-salinity and freshwater shrimp & fish disease management for Kaikaluru, Gudivada, and Krishna delta. Remediation for cyanobacteria blooms and slow growth.',
    keyGeography: ['Kaikaluru', 'Gudivada', 'Bantumilli', 'Nagayalanka', 'Machilipatnam'],
    averageSalinity: '0.5 – 6 ppt',
    salinityType: 'Freshwater / Low Saline',
    primarySpecies: ['Litopenaeus vannamei', 'Pangasius', 'Rohu / Catla (Polyculture)'],
    stockingDensity: '35 – 55 PL/m²',
    primaryWaterSource: 'Krishna Eastern Delta canals, Kolleru overflow channels',
    soilCharacteristics: 'Deep alluvial black cotton soil with high silt content',
    pathologyRisks: [
      {
        disease: 'Blue-Green Algae (Cyanobacteria / Microcystis) Pond Crash',
        severity: 'Critical',
        trigger: 'High phosphorus runoff from agriculture paired with freshwater conditions',
        clinicalSigns: 'Thick pea-soup paint scum on surface, muddy off-flavor, severe nocturnal oxygen crash',
        preventativeProtocol: 'Biological algal competitive exclusion using Next Plankton Boom + Next Super PS'
      },
      {
        disease: 'Chronic Low-Salinity Molt Cramps & Muscle Opacity',
        severity: 'Severe',
        trigger: 'Deficiency of ionic magnesium and potassium in freshwater bore wells',
        clinicalSigns: 'Cramped shrimp bodies resembling white tail disease, inability to straighten tail',
        preventativeProtocol: 'Constant ionic supplementation using Next Speed Mineral (15 kg/acre/month)'
      }
    ],
    recommendedFormulations: [
      {
        productName: 'Next Speed Mineral',
        productSlug: 'next-speed-mineral',
        dosage: '12–15 kg / acre',
        timing: 'Apply in split doses every 10 days',
        indication: 'Ionic replenishment in zero-salinity groundwater'
      },
      {
        productName: 'Next Super PS',
        productSlug: 'next-super-ps',
        dosage: '2.0 L / acre',
        timing: 'Broadcast on bright sunny mornings (10 AM)',
        indication: 'Digestion of dead cyanobacterial algal mats'
      }
    ],
    localFieldAdvisory: {
      teluguAdvisory: 'కైకలూరు మరియు కృష్ణా డెల్టాలో మంచినీటి లేదా తక్కువ ఉప్పదనంలో సాగు చేసే రైతులకు నీలి-ఆకుపచ్చ పాచి (Cyanobacteria) మరియు రొయ్యలకు నరాల ఒరుపు (Cramps) ప్రధాన సమస్యలు. నెక్స్ట్ స్పీడ్ మినరల్ ప్రతి 10 రోజులకు అందించాలి.',
      englishSummary: 'Low salinity ponds in Krishna district suffer from acute mineral depletion and cyanobacteria scum. Consistent ionic balancing ensures solid shell hardening.',
      seasonalChecklist: [
        'Test total hardness and alkalinity twice weekly',
        'Avoid heavy phosphate fertilizers that trigger blue-green algae blooms',
        'Ensure bottom aerators are positioned to sweep organic muck away from check trays'
      ]
    },
    contactHelpline: '+91 8977656444'
  },
  {
    slug: 'bapatla-chirala',
    name: 'Bapatla & Chirala Estuarine Belt',
    district: 'Bapatla',
    state: 'Andhra Pradesh',
    teluguName: 'బాపట్ల & చీరాల రొయ్యల మందులు',
    metaTitle: 'Bapatla Aquaculture Solutions & Shrimp Medicine | Chirala & Karlapalem',
    metaDescription: 'Clinical guidance for shrimp ponds in Bapatla and Chirala estuarine zone. Managing acid sulfate soils, toxic hydrogen sulfide, and black gill disease.',
    keyGeography: ['Bapatla', 'Chirala', 'Karlapalem', 'Vetapalem', 'Romperu drain belt'],
    averageSalinity: '12 – 28 ppt',
    salinityType: 'Estuarine Delta',
    primarySpecies: ['Litopenaeus vannamei', 'Tiger Shrimp'],
    stockingDensity: '50 – 75 PL/m²',
    primaryWaterSource: 'Romperu drain, estuarine tidal canals, coastal creek water',
    soilCharacteristics: 'Acid-sulfate patches with high pyrite (FeS2) content and low pH risk',
    pathologyRisks: [
      {
        disease: 'Acid-Sulfate Induced Black Gill & Heavy Metal Precipitation',
        severity: 'Critical',
        trigger: 'Heavy rainfall leaches sulfuric acid from dykes, dropping pond water pH < 6.5',
        clinicalSigns: 'Gill filaments turn brown to jet black, shrimp gasp at pond edges, high mortality',
        preventativeProtocol: 'Agricultural liming followed by Next Eco Bio Clean and Next Oxy Fresh'
      },
      {
        disease: 'Hydrogen Sulfide (H2S) Toxicity',
        severity: 'Severe',
        trigger: 'Anaerobic decomposition of sulfate-rich estuarine sludge in check trays',
        clinicalSigns: 'Shrimp refuse feed, dark midgut, sudden mortality within 1 hour of aeration stoppage',
        preventativeProtocol: 'Application of Next Quick Gas Nill (1.5 L/acre) directly over feeding lanes'
      }
    ],
    recommendedFormulations: [
      {
        productName: 'Next Quick Gas Nill',
        productSlug: 'next-quick-gas-nill',
        dosage: '1.5 L / acre',
        timing: 'Immediate broadcast upon detecting bottom mud odor',
        indication: 'Neutralization of toxic H2S and organic gas'
      },
      {
        productName: 'Next Oxy Fresh',
        productSlug: 'next-oxy-fresh',
        dosage: '1.0 kg / acre',
        timing: 'Emergency night application during low DO events',
        indication: 'Rapid oxygen elevation and bottom sediment oxidation'
      }
    ],
    localFieldAdvisory: {
      teluguAdvisory: 'బాపట్ల, చీరాల ప్రాంతాల్లోని రొంపేరు కాల్వల పరిసరాల్లో భూమిలో ఆమ్ల గుణం (Acid Sulfate) ఎక్కువ. వర్షం పడిన వెంటనే చెరువు గట్లపై నుంచి ఆమ్లం దిగి నీటి pH పడిపోతుంది. తక్షణమే సున్నం వేసి, నెక్స్ట్ క్విక్ గ్యాస్ నిల్ వాడాలి.',
      englishSummary: 'Acid sulfate soils in Bapatla require aggressive dyke liming prior to rains to prevent catastrophic pH crashes and black gill necrosis.',
      seasonalChecklist: [
        'Maintain dyke lime barriers to prevent acidic stormwater runoff',
        'Check bottom water pH at sunrise and sunset daily',
        'Verify check tray cleanliness after each 3-hour feeding cycle'
      ]
    },
    contactHelpline: '+91 8977656444'
  },
  {
    slug: 'kakinada-east-godavari',
    name: 'Kakinada & East Godavari Hub',
    district: 'Kakinada / East Godavari',
    state: 'Andhra Pradesh',
    teluguName: 'కాకినాడ & తూర్పు గోదావరి ఆక్వా డెవలప్‌మెంట్',
    metaTitle: 'Kakinada Prawn Seed & Culture Medicine | East Godavari Aquaculture Clinic',
    metaDescription: 'Complete biosecurity protocol for Kakinada hatcheries and grow-out ponds. Treatment for Luminescent Vibriosis, fungal gill infections, and post-monsoon shocks.',
    keyGeography: ['Kakinada Rural', 'Amalapuram', 'Yanam fringe', 'Uppada', 'Coringa mangrove border'],
    averageSalinity: '10 – 30 ppt',
    salinityType: 'Brackish Water',
    primarySpecies: ['Litopenaeus vannamei', 'Specific Pathogen Free (SPF) Hatchery Broodstock'],
    stockingDensity: '60 – 90 PL/m²',
    primaryWaterSource: 'Godavari Gautami/Vasishta estuaries, Bay of Bengal creek intake',
    soilCharacteristics: 'Mangrove rich silt-clay with high organic tannin and humic content',
    pathologyRisks: [
      {
        disease: 'Fungal Gill Rot & Epibiont Fouling (Zoothamnium / Fusarium)',
        severity: 'Severe',
        trigger: 'High organic detritus from mangrove river runoff adhering to shrimp gills',
        clinicalSigns: 'Velvety cotton-like growth on carapaces, shrimp swim lethargically along dyke',
        preventativeProtocol: 'Targeted bio-control with Next F-Zone (1.0 L/acre) followed by water exchange'
      },
      {
        disease: 'Running Mortality Syndrome (RMS)',
        severity: 'Critical',
        trigger: 'Multiple environmental stressors during tidal creek fluctuations and temperature drop',
        clinicalSigns: 'Continuous daily mortality of 0.5-1% of biomass, pale hepatopancreas, hollow gut',
        preventativeProtocol: 'Synergistic application of Next Viro Nill and Next Gut in high-aeration ponds'
      }
    ],
    recommendedFormulations: [
      {
        productName: 'Next F-Zone',
        productSlug: 'next-f-zone',
        dosage: '1.0 L / acre',
        timing: 'Broadcast on sunny morning after initial water exchange',
        indication: 'Eradication of fungal spores and epibiont gill parasites'
      },
      {
        productName: 'Next Viro Nill',
        productSlug: 'next-viro-nill',
        dosage: '1.5 L / acre',
        timing: 'Early morning broad dispersal',
        indication: 'Viral and bacterial biosecurity shield'
      }
    ],
    localFieldAdvisory: {
      teluguAdvisory: 'కాకినాడ మరియు కోనసీమ ప్రాంతాల్లో మడ అడవుల (Mangrove) నల్ల మట్టి మరియు సేంద్రీయ వ్యర్థాల వలన ఫంగల్ గిల్ ఇన్ఫెక్షన్లు (నల్ల మొప్ప/బూజు) వచ్చే అవకాశం ఎక్కువ. నెక్స్ట్ ఎఫ్-జోన్ ఉపయోగించి మొప్పలను శుభ్రంగా ఉంచుకోవాలి.',
      englishSummary: 'East Godavari coastal belts frequently experience organic tannin fouling and fungal gill rot. Routine application of antifungal biologicals maintains clean respiratory function.',
      seasonalChecklist: [
        'Inspect shrimp carapaces under field microscope for Zoothamnium stalk parasites',
        'Monitor tidal incoming water for high suspended silt before pumping',
        'Maintain water transparency between 25 and 35 cm using secchi disc'
      ]
    },
    contactHelpline: '+91 8977656444'
  },
  {
    slug: 'guntur-nizampatnam',
    name: 'Guntur & Nizampatnam Marine Delta',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    teluguName: 'గుంటూరు & నిజాంపట్నం మెరైన్ ఆక్వా',
    metaTitle: 'Guntur Shrimp Farming Medicine & Probiotics | Nizampatnam & Repalle Hub',
    metaDescription: 'High-yield commercial shrimp aquaculture management for Guntur district and Nizampatnam harbor ponds. Clinical guidance for high FCR, EHP control, and bottom sludge.',
    keyGeography: ['Nizampatnam', 'Repalle', 'Bhattiprolu', 'Ponnur coastal line'],
    averageSalinity: '15 – 32 ppt',
    salinityType: 'Brackish Water',
    primarySpecies: ['Litopenaeus vannamei'],
    stockingDensity: '60 – 80 PL/m²',
    primaryWaterSource: 'Krishna estuarine tidal creeks, Nizampatnam harbor canal',
    soilCharacteristics: 'Fine marine clay with high nutrient retention capacity',
    pathologyRisks: [
      {
        disease: 'EHP Microsporidian Stunting & High FCR Collapse',
        severity: 'Critical',
        trigger: 'Contaminated nursery seed or unsterilized tidal creek water intake',
        clinicalSigns: 'Uneven growth size variation (size jumping), feed conversion ratio spikes > 1.7',
        preventativeProtocol: 'Intensive gut colonization with Next Converter and Next Gut top-dressing'
      }
    ],
    recommendedFormulations: [
      {
        productName: 'Next Converter',
        productSlug: 'next-converter',
        dosage: '15 ml / kg feed',
        timing: 'Mix with feed daily for continuous enzyme assimilation',
        indication: 'FCR optimization and nutrient absorption'
      },
      {
        productName: 'Next Gut',
        productSlug: 'next-gut',
        dosage: '15 ml / kg feed',
        timing: 'Morning feeding meal daily',
        indication: 'Immune stimulation and gut barrier strengthening'
      }
    ],
    localFieldAdvisory: {
      teluguAdvisory: 'నిజాంపట్నం మరియు గుంటూరు ప్రాంతాల్లో రొయ్యల్లో ఎదుగుదల లోపం (EHP Stunting) మరియు సైజు వ్యత్యాసం ప్రధాన నష్టాలకు కారణం. నాణ్యమైన ఎంజైమ్ ప్రొబయోటిక్ నెక్స్ట్ కన్వర్టర్ వాడటం ద్వారా FCR ను 1.3 కు తగ్గించవచ్చు.',
      englishSummary: 'Growth stunting and poor FCR in Nizampatnam ponds are best countered by daily high-potency digestive enzymes that outcompete intracellular microsporidians.',
      seasonalChecklist: [
        'Weekly ABW (Average Body Weight) sampling to track growth curves',
        'Avoid over-feeding during cloudy days with low sunlight',
        'Disinfect all check trays and sampling nets with potassium permanganate'
      ]
    },
    contactHelpline: '+91 8977656444'
  },
  {
    slug: 'surat-gujarat',
    name: 'Surat & South Gujarat Aquaculture Hub',
    district: 'Surat',
    state: 'Gujarat',
    teluguName: 'గుజరాత్ సూరత్ ఆక్వా సెంటర్',
    metaTitle: 'Surat Shrimp Farming Probiotics & Prawn Medicine | Olpad & Navsari Hub',
    metaDescription: 'Extreme high-salinity aquaculture management for Surat, Olpad, and South Gujarat. Treatment for osmotic stress, check tray feed refusal, and mineral crystallization.',
    keyGeography: ['Olpad', 'Dumas', 'Hajira', 'Navsari', 'Valsad coastal belt'],
    averageSalinity: '28 – 42 ppt',
    salinityType: 'Hypersaline Marine',
    primarySpecies: ['Litopenaeus vannamei'],
    stockingDensity: '50 – 70 PL/m²',
    primaryWaterSource: 'Gulf of Khambhat tidal creeks, Arabian Sea intake',
    soilCharacteristics: 'Saline black soil with heavy marine silt and low organic carbon',
    pathologyRisks: [
      {
        disease: 'Hypersaline Osmotic Shock & Check Tray Feed Refusal',
        severity: 'Severe',
        trigger: 'Summer evaporation drives pond salinity above 40 ppt, exhausting shrimp osmoregulation',
        clinicalSigns: 'Shrimp become brittle, feed consumption drops by half, opaque tail muscle',
        preventativeProtocol: 'Application of Next Speed Mineral and Next Converter to assist metabolic stabilization'
      }
    ],
    recommendedFormulations: [
      {
        productName: 'Next Speed Mineral',
        productSlug: 'next-speed-mineral',
        dosage: '10 kg / acre',
        timing: 'Weekly application during high evaporation cycles',
        indication: 'Osmotic regulation and shell plasticity'
      },
      {
        productName: 'Next Converter',
        productSlug: 'next-converter',
        dosage: '15 ml / kg feed',
        timing: 'Twice daily feed binding',
        indication: 'Appetite stimulation during extreme heat'
      }
    ],
    localFieldAdvisory: {
      teluguAdvisory: 'గుజరాత్ సూరత్ మరియు ఓల్పాడ్ ప్రాంతాల్లో వేసవిలో ఉప్పు శాతం (Salinity) 40 ppt దాటడం వల్ల రొయ్యలు ఫీడ్ తినడం మానేస్తాయి. మినరల్స్ ను సమతుల్యం చేసి, డైజెస్టివ్ ఎంజైమ్స్ అందించడం ద్వారా సర్వైవల్ రేటును పెంచవచ్చు.',
      englishSummary: 'South Gujarat hypersaline conditions demand aggressive mineral balancing to protect shrimp gills from osmotic collapse during dry summer heatwaves.',
      seasonalChecklist: [
        'Measure salinity with optical refractometer at both surface and bottom',
        'Add freshwater bore dilution when salinity exceeds 38 ppt',
        'Provide shade netting over nursery ponds during May-June'
      ]
    },
    contactHelpline: '+91 8977656444'
  },
  {
    slug: 'balasore-odisha',
    name: 'Balasore & Coastal Odisha Shrimp Zone',
    district: 'Balasore',
    state: 'Odisha',
    teluguName: 'బాలాసోర్ ఒడిశా రొయ్యల సాగు కేంద్రం',
    metaTitle: 'Balasore Prawn Medicine & Bio-Solutions | Dhamra & Coastal Odisha',
    metaDescription: 'Monsoon resilience and aquaculture disease management for Balasore, Bhadrak, and Dhamra ponds. Proven protocols for sudden salinity drops, turbidity, and White Gut.',
    keyGeography: ['Balasore', 'Bhadrak', 'Dhamra', 'Subarnarekha estuary', 'Chandipur'],
    averageSalinity: '8 – 22 ppt',
    salinityType: 'Estuarine Delta',
    primarySpecies: ['Litopenaeus vannamei', 'Black Tiger Shrimp'],
    stockingDensity: '40 – 65 PL/m²',
    primaryWaterSource: 'Subarnarekha river, Bay of Bengal tidal inlets',
    soilCharacteristics: 'Alluvial sandy-clay loam with seasonal flood silt accumulation',
    pathologyRisks: [
      {
        disease: 'Monsoon Flash Salinity Drop & Osmotic Molt Mortality',
        severity: 'Critical',
        trigger: 'Heavy tropical monsoon downpours drop salinity from 20 ppt to 4 ppt in 12 hours',
        clinicalSigns: 'Mass molting without adequate minerals, soft carapaces, 20-30% biomass mortality',
        preventativeProtocol: 'Pre-rain mineral broadcasting with Next Speed Mineral followed by Next Oxy Fresh'
      }
    ],
    recommendedFormulations: [
      {
        productName: 'Next Speed Mineral',
        productSlug: 'next-speed-mineral',
        dosage: '15 kg / acre',
        timing: 'Broadcast immediately before and after monsoon squalls',
        indication: 'Preventing soft-shell deaths during sudden salinity drop'
      },
      {
        productName: 'Next Gut',
        productSlug: 'next-gut',
        dosage: '15 ml / kg feed',
        timing: 'Daily during wet cloudy spells',
        indication: 'Maintaining gut microflora stability'
      }
    ],
    localFieldAdvisory: {
      teluguAdvisory: 'బాలాసోర్ మరియు ఒడిశా తీరంలో భారీ వర్షాలు పడినప్పుడు నీటి ఉప్పదనం అకస్మాత్తుగా పడిపోయి రొయ్యలు ఒకేసారి కుబుసం (Molt) విడుస్తాయి. ఆ సమయంలో నెక్స్ట్ స్పీడ్ మినరల్ అందించకపోతే రొయ్యలు మెత్తబడి చనిపోతాయి.',
      englishSummary: 'Sudden rain-induced salinity drops in Odisha trigger catastrophic synchronous molting. Immediate mineral hardening is non-negotiable to prevent mortality.',
      seasonalChecklist: [
        'Drain top freshwater layer using sluice gate surface skimmers after heavy rain',
        'Verify alkalinity immediately after thunderstorms',
        'Run aerators during rainfall to prevent water thermal stratification'
      ]
    },
    contactHelpline: '+91 8977656444'
  }
];
