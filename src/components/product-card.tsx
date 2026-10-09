'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';
import { Product, PackSize } from '@/types/catalog';
import { useCart } from '@/context/cart-context';
import { formatInr } from '@/lib/catalog';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedPack, setSelectedPack] = useState<PackSize>('5L');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const price =
    selectedPack === '5L'
      ? product.pricing.can5L
      : selectedPack === '2L'
      ? product.pricing.pack2L || 2299
      : product.pricing.bottle1L;

  const mrp =
    selectedPack === '5L'
      ? product.pricing.mrp5L || 6500
      : selectedPack === '2L'
      ? product.pricing.mrp2L || 3200
      : product.pricing.mrp1L || 1600;

  const savingsPct = Math.round(((mrp - price) / mrp) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ product, packSize: selectedPack });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#004B50]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* 1:1 Image Container */}
      <div className="relative aspect-square w-full bg-slate-50 p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#FFD200] text-[#002B5B] shadow-sm">
            {savingsPct}% OFF
          </span>
        </div>

        {/* CAA Approved Trust Indicator */}
        <div className="absolute top-3 right-3 z-10 flex gap-1">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#004B50] text-white shadow-sm">
            <ShieldCheck className="w-3 h-3 text-[#FFD200]" />
            <span>CAA Regd</span>
          </span>
        </div>

        {/* 1:1 Packshot Image */}
        <Link href={`/products/${product.slug}`} className="relative w-full h-full block">
          <Image
            src={product.packshotImage}
            alt={`${product.name} 1:1 Studio Packshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transform group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category Tag */}
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#004B50] mb-1">
            {product.categoryDisplay || product.category}
          </div>

          {/* Product Name */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-heading font-extrabold text-lg text-[#002B5B] group-hover:text-[#004B50] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Tagline */}
          <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>

          {/* CFU / Strains Highlight */}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="text-[11px] font-semibold text-slate-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
              <span className="line-clamp-1">{product.cfuCount}</span>
            </div>
          </div>
        </div>

        {/* Pricing & 3-Variant Pack Selector */}
        <div className="space-y-3 pt-2">
          {/* 3-Variant Switcher: 1L, 2L, 5L */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setSelectedPack('1L')}
              className={`py-1.5 px-1 text-center text-xs font-bold rounded-md transition-all ${
                selectedPack === '1L'
                  ? 'bg-white text-[#002B5B] shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1L Bottle
            </button>
            <button
              type="button"
              onClick={() => setSelectedPack('2L')}
              className={`py-1.5 px-1 text-center text-xs font-bold rounded-md transition-all ${
                selectedPack === '2L'
                  ? 'bg-white text-[#002B5B] shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2L Pack
            </button>
            <button
              type="button"
              onClick={() => setSelectedPack('5L')}
              className={`py-1.5 px-1 text-center text-xs font-bold rounded-md transition-all ${
                selectedPack === '5L'
                  ? 'bg-white text-[#002B5B] shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              5L Can
            </button>
          </div>

          {/* Price Row */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xl font-heading font-black text-[#002B5B]">
                {formatInr(price)}
              </span>
              <span className="ml-2 text-xs text-slate-400 line-through">
                {formatInr(mrp)}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Free Delivery
            </span>
          </div>

          {/* Actions: Add to Cart + View Details */}
          <div className="grid grid-cols-5 gap-2 pt-1">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`col-span-3 py-2.5 px-3 rounded-lg font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#FFD200] hover:bg-[#e6bd00] text-[#002B5B]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <Link
              href={`/products/${product.slug}`}
              className="col-span-2 py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1 transition-colors text-center"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
