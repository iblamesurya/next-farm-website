'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DiagnosticResult,
  CLINICAL_SYMPTOMS
} from '@/lib/diagnostic-engine';
import { PRODUCTS, formatInr } from '@/lib/catalog';
import { useCart } from '@/context/cart-context';
import {
  Sparkles,
  ShoppingBag,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface PrescriptionCardProps {
  prescription: DiagnosticResult;
}

export function PrescriptionCard({ prescription }: PrescriptionCardProps) {
  const { addItem, openCart } = useCart();

  const handleAddAllToCart = () => {
    for (const item of prescription.bundleItems) {
      const product = PRODUCTS.find((p) => p.slug === item.productId);
      if (product) {
        addItem({
          product,
          packSize: item.packSize,
          quantity: item.quantity
        });
      }
    }
    openCart();
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#004B50] shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-[#002B5B] text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD200] text-[#002B5B] font-heading font-extrabold text-xs uppercase tracking-wider rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Targeted Clinical Formulation Prescription</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Custom Aquaculture Rx
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Engineered for {prescription.acreage} Acres at {prescription.waterDepthMeters.toFixed(2)}m Depth (Severity: {prescription.severity.toUpperCase()})
          </p>
        </div>

        <div className="text-right md:border-l md:border-white/20 md:pl-8 flex flex-col justify-center">
          <span className="text-xs text-slate-300 font-semibold block">Total Treatment Investment</span>
          <span className="font-heading font-black text-3xl sm:text-4xl text-[#FFD200] block mt-0.5">
            {formatInr(prescription.bundleTotalInr)}
          </span>
          <span className="text-[11px] text-emerald-400 font-bold block mt-0.5">
            ✓ Free Express Freight Included
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Prescribed Products Grid */}
        <div>
          <h3 className="font-heading font-bold text-lg text-[#002B5B] mb-4">
            Prescribed Formulations & Can Allocation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prescription.allocations.map((alloc) => {
              const product = PRODUCTS.find((p) => p.slug === alloc.productSlug);
              if (!product) return null;

              return (
                <div
                  key={alloc.productSlug}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-[#004B50] transition-colors"
                >
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 bg-white rounded-lg p-1 border border-slate-200 flex-shrink-0">
                        <Image
                          src={product.packshotImage}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                              alloc.role === 'primary'
                                ? 'bg-[#004B50] text-[#FFD200]'
                                : 'bg-slate-200 text-slate-800'
                            }`}
                          >
                            {alloc.role === 'primary' ? 'Primary Formulation' : 'Synergistic Support'}
                          </span>
                          <Link
                            href={`/products/${product.slug}`}
                            target="_blank"
                            className="text-xs text-[#004B50] hover:text-[#002B5B] font-bold flex items-center gap-0.5"
                          >
                            <span>PDP</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>

                        <h4 className="font-heading font-extrabold text-base text-[#002B5B] mt-1">
                          {product.name}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {product.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Pack Allocation */}
                    <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Required Volume / Weight:</span>
                        <strong className="text-slate-800">{alloc.requiredLitersOrKg} Liters/Kg</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Pack Size Breakdown:</span>
                        <span className="font-bold text-[#002B5B]">
                          {alloc.cans5L > 0 && `${alloc.cans5L} × 5L Can `}
                          {alloc.bottles1L > 0 && `${alloc.bottles1L} × 1L Bottle`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Cost:</span>
                    <span className="font-heading font-extrabold text-base text-[#004B50]">
                      {formatInr(alloc.totalCostInr)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 1-Click Cart Button */}
        <div className="bg-[#FFD200]/15 border border-[#FFD200]/50 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading font-black text-base text-[#002B5B]">
              Ready to Treat Your Pond?
            </h4>
            <p className="text-xs text-slate-600">
              Bundle all {prescription.bundleItems.length} prescribed items directly into your pre-paid cart.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddAllToCart}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#FFD200] hover:bg-[#e6bd00] text-[#002B5B] font-heading font-black text-sm uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#004B50]" />
            <span>Add Prescribed Treatment to Cart</span>
          </button>
        </div>

        {/* Stage-Wise Application Schedules */}
        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[#004B50]" />
            <h3 className="font-heading font-bold text-lg text-[#002B5B]">
              Stage-Wise Clinical Application Schedule
            </h3>
          </div>

          <div className="space-y-4">
            {prescription.symptoms.map((symKey) => {
              const sym = CLINICAL_SYMPTOMS[symKey];
              if (!sym) return null;

              return (
                <div key={symKey} className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#004B50]" />
                    <h4 className="font-heading font-extrabold text-sm text-[#002B5B]">
                      {sym.label} Treatment Protocol
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sym.recommendedSchedule.map((sched, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border border-slate-200 text-xs space-y-1">
                        <span className="font-bold text-[#004B50] block">{sched.day}</span>
                        <strong className="text-slate-800 block">{sched.action}</strong>
                        <p className="text-slate-600 leading-relaxed">{sched.instructions}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Biosecurity Guarantee Footnote */}
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            All formulations are 100% Antibiotic-Free and approved by the Coastal Aquaculture Authority (CAA). Guaranteed non-toxic to beneficial diatom blooms when dosed per schedule.
          </p>
        </div>
      </div>
    </div>
  );
}
