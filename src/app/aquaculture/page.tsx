import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Table,
  Microscope,
  Award,
  Layers,
  Droplets,
  Activity,
  Fish
} from 'lucide-react';
import { PRODUCTS } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Aquaculture Medicines, Probiotics & Bio-Input Solutions | Next Farm Bio Sciences',
  description:
    "India's premier commercial aquaculture biotechnology enterprise. 11 high-potency, CAA-approved, 100% antibiotic-free probiotics, water conditioners, and gut medicines engineered for intensive shrimp & fish aquaculture.",
  keywords: [
    'Aquaculture',
    'Aquaculture medicine',
    'Aquaculture probiotics',
    'Aquaculture products',
    'Aquaculture chemicals',
    'Aquaculture company in India',
    'Aquaculture Andhra Pradesh',
    'Aquaculture in Vijayawada',
    'Shrimp aquaculture medicine',
    'Fish farming probiotics India',
    'CAA approved aquaculture inputs',
    'Next Farm Bio Sciences'
  ],
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/aquaculture'
  },
  openGraph: {
    title: 'Aquaculture Medicines, Probiotics & Bio-Input Solutions | Next Farm Bio Sciences',
    description:
      'Field-proven biological medicines and high-potency probiotics for commercial aquaculture: White Gut, Toxic Ammonia, Vibrio, Benthic Sludge, and Growth Boosters. 100% Antibiotic-Free.',
    url: 'https://nextfarmbiosciences.app/aquaculture',
    siteName: 'Next Farm Bio Sciences',
    locale: 'en_IN',
    type: 'article',
    images: [
      {
        url: '/images/branding/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Next Farm Bio Sciences Aquaculture Solutions'
      }
    ]
  }
};

const AQUACULTURE_CLINICAL_MATRIX = [
  {
    pathology: 'Toxic Ammonia & Nitrite Spike (TAN > 1.0 ppm)',
    cause: 'Accumulated uneaten feed proteins, dense stocking biomass, microbial breakdown collapse.',
    dosage: '1 Can (5 Litres) per Acre',
    recommendedSlug: 'next-converter',
    productName: 'Next Converter',
    tag: 'Bio-Nitrifier & TAN Reducer'
  },
  {
    pathology: 'White Gut & White Feces Syndrome (WFS)',
    cause: 'Enterocytozoon hepatopenaei (EHP) microsporidian spore cluster + opportunistic Vibrio parahaemolyticus.',
    dosage: '10g - 15g per kg feed (Next Gut) + 1-2 Litres per acre (Next Viro Nill)',
    recommendedSlug: 'next-gut',
    productName: 'Next Gut & Next Viro Nill',
    tag: 'Enteric Microflora Restorer'
  },
  {
    pathology: 'Vibrio Luminescent Bacterial Flare-Up',
    cause: 'Vibrio harveyi / alginolyticus bloom in green pond water, toxic hemolysin release.',
    dosage: '1-2 Litres per Acre applied during early morning',
    recommendedSlug: 'next-vibriosis',
    productName: 'Next Vibriosis',
    tag: 'Selective Competitive Inhibitor'
  },
  {
    pathology: 'Benthic Black Mud & Hydrogen Sulfide (H2S)',
    cause: 'Anaerobic benthic sludge buildup consuming bottom DO and triggering shell erosion.',
    dosage: '1 Can (5 Litres) per Acre directly broadcast over feeding trenches',
    recommendedSlug: 'next-sludge',
    productName: 'Next Sludge',
    tag: 'Deep Anaerobic Soil Digestor'
  },
  {
    pathology: 'Soft Shell, Molting Cramps & Muscle Necrosis',
    cause: 'Severe calcium/magnesium ionic imbalance, low water hardness, post-molt exhaustion.',
    dosage: '5 Litres per Acre applied during night aerated cycles',
    recommendedSlug: 'next-min',
    productName: 'Next Min',
    tag: 'Ionic Bio-Available Minerals'
  },
  {
    pathology: 'High FCR & Stunted Biomass Growth',
    cause: 'Poor digestive enzyme activity, sub-clinical gut inflammation, reduced nutrient absorption.',
    dosage: '5ml - 10ml per kg pellet feed continuously for 7-10 days',
    recommendedSlug: 'next-food-pro',
    productName: 'Next Food Pro',
    tag: 'Digestive Enzyme & Growth Booster'
  }
];

