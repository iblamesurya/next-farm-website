'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  ShoppingBag,
  Zap,
  Check,
  Plus,
  Minus,
  Truck,
  RotateCcw,
  Sparkles,
  MessageCircle,
  Award
} from 'lucide-react';
import { Product } from '@/types/catalog';
import { useCart } from '@/context/cart-context';
import { formatInr } from '@/lib/catalog';
import { ImageCarousel } from './image-carousel';
import { BiologicalAccordion } from './biological-accordion';
import { SpecSheetDownload } from './spec-sheet-download';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const [selectedPack, setSelectedPack] = useState<'5L' | '1L'>('5L');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const price = selectedPack === '5L' ? product.pricing.can5L : product.pricing.bottle1L;
  const mrp = selectedPack === '5L' ? product.pricing.mrp5L || 6500 : product.pricing.mrp1L || 1600;
  const savingsAmount = mrp - price;
  const savingsPct = Math.round((savingsAmount / mrp) * 100);

  const handleAddToCart = () => {
    addItem({ product, packSize: selectedPack, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addItem({ product, packSize: selectedPack, quantity });
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-[#004B50] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/#formulations" className="hover:text-[#004B50] transition-colors">
          Formulations
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main PDP Grid: Left Image Carousel, Right Details & Buy Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column (5 Cols on LG): 1:1 Image Carousel & Badges */}
        <div className="lg:col-span-6 space-y-6">
          <ImageCarousel
            images={product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [product.packshotImage]}
            productName={product.name}
          />

          {/* Regulatory Trust Badges Panel */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col items-center">
              <div className="relative w-10 h-10 mb-1.5">
                <Image
                  src="/images/badges/caa_approved.svg"
                  alt="CAA Approved"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[11px] font-bold text-[#002B5B]">CAA Approved</span>
              <span className="text-[10px] text-slate-500">Govt of India</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-10 h-10 mb-1.5">
                <Image
                  src="/images/badges/iso_9001.svg"
                  alt="ISO 9001:2015"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[11px] font-bold text-[#002B5B]">ISO 9001:2015</span>
              <span className="text-[10px] text-slate-500">Certified Quality</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-10 h-10 mb-1.5">
                <Image
                  src="/images/badges/antibiotic_free.svg"
                  alt="100% Antibiotic-Free"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[11px] font-bold text-emerald-800">100% Antibiotic-Free</span>
              <span className="text-[10px] text-slate-500">Export Compliant</span>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols on LG): Product Copy, Pack Selector, Buy Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            {/* Category Tag */}
            <span className="inline-block px-3 py-1 bg-[#004B50]/10 text-[#004B50] font-heading font-bold text-xs uppercase tracking-wider rounded-md mb-2">
              {product.categoryDisplay || product.category}
            </span>

            {/* Product Title */}
            <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#002B5B] tracking-tight">
              {product.name}
            </h1>

            {/* Tagline */}
            <p className="text-sm sm:text-base font-medium text-slate-600 mt-2 leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-heading font-black text-[#002B5B]">
                {formatInr(price)}
              </span>
              <span className="text-base text-slate-400 line-through">
                {formatInr(mrp)}
              </span>
              <span className="px-2 py-0.5 bg-[#FFD200] text-[#002B5B] text-xs font-extrabold rounded-full">
                SAVE {formatInr(savingsAmount)} ({savingsPct}% OFF)
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <Truck className="w-4 h-4" />
                <span>Free Express Pan-India Delivery</span>
              </span>
              <span>&bull;</span>
              <span>Inclusive of all GST &amp; Taxes</span>
            </div>
          </div>

          {/* Pack Size Selector */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="font-heading font-bold text-sm text-[#002B5B] uppercase tracking-wider">
                Select Pack Size:
              </label>
              <span className="text-xs text-[#004B50] font-semibold">
                {selectedPack === '5L' ? 'Best Value for Pond Treatment' : 'Starter / Precision Pack'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* 5L Can Option */}
              <button
                type="button"
                onClick={() => setSelectedPack('5L')}
                className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                  selectedPack === '5L'
                    ? 'border-[#004B50] bg-[#004B50]/5 ring-1 ring-[#004B50]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-heading font-bold text-sm text-[#002B5B] block">
                      5-Liter Can
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      {product.format5L || 'Industrial Canister'}
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-[#004B50]">
                    {formatInr(product.pricing.can5L)}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-emerald-700 font-semibold">
                  Bulk Aquaculture Tier (Rs. 1,000 / L)
                </div>
              </button>

              {/* 1L Bottle Option */}
              <button
                type="button"
                onClick={() => setSelectedPack('1L')}
                className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                  selectedPack === '1L'
                    ? 'border-[#004B50] bg-[#004B50]/5 ring-1 ring-[#004B50]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-heading font-bold text-sm text-[#002B5B] block">
                      1-Liter Bottle
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      {product.format1L || 'Precision Bottle'}
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-[#004B50]">
                    {formatInr(product.pricing.bottle1L)}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-600">
                  Precision / Nursery Tier
                </div>
              </button>
            </div>
          </div>

          {/* Quantity Selector & Add to Cart Controls */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <label className="font-heading font-bold text-xs uppercase tracking-wider text-slate-700">
                Quantity:
              </label>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 hover:bg-slate-100 text-slate-700 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-extrabold text-[#002B5B]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2.5 hover:bg-slate-100 text-slate-700 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Cart and Buy Now */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`py-4 px-6 rounded-xl font-heading font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#FFD200] hover:bg-[#e6bd00] text-[#002B5B]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="py-4 px-6 bg-[#004B50] hover:bg-[#002B5B] text-white font-heading font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 text-[#FFD200]" />
                <span>Buy Now (Pre-Paid)</span>
              </button>
            </div>

            {/* Pre-Paid Policy Indicator */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>
                <strong>100% Pre-Paid Supply:</strong> Secure online checkout via Razorpay (UPI, GPay, PhonePe, Cards). Cash on Delivery (COD) is strictly unavailable.
              </span>
            </div>
          </div>

          {/* Download Technical Spec Sheet */}
          <div className="pt-2">
            <SpecSheetDownload
              specSheetPdf={product.specSheetPdf}
              productName={product.name}
            />
          </div>

          {/* Direct Technical Helpline */}
          <div className="pt-2">
            <a
              href={`https://wa.me/918977656444?text=Hello%20Next%20Farm%20Team%2C%20I%20have%20a%20technical%20question%20regarding%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Have questions about {product.name}? Chat on WhatsApp (+91 8977656444)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Accordions Section: Biological Mechanism, Strains, Dosage */}
      <div className="mt-14 pt-10 border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-heading font-black text-2xl text-[#002B5B]">
              Biological Science &amp; Clinical Protocols
            </h2>
            <p className="text-sm text-slate-500">
              Complete active ingredients, biological mode of action, and pond application schedules
            </p>
          </div>

          <BiologicalAccordion product={product} />
        </div>
      </div>

      {/* Related Formulations Grid */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-bold text-[#004B50] uppercase tracking-wider block">
                Complementary Formulations
              </span>
              <h2 className="font-heading font-black text-2xl text-[#002B5B] mt-1">
                Frequently Paired Formulations
              </h2>
            </div>
            <Link
              href="/#formulations"
              className="text-xs font-bold text-[#004B50] hover:underline"
            >
              View All 11 &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <div
                key={relProduct.id}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full bg-slate-50 rounded-lg p-4 mb-4">
                    <Image
                      src={relProduct.packshotImage}
                      alt={relProduct.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-[#004B50] uppercase tracking-wider">
                    {relProduct.categoryDisplay || relProduct.category}
                  </span>
                  <h3 className="font-heading font-bold text-base text-[#002B5B] mt-1">
                    {relProduct.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {relProduct.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-[#002B5B]">
                    {formatInr(relProduct.pricing.can5L)}
                  </span>
                  <Link
                    href={`/products/${relProduct.slug}`}
                    className="text-xs font-bold text-[#004B50] hover:text-[#002B5B] uppercase tracking-wider"
                  >
                    View PDP &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
