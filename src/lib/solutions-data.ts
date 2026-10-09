export interface SolutionFaq {
  question: string;
  answer: string;
}

export interface DayProtocol {
  day: string;
  feedApplication: string;
  waterApplication: string;
  notes: string;
}

export interface SolutionPageData {
  slug: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  diseaseName: string;
  tagline: string;
  severityLevel: 'CRITICAL - EMERGENCY' | 'HIGH ALERT' | 'CHRONIC PROGRESSION' | 'SEASONAL RISK';
  affectedSpecies: string;
  primaryProductSlug: string;
  secondaryProductSlug?: string;
  symptoms: string[];
  rootCauses: string[];
  dayProtocol: DayProtocol[];
  dosageGuide: {
    feedDose: string;
    waterDose: string;
    frequency: string;
    timing: string;
  };
  farmerCaseStudy: {
    farmerName: string;
    location: string;
    pondSize: string;
    result: string;
  };
  faqs: SolutionFaq[];
}

export const SOLUTIONS: SolutionPageData[] = [
  {
    slug: 'white-gut-treatment-shrimp',
    targetKeyword: 'White Gut Medicine for Shrimp',
    secondaryKeywords: [
      'white gut treatment in shrimp pond',
      'shrimp white gut cure',
      'vannamei white feces treatment',
      'white feces disease in shrimp medicine',
      'how to cure white gut in prawn',
      'best medicine for white gut in vannamei',
      'white gut shrimp probiotic',
      'white feces syndrome in shrimp',
      'EHP and white gut treatment'
    ],
    metaTitle: 'White Gut Medicine for Shrimp & Vannamei | 100% Antibiotic-Free Next Gut',
    metaDescription:
      'Searching for the best white gut medicine for shrimp? Eliminate white feces disease, restore hepatopancreas, and restart feeding in 3-5 days with CAA-approved Next Gut probiotic. No antibiotics.',
    diseaseName: 'White Gut Disease & White Feces Syndrome (WFS)',
    tagline: 'Rapid Enteric Restoration & Pathogen Cleansing for Penaeus vannamei and Monodon',
    severityLevel: 'CRITICAL - EMERGENCY',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon (Black Tiger)',
    primaryProductSlug: 'next-gut',
    secondaryProductSlug: 'next-viro-nill',
    symptoms: [
      'Floating white vermiform fecal strings on pond water surface and check trays.',
      'Pale, empty midgut visible through transparent shrimp abdominal cuticle.',
      'Hepatopancreas shrinkage, dark-to-pale yellow discoloration, and tubular atrophy.',
      'Sudden feed consumption drop of 30% to 60% within 48 to 72 hours.',
      'Loose shell, sluggish swimming along dikes, and secondary Vibrio mortalities.'
    ],
    rootCauses: [
      'Pathogenic blooms of Vibrio parahaemolyticus and Vibrio cholerae in gut microflora.',
      'Co-infection with Enterocytozoon hepatopenaei (EHP) microsporidian spores.',
      'Sloughing of transformed microvilli (aggregated transformed microvilli - ATM).',
      'Ingestion of blue-green toxic algae (Microcystis) or decomposed benthic sludge.'
    ],
    dayProtocol: [
      {
        day: 'Day 1',
        feedApplication: 'Mix Next Gut @ 20 mL/kg feed with quality binder in morning & evening feeds.',
        waterApplication: 'Broadcast Next Viro Nill @ 1.5 L/Acre with aerators running.',
        notes: 'Cut total feeding by 30% to reduce unconsumed organic waste in pond.'
      },
      {
        day: 'Day 2',
        feedApplication: 'Continue Next Gut @ 20 mL/kg feed in 2 main meals.',
        waterApplication: 'Test morning dissolved oxygen and TAN ammonia levels.',
        notes: 'Check trays: white fecal strings will turn pale brown and decrease.'
      },
      {
        day: 'Day 3',
        feedApplication: 'Next Gut @ 15 mL/kg feed; shrimp gut line starts showing dark feed fill.',
        waterApplication: 'Apply second dose of Next Viro Nill @ 1.0 L/Acre if bottom is turbid.',
        notes: 'Feed intake starts recovering; hepatopancreas shows lipid replenishment.'
      },
      {
        day: 'Day 4 - 5',
        feedApplication: 'Maintain Next Gut @ 10 mL/kg feed until 100% normal feed intake resumes.',
        waterApplication: 'Apply pond bottom sludge digester (Next Sludge) to clear dropped feces.',
        notes: 'Full recovery observed with zero antibiotic residue or export rejection risks.'
      }
    ],
    dosageGuide: {
      feedDose: '15 to 20 mL per kg of pellet feed with binder',
      waterDose: '1.0 to 1.5 Liters per Acre water broadcast (Next Viro Nill)',
      frequency: 'Twice daily for 5 continuous days',
      timing: 'Morning (6:30 AM) and Afternoon (4:30 PM) feed rations'
    },
    farmerCaseStudy: {
      farmerName: 'K. Subba Rao',
      location: 'Bhimavaram, West Godavari, Andhra Pradesh',
      pondSize: '3.5 Acre Vannamei Pond (DOC 52)',
      result:
        'Experienced 50% feed drop with heavy white fecal strings across all 4 check trays. Administered Next Gut @ 20ml/kg feed and Next Viro Nill in water. By Day 4, white feces completely vanished, feed intake restored to 100%, and shrimp gained 1.4g weekly average without antibiotics.'
    },
    faqs: [
      {
        question: 'Which is the best white gut medicine for shrimp in India?',
        answer:
          'Next Gut is widely regarded by coastal aquaculture technicians as the premier biological treatment for white gut and white feces syndrome. Unlike banned antibiotics, Next Gut deploys high-potency lactic acid bacteria (Citrobacter freundii, Lactobacillus, Saccharomyces cerevisiae @ 10 Billion CFU/g) that colonize the gut lining, competitively exclude pathogenic Vibrio, and enzymatically heal the hepatopancreas.'
      },
      {
        question: 'How quickly does white gut cure with Next Gut?',
        answer:
          'In commercial shrimp ponds, feed intake begins recovering within 48 to 72 hours. White floating fecal strings typically disappear between Day 3 and Day 5 of the protocol.'
      },
      {
        question: 'Can I use antibiotics like Enrofloxacin or Oxytetracycline for white gut?',
        answer:
          'Strictly NO. Antibiotics are banned by the Coastal Aquaculture Authority (CAA) and MPEDA, cause severe hepatopancreas toxicity, lead to antimicrobial resistance, and result in export container rejections. Next Farm Bio Sciences provides 100% legal, CAA-approved, antibiotic-free biotechnology.'
      },
      {
        question: 'What is the price of white gut medicine Next Gut?',
        answer:
          'Next Gut is priced transparently at Rs. 1,199 for the 1-Liter Precision Bottle and Rs. 5,000 for the 5-Liter Commercial Canister with direct express farm delivery across Andhra Pradesh, Tamil Nadu, and Odisha.'
      }
    ]
  },
  {
    slug: 'ammonia-control-shrimp-pond',
    targetKeyword: 'Ammonia Reducer in Shrimp Pond',
    secondaryKeywords: [
      'how to reduce ammonia in shrimp pond',
      'shrimp pond ammonia treatment medicine',
      'nitrite control in prawn pond',
      'ammonia gas problem in vannamei culture',
      'best ammonia remover for aquaculture',
      'toxic ammonia TAN remover pond',
      'nitrite NO2 reducer prawn'
    ],
    metaTitle: 'Ammonia & Nitrite Reducer for Shrimp Pond | Next Converter Fast Action',
    metaDescription:
      'High ammonia (NH3) or toxic nitrite (NO2) killing shrimp? Next Converter neutralizes lethal TAN levels within 24 hours using live nitrifying bacteria. 5L @ Rs. 5,000.',
    diseaseName: 'Toxic Ammonia (NH3) & Nitrite (NO2) Poisoning',
    tagline: 'High-Speed Biological Nitrogen Gas Conversion & TAN Neutralization',
    severityLevel: 'CRITICAL - EMERGENCY',
    affectedSpecies: 'Penaeus vannamei, Penaeus monodon, Scampi, Freshwater Fish',
    primaryProductSlug: 'next-converter',
    secondaryProductSlug: 'next-pro',
    symptoms: [
      'Shrimp swimming erratically near pond surface or water aerators at dawn.',
      'Gills turning brown, black, or congested with mucus from nitrite burns.',
      'Water color changing to dark cloudy brownish-green with sharp pungent odor.',
      'Test kit showing Total Ammonia Nitrogen (TAN) > 1.0 ppm and Nitrite (NO2) > 0.5 ppm.',
      'Sudden mortality spikes during molting cycles.'
    ],
    rootCauses: [
      'Over-feeding and unconsumed high-protein pellet feed decomposing on the pond bottom.',
      'Heavy accumulation of shrimp fecal matter in low-circulation anaerobic dead zones.',
      'Sudden phytoplankton algae crash releasing massive organic decomposition load.',
      'High pond water pH (> 8.3) shifting harmless ammonium (NH4+) into lethal free unionized ammonia gas (NH3).'
    ],
    dayProtocol: [
      {
        day: 'Hour 0 - 6',
        feedApplication: 'Immediately slash feeding by 40% to stop raw protein nitrogen input.',
        waterApplication: 'Apply Next Converter @ 2.0 to 3.0 Liters per Acre during morning aeration.',
        notes: 'Turn on all paddlewheel aerators to drive dissolved oxygen above 5.0 ppm.'
      },
      {
        day: 'Hour 24',
        feedApplication: 'Resume light feeding with vitamin C / gut support.',
        waterApplication: 'Retest TAN and NO2. Ammonia drops by 60% to 80% as Nitrosomonas colonize.',
        notes: 'Shrimp resume normal benthic grazing behavior.'
      },
      {
        day: 'Hour 48 - 72',
        feedApplication: 'Gradually scale feed back to normal schedule based on check tray clearance.',
        waterApplication: 'Apply 1.0 L/Acre Next Pro to maintain stable water column microbiome.',
        notes: 'Nitrite converts completely into non-toxic nitrate (NO3).'
      }
    ],
    dosageGuide: {
      feedDose: 'Cut feeding by 30-50% during acute ammonia spike',
      waterDose: '2.0 to 3.0 Liters per Acre (Curative); 1.0 L/Acre every 10 days (Preventive)',
      frequency: 'Single heavy curative broadcast; repeat after 48h if TAN remains above 1.0 ppm',
      timing: 'Between 8:00 AM and 10:00 AM with aerators running'
    },
    farmerCaseStudy: {
      farmerName: 'M. Venkat Rao',
      location: 'Narsapur, West Godavari, Andhra Pradesh',
      pondSize: '2.5 Acre High-Density Vannamei (DOC 65)',
      result:
        'Pond water TAN ammonia spiked to 3.5 ppm after heavy rain with shrimp gathering near aerators. Broadcasted 5 Liters of Next Converter across 2.5 acres. Within 24 hours, TAN dropped to 0.4 ppm and shrimp mortality ceased immediately.'
    },
    faqs: [
      {
        question: 'How fast does Next Converter reduce ammonia in shrimp ponds?',
        answer:
          'Next Converter contains pre-activated autotrophic nitrifying consortia (Nitrosomonas and Nitrobacter @ 4 Billion CFU/ml) that start converting unionized toxic ammonia into nitrite and non-toxic nitrate within 6 to 12 hours of broadcast, achieving safe TAN levels within 24 to 36 hours.'
      },
      {
        question: 'Does zeolite powder work better than ammonia reducer probiotic?',
        answer:
          'Zeolite only physically binds ammonia temporarily and gets saturated within 12 hours, releasing ammonia back when agitated. Biological converters like Next Converter permanently transform ammonia molecules into harmless nitrogen compounds through active bacterial nitrification.'
      },
      {
        question: 'What is the dosage of Next Converter per acre?',
        answer:
          'For active toxic spikes above 1.0 ppm TAN, apply 2.0 to 3.0 Liters per Acre. For regular weekly maintenance from DOC 30 onwards, apply 500 mL to 1.0 Liter per Acre every 7 to 10 days.'
      }
    ]
  },
  {
    slug: 'vibrio-red-disease-cure-shrimp',
    targetKeyword: 'Vibrio Medicine for Shrimp',
    secondaryKeywords: [
      'vibrio control in shrimp ponds',
      'red disease in shrimp treatment',
      'vibrio parahaemolyticus treatment in vannamei',
      'green vibrio medicine for prawn',
      'yellow vibrio in shrimp pond',
      'glowing shrimp treatment night',
      'AHPND EMS cure shrimp'
    ],
    metaTitle: 'Vibrio & Red Disease Medicine for Shrimp | Next Vibriosis Antagonist',
    metaDescription:
      'High green/yellow Vibrio counts or Red Disease in your shrimp pond? Next Vibriosis suppresses Vibrio parahaemolyticus & harveyi using antagonistic probiotics. 5L @ Rs. 5,000.',
    diseaseName: 'Vibriosis, Red Disease & Luminescent Bacterial Infection',
    tagline: 'Targeted Antagonistic Biocontrol Against Pathogenic Vibrio Species',
    severityLevel: 'CRITICAL - EMERGENCY',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon',
    primaryProductSlug: 'next-vibriosis',
    secondaryProductSlug: 'next-viro-nill',
    symptoms: [
      'Shrimp developing reddish appendages, red body pigmentation, and red uropods/telson.',
      'Luminescent glowing in pond water or dead shrimp at night (Vibrio harveyi).',
      'Green Vibrio colonies exceeding 1 x 10^3 CFU/ml on TCBS agar plate tests.',
      'Melanized black necrotic lesions on exoskeleton, tail rot, and antennal breakage.',
      'Lethargy and mass mortality during molting cycles.'
    ],
    rootCauses: [
      'High organic benthic load creating breeding grounds for Vibrio parahaemolyticus.',
      'Sudden drop in salinity or temperature shock weakening shrimp immune defenses.',
      'Use of harsh chemical disinfectants that wipe out good bacteria and trigger virulent Vibrio rebound.',
      'Contaminated post-larvae (PL) carrying sub-clinical bacterial infections.'
    ],
    dayProtocol: [
      {
        day: 'Day 1',
        feedApplication: 'Feed Next Vibriosis @ 15 mL/kg feed coated with binder in all feed trays.',
        waterApplication: 'Broadcast Next Vibriosis @ 1.5 L/Acre mixed with 20L water across pond dikes.',
        notes: 'Discontinue chemical sanitizers to allow competitive probiotic colonization.'
      },
      {
        day: 'Day 2',
        feedApplication: 'Continue 15 mL/kg feed in morning and evening rations.',
        waterApplication: 'Maintain vigorous aeration to support probiotic aerobic metabolism.',
        notes: 'Red discoloration on appendages begins fading to natural translucent hue.'
      },
      {
        day: 'Day 3 - 4',
        feedApplication: 'Reduce feed dose to 10 mL/kg feed.',
        waterApplication: 'Retest water sample on TCBS plate; green Vibrio drops by 90%.',
        notes: 'Shrimp antenna regeneration and active feeding resumption.'
      }
    ],
    dosageGuide: {
      feedDose: '15 mL per kg feed (Curative); 5-10 mL/kg (Preventive)',
      waterDose: '1.0 to 1.5 Liters per Acre water broadcast',
      frequency: 'Daily in feed for 4-5 days; water application on Day 1 & Day 3',
      timing: 'Morning feeding and morning water broadcast'
    },
    farmerCaseStudy: {
      farmerName: 'G. Subba Reddy',
      location: 'Kavali, Nellore, Andhra Pradesh',
      pondSize: '4.0 Acre Brackish Water Pond',
      result:
        'TCBS lab test showed green Vibrio at 4,200 CFU/ml with shrimp developing red tail and dying in corners. Broadcasted Next Vibriosis and coated feed for 4 days. Green Vibrio plummeted below 200 CFU/ml with zero further mortality.'
    },
    faqs: [
      {
        question: 'What is the best medicine for green Vibrio in vannamei shrimp?',
        answer:
          'Next Vibriosis is the industry-standard biological antagonist. It produces bacteriocins and organic acids that specifically eliminate pathogenic green Vibrio (V. parahaemolyticus and V. alginolyticus) without harming beneficial microalgae.'
      },
      {
        question: 'Why do chemical sanitizers fail to control Vibrio?',
        answer:
          'Chemical sanitizers (bleaching powder, BKC, glutaraldehyde) kill all beneficial microbes in the pond. Because Vibrio grows three times faster than other bacteria, it repopulates within 48 hours with higher virulence. Probiotics like Next Vibriosis use competitive exclusion to permanently occupy biological niches.'
      }
    ]
  },
  {
    slug: 'black-soil-sludge-digester-pond',
    targetKeyword: 'Pond Bottom Sludge Digester',
    secondaryKeywords: [
      'black soil problem in shrimp pond',
      'best sludge digester for prawn pond',
      'pond bottom cleaner probiotic',
      'how to remove black mud in shrimp pond',
      'sludge eating bacteria for aquaculture',
      'hydrogen sulfide h2s in shrimp pond',
      'benthic soil conditioner shrimp'
    ],
    metaTitle: 'Black Soil & Sludge Digester for Shrimp Ponds | Next Sludge Probiotic',
    metaDescription:
      'Black stinking mud and anaerobic sludge on pond bottom? Next Sludge digests decomposing feed and feces, eliminating toxic H2S gas. 5L @ Rs. 5,000.',
    diseaseName: 'Benthic Anaerobic Sludge & Black Mud Toxicity',
    tagline: 'Enzymatic Deep-Bed Digestion of Accumulated Organic Bottom Detritus',
    severityLevel: 'HIGH ALERT',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon, Fresh Water Prawn',
    primaryProductSlug: 'next-sludge',
    secondaryProductSlug: 'next-converter',
    symptoms: [
      'Black rotten mud and foul-smelling sulfur odor when pulling check tray anchors.',
      'Shrimp tails and swimmerets covered in black stains or rusty deposits.',
      'Bubbles of hydrogen sulfide (H2S) gas rising to pond surface on sunny afternoons.',
      'Shrimp avoiding bottom center feeding zones and congregating along pond edges.',
      'Slow molting and poor bottom feed conversion.'
    ],
    rootCauses: [
      'Continuous accumulation of unconsumed shrimp feed pellets over 40+ DOC.',
      'High shrimp stocking density generating hundreds of kilograms of fecal waste.',
      'Inadequate aeration leaving pond floor central dead zones anaerobic (oxygen < 1 ppm).',
      'Accumulation of dead microalgae sediment after plankton crashes.'
    ],
    dayProtocol: [
      {
        day: 'Day 1',
        feedApplication: 'Normal feeding with strict feeding tray monitoring.',
        waterApplication: 'Apply Next Sludge @ 2.0 Liters per Acre mixed with sand or pond water.',
        notes: 'Broadcast directly over bottom feeding areas and center sludge zones.'
      },
      {
        day: 'Day 3',
        feedApplication: 'Normal feeding.',
        waterApplication: 'Inspect bottom soil core; black soil thickness noticeably shrinks.',
        notes: 'Foul sulfur odor diminishes as Bacillus enzymes digest organic lignin & proteins.'
      },
      {
        day: 'Day 7',
        feedApplication: 'Normal feeding.',
        waterApplication: 'Apply maintenance dose of Next Sludge @ 1.0 L/Acre.',
        notes: 'Pond floor returns to healthy light brown sandy texture.'
      }
    ],
    dosageGuide: {
      feedDose: 'Not applied in feed (water & soil broadcast only)',
      waterDose: '1.5 to 2.0 Liters per Acre (Heavy Sludge); 1.0 L/Acre every 10-14 days',
      frequency: 'Every 10 to 14 days throughout culture cycle',
      timing: 'Mid-morning (9:00 AM - 11:00 AM) with aerators operating'
    },
    farmerCaseStudy: {
      farmerName: 'T. Rajesh',
      location: 'Machilipatnam, Krishna District, Andhra Pradesh',
      pondSize: '3.0 Acre Pond (DOC 70)',
      result:
        'Bottom soil core showed 6 inches of foul black mud with H2S gas bubbles causing shrimp feed refusal. Applied Next Sludge @ 2 Liters/Acre. Within 5 days, sludge depth reduced by over 60%, black discoloration cleared, and feed trays cleared completely.'
    },
    faqs: [
      {
        question: 'How does Next Sludge digest black mud without draining pond water?',
        answer:
          'Next Sludge utilizes a multi-strain consortium of facultative anaerobic Bacillus, Bacillus megaterium, and fungal cellulase/protease enzymes that penetrate deep into bottom mud pores, enzymatically breaking complex proteins and lipids into harmless carbon dioxide and water.'
      },
      {
        question: 'Can I mix Next Sludge with zeolite or dry sand?',
        answer:
          'Yes. Mixing Next Sludge with clean dry sand helps the heavy granules carry beneficial bacteria directly to the benthic mud layer instead of dispersing in the top water layer.'
      }
    ]
  },
  {
    slug: 'soft-shell-molting-cramps-shrimp',
    targetKeyword: 'Soft Shell Treatment for Shrimp',
    secondaryKeywords: [
      'soft shell disease in vannamei treatment',
      'loose shell syndrome in shrimp',
      'shrimp molting cramps treatment',
      'calcium magnesium minerals for vannamei',
      'how to harden shrimp shell fast',
      'mineral deficiency in prawn pond',
      'muscle cramp in vannamei shrimp'
    ],
    metaTitle: 'Soft Shell & Molting Cramps Medicine for Shrimp | Next-Min Minerals',
    metaDescription:
      'Vannamei shrimp suffering from soft shell, loose shell, or muscle cramps during molt? Next-Min provides bio-available ionic Ca, Mg, P, K for rapid shell hardening in 24h.',
    diseaseName: 'Soft Shell Syndrome & Post-Molt Muscle Cramping',
    tagline: 'Rapid Bioavailable Ionic Macrominerals for Cuticle Sclerotization',
    severityLevel: 'HIGH ALERT',
    affectedSpecies: 'Penaeus vannamei, Penaeus monodon',
    primaryProductSlug: 'next-min',
    secondaryProductSlug: 'next-softner',
    symptoms: [
      'Shrimp shell remaining thin, papery, and soft for more than 48 hours after molting.',
      'Opaque white cramping of tail muscle and curved, rigid spine (muscle necrosis).',
      'Loose gap between flesh and exoskeleton with high water content in meat.',
      'Cannibalism by hard-shell shrimp attacking vulnerable soft-shell molters.',
      'Mortality spikes following full moon and new moon lunar molting peaks.'
    ],
    rootCauses: [
      'Imbalance in ionic ratios: Calcium to Magnesium (Ca:Mg < 1:3) or Potassium (Na:K > 40:1).',
      'Low total alkalinity (< 100 ppm CaCO3) and low water hardness in borewell/low-salinity ponds.',
      'Sudden heavy rainfall diluting surface water salinity and draining mineral reserves.',
      'Poor mineral absorption through feed.'
    ],
    dayProtocol: [
      {
        day: 'Day 1',
        feedApplication: 'Coat Next-Min @ 15 mL/kg feed with binder in all 4 meals.',
        waterApplication: 'Broadcast Next-Min @ 2.0 Liters per Acre into water column 2 days before lunar molt.',
        notes: 'Test total alkalinity and ensure it is boosted above 120 ppm.'
      },
      {
        day: 'Day 2',
        feedApplication: 'Continue 15 mL/kg feed.',
        waterApplication: 'Shrimp molt smoothly without getting stuck in old exoskeleton.',
        notes: 'Check trays: newly molted shrimp harden within 6 to 12 hours.'
      },
      {
        day: 'Day 3',
        feedApplication: 'Reduce to 10 mL/kg feed as routine maintenance.',
        waterApplication: 'Inspect shell firmness; 100% hard, glossy shells confirmed.',
        notes: 'Zero tail cramping or cannibalism observed.'
      }
    ],
    dosageGuide: {
      feedDose: '10 to 15 mL per kg feed (Direct Gut Assimilation)',
      waterDose: '1.5 to 2.0 Liters per Acre water broadcast',
      frequency: 'Every 7 days, especially 48h before lunar molting cycles',
      timing: 'Evening hours (5:00 PM - 7:00 PM) before night molting'
    },
    farmerCaseStudy: {
      farmerName: 'Ch. Prasad Varma',
      location: 'Bapatla, Guntur District, Andhra Pradesh',
      pondSize: '5.0 Acre Low Salinity Pond (Salinity 4 ppt)',
      result:
        'Following heavy monsoon rains, 40% of shrimp had paper-thin soft shells with severe cramping during full moon molt. Administered Next-Min in feed and broadcasted 2L/Acre. Within 24 hours, shrimp shells completely hardened with zero molt mortality.'
    },
    faqs: [
      {
        question: 'Why do ordinary inorganic mineral powders fail in low salinity ponds?',
        answer:
          'Inorganic minerals (like crude lime or dolomite) have very low solubility and mostly precipitate to the pond bottom without being absorbed by shrimp. Next-Min provides chelated, ionic macrominerals that are absorbed directly through shrimp gills and gut membranes.'
      },
      {
        question: 'How quickly does Next-Min harden shrimp shell?',
        answer:
          'When fed alongside water application, shrimp cuticle sclerotization occurs within 6 to 18 hours of molting, preventing cannibalism and osmotic stress.'
      }
    ]
  },
  {
    slug: 'running-mortality-syndrome-shrimp',
    targetKeyword: 'Running Mortality in Shrimp Treatment',
    secondaryKeywords: [
      'running mortality syndrome in shrimp treatment',
      'white spot disease in shrimp prevention',
      'viral biosecurity for prawn ponds',
      'shrimp dying daily in check trays',
      'RMS treatment in vannamei',
      'WSSV biosecurity probiotic'
    ],
    metaTitle: 'Running Mortality & Viral Biosecurity for Shrimp | Next Viro Nill',
    metaDescription:
      'Facing Running Mortality Syndrome (RMS) or White Spot (WSSV) risk? Next Viro Nill destroys bottom viral vectors and boosts shrimp immune resistance. 5L @ Rs. 5,000.',
    diseaseName: 'Running Mortality Syndrome (RMS) & WSSV Viral Risk',
    tagline: 'Broad-Spectrum Microbial Biosecurity & Viral Vector Elimination',
    severityLevel: 'CRITICAL - EMERGENCY',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon',
    primaryProductSlug: 'next-viro-nill',
    secondaryProductSlug: 'next-gut',
    symptoms: [
      'Persistent daily mortalities of 10 to 50 shrimp per pond from DOC 35 to 70.',
      'Dead shrimp appearing on pond dikes and in cast nets with no single obvious symptom.',
      'Faint white spots under carapace (White Spot Syndrome Virus warning sign).',
      'Shrimp swimming sluggishly along water surface and edges of aeration lines.',
      'Hepatopancreas pale with secondary bacterial infection.'
    ],
    rootCauses: [
      'Low-grade viral complexes (IHHNV, HPV, or sub-acute WSSV) compromising immune resilience.',
      'Organic bottom sludge harboring viral particles and infected crab/carrier vectors.',
      'Sudden climatic fluctuations (heavy overcast skies, sudden drop in pond water temperature).',
      'Immune collapse due to poor water quality.'
    ],
    dayProtocol: [
      {
        day: 'Day 1',
        feedApplication: 'Mix Next Gut @ 20 mL/kg feed with immune stimulants.',
        waterApplication: 'Broadcast Next Viro Nill @ 2.0 Liters per Acre during morning aeration.',
        notes: 'Stop all chemical applications; boost paddlewheel aeration to maximum capacity.'
      },
      {
        day: 'Day 2 - 3',
        feedApplication: 'Continue Next Gut in all feed meals.',
        waterApplication: 'Apply second dose of Next Viro Nill @ 1.0 L/Acre.',
        notes: 'Daily mortality count in check trays begins dropping steeply.'
      },
      {
        day: 'Day 5',
        feedApplication: 'Standard feeding resumed.',
        waterApplication: 'Mortality ceases; shrimp resume vigorous benthic feed grazing.',
        notes: 'Normal growth and molting resume.'
      }
    ],
    dosageGuide: {
      feedDose: 'Use Next Gut in feed @ 15-20 mL/kg',
      waterDose: '1.5 to 2.0 Liters per Acre (Curative); 1.0 L/Acre every 10 days (Preventive)',
      frequency: 'Repeat water application on Day 3 during active outbreaks',
      timing: 'Morning (8:00 AM - 10:00 AM)'
    },
    farmerCaseStudy: {
      farmerName: 'B. Srinivasa Rao',
      location: 'Repalle, Guntur District, Andhra Pradesh',
      pondSize: '3.0 Acre Vannamei Pond (DOC 48)',
      result:
        'Losing 30-40 shrimp daily to unexplained running mortality with neighboring ponds getting wiped out by WSSV. Applied Next Viro Nill @ 2L/Acre and Next Gut in feed. Within 72 hours, mortality stopped completely and crop successfully harvested at 32 count.'
    },
    faqs: [
      {
        question: 'Can Next Viro Nill prevent White Spot Syndrome Virus (WSSV)?',
        answer:
          'Next Viro Nill acts as an intense microbial biosecurity agent. It hydrolyzes viral-harboring organic bottom detritus, competitive-excludes vectors, and stimulates natural anti-microbial lipopeptides, drastically reducing viral transmission pressure in commercial ponds.'
      }
    ]
  },
  {
    slug: 'blue-green-algae-control-pond',
    targetKeyword: 'Blue Green Algae Control in Shrimp Pond',
    secondaryKeywords: [
      'microcystis control in prawn aquaculture',
      'how to remove pond scum in shrimp pond',
      'algae crash treatment in shrimp culture',
      'blue green algae medicine shrimp',
      'toxic cyanobacteria pond reducer'
    ],
    metaTitle: 'Blue Green Algae (Microcystis) Control for Shrimp Ponds | Next Remedy',
    metaDescription:
      'Toxic blue green algae scum or Microcystis killing your pond bloom? Next Remedy digests cyanobacteria naturally without causing dangerous oxygen crash. 5L @ Rs. 5,000.',
    diseaseName: 'Cyanobacteria & Toxic Blue-Green Algae (Microcystis) Bloom',
    tagline: 'Gentle Enzymatic Biological Equilibrium Without Oxygen Depletion',
    severityLevel: 'HIGH ALERT',
    affectedSpecies: 'Penaeus vannamei, Penaeus monodon, Fresh Water Fish',
    primaryProductSlug: 'next-remedy',
    secondaryProductSlug: 'next-pro',
    symptoms: [
      'Thick bright green or blue-green paint-like scum accumulating on downwind pond corners.',
      'High morning pH (> 8.8) and wide diurnal pH fluctuations (> 0.8 difference).',
      'Earthy, muddy geosmin odor in pond water and off-flavor in harvested shrimp.',
      'Shrimp gut packed with undigested blue-green algae leading to gut irritation.',
      'Risk of catastrophic overnight dissolved oxygen crash.'
    ],
    rootCauses: [
      'Excessive nitrogen to phosphorus imbalance (low N:P ratio favor cyanobacteria).',
      'Accumulated organic waste on the pond floor providing continuous phosphate feeding.',
      'Hot sunlight, stagnant water surface, and low circulation.'
    ],
    dayProtocol: [
      {
        day: 'Day 1',
        feedApplication: 'Cut midday feed slightly.',
        waterApplication: 'Apply Next Remedy @ 1.5 Liters per Acre during late afternoon (4:00 PM).',
        notes: 'Do NOT use copper sulfate; copper wipes out bloom instantly and causes mass shrimp asphyxiation.'
      },
      {
        day: 'Day 2',
        feedApplication: 'Normal feeding.',
        waterApplication: 'Cyanobacterial scum breaks down into harmless organic particles.',
        notes: 'Aerators keep dissolved oxygen elevated.'
      },
      {
        day: 'Day 3 - 4',
        feedApplication: 'Normal feeding.',
        waterApplication: 'Apply Next Pro @ 1.0 L/Acre to establish beneficial green diatom bloom.',
        notes: 'Water color transitions to healthy golden-brown diatom bloom.'
      }
    ],
    dosageGuide: {
      feedDose: 'Not applied in feed',
      waterDose: '1.5 to 2.0 Liters per Acre',
      frequency: 'Single application; repeat after 5 days if scum persists',
      timing: 'Late afternoon (3:30 PM - 5:00 PM)'
    },
    farmerCaseStudy: {
      farmerName: 'V. Nageswara Rao',
      location: 'Kakinada, East Godavari, Andhra Pradesh',
      pondSize: '2.5 Acre Pond',
      result:
        'Heavy Microcystis scum formed on corners with pond pH spiking to 9.2. Applied Next Remedy @ 1.5L/Acre. Within 48 hours, algae scum dissipated smoothly without any oxygen dip, and water stabilized into a rich brown diatom bloom.'
    },
    faqs: [
      {
        question: 'Why is copper sulfate dangerous for blue green algae in shrimp ponds?',
        answer:
          'Copper sulfate kills all algae instantly within 3 hours, causing a catastrophic dissolved oxygen crash, releasing lethal microcystin toxins into the water, and depositing heavy copper metals in shrimp hepatopancreas. Next Remedy eliminates cyanobacteria biologically over 48 hours safely.'
      }
    ]
  },
  {
    slug: 'loose-shell-slow-growth-shrimp',
    targetKeyword: 'Slow Growth Medicine for Shrimp',
    secondaryKeywords: [
      'how to increase shrimp growth faster',
      'best feed probiotic for vannamei',
      'shrimp fcr booster medicine',
      'slow growth in prawn culture treatment',
      'shrimp feed enzyme probiotic',
      'vannamei average daily gain boost'
    ],
    metaTitle: 'Slow Growth & FCR Booster for Shrimp | Next Food Pro Feed Probiotic',
    metaDescription:
      'Shrimp not growing or poor FCR in feed trays? Next Food Pro enhances digestive enzymes, accelerates daily weight gain, and boosts gut absorption. 5L @ Rs. 5,000.',
    diseaseName: 'Growth Retardation, High FCR & Poor Feed Conversion',
    tagline: 'High-Concentration Feed Enzyme & Probiotic Digestive Bio-Accelerator',
    severityLevel: 'CHRONIC PROGRESSION',
    affectedSpecies: 'Litopenaeus vannamei, Penaeus monodon',
    primaryProductSlug: 'next-food-pro',
    secondaryProductSlug: 'next-min',
    symptoms: [
      'Average Daily Gain (ADG) dropping below 0.20g per day after DOC 40.',
      'Feed Conversion Ratio (FCR) rising above 1.5, causing ballooning operational costs.',
      'Uneven sizes (shooters and small runts) within the same pond check trays.',
      'Fecal matter containing undigested whole feed particles.',
      'Weak carapace thickness and dull coloration.'
    ],
    rootCauses: [
      'Impaired hepatopancreas enzyme synthesis from sub-clinical gut infections.',
      'Poor feed digestibility or low quality binder washing out nutrients.',
      'Benthic stress and fluctuating water parameters inhibiting metabolism.'
    ],
    dayProtocol: [
      {
        day: 'Daily Regimen',
        feedApplication: 'Mix Next Food Pro @ 10 mL/kg feed in morning and afternoon feeds.',
        waterApplication: 'Ensure pond bottom is clean using Next Sludge.',
        notes: 'Within 7 days, shrimp ADG jumps by 25% to 35% with complete tray clearance.'
      }
    ],
    dosageGuide: {
      feedDose: '10 mL per kg feed coated with binder',
      waterDose: 'Not applicable',
      frequency: 'Daily across main feeding rations',
      timing: 'All feed meals from DOC 20 to harvest'
    },
    farmerCaseStudy: {
      farmerName: 'S. Ranga Raju',
      location: 'Tanuku, West Godavari, Andhra Pradesh',
      pondSize: '4.0 Acre Pond (DOC 60)',
      result:
        'Shrimp growth had stalled at 14 grams with FCR climbing to 1.65. Added Next Food Pro to feed daily. Within 3 weeks, shrimp reached 28 grams count with overall FCR improving to 1.32, saving over Rs. 85,000 in feed costs.'
    },
    faqs: [
      {
        question: 'How does Next Food Pro improve shrimp Feed Conversion Ratio (FCR)?',
        answer:
          'Next Food Pro delivers 6 Billion CFU/g of Bacillus coagulans, protease, amylase, and phytase enzymes that pre-digest feed proteins inside the shrimp digestive tract, allowing maximum nutrient assimilation into muscle tissue.'
      }
    ]
  },
  {
    slug: 'hard-water-salinity-conditioner-pond',
    targetKeyword: 'Pond Water Softener for Shrimp',
    secondaryKeywords: [
      'hard water treatment for shrimp pond',
      'borewell water hardness in vannamei culture',
      'vannamei culture in low salinity water',
      'carbonate scaling shrimp pond',
      'water conditioner for prawn farming'
    ],
    metaTitle: 'Pond Water Softener & Hardness Reducer | Next Softner Bio-Chelator',
    metaDescription:
      'High borewell water hardness or carbonate scaling choking your shrimp? Next Softner bio-chelates excess salts and stabilizes ionic balance. 5L @ Rs. 5,000.',
    diseaseName: 'Water Hardness & Carbonate Scaling Stress',
    tagline: 'Advanced Natural Bio-Chelation & Mineral Bioavailability Balancer',
    severityLevel: 'SEASONAL RISK',
    affectedSpecies: 'Litopenaeus vannamei, Scampi, Fresh & Brackish Water Aquaculture',
    primaryProductSlug: 'next-softner',
    secondaryProductSlug: 'next-min',
    symptoms: [
      'White chalky crust depositing on paddlewheel aerator blades and pond dikes.',
      'Water total hardness exceeding 800 ppm CaCO3 with calcium scaling.',
      'Shrimp exoskeleton becoming brittle or developing calcium deposits on gills.',
      'Poor mineral bioavailability despite adding commercial mineral bags.',
      'High surface tension preventing natural plankton bloom formation.'
    ],
    rootCauses: [
      'Using deep inland agricultural borewell water with heavy dissolved carbonate salts.',
      'High evaporation during summer months concentrating dissolved solids.',
      'Unbalanced subterranean aquifers in low-salinity coastal districts.'
    ],
    dayProtocol: [
      {
        day: 'Application',
        feedApplication: 'Standard feeding.',
        waterApplication: 'Apply Next Softner @ 2.0 Liters per Acre before pumping fresh borewell water.',
        notes: 'Softens water instantly, bio-chelates heavy calcium crystals, and softens shrimp gills.'
      }
    ],
    dosageGuide: {
      feedDose: 'Not applied in feed',
      waterDose: '1.5 to 2.0 Liters per Acre',
      frequency: 'During pond filling and every 15 days in hard-water ponds',
      timing: 'Morning hours during water intake'
    },
    farmerCaseStudy: {
      farmerName: 'P. Anjaneyulu',
      location: 'Nuzvid, Krishna District, Andhra Pradesh',
      pondSize: '3.0 Acre Inland Borewell Pond (Hardness 950 ppm)',
      result:
        'Borewell water hardness was causing gill fouling and chalky shell deposits. Broadcasted Next Softner @ 2L/Acre. Total water hardness stabilized, gill deposits washed away, and mineral absorption recovered 100%.'
    },
    faqs: [
      {
        question: 'How does Next Softner differ from EDTA chemicals?',
        answer:
          'Synthetic EDTA is expensive, corrosive, and leaves chemical synthetic residues in aquaculture ponds. Next Softner is a 100% biological botanical chelating complex that safely complexes excess calcium ions and makes them bio-available for shrimp shell formation.'
      }
    ]
  }
];

export function getSolutionBySlug(slug: string): SolutionPageData | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
