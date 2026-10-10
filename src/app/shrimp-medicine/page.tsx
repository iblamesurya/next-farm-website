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
  Award
} from 'lucide-react';
import { PRODUCTS } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Shrimp Medicine & Prawn Aquaculture Treatments | Next Farm Bio Sciences',
  description:
    'Complete guide to commercial shrimp medicine and biological treatments for Litopenaeus vannamei and Penaeus monodon. CAA-approved, 100% antibiotic-free probiotics, ammonia reducers, and gut medicines.',
  keywords: [
    'Shrimp medicine',
    'Shrimp medicine list',
    'Prawn medicine India',
    'White gut medicine for shrimp',
    'Shrimp culture medicine',
    'Vannamei shrimp disease medicine',
    'Aqua medicine for prawn',
    'CAA approved shrimp probiotics',
    'Next Farm Bio Sciences'
  ],
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/shrimp-medicine'
  },
  openGraph: {
    title: 'Shrimp Medicine & Prawn Aquaculture Treatments | Complete Guide',
    description:
      'Field-proven biological medicines for commercial shrimp farming: White Gut, Toxic Ammonia, Vibrio, Benthic Sludge, and Soft Shell. 100% Antibiotic-Free.',
    url: 'https://nextfarmbiosciences.app/shrimp-medicine',
    siteName: 'Next Farm Bio Sciences',
    locale: 'en_IN',
    type: 'article',
    images: [
      {
        url: '/images/branding/logo_primary.png',
        width: 800,
        height: 600,
        alt: 'Next Farm Bio Sciences Shrimp Medicine'
      }
    ]
  }
};

