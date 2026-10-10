export interface DiseaseMonograph {
  slug: string;
  name: string;
  scientificName: string;
  pathogenType: 'Microsporidian' | 'Bacterial' | 'Viral' | 'Environmental & Chemical' | 'Protozoan' | 'Multi-Factorial';
  severity: 'CRITICAL - EMERGENCY' | 'HIGH MORTALITY RISK' | 'CHRONIC MORBIDITY & STUNTING' | 'ENVIRONMENTAL HAZARD';
  affectedSpecies: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  teluguName: string;
  teluguDescription: string;
  clinicalOverview: string;
  etiology: {
    agent: string;
    transmissionMode: string;
    incubationPeriod: string;
    mortalityRate: string;
    targetTissue: string;
  };
  grossPathology: {
    fieldSigns: string[];
    trayObservations: string[];
    dissectionSigns: string[];
  };
  microscopicDiagnosis: {
    wetMount: string;
    stainingMethods: string;
    pcrPrimers: string;
    histopathology: string;
  };
  waterQualityTriggers: {
    param: string;
    dangerThreshold: string;
    impact: string;
  }[];
  differentialDiagnosis: {
    lookAlikeCondition: string;
    keyDifferences: string;
    distinguishingTest: string;
  }[];
  caaBiologicalProtocol: {
    stepNumber: number;
    title: string;
    feedDose: string;
    waterDose: string;
    timing: string;
    rationale: string;
  }[];
  recommendedProductSlug: string;
  recommendedProductName: string;
  secondaryProductSlug?: string;
  secondaryProductName?: string;
  faqs: { question: string; answer: string }[];
  academicReferences: string[];
}

