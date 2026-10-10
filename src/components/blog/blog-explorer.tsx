'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Clock,
  ArrowRight,
  Filter,
  Microscope,
  Droplets,
  Scale,
  ShieldCheck,
  BookOpen,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { BlogArticle } from '@/lib/blog-data';

interface Props {
  initialArticles: BlogArticle[];
}

const CATEGORIES = [
  'All Guides',
  'Disease Pathology',
  'Water Chemistry',
  'Mineral Nutrition',
  'Regulatory & Export',
  'Farmer Guides'
] as const;

export function BlogExplorer({ initialArticles }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Guides');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      // Category filter
      if (selectedCategory !== 'All Guides' && article.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = article.title.toLowerCase().includes(q);
        const matchesExcerpt = article.excerpt.toLowerCase().includes(q);
        const matchesKeywords = article.keywords.some((k) => k.toLowerCase().includes(q));
        const matchesTelugu = (article.teluguKeywords || []).some((k) => k.toLowerCase().includes(q));
        const matchesCondition = (article.targetCondition || '').toLowerCase().includes(q);

        return matchesTitle || matchesExcerpt || matchesKeywords || matchesTelugu || matchesCondition;
      }

      return true;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Controls Bar: Search & Category Pills */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by disease, symptom, or Telugu keyword (e.g. White Gut, Ammonia, EHP, తెల్ల పేగు, Bhimavaram)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-200 px-2 py-0.5 rounded-md"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline-block">
            Filter Topics:
          </span>
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'All Guides'
                ? initialArticles.length
                : initialArticles.filter((a) => a.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
        <span>
          Showing <strong>{filteredArticles.length}</strong> of {initialArticles.length} scientific guides
        </span>
        {searchQuery && (
          <span>
            Filtering by: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <article
            key={article.slug}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="px-2.5 py-1 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {article.readingTime}
                </span>
              </div>

              <Link href={`/blog/${article.slug}`} className="block">
                <h2 className="text-lg sm:text-xl font-black text-[#002D3A] font-display mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                  {article.title}
                </h2>
              </Link>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              {article.teluguKeywords && article.teluguKeywords.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {article.teluguKeywords.slice(0, 3).map((kw, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-bold">
                  {article.recommendedProductName.split('(')[0]}
                </span>
                <span className="text-slate-400">100% Bio</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="text-[11px] text-slate-500">
                  <span className="block font-semibold text-slate-700">{article.author.name}</span>
                  <span>Vijayawada, India</span>
                </div>

                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 group-hover:translate-x-1 transition-all bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <p className="text-base text-slate-600 font-medium">
            No scientific guides matched &ldquo;{searchQuery}&rdquo; in the selected category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Guides');
            }}
            className="text-xs text-emerald-700 font-bold hover:underline"
          >
            Reset Filters &amp; View All 16 Guides
          </button>
        </div>
      )}
    </div>
  );
}