const MEDICINE_CATALOG = [
  {
    disease: 'White Gut & White Feces Syndrome (WFS)',
    symptoms: 'White floating fecal strings in check trays, empty midgut, pale shrinking hepatopancreas, feed drop of 30-60%.',
    medicine: 'Next Gut',
    slug: 'next-gut',
    solutionSlug: 'white-gut-treatment-shrimp',
    category: 'Gut Probiotic & Enteric Healer',
    strains: 'Citrobacter freundii, Lactobacillus, Saccharomyces cerevisiae (10 Billion CFU/g)',
    dosage: '15 to 20 mL per kg feed (Twice daily for 5 continuous days)',
    price: '₹1,199 / 1L | ₹5,000 / 5L',
    turnaround: '48 to 72 hours'
  },
  {
    disease: 'Toxic Ammonia (NH3) & Nitrite (NO2) Spikes',
    symptoms: 'Surface gasping near aerators at dawn, black or congested gills, cloudy water with foul odor, TAN > 1.0 ppm.',
    medicine: 'Next Converter',
    slug: 'next-converter',
    solutionSlug: 'ammonia-control-shrimp-pond',
    category: 'Biological Nitrogen & TAN Neutralizer',
    strains: 'Autotrophic Nitrosomonas & Nitrobacter consortium (4 Billion CFU/ml)',
    dosage: '2.0 to 3.0 Liters per Acre water broadcast during morning aeration',
    price: '₹1,199 / 1L | ₹5,000 / 5L',
    turnaround: '24 hours'
  },
  {
    disease: 'Vibriosis & Red Disease (EMS / AHPND)',
    symptoms: 'Red swimmerets/uropods, night luminescence (V. harveyi), green Vibrio colonies > 1x10^3 on TCBS agar plates.',
    medicine: 'Next Vibriosis',
    slug: 'next-vibriosis',
    solutionSlug: 'vibrio-red-disease-cure-shrimp',
    category: 'Antagonistic Pathogen Biocontrol',
    strains: 'High-potency antagonistic lactic acid bacteria (8 Billion CFU/ml)',
    dosage: '15 mL/kg feed + 1.5 L/Acre pond broadcast',
    price: '₹1,199 / 1L | ₹5,000 / 5L',
    turnaround: '48 to 72 hours'
  },
  {
    disease: 'Running Mortality Syndrome & WSSV Viral Risk',
    symptoms: 'Persistent daily deaths in check trays (DOC 35-70), faint white spots under carapace, lethargy along dikes.',
    medicine: 'Next Viro Nill',
    slug: 'next-viro-nill',
    solutionSlug: 'running-mortality-syndrome-shrimp',
    category: 'Microbial Biosecurity & Viral Suppressor',
    strains: 'Bacillus subtilis, B. licheniformis, Pediococcus (5 Billion CFU/ml)',
    dosage: '1.5 to 2.0 Liters per Acre water broadcast during morning aeration',
    price: '₹1,199 / 1L | ₹5,000 / 5L',
    turnaround: '72 hours'
  },
  {
    disease: 'Soft Shell Syndrome & Molting Cramps',
    symptoms: 'Thin papery shell lasting > 48h after molt, white opaque tail muscle cramps, post-molt cannibalism.',
    medicine: 'Next-Min',
    slug: 'next-min',
    solutionSlug: 'soft-shell-molting-cramps-shrimp',
    category: 'Ionic Bioavailable Macrominerals',
    strains: 'Chelated ionic Calcium, Magnesium, Phosphorus, Potassium (Balanced Ca:Mg 1:3)',
    dosage: '10 to 15 mL/kg feed + 2.0 L/Acre broadcast before lunar molt',
    price: '₹1,199 / 1L | ₹5,000 / 5L',
    turnaround: '6 to 18 hours'
  },
  {
    disease: 'Benthic Black Soil & Pond Bottom Sludge',
    symptoms: 'Black foul-smelling mud on check tray anchors, H2S gas bubbling to surface, shrimp avoiding feeding center.',
    medicine: 'Next Sludge',
    slug: 'next-sludge',
    solutionSlug: 'black-soil-sludge-digester-pond',
    category: 'Deep-Bed Enzymatic Sludge Digester',
    strains: 'Facultative anaerobic Bacillus megaterium + fungal cellulase & protease enzymes',
    dosage: '1.5 to 2.0 Liters per Acre mixed with sand and broadcasted over bottom',
    price: '₹1,199 / 1L | ₹5,000 / 5L',
    turnaround: '4 to 5 days'
  },
  {
    disease: 'Toxic Blue-Green Algae (Microcystis) Scum',
    symptoms: 'Bright green paint-like surface scum in corners, pH > 8.8, muddy geosmin odor, risk of overnight oxygen crash.',
    medicine: 'Next Remedy',
    slug: 'next-remedy',
    solutionSlug: 'blue-green-algae-control-pond',
    category: 'Cyanobacterial Equilibrium Biocontrol',
    strains: 'Targeted microbial balance consortium (5 Billion CFU/ml)',
    dosage: '1.5 to 2.0 Liters per Acre in late afternoon (4:00 PM)',
    price: '₹1,199 / 1L | ₹5,000 / 5L',
    turnaround: '48 hours'
  },
  {
    disease: 'Slow Growth, High FCR & Poor Digestion',
    symptoms: 'Average daily gain < 0.20g/day, FCR > 1.5, undigested feed pellets in feces, high size variation in check trays.',
    medicine: 'Next Food Pro',
    slug: 'next-food-pro',
    solutionSlug: 'loose-shell-slow-growth-shrimp',
    category: 'High-Concentration Feed Enzyme Probiotic',
    strains: 'Bacillus coagulans, protease, amylase, phytase (6 Billion CFU/g)',
    dosage: '10 mL per kg feed in all primary daily meals',
    price: '₹1,199 / 1L | ₹5,000 / 5L',
    turnaround: '7 days'
  },
  {
    disease: 'Hard Water & Carbonate Scaling Stress',
    symptoms: 'White chalky crust on aerator blades, hardness > 800 ppm CaCO3, brittle shell, high surface tension.',
    medicine: 'Next Softner',
    slug: 'next-softner',
    solutionSlug: 'hard-water-salinity-conditioner-pond',
    category: 'Natural Botanical Bio-Chelating Balancer',
    strains: 'Bio-chelating plant-derived organic carboxylates',
    dosage: '1.5 to 2.0 Liters per Acre during water intake',
    price: '₹1,199 / 1L | ₹5,000 / 5L',
    turnaround: '24 hours'
  }
];

export default function ShrimpMedicineGuidePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://nextfarmbiosciences.app/shrimp-medicine#article',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://nextfarmbiosciences.app/#website',
          name: 'Next Farm Bio Sciences',
          url: 'https://nextfarmbiosciences.app'
        },
        headline: 'Shrimp Medicine & Prawn Aquaculture Treatments | Complete Clinical Guide',
        description:
          'Comprehensive scientific reference for commercial shrimp diseases, active microbial strains, and 100% antibiotic-free biological inputs manufactured in Vijayawada, Andhra Pradesh.',
        url: 'https://nextfarmbiosciences.app/shrimp-medicine',
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
        '@id': 'https://nextfarmbiosciences.app/shrimp-medicine#breadcrumb',
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
            name: 'Shrimp Medicine Guide',
            item: 'https://nextfarmbiosciences.app/shrimp-medicine'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://nextfarmbiosciences.app/shrimp-medicine#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is shrimp medicine in commercial aquaculture?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In commercial shrimp and prawn farming (Litopenaeus vannamei and Penaeus monodon), chemical antibiotics are strictly banned by the Coastal Aquaculture Authority (CAA) and international export regulators. Commercial shrimp medicines are biological inputs consisting of high-potency multi-strain probiotics, nitrifying bacteria, ionic macrominerals, and enzymatic sludge digesters formulated to treat diseases like White Gut, Ammonia toxicity, and Vibriosis without leaving toxic chemical residues.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the best medicine for White Gut in shrimp?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Next Gut is the leading commercial biological treatment for White Gut and White Feces Syndrome. Formulated with Citrobacter freundii, Lactobacillus, and Saccharomyces cerevisiae at 10 Billion CFU/g, it colonizes the shrimp gut lining, repairs the hepatopancreas, and eliminates white fecal strings within 48 to 72 hours when fed at 15-20 ml per kg feed.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can aquarium shrimp antibiotics like Kanaplex be used in commercial ponds?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Aquarium shrimp antibiotics (such as Kanamycin or Neomycin) are formulated exclusively for ornamental pet tanks (Cherry/Crystal shrimp). In commercial food-grade aquaculture ponds, using antibiotics is illegal under CAA regulations, causes mass export rejections by the US FDA and EU, and triggers severe hepatopancreatic necrosis in prawns. Commercial ponds require CAA-approved biological probiotics like Next Farm Bio Sciences formulations.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do you reduce toxic ammonia in shrimp ponds?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To treat active ammonia (TAN > 1.0 ppm) spikes in commercial ponds, broadcast Next Converter at 2.0 to 3.0 Liters per Acre during morning aeration. Its live nitrifying bacteria convert unionized ammonia and nitrite into harmless nitrates within 24 hours.'
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-[#F4F7F8] min-h-screen pb-24">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#002D3A] via-[#003847] to-[#014154] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Official Aquaculture Pharmacology Guide
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
              Target Species: L. vannamei & P. monodon
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight max-w-4xl mb-4">
            Shrimp Medicine &amp; Prawn Aquaculture Treatments
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            Complete scientific reference for commercial shrimp diseases, active microbial strains, and 100% antibiotic-free biological inputs manufactured in Vijayawada, Andhra Pradesh.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/15">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>CAA Approved Formulations</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/15">
              <Award className="w-4 h-4 text-[#FFD200]" />
              <span>ISO 9001:2015 Certified</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/15">
              <Microscope className="w-4 h-4 text-cyan-300" />
              <span>100% Antibiotic-Free Bio-Inputs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Definition Box (Optimized for Google AI Overview extraction) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-[#002D3A] font-display">
            What is Commercial Shrimp Medicine?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            In commercial aquaculture, <strong>shrimp medicine</strong> refers to specialized, non-antibiotic biological preparations engineered to prevent and treat microbial, parasitic, and water quality ailments in high-density prawn ponds. Because chemical antibiotics are legally prohibited under Coastal Aquaculture Authority (CAA) and international export laws, modern shrimp health management relies on <strong>high-potency multi-strain probiotics, autotrophic nitrifying consortia, and chelated ionic macrominerals</strong>.
          </p>

          <div className="bg-amber-50 rounded-2xl p-4 sm:p-5 border border-amber-200/80 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              <strong>Crucial Distinction — Commercial Ponds vs. Aquarium Shrimp:</strong> Medications designed for hobbyist freshwater dwarf shrimp (like Kanamycin or Neomycin aquarium pastes) must <em>never</em> be used in commercial brackishwater ponds. They violate export safety standards and lead to severe hepatopancreatic failure. Commercial farms require food-grade, residue-free biological consortia.
            </div>
          </div>
        </div>
      </section>

      {/* Master Medicine Reference Table (Extractable by Google AI Overviews) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-2">
                <Table className="w-3.5 h-3.5" />
                <span>Authoritative Treatment Directory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#002D3A] font-display">
                Commercial Shrimp Medicine Directory (Symptom &amp; Treatment Guide)
              </h2>
            </div>
            <a
              href="https://wa.me/918977656444?text=Hello%20Next%20Farm,%20I%20need%20urgent%20medicine%20for%20my%20shrimp%20pond"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20BE5A] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Emergency Prescription</span>
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#002D3A] text-white">
                  <th className="p-3.5 rounded-tl-xl font-bold">Ailment / Disease</th>
                  <th className="p-3.5 font-bold">Key Symptoms</th>
                  <th className="p-3.5 font-bold">Recommended Medicine</th>
                  <th className="p-3.5 font-bold">Active Microbial Strains</th>
                  <th className="p-3.5 font-bold">Standard Dosage</th>
                  <th className="p-3.5 rounded-tr-xl font-bold">Pricing &amp; Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {MEDICINE_CATALOG.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-[#002D3A]">
                      <Link href={`/solutions/${item.solutionSlug}`} className="hover:underline text-emerald-800">
                        {item.disease}
                      </Link>
                    </td>
                    <td className="p-3.5 text-slate-600 max-w-xs">{item.symptoms}</td>
                    <td className="p-3.5 font-black text-[#002D3A]">
                      <Link href={`/products/${item.slug}`} className="hover:text-emerald-700">
                        {item.medicine}
                      </Link>
                      <span className="block text-[11px] font-normal text-slate-500">{item.category}</span>
                    </td>
                    <td className="p-3.5 text-slate-700 text-xs italic">{item.strains}</td>
                    <td className="p-3.5 text-slate-700 font-medium">{item.dosage}</td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-bold text-slate-800">{item.price}</div>
                      <Link
                        href={`/solutions/${item.solutionSlug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 mt-1"
                      >
                        <span>View Protocol</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Product Highlight Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl font-black text-[#002D3A] font-display mb-6">
          Featured Formulations for Indian Aquaculture Ponds
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Next Gut */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative w-full h-48 bg-slate-50 rounded-2xl p-2 mb-4">
                <Image
                  src="/images/products/next-gut/shoot.png"
                  alt="Next Gut White Gut Medicine"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                White Gut &amp; FCR Healer
              </span>
              <h3 className="text-xl font-black text-[#002D3A] font-display mt-2 mb-1">
                Next Gut (10B CFU/g)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Premier biological probiotic for reversing White Gut and White Feces Syndrome in Penaeus vannamei. Restores gut lining and restarts feeding in 48-72h.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">5L Commercial Can</span>
                <span className="text-lg font-black text-[#002D3A]">₹5,000</span>
              </div>
              <Link
                href="/solutions/white-gut-treatment-shrimp"
                className="bg-[#107C41] hover:bg-[#0E6837] text-white text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow"
              >
                <span>Order Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Next Converter */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative w-full h-48 bg-slate-50 rounded-2xl p-2 mb-4">
                <Image
                  src="/images/products/next-converter/shoot.png"
                  alt="Next Converter Ammonia Reducer"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Toxic Ammonia &amp; TAN Controller
              </span>
              <h3 className="text-xl font-black text-[#002D3A] font-display mt-2 mb-1">
                Next Converter (4B CFU/ml)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Pre-activated autotrophic nitrifying consortium that rapidly converts unionized toxic ammonia and nitrite into non-toxic nitrate in 24 hours.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">5L Commercial Can</span>
                <span className="text-lg font-black text-[#002D3A]">₹5,000</span>
              </div>
              <Link
                href="/solutions/ammonia-control-shrimp-pond"
                className="bg-[#107C41] hover:bg-[#0E6837] text-white text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow"
              >
                <span>Order Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Next Vibriosis */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative w-full h-48 bg-slate-50 rounded-2xl p-2 mb-4">
                <Image
                  src="/images/products/next-vibriosis/shoot.png"
                  alt="Next Vibriosis Red Disease Medicine"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Anti-Vibrio Biocontrol
              </span>
              <h3 className="text-xl font-black text-[#002D3A] font-display mt-2 mb-1">
                Next Vibriosis (8B CFU/ml)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Potent probiotic antagonist targeting pathogenic Vibrio parahaemolyticus and V. harveyi to prevent Red Disease, tail necrosis, and EMS/AHPND.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">5L Commercial Can</span>
                <span className="text-lg font-black text-[#002D3A]">₹5,000</span>
              </div>
              <Link
                href="/solutions/vibrio-red-disease-cure-shrimp"
                className="bg-[#107C41] hover:bg-[#0E6837] text-white text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow"
              >
                <span>Order Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#002D3A] font-display">
                Frequently Asked Questions About Shrimp Medicine
              </h2>
              <p className="text-xs text-slate-500">Scientific clarity on legal regulations, application, and dosage</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-base text-[#002D3A] mb-2">
                Why are chemical antibiotics banned in shrimp culture?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Chemical antibiotics (such as chloramphenicol, furazolidone, and oxytetracycline) leave toxic bioaccumulative residues in shrimp tissue. They trigger severe hepatopancreas toxicity, induce antimicrobial resistance in water bacteria, and result in immediate export confiscation and destruction by international regulatory bodies (US FDA, EU, and Japanese health agencies). Next Farm Bio Sciences provides 100% legal, CAA-approved biological inputs that cure disease safely.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-base text-[#002D3A] mb-2">
                How quickly do biological medicines work in pond culture?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Pre-activated living bacterial consortia begin enzymatic activity within hours of broadcast. For water conditions like toxic ammonia, Next Converter lowers TAN within 24 hours. For internal gut ailments like White Gut, Next Gut restores feed uptake and reverses fecal string sloughing within 48 to 72 hours.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-base text-[#002D3A] mb-2">
                Where are Next Farm Bio Sciences shrimp medicines manufactured and shipped from?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                All 11 formulations are produced under sterile conditions in our ISO 9001:2015 certified biotechnology laboratories located in New Autonagar, Vijayawada, Andhra Pradesh. Orders confirmed before 2:00 PM are dispatched same-day with express delivery to all coastal aquaculture districts across AP, Tamil Nadu, and Odisha.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Helpline Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-[#002D3A] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black font-display mb-3">
            Speak with an Aquaculture Specialist
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Experiencing sudden mortality, check tray feed drops, or ammonia spikes? Contact our technical support team in Vijayawada for guidance on dosage and treatment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/918977656444?text=Hello%20Next%20Farm%20Team,%20I%20need%20urgent%20medicine%20for%20my%20shrimp%20pond"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20BE5A] text-white font-bold py-3 px-6 rounded-2xl shadow transition-all flex items-center gap-2 text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Helpline: +91 8977656444</span>
            </a>
            <a
              href="tel:+918977656444"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-2xl border border-white/20 transition-all flex items-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4 text-[#FFD200]" />
              <span>Call +91 8977656444</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
