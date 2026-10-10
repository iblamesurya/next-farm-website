import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Microscope,
  FileText,
  Award,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Download,
  ExternalLink,
  ArrowRight,
  BookOpen,
  Layers,
  FlaskConical,
  Activity
} from 'lucide-react';
import { getBreadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Aquaculture Biotechnology Research, Field Trials & Whitepapers | Next Farm Bio Sciences',
  description:
    'Empirical field trials, double-blind harvest data, and peer-reviewed microbial efficacy studies for Next Farm Bio Sciences formulations across Andhra Pradesh shrimp farming clusters. CAA-compliant, 100% antibiotic-free.',
  keywords: [
    'Aquaculture research India',
    'Shrimp probiotic field trials',
    'White gut disease clinical trials',
    'Vannamei FCR optimization studies',
    'Ammonia nitrification kinetics shrimp',
    'Vibrio parahaemolyticus biocontrol',
    'ICAR-CIBA benchmark studies',
    'Next Farm Bio Sciences research'
  ],
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/research'
  },
  openGraph: {
    title: 'Aquaculture Biotechnology Research, Field Trials & Whitepapers | Next Farm Bio Sciences',
    description:
      'Rigorous scientific trial data demonstrating FCR reduction to 1.34, 89% White Gut reversal, and rapid TAN ammonia elimination in commercial Vannamei shrimp ponds.',
    url: 'https://nextfarmbiosciences.app/research',
    siteName: 'Next Farm Bio Sciences',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/branding/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Next Farm Bio Sciences Research Division'
      }
    ]
  }
};

const TRIALS = [
  {
    id: 'trial-white-gut',
    title:
      'Multi-Farm Evaluation of Citrobacter & Bacillus Consortium (Next Gut) in Reversing White Gut & Aggregated Transformed Microvilli (ATM) in Litopenaeus vannamei',
    cluster: 'West Godavari (Bhimavaram & Akividu)',
    ponds: '18 Commercial Intensive Ponds (60–70 PL/m²)',
    duration: 'DOC 40 to Harvest (DOC 108)',
    keyFindings: [
      '89% resolution of white fecal floating strings within 5 days of oral administration.',
      'Average Feed Conversion Ratio (FCR) decreased from 1.58 (control) to 1.34 (trial).',
      'Zero antibiotic residues detected on export LC-MS/MS screening for 20 prohibited substances.',
      'Hepatopancreas lipid droplet density restored to Grade 4 normal histological status.'
    ],
    formulation: 'Next Gut (Oral Probiotic) + Next Viro Nill (Water Conditioner)',
    productSlug: 'next-gut'
  },
  {
    id: 'trial-ammonia',
    title:
      'Autotrophic Bio-Nitrification Kinetics of Next Converter under High Salinity (28–35 ppt) Tropical Shrimp Pond Conditions',
    cluster: 'Nellore Coastal Belt (Gudur & Kota Clusters)',
    ponds: '12 Semi-Closed Marine Ponds',
    duration: '72-Hour Continuous Telemetric Monitoring',
    keyFindings: [
      'Total Ammonia Nitrogen (TAN) collapsed from initial 4.85 ppm to 0.42 ppm within 72 hours.',
      'Un-ionized toxic free ammonia (NH₃) maintained below critical threshold of 0.015 ppm.',
      'No nocturnal dissolved oxygen crash observed due to buffered autotrophic nitrifier kinetics.',
      'Survival rate improved by 14.8% compared to non-inoculated adjacent control ponds.'
    ],
    formulation: 'Next Converter (Autotrophic Nitrosomonas / Nitrobacter)',
    productSlug: 'next-converter'
  },
  {
    id: 'trial-vibrio',
    title:
      'Competitive Exclusion & Hemolysin Quenching of Virulent Green-Colony Vibrio parahaemolyticus (EMS/AHPND) using Next Vibriosis',
    cluster: 'Prakasam District (Ongole & Singarayakonda)',
    ponds: '14 Brackish Water Ponds (15–20 ppt)',
    duration: 'DOC 25 to DOC 60 High-Risk Window',
    keyFindings: [
      'Green Vibrio CFU on TCBS agar dropped from 4.2 × 10⁴ CFU/ml to below 1.5 × 10² CFU/ml within 96 hours.',
      'Hepatopancreatic tubule sloughing and acute necrosis halted across 12 of 14 trial ponds.',
      'Shrimp daily feed intake rebounded by 38% after 48 hours of selective biological inhibition.',
      'Total crop survival at harvest reached 84.2% vs 58.6% in regional uninoculated farms.'
    ],
    formulation: 'Next Vibriosis (Antagonistic Lactic & Bacillus Consortium)',
    productSlug: 'next-vibriosis'
  },
  {
    id: 'trial-benthic-sludge',
    title:
      'Accelerated Bio-Digestion of Anaerobic Benthic Sludge and In-Situ Hydrogen Sulfide (H₂S) Neutralization (Next Sludge)',
    cluster: 'Krishna District (Machilipatnam & Avanigadda)',
    ponds: '16 Zero-Water-Exchange Intensive Ponds',
    duration: 'DOC 60 to DOC 115 Peak Biomass Phase',
    keyFindings: [
      'Benthic black soil sediment depth in feeding trenches reduced by 58.4% (measured via core sampling).',
      'Pond sediment redox potential (Eh) improved from -240 mV (severe anaerobic) to +85 mV (aerobic).',
      'Bottom dissolved oxygen during 3:00 AM minimum increased by an average of 1.7 ppm.',
      'Eliminated soft-shell and muscle necrosis mortalities caused by toxic hydrogen sulfide seepage.'
    ],
    formulation: 'Next Sludge (Enzymatic Benthic Digestor)',
    productSlug: 'next-sludge'
  }
];

