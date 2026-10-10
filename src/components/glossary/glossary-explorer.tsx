'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { GLOSSARY_TERMS, GlossaryTerm } from '@/lib/glossary-data';
import { Search, Sparkles, BookOpen, ExternalLink, Filter } from 'lucide-react';

const CATEGORIES = [
  'All Categories',
  'Pathology & Disease',
  'Water Quality & Chemistry',
  'Nutrition & Feed Management',
  'Pond Soil & Bioremediation',
  'Microbiology & Probiotics'
] as const;

export function GlossaryExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All Categories' || item.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        item.term.toLowerCase().includes(query) ||
        (item.acronym && item.acronym.toLowerCase().includes(query)) ||
        item.shortDefinition.toLowerCase().includes(query) ||
        item.detailedExplanation.toLowerCase().includes(query) ||
        item.teluguExplanation.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div>
      {/* Controls: Search Bar & Category Filter */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Search Box */}
          <div className="relative md:col-span-2">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by term (e.g. FCR, EHP, Ammonia, TCBS, లేదా తెలుగులో)..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004B50] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Result Count Indicator */}
          <div className="flex items-center justify-between md:justify-end gap-2 text-xs font-bold text-slate-600">
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Showing {filteredTerms.length} of {GLOSSARY_TERMS.length} Terms
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-slate-100 mt-6 pb-1">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0 mr-1" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#002B5B] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Terms */}
      {filteredTerms.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No matching clinical terms found</h3>
          <p className="text-xs text-slate-500 mb-4">
            Try adjusting your search query or switching category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
            }}
            className="px-4 py-2 bg-[#004B50] text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTerms.map((t) => (
            <article
              key={t.slug}
              id={t.slug}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-[#004B50] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Tag & Acronym */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 uppercase tracking-wider">
                    {t.category}
                  </span>
                  {t.acronym && (
                    <span className="text-xs font-extrabold text-[#002B5B] bg-slate-100 px-2.5 py-0.5 rounded-md font-mono">
                      {t.acronym}
                    </span>
                  )}
                </div>

                {/* Term Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-[#002B5B] font-heading mb-3">
                  {t.term}
                </h2>

                {/* Short Definition (Featured Snippet Block) */}
                <div className="bg-slate-50 p-4 rounded-2xl border-l-4 border-[#004B50] mb-4">
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                    {t.shortDefinition}
                  </p>
                </div>

                {/* Detailed Clinical Explanation */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {t.detailedExplanation}
                </p>

                {/* Clinical Importance */}
                <div className="mb-4 text-xs">
                  <span className="font-bold text-slate-800 block mb-1">Clinical Importance:</span>
                  <p className="text-slate-600">{t.clinicalImportance}</p>
                </div>

                {/* Telugu Translation Box */}
                <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 mb-4">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    తెలుగు వివరణ (Telugu Clinical Note):
                  </span>
                  <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                    {t.teluguExplanation}
                  </p>
                </div>
              </div>

              {/* Footer: Indicator / Range + Product Links */}
              <div className="border-t border-slate-100 pt-4 mt-2">
                {t.optimalRangeOrIndicator && (
                  <div className="text-[11px] font-mono text-slate-500 mb-3 bg-slate-100/70 px-3 py-1.5 rounded-lg">
                    <span className="font-bold text-slate-700 font-sans">Target Benchmark:</span>{' '}
                    {t.optimalRangeOrIndicator}
                  </div>
                )}

                {t.relatedProducts && t.relatedProducts.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Related:</span>
                    {t.relatedProducts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#004B50] hover:text-[#002B5B] bg-[#004B50]/5 hover:bg-[#004B50]/10 px-2 py-1 rounded-md transition-colors"
                      >
                        <span>{p.name}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
