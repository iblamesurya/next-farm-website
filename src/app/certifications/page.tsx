import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileCheck,
  AlertTriangle,
  Download,
  ExternalLink,
  ArrowRight,
  BadgeCheck,
  Building2,
  Phone,
  HelpCircle
} from 'lucide-react';
import { getBreadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Certifications, CAA Approvals & Biosecurity Compliance | Next Farm Bio Sciences',
  description:
    'Official biosecurity and quality certifications for Next Farm Bio Sciences: Coastal Aquaculture Authority (CAA) compliance, ISO 9001:2015 QMS standards, and 100% antibiotic-free export clearance guarantees.',
  keywords: [
    'CAA approved aquaculture inputs',
    'Coastal Aquaculture Authority certification',
    'Antibiotic free shrimp medicine',
    'ISO 9001:2015 aquaculture company',
    'MPEDA pre-harvest testing compliance',
    'Gazette SO 1827(E) banned antibiotics list',
    'Next Farm Bio Sciences Vijayawada'
  ],
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/certifications'
  },
  openGraph: {
    title: 'Certifications, CAA Approvals & Biosecurity Compliance | Next Farm Bio Sciences',
    description:
      'Zero-antibiotic certification, Coastal Aquaculture Authority compliance, and ISO 9001:2015 microbial manufacturing standards.',
    url: 'https://nextfarmbiosciences.app/certifications',
    siteName: 'Next Farm Bio Sciences',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/branding/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Next Farm Bio Sciences Certifications & Biosecurity'
      }
    ]
  }
};

const BANNED_ANTIBIOTICS = [
  'Chloramphenicol',
  'Nitrofurans (including Furazolidone, Nitrofurazone, Furaltadone, Nitrofurantoin)',
  'Neomycin',
  'Nalidixic acid',
  'Sulphamethoxazole',
  'Aristolochia spp. and preparations thereof',
  'Chloroform',
  'Chlorpromazine',
  'Colchicine',
  'Dapsone',
  'Dimetridazole',
  'Metronidazole',
  'Ronidazole',
  'Ipronidazole and other nitroimidazoles',
  'Clenbuterol',
  'Diethylstilbestrol (DES)',
  'Sulfonamide drugs (except approved therapeutants)',
  'Fluoroquinolones (Enrofloxacin, Ciprofloxacin)',
  'Glycopeptides',
  'Oxytetracycline (unauthorized coastal broadcast)'
];

