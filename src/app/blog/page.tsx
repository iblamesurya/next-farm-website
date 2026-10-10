import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, BookOpen, Clock, Calendar, Microscope, Award, Sparkles, MessageSquare, Phone } from 'lucide-react';
import { BLOG_ARTICLES } from '@/lib/blog-data';
import { getBreadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Aquaculture Pathology & Prawn Farming Clinical Blog | Next Farm Bio Sciences',
  description:
    'Comprehensive scientific articles, diagnostic manuals, and biological protocols for commercial Litopenaeus vannamei and Penaeus monodon aquaculture in India. 100% antibiotic-free CAA-approved guidance.',
  keywords: [
    'Aquaculture blog India',
    'Shrimp disease management guide',
    'Vannamei white gut treatment',
    'Ammonia reduction in shrimp pond',
    'CAA approved probiotics Andhra Pradesh',
    'Bhimavaram aqua medicine',
    'Nellore prawn culture',
    'రొయ్యల సాగు బ్లాగ్',
    'Next Farm Bio Sciences blog'
  ],
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/blog'
  },
  openGraph: {
    title: 'Aquaculture Pathology & Prawn Farming Clinical Blog | Next Farm Bio Sciences',
    description:
      'Scientific articles on White Gut, Ammonia TAN, Luminescent Vibrio, CAA 20 Banned Antibiotics, and Andhra Pradesh regional pond management.',
    url: 'https://nextfarmbiosciences.app/blog',
    siteName: 'Next Farm Bio Sciences',
    locale: 'en_IN',
    type: 'website'
  }
};

export default function BlogIndexPage() {
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: 'https://nextfarmbiosciences.app' },
    { name: 'Clinical Blog & Research', url: 'https://nextfarmbiosciences.app/blog' }
  ]);

  const blogCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://nextfarmbiosciences.app/blog#collection',
    name: 'Aquaculture Pathology & Prawn Farming Clinical Blog',
    description: 'Scientific articles, diagnostic manuals, and biological protocols for commercial shrimp culture in India.',
    url: 'https://nextfarmbiosciences.app/blog',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: BLOG_ARTICLES.map((article, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: article.title,
        url: `https://nextfarmbiosciences.app/blog/${article.slug}`,
        description: article.excerpt
      }))
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#002D3A] via-[#003847] to-[#014154] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
              <Microscope className="w-3.5 h-3.5" />
              <span>Official Biotechnology Research &amp; Clinical Knowledge Hub</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
              CAA Certified • ISO 9001:2015
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight max-w-4xl mb-4 text-white">
            Aquaculture Clinical Research &amp; Field Guides
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            Exhaustive scientific monographs on penaeid shrimp diseases, water chemistry equilibrium, and Coastal Aquaculture Authority (CAA) approved biological bio-inputs. Authored by the Next Farm Bio Sciences research team in Vijayawada, Andhra Pradesh.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/15">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Antibiotic-Free Protocols</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/15">
              <Award className="w-4 h-4 text-[#FFD200]" />
              <span>Calibrated for L. vannamei &amp; P. monodon</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/15">
              <BookOpen className="w-4 h-4 text-cyan-300" />
              <span>Bilingual Telugu &amp; English Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_ARTICLES.map((article) => (
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
                    <Clock className="w-3.5 h-3.5" />
                    {article.readingTime}
                  </span>
                </div>

                <Link href={`/blog/${article.slug}`} className="block">
                  <h2 className="text-xl font-black text-[#002D3A] font-display mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                    {article.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {article.teluguKeywords && article.teluguKeywords.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {article.teluguKeywords.slice(0, 3).map((kw, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    <span className="block font-semibold text-slate-700">{article.author.name}</span>
                    <span>Vijayawada, India</span>
                  </div>

                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 group-hover:translate-x-1 transition-all"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Clinical Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-[#002D3A] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              Direct Factory Consultation from Vijayawada
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-display mb-2">
              Need Instant Water Analysis or Dosage Assistance?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Talk directly with our aquaculture biologists in New Autonagar, Vijayawada or calculate your pond requirements with our interactive <strong>Pond Doctor</strong> engine.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/pond-doctor"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-xl transition text-sm flex items-center gap-2"
            >
              <span>Launch Pond Doctor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/918977656444?text=Hello%20Next%20Farm%20Team,%20I%20need%20technical%20guidance%20for%20my%20shrimp%20pond"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20BE5A] text-white font-bold px-5 py-3 rounded-xl transition text-sm flex items-center gap-2 shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp: +91 89776 56444</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
