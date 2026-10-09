'use client';

import React from 'react';
import { CURATED_BUNDLES, CuratedBundle } from '@/lib/diagnostic-engine';
import { PRODUCTS, formatInr } from '@/lib/catalog';
import { useCart } from '@/context/cart-context';
import { PackageCheck, ShoppingBag, Tag, CheckCircle2 } from 'lucide-react';

export function CuratedBundlesSection() {
  const { addItem, openCart } = useCart();

  const handleAddBundleToCart = (bundle: CuratedBundle) => {
    for (const item of bundle.items) {
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
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD200]/20 text-[#002B5B] font-heading font-extrabold text-xs uppercase tracking-wider rounded-full">
          <Tag className="w-3.5 h-3.5 text-[#004B50]" />
          <span>Clinical Aquaculture Bundles</span>
        </span>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#002B5B]">
          Pre-Configured Treatment Bundles
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Save up to 13% with multi-stage synergistic biotechnology protocols curated by our aquaculture specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURATED_BUNDLES.map((bundle) => (
          <div
            key={bundle.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#004B50] hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 bg-[#004B50]/10 text-[#004B50] rounded-full">
                  {bundle.badge}
                </span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Save {formatInr(bundle.savings)}
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-lg text-[#002B5B] mb-1.5">
                {bundle.name}
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                {bundle.tagline}
              </p>

              {/* Items List */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2 mb-4 text-xs">
                <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">
                  Includes in this Bundle:
                </span>
                {bundle.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#004B50] flex-shrink-0" />
                      <span>{item.productName} ({item.packSize})</span>
                    </span>
                    <span className="font-bold">× {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through mr-2">
                    {formatInr(bundle.originalPrice)}
                  </span>
                  <span className="font-heading font-black text-2xl text-[#004B50]">
                    {formatInr(bundle.bundlePrice)}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold">Pre-Paid</span>
              </div>

              <button
                type="button"
                onClick={() => handleAddBundleToCart(bundle)}
                className="w-full py-3 px-4 bg-[#FFD200] hover:bg-[#e6bd00] text-[#002B5B] font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#004B50]" />
                <span>Add Bundle to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
