'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Phone,
  MessageSquare,
  ShoppingCart,
  ShieldCheck,
  ChevronRight,
  Info,
  Clock,
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { SolutionPageData } from '@/lib/solutions-data';
import { Product, PackSize } from '@/types/catalog';
import { useCart } from '@/context/cart-context';

interface SolutionDetailViewProps {
  solution: SolutionPageData;
  primaryProduct: Product;
  secondaryProduct?: Product;
  relatedSolutions: SolutionPageData[];
}

export function SolutionDetailView({
  solution,
  primaryProduct,
  secondaryProduct,
  relatedSolutions
}: SolutionDetailViewProps) {
  const { addItem, openCart } = useCart();
  const [selectedPack, setSelectedPack] = useState<PackSize>('5L');
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const getPrice = (pack: PackSize) => {
    if (pack === '1L') return primaryProduct.pricing?.bottle1L || 1199;
    if (pack === '2L') return primaryProduct.pricing?.pack2L || 2299;
    return primaryProduct.pricing?.can5L || 5000;
  };

  const getMrp = (pack: PackSize) => {
    if (pack === '1L') return primaryProduct.pricing?.mrp1L || 1600;
    if (pack === '2L') return primaryProduct.pricing?.mrp2L || 3200;
    return primaryProduct.pricing?.mrp5L || 6500;
  };

  const unitPrice = getPrice(selectedPack);
  const mrpPrice = getMrp(selectedPack);
  const savings = mrpPrice - unitPrice;

  const handleAddToCart = () => {
    addItem({
      product: primaryProduct,
      packSize: selectedPack,
      quantity
    });
    openCart();
  };

  const encodedWhatsApp = encodeURIComponent(
    `Hello Next Farm Bio Sciences! I need urgent consultation regarding ${solution.diseaseName} in my shrimp pond. Can your aqua scientist advise on dosage of ${primaryProduct.name}?`
  );

  return (
    <div className="bg-[#F4F7F8] min-h-screen pb-20">
      {/* Top Urgent Emergency Alert Strip */}
      <div className="bg-[#002D3A] text-white py-2.5 px-4 text-xs font-medium border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-300">24/7 Aqua Technical Helpline Active:</span>
            <span>Same-Day Express Dispatch from New Autonagar, Vijayawada</span>
          </div>
          <a
            href={`https://wa.me/918977656444?text=${encodedWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#FFD200] hover:underline font-bold"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat with Scientist on WhatsApp (+91 8977656444)</span>
          </a>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/solutions" className="hover:text-emerald-700">Pond Solutions & Treatments</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate">{solution.targetKeyword}</span>
        </nav>
      </div>

      {/* Main Solution Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-red-100 text-red-700 border border-red-200">
              {solution.severityLevel}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              CAA Approved & 100% Antibiotic-Free
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
              Species: {solution.affectedSpecies}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#002D3A] tracking-tight font-display mb-4">
            {solution.targetKeyword}
          </h1>
          <p className="text-base sm:text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">
            {solution.tagline}. Clinically formulated to eliminate symptoms without antibiotic residues or export penalties.
          </p>

          {/* Quick Summary Product Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-slate-100 pt-8">
            {/* Left: Product Showcase & Buy Widget */}
            <div className="lg:col-span-7 bg-[#F8FAFB] rounded-2xl p-6 border border-slate-200/90">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                  Prescribed Biological Input
                </span>
                <span className="text-xs text-slate-500 font-medium">Ready Stock in AP Hub</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 bg-white rounded-xl p-3 shadow-inner border border-slate-200 flex-shrink-0">
                  <Image
                    src={primaryProduct.packshotImage}
                    alt={primaryProduct.name}
                    fill
                    className="object-contain p-2"
                    sizes="200px"
                  />
                </div>

                <div className="flex-1 w-full">
                  <h3 className="text-xl font-black text-[#002D3A] font-display">
                    {primaryProduct.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 mb-4">
                    {primaryProduct.tagline}
                  </p>

                  {/* 3-Variant Switcher Buttons */}
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Select Can / Bottle Size:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['1L', '2L', '5L'] as PackSize[]).map((pack) => {
                        const price = getPrice(pack);
                        const isSelected = selectedPack === pack;
                        return (
                          <button
                            key={pack}
                            type="button"
                            onClick={() => setSelectedPack(pack)}
                            className={`p-2 rounded-xl text-center border transition-all ${
                              isSelected
                                ? 'bg-[#002D3A] text-white border-[#002D3A] shadow-md ring-2 ring-emerald-400/50'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="text-xs font-black">{pack}</div>
                            <div className={`text-[11px] font-bold ${isSelected ? 'text-[#FFD200]' : 'text-slate-800'}`}>
                              ₹{price.toLocaleString('en-IN')}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-black text-[#002D3A] font-display">
                      ₹{unitPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ₹{mrpPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Save ₹{savings.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-300 rounded-xl bg-white px-2 py-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2 text-slate-500 hover:text-slate-900 font-black text-sm"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-800">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2 text-slate-500 hover:text-slate-900 font-black text-sm"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="flex-1 bg-[#107C41] hover:bg-[#0E6837] text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Order {selectedPack} Online</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Fast Facts & Hotline Box */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Clinical Efficacy Guarantee</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Dosage in Feed:</strong> {solution.dosageGuide.feedDose}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Water Broadcast:</strong> {solution.dosageGuide.waterDose}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Turnaround Time:</strong> 48 to 72 hours noticeable recovery</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#002D3A] text-white rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-[#FFD200] font-bold text-sm">
                  <Phone className="w-4 h-4" />
                  <span>Talk Directly to Chief Aqua Scientist</span>
                </div>
                <p className="text-xs text-slate-300">
                  Unsure of water parameters or mortality rate? Share water test readings for immediate customized dosage.
                </p>
                <div className="flex gap-2 pt-1">
                  <a
                    href="tel:+918977656444"
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-3 rounded-xl text-center text-xs border border-white/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-[#FFD200]" />
                    <span>Call +91 8977656444</span>
                  </a>
                  <a
                    href={`https://wa.me/918977656444?text=${encodedWhatsApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#20BE5A] text-white font-bold py-2 px-3 rounded-xl text-center text-xs transition-all flex items-center justify-center gap-1.5 shadow"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Symptoms & Root Causes Side-by-Side */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Symptoms Checklist */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#002D3A] font-display">
                  Recognizing the Symptoms
                </h2>
                <p className="text-xs text-slate-500">Visual indicators observed in check trays and water</p>
              </div>
            </div>

            <ul className="space-y-3.5">
              {solution.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 bg-red-50/40 p-3 rounded-xl border border-red-100/60">
                  <span className="w-5 h-5 rounded-full bg-red-200 text-red-800 text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Root Causes */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#002D3A] font-display">
                  Biological Root Causes
                </h2>
                <p className="text-xs text-slate-500">Pathogens, water chemistry & environmental triggers</p>
              </div>
            </div>

            <ul className="space-y-3.5">
              {solution.rootCauses.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 bg-amber-50/40 p-3 rounded-xl border border-amber-100/60">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{cause}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5-Day Clinical Treatment Protocol Timetable */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Field-Tested Application Schedule</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-[#002D3A] font-display">
                5-Day Step-by-Step Treatment Protocol
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Follow this exact day-by-day regimen to achieve full clinical recovery.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="bg-[#002D3A] hover:bg-[#003B4C] text-white text-xs font-bold py-3 px-5 rounded-xl shadow transition-all flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4 text-[#FFD200]" />
              <span>Get {primaryProduct.name} ({selectedPack})</span>
            </button>
          </div>

          <div className="space-y-4">
            {solution.dayProtocol.map((step, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 transition-colors bg-gradient-to-r from-white to-slate-50/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                  <span className="text-sm font-black text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-lg">
                    {step.day}
                  </span>
                  <span className="text-xs text-slate-500 italic">
                    {step.notes}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider text-emerald-700 mb-1">
                      Feed Protocol:
                    </span>
                    <p className="text-slate-600">{step.feedApplication}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider text-blue-700 mb-1">
                      Water & Aeration Action:
                    </span>
                    <p className="text-slate-600">{step.waterApplication}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Farmer Field Case Study */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gradient-to-br from-[#002D3A] to-[#014154] text-white rounded-3xl p-6 sm:p-10 shadow-lg">
          <div className="flex items-center gap-2 text-[#FFD200] text-xs font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Verified Field Case Study</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-display mb-4">
            Farmer Case: {solution.farmerCaseStudy.farmerName} ({solution.farmerCaseStudy.location})
          </h2>
          <div className="bg-white/10 rounded-2xl p-4 sm:p-6 border border-white/15 backdrop-blur-sm">
            <div className="text-xs text-emerald-300 font-bold mb-2">
              Pond Size & DOC: {solution.farmerCaseStudy.pondSize}
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
              &quot;{solution.farmerCaseStudy.result}&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ Accordion with Schema Markup) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#002D3A] font-display">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500">Expert scientific guidance for prawn & shrimp cultivators</p>
            </div>
          </div>

          <div className="space-y-3">
            {solution.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-[#002D3A]">
                      {faq.question}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Conditions & Treatments */}
      {relatedSolutions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h3 className="text-lg font-black text-[#002D3A] font-display mb-4">
            Related Aquaculture Disease Guides
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedSolutions.map((rel) => (
              <Link
                key={rel.slug}
                href={`/solutions/${rel.slug}`}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group block"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                  {rel.severityLevel}
                </span>
                <h4 className="text-sm font-bold text-[#002D3A] group-hover:text-emerald-700 transition-colors mt-2 mb-1">
                  {rel.targetKeyword}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {rel.tagline}
                </p>
                <div className="mt-3 text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
