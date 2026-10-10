import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Phone,
  MessageSquare,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { SOLUTIONS } from '@/lib/solutions-data';
import { getBreadcrumbJsonLd, getCollectionPageJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Shrimp & Prawn Disease Treatment Directory | Next Farm Bio Sciences',
  description:
    'Comprehensive aquaculture clinical guide for White Gut, Toxic Ammonia, Vibrio, Benthic Sludge, Soft Shell, and Microcystis Algae. 100% Antibiotic-Free biological protocols.',
  keywords: [
    'Shrimp disease treatment guide',
    'Vannamei prawn medicine India',
    'White gut treatment shrimp',
    'Ammonia reducer shrimp pond',
    'Vibrio medicine for shrimp',
    'Aquaculture probiotics Andhra Pradesh',
    'Next Farm Bio Sciences'
  ],
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/solutions'
  },
  openGraph: {
    title: 'Shrimp & Prawn Disease Treatment Directory | Next Farm Bio Sciences',
    description:
      'Comprehensive aquaculture clinical guide for White Gut, Toxic Ammonia, Vibrio, Benthic Sludge, Soft Shell, and Microcystis Algae. 100% Antibiotic-Free.',
    url: 'https://nextfarmbiosciences.app/solutions',
    siteName: 'Next Farm Bio Sciences',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/branding/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Shrimp & Prawn Disease Treatment Directory'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shrimp & Prawn Disease Treatment Directory | Next Farm Bio Sciences',
    description: 'Field-validated biological treatments and protocols for commercial shrimp farming.',
    images: ['/images/branding/og_image.png']
  }
};

export default function SolutionsIndexPage() {
  const breadcrumbsJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Aquaculture Solutions', url: '/solutions' }
  ]);

  const collectionPageJsonLd = getCollectionPageJsonLd({
    title: 'Shrimp & Prawn Disease Treatment Directory',
    description:
      'Field-validated biological treatments and step-by-step recovery protocols for commercial Litopenaeus vannamei and Penaeus monodon cultivators.',
    url: 'https://nextfarmbiosciences.app/solutions',
    items: SOLUTIONS.map((s) => ({
      name: s.diseaseName,
      url: `/solutions/${s.slug}`,
      description: s.metaDescription
    }))
  });

  return (
    <div className="bg-[#F4F7F8] min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsJsonLd)
        }}
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#002D3A] via-[#003847] to-[#014154] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Aquaculture Pathology & Diagnostic Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight max-w-4xl mx-auto mb-4">
            Shrimp & Prawn Disease Solutions Guide
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Field-validated biological treatments and step-by-step recovery protocols for commercial Litopenaeus vannamei and Penaeus monodon cultivators.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              CAA Approved Inputs
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
              <Sparkles className="w-4 h-4 text-[#FFD200]" />
              Zero Antibiotic Residues
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
              <Phone className="w-4 h-4 text-blue-400" />
              24/7 Helpline: +91 8977656444
            </span>
          </div>
        </div>
      </section>

      {/* Directory Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((sol) => (
            <div
              key={sol.slug}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500/80 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                    {sol.severityLevel}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {sol.dayProtocol.length}-Day Plan
                  </span>
                </div>

                <h2 className="text-lg font-black text-[#002D3A] font-display group-hover:text-emerald-700 transition-colors mb-2">
                  {sol.targetKeyword}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {sol.tagline}
                </p>

                {/* Top Symptoms Preview */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1">
                    Key Indicators:
                  </span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {sol.symptoms.slice(0, 2).map((sym, sIdx) => (
                      <li key={sIdx} className="line-clamp-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Species: <span className="text-slate-500 font-normal">Vannamei / Tiger</span>
                </span>
                <Link
                  href={`/solutions/${sol.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 group-hover:text-emerald-900 group-hover:translate-x-1 transition-all"
                >
                  <span>View Protocol</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Immediate Helpline CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-md">
          <h3 className="text-2xl sm:text-3xl font-black font-display mb-3">
            Need Immediate Diagnosis for Your Aqua Pond?
          </h3>
          <p className="text-sm text-emerald-100 max-w-xl mx-auto mb-6">
            Share pond water parameters, DOC, and check tray photos with our biological technical team in Vijayawada for personalized prescriptions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/918977656444"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20BE5A] text-white font-bold py-3 px-6 rounded-2xl shadow transition-all flex items-center gap-2 text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Helpline (+91 8977656444)</span>
            </a>
            <Link
              href="/pond-doctor"
              className="bg-white hover:bg-slate-100 text-[#002D3A] font-bold py-3 px-6 rounded-2xl shadow transition-all flex items-center gap-2 text-sm"
            >
              <span>Open Pond Doctor Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
