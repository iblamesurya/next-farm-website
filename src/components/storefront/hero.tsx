'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Activity,
  Layers,
  Award,
  ChevronRight
} from 'lucide-react';

const FEATURED_HERO_PRODUCTS = [
  {
    name: 'Next Gut',
    slug: 'next-gut',
    category: 'Enteric Probiotic',
    image: '/images/products/next-gut/shoot.png',
    farmerImage: '/images/products/next-gut/farmer.png',
    cfu: '10 Billion CFU/g',
    indication: 'Reverses White Gut & White Feces'
  },
  {
    name: 'Next Viro Nill',
    slug: 'next-viro-nill',
    category: 'Biosecurity Sanitizer',
    image: '/images/products/next-viro-nill/shoot.png',
    farmerImage: '/images/products/next-viro-nill/farmer.png',
    cfu: '5 Billion CFU/ml',
    indication: 'Suppresses WSSV & Bottom Viral Vectors'
  },
  {
    name: 'Next Converter',
    slug: 'next-converter',
    category: 'Feed Enzyme Optimizer',
    image: '/images/products/next-converter/shoot.png',
    farmerImage: '/images/products/next-converter/farmer.png',
    cfu: 'Multi-Enzyme Complex',
    indication: 'Lowers FCR & Accelerates Growth'
  },
  {
    name: 'Next Sludge',
    slug: 'next-sludge',
    category: 'Benthic Soil Digestor',
    image: '/images/products/next-sludge/shoot.png',
    farmerImage: '/images/products/next-sludge/farmer.png',
    cfu: 'High-Potency Bacillus',
    indication: 'Digests Black Mud & Anoxic Bottom Sludge'
  }
];