const AQUACULTURE_FAQS = [
  {
    q: 'What is aquaculture and why are modern bio-inputs replacing traditional pond chemicals?',
    a: 'Aquaculture is the controlled farming of aquatic organisms, predominantly Pacific White Shrimp (Litopenaeus vannamei), Black Tiger Prawn (Penaeus monodon), and freshwater finfish. Historically, farmers relied on harsh chemical sanitizers and banned antibiotics that destroyed natural beneficial pond blooms and created resistant pathogen strains. Modern aquaculture biotechnology uses multi-strain probiotic consortia, soil bioremediators, and enzyme supplements that outcompete pathogens naturally, lower FCR, and ensure 100% residue-free seafood meeting strict Coastal Aquaculture Authority (CAA) and international export standards.'
  },
  {
    q: 'What are the core classes of aquaculture medicines and probiotics formulated by Next Farm?',
    a: 'Next Farm Bio Sciences formulates 11 specialized biological solutions spanning 4 therapeutic tiers: (1) Enteric Gut Probiotics (Next Gut, Next Pro Plus) to resolve white gut and enhance digestive microflora; (2) Water Quality & Bioremediation Consortia (Next Converter, Next Remedy, Next Softner) to convert toxic ammonia and soften hard salinity; (3) Benthic Sludge Digestors (Next Sludge) to liquefy anaerobic black mud; and (4) Ionic Minerals & Growth Optimizers (Next Min, Next Food Pro, Next Pro) for rapid exoskeleton hardening and lowered FCR.'
  },
  {
    q: 'How do Next Farm probiotics treat ammonia and nitrite spikes in aquaculture ponds?',
    a: 'Next Converter combines specialized heterotrophic Bacillus polymyxa, Nitrosomonas, and Candida strains that immediately convert dissolved Total Ammonia Nitrogen (TAN) into cellular bacterial protein. Simultaneously, autotrophic nitrifiers rapidly oxidize toxic nitrite (NO2-) into harmless nitrate (NO3-), eliminating gill burns and surface gasping within 24 to 48 hours without causing an oxygen crash.'
  },
  {
    q: 'Can Next Farm aquaculture bio-inputs cure White Gut and White Feces in shrimp?',
    a: 'Yes. Our clinical protocol combines Next Gut (coated onto feed pellets at 10g-15g/kg) with Next Viro Nill applied to the pond water column. Next Gut delivers 10 Billion CFU/g of antagonistic probiotic strains that produce bacteriocins, dislodging Vibrio colonies from the midgut and regenerating microvilli. Next Viro Nill neutralizes floating bacterial vectors in the water column, stopping the spread across feeding check trays in 3 to 5 days.'
  },
  {
    q: 'Are Next Farm Bio Sciences products approved by the Coastal Aquaculture Authority (CAA)?',
    a: 'Yes. All Next Farm formulations are 100% CAA Approved, ISO 9001:2015 certified, and strictly tested to be 100% free of nitrofurans, chloramphenicol, and all antibiotics banned under MPEDA and CAA guidelines. They are formulated specifically for intensive commercial culture across Andhra Pradesh, Gujarat, Odisha, Tamil Nadu, and West Bengal.'
  },
  {
    q: 'How are commercial aquaculture orders shipped and what are the payment terms?',
    a: 'Next Farm operates a transparent factory-direct commercial model. Products are available in 1-Liter bottles (₹1,199) and commercial 5-Liter cans (₹5,000, which equals ₹1,000/L). We operate on a strict 100% Pre-Paid basis via instant Razorpay UPI (Google Pay, PhonePe, Cards) to eliminate merchant risk, with same-day dispatch from our manufacturing facility in New Autonagar, Vijayawada directly to your farm gate.'
  }
];