export default function CertificationsPage() {
  const breadcrumbsJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Certifications & Compliance', url: '/certifications' }
  ]);

  const certSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://nextfarmbiosciences.app/certifications#page',
    url: 'https://nextfarmbiosciences.app/certifications',
    name: 'Certifications, CAA Approvals & Biosecurity Compliance',
    description:
      'Official biosecurity and quality certifications for Next Farm Bio Sciences: Coastal Aquaculture Authority compliance, ISO 9001:2015, and 100% antibiotic-free export clearance guarantees.',
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
          __html: JSON.stringify(certSchema)
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
            <ShieldCheck className="w-4 h-4" />
            <span>Biosecurity &amp; Regulatory Assurance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight mb-4">
            Regulatory Compliance &amp; Quality Certifications
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Next Farm Bio Sciences manufactures all 11 formulations under strict compliance with the
            Coastal Aquaculture Authority (Govt. of India), ISO 9001:2015 pharmaceutical-grade microbial
            controls, and zero-tolerance antibiotic testing protocols.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="/docs/NEXT_FARM_BIOSCIENCES_Brand_Book.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD200] text-[#002B5B] hover:bg-amber-300 font-extrabold text-xs shadow-md transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Brand &amp; Compliance Book</span>
            </a>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              <span>Explore CAA-Approved Formulations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Core Certification Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* CAA Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4 hover:shadow-md transition-all">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
              Govt. of India Statutory Body
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              Coastal Aquaculture Authority (CAA)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Formulated in direct alignment with Coastal Aquaculture Authority Act, 2005 standards.
            Guarantees that no ecological toxins, unauthorized hormones, or prohibited chemicals enter
            estuarine and coastal water ecosystems.
          </p>
          <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Strict compliance with Gazette S.O. 1827(E)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Biosecure microbial strains safe for marine fauna</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Approved for commercial Vannamei &amp; Monodon farms</span>
            </li>
          </ul>
        </div>

        {/* ISO 9001:2015 Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4 hover:shadow-md transition-all">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <Award className="w-9 h-9" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
              Global Quality Standard
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              ISO 9001:2015 Certified QMS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Pharmaceutical-grade fermentation and bio-processing controls at our Vijayawada facility.
            Every batch undergoes automated colony-forming unit (CFU) validation and shelf-life spore
            viability testing.
          </p>
          <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Zero microbial cross-contamination guarantee</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Controlled endospore encapsulation process</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Traceable batch numbering and QR tracking</span>
            </li>
          </ul>
        </div>

        {/* 100% Antibiotic-Free Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4 hover:shadow-md transition-all">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <BadgeCheck className="w-9 h-9" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
              Export Biosecurity Clean Bill
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              100% Antibiotic-Free Bio-Inputs
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Screened via Tandem Mass Spectrometry (LC-MS/MS) with zero tolerance (&lt; 0.1 ppb). Complies
            with European Commission Decision 2002/657/EC and US-FDA 21 CFR Part 530 export rejection
            guidelines.
          </p>
          <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>0% Chloramphenicol &amp; Nitrofurans</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Zero export consignment rejections</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Pre-harvest MPEDA clearance compliant</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Official 20 Banned Antibiotics Compliance Table */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 mb-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                Gazette S.O. 1827(E) — Prohibited Substances Compliance
              </h2>
              <p className="text-xs text-slate-500">
                Next Farm Bio Sciences formulations are strictly certified free from all 20 banned antibiotics
                and pharmacologically active substances:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {BANNED_ANTIBIOTICS.map((substance, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-slate-800"
              >
                <span className="font-semibold">{substance}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  0.0% Detection
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900 block mb-1">
              Why Antibiotics are Counter-Productive in Shrimp Aquaculture:
            </strong>
            Shrimp possess an innate, non-adaptive immune system devoid of immunoglobulins (antibodies).
            Antibiotics destroy beneficial gut microflora, exacerbate hepatopancreatic necrosis, and fail
            completely against microsporidian parasites like <em>Enterocytozoon hepatopenaei</em> (EHP).
            Next Farm Bio Sciences replaces chemical toxins with aggressive biological competitive exclusion
            using robust <em>Citrobacter</em>, <em>Bacillus</em>, and <em>Lactobacillus</em> consortia.
          </div>
        </div>
      </div>

      {/* Manufacturing Facility & Plant Verification */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 mb-14 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Plant HQ: New Autonagar, Vijayawada</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Biotechnology Manufacturing &amp; Quality Control Laboratory
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Located in the industrial hub of New Autonagar, Vijayawada (Andhra Pradesh), our facility
              features clean-room fermentation reactors, automated micro-encapsulation lines, and in-house
              analytical testing suites for CFU enumeration, purity assays, and ionic mineral titration.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs pt-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Dispatch Reach</span>
                <strong className="text-slate-900">All Coastal Districts of AP &amp; Pan-India</strong>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Supply Terms</span>
                <strong className="text-slate-900">100% Pre-Paid Commercial Dispatch</strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white p-7 rounded-2xl border border-slate-800 space-y-4 text-center">
            <FileCheck className="w-12 h-12 text-[#FFD200] mx-auto" />
            <h3 className="font-extrabold text-lg">Request Certificate of Analysis (COA)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Export processors, hatchery operators, and corporate shrimp farmers can request batch-specific
              microbiological COAs and LC-MS residue sheets.
            </p>
            <a
              href="https://wa.me/918977656444?text=Hello%20Next%20Farm%20Team%2C%20I%20would%20like%20to%20request%20a%20Certificate%20of%20Analysis%20(COA)"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 text-xs font-extrabold text-[#002B5B] bg-[#FFD200] hover:bg-amber-300 rounded-xl shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Quality Team: +91 8977656444</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
