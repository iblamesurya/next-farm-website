import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Sparkles, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-[#002B5B] via-[#004B50] to-[#002B5B] text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFD200_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFD200] text-xs font-heading font-extrabold tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-[#FFD200]" />
              <span>Next-Gen Aquaculture Biotechnology</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              Biotechnology Engineered to Protect Your Pond &amp; Profit.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              High-potency bacterial consortia, benthic fungal digestors, and bioavailable ionic mineral chelates
              formulated specifically for intensive Indian prawn and shrimp farming (<em>L. vannamei</em> &amp; <em>P. monodon</em>).
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FFD200] flex-shrink-0" />
                <span>CAA Approved</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FFD200] flex-shrink-0" />
                <span>ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FFD200] flex-shrink-0" />
                <span>100% Antibiotic-Free</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/#formulations"
                className="w-full sm:w-auto px-8 py-4 bg-[#FFD200] hover:bg-[#e6bd00] text-[#002B5B] font-heading font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Explore 11 Formulations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/pond-doctor"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-heading font-bold text-sm uppercase tracking-wider rounded-xl backdrop-blur-sm transition-all text-center flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#FFD200]" />
                <span>Pond Doctor Diagnostic</span>
              </Link>
            </div>

            {/* Pre-Paid Pricing Strip */}
            <div className="pt-2 text-xs text-slate-300">
              <span className="font-bold text-[#FFD200]">Transparent Pre-Paid Supply:</span> 5L Can @ ₹5,000 | 1L Bottle @ ₹1,199 &bull; Free Pan-India Delivery
            </div>
          </div>

          {/* Right Packshot Showcase Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-white/10 to-white/5 rounded-3xl p-6 border border-white/20 shadow-2xl backdrop-blur-md flex items-center justify-center">
              {/* Central Catalog Packshot Asset */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/products/catalog_overview_asset.png"
                  alt="Next Farm 11 Aquaculture Formulations Showcase"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Floating Quality Badge Overlay */}
              <div className="absolute -bottom-4 -left-4 bg-[#001D3D] text-white p-3.5 rounded-2xl border border-white/20 shadow-xl flex items-center gap-3">
                <div className="p-2 bg-[#FFD200] text-[#002B5B] rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#FFD200]">100% Bio-Active</div>
                  <div className="text-[11px] text-slate-300">Guaranteed CFU Potency</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