export default function AquaculturePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://nextfarmbiosciences.app/aquaculture#article',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://nextfarmbiosciences.app/#website',
          name: 'Next Farm Bio Sciences',
          url: 'https://nextfarmbiosciences.app'
        },
        headline: 'Aquaculture Medicines, Probiotics & Biotechnology Solutions',
        description:
          'Comprehensive guide to commercial aquaculture bio-inputs, probiotics, and pond disease treatments formulated by Next Farm Bio Sciences.',
        url: 'https://nextfarmbiosciences.app/aquaculture',
        datePublished: '2026-10-09T00:00:00+05:30',
        dateModified: '2026-10-10T00:00:00+05:30',
        publisher: {
          '@type': 'Organization',
          name: 'Next Farm Bio Sciences',
          logo: {
            '@type': 'ImageObject',
            url: 'https://nextfarmbiosciences.app/images/branding/logo_primary.png'
          }
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://nextfarmbiosciences.app/aquaculture#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://nextfarmbiosciences.app'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Aquaculture Biotechnology',
            item: 'https://nextfarmbiosciences.app/aquaculture'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://nextfarmbiosciences.app/aquaculture#faq',
        mainEntity: AQUACULTURE_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 min-h-screen text-slate-800">
        {/* 1. Header Banner */}
        <section className="bg-gradient-to-br from-[#021324] via-[#002B5B] to-[#003840] text-white py-16 sm:py-24 relative overflow-hidden border-b border-cyan-900/50">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00FFCC_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold tracking-wide">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CAA Approved Biosecurity</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold tracking-wide">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>ISO 9001:2015 Certified Bio-Plant</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD200]/20 border border-[#FFD200]/40 text-[#FFD200] text-xs font-bold tracking-wide">
                <Microscope className="w-4 h-4 text-[#FFD200]" />
                <span>100% Antibiotic-Free</span>
              </span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6">
              Aquaculture Medicines, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD200] via-emerald-300 to-cyan-300">
                Probiotics &amp; Biotechnology Solutions
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 max-w-3xl leading-relaxed mb-8">
              Pioneering high-density sustainable aquaculture across India. 11 targeted biological formulations,
              benthic mud digestors, nitrifying consortia, and ionic mineral chelates specifically engineered
              for <em>Litopenaeus vannamei</em> shrimp, tiger prawns, and commercial finfish culture.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/#formulations"
                className="w-full sm:w-auto px-8 py-4 bg-[#FFD200] hover:bg-[#ffe040] text-[#002B5B] font-heading font-black text-sm uppercase tracking-wider rounded-xl shadow-xl transition-all text-center flex items-center justify-center gap-2 group"
              >
                <span>View 11 Formulations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/pond-doctor"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600/30 hover:bg-emerald-600/50 text-white border border-emerald-400/40 font-heading font-bold text-sm uppercase tracking-wider rounded-xl backdrop-blur-md transition-all text-center flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Pond Doctor Diagnostic Tool</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Four Pillars of Commercial Aquaculture Biotechnology */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-heading font-bold text-[#004B50] tracking-widest uppercase block mb-2">
                Biotechnological Superiority
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#002B5B] tracking-tight">
                The 4 Pillars of Sustainable Modern Aquaculture
              </h2>
              <p className="text-slate-600 mt-3 text-sm sm:text-base">
                How Next Farm Bio Sciences replaces banned antibiotics and toxic pond chemicals with scientific, living microbial consortia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#002B5B] mb-2">
                  1. Enteric Gut Probiotics
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                  Microencapsulated Bacillus and yeast strains colonize the shrimp hepatopancreas and gut, producing bactericidal bacteriocins that suppress pathogenic Vibrio and halt White Gut Disease.
                </p>
                <span className="text-xs font-bold text-[#004B50] mt-4 block">Core: Next Gut, Next Pro Plus</span>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#002B5B] mb-2">
                  2. Water Quality Nitrifiers
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                  Synergistic autotrophic and heterotrophic nitrifiers assimilate dissolved Total Ammonia Nitrogen (TAN) and toxic nitrite into biomass, stopping gill burning and surface gasping.
                </p>
                <span className="text-xs font-bold text-[#004B50] mt-4 block">Core: Next Converter, Next Remedy</span>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#002B5B] mb-2">
                  3. Benthic Mud Digestors
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                  Deep facultative anaerobes break down black anoxic bottom sludge, unconsumed feed proteins, and feces, preventing hydrogen sulfide (H2S) gas buildup at pond bottoms.
                </p>
                <span className="text-xs font-bold text-[#004B50] mt-4 block">Core: Next Sludge</span>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center mb-4">
                  <Fish className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#002B5B] mb-2">
                  4. Ionic Mineral Chelates
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                  Bio-chelated calcium, magnesium, potassium, and phosphorus in optimal ionic ratios support seamless ecdysis (molting), eliminating soft-shell syndrome and muscle cramps.
                </p>
                <span className="text-xs font-bold text-[#004B50] mt-4 block">Core: Next Min, Next Softner</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Master Clinical Aquaculture Protocols Matrix */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <span className="text-xs font-heading font-bold text-[#004B50] tracking-widest uppercase block mb-1">
                  Field Practice Protocols
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#002B5B]">
                  Aquaculture Pathology &amp; Dosage Protocol Matrix
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 md:mt-0 max-w-md">
                Field-tested by leading aquaculture farmers across Krishna, Godavari, and Nellore districts.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#002B5B] text-white text-xs font-heading uppercase tracking-wider">
                      <th className="py-4 px-6">Aquaculture Pathology</th>
                      <th className="py-4 px-6">Diagnostic Etiology</th>
                      <th className="py-4 px-6">Recommended Formulation</th>
                      <th className="py-4 px-6">Clinical Field Dosage</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {AQUACULTURE_CLINICAL_MATRIX.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6 font-bold text-[#002B5B]">
                          {item.pathology}
                          <span className="block text-xs font-semibold text-emerald-600 mt-0.5">
                            {item.tag}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-600 text-xs sm:text-sm">
                          {item.cause}
                        </td>
                        <td className="py-4 px-6 font-semibold text-[#004B50]">
                          {item.productName}
                        </td>
                        <td className="py-4 px-6 font-mono text-xs text-slate-800 bg-slate-50/50">
                          {item.dosage}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Link
                            href={`/products/${item.recommendedSlug}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#004B50] hover:bg-[#003840] text-white text-xs font-bold transition-all shadow-sm"
                          >
                            <span>Inspect</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Complete Catalog Showcase */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-heading font-bold text-[#004B50] tracking-widest uppercase block mb-1">
                Commercial Lineup
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#002B5B]">
                11 High-Potency Formulations for Indian Aquaculture
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                Transparent factory-direct pricing: ₹1,199 / 1L Bottle | ₹5,000 / 5L Can (₹1,000/L). 100% Pre-Paid via Razorpay.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-2xl border border-slate-200 bg-white hover:border-[#004B50] hover:shadow-lg transition-all p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100 mb-4">
                      <Image
                        src={prod.packshotImage || '/images/branding/logo_primary.png'}
                        alt={prod.name}
                        fill
                        className="object-contain p-2"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#002B5B] text-white text-[10px] font-bold">
                        {prod.categoryDisplay || prod.category}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-[#002B5B]">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {prod.headline}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">5L Commercial Can</span>
                      <span className="text-base font-black text-[#004B50]">₹5,000</span>
                    </div>
                    <Link
                      href={`/products/${prod.slug}`}
                      className="px-3.5 py-2 rounded-lg bg-[#002B5B] hover:bg-[#004B50] text-white text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Comprehensive FAQs */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-heading font-bold text-[#004B50] tracking-widest uppercase block mb-1">
                Frequently Asked Questions
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#002B5B]">
                Aquaculture Medicine &amp; Biotechnology FAQs
              </h2>
            </div>

            <div className="space-y-6">
              {AQUACULTURE_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm"
                >
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#002B5B] flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-[#004B50] flex-shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3 pl-8">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Commercial Farm Dispatch Callout */}
        <section className="py-16 bg-[#002B5B] text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
              Direct Aquaculture Farm Supply from Vijayawada HQ
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Order directly from the biotechnology manufacturer. 100% Pre-Paid commercial dispatch across all coastal aquaculture belts in Andhra Pradesh, Odisha, Gujarat, Tamil Nadu, and West Bengal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="https://wa.me/918977656444?text=Hello%20Next%20Farm%20Team%2C%20I%20am%20an%20aquaculture%20farmer%20seeking%20commercial%20bio-input%20supply"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp Helpline: +91 8977656444</span>
              </a>
              <Link
                href="/#formulations"
                className="w-full sm:w-auto px-8 py-4 bg-[#FFD200] hover:bg-[#ffe040] text-[#002B5B] font-heading font-black text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Shop All Formulations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