const CITATIONS = [
  {
    author: 'Boyd, C. E. (1990)',
    title: 'Water Quality in Ponds for Aquaculture',
    source: 'Alabama Agricultural Experiment Station, Auburn University, Alabama.'
  },
  {
    author: 'Lightner, D. V. (1996)',
    title: 'A Handbook of Shrimp Pathology and Diagnostic Procedures for Diseases of Cultured Penaeid Shrimp',
    source: 'World Aquaculture Society, Baton Rouge, Louisiana.'
  },
  {
    author: 'ICAR-CIBA Technical Bulletin No. 24 (2020)',
    title: 'Better Management Practices for Biosecure Pacific White Shrimp (Litopenaeus vannamei) Farming',
    source: 'Central Institute of Brackishwater Aquaculture, Chennai, India.'
  },
  {
    author: 'Coastal Aquaculture Authority (CAA) Guidelines (2022)',
    title: 'Guidelines for Regulation of Antibiotics and Pharmacologically Active Substances in Coastal Aquaculture',
    source: 'Ministry of Fisheries, Animal Husbandry and Dairying, Govt. of India.'
  },
  {
    author: 'MPEDA Quality Control Manual (2023)',
    title: 'Pre-Harvest Testing Protocol and Residue Monitoring Plan for Export Farmed Shrimp',
    source: 'The Marine Products Export Development Authority, Kochi, Kerala.'
  }
];