export function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const activeProduct = FEATURED_HERO_PRODUCTS[activeTab];

  return (
    <div className="relative bg-gradient-to-br from-[#021324] via-[#002B5B] to-[#003840] text-white overflow-hidden border-b border-cyan-900/40">
      {/* Decorative High-Tech Organic Bio Background */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00FFCC_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 sm:pt-16 sm:pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & High-Impact Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Trust Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-cyan-400/30 text-white text-xs font-heading font-extrabold tracking-wide shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="text-[#FFD200]">CAA CERTIFIED</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-200">100% ANTIBIOTIC-FREE BIO-INPUTS</span>
            </div>

            {/* Main Punchy Headline */}
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              Advanced Aquaculture <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD200] via-emerald-300 to-cyan-300">
                Biotechnology &amp; Probiotics
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Scientific microbial consortia, benthic sludge digestors, and bio-available mineral formulations
              specifically engineered for Indian shrimp &amp; prawn culture (<em>L. vannamei</em> &amp; <em>P. monodon</em>).
              Shipped directly from our Vijayawada bio-laboratories.
            </p>

            {/* 3 Pack Size Pricing Strip */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 max-w-xl mx-auto lg:mx-0 grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-slate-300 block font-medium">1-Liter Bottle</span>
                <span className="text-base sm:text-lg font-black text-[#FFD200] block mt-0.5">₹1,199</span>
                <span className="text-[10px] text-emerald-400 font-bold block">Save 25%</span>
              </div>
              <div className="p-2 rounded-xl bg-[#004B50]/60 border border-emerald-400/40 relative">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FFD200] text-[#002B5B] text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                  Popular
                </span>
                <span className="text-[11px] text-slate-200 block font-medium">2-Liter Pack</span>
                <span className="text-base sm:text-lg font-black text-[#FFD200] block mt-0.5">₹2,299</span>
                <span className="text-[10px] text-emerald-300 font-bold block">Save 28%</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-slate-300 block font-medium">5-Liter Can</span>
                <span className="text-base sm:text-lg font-black text-[#FFD200] block mt-0.5">₹5,000</span>
                <span className="text-[10px] text-cyan-300 font-bold block">₹1,000 / Litre</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/#formulations"
                className="w-full sm:w-auto px-8 py-4 bg-[#FFD200] hover:bg-[#ffe040] text-[#002B5B] font-heading font-black text-sm uppercase tracking-wider rounded-xl shadow-xl hover:shadow-cyan-500/20 transition-all text-center flex items-center justify-center gap-2 group"
              >
                <span>Shop 11 Formulations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/pond-doctor"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600/30 hover:bg-emerald-600/50 text-white border border-emerald-400/40 font-heading font-bold text-sm uppercase tracking-wider rounded-xl backdrop-blur-md transition-all text-center flex items-center justify-center gap-2.5 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-[#FFD200]" />
                <span>Pond Doctor Diagnostic</span>
              </Link>
            </div>

            {/* Quick Farmer Helpline Notice */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-300">
              <a
                href="https://wa.me/918977656444?text=Hello%20Next%20Farm,%20I%20need%20advice%20for%20my%20shrimp%20pond"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 font-semibold"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Aqua Specialist Hotline: +91 8977656444</span>
              </a>
              <span className="text-slate-500 hidden sm:inline">&bull;</span>
              <span className="text-slate-300">Fast Pan-India Express Delivery</span>
            </div>
          </div>

          {/* Right Column: Interactive Real Photographic Product Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Interactive Product Tabs */}
            <div className="flex gap-1.5 p-1.5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 mb-4 max-w-md w-full justify-center">
              {FEATURED_HERO_PRODUCTS.map((prod, idx) => (
                <button
                  key={prod.slug}
                  onClick={() => setActiveTab(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === idx
                      ? 'bg-[#FFD200] text-[#002B5B] shadow-md scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {prod.name}
                </button>
              ))}
            </div>

            {/* Main Interactive Product Card Frame */}
            <div className="relative w-full max-w-md aspect-[4/5] sm:aspect-square bg-gradient-to-b from-white/15 to-white/5 rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden group">
              {/* Product Background Aura */}
              <div className="absolute inset-0 bg-radial-gradient from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

              {/* Card Header info */}
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFD200] block">
                    {activeProduct.category}
                  </span>
                  <h3 className="font-heading font-black text-xl text-white">
                    {activeProduct.name}
                  </h3>
                  <span className="text-xs text-emerald-300 font-semibold block mt-0.5">
                    {activeProduct.cfu}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[11px] font-bold text-emerald-300">
                    CAA Certified
                  </span>
                </div>
              </div>

              {/* Central Real Photography Image */}
              <div className="relative w-full h-56 sm:h-64 my-auto">
                <Image
                  src={activeProduct.image}
                  alt={`${activeProduct.name} Official Shoot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] transform group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Card Footer: Clinical Indication & 1-Click Link */}
              <div className="relative z-10 bg-black/50 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block font-medium">Primary Indication</span>
                  <span className="text-xs font-bold text-white block truncate">
                    {activeProduct.indication}
                  </span>
                </div>

                <Link
                  href={`/products/${activeProduct.slug}`}
                  className="flex-shrink-0 p-2.5 rounded-xl bg-[#FFD200] text-[#002B5B] hover:bg-white transition-colors"
                  title="View Formulation Details"
                >
                  <ChevronRight className="w-4 h-4 font-black" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Counter Strip */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-heading font-black text-2xl sm:text-3xl text-[#FFD200]">11 Formulations</div>
            <div className="text-xs text-slate-300 mt-1">Full-Cycle Pond Biologicals</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-400">100% Antibiotic-Free</div>
            <div className="text-xs text-slate-300 mt-1">Export-Grade Purity</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-heading font-black text-2xl sm:text-3xl text-cyan-400">CAA Regd</div>
            <div className="text-xs text-slate-300 mt-1">Government of India Standard</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-heading font-black text-2xl sm:text-3xl text-[#FFD200]">Pre-Paid Direct</div>
            <div className="text-xs text-slate-300 mt-1">Fast Delivery Across Coastal India</div>
          </div>
        </div>
      </div>
    </div>
  );
}
