import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Hero } from '@/components/storefront/hero';
import { CatalogSection } from '@/components/storefront/catalog-section';
import { PRODUCTS } from '@/lib/catalog';
import {
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Activity,
  Droplets,
  Scale,
  Microscope,
  PhoneCall
} from 'lucide-react';

export const metadata = {
  title: 'Next Farm Bio Sciences | Aquaculture Bio-Inputs in India - Probiotics & Disease Treatments',
  description:
    'Next Farm Bio Sciences (New Autonagar, Vijayawada, Andhra Pradesh) - Leading Indian aquaculture biotechnology enterprise formulating 11 CAA-approved biological inputs, shrimp probiotics, and water conditioners. 100% Antibiotic-Free, ISO 9001:2015.',
  alternates: {
    canonical: 'https://nextfarmbiosciences.app'
  }
};

export default function HomePage() {
  const catalogItemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Next Farm Bio Sciences Aquaculture Biotechnology Formulations',
    description: '11 CAA-approved, 100% antibiotic-free probiotics, water conditioners, and soil bioremediators.',
    itemListElement: PRODUCTS.map((prod, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: prod.name,
      url: `https://nextfarmbiosciences.app/products/${prod.slug}`
    }))
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(catalogItemListJsonLd)
        }}
      />
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Official Certifications & Regulatory Pillar Bar */}
      <section className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center">
              <div className="relative w-12 h-12 mb-2">
                <Image
                  src="/images/badges/caa_approved.svg"
                  alt="CAA Approved"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-bold text-xs sm:text-sm text-[#002B5B]">
                CAA Approved
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Govt. of India Biosecurity
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center">
              <div className="relative w-12 h-12 mb-2">
                <Image
                  src="/images/badges/iso_9001.svg"
                  alt="ISO 9001:2015"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-bold text-xs sm:text-sm text-[#002B5B]">
                ISO 9001:2015
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Pharmaceutical QA Standard
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center">
              <div className="relative w-12 h-12 mb-2">
                <Image
                  src="/images/badges/antibiotic_free.svg"
                  alt="100% Antibiotic-Free"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-bold text-xs sm:text-sm text-emerald-800">
                100% Antibiotic-Free
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Zero Residue Export Safe
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center">
              <div className="relative w-12 h-12 mb-2">
                <Image
                  src="/images/badges/lab_tested.svg"
                  alt="Lab Tested Potency"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-bold text-xs sm:text-sm text-[#004B50]">
                Lab Tested CFU
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Guaranteed Viable Microbes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Pond Doctor Callout Banner */}
      <section className="py-12 bg-gradient-to-r from-[#004B50] to-[#002B5B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-md">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD200] text-[#002B5B] rounded-full text-xs font-heading font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Diagnostic Assistant</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Not Sure Which Formulation Your Pond Needs?
              </h2>
              <p className="text-slate-200 text-sm max-w-2xl leading-relaxed">
                Use our <strong>Pond Doctor</strong> diagnostic engine to diagnose symptoms like
                White Gut, Ammonia Spikes, Benthic Sludge, or Vibrio, and calculate exact required 5L/1L quantities based on your pond acreage.
              </p>
            </div>

            <Link
              href="/pond-doctor"
              className="px-8 py-4 bg-[#FFD200] hover:bg-[#e6bd00] text-[#002B5B] font-heading font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all whitespace-nowrap flex items-center gap-2 flex-shrink-0"
            >
              <span>Launch Pond Doctor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Core Catalog Section (All 11 Formulations) */}
      <CatalogSection products={PRODUCTS} />

      {/* 5. Scientific Pillars Section */}
      <section className="py-16 sm:py-24 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#004B50] block">
              Scientific Precision
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#002B5B]">
              Why Commercial Shrimp Farms Trust Next Farm
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Manufactured at our biotechnology facility in New Autonagar, Vijayawada, our biological formulations solve the root causes of pond collapse without antibiotics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#004B50]/10 flex items-center justify-center text-[#004B50]">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#002B5B]">
                Live Microbial Consortia
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Formulated with minimum 3B to 15B CFU/ml living Bacillus, Lactobacillus, and fungal consortia capable of colonizing high-salinity aquaculture ponds rapidly.
              </p>
            </div>

            <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#002B5B]">
                100% Antibiotic-Free Guarantee
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Strict adherence to zero antibiotic residues, preventing export rejections and preserving the delicate benthic microbiology of coastal water bodies.
              </p>
            </div>

            <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFD200]/20 flex items-center justify-center text-[#002B5B]">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#002B5B]">
                Transparent Pre-Paid Model
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Factory-direct transparent pricing (₹5,000 / 5L Can, ₹1,199 / 1L Bottle) with pre-paid Razorpay payments and direct dispatch from Vijayawada HQ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Direct Technical Consultation Callout */}
      <section className="py-12 bg-[#001D3D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
            Have an Emergency in Your Pond?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Contact our aquaculture technical specialists directly on WhatsApp for dosage calculations and custom pond protocol planning.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/918977656444?text=Hello%20Next%20Farm%20Team%2C%20I%20need%20urgent%20pond%20advice"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Direct WhatsApp Hotline: +91 8977656444</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
