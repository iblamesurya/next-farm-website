export interface ProductFaq {
  question: string;
  answer: string;
}

export const PRODUCT_FAQS: Record<string, ProductFaq[]> = {
  'next-viro-nill': [
    {
      question: 'How does Next Viro Nill suppress viral load and WSSV vectors in shrimp ponds?',
      answer:
        'Next Viro Nill deploys a specialized consortium of Bacillus subtilis, Bacillus licheniformis, and Pediococcus acidilactici (min. 5 Billion CFU/ml). These beneficial microbes rapidly colonize the water-sediment interface, digest organic detritus and fecal ribbons that harbor viral vectors, and secrete antimicrobial lipopeptides that break horizontal pathogen transmission cycles without harming beneficial diatoms.'
    },
    {
      question: 'What is the dosage of Next Viro Nill per acre for disease outbreak prevention?',
      answer:
        'For routine preventive biosecurity, broadcast 500 mL per Acre every 7 to 10 days. During high-risk disease alerts, sudden weather shifts, or unseasonal rains, administer a shock dose of 1.5 Liters per Acre in the morning (8:00 AM – 10:00 AM) with aerators running, and repeat after 48 hours if required.'
    },
    {
      question: 'Is Next Viro Nill approved by the Coastal Aquaculture Authority (CAA)?',
      answer:
        'Yes. Next Viro Nill is 100% CAA-approved (Govt. of India), certified under ISO 9001:2015, and guaranteed free from all chloramphenicol, nitrofurans, and banned antibiotics, ensuring total export compliance for European, US, and Japanese seafood markets.'
    },
    {
      question: 'How quickly does Next Farm dispatch orders to farms across Andhra Pradesh?',
      answer:
        'Orders confirmed online before 2:00 PM IST are dispatched same-day directly from our Vijayawada production hub, reaching coastal aquaculture hubs including Bhimavaram, Machilipatnam, Kakinada, Ongole, and Nellore within 24 to 48 hours.'
    }
  ],
  'next-gut': [
    {
      question: 'What is the fastest way to cure White Gut and White Feces Syndrome in Vannamei shrimp?',
      answer:
        'Top-dress Next Gut multi-strain enteric probiotic at 15–20 mL per kg of feed across all daily meals for 5 consecutive days using a non-leaching binding agent like Next Bind Plus. Simultaneously broadcast Next Viro Nill at 1.0 L/Acre into the pond water to eliminate water-borne Vibrio reservoirs.'
    },
    {
      question: 'Which probiotic strains are formulated in Next Gut?',
      answer:
        'Next Gut delivers a verified minimum of 10 Billion CFU/g of Lactobacillus sporogenes, Bacillus coagulans, Clostridium butyricum, and Saccharomyces boulardii, supplemented with digestive amylase, protease, and beta-glucanase enzymes to restore the midgut mucosal barrier.'
    },
    {
      question: 'Does Next Gut improve Feed Conversion Ratio (FCR) during normal grow-out?',
      answer:
        'Yes. Regular administration of Next Gut at 5–10 mL/kg feed stimulates intestinal microvilli density, accelerates digestive enzyme secretion, and significantly reduces trailing fecal strands, resulting in 12–18% faster average daily weight gain (ADG) and improved FCR.'
    },
    {
      question: 'Can Next Gut be fed alongside other aquaculture supplements?',
      answer:
        'Yes. Next Gut can be blended with organic mineral supplements (Next Cal Phos) and immunostimulants. However, do not mix directly with chemical disinfectants or chlorine in feed.'
    }
  ],
  'next-converter': [
    {
      question: 'How does Next Converter eliminate toxic ammonia (NH3) and nitrite (NO2) spikes?',
      answer:
        'Next Converter contains high-density autotrophic nitrifying bacteria (Nitrosomonas europaea, Nitrobacter vulgaris, and Paracoccus denitrificans at min. 8 Billion CFU/ml). These bacteria rapidly oxidize toxic unionized ammonia (NH3) into nitrite and then harmless nitrate (NO3), followed by complete respiratory denitrification into atmospheric nitrogen gas.'
    },
    {
      question: 'What is the recommended application protocol for severe ammonia spikes above 1.0 ppm TAN?',
      answer:
        'Apply 2.0 to 3.0 Liters of Next Converter per Acre (based on 1 meter depth) during early morning with all paddlewheel aerators in operation. Broadcast 60% of the volume on Day 1 and the remaining 40% on Day 2. Maintain dissolved oxygen above 4.5 ppm for maximum bacterial oxidation rate.'
    },
    {
      question: 'Does Next Converter work in both low salinity and high salinity shrimp ponds?',
      answer:
        'Yes. The microbial strains in Next Converter are osmo-tolerant and functionally active across salinities ranging from 2 ppt to 45 ppt and water pH levels between 7.2 and 8.6.'
    },
    {
      question: 'How soon will pond ammonia levels drop after adding Next Converter?',
      answer:
        'Field tests across Andhra Pradesh show TAN (Total Ammonia Nitrogen) reductions within 18 to 36 hours post-broadcasting, eliminating shrimp surface gasping, swimming lethargy, and feed drop.'
    }
  ],
  'next-sludge': [
    {
      question: 'How does Next Sludge digest black mud and benthic sludge at the pond bottom?',
      answer:
        'Next Sludge utilizes a benthic microbial consortium (Bacillus polymyxa, Aspergillus oryzae, Cellulomonas) engineered to produce heavy extracellular cellulases, proteases, and lipases. It digests dead phytoplankton, molted carapaces, and uneaten feed crust in the central drainage pit, converting anaerobic black sludge into inert mineral ash.'
    },
    {
      question: 'How do you apply Next Sludge for central drain pit cleaning?',
      answer:
        'Mix 1.0 to 1.5 Liters of Next Sludge with 20–30 kg of fine dry pond sand and broadcast directly over the central drain and feeding zones in the evening (after 5:00 PM). The sand carries the living spores directly into the anaerobic sediment bed.'
    },
    {
      question: 'Can Next Sludge eliminate hydrogen sulfide (H2S) rotten egg smell?',
      answer:
        'Yes. By hydrolyzing the underlying organic matter and raising the bottom redox potential, Next Sludge halts anaerobic sulfur-reducing bacterial metabolism, clearing toxic H2S gas within 48 to 72 hours.'
    },
    {
      question: 'What pack sizes are available for Next Sludge?',
      answer:
        'Next Sludge is available in heavy-duty 5-Liter HDPE canisters for commercial farm broadcasting and 1-Liter precision bottles for targeted nursery and spot-treatment applications.'
    }
  ],
  'next-remedy': [
    {
      question: 'When should I apply Next Remedy in Vannamei and Monodon ponds?',
      answer:
        'Apply Next Remedy whenever pond water turns murky, viscous, brownish-red, or experiences sudden blue-green algae (cyanobacteria) crashes. It stabilizes phytoplankton equilibrium and clears suspended colloids.'
    },
    {
      question: 'What is the dosage rate for Next Remedy per acre?',
      answer:
        'For algal crash recovery and color stabilization, apply 1.0 Liter per Acre diluted in 50 liters of pond water, broadcast between 9:00 AM and 11:00 AM on a sunny day.'
    },
    {
      question: 'Does Next Remedy harm beneficial green water or diatoms?',
      answer:
        'No. Next Remedy selectively suppresses toxic filamentous algae and dinoflagellates while supplying bio-catalysts that nourish beneficial diatoms (Chaetoceros, Skeletonema), maintaining Secchi disc transparency between 25 cm and 35 cm.'
    },
    {
      question: 'Is Next Remedy safe during late-stage grow-out before harvest?',
      answer:
        'Yes. Next Remedy is 100% natural, CAA-approved, and leaves zero chemical residue or off-flavor in shrimp flesh, making it safe right up to harvest day.'
    }
  ],
  'next-pro-plus': [
    {
      question: 'What is Next Pro Plus and what makes it different from routine pond probiotics?',
      answer:
        'Next Pro Plus is an ultra-dense broad-spectrum water and soil probiotic combining 15 Billion CFU/g of soil Bacillus, photosynthetic Rhodopseudomonas, and fungal bio-enhancers designed for high-density stocking (>60 PL/m²).'
    },
    {
      question: 'How frequently should Next Pro Plus be applied during grow-out?',
      answer:
        'Apply 500 mL to 1 Liter per Acre every 7 days from DOC 20 onwards to prevent organic buildup and maintain pristine biological balance throughout intensive 90–120 day crop cycles.'
    },
    {
      question: 'Can Next Pro Plus be fermented with jaggery prior to pond application?',
      answer:
        'Yes. Aerobic pre-activation with 2 kg jaggery and 50 liters pond water for 12–16 hours prior to broadcasting further boosts colony reproduction and speeds up biological activation.'
    },
    {
      question: 'Is Next Pro Plus effective in zero-water-exchange biofloc systems?',
      answer:
        'Yes. It is ideal for biofloc systems as it maintains stable heterotrophic bacterial floc volume (BFV) between 10–15 mL/L without causing sudden dissolved oxygen crashes.'
    }
  ],
  'next-cal-phos': [
    {
      question: 'How does Next Cal Phos prevent cramping and soft-shell disease in shrimp?',
      answer:
        'Next Cal Phos delivers ionic chelated Calcium, Phosphorus, Magnesium, and Potassium in bio-available 1:1.5 Ca:P ratios. It rapidly restores haemolymph electrolyte balance during lunar molting cycles, eliminating soft-shell, blue shell, and body cramping.'
    },
    {
      question: 'What is the dosage of Next Cal Phos for water broadcasting and feed mixing?',
      answer:
        'For water column remineralization, broadcast 2.0 Liters per Acre 2 days prior to new moon and full moon molting peaks. For feed administration, top-dress 10–15 mL per kg of pellet feed across morning meals.'
    },
    {
      question: 'Why is ionic chelated mineral absorption superior to traditional lime/zeolite?',
      answer:
        'Traditional dolomite and lime dissolve slowly and have low bioavailability in acidic sediments. Next Cal Phos uses organic amino acid chelates that pass directly through the gill and gut epithelial membranes with over 90% absorption efficiency.'
    },
    {
      question: 'Does Next Cal Phos raise total pond water alkalinity and hardness?',
      answer:
        'Yes. Regular supplementation maintains pond alkalinity above 120 ppm and total hardness above 2,500 ppm in low-salinity aquaculture systems.'
    }
  ],
  'next-bind-plus': [
    {
      question: 'What is the primary role of Next Bind Plus in aquaculture feed preparation?',
      answer:
        'Next Bind Plus is a marine-grade nutrient and probiotic feed binder. It coats commercial shrimp pellets with an insoluble, water-stable polymer barrier that stops probiotics, vitamins, and minerals from leaching out in the water column for over 90 minutes.'
    },
    {
      question: 'How much Next Bind Plus should be used per kilogram of feed?',
      answer:
        'Use 20 to 30 mL of Next Bind Plus per 1 kg of feed. Mix your probiotics or medicines thoroughly with the binder, coat the pellets evenly, and air-dry in the shade for 15 to 20 minutes before feeding.'
    },
    {
      question: 'Does Next Bind Plus contain artificial attractants or toxic gums?',
      answer:
        'No. Next Bind Plus is formulated from purified marine alginates, squid extract attractants, and natural amino acids, which stimulate rapid feed uptake and feeding tray clearance within 45 minutes.'
    },
    {
      question: 'Can Next Bind Plus be stored under hot field conditions in farm sheds?',
      answer:
        'Yes. Next Bind Plus has a 24-month stable shelf life at room temperatures up to 45°C. Avoid direct sunlight and keep the bottle tightly capped.'
    }
  ],
  'next-clean-water': [
    {
      question: 'How does Next Clean Water act as a biological flocculant and water purifier?',
      answer:
        'Next Clean Water combines natural plant saponins and organic polymeric coagulants that rapidly bind to suspended silt, dead algae cells, and colloidal clays, precipitating them to the bottom where beneficial probiotics can break them down.'
    },
    {
      question: 'What is the application rate of Next Clean Water per acre?',
      answer:
        'Broadcast 1.0 to 1.5 Liters per Acre diluted in 30 liters of pond water. Apply across paddlewheel aeration zones between 10:00 AM and 1:00 PM for rapid flocculation within 4 hours.'
    },
    {
      question: 'Does Next Clean Water interfere with dissolved oxygen levels?',
      answer:
        'No. By precipitating suspended organic matter and clearing water turbidity, it actually increases sunlight penetration, boosting natural microalgae photosynthesis and net dissolved oxygen production.'
    },
    {
      question: 'Is Next Clean Water safe for post-larvae (PL) during nursery stages?',
      answer:
        'Yes. It is 100% natural and non-corrosive, making it completely safe for delicate PL-10 to PL-20 post-larvae in nursery tanks and transition ponds.'
    }
  ],
  'next-d-tox': [
    {
      question: 'How does Next D-Tox neutralize heavy metals and chemical pesticide runoff?',
      answer:
        'Next D-Tox contains pharmaceutical-grade biological EDTA chelating complexes and sulfur-reducing compounds that neutralize toxic agricultural runoff, heavy metals (cadmium, lead, iron), and residual chlorine or formalin in aquaculture water.'
    },
    {
      question: 'When should Next D-Tox be applied during pond preparation?',
      answer:
        'Apply Next D-Tox at 1.0 to 2.0 Liters per Acre 48 hours prior to stocking post-larvae (PL) to detoxify canal intake water and ensure high (>95%) initial stocking survival.'
    },
    {
      question: 'Can Next D-Tox be used after heavy chemical treatments or copper sulfate?',
      answer:
        'Yes. Apply a shock dose of 2.0 Liters per Acre 24 hours after any chemical disinfectant treatment to bind and deactivate chemical residues before seeding beneficial probiotics.'
    },
    {
      question: 'Does Next D-Tox help with rusty iron water and red soil ponds?',
      answer:
        'Yes. It rapidly complexes dissolved ferrous iron (Fe²⁺/Fe³⁺), preventing iron hydroxide deposits on shrimp gills and shell discoloration.'
    }
  ],
  'next-immuno-boost': [
    {
      question: 'How does Next Immuno Boost enhance shrimp disease resistance against Vibrio and WSSV?',
      answer:
        'Next Immuno Boost is enriched with purified 1,3-1,6 Beta-Glucans, Mannan-Oligosaccharides (MOS), and organic Vitamin C. It activates the prophenoloxidase (proPO) defense cascade in shrimp haemocytes, dramatically increasing phagocytosis and pathogen clearance.'
    },
    {
      question: 'What is the feeding protocol for Next Immuno Boost during disease pressure?',
      answer:
        'Top-dress 10 to 15 mL per kg of pellet feed using Next Bind Plus across all daily meals for 7 to 10 consecutive days during cold snaps, cyclone depressions, or localized disease outbreaks.'
    },
    {
      question: 'Does Next Immuno Boost stimulate molting synchronization in shrimp?',
      answer:
        'Yes. By supplying metabolic cofactors and strengthening the immune barrier during post-molt soft-shell stages, it ensures uniform, synchronous molting across the pond population.'
    },
    {
      question: 'Can Next Immuno Boost be fed continuously throughout the crop cycle?',
      answer:
        'For high-density crops, feeding Next Immuno Boost for 5 days every fortnight maintains elevated baseline lysozyme activity and high survival rates through to harvest.'
    }
  ]
};

export function getFaqsForProduct(slug: string): ProductFaq[] {
  return (
    PRODUCT_FAQS[slug] || [
      {
        question: 'Is this formulation CAA-approved and safe for export shrimp?',
        answer:
          'Yes. All Next Farm Bio Sciences products are approved by the Coastal Aquaculture Authority (Govt. of India), ISO 9001:2015 certified, and guaranteed 100% free of banned antibiotics.'
      },
      {
        question: 'What is the shipping timeline for farms in Andhra Pradesh?',
        answer:
          'Pre-paid orders confirmed before 2:00 PM IST are dispatched same-day from Vijayawada via dedicated aquaculture logistics, arriving within 24–48 hours across coastal districts.'
      }
    ]
  );
}
