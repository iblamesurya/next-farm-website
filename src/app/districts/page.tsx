import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { DISTRICT_GUIDES } from '@/lib/districts-data';
import { MapPin, Droplets, ShieldAlert, Sparkles, Phone, ArrowRight, Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Indian Aquaculture District Directory | Andhra Pradesh & Gujarat Shrimp Hubs',
  description: 'Localized aquaculture medicine and biosecurity protocols across Bhimavaram, Nellore, Kaikaluru, Bapatla, Kakinada, Guntur, Surat, and Balasore. Tailored salinity and pathology management.',
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/districts'
  }
};

export default function DistrictsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-br from-[#002B5B] via-[#003B7B] to-[#004B50] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD200]/20 border border-[#FFD200]/40 text-[#FFD200] text-xs font-bold uppercase tracking-wider mb-4">
              <Compass className="w-4 h-4" />
              <span>Hyper-Local Aquaculture Field Directory</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading mb-4 leading-tight">
              Indian Aquaculture District Field Network
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6">
              Shrimp and prawn farming dynamics vary drastically by region. From low-saline freshwater culture in Kaikaluru (0.5 ppt) to hypersaline marine creeks in Nellore (35 ppt), access customized microbial schedules, soil conditioners, and emergency disease protocols engineered for your specific coastal delta.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <MapPin className="w-4 h-4 text-[#FFD200]" />
                8 Major Coastal Belts
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Droplets className="w-4 h-4 text-cyan-300" />
                Salinity-Calibrated Formulations
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Sparkles className="w-4 h-4 text-amber-300" />
                తెలుగు ఫీల్డ్ అడ్వైజరీ (Bilingual)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Districts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DISTRICT_GUIDES.map((d) => (
            <div
              key={d.slug}
              className="bg-white rounded-2xl border border-slate-200 hover:border-[#004B50] shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-slate-100 flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      {d.state} &bull; {d.district}
                    </span>
                    <h2 className="text-xl font-bold text-[#002B5B] group-hover:text-[#004B50] transition-colors font-heading leading-snug">
                      {d.name}
                    </h2>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap ${
                    d.salinityType === 'Hypersaline Marine'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : d.salinityType === 'Freshwater / Low Saline'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {d.averageSalinity}
                  </span>
                </div>

                {/* Telugu Subtitle */}
                <p className="text-xs font-semibold text-emerald-700 mb-3 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                  {d.teluguName}
                </p>

                {/* Key Geography Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {d.keyGeography.slice(0, 4).map((geo) => (
                    <span
                      key={geo}
                      className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                    >
                      {geo}
                    </span>
                  ))}
                  {d.keyGeography.length > 4 && (
                    <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                      +{d.keyGeography.length - 4} more
                    </span>
                  )}
                </div>

                {/* Primary Challenge Preview */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                    <span>Top Local Pathology:</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {d.pathologyRisks[0]?.disease}: {d.pathologyRisks[0]?.trigger}
                  </p>
                </div>

                {/* Recommended Regimen Preview */}
                <div className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Priority Bio-Input:</span>{' '}
                  <span className="text-[#004B50] font-bold">
                    {d.recommendedFormulations[0]?.productName}
                  </span>{' '}
                  ({d.recommendedFormulations[0]?.indication})
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/districts/${d.slug}`}
                  className="text-xs font-bold text-[#002B5B] group-hover:text-[#004B50] flex items-center gap-1 transition-colors"
                >
                  <span>Explore Field Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`https://wa.me/918977656444?text=Hello%20Next%20Farm%20Team%2C%20I%20am%20calling%20regarding%20aquaculture%20in%20${encodeURIComponent(d.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp Helpline for ${d.name}`}
                  className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
                  title="Connect with Local Field Specialist"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
