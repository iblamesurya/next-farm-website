import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Search,
  BookOpen,
  Microscope,
  Stethoscope,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { DISEASE_MONOGRAPHS } from '@/lib/diseases-data';
import { getBreadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Indian Shrimp Pathology Compendium | Disease Atlas & Clinical Protocols',
  description:
    'Comprehensive scientific compendium of Litopenaeus vannamei and Penaeus monodon pathologies. Etiology, gross field diagnosis, histopathology, and CAA-approved antibiotic-free treatment protocols.',
  keywords: [
    'Shrimp disease atlas',
    'Vannamei pathology compendium',
    'White gut syndrome shrimp',
    'EHP treatment shrimp',
    'AHPND EMS cure',
    'Shrimp black gill disease',
    'Vibriosis shrimp diagnosis',
    'ICAR CIBA shrimp diseases',
    'Next Farm Bio Sciences'
  ],
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/diseases'
  },
  openGraph: {
    title: 'Indian Shrimp Pathology Compendium | Next Farm Bio Sciences',
    description:
      'Authoritative clinical diagnostic atlas for 10 major penaeid shrimp pathologies in Indian aquaculture. Gross signs, histology, water triggers, and CAA biological protocols.',
    url: 'https://nextfarmbiosciences.app/diseases',
    siteName: 'Next Farm Bio Sciences',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/branding/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Indian Shrimp Pathology Compendium'
      }
    ]
  }
};

export default function DiseasesIndexPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Shrimp Pathology Compendium', url: '/diseases' }
  ]);

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Indian Shrimp Pathology Compendium',
    url: 'https://nextfarmbiosciences.app/diseases',
    description:
      'Scientific clinical monograph atlas of shrimp diseases affecting Litopenaeus vannamei culture in India.',
    publisher: {
      '@type': 'Organization',
      name: 'Next Farm Bio Sciences',
      url: 'https://nextfarmbiosciences.app'
    },
    about: DISEASE_MONOGRAPHS.map((d) => ({
      '@type': 'MedicalCondition',
      name: d.name,
      alternateName: d.teluguName,
      code: {
        '@type': 'MedicalCode',
        code: d.slug,
        codingSystem: 'NextFarm-Aquaculture-Pathology-2026'
      }
    }))
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL - EMERGENCY':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'HIGH MORTALITY RISK':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'CHRONIC MORBIDITY & STUNTING':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link href="/" className="hover:text-[#004B50] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#002B5B]">Shrimp Pathology Compendium</span>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#004B50]/10 text-[#004B50] font-heading font-extrabold text-xs uppercase tracking-wider rounded-full">
            <Microscope className="w-3.5 h-3.5" />
            <span>Clinical Pathology Atlas &amp; Field Reference</span>
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#002B5B] tracking-tight">
            Indian Shrimp Pathology Compendium
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            A peer-referenced clinical compendium for aquaculture technicians, farm managers, and hatchery
            pathologists across Andhra Pradesh, Gujarat, Odisha, and Tamil Nadu. Formulated in compliance with
            Coastal Aquaculture Authority (CAA) and ICAR-CIBA diagnostic benchmarks.
          </p>
        </div>

        {/* Pathology Categories Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <span className="block text-2xl font-black text-[#002B5B]">10</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clinical Monographs</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <span className="block text-2xl font-black text-emerald-600">100%</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Antibiotic-Free Protocols</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <span className="block text-2xl font-black text-[#004B50]">CAA</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Statutory Compliance</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <span className="block text-2xl font-black text-teal-600">తెలుగు</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Regional Diagnostics</span>
          </div>
        </div>

        {/* Disease Monograph Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DISEASE_MONOGRAPHS.map((disease) => (
            <article
              key={disease.slug}
              className="bg-white rounded-2xl border border-slate-200 hover:border-[#004B50] shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider border ${getSeverityBadge(
                      disease.severity
                    )}`}
                  >
                    {disease.severity}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                    {disease.pathogenType}
                  </span>
                </div>

                <div>
                  <h2 className="font-heading font-black text-lg sm:text-xl text-[#002B5B] group-hover:text-[#004B50] transition-colors leading-snug">
                    <Link href={`/diseases/${disease.slug}`}>
                      {disease.name}
                    </Link>
                  </h2>
                  <p className="text-xs italic text-slate-500 mt-1 font-mono">
                    {disease.scientificName}
                  </p>
                </div>

                <div className="p-2.5 bg-teal-50/60 rounded-lg border border-teal-100">
                  <span className="text-[11px] font-bold text-[#004B50] block">
                    {disease.teluguName}
                  </span>
                  <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                    {disease.teluguDescription}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {disease.clinicalOverview}
                </p>

                {/* Key Field Signs Snippet */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Primary Check Tray Signs:
                  </span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {disease.grossPathology.trayObservations.slice(0, 2).map((sign, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#004B50] font-bold text-xs mt-0.5">•</span>
                        <span className="line-clamp-1">{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Target: <strong className="text-slate-700">{disease.recommendedProductName.split(' ')[0]} {disease.recommendedProductName.split(' ')[1]}</strong>
                </span>
                <Link
                  href={`/diseases/${disease.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-[#004B50] group-hover:text-[#002B5B] transition-colors"
                >
                  <span>Clinical Monograph</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Diagnostic Callout Banner */}
        <div className="mt-16 bg-gradient-to-br from-[#002B5B] to-[#004B50] rounded-2xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-[#FFD200]">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Interactive Diagnostic Suite</span>
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl">
              Need Real-Time Pond Water &amp; Disease Calculations?
            </h2>
            <p className="text-sm text-slate-200 max-w-2xl">
              Use our interactive calculators suite to compute Bower-Bidwell un-ionized ammonia dissociation,
              shrimp biomass standing crop, FCR, and mineral ratios in seconds.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/calculators"
              className="px-6 py-3 bg-[#FFD200] hover:bg-yellow-400 text-[#002B5B] font-heading font-black text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Open Calculators Suite</span>
            </Link>
            <Link
              href="/pond-doctor"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <span>Pond Doctor Diagnostic Engine</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