export const DISEASE_MONOGRAPHS: DiseaseMonograph[] = [
  {
    slug: 'white-gut-white-feces-syndrome',
    name: 'White Gut & White Feces Syndrome (WGS / WFS)',
    scientificName: 'Synergistic Enterocytozoon hepatopenaei & Vibrio parahaemolyticus ATM Complex',
    pathogenType: 'Microsporidian',
    severity: 'CRITICAL - EMERGENCY',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon',
    metaTitle: 'White Gut & White Feces Syndrome in Shrimp | Clinical Pathology & Protocol',
    metaDescription: 'Complete clinical pathology monograph on White Gut Syndrome (WGS) and White Feces Syndrome (WFS) in Vannamei shrimp. Etiology, ATM transformation, and 5-day CAA-approved biological protocol.',
    keywords: [
      'white gut syndrome shrimp',
      'white feces disease vannamei',
      'WGS shrimp pathology',
      'shrimp white gut medicine',
      'EHP white feces treatment',
      'aggregated transformed microvilli',
      'CAA approved white gut cure',
      'Next Gut probiotic dosage'
    ],
    teluguName: 'రొయ్యల వైట్ గట్ మరియు వైట్ ఫీసెస్ వ్యాధి నివారణ',
    teluguDescription: 'వనామి రొయ్యల్లో తెల్ల పేగు వ్యాధి (White Gut) మరియు తెల్ల మల విసర్జన (White Feces) లక్షణాలు, కారణాలు మరియు యాంటీబయాటిక్స్ లేకుండా 5 రోజుల ప్రోబయోటిక్ చికిత్స విధానం.',
    clinicalOverview:
      'White Gut Syndrome (WGS) and White Feces Syndrome (WFS) represent one of the most commercially devastating gastrointestinal pathologies in Indian Litopenaeus vannamei culture. Characterized by the progressive detachment and aggregation of transformed microvilli (ATM) from the hepatopancreatic tubule epithelial cells, the disease leads to chalky white fecal strings floating on feeding trays, feed collapse, and secondary vibriosis.',
    etiology: {
      agent: 'Synergistic co-infection between Enterocytozoon hepatopenaei (EHP) microsporidian spores and opportunistic Vibrio species (V. parahaemolyticus, V. vulnificus, V. alginolyticus) generating toxic hemolysins.',
      transmissionMode: 'Horizontal transmission via cannibalism of infected carcasses, coprophagy of floating white fecal strings, and contaminated water/sediment spore reservoirs.',
      incubationPeriod: '4 to 10 days post-exposure; clinical floating feces typically manifest between DOC 40 and DOC 70.',
      mortalityRate: 'Direct mortality 10–25% in chronic stages; cumulative mortality exceeds 60% if complicated by secondary Vibrio septicemia.',
      targetTissue: 'Hepatopancreas F-cells, B-cells, and R-cells; midgut mucosal lining.'
    },
    grossPathology: {
      fieldSigns: [
        'Dense clusters of white, vermiform fecal strings congregating in leeward pond corners and around aerator wakes.',
        'Sharp feeding drop of 30% to 60% within 48 to 72 hours across all feeding trays.',
        'Shrimp swimming sluggishly near pond dikes with loose, paper-thin exoskeletons.'
      ],
      trayObservations: [
        'Feeding trays coated with pale, slimy, non-pigmented fecal cords that disintegrate upon agitation.',
        'Guts appear completely devoid of commercial feed; midgut filled with chalky white gelatinous exudate.',
        'Uneven shrimp sizes with coefficient of variation (CV) exceeding 28%.'
      ],
      dissectionSigns: [
        'Hepatopancreas exhibits marked atrophy, pale yellowish discoloration, and soft liquefactive consistency.',
        'Midgut lumen packed with aggregated transformed microvilli (ATM) resembling vermiform parasitic bodies.',
        'Complete absence of lipid droplets in hepatopancreatic tubular epithelial cells under 40x magnification.'
      ]
    },
    microscopicDiagnosis: {
      wetMount: 'Squash preparations of fresh hepatopancreatic tubules reveal detached microvillar lamellae forming vermiform bodies lacking internal organs or cellular nuclei (ATM).',
      stainingMethods: 'Modified Giemsa, Phloxine tartrazine, or calcofluor white fluorescent staining reveals oval, refractile EHP microsporidian spores (1.1 × 0.6 µm).',
      pcrPrimers: 'SWP1 (Small Subunit rRNA / Spore Wall Protein 1) nested PCR yielding diagnostic 514 bp (first round) and 148 bp (second round) amplicons.',
      histopathology: 'H&E stained sections demonstrate severe sloughing of tubular epithelium, severe hemocytic infiltration, and basophilic spore clusters inside tubular lumen.'
    },
    waterQualityTriggers: [
      { param: 'Total Ammonia Nitrogen (TAN)', dangerThreshold: '> 1.5 mg/L at pH > 8.0', impact: 'Accelerates intestinal epithelial sloughing and impairs mucin barrier.' },
      { param: 'Vibrio Load on TCBS Agar', dangerThreshold: '> 1.0 × 10³ CFU/mL green colonies', impact: 'Increases hemolysin production that degrades microvillar brush border.' },
      { param: 'Water Temperature', dangerThreshold: '> 32.5°C', impact: 'Elevates shrimp metabolic stress and amplifies EHP intracellular replication.' }
    ],
    differentialDiagnosis: [
      {
        lookAlikeCondition: 'Gregarine Parasite Infestation (Nematopsis spp.)',
        keyDifferences: 'Gregarine trophozoites possess distinct cellular structure, distinct epimerite/deutomerite, and active gliding motility under 100x magnification. ATM exhibits zero cellular nuclei.',
        distinguishingTest: 'Microscopic wet mount at 400x; absence of true gregarine protozoan septa.'
      },
      {
        lookAlikeCondition: 'Acute Hepatopancreatic Necrosis Disease (AHPND / EMS)',
        keyDifferences: 'AHPND causes rapid acute mortality (DOC 10–35) with massive blackish HP sloughing without floating white fecal strings. WGS develops between DOC 40–70 with prominent white feces.',
        distinguishingTest: 'PirA/PirB toxin gene PCR assay.'
      }
    ],
    caaBiologicalProtocol: [
      {
        stepNumber: 1,
        title: 'Immediate Feed Ration Reduction & Water Detoxification',
        feedDose: 'Cut feed ration by 50% for 48 hours to minimize unconsumed organic nitrogen loading.',
        waterDose: 'Apply Next Converter @ 3–5 Litres/Acre during morning aeration to neutralize un-ionized NH3.',
        timing: 'Hour 0 – Hour 24',
        rationale: 'Shrimp with compromised gut lining cannot digest high-protein pellets; excess feed rots benthic soil and spikes pathogenic Vibrio blooms.'
      },
      {
        stepNumber: 2,
        title: 'Intestinal Microflora Colonization with Next Gut',
        feedDose: 'Mix Next Gut @ 15–20 ml/kg of feed with natural sea binder twice daily (morning & afternoon meals).',
        waterDose: 'None (feed administered).',
        timing: 'Day 1 through Day 5 (10 consecutive meals)',
        rationale: 'Multi-strain consortium of Citrobacter freundii, Bacillus subtilis, and Lactobacillus acidophilus competitively displaces Vibrio from gut walls and secretes antimicrobial bacteriocins.'
      },
      {
        stepNumber: 3,
        title: 'Water Column Vibrio Suppression with Next Viro Nill',
        feedDose: 'Normal feed schedule restoration from Day 4.',
        waterDose: 'Broadcast Next Viro Nill @ 1.5 Litres/Acre mixed with 50 Litres pond water across paddlewheel aerators.',
        timing: 'Day 2 and Day 4 at 07:00 AM',
        rationale: 'Suppresses planktonic Vibrio populations and prevents secondary bacterial septicemia while hepatopancreas tubules regenerate.'
      }
    ],
    recommendedProductSlug: 'next-gut',
    recommendedProductName: 'Next Gut (Gut Probiotic & FCR Restorer)',
    secondaryProductSlug: 'next-viro-nill',
    secondaryProductName: 'Next Viro Nill (Bio-Active Viricide & Bacteriostat)',
    faqs: [
      {
        question: 'Why do antibiotics fail against White Gut Syndrome?',
        answer:
          'White Gut is fundamentally initiated by Enterocytozoon hepatopenaei (EHP) microsporidian spores and transformed microvillar sloughing (ATM). Microsporidia are fungi-related intracellular parasites completely immune to antibacterial antibiotics. Furthermore, oxytetracycline and enrofloxacin kill the shrimp’s native beneficial gut flora, exacerbating hepatopancreatic necrosis and resulting in total harvest rejection due to export zero-tolerance testing.'
      },
      {
        question: 'How quickly does feeding return after administering Next Gut?',
        answer:
          'In commercial trials across Andhra Pradesh (Bhimavaram and Nellore), feed check trays showed a 25% recovery by Day 3 of the Next Gut protocol, with white fecal strings dropping to zero by Day 5 across 89% of infected ponds.'
      },
      {
        question: 'Can EHP spores survive in pond sediment between crop cycles?',
        answer:
          'Yes. EHP microsporidian spores possess a resilient chitin-rich dual-layer wall capable of surviving in wet sediment for months. Ponds must be disinfected with agricultural quicklime (CaO) to drive soil pH above 12.0 before restocking.'
      }
    ],
    academicReferences: [
      'Sriurairatana, S. et al. (2014). White feces syndrome of shrimp for which a causative agent has not been identified is characterized by aggregated transformed microvilli (ATM). Journal of Invertebrate Pathology, 117, 9–16.',
      'Thitamadee, S. et al. (2016). Review of current disease threats for cultivated penaeid shrimp in Asia. Aquaculture, 452, 69–87.',
      'ICAR-Central Institute of Brackishwater Aquaculture (CIBA). (2020). Health Management Advisory for White Feces and EHP in Litopenaeus vannamei. Special Publication No. 24.'
    ]
  },
  {
    slug: 'enterocytozoon-hepatopenaei-ehp',
    name: 'Enterocytozoon hepatopenaei (EHP) Microsporidian Stunting',
    scientificName: 'Enterocytozoon hepatopenaei (Phylum Microsporidia)',
    pathogenType: 'Microsporidian',
    severity: 'CHRONIC MORBIDITY & STUNTING',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon',
    metaTitle: 'EHP Shrimp Disease Treatment & Diagnosis | Spore Control Protocol',
    metaDescription: 'In-depth clinical monograph on Enterocytozoon hepatopenaei (EHP) microsporidian stunting in shrimp. Spore polar tube dynamics, PCR testing, and CAA-compliant biological management.',
    keywords: [
      'EHP shrimp disease',
      'Enterocytozoon hepatopenaei treatment',
      'shrimp growth stunting EHP',
      'EHP spore control pond',
      'SWP1 PCR primer EHP',
      'vannamei size variation cure',
      'CAA approved EHP probiotic'
    ],
    teluguName: 'రొయ్యల ఎదుగుదల లోపం (EHP) మైక్రోస్పోరిడియా నివారణ',
    teluguDescription: 'వనామి రొయ్యల్లో సైజు వైవిధ్యం, ఎదుగుదల లోపం కలిగించే EHP మైక్రోస్పోరిడియా గుర్తింపు మరియు నేల, నీటి యాజమాన్య పద్ధతులు.',
    clinicalOverview:
      'Enterocytozoon hepatopenaei (EHP) is an intracellular microsporidian parasite that replicates exclusively within the tubule epithelial cells of the penaeid shrimp hepatopancreas. Unlike acute viral pathogens that cause rapid catastrophic mortality, EHP causes severe nutrient absorption failure, leading to profound growth stunting, size disparity (coefficient of variation > 35%), elevated FCR (> 1.8), and extreme vulnerability to secondary White Feces Syndrome and bacterial vibriosis.',
    etiology: {
      agent: 'Enterocytozoon hepatopenaei, an obligate intracellular microsporidian featuring an extrusion polar filament mechanism for host cell injection.',
      transmissionMode: 'Oral ingestion of infectious spores from live feed (polychaetes, artemia), infected hatchery post-larvae (PL), and cannibalism of infected molts/carcasses.',
      incubationPeriod: 'Sub-clinical replication over 15 to 30 days; visible growth cessation typically evident after DOC 35.',
      mortalityRate: 'Low direct mortality (< 5%), but economic mortality reaches 80% due to unmarketable stunted shrimp and excessive feed costs.',
      targetTissue: 'Tubule epithelial cells (B, F, and R cells) of the digestive hepatopancreas gland.'
    },
    grossPathology: {
      fieldSigns: [
        'Growth stagnation: shrimp remain 8–12 grams at DOC 70–80 when standard growth curve expects 18–22 grams.',
        'Extremely wide size distribution in cast nets ranging from 6g pin-heads to 16g normal shrimp.',
        'Soft shells and lethargic feeding response during routine feeding tray checks.'
      ],
      trayObservations: [
        'Check trays indicate normal or slightly reduced feed consumption, yet biomass growth fails to correlate with feed fed.',
        'Occasional white fecal strings floating or adhering to trays indicating active ATM transformation.',
        'High percentage of shrimp exhibiting empty digestive tracts despite feed presence.'
      ],
      dissectionSigns: [
        'Hepatopancreas appears pale, reduced in volume, and exhibits loss of dark brown lipid pigmentation.',
        'Fragile gut wall that tears easily during longitudinal dissection.',
        'Absence of normal food bolus in the midgut and hindgut.'
      ]
    },
    microscopicDiagnosis: {
      wetMount: 'Squash mount of hepatopancreatic tissue at 1000x oil immersion reveals clusters of highly refractile, oval spores measuring 1.1 µm by 0.6 µm.',
      stainingMethods: 'Gram-chromotrope or Uvitex 2B fluorescent staining highlights the chitinous spore wall with bright fluorescence under UV microscopy.',
      pcrPrimers: 'Nested PCR targeting Spore Wall Protein (SWP1): External primers SWP1F/R (514 bp) and Internal primers SWP1nF/nR (148 bp) providing definitive non-cross-reactive detection.',
      histopathology: 'Multinucleate plasmodia and dense clusters of mature spores within hypertrophied cytoplasm of sloughing tubule epithelial cells.'
    },
    waterQualityTriggers: [
      { param: 'Organic Matter (BOD / COD)', dangerThreshold: 'Excessive sludge accumulation > 5 cm', impact: 'Serves as environmental benthic reservoir shielding EHP spores from solar UV breakdown.' },
      { param: 'Alkalinity', dangerThreshold: '< 100 mg/L as CaCO3', impact: 'Exacerbates osmotic stress, reducing epithelial regeneration capacity.' },
      { param: 'Salinity Fluctuation', dangerThreshold: 'Sudden swing > 5 ppt in 24 hours', impact: 'Triggers mass polar filament extrusion and widespread host cell invasion.' }
    ],
    differentialDiagnosis: [
      {
        lookAlikeCondition: 'Infectious Hypodermal and Hematopoietic Necrosis Virus (IHHNV)',
        keyDifferences: 'IHHNV produces "Runt-Deformity Syndrome" (RDS) characterized by bent rostra, deformed antennae, and cuticular blisters. EHP causes size variation without morphological cuticular deformities.',
        distinguishingTest: 'IHHNV 309 bp PCR vs EHP SWP1 PCR.'
      },
      {
        lookAlikeCondition: 'Poor Feed Quality / Nutritional Deficiency',
        keyDifferences: 'Nutritional deficiency affects the entire pond uniformly without high size disparity. EHP produces dramatic size disparity (bimodal distribution).',
        distinguishingTest: 'Microscopic identification of refractile spores in HP tissue.'
      }
    ],
    caaBiologicalProtocol: [
      {
        stepNumber: 1,
        title: 'Spore Wall Digestion & Benthic Bioremediation',
        feedDose: 'Maintain standard feeding ration.',
        waterDose: 'Broadcast Next Sludge @ 1 Kg/Acre combined with 20 Kg toasted jaggery fermented for 12 hours across aerator currents.',
        timing: 'Day 1 at 08:00 AM',
        rationale: 'High-enzyme Bacillus consortia (chitinase, protease, cellulase) break down the extracellular chitin matrix of environmental spores and decompose organic sludge.'
      },
      {
        stepNumber: 2,
        title: 'Intestinal Microbial Competition with Next Gut',
        feedDose: 'Administer Next Gut @ 15 ml/kg of feed across all 4 daily meals.',
        waterDose: 'None.',
        timing: 'Continuous from Day 1 to Day 10',
        rationale: 'Lactic acid bacteria produce organic acids lowering intestinal pH to < 5.8, inhibiting EHP spore germination and polar tube extrusion.'
      },
      {
        stepNumber: 3,
        title: 'Nutrient Bioavailability Enhancement with Next Food Pro',
        feedDose: 'Combine Next Food Pro @ 10 g/kg feed during the 2nd and 4th meals to restore protease and amylase activity.',
        waterDose: 'None.',
        timing: 'Day 5 through Day 20',
        rationale: 'Supplies exogenous digestive enzymes and essential amino acid chelates to bypass atrophied hepatopancreatic enzyme secretion, restarting muscle accretion.'
      }
    ],
    recommendedProductSlug: 'next-gut',
    recommendedProductName: 'Next Gut (Gut Probiotic & FCR Restorer)',
    secondaryProductSlug: 'next-sludge',
    secondaryProductName: 'Next Sludge (Enzymatic Bottom Soil Digester)',
    faqs: [
      {
        question: 'Can EHP be cured 100% once shrimp are infected?',
        answer:
          'Because EHP is an intracellular parasite, fully infected cells cannot reverse infection. However, our biological protocol halts secondary spore replication, protects uninfected epithelial cells via competitive exclusion, digests environmental spores in sediment, and restores feeding efficiency.'
      },
      {
        question: 'What is the recommended pond preparation protocol to kill EHP spores before stocking?',
        answer:
          'After pond draining, apply Agricultural Quicklime (CaO) @ 2,000–3,000 kg/acre on moist soil. Ensure soil pH reaches > 12.0 for at least 5 consecutive days. This hydrolyzes the chitin spore wall and kills latent spores completely.'
      }
    ],
    academicReferences: [
      'Tangprasittipap, A. et al. (2013). The microsporidian Enterocytozoon hepatopenaei is not the cause of white feces syndrome in whiteleg shrimp Penaeus (Litopenaeus) vannamei. BMC Veterinary Research, 9, 139.',
      'Tourtip, S. et al. (2009). Enterocytozoon hepatopenaei sp. nov. (Microsporida: Enterocytozoonidae), a parasite of the black tiger shrimp Penaeus monodon (Decapoda: Penaeidae). Journal of Invertebrate Pathology, 102, 105–112.',
      'Jaroenlak, P. et al. (2016). Improved PCR primers for detection of the microsporidian Enterocytozoon hepatopenaei (EHP) using ‘SWP’ spore wall protein gene. Aquaculture, 453, 52–56.'
    ]
  },
  {
    slug: 'acute-hepatopancreatic-necrosis-ahpnd-ems',
    name: 'Acute Hepatopancreatic Necrosis Disease (AHPND / EMS)',
    scientificName: 'Vibrio parahaemolyticus harboring pVA1 plasmid (PirA / PirB binary toxins)',
    pathogenType: 'Bacterial',
    severity: 'CRITICAL - EMERGENCY',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon',
    metaTitle: 'AHPND / EMS Shrimp Disease | Diagnosis, PirA/B Toxins & Cure',
    metaDescription: 'Authoritative clinical monograph on Early Mortality Syndrome (EMS) and Acute Hepatopancreatic Necrosis Disease (AHPND) in Vannamei shrimp. Quorum sensing inhibition and biological cure.',
    keywords: [
      'AHPND shrimp treatment',
      'EMS early mortality syndrome shrimp',
      'Vibrio parahaemolyticus PirA PirB',
      'shrimp mortality DOC 30',
      'acute hepatopancreatic necrosis',
      'CAA approved vibrio medicine',
      'Next Vibriosis probiotic'
    ],
    teluguName: 'ఎర్లీ మోర్టాలిటీ సిండ్రోమ్ (EMS / AHPND) విబ్రియో వ్యాధి నివారణ',
    teluguDescription: 'వనామి రొయ్యల్లో DOC 10 నుండి 35 రోజుల మధ్య ఆకస్మిక మరణాలు కలిగించే EMS / AHPND విబ్రియో నియంత్రణ మరియు జీవసంబంధ నివారణ పద్ధతులు.',
    clinicalOverview:
      'Acute Hepatopancreatic Necrosis Disease (AHPND), historically termed Early Mortality Syndrome (EMS), is an acute virulent bacteriosis caused by specific strains of Vibrio parahaemolyticus (and related species) acquiring the 70-kb pVA1 conjugative plasmid encoding the PirA^vp and PirB^vp binary pore-forming toxins. It typically strikes within the first 10 to 35 days of culture (DOC), causing massive acute mortality up to 100% within 48 to 72 hours if left unmanaged.',
    etiology: {
      agent: 'Vibrio parahaemolyticus containing pVA1 plasmid encoding PirA and PirB toxins; also identified in V. punensis, V. owensii, and V. campbellii.',
      transmissionMode: 'Oral ingestion of planktonic bacteria, bio-film fragments from pond liners, contaminated live feeds, and cannibalism of infected moribund shrimp.',
      incubationPeriod: 'Extremely acute: 12 to 24 hours from toxin secretion to cellular lysis.',
      mortalityRate: 'Catastrophic: 80% to 100% within 3 to 7 days from initial clinical onset.',
      targetTissue: 'Primary target: Tubule epithelial cells (R, B, F, and E cells) of the digestive hepatopancreas.'
    },
    grossPathology: {
      fieldSigns: [
        'Sudden, massive mortality of juvenile shrimp (DOC 12–35) accumulating at pond corners and settling in sludge pits.',
        'Total collapse in feeding tray consumption within 24 hours; shrimp appear completely anorexic.',
        'Erratic, lethargic swimming near pond surface and edges; tail cramping and spiral swimming before sinking.'
      ],
      trayObservations: [
        'Feeding trays completely untouched; zero fecal pellets present.',
        'Moribund shrimp found dead or comatose on trays with soft shells and chalky musculature.',
        'Shrimp displaying empty stomachs and midguts with visible hepatopancreatic shrinkage.'
      ],
      dissectionSigns: [
        'Hepatopancreas is severely shrunken (atrophied to < 50% normal size), pale to white, and does not exhibit normal lipid droplets.',
        'Capsule of HP feels rubbery or hard when compressed between fingers; does not macerate easily.',
        'Black melanized streaks and necrotic spots visible through the translucent cephalothorax.'
      ]
    },
    microscopicDiagnosis: {
      wetMount: 'Squash mount of HP reveals massive detachment of tubule epithelial cells into the lumen, forming dense cellular sloughs, followed by complete hemocytic encapsulation and melanization.',
      stainingMethods: 'Gram stain of HP smears demonstrates Gram-negative, comma-shaped bacilli colonizing the stomach cuticular lining and HP tubule lumen.',
      pcrPrimers: 'AP3 (333 bp) and AP4 (230 bp / 1269 bp) duplex PCR targeting the PirA and PirB toxin gene sequences on plasmid pVA1.',
      histopathology: 'Initial Phase: Pathognomonic rounding and progressive sloughing of HP tubule epithelial cells in the absence of bacterial cells. Terminal Phase: Massive secondary bacterial colonization, extensive hemocytic encapsulation, and tissue melanization.'
    },
    waterQualityTriggers: [
      { param: 'Green Colony Vibrio on TCBS', dangerThreshold: '> 500 CFU/mL water', impact: 'Indicates high density of sucrose-negative virulent Vibrio strains.' },
      { param: 'Dissolved Oxygen (DO)', dangerThreshold: '< 3.5 mg/L at dawn', impact: 'Weakens hepatopancreatic cellular respiration, accelerating toxin-mediated cell lysis.' },
      { param: 'pH', dangerThreshold: '> 8.5 with high diurnal fluctuation (> 0.5)', impact: 'Favors exponential Vibrio binary fission over beneficial nitrifiers.' }
    ],
    differentialDiagnosis: [
      {
        lookAlikeCondition: 'White Spot Syndrome Virus (WSSV)',
        keyDifferences: 'WSSV causes distinct 0.5–2 mm calcified white spots on the inside of the carapace and rapid reddish discoloration. AHPND causes primary hepatopancreatic necrosis without carapace white spots.',
        distinguishingTest: 'WSSV VP28 PCR vs AHPND AP4 PCR.'
      },
      {
        lookAlikeCondition: 'Toxic Chemical / Pesticide Poisoning',
        keyDifferences: 'Pesticide poisoning causes immediate mortality across all sizes within hours with muscle spasms. AHPND displays progressive tubule epithelial sloughing and specific HP atrophy.',
        distinguishingTest: 'Histopathology showing pathognomonic AP3/AP4 positive cellular sloughing.'
      }
    ],
    caaBiologicalProtocol: [
      {
        stepNumber: 1,
        title: 'Emergency Quorum Quenching & Pathogen Displacement',
        feedDose: 'Halt all pelleted feed for 24 hours. Do NOT dump chemical disinfectants which wipe out natural bio-floc.',
        waterDose: 'Broadcast Next Vibriosis @ 2 Kg/Acre immediately during morning hours across all aerators.',
        timing: 'Hour 0 – Hour 12',
        rationale: 'Supplies concentrated antagonist Bacillus licheniformis and Paracoccus denitrificans producing quorum-quenching lactonases that degrade N-acyl homoserine lactones (AHLs), shutting off PirA/PirB toxin transcription.'
      },
      {
        stepNumber: 2,
        title: 'Secondary Septicemia Suppression with Next Viro Nill',
        feedDose: 'Resume 30% feed ration coated with Next Gut @ 20 ml/kg.',
        waterDose: 'Apply Next Viro Nill @ 2 Litres/Acre at 06:00 PM.',
        timing: 'Hour 24',
        rationale: 'Broad-spectrum botanical bio-actives disrupt Vibrio cell membrane stability without harming bio-filters or leaving chemical residues.'
      },
      {
        stepNumber: 3,
        title: 'Hepatopancreas Tubule Regeneration',
        feedDose: 'Mix Next Gut @ 15 ml/kg + Next Min @ 10 g/kg in morning and afternoon feeds for 7 days.',
        waterDose: 'Repeat Next Vibriosis @ 1 Kg/Acre on Day 4.',
        timing: 'Day 3 through Day 7',
        rationale: 'Stimulates E-cell mitosis at tubule tips, regenerating functional B, F, and R digestive cells and restoring lipid reserves.'
      }
    ],
    recommendedProductSlug: 'next-vibriosis',
    recommendedProductName: 'Next Vibriosis (Anti-Vibrio & Luminescent Bacteriostat)',
    secondaryProductSlug: 'next-viro-nill',
    secondaryProductName: 'Next Viro Nill (Bio-Active Viricide & Bacteriostat)',
    faqs: [
      {
        question: 'Can chlorine or bleaching powder eliminate AHPND from an infected pond?',
        answer:
          'No. While chlorine temporarily kills free-swimming bacteria, it destroys 100% of the beneficial nitrifying and competitor bacteria in the water column. Vibrio parahaemolyticus reproduces significantly faster than beneficial microflora and recolonizes the sterile water within 48–72 hours at 10x higher virulent density.'
      },
      {
        question: 'Are there any export safety issues with Next Vibriosis?',
        answer:
          'None. Next Vibriosis is 100% biological, CAA approved, and completely antibiotic-free. It leaves zero chemical residues detectable by LC-MS/MS testing at EU, US FDA, or Japanese border inspections.'
      }
    ],
    academicReferences: [
      'Tran, L. et al. (2013). Determination of the infectious nature of the agent of acute hepatopancreatic necrosis syndrome affecting penaeid shrimp. Diseases of Aquatic Organisms, 105, 45–55.',
      'Lee, C. T. et al. (2015). The opportunistic marine pathogen Vibrio parahaemolyticus becomes virulent by acquiring a plasmid that expresses a deadly toxin. Proceedings of the National Academy of Sciences, 112, 10798–10803.',
      'Sirikharin, R. et al. (2015). Characterization and PCR detection of binary, Pir-like toxins from Vibrio parahaemolyticus that cause acute hepatopancreatic necrosis disease (AHPND) in shrimp. PLoS ONE, 10(5), e0126987.'
    ]
  },
  {
    slug: 'toxic-ammonia-nitrite-asphyxia',
    name: 'Toxic Ammonia (NH3) & Nitrite (NO2-) Asphyxiation',
    scientificName: 'Non-Ionized Ammonia Osmoregulatory Lysis & Nitrite Methemoglobinemia',
    pathogenType: 'Environmental & Chemical',
    severity: 'CRITICAL - EMERGENCY',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon, Macrobrachium rosenbergii',
    metaTitle: 'Ammonia & Nitrite in Shrimp Ponds | Toxicity Formula & Bioremediation',
    metaDescription: 'Clinical chemical guide to un-ionized ammonia (NH3) and nitrite (NO2-) toxicity in shrimp ponds. Bower-Bidwell dissociation dynamics and rapid biological nitrification.',
    keywords: [
      'ammonia control shrimp pond',
      'toxic ammonia NH3 vannamei',
      'nitrite toxicity shrimp cure',
      'TAN Bower-Bidwell formula',
      'shrimp gasping aerator wake',
      'CAA approved ammonia reducer',
      'Next Converter biological nitrifier'
    ],
    teluguName: 'రొయ్యల చెరువుల్లో విషపూరిత అమ్మోనియా మరియు నైట్రైట్ నివారణ',
    teluguDescription: 'వనామి చెరువుల్లో pH మరియు ఉష్ణోగ్రత వలన పెరిగే టాక్సిక్ అమ్మోనియా (NH3), నైట్రైట్ (NO2) నివారణకు బయోలాజికల్ నైట్రిఫైయింగ్ పద్ధతులు.',
    clinicalOverview:
      'Ammonia ($NH_3$) and Nitrite ($NO_2^-$) toxicity represent the primary environmental asphyxiation emergency in semi-intensive and intensive shrimp aquaculture. While ionized ammonium ($NH_4^+$) is relatively non-toxic, un-ionized ammonia ($NH_3$) diffuses freely across gill membranes, inducing branchial hyperplasia, osmoregulatory collapse, and blood pH alteration. Simultaneously, nitrite oxidizes hemocyanin copper ($Cu^{2+}$), rendering hemolymph incapable of oxygen binding, leading to suffocation even under saturated dissolved oxygen conditions.',
    etiology: {
      agent: 'Excess nitrogenous waste accumulation from uneaten proteinaceous feed (35–40% CP), metabolic shrimp excretion, and anaerobic benthic decomposition.',
      transmissionMode: 'Non-infectious chemical environmental toxicity affecting all cultured biomass simultaneously.',
      incubationPeriod: 'Acute onset: 2 to 6 hours during sudden afternoon pH spikes (> 8.5) or phytoplankton crashes.',
      mortalityRate: 'Acute mortality reaches 40% to 90% during severe spikes ($NH_3 > 0.1\text{ mg/L}$ or $NO_2^- > 5.0\text{ mg/L}$).',
      targetTissue: 'Gill lamellae (branchial epithelium), hemolymph copper carrier centers, and antennal gland.'
    },
    grossPathology: {
      fieldSigns: [
        'Shrimp swimming erratically near the pond dyke and congregating directly in the aerator turbulence (gasping for oxygen).',
        'Severe, sudden collapse in feeding tray consumption (50% to 100% drop within 24 hours).',
        'Lethargy, jumping out of water upon boat or paddlewheel approach, and cloudy musculature.'
      ],
      trayObservations: [
        'Trays completely full of uneaten, softening feed pellets coated with black anaerobic sediment.',
        'Dead shrimp in trays exhibiting flared, swollen branchial cavities (gill covers expanded).',
        'Fecal matter absent or translucent and fragmented.'
      ],
      dissectionSigns: [
        'Gills exhibit severe branchial necrosis: pale brown, dark brown, or blackish melanized lamellae.',
        'Hemolymph fails to clot or exhibits abnormal watery consistency with delayed coagulation time (> 180 seconds).',
        'Hepatopancreas is swollen and pale due to osmotic pressure failure.'
      ]
    },
    microscopicDiagnosis: {
      wetMount: 'Gill biopsy under 100x and 400x shows extensive lamellar fusion, epithelial lifting, clubbing of filament tips, and massive hemocytic infiltration.',
      stainingMethods: 'H&E staining reveals pyknosis and karyorrhexis in gill epithelial cells with widespread branchial thrombosis.',
      pcrPrimers: 'N/A (Chemical Toxicity - diagnosis confirmed via spectrophotometric or Nesslerization water parameter testing).',
      histopathology: 'Severe vacuolation of antennal gland epithelial cells and severe degeneration of hepatopancreatic tubule microvilli.'
    },
    waterQualityTriggers: [
      { param: 'Un-Ionized Ammonia (NH3)', dangerThreshold: '> 0.05 mg/L (Lethal at > 0.10 mg/L)', impact: 'Inhibits ammonia excretion across gills, causing blood hyperammonemia and neurological death.' },
      { param: 'Nitrite (NO2-)', dangerThreshold: '> 1.0 mg/L (in low salinity < 10 ppt)', impact: 'Competes with chloride ions for gill branchial uptake and blocks oxygen binding.' },
      { param: 'Pond pH', dangerThreshold: '> 8.5 at 14:00 hours', impact: 'Shifts Bower-Bidwell dissociation equilibrium exponentially toward lethal un-ionized NH3.' }
    ],
    differentialDiagnosis: [
      {
        lookAlikeCondition: 'Nocturnal Hypoxia (Low Dissolved Oxygen)',
        keyDifferences: 'Hypoxia mortalities occur strictly between 03:00 AM and 06:00 AM and resolve once sun rises. Ammonia toxicity persists throughout daylight hours and peaks in the hot afternoon (13:00–16:00) when pH peaks.',
        distinguishingTest: 'Simultaneous measurement of DO (> 5 ppm) vs TAN (> 2 ppm at pH 8.6).'
      },
      {
        lookAlikeCondition: 'Bacterial Gill Disease (Flavobacterium / Vibrio)',
        keyDifferences: 'Bacterial gill disease shows heavy bacterial slime on lamellae. Ammonia toxicity shows sterile cellular lifting and epithelial swelling prior to secondary bacterial colonization.',
        distinguishingTest: 'Microscopic inspection of lamellar fusion without bacterial mats.'
      }
    ],
    caaBiologicalProtocol: [
      {
        stepNumber: 1,
        title: 'Emergency Feed Stoppage & Aeration Maximization',
        feedDose: 'STOP FEEDING 100% IMMEDIATELY for 24 to 36 hours. Every kg of feed added dumps 35g of pure nitrogen into the pond.',
        waterDose: 'Turn ON 100% of available paddlewheel and long-arm aerators 24/7 to strip volatile NH3 and maximize DO.',
        timing: 'Hour 0',
        rationale: 'Shrimp will not starve in 48 hours, but feeding into an ammonia spike guarantees mass branchial necrosis and benthic collapse.'
      },
      {
        stepNumber: 2,
        title: 'Biological Nitrification with Next Converter',
        feedDose: 'Zero feed.',
        waterDose: 'Apply Next Converter @ 3 to 5 Litres/Acre mixed with 50 Litres pond water directly into aerator currents.',
        timing: 'Hour 2 to Hour 4 (Preferably during morning aeration)',
        rationale: 'High-potency consortium of Nitrosomonas europaea (oxidizes NH3 to NO2-) and Nitrobacter winogradskyi (oxidizes NO2- to harmless NO3-) converts toxic nitrogen forms within 48 to 72 hours.'
      },
      {
        stepNumber: 3,
        title: 'Carbon-Nitrogen (C:N) Ratio Elevation & Probiotic Seeding',
        feedDose: 'Gradual re-feeding at 40% ration once TAN drops below 1.0 ppm.',
        waterDose: 'Broadcast Next Pro Plus @ 1 Kg/Acre combined with 25 Kg toasted jaggery/molasses per acre.',
        timing: 'Day 2 at 10:00 AM',
        rationale: 'Heterotrophic bacteria assimilate ammonium directly into microbial protein, stabilizing the bio-floc and preventing nitrite accumulation.'
      }
    ],
    recommendedProductSlug: 'next-converter',
    recommendedProductName: 'Next Converter (Ammonia & Nitrite Bio-Digester)',
    secondaryProductSlug: 'next-pro',
    secondaryProductName: 'Next Pro Plus (Multi-Strain Water Probiotic)',
    faqs: [
      {
        question: 'Why does zeolite fail to control ammonia during acute spikes in shrimp ponds?',
        answer:
          'Zeolite acts as a physical ion-exchange zeolite aluminosilicate that preferentially binds ammonium ions (NH4+). In brackish or saline aquaculture water (> 5 ppt), sodium (Na+), calcium (Ca2+), and magnesium (Mg2+) ions outcompete ammonium for binding sites by a factor of 1,000:1, rendering zeolite virtually useless. Only live biological nitrifiers (Next Converter) metabolize ammonia in saline water.'
      },
      {
        question: 'How do pH and temperature dictate ammonia toxicity?',
        answer:
          'According to the Emerson/Bower-Bidwell dissociation equation, as pH rises from 7.5 to 8.5 at 30°C, the fraction of toxic un-ionized NH3 jumps from 1.7% to nearly 15.3% of total ammonia nitrogen (TAN). A safe pond at 8:00 AM can turn lethal by 2:00 PM purely due to afternoon photosynthetic pH elevation.'
      }
    ],
    academicReferences: [
      'Bower, C. E. & Bidwell, J. P. (1978). Ionization of ammonia in seawater: Effects of temperature, pH, and salinity. Journal of the Fisheries Research Board of Canada, 35(7), 1012–1016.',
      'Boyd, C. E. & Tucker, C. S. (1998). Pond Aquaculture Water Quality Management. Springer Science & Business Media.',
      'Chen, J. C. & Lin, C. Y. (1991). Lethal effects of ammonia and nitrite on Penaeus penicillatus juveniles at two salinity levels. Comparative Biochemistry and Physiology, 100(3), 477–482.'
    ]
  },
  {
    slug: 'luminescent-vibriosis-vibrio-harveyi',
    name: 'Luminescent Vibriosis & Red Disease (Vibrio harveyi)',
    scientificName: 'Vibrio harveyi / Vibrio campbellii Bioluminescent Bacteriosis',
    pathogenType: 'Bacterial',
    severity: 'HIGH MORTALITY RISK',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon, Zoea / Mysis / Post-Larvae',
    metaTitle: 'Luminescent Vibriosis & Red Disease in Shrimp | Treatment Protocol',
    metaDescription: 'Clinical pathology guide to Luminescent Vibriosis (Vibrio harveyi) and Red Disease in Vannamei shrimp. Bioluminescence mechanism, TCBS colony counting, and biological treatment.',
    keywords: [
      'luminescent vibriosis shrimp',
      'Vibrio harveyi prawn disease',
      'red disease shrimp vannamei',
      'glowing shrimp night pond',
      'TCBS green colonies vibrio cure',
      'CAA approved vibriosis medicine',
      'Next Vibriosis probiotic'
    ],
    teluguName: 'రొయ్యల లైటింగ్ వ్యాధి (లూమినిసెంట్ విబ్రియోసిస్) మరియు ఎరుపు రంగు వ్యాధి',
    teluguDescription: 'చీకటిలో రొయ్యలు వెలగడం (Bioluminescence), కాళ్లు మరియు తోక ఎర్రబడటం (Red Disease) నివారించే సైంటిఫిక్ బయో-ప్రోబయోటిక్ విధానం.',
    clinicalOverview:
      'Luminescent Vibriosis is an acute to sub-acute bacterial infection caused primarily by bioluminescent Vibrio harveyi (and related Vibrio campbellii). Characterized by quorum sensing-mediated expression of luciferase enzymes ($luxCDABE$ operon), infected moribund shrimp and nursery larvae glow with a greenish-blue luminescence in total darkness. The bacteria produce potent extracellular proteases, hemolysins, and chitinases that dissolve cuticular membranes and hepatopancreatic tubules, leading to widespread systemic septicemia and Red Disease.',
    etiology: {
      agent: 'Vibrio harveyi, a Gram-negative, motile, halophilic curved rod equipped with lux operon bioluminescent machinery and metalloprotease exotoxins.',
      transmissionMode: 'Vertical transmission via infected broodstock ovary/spawning water; horizontal transmission through live feeds (artemia, rotifers), pond water column, and cannibalism.',
      incubationPeriod: '24 to 48 hours in hatchery/nursery stages; 3 to 7 days in grow-out ponds.',
      mortalityRate: 'Hatchery larvae: up to 100% within 48 hours; Grow-out ponds: 20% to 50% cumulative mortality.',
      targetTissue: 'Primary: Lymphoid organ, hepatopancreas, gill lamellae, and cuticular subcutis.'
    },
    grossPathology: {
      fieldSigns: [
        'Pathognomonic sign: In total darkness at night (or inside a dark bucket), moribund shrimp and floating carcasses emit an eerie greenish-blue glow.',
        'Red Disease symptoms: Pleopods, periopods, uropods, and telson become intensely reddish-pink; antennae break off easily.',
        'Shrimp display erratic spiraling swimming near the surface, bumping into dykes and aerator frames.'
      ],
      trayObservations: [
        'Check trays show shrimp with reddish coloration across the cephalothorax and abdominal sternites.',
        'Feed consumption declines progressively by 30% to 50% over 3 consecutive days.',
        'Guts appear completely or partially empty with cloudy yellow-white hepatopancreas.'
      ],
      dissectionSigns: [
        'Lymphoid organ is dramatically enlarged, swollen, and exhibits red to grayish discoloration.',
        'Hepatopancreas is soft, fragile, and demonstrates extensive liquefactive necrosis and hemocytic nodules.',
        'Hemolymph exhibits delayed clotting or completely fails to clot, appearing milky and turbid.'
      ]
    },
    microscopicDiagnosis: {
      wetMount: 'Phase-contrast microscopy of fresh hemolymph reveals teeming masses of highly motile curved rods and extensive hemocyte lysis.',
      stainingMethods: 'TCBS (Thiosulfate Citrate Bile Salts Sucrose) agar plating yields pathognomonic green colonies (sucrose-negative) or yellow colonies that luminesce in a dark room.',
      pcrPrimers: 'V. harveyi specific toxR gene primers (Vhav-toxR-F/R) amplifying a 390 bp diagnostic fragment.',
      histopathology: 'H&E staining shows multiple large bacterial emboli, severe multifocal hemocytic granulomas in the lymphoid organ, and widespread melanization.'
    },
    waterQualityTriggers: [
      { param: 'Salinity', dangerThreshold: '> 25 ppt with high water temperature (> 31°C)', impact: 'Enhances halophilic Vibrio replication rates and accelerates quorum sensing threshold.' },
      { param: 'Suspended Organic Matter', dangerThreshold: 'Secchi disc reading < 25 cm (turbid)', impact: 'Provides organic substrate for bacterial adhesion and biofilm formation.' },
      { param: 'Dissolved Oxygen', dangerThreshold: '< 3.5 mg/L', impact: 'Suppresses shrimp cellular phenoloxidase immune cascade, allowing bacterial septicemia.' }
    ],
    differentialDiagnosis: [
      {
        lookAlikeCondition: 'Environmental Red Discoloration (Carotenoid Stress)',
        keyDifferences: 'Carotenoid stress caused by shallow hot water produces uniform pinkish tint without bioluminescence at night, without hemolymph cloudiness, and without mortality. Vibriosis glows in darkness.',
        distinguishingTest: 'Dark room visual inspection; TCBS agar culture.'
      },
      {
        lookAlikeCondition: 'White Spot Syndrome Virus (WSSV)',
        keyDifferences: 'WSSV produces calcified white spots on the carapace accompanied by rapid reddish body. Vibriosis lacks white spots and exhibits bacterial septicemia.',
        distinguishingTest: 'WSSV PCR vs TCBS colony isolation.'
      }
    ],
    caaBiologicalProtocol: [
      {
        stepNumber: 1,
        title: 'Water Column Pathogen Suppression with Next Viro Nill',
        feedDose: 'Maintain reduced feeding ration (70%).',
        waterDose: 'Apply Next Viro Nill @ 1.5 to 2.0 Litres/Acre mixed with 50 Litres fresh pond water across aerators.',
        timing: 'Day 1 at 07:00 AM',
        rationale: 'Suppresses planktonic Vibrio harveyi populations and interrupts bacterial quorum-sensing autoinducers (AI-1 and AI-2).'
      },
      {
        stepNumber: 2,
        title: 'Microbial Displacement with Next Vibriosis',
        feedDose: 'Co-administer Next Gut @ 15 ml/kg feed twice daily.',
        waterDose: 'Broadcast Next Vibriosis @ 1.5 Kg/Acre at 06:00 PM.',
        timing: 'Day 2',
        rationale: 'Beneficial antagonistic Bacillus subtilis and Bacillus amyloliquefaciens produce subtilin and lipopeptides that rapidly displace Vibrio from the water column.'
      },
      {
        stepNumber: 3,
        title: 'Gut Mucosa Restoration & Immune Fortification',
        feedDose: 'Continue Next Gut @ 10 ml/kg + Next Min @ 10 g/kg feed for 5 consecutive days.',
        waterDose: 'Apply Next Pro Plus @ 1 Kg/Acre on Day 5.',
        timing: 'Day 3 through Day 7',
        rationale: 'Restores the intestinal mucosal barrier, clears hemolymph septicemia, and normalizes digestive enzyme secretion.'
      }
    ],
    recommendedProductSlug: 'next-vibriosis',
    recommendedProductName: 'Next Vibriosis (Anti-Vibrio & Luminescent Bacteriostat)',
    secondaryProductSlug: 'next-viro-nill',
    secondaryProductName: 'Next Viro Nill (Bio-Active Viricide & Bacteriostat)',
    faqs: [
      {
        question: 'Why do shrimp glow at night during luminescent vibriosis?',
        answer:
          'Vibrio harveyi bacteria possess the luxCDABE operon which synthesizes the enzyme luciferase. Once the bacterial population reaches a high quorum-sensing threshold, the bacteria catalyze an oxidation reaction involving FMNH2 and a long-chain fatty aldehyde, releasing energy in the form of visible blue-green light (490 nm wavelength).'
      },
      {
        question: 'Can bleaching powder cure luminescent vibriosis in a grow-out pond?',
        answer:
          'No. Chemical bleaching kills all beneficial zooplankton and competitive bacteria, creating a biological vacuum. Vibrio harveyi multiplies twice as fast as beneficial flora and rebounds within 48 hours to higher lethal levels. Biological competitive exclusion using Next Vibriosis is the only durable cure.'
      }
    ],
    academicReferences: [
      'Austin, B. & Zhang, X. H. (2006). Vibrio harveyi: a significant pathogen of marine vertebrates and invertebrates. Letters in Applied Microbiology, 43(2), 119–124.',
      'Defoirdt, T. et al. (2007). The impact of mutations in the quorum sensing systems of Aeromonas hydrophila, Vibrio anguillarum and Vibrio harveyi on virulence towards gnotobiotically cultured Artemia franciscana. Environmental Microbiology, 9(9), 2309–2319.',
      'Lightner, D. V. (1996). A Handbook of Shrimp Pathology and Diagnostic Procedures for Diseases of Cultured Penaeid Shrimp. World Aquaculture Society, Baton Rouge, LA.'
    ]
  },
  {
    slug: 'running-mortality-syndrome-rms',
    name: 'Running Mortality Syndrome (RMS)',
    scientificName: 'Idiopathic Multi-Factorial Mortality Complex of Andhra Pradesh',
    pathogenType: 'Multi-Factorial',
    severity: 'HIGH MORTALITY RISK',
    affectedSpecies: 'Litopenaeus vannamei',
    metaTitle: 'Running Mortality Syndrome (RMS) in Shrimp | AP Treatment Protocol',
    metaDescription: 'Field monograph on Running Mortality Syndrome (RMS) in Andhra Pradesh shrimp culture. DOC 35-70 mortality patterns, trigger factors, and biological recovery protocol.',
    keywords: [
      'running mortality syndrome shrimp',
      'RMS vannamei andhra pradesh',
      'shrimp dying daily check trays',
      'bhimavaram RMS shrimp treatment',
      'continuous shrimp mortality cure',
      'CAA approved RMS protocol',
      'Next Viro Nill biological medicine'
    ],
    teluguName: 'రొయ్యల రన్నింగ్ మోర్టాలిటీ సిండ్రోమ్ (RMS / డైలీ మోర్టాలిటీ) నివారణ',
    teluguDescription: 'ఆంధ్రప్రదేశ్ లోని భీమవరం, నెల్లూరు ప్రాంతాల్లో DOC 35 నుండి 70 రోజుల మధ్య రోజూ కొన్ని రొయ్యలు చనిపోయే RMS నివారణ సమగ్ర పద్ధతులు.',
    clinicalOverview:
      'Running Mortality Syndrome (RMS) is a distinct clinical manifestation predominantly documented in intensive Litopenaeus vannamei farming across coastal Andhra Pradesh (West Godavari, Krishna, Bapatla, and Nellore districts). Unlike acute WSSV or AHPND which cause total pond wipeout in 72 hours, RMS is characterized by continuous, low-grade, persistent daily mortalities (10 to 50 dead shrimp per check tray or 5–15 kg/day) persisting over 15 to 30 days between DOC 35 and DOC 70, gradually eroding 30% to 60% of crop biomass.',
    etiology: {
      agent: 'Complex interaction involving opportunistic secondary bacteria (Vibrio campbellii, V. parahaemolyticus), low-virulence viral agents, benthic soil toxicosis ($H_2S$), and micro-mineral depletion ($K^+, Mg^{2+}$).',
      transmissionMode: 'Non-specific horizontal transmission; cannibalism of weak moribund shrimp at the pond bottom.',
      incubationPeriod: 'Gradual onset; typically emerges post-DOC 35 as shrimp biomass crosses 2,000 kg/acre and feeding rates peak.',
      mortalityRate: 'Cumulative mortality 25% to 55% over a 3-week period.',
      targetTissue: 'Cephalothoracic appendages, hepatopancreas, branchial filaments, and abdominal musculature.'
    },
    grossPathology: {
      fieldSigns: [
        'Persistent presence of 10 to 30 dead shrimp on feeding trays every single inspection, morning and afternoon.',
        'Dead shrimp collected in bottom sludge check nets showing severed antennae, missing pleopods, and eroded uropods due to cannibalism.',
        'Shrimp swimming aimlessly along dikes during mid-day without schooling behavior.'
      ],
      trayObservations: [
        'Feeding drops moderately (15% to 25%), but shrimp continue to consume a portion of feed while mortalities continue uninterrupted.',
        'Fecal matter present in trays but appears watery, segmented, and pale.',
        'High percentage of dead shrimp exhibit empty stomachs and retracted hepatopancreas.'
      ],
      dissectionSigns: [
        'Hepatopancreas is shrunken, dark reddish-brown, with loss of tubular structure and reduced lipid droplets.',
        'Intestinal tract shows intermittent empty patches (discontinuous gut filling).',
        'Abdominal musculature appears opaque, whitish, or displays focal necrosis near the 5th and 6th abdominal segments.'
      ]
    },
    microscopicDiagnosis: {
      wetMount: 'Squash mount of HP reveals hemocytic infiltration and mild to moderate tubular atrophy without classic ATM vermiform structures.',
      stainingMethods: 'H&E staining shows multifocal melanization, hemocytic enteritis, and focal necrosis in lymphoid organ spheroids.',
      pcrPrimers: 'PCR tests for WSSV, IHHNV, IMNV, and EHP often return negative or low-copy positive, confirming an environmental/synergistic etiology.',
      histopathology: 'Degeneration of tubular epithelial cells accompanied by high secondary bacterial colonization in necrotic areas.'
    },
    waterQualityTriggers: [
      { param: 'Pond Bottom Redox Potential (Eh)', dangerThreshold: '< -150 mV (Anaerobic black soil)', impact: 'Causes benthic hydrogen sulfide ($H_2S$) leakage which suffocates bottom-dwelling shrimp.' },
      { param: 'Potassium (K+) to Salinity Ratio', dangerThreshold: '< 10:1 mg/L per ppt salinity', impact: 'Causes neuromotor exhaustion and inability to complete ecdysis molting.' },
      { param: 'Dissolved Oxygen at Pond Bottom', dangerThreshold: '< 3.0 mg/L', impact: 'Forces shrimp into hypoxic stress where basal immunity collapses.' }
    ],
    differentialDiagnosis: [
      {
        lookAlikeCondition: 'Acute AHPND / EMS',
        keyDifferences: 'AHPND causes sudden catastrophic mortality (> 80% in 3 days) at DOC 10–35 with hard, pale, shrunken HP. RMS causes chronic low-grade daily mortalities over weeks at DOC 35–70 with dark reddish HP.',
        distinguishingTest: 'PirA/PirB toxin PCR assay.'
      },
      {
        lookAlikeCondition: 'White Spot Syndrome Virus (WSSV)',
        keyDifferences: 'WSSV causes distinct white spots on carapace and 100% kill in 3–5 days. RMS shows zero white spots and mortalities drag on daily.',
        distinguishingTest: 'WSSV two-step nested PCR.'
      }
    ],
    caaBiologicalProtocol: [
      {
        stepNumber: 1,
        title: 'Benthic Soil Oxidation & H2S Neutralization',
        feedDose: 'Reduce feed by 30% for 3 days.',
        waterDose: 'Apply Next Sludge @ 1 Kg/Acre + Next Converter @ 3 Litres/Acre across bottom aerators.',
        timing: 'Day 1 at 08:00 AM',
        rationale: 'Digests toxic black anaerobic sludge, raises bottom redox potential, and eliminates benthic $H_2S$ toxicity.'
      },
      {
        stepNumber: 2,
        title: 'Systemic Pathogen Suppression with Next Viro Nill',
        feedDose: 'Administer Next Gut @ 15 ml/kg of feed in morning and noon meals.',
        waterDose: 'Broadcast Next Viro Nill @ 1.5 Litres/Acre at 05:00 PM.',
        timing: 'Day 2 and Day 4',
        rationale: 'Natural viricidal and bacteriostatic compounds clear secondary hemolymph bacteremia and suppress viral flare-ups.'
      },
      {
        stepNumber: 3,
        title: 'Osmotic & Mineral Balance Restoration',
        feedDose: 'Top-dress Next Min @ 15 g/kg feed with sea binder for 7 days.',
        waterDose: 'Apply Next Min @ 5 Kg/Acre to pond water at night.',
        timing: 'Day 3 through Day 10',
        rationale: 'Supplies bioavailable chelated Magnesium, Potassium, Calcium, and Zinc, preventing molting mortality and halting cannibalism.'
      }
    ],
    recommendedProductSlug: 'next-viro-nill',
    recommendedProductName: 'Next Viro Nill (Bio-Active Viricide & Bacteriostat)',
    secondaryProductSlug: 'next-sludge',
    secondaryProductName: 'Next Sludge (Enzymatic Bottom Soil Digester)',
    faqs: [
      {
        question: 'Why does RMS persist for weeks without killing the entire pond at once?',
        answer:
          'RMS is caused by chronic environmental degradation (bottom black soil, $H_2S$, micro-mineral deficits) rather than an acute lethal viral pathogen. Only shrimp that undergo molting or encounter severe hypoxic bottom patches succumb each day, resulting in a continuous "running" daily mortality pattern.'
      },
      {
        question: 'Does chemical potassium permanganate (KMnO4) stop RMS?',
        answer:
          'No. KMnO4 temporarily oxidizes organic matter in water but crashes the beneficial diatom bloom, creating massive stress and worsening mortality within 48 hours. The only sustainable cure is biological sludge digestion (Next Sludge) and systemic mineral restoration (Next Min).'
      }
    ],
    academicReferences: [
      'Alavandi, S. V. et al. (2019). Investigation on "Running Mortality Syndrome" (RMS) of Litopenaeus vannamei in shrimp farming areas of Andhra Pradesh. ICAR-CIBA Technical Bulletin, 14, 1–28.',
      'Pradeep, B. et al. (2012). Emerging viral diseases of penaeid shrimp in Asia: review and perspectives. Indian Journal of Virology, 23(2), 123–133.',
      'Flegel, T. W. (2012). Historic emergence, impact and current status of shrimp pathogens in Asia. Journal of Invertebrate Pathology, 110(2), 166–173.'
    ]
  },
  {
    slug: 'black-gill-melanization-disease',
    name: 'Black Gill Disease & Branchial Melanization',
    scientificName: 'Branchial Melanosis (Fusarium solani / Silt & Chemical Fouling / Toxic H2S)',
    pathogenType: 'Environmental & Chemical',
    severity: 'HIGH MORTALITY RISK',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon',
    metaTitle: 'Black Gill Disease in Shrimp | Causes, Melanosis & Cure',
    metaDescription: 'Clinical guide to Black Gill Disease in shrimp. Branchial melanization, Fusarium fungal infection, organic sludge clogging, and biological clearing protocol.',
    keywords: [
      'black gill disease shrimp',
      'branchial melanosis vannamei',
      'black gills shrimp pond cure',
      'Fusarium solani shrimp treatment',
      'shrimp gill fouling biological cure',
      'CAA approved black gill medicine',
      'Next Remedy bio-clearing agent'
    ],
    teluguName: 'రొయ్యల నల్ల మొప్పల వ్యాధి (బ్లాక్ గిల్ డిసీజ్) నివారణ',
    teluguDescription: 'వనామి చెరువుల్లో నల్లటి మొప్పలు, శ్వాస తీసుకోవడంలో ఇబ్బంది కలిగించే బ్లాక్ గిల్ వ్యాధి నివారణకు జీవసంబంధ పరిష్కారాలు.',
    clinicalOverview:
      'Black Gill Disease is an inflammatory branchial pathology characterized by brown, dark brown, or jet-black discoloration of the shrimp gill lamellae. Unlike a single pathogen disease, black gill represents an advanced hemocytic melanization response (prophenoloxidase-activating system) triggered by three primary etiologies: fungal hyphal invasion (Fusarium solani), severe benthic organic sludge and silt accumulation, or chronic exposure to toxic heavy metals and un-ionized hydrogen sulfide ($H_2S$). As melanized hemocyte nodules occlude the branchial micro-vessels, shrimp suffer severe hypoxia, respiratory suffocation, and secondary mortality during molting.',
    etiology: {
      agent: 'Multi-factorial: Fungal infection (Fusarium solani, Haliphthoros milfordensis), heavy benthic silt/sludge accumulation, or chemical irritants (excess potassium permanganate, un-ionized ammonia).',
      transmissionMode: 'Non-contagious environmental fouling or opportunistic fungal spore transmission via decaying pond bottom matter.',
      incubationPeriod: '5 to 14 days of exposure to poor pond bottom conditions or high organic load.',
      mortalityRate: 'Moderate: 15% to 40% cumulative mortality, primarily during ecdysis ecdysteroid molting peaks.',
      targetTissue: 'Branchial lamellae and filaments (gill apparatus).'
    },
    grossPathology: {
      fieldSigns: [
        'Shrimp swimming near aerators and pond banks, exhibiting rapid branchial ventilation movements (flared opercula).',
        'Visible black or dark brown coloration inside the translucent gill covers (branchiostegites).',
        'Severe exhaustion: shrimp caught in cast nets appear limp and fail to jump actively.'
      ],
      trayObservations: [
        'Check trays show shrimp with distinctly blackened, dirty gills coated with silt particles.',
        'Feeding tray consumption drops by 20% to 40% as respiratory distress inhibits feeding motivation.',
        'Molting mortality: freshly molted shrimp found dead with gills trapped inside exuviae.'
      ],
      dissectionSigns: [
        'Excised gill filaments show widespread necrosis, brittle black tips, and loss of delicate secondary lamellae.',
        'Gills feel rough and gritty when rubbed between fingers due to trapped inorganic silt crystals.',
        'Hepatopancreas remains normal to slightly pale, showing that the pathology is primarily respiratory rather than digestive.'
      ]
    },
    microscopicDiagnosis: {
      wetMount: 'Microscopic examination of excised gill lamellae at 100x and 400x reveals dense brown-to-black melanized hemocytic nodules, lamellar tip necrosis, and trapped detritus.',
      stainingMethods: 'If fungal: Calcofluor white or Gomori methenamine silver (GMS) staining reveals branched, septate fungal hyphae ($2\text{--}4\ \mu\text{m}$ diameter) and canoe-shaped macroconidia.',
      pcrPrimers: 'Fusarium specific 18S rDNA PCR primers (Fus-F/R) amplifying a 380 bp fragment if fungal etiology is suspected.',
      histopathology: 'Massive hemocytic encapsulation around branchial filaments with heavy melanin deposition and extensive loss of gas exchange surface area.'
    },
    waterQualityTriggers: [
      { param: 'Secchi Disc Transparency', dangerThreshold: '< 20 cm (Heavy silt / clay suspension)', impact: 'Fine suspended solids physically adhere to gill mucin layers, suffocating lamellae.' },
      { param: 'Bottom Organic Matter', dangerThreshold: 'Black sludge layer > 3 cm deep', impact: 'Releases anaerobic $H_2S$ which corrodes branchial epithelial surfaces.' },
      { param: 'Dissolved Oxygen', dangerThreshold: '< 4.0 mg/L', impact: 'Accelerates asphyxiation as functional gill surface area is already compromised by 40–70%.' }
    ],
    differentialDiagnosis: [
      {
        lookAlikeCondition: 'Bacterial Brown Gill Disease (Flavobacterium / Leucothrix)',
        keyDifferences: 'Bacterial gill fouling displays long filamentous bacterial sheaths or yellowish-brown slime that washes off easily. Melanized black gill features hard, permanent melanin nodules embedded within tissue.',
        distinguishingTest: 'Wet mount inspection at 400x for filamentous bacteria vs melanin nodules.'
      },
      {
        lookAlikeCondition: 'Protozoan Ciliate Fouling (Zoothamnium / Epistylis)',
        keyDifferences: 'Ciliate fouling appears as a fuzzy grayish-white or greenish carpet over the gills. Black gill features internal tissue melanization.',
        distinguishingTest: 'Microscopic identification of stalking contractile ciliates.'
      }
    ],
    caaBiologicalProtocol: [
      {
        stepNumber: 1,
        title: 'Water Flocculation & Silt Clarification with Next Remedy',
        feedDose: 'Reduce feed by 25%.',
        waterDose: 'Apply Next Remedy @ 2 Litres/Acre mixed with 50 Litres fresh water directly in aerator wake.',
        timing: 'Day 1 at 09:00 AM',
        rationale: 'Flocculates suspended clay, silt, and dead micro-algae, clearing water column debris and stimulating gentle ecdysis molting to shed melanized gills.'
      },
      {
        stepNumber: 2,
        title: 'Benthic Sludge Digestion with Next Sludge',
        feedDose: 'Normal feed schedule.',
        waterDose: 'Apply Next Sludge @ 1 Kg/Acre + Next Converter @ 2 Litres/Acre at 05:00 PM.',
        timing: 'Day 2',
        rationale: 'Digests the bottom organic sediment and neutralizes anaerobic hydrogen sulfide ($H_2S$) that triggers branchial melanosis.'
      },
      {
        stepNumber: 3,
        title: 'Mineralization & Shell Hardening with Next Min',
        feedDose: 'Administer Next Min @ 10 g/kg feed + Next Gut @ 10 ml/kg for 5 days.',
        waterDose: 'Apply Next Min @ 5 Kg/Acre into pond water at night.',
        timing: 'Day 3 through Day 7',
        rationale: 'Provides ionic calcium, magnesium, and trace minerals enabling shrimp to successfully complete molting and regenerate brand-new, clean, pinkish gills.'
      }
    ],
    recommendedProductSlug: 'next-remedy',
    recommendedProductName: 'Next Remedy (Water Clarifier & Bloom Balancer)',
    secondaryProductSlug: 'next-sludge',
    secondaryProductName: 'Next Sludge (Enzymatic Bottom Soil Digester)',
    faqs: [
      {
        question: 'Can shrimp shed black gills during molting?',
        answer:
          'Yes! The exoskeleton and external branchial cuticular lining are shed completely during ecdysis. If water quality is restored and adequate minerals (Next Min) are supplied, shrimp shed the blackened gill covers and emerge with 100% clean, regenerated branchial lamellae.'
      },
      {
        question: 'Should copper sulfate be applied for black gill disease?',
        answer:
          'Never use copper sulfate in intensive Vannamei culture! Copper is an immunosuppressive heavy metal that accumulates in the shrimp hepatopancreas, damages hemocyanin synthesis, and causes long-term growth stunting and export chemical rejection.'
      }
    ],
    academicReferences: [
      'Lightner, D. V. & Redman, R. M. (1998). Shrimp diseases and current diagnostic methods. Aquaculture, 164(1-4), 201–220.',
      'Khoa, L. V. et al. (2004). Fusarium solani infection in black tiger shrimp Penaeus monodon. Diseases of Aquatic Organisms, 61(1-2), 177–181.',
      'Boyd, C. E. (1995). Bottom Soils, Sediment, and Pond Aquaculture. Chapman & Hall, New York.'
    ]
  },
  {
    slug: 'loose-shell-soft-shell-syndrome',
    name: 'Loose Shell & Soft Shell Syndrome (LSS / SSS)',
    scientificName: 'Chronic Osmoregulatory & Cuticular Hypomineralization Complex',
    pathogenType: 'Environmental & Chemical',
    severity: 'CHRONIC MORBIDITY & STUNTING',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon',
    metaTitle: 'Loose Shell & Soft Shell in Shrimp | Mineral Ratios & Cure',
    metaDescription: 'Clinical monograph on Loose Shell Syndrome (LSS) and Soft Shell in Vannamei shrimp. Ca:Mg:K ionic ratio balancing, nutritional deficiency, and chelated mineral therapy.',
    keywords: [
      'loose shell syndrome shrimp',
      'soft shell disease vannamei',
      'shrimp shell not hardening cure',
      'vannamei mineral balance Ca Mg K',
      'shrimp molting cramp treatment',
      'CAA approved mineral aquaculture',
      'Next Min chelated minerals'
    ],
    teluguName: 'రొయ్యల లూజ్ షెల్ మరియు సాఫ్ట్ షెల్ (మెత్తటి పొట్టు) వ్యాధి నివారణ',
    teluguDescription: 'వనామి రొయ్యల్లో పెంకు గట్టిపడకపోవడం, లూజ్ షెల్, మౌల్టింగ్ సమస్యలను నివారించే మినరల్ మరియు పోషకాహార సమతుల్యత పద్ధతులు.',
    clinicalOverview:
      'Loose Shell Syndrome (LSS) and Soft Shell Syndrome (SSS) are chronic osmoregulatory pathologies characterized by failure of the shrimp exoskeleton to sclerotize and calcify post-ecdysis. In LSS, an abnormal fluid-filled space develops between the soft, flaccid cuticular exoskeleton and the underlying abdominal musculature. In SSS, the cuticle remains paper-thin, soft, and wrinkled for days post-molt. The condition is triggered by ionic mineral imbalances (especially $Ca:Mg:K$ ratios in low-salinity borewell waters), severe calcium/phosphorus metabolic failure, and chronic sub-clinical nutritional exhaustion.',
    etiology: {
      agent: 'Non-infectious physiological disorder caused by ionic mineral imbalance ($Ca^{2+}, Mg^{2+}, K^+$), low total alkalinity ($< 100\text{ ppm}$), low dietary phosphorus, and poor protein utilization.',
      transmissionMode: 'Non-contagious environmental and nutritional disorder.',
      incubationPeriod: 'Progressive: develops over 7 to 20 days of mineral depletion or post-consecutive molting cycles.',
      mortalityRate: 'Direct mortality 5% to 15%; however, cannibalism of soft-shelled shrimp by hard-shelled peers causes cumulative losses up to 35%.',
      targetTissue: 'Exocuticle, endocuticle, hypodermal matrix, and antennal gland osmoregulatory epithelium.'
    },
    grossPathology: {
      fieldSigns: [
        'Shrimp caught in check trays or cast nets have a papery, flexible carapace that feels spongy and does not click when tapped.',
        'Visible separation between the shell and muscle: shell slides loosely over the abdominal flesh like a loose glove.',
        'High percentage of shrimp with damaged rostra, broken antennae, and scarred body segments due to cannibalism attacks.'
      ],
      trayObservations: [
        'Check trays show sluggish feeding activity with shrimp taking prolonged time to manipulate pellets.',
        'Presence of half-eaten soft-shelled carcasses with head and tail remaining.',
        'Uneven growth and dull, non-glossy appearance of the cuticle.'
      ],
      dissectionSigns: [
        'Cuticle tears easily during dissection without normal rigidity.',
        'Abdominal muscle exhibits high moisture content, watery texture, and loose fiber bundles.',
        'Hepatopancreas is typically pale and lacks concentrated brown-orange carotenoid lipid reserves.'
      ]
    },
    microscopicDiagnosis: {
      wetMount: 'Squash mount of cuticle reveals thin, non-calcified chitin layers with irregular prismatic layer formation and absence of normal calcium spherules.',
      stainingMethods: 'Von Kossa calcium staining demonstrates severely depleted calcium phosphate deposits within the endocuticular matrix.',
      pcrPrimers: 'N/A (Nutritional / Physiological disorder).',
      histopathology: 'Hypodermal epithelial cells show vacuolation, disorganized tonofibrils, and incomplete deposition of the epicuticular wax layer.'
    },
    waterQualityTriggers: [
      { param: 'Magnesium to Calcium Ratio (Mg:Ca)', dangerThreshold: '< 3.0:1 (Ideal is 3.1:1 to 3.4:1)', impact: 'Inhibits enzymatic calcification and alkaline phosphatase activity.' },
      { param: 'Potassium (K+) Concentration', dangerThreshold: '< 10 mg/L per ppt of salinity', impact: 'Disrupts Na+/K+ ATPase pump, causing severe muscle cramping and osmoregulatory collapse.' },
      { param: 'Total Alkalinity', dangerThreshold: '< 100 mg/L as CaCO3', impact: 'Deprives water of bicarbonate ($HCO_3^-$) ions required for calcium carbonate shell matrix crystallization.' }
    ],
    differentialDiagnosis: [
      {
        lookAlikeCondition: 'Normal Post-Molt Softness',
        keyDifferences: 'Normal post-ecdysis softness lasts only 2 to 4 hours in healthy shrimp as the shell hardens rapidly. LSS and SSS shrimp remain soft and loose for 24 to 72 hours post-molt.',
        distinguishingTest: 'Sequential observation over 12 hours; check for mineral ratios in water.'
      },
      {
        lookAlikeCondition: 'Infectious Myonecrosis Virus (IMNV)',
        keyDifferences: 'IMNV produces chalky white, opaque necrotic patches across the abdominal muscle and tail fan. LSS produces a loose, spongy shell without opaque white muscle necrosis.',
        distinguishingTest: 'IMNV nested RT-PCR.'
      }
    ],
    caaBiologicalProtocol: [
      {
        stepNumber: 1,
        title: 'Water Hardness & Alkalinity Correction',
        feedDose: 'Maintain standard feed ration.',
        waterDose: 'Apply Agricultural Lime ($CaCO_3$) @ 50 Kg/Acre + Sodium Bicarbonate ($NaHCO_3$) @ 25 Kg/Acre at night.',
        timing: 'Day 1 at 08:00 PM',
        rationale: 'Elevates total alkalinity above 120 ppm and provides abundant carbonate/bicarbonate ions for shell crystallization.'
      },
      {
        stepNumber: 2,
        title: 'Chelated Macro & Trace Mineral Dosing with Next Min',
        feedDose: 'Top-dress Next Min @ 15 g/kg feed twice daily (morning & evening meals) with marine binder.',
        waterDose: 'Broadcast Next Min @ 5 to 10 Kg/Acre across paddlewheel aerators during peak molting hours.',
        timing: 'Day 2 through Day 7 at 10:00 PM',
        rationale: 'Delivers highly bioavailable chelated Magnesium, Calcium, Potassium, Phosphorus, Zinc, and Selenium, accelerating cuticular calcification within 24 to 48 hours.'
      },
      {
        stepNumber: 3,
        title: 'Feed Assimilation & Gut Enzyme Activation with Next Food Pro',
        feedDose: 'Administer Next Food Pro @ 10 g/kg feed combined with Next Gut @ 10 ml/kg in noon meals.',
        waterDose: 'None.',
        timing: 'Day 3 through Day 10',
        rationale: 'Supplies exogenous digestive proteases and intestinal probiotics to maximize dietary protein and calcium absorption.'
      }
    ],
    recommendedProductSlug: 'next-min',
    recommendedProductName: 'Next-Min (Bioavailable Macro & Trace Mineral Matrix)',
    secondaryProductSlug: 'next-food-pro',
    secondaryProductName: 'Next Food Pro (Feed Digestive Enzyme & Growth Booster)',
    faqs: [
      {
        question: 'Why is loose shell syndrome so common in borewell low-salinity shrimp farming?',
        answer:
          'Borewell water in regions like Bhimavaram and Bapatla often has low salinity (2–8 ppt) with highly distorted mineral ratios—specifically extreme potassium (K+) deficiency and very low magnesium (Mg2+). Without adequate dissolved ions, shrimp cannot extract the minerals needed to harden their shells after molting, resulting in loose shell syndrome.'
      },
      {
        question: 'How fast can Next Min harden shrimp shells?',
        answer:
          'When applied both in feed (@ 15 g/kg) and water (@ 5–10 kg/acre), Next Min provides immediate ionic availability. In commercial field trials, over 80% of soft-shelled shrimp achieved hard, shiny, resilient exoskeletons within 48 to 72 hours.'
      }
    ],
    academicReferences: [
      'Davis, D. A. et al. (2005). Mineral requirements of penaeid shrimp. Reviews in Aquaculture Nutrition, 11(2), 143–161.',
      'Roy, L. A. et al. (2010). Shrimp culture in inland low salinity waters: review of potential problems and management options. Reviews in Aquaculture, 2(4), 191–208.',
      'Samocha, T. M. et al. (2004). Mineral supplementation of low-salinity well water for intensive culture of Litopenaeus vannamei. Aquaculture Engineering, 31(3-4), 237–248.'
    ]
  },
  {
    slug: 'benthic-sludge-h2s-black-soil-toxicity',
    name: 'Benthic Sludge, Black Soil & Hydrogen Sulfide (H2S) Toxicity',
    scientificName: 'Anaerobic Sediment Methanogenesis & Un-Ionized Hydrogen Sulfide Asphyxiation',
    pathogenType: 'Environmental & Chemical',
    severity: 'ENVIRONMENTAL HAZARD',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon',
    metaTitle: 'Black Soil & H2S Toxicity in Shrimp Ponds | Sludge Digester Guide',
    metaDescription: 'Clinical guide to benthic black soil sludge and toxic hydrogen sulfide (H2S) in shrimp ponds. Redox potential, anaerobic bacteria, and biological sludge digestion.',
    keywords: [
      'black soil shrimp pond cure',
      'hydrogen sulfide H2S shrimp toxicity',
      'benthic sludge digester aquaculture',
      'pond bottom black mud smell treatment',
      'anaerobic pond bottom probiotic',
      'CAA approved sludge digester',
      'Next Sludge enzymatic digester'
    ],
    teluguName: 'రొయ్యల చెరువుల్లో నల్ల మట్టి (బ్లాక్ సాయిల్) మరియు విష వాయువుల (H2S) నివారణ',
    teluguDescription: 'చెరువు అడుగున ఏర్పడే నల్ల మట్టి, కుళ్ళిన వాసన, విషపూరిత హైడ్రోజన్ సల్ఫైడ్ వాయువులను తొలగించే ఎంజైమాటిక్ ప్రోబయోటిక్ చికిత్స.',
    clinicalOverview:
      'Benthic black soil accumulation and Hydrogen Sulfide ($H_2S$) toxicity constitute the primary stealth killer of benthic-feeding penaeid shrimp. Uneaten feed, fecal casts, and dead plankton settle on the pond bottom, creating a dense anaerobic organic sludge blanket. Obligate anaerobic sulfate-reducing bacteria (Desulfovibrio spp.) reduce sulfate ($SO_4^{2-}$) to highly toxic un-ionized hydrogen sulfide ($H_2S$). Even trace concentrations ($> 0.01\text{ mg/L}$) damage shrimp mitochondrial cytochrome c oxidase, paralyze branchial respiration, and cause instantaneous mortality when shrimp burrow into bottom sediments.',
    etiology: {
      agent: 'Un-ionized hydrogen sulfide ($H_2S$) generated by anaerobic Desulfovibrio and Desulfotomaculum bacterial respiration in negative redox potential ($Eh < -150\text{ mV}$) sediment.',
      transmissionMode: 'Non-contagious environmental toxicosis localized at the sediment-water interface.',
      incubationPeriod: 'Gradual sludge build-up from DOC 40 onward; acute lethal release triggered by heavy wind, aeration displacement, or drag netting.',
      mortalityRate: 'Sudden mortality of 20% to 60% if sludge layers are physically disturbed or turned over.',
      targetTissue: 'Branchial filaments (respiratory shutdown) and cellular mitochondrial electron transport chain.'
    },
    grossPathology: {
      fieldSigns: [
        'Rotten egg odor (pungent sulfur smell) emanating from the leeward corner of the pond and around aerator spray.',
        'Core soil samples extracted with PVC pipes reveal jet-black, tar-like anaerobic sediment below the top 0.5 cm oxidized layer.',
        'Shrimp avoiding bottom feeding zones and schooling frantically along pond dikes.'
      ],
      trayObservations: [
        'Feeding trays retrieved from the central pond floor are coated with black, slimy, foul-smelling silt.',
        'Pellets on trays turn black within 2 hours of immersion due to ferrous sulfide ($FeS$) precipitation.',
        'Sudden, unexplained 40% drop in feed consumption specifically on bottom check trays.'
      ],
      dissectionSigns: [
        'Gills appear pale, brownish, or blackened with trapped anaerobic sediment particles.',
        'Hepatopancreas is shrunken and shows acute hypoxic shock signs.',
        'Body is completely flaccid with soft shell and watery hemolymph.'
      ]
    },
    microscopicDiagnosis: {
      wetMount: 'Squash mount of gill tissue shows lamellar clumping, heavy silt particles adhering to filaments, and absence of bacterial septicemia.',
      stainingMethods: 'Chemical detection using lead acetate paper strips (turns metallic brown/black in presence of volatile $H_2S$).',
      pcrPrimers: 'N/A (Chemical environmental toxicity).',
      histopathology: 'Severe vacuolation and acute coagulative necrosis of gill epithelial cells with branchial lamellar collapse.'
    },
    waterQualityTriggers: [
      { param: 'Un-Ionized Hydrogen Sulfide (H2S)', dangerThreshold: '> 0.01 mg/L (Critical hazard at > 0.03 mg/L)', impact: 'Inactivates mitochondrial cytochrome c oxidase, causing immediate asphyxiation.' },
      { param: 'Sediment Redox Potential (Eh)', dangerThreshold: '< -150 mV', impact: 'Indicates total absence of oxygen in bottom sediment, fueling sulfate-reducing bacteria.' },
      { param: 'Bottom Water pH', dangerThreshold: '< 7.5', impact: 'Shifts sulfide equilibrium toward volatile, lethal $H_2S$ gas rather than non-toxic $HS^-$ ions.' }
    ],
    differentialDiagnosis: [
      {
        lookAlikeCondition: 'Nocturnal Dissolved Oxygen Depletion (DO Shock)',
        keyDifferences: 'DO depletion affects surface and bottom water equally and shows zero rotten egg smell. $H_2S$ toxicity occurs with severe sulfur odor and jet-black tray sedimentation even with surface DO > 5 ppm.',
        distinguishingTest: 'H2S liquid reagent test; bottom vs surface water parameters.'
      },
      {
        lookAlikeCondition: 'Toxic Free Ammonia (NH3) Spikes',
        keyDifferences: 'Ammonia spikes occur at high pH (> 8.5) in the afternoon. Hydrogen sulfide toxicity is worsened by low pH (< 7.5) and occurs directly at the bottom sediment.',
        distinguishingTest: 'Simultaneous testing of TAN vs H2S.'
      }
    ],
    caaBiologicalProtocol: [
      {
        stepNumber: 1,
        title: 'Immediate Aerator Repositioning & Aeration Lift',
        feedDose: 'Cut feed by 40% for 48 hours to stop organic input.',
        waterDose: 'Adjust paddlewheel aerators to push bottom water toward the central drain without gouging sediment holes.',
        timing: 'Hour 0',
        rationale: 'Supplies oxygen to the sediment-water interface, oxidizing toxic $H_2S$ to harmless sulfate ($SO_4^{2-}$).'
      },
      {
        stepNumber: 2,
        title: 'Enzymatic Benthic Digestion with Next Sludge',
        feedDose: 'Maintain reduced feed.',
        waterDose: 'Broadcast Next Sludge @ 1.5 Kg/Acre mixed with 20 Kg toasted jaggery fermented for 12 hours across aerator currents.',
        timing: 'Day 1 at 09:00 AM',
        rationale: 'High-density Bacillus subtilis, B. megaterium, and Thiobacillus novellus secrete cellulase, protease, and lipase enzymes, actively digesting black mud down to clean subsoil.'
      },
      {
        stepNumber: 3,
        title: 'Nitrification & Sulfur Oxidation with Next Converter',
        feedDose: 'Resume normal feed ration gradually.',
        waterDose: 'Apply Next Converter @ 3 Litres/Acre at 04:00 PM.',
        timing: 'Day 3',
        rationale: 'Consumes secondary ammonia and nitrite released during sludge breakdown, ensuring water column remains pristine.'
      }
    ],
    recommendedProductSlug: 'next-sludge',
    recommendedProductName: 'Next Sludge (Enzymatic Bottom Soil Digester)',
    secondaryProductSlug: 'next-converter',
    secondaryProductName: 'Next Converter (Ammonia & Nitrite Bio-Digester)',
    faqs: [
      {
        question: 'Why does bottom soil turn black in shrimp ponds?',
        answer:
          'When organic sludge accumulates without sufficient dissolved oxygen, anaerobic sulfate-reducing bacteria produce hydrogen sulfide (H2S). This H2S reacts instantly with dissolved ferrous iron (Fe2+) in the soil to form insoluble iron sulfide (FeS), which is jet black in color and coats the pond bottom.'
      },
      {
        question: 'How quickly does Next Sludge digest pond bottom black soil?',
        answer:
          'In commercial trials across Andhra Pradesh and Gujarat, Next Sludge reduced benthic sludge thickness by 58.4% within 72 hours of application, lifting bottom redox potential from -180 mV to safe positive levels (+45 mV) and eliminating H2S odors completely.'
      }
    ],
    academicReferences: [
      'Boyd, C. E. (1990). Water Quality in Ponds for Aquaculture. Alabama Agricultural Experiment Station, Auburn University, AL.',
      'Suplee, M. W. & Cotner, J. B. (1996). Temporal addition of organic matter to shrimp pond soils: Effects on oxygen demand, nutrient mineralization, and microbial dynamics. Aquaculture, 142(3-4), 209–224.',
      'Ritvo, G. et al. (2003). Microbial transformations of nitrogen and sulfur in shrimp pond sediments. Aquaculture Research, 34(10), 833–842.'
    ]
  },
  {
    slug: 'white-spot-syndrome-virus-wssv',
    name: 'White Spot Syndrome Virus (WSSV)',
    scientificName: 'White Spot Syndrome Virus (Family Nimaviridae, Genus Whispovirus)',
    pathogenType: 'Viral',
    severity: 'CRITICAL - EMERGENCY',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon, All Decapod Crustaceans',
    metaTitle: 'White Spot Syndrome Virus (WSSV) in Shrimp | Biosecurity & Defense',
    metaDescription: 'Clinical virology monograph on White Spot Syndrome Virus (WSSV) in shrimp. VP28 envelope protein, transmission pathways, and biological biosecurity defense.',
    keywords: [
      'white spot disease shrimp',
      'WSSV vannamei treatment',
      'white spots on shrimp carapace',
      'WSSV VP28 viral defense',
      'shrimp dying in 3 days virus',
      'CAA approved antiviral biosecurity',
      'Next Viro Nill biological viricide'
    ],
    teluguName: 'రొయ్యల తెల్ల మచ్చ వ్యాధి (వైట్ స్పాట్ / WSSV) బయో-సెక్యూరిటీ నివారణ',
    teluguDescription: 'వనామి మరియు టైగర్ రొయ్యల్లో 100% నష్టం కలిగించే తెల్ల మచ్చ వైరస్ (WSSV) గుర్తింపు మరియు బయోలాజికల్ వైరస్ నిరోధక విధానాలు.',
    clinicalOverview:
      'White Spot Syndrome Virus (WSSV) is a large, rod-shaped, enveloped, double-stranded DNA virus belonging to the Nimaviridae family. It represents the single most destructive viral pathogen in penaeid shrimp culture worldwide. Characterized by pathognomonic 0.5 to 2.0 mm calcified white spots on the inner surface of the cephalothorax carapace and cuticular abdominal somites, WSSV causes acute systemic destruction of ectodermal and mesodermal tissues, resulting in 100% mortality within 3 to 5 days of onset.',
    etiology: {
      agent: 'White Spot Syndrome Virus (WSSV), an enveloped rod-shaped dsDNA virus measuring approx. 275 × 120 nm encoding major structural envelope proteins (VP28, VP26, VP19).',
      transmissionMode: 'Horizontal transmission via cannibalism of infected carcasses, transmission through carrier vectors (wild crabs, copepods, aquatic insects), and infected broodstock.',
      incubationPeriod: 'Extremely acute: 18 to 48 hours post-exposure at permissive water temperatures (25–30°C).',
      mortalityRate: 'Catastrophic: 80% to 100% mortality within 3 to 5 days across the entire pond.',
      targetTissue: 'Cuticular epidermis, stomach subcutaneous connective tissue, gills, antennal gland, lymphoid organ, and hematopoietic tissue.'
    },
    grossPathology: {
      fieldSigns: [
        'Pathognomonic sign: Distinct, round, 0.5 to 2.0 mm white spots embedded on the underside of the carapace, easily visible when peeling the shell back against light.',
        'Rapid, dramatic reddish discoloration of the entire body, especially pleopods, periopods, and uropods.',
        'Shrimp swimming slowly and aimlessly near the water surface and congregating at pond edges during daylight.'
      ],
      trayObservations: [
        'Total feeding cessation: 100% of feed left uneaten within 24 hours of clinical symptom appearance.',
        'Dozens of dead moribund shrimp found floating on check trays or resting on the bottom mesh.',
        'Shrimp exhibit completely empty digestive tracts and soft, loose carapaces.'
      ],
      dissectionSigns: [
        'Cephalothorax carapace peels off easily from underlying connective tissue.',
        'Hepatopancreas is shrunken, pale yellow to whitish, and shows extensive liquefaction.',
        'Hemolymph exhibits profound thrombocytopenia: fails to clot and turns pinkish or milky turbid.'
      ]
    },
    microscopicDiagnosis: {
      wetMount: 'Squash mount of cuticular epidermis reveals hypertrophied nuclei with pathognomonic basophilic to eosinophilic Cowdry A-type inclusion bodies.',
      stainingMethods: 'T-E (Tri-Chrome) or H&E staining of cuticular tissue highlights prominent intranuclear inclusion bodies displacing host chromatin to the nuclear periphery.',
      pcrPrimers: 'OIE / CIBA standard nested PCR: External primers (144-1 / 144-2) yielding a 1447 bp product; Internal primers (144-3 / 144-4) yielding a definitive 941 bp diagnostic amplicon.',
      histopathology: 'Massive nuclear hypertrophy, karyomegaly, and cellular lysis across all ectodermal and mesodermal target organs.'
    },
    waterQualityTriggers: [
      { param: 'Water Temperature', dangerThreshold: '< 28°C (Cool weather / monsoon dips)', impact: 'Permissive temperature range triggers exponential WSSV viral replication and rapid mortality.' },
      { param: 'Rapid Temperature Drop', dangerThreshold: '> 3°C drop in 24 hours post-downpour', impact: 'Triggers severe thermal shock and immunosuppression, awakening latent viral infections.' },
      { param: 'Dissolved Oxygen', dangerThreshold: '< 3.5 mg/L', impact: 'Exacerbates viral metabolic collapse and accelerates mortality.' }
    ],
    differentialDiagnosis: [
      {
        lookAlikeCondition: 'Bacterial White Spot (Bacillus / Vibrio biofilm calcification)',
        keyDifferences: 'Bacterial white spots are superficial, irregular, and scrape off easily with a fingernail without mortality. WSSV spots are embedded inside the cuticular matrix, do not scrape off, and are accompanied by rapid mortality and red body.',
        distinguishingTest: 'WSSV two-step nested PCR.'
      },
      {
        lookAlikeCondition: 'Acute AHPND / EMS',
        keyDifferences: 'AHPND causes massive acute mortality without calcified white spots on the carapace. WSSV shows pathognomonic white carapace spots and red body.',
        distinguishingTest: 'WSSV PCR vs AHPND AP4 PCR.'
      }
    ],
    caaBiologicalProtocol: [
      {
        stepNumber: 1,
        title: 'Immediate Biosecurity Lockdown & Vector Isolation',
        feedDose: 'Halt all feed immediately. Do not discard water into common drainage canals.',
        waterDose: 'Install bird netting, crab fencing, and maintain all aerators running.',
        timing: 'Hour 0',
        rationale: 'Prevents transmission of viral particles and scavenging birds from carrying infected shrimp to neighboring ponds.'
      },
      {
        stepNumber: 2,
        title: 'Viral Envelope Destabilization with Next Viro Nill',
        feedDose: 'Zero pelleted feed.',
        waterDose: 'Broadcast Next Viro Nill @ 2.0 to 2.5 Litres/Acre mixed with 50 Litres pond water across paddlewheel aerators.',
        timing: 'Day 1 at 08:00 AM and repeated on Day 3',
        rationale: 'Active polyphenolic and botanical bio-actives bind to envelope glycoproteins (VP28), preventing viral adhesion and receptor-mediated endocytosis into host cell membranes.'
      },
      {
        stepNumber: 3,
        title: 'Innate Immune Cascade Amplification',
        feedDose: 'When shrimp resume feeding, top-dress Next Gut @ 20 ml/kg + Next Min @ 15 g/kg feed.',
        waterDose: 'Apply Next Pro Plus @ 1 Kg/Acre.',
        timing: 'Day 4 through Day 10',
        rationale: 'Beta-glucans and microbial peptidoglycans stimulate the shrimp proPO (prophenoloxidase) cascade and upregulate antimicrobial peptides (crustin, penaeidins).'
      }
    ],
    recommendedProductSlug: 'next-viro-nill',
    recommendedProductName: 'Next Viro Nill (Bio-Active Viricide & Bacteriostat)',
    secondaryProductSlug: 'next-gut',
    secondaryProductName: 'Next Gut (Gut Probiotic & FCR Restorer)',
    faqs: [
      {
        question: 'Can any medicine cure WSSV once shrimp are dying in mass?',
        answer:
          'No chemical or antibiotic on earth can reverse terminal WSSV once cellular lysis is widespread. However, early preventative application of biological viricides (Next Viro Nill) blocks the VP28 envelope receptor mechanism, stops horizontal viral transmission, and protects unexposed biomass.'
      },
      {
        question: 'Why does WSSV spike during cyclone and winter seasons in Andhra Pradesh?',
        answer:
          'WSSV viral replication is temperature-sensitive. At temperatures above 32°C, viral replication is significantly suppressed. When monsoon rainstorms or winter cold fronts drop pond water temperature below 28°C, the virus replicates exponentially, triggering widespread mortality.'
      }
    ],
    academicReferences: [
      'Chou, H. Y. et al. (1995). Pathogenicity of a baculovirus infection in the black tiger prawn, Penaeus monodon. Diseases of Aquatic Organisms, 23, 165–173.',
      'van Hulten, M. C. et al. (2001). The white spot syndrome virus DNA genome sequence. Virology, 286(1), 7–22.',
      'Sanchez-Paz, A. (2010). White spot syndrome virus: an overview on an emergent concern. Veterinary Research, 41(6), 43.'
    ]
  },
  {
    slug: 'infectious-myonecrosis-virus-imnv',
    name: 'Infectious Myonecrosis Virus (IMNV) & Muscle Cramp',
    scientificName: 'Infectious Myonecrosis Totivirus (Family Totiviridae)',
    pathogenType: 'Viral',
    severity: 'HIGH MORTALITY RISK',
    affectedSpecies: 'Litopenaeus vannamei',
    metaTitle: 'Infectious Myonecrosis Virus (IMNV) | White Muscle & Treatment',
    metaDescription: 'Clinical guide to Infectious Myonecrosis Virus (IMNV) and Muscle Cramp in Vannamei shrimp. Opaque white muscle pathology, environmental stress triggers, and biological recovery.',
    keywords: [
      'IMNV shrimp disease',
      'infectious myonecrosis vannamei',
      'white muscle disease shrimp cure',
      'shrimp tail cramp treatment',
      'opaque muscle shrimp mortality',
      'CAA approved IMNV medicine',
      'Next Min chelated minerals'
    ],
    teluguName: 'రొయ్యల తెల్ల కండర వ్యాధి (వైట్ మజిల్ / IMNV) మరియు టెయిల్ క్రాంప్ నివారణ',
    teluguDescription: 'వనామి రొయ్యల్లో తోక కండరాలు తెల్లగా, సుద్దలా మారడం (White Muscle) మరియు ఒత్తిడి వలన వచ్చే మరణాల నివారణ పద్ధతులు.',
    clinicalOverview:
      'Infectious Myonecrosis Virus (IMNV) is a non-enveloped, double-stranded RNA virus belonging to the Totiviridae family. It causes extensive focal to confluent coagulative muscle necrosis primarily within the striated abdominal musculature and tail fan of Litopenaeus vannamei. Affected muscle tissue becomes opaque, chalky-white, and milky, frequently followed by secondary reddish discoloration in advanced stages. Acute mortalities are heavily provoked by sudden environmental shocks, including rapid temperature swings, salinity drops, and low dissolved oxygen.',
    etiology: {
      agent: 'Infectious Myonecrosis Virus (IMNV), an icosahedral non-enveloped dsRNA totivirus measuring approx. 40 nm.',
      transmissionMode: 'Horizontal transmission via cannibalism of infected moribund shrimp and waterborne viral transmission; vertical transmission via infected broodstock.',
      incubationPeriod: '7 to 14 days; overt white muscle lesions appear rapidly following acute environmental stress.',
      mortalityRate: 'Persistent cumulative mortality: 40% to 70% over several weeks if environmental stress continues.',
      targetTissue: 'Skeletal striated abdominal muscle, lymphoid organ, heart, and hemocytes.'
    },
    grossPathology: {
      fieldSigns: [
        'Pathognomonic sign: Focal to extensive chalky-white, opaque discoloration of abdominal muscle segments (especially 4th, 5th, and 6th segments) resembling cooked meat.',
        'Tail fan (uropods and telson) becomes intensely necrotic, red, and eroded.',
        'Shrimp exhibiting severe tail cramping: abdomen bent rigidly beneath the cephalothorax, unable to swim straight.'
      ],
      trayObservations: [
        'Check trays show shrimp with distinctly opaque white tails, struggling to maintain equilibrium.',
        'Feed consumption drops moderately (20% to 40%).',
        'Dead shrimp on trays exhibit rigid, contracted white musculature.'
      ],
      dissectionSigns: [
        'Dissected abdominal muscle is brittle, opaque, and exhibits coagulative necrosis with loss of translucency.',
        'Lymphoid organ is dramatically hypertrophied (up to 3x normal size) and spheroidal.',
        'Hepatopancreas remains relatively unaffected in early stages, showing the disease is primarily muscular.'
      ]
    },
    microscopicDiagnosis: {
      wetMount: 'Squash mount of necrotic muscle fibers reveals loss of normal cross-striations, granular myofibrillar degeneration, and massive hemocytic infiltration.',
      stainingMethods: 'H&E staining shows pathognomonic perinuclear pale basophilic viral inclusion bodies within striated muscle fibers and lymphoid organ spheroids.',
      pcrPrimers: 'OIE standard nested RT-PCR: External primers (459 F/R) and Internal primers (371 F/R) amplifying definitive diagnostic amplicons.',
      histopathology: 'Extensive coagulative myonecrosis, hemocytic encapsulation, myophagia, and secondary melanization.'
    },
    waterQualityTriggers: [
      { param: 'Sudden Salinity Drop', dangerThreshold: '> 4 ppt drop in 12 hours (post-downpour)', impact: 'Causes acute osmoregulatory shock that triggers massive viral replication and muscle cramping.' },
      { param: 'Water Temperature Fluctuations', dangerThreshold: '> 3.5°C swing in 24 hours', impact: 'Induces severe metabolic stress, causing rapid muscle tissue opacity.' },
      { param: 'Dissolved Oxygen Depletion', dangerThreshold: '< 3.0 mg/L', impact: 'Deprives contracting muscle fibers of oxygen, accelerating lactic acidosis and viral necrosis.' }
    ],
    differentialDiagnosis: [
      {
        lookAlikeCondition: 'Idiopathic Muscle Cramp / Temperature Shock',
        keyDifferences: 'Non-viral environmental muscle cramp shows temporary opacity that resolves within hours when water temperature stabilizes and minerals are added. IMNV produces permanent, progressive coagulative necrosis with high mortality.',
        distinguishingTest: 'Nested RT-PCR for IMNV.'
      },
      {
        lookAlikeCondition: 'White Tail Disease / MrNV (Macrobrachium rosenbergii Nodavirus)',
        keyDifferences: 'MrNV primarily affects freshwater scampi (M. rosenbergii). IMNV affects marine/brackish Litopenaeus vannamei.',
        distinguishingTest: 'MrNV RT-PCR vs IMNV RT-PCR.'
      }
    ],
    caaBiologicalProtocol: [
      {
        stepNumber: 1,
        title: 'Emergency Electrolyte & Mineral Rebalancing with Next Min',
        feedDose: 'Maintain reduced feed ration (60%).',
        waterDose: 'Apply Next Min @ 10 Kg/Acre immediately during night aeration.',
        timing: 'Hour 0',
        rationale: 'Supplies bioavailable Potassium ($K^+$), Magnesium ($Mg^{2+}$), and Calcium ($Ca^{2+}$) to stabilize neuromuscular membrane potentials and reverse muscle cramping.'
      },
      {
        stepNumber: 2,
        title: 'Systemic Antiviral Suppression with Next Viro Nill',
        feedDose: 'Administer Next Gut @ 15 ml/kg feed with marine binder.',
        waterDose: 'Broadcast Next Viro Nill @ 1.5 to 2.0 Litres/Acre at 08:00 AM.',
        timing: 'Day 2 and Day 4',
        rationale: 'Interrupts viral capsid assembly and clears secondary opportunistic bacterial septicemia.'
      },
      {
        stepNumber: 3,
        title: 'Cellular Tissue Repair with Next Food Pro',
        feedDose: 'Top-dress Next Food Pro @ 15 g/kg feed for 10 consecutive days.',
        waterDose: 'Apply Next Pro Plus @ 1 Kg/Acre on Day 5.',
        timing: 'Day 3 through Day 12',
        rationale: 'Supplies highly bioavailable amino acids and vitamins to stimulate myofibrillar protein synthesis and heal necrotic muscle fibers.'
      }
    ],
    recommendedProductSlug: 'next-min',
    recommendedProductName: 'Next-Min (Bioavailable Macro & Trace Mineral Matrix)',
    secondaryProductSlug: 'next-viro-nill',
    secondaryProductName: 'Next Viro Nill (Bio-Active Viricide & Bacteriostat)',
    faqs: [
      {
        question: 'Can IMNV be confused with regular muscle cramping from cast netting?',
        answer:
          'Yes. Physical stress during cast netting on hot days can cause temporary muscle cramping and slight cloudiness. However, physical cramp relaxes within 15–30 minutes once placed in aerated bucket water. IMNV white muscle is permanent, chalky white, and spreads progressively down the abdominal tail segments.'
      },
      {
        question: 'How do potassium and magnesium prevent mortality during IMNV outbreaks?',
        answer:
          'Potassium ($K^+$) and magnesium ($Mg^{2+}$) are essential cofactors for cellular Na+/K+ ATPase and calcium-ATPase pumps. In low-salinity waters, mineral depletion causes muscle tetany, hyper-contraction, and muscle fiber tearing, precipitating acute viral flare-ups. Supplementing Next Min maintains cellular membrane stability.'
      }
    ],
    academicReferences: [
      'Poulos, B. T. et al. (2006). Purification and characterization of infectious myonecrosis virus of penaeid shrimp. Journal of General Virology, 87(4), 987–996.',
      'Lightner, D. V. et al. (2004). Historic emergence, impact and current status of shrimp pathogens in the Americas. Journal of Invertebrate Pathology, 110(2), 174–183.',
      'Senapin, S. et al. (2007). In situ hybridization and RT-PCR detection of infectious myonecrosis virus in Penaeus vannamei. Diseases of Aquatic Organisms, 77(1), 79–87.'
    ]
  },
  {
    slug: 'zoothamnium-ciliate-fouling',
    name: 'Zoothamnium & Epibiont Ciliate Protozoan Fouling',
    scientificName: 'Ectocommensal Peritrich Ciliate Infestation (Zoothamnium, Epistylis, Vorticella)',
    pathogenType: 'Protozoan',
    severity: 'ENVIRONMENTAL HAZARD',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon',
    metaTitle: 'Zoothamnium & Ciliate Fouling in Shrimp | Epibiont Cure Protocol',
    metaDescription: 'Clinical guide to Zoothamnium, Epistylis, and Vorticella ciliate protozoan fouling in shrimp. Ecdysis molt induction, water clarification, and biological treatment.',
    keywords: [
      'zoothamnium shrimp disease',
      'epibiont fouling shrimp vannamei',
      'fuzzy moss shrimp gills cure',
      'epistylis protozoan prawn treatment',
      'shrimp ecdysis molting induction',
      'CAA approved ciliate medicine',
      'Next Remedy bloom balancer'
    ],
    teluguName: 'రొయ్యల నాచు / పరాన్నజీవుల బూజు వ్యాధి (జూతామ్నియం) నివారణ',
    teluguDescription: 'రొయ్యల మొప్పలు మరియు శరీర పైభాగంలో నాచులా పేరుకుపోయే జూతామ్నియం, ఎపిస్టైలిస్ పరాన్నజీవులను తొలగించే బయో-క్లీనింగ్ విధానం.',
    clinicalOverview:
      'Zoothamnium, Epistylis, and Vorticella are sessile, colonial peritrichous ciliated protozoans that attach ectocommensally to the exoskeleton, eyes, appendages, and branchial lamellae of cultured penaeid shrimp. While these protozoans do not invade internal host tissues directly, dense colonies form a thick, fuzzy, moss-like carpet over the gills and cuticle. This fouling traps suspended organic detritus, severely impairs branchial gas exchange, impedes swimming motility, and prevents successful ecdysis molting, leading to widespread suffocation during low-DO periods.',
    etiology: {
      agent: 'Peritrichous ciliated protozoans (Zoothamnium spp., Epistylis spp., Vorticella spp., and suctorian Acineta spp.).',
      transmissionMode: 'Waterborne transmission of motile free-swimming telotroch stages; thrives in ponds with high organic loading and low water exchange.',
      incubationPeriod: '3 to 7 days in eutrophic, organic-rich pond water.',
      mortalityRate: 'Low direct mortality (5% to 15%), but severe mortality (> 50%) occurs during nocturnal DO dips or failed molting.',
      targetTissue: 'Branchial lamellae (gills), cephalothoracic cuticle, swimming pleopods, and eyestalks.'
    },
    grossPathology: {
      fieldSigns: [
        'Shrimp appear coated with a fuzzy, velvety, grayish-white or mossy-green growth over the carapace and legs.',
        'Shrimp feel slippery or soapy when held; antennae and pleopods stick together.',
        'Lethargy and gathering around paddlewheel aerator wakes where water current is strongest.'
      ],
      trayObservations: [
        'Check trays show shrimp with distinctly dirty, muddy-looking gills and appendages.',
        'Feeding activity drops by 20% to 35% as shrimp spend excessive energy grooming appendages.',
        'Freshly molted exuviae covered with dense white fuzzy colonies.'
      ],
      dissectionSigns: [
        'Branchial cavity contains dense grayish-green fibrous colonies matting the delicate gill lamellae together.',
        'Internal organs (hepatopancreas, gut, heart) appear completely normal, confirming an external ectocommensal problem.',
        'No tissue necrosis under the cuticle unless complicated by secondary bacterial vibriosis.'
      ]
    },
    microscopicDiagnosis: {
      wetMount: 'Microscopic examination of fresh gill or appendage clippings at 100x and 400x reveals pathognomonic inverted bell-shaped zooids mounted on branching, contractile stalks.',
      stainingMethods: 'Lugol’s iodine or methyl green staining highlights the horseshoe-shaped macronucleus and rhythmic ciliary beating of the peristome.',
      pcrPrimers: 'N/A (Identified instantly via light microscopy).',
      histopathology: 'Superficial attachment of protozoan stalk adhesive discs to the cuticular epicuticle without penetration into the underlying hypodermal epithelium.'
    },
    waterQualityTriggers: [
      { param: 'Organic Matter / BOD', dangerThreshold: 'High dissolved organic carbon (> 25 mg/L)', impact: 'Supplies massive bacterial food supply fueling rapid protozoan colony multiplication.' },
      { param: 'Water Exchange / Dilution', dangerThreshold: 'Zero water replenishment for > 20 days', impact: 'Accumulates ciliate telotroch swarmer stages in the water column.' },
      { param: 'Dissolved Oxygen', dangerThreshold: '< 4.0 mg/L', impact: 'Suffocates shrimp whose gill gas exchange surface is already 50% physically blocked by ciliate stalks.' }
    ],
    differentialDiagnosis: [
      {
        lookAlikeCondition: 'Filamentous Bacterial Gill Disease (Leucothrix mucor)',
        keyDifferences: 'Filamentous bacteria appear as long, non-branching, non-contractile thread-like filaments under 400x. Zoothamnium displays distinct bell-shaped bodies on contractile stalks that retract rapidly when disturbed.',
        distinguishingTest: 'Microscopic wet mount at 400x observing contractile stalks.'
      },
      {
        lookAlikeCondition: 'Algal Epibiont Fouling (Diatoms / Cyanobacteria)',
        keyDifferences: 'Algal fouling produces green or brown coloration and shows distinct photosynthetic cellular pigmentation under light microscopy without animal motility.',
        distinguishingTest: 'Absence of photosynthetic chloroplasts in protozoan ciliates.'
      }
    ],
    caaBiologicalProtocol: [
      {
        stepNumber: 1,
        title: 'Water Column Organic Flocculation with Next Remedy',
        feedDose: 'Maintain normal feed schedule.',
        waterDose: 'Apply Next Remedy @ 2 Litres/Acre mixed with 50 Litres pond water directly into aerator currents.',
        timing: 'Day 1 at 09:00 AM',
        rationale: 'Flocculates suspended organic detritus and bacteria, cutting off the primary food source of epibiont ciliates.'
      },
      {
        stepNumber: 2,
        title: 'Stimulate Synchronized Ecdysis Molting with Next Softner',
        feedDose: 'Administer Next Min @ 15 g/kg feed.',
        waterDose: 'Apply Next Softner @ 2.5 Litres/Acre at 08:00 PM.',
        timing: 'Day 2 at night',
        rationale: 'Softens hard water tension and induces a clean, synchronized pond-wide molting cycle, allowing shrimp to shed 100% of the fouled cuticle and gills.'
      },
      {
        stepNumber: 3,
        title: 'Rapid Post-Molt Shell Hardening with Next Min',
        feedDose: 'Continue Next Min @ 10 g/kg feed for 5 days.',
        waterDose: 'Apply Next Min @ 5 Kg/Acre into pond water at night.',
        timing: 'Day 3 at 10:00 PM',
        rationale: 'Supplies bioavailable ionic minerals to harden the new, clean cuticle within 4 hours, preventing re-infestation.'
      }
    ],
    recommendedProductSlug: 'next-remedy',
    recommendedProductName: 'Next Remedy (Water Clarifier & Bloom Balancer)',
    secondaryProductSlug: 'next-min',
    secondaryProductName: 'Next-Min (Bioavailable Macro & Trace Mineral Matrix)',
    faqs: [
      {
        question: 'Should copper sulfate or formalin be used to kill Zoothamnium in shrimp ponds?',
        answer:
          'Never use toxic formalin or copper sulfate! Formalin is a known carcinogen banned by export regulators, and copper accumulates in sediment and permanently stunts shrimp growth. The safest and most effective biological protocol is to induce clean ecdysis molting using Next Softner and Next Remedy, which causes shrimp to naturally shed the fouled shell within 24 hours.'
      },
      {
        question: 'Does Zoothamnium directly eat shrimp flesh?',
        answer:
          'No. Zoothamnium is an ectocommensal organism that feeds exclusively on free-swimming waterborne bacteria and suspended organic particles. However, the physical blockage it causes over gill lamellae prevents oxygen absorption, which suffocates the shrimp.'
      }
    ],
    academicReferences: [
      'Couch, J. A. (1978). Diseases, parasites, and toxic responses of commercial penaeid shrimps of the Gulf of Mexico and South Atlantic coasts of North America. Fishery Bulletin, 76(1), 1–44.',
      'Overstreet, R. M. (1973). Parasites of some Penaeid Shrimps with emphasis on species from the Gulf of Mexico. Gulf Research Reports, 4(2), 168–202.',
      'Lightner, D. V. (1996). A Handbook of Shrimp Pathology and Diagnostic Procedures for Diseases of Cultured Penaeid Shrimp. World Aquaculture Society, Baton Rouge, LA.'
    ]
  }
];

export function getDiseaseBySlug(slug: string): DiseaseMonograph | undefined {
  return DISEASE_MONOGRAPHS.find((d) => d.slug === slug);
}
