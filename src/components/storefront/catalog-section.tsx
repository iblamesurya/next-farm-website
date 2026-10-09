'use client';

import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter } from 'lucide-react';
import { Product, ProductCategory } from '@/types/catalog';
import { ProductCard } from '@/components/product-card';

interface CatalogSectionProps {
  products: Product[];
}

const CATEGORIES: { label: string; value: 'all' | ProductCategory }[] = [
  { label: 'All 11 Formulations', value: 'all' },
  { label: 'Pathogen Control', value: 'pathogen-control' },
  { label: 'Water Conditioners', value: 'water-conditioner' },
  { label: 'Feed Supplements', value: 'feed-supplement' },
  { label: 'Benthic Digestion', value: 'organic-digestion' },
  { label: 'Ionic Minerals', value: 'mineral-supplement' }
];

export function CatalogSection({ products }: CatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.strains.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.indications.some((ind) => ind.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <section id="formulations" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#004B50]/10 text-[#004B50] font-heading font-extrabold text-xs uppercase tracking-wider rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Commercial Catalog</span>
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#002B5B] tracking-tight">
            11 Targeted Aquaculture Formulations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Eliminate antibiotic dependency and toxic chemical treatments. Pharmaceutical-grade bio-active
            consortia and ionic minerals designed specifically for intensive Indian prawn and shrimp aquaculture.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all shadow-sm ${
                  activeCategory === cat.value
                    ? 'bg-[#002B5B] text-white ring-2 ring-[#002B5B]/30'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by pathogen, strain, or name..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#004B50] text-slate-800 placeholder-slate-400 shadow-sm"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
            <p className="text-slate-500 text-sm">
              No formulations found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#004B50] text-white text-xs font-bold rounded-lg hover:bg-[#002B5B] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pricing Transparency Guarantee Callout */}
        <div className="mt-16 bg-[#002B5B] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border-l-8 border-[#FFD200]">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              Transparent Pre-Paid Farmer Pricing
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              All 11 formulations are supplied at standard commercial rates: <strong>₹5,000 / 5-Liter Can</strong> (or 10kg/5kg dry equivalent) and <strong>₹1,199 / 1-Liter Bottle</strong> (or 1kg/2kg dry equivalent). Zero hidden costs, free delivery pan-India.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/918977656444?text=Hello%20Next%20Farm%20Team%2C%20I%20would%20like%20to%20order%20formulations"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#FFD200] hover:bg-[#e6bd00] text-[#002B5B] font-heading font-extrabold text-xs uppercase tracking-wider rounded-lg text-center shadow-md transition-all whitespace-nowrap"
            >
              Bulk Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
