import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { GLOSSARY_TERMS } from '@/lib/glossary-data';
import { GlossaryExplorer } from '@/components/glossary/glossary-explorer';
import { BookOpen, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aquaculture & Shrimp Pathology Glossary | 40+ Clinical Terms & Telugu Explanations',
  description: 'Authoritative clinical definitions for aquaculture terminology: FCR, ABW, EHP, White Gut (ATM), Total Ammonia Nitrogen (TAN), Nitrite, TCBS Agar, and Biofloc. Bilingual Telugu explanations.',
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/glossary'
  }
};

export default function GlossaryPage() {
  // Schema.org DefinedTermSet JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Next Farm Bio Sciences Aquaculture & Clinical Pathology Glossary',
    description: 'Comprehensive technical and clinical definitions covering shrimp physiology, water chemistry, microsporidian pathologies, and biological bioremediation.',
    url: 'https://nextfarmbiosciences.app/glossary',
    hasDefinedTerm: GLOSSARY_TERMS.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      alternateName: t.acronym || undefined,
      description: t.shortDefinition,
      inDefinedTermSet: 'https://nextfarmbiosciences.app/glossary',
      termCode: t.slug
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-medium">
          <Link href="/" className="hover:text-[#002B5B] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Aquaculture Glossary</span>
        </nav>

        {/* Header Hero */}
        <div className="bg-gradient-to-br from-[#002B5B] via-[#003B7B] to-[#004B50] rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD200]/20 border border-[#FFD200]/40 text-[#FFD200] text-xs font-bold uppercase tracking-wider mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Clinical Field Reference &amp; Vocabulary</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading mb-4 leading-tight">
              Aquaculture &amp; Shrimp Pathology Glossary
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6">
              Precision clinical definitions and benchmark thresholds for commercial shrimp (*Litopenaeus vannamei* &amp; *Penaeus monodon*) farming. Engineered for pond supervisors, hatchery technicians, and aquaculture students across Andhra Pradesh.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                40+ Clinical Definitions
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#FFD200]" />
                Schema.org DefinedTermSet
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                తెలుగు వివరణలు (Bilingual Telugu Notes)
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Explorer */}
        <GlossaryExplorer />
      </div>
    </div>
  );
}