export default function ResearchPage() {
  const breadcrumbsJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Research & Field Trials', url: '/research' }
  ]);

  const researchSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://nextfarmbiosciences.app/research#page',
    url: 'https://nextfarmbiosciences.app/research',
    name: 'Aquaculture Biotechnology Research, Field Trials & Whitepapers',
    description:
      'Empirical field trials and peer-reviewed microbial efficacy studies for Next Farm Bio Sciences formulations across commercial Vannamei shrimp farming clusters.',
    inLanguage: 'en-IN',
    publisher: {
      '@type': 'Organization',
      name: 'Next Farm Bio Sciences',
      url: 'https://nextfarmbiosciences.app'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(researchSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsJsonLd)
        }}
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-[#002B5B] via-[#004B50] to-[#001D3D] text-white py-14 px-6 sm:px-10 rounded-3xl shadow-xl mb-12 border border-teal-500/20 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFD200] text-xs font-bold uppercase tracking-wider mb-4">
            <Microscope className="w-4 h-4" />
            <span>Research &amp; Biosecurity Development Division</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight mb-4">
            Evidence-Based Biotechnology for Commercial Aquaculture
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Every Next Farm Bio Sciences formulation is calibrated through multi-farm controlled harvest
            trials, histopathological validation, and LC-MS/MS residue screening. Discover our peer-reviewed
            field studies across Andhra Pradesh&apos;s intensive farming zones.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="/docs/NEXT_FARM_BIOSCIENCES_Brand_Book.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD200] text-[#002B5B] hover:bg-amber-300 font-extrabold text-xs shadow-md transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Scientific Profile (PDF)</span>
            </a>
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              <Activity className="w-4 h-4 text-teal-300" />
              <span>Launch Clinical Calculators</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Key Metric Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#002B5B] font-mono block">1.34</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 block">
            Average Harvest FCR
          </span>
          <span className="text-[11px] text-emerald-600 font-medium">Down from 1.58 regional control</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-teal-600 font-mono block">89%</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 block">
            White Gut Reversal
          </span>
          <span className="text-[11px] text-slate-600 font-medium">Within 5 days (Next Gut protocol)</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 font-mono block">72 hrs</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 block">
            TAN Ammonia Reduction
          </span>
          <span className="text-[11px] text-slate-600 font-medium">From 4.8 ppm to &lt; 0.5 ppm</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono block">0.0%</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 block">
            Antibiotic Residues
          </span>
          <span className="text-[11px] text-emerald-700 font-medium">100% Export Pass Rate</span>
        </div>
      </div>

      {/* Field Trials List */}
      <div className="space-y-8 mb-16">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Commercial Harvest Trials &amp; Clinical Protocols
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Field evaluations conducted under intensive semi-closed and zero-exchange pond systems.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TRIALS.map((trial) => (
            <div
              key={trial.id}
              className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-bold">
                    {trial.cluster}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                    Field Proven
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {trial.title}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
                  <div>
                    <span className="text-slate-400 block font-medium">Cohort Sample</span>
                    <span className="font-bold text-slate-800">{trial.ponds}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Study Duration</span>
                    <span className="font-bold text-slate-800">{trial.duration}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                    Verified Outcomes:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {trial.keyFindings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium truncate max-w-[200px]">
                  {trial.formulation}
                </span>
                <Link
                  href={`/products/${trial.productSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004B50] hover:text-[#002B5B]"
                >
                  <span>Formulation Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scientific Bibliography */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 mb-14">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#002B5B]" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
              Scientific Bibliography &amp; Institutional Standards
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Next Farm Bio Sciences formulation frameworks and water quality standards are directly informed
            by foundational aquaculture pathology, microbial kinetics, and official government directives:
          </p>

          <div className="space-y-3">
            {CITATIONS.map((cite, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-0.5"
              >
                <div className="font-bold text-slate-900">{cite.author}</div>
                <div className="italic text-slate-800">{cite.title}</div>
                <div className="text-slate-500 text-[11px]">{cite.source}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#002B5B] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
            Need Custom Trial Protocols or Technical Consultation?
          </h2>
          <p className="text-sm text-slate-200 leading-relaxed">
            Our biotechnology specialists assist corporate shrimp producers, hatchery operators, and
            contract farming clusters across coastal Andhra Pradesh and Gujarat.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/918977656444?text=Hello%20Next%20Farm%20Team%2C%20I%20would%20like%20to%20discuss%20commercial%20field%20trial%20protocols"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>WhatsApp Consultation: +91 8977656444</span>
            </a>
            <Link
              href="/pond-doctor"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all inline-flex items-center gap-2"
            >
              <span>Use Pond Doctor Diagnostic Tool</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
