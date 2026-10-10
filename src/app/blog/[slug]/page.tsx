import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ShieldCheck,
  ArrowRight,
  Clock,
  Calendar,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Table,
  HelpCircle,
  MessageSquare,
  Phone,
  Bookmark,
  Share2,
  Sparkles,
  Calculator,
  Microscope,
  Award,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { BLOG_ARTICLES, BlogArticle } from '@/lib/blog-data';
import { getBreadcrumbJsonLd } from '@/lib/structured-data';
import { InteractiveInPostCalculator } from '@/components/blog/interactive-in-post-calculator';
import { InstitutionalComparisonCard } from '@/components/blog/institutional-comparison-card';
import { TeluguClinicalCard } from '@/components/blog/telugu-clinical-card';
import { PrintableFieldProtocol } from '@/components/blog/printable-field-protocol';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found | Next Farm Bio Sciences'
    };
  }

  return {
    title: `${article.metaTitle} | Next Farm Bio Sciences`,
    description: article.metaDescription,
    keywords: [...article.keywords, ...(article.teluguKeywords || [])],
    alternates: {
      canonical: `https://nextfarmbiosciences.app/blog/${article.slug}`
    },
    openGraph: {
      title: `${article.title} | Next Farm Bio Sciences`,
      description: article.metaDescription,
      url: `https://nextfarmbiosciences.app/blog/${article.slug}`,
      siteName: 'Next Farm Bio Sciences',
      locale: 'en_IN',
      type: 'article',
      publishedTime: article.publishDate,
      authors: [article.author.name]
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: 'https://nextfarmbiosciences.app' },
    { name: 'Blog', url: 'https://nextfarmbiosciences.app/blog' },
    { name: article.title, url: `https://nextfarmbiosciences.app/blog/${article.slug}` }
  ]);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `https://nextfarmbiosciences.app/blog/${article.slug}#article`,
    headline: article.title,
    description: article.metaDescription,
    url: `https://nextfarmbiosciences.app/blog/${article.slug}`,
    datePublished: `${article.publishDate}T08:00:00+05:30`,
    dateModified: '2026-10-10T12:00:00+05:30',
    inLanguage: 'en-IN',
    articleSection: article.category,
    keywords: article.keywords.join(', '),
    publisher: {
      '@type': 'Organization',
      name: 'Next Farm Bio Sciences',
      url: 'https://nextfarmbiosciences.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nextfarmbiosciences.app/images/branding/logo_primary.png'
      }
    },
    author: {
      '@type': 'Organization',
      name: article.author.name,
      description: article.author.title
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Biological Clinical Protocol for ${article.targetCondition || article.title}`,
    description: article.excerpt,
    step: article.contentSections
      .filter((s) => s.bulletPoints && s.bulletPoints.length > 0)
      .flatMap((s) => s.bulletPoints || [])
      .map((stepText, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        text: stepText
      }))
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24 text-slate-900">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* Header Banner */}
      <header className="bg-gradient-to-br from-[#002D3A] via-[#003847] to-[#014154] text-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              href="/blog"
              className="text-xs text-emerald-400 hover:underline font-semibold"
            >
              ← Back to All Guides
            </Link>
            <span className="text-slate-400 text-xs">•</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              {article.category}
            </span>
            {article.relatedDiseaseSlug && (
              <>
                <span className="text-slate-400 text-xs">•</span>
                <Link
                  href={`/diseases/${article.relatedDiseaseSlug}`}
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30 transition-colors flex items-center gap-1"
                >
                  <Microscope className="w-3 h-3" />
                  <span>Clinical Disease Monograph →</span>
                </Link>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-4 leading-tight">
            {article.title}
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 leading-relaxed mb-6">
            {article.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 border-t border-white/10 pt-4">
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Published: {article.publishDate}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{article.readingTime}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CAA Certified • ISO 9001:2015</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-[#FFD200]">
              <Award className="w-3.5 h-3.5" />
              <span>100% Antibiotic-Free</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-28 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#002D3A] uppercase tracking-wider text-[11px]">
                <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
                <span>Table of Contents</span>
              </div>
              <nav className="space-y-1.5 text-slate-600">
                {article.tableOfContents.map((toc) => (
                  <a
                    key={toc.id}
                    href={`#${toc.id}`}
                    className="block hover:text-emerald-700 py-1 transition-colors leading-snug"
                  >
                    {toc.title}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[10px] text-slate-400 block font-medium">Recommended Bio-Input:</span>
                <Link
                  href={`/products/${article.recommendedProductSlug}`}
                  className="font-bold text-emerald-700 hover:underline block text-xs"
                >
                  {article.recommendedProductName} →
                </Link>
                <Link
                  href="/calculators"
                  className="font-semibold text-cyan-700 hover:underline block text-xs"
                >
                  Aqua Calculators Suite →
                </Link>
                <Link
                  href="/pond-doctor"
                  className="font-semibold text-purple-700 hover:underline block text-xs"
                >
                  Pond Doctor Diagnostic Tool →
                </Link>
              </div>
            </div>
          </aside>

          {/* Article Main Body */}
          <main className="lg:col-span-3 space-y-8">
            {/* Lead Callout */}
            <div className="bg-white rounded-2xl p-6 border-l-4 border-emerald-500 shadow-sm text-sm text-slate-700 leading-relaxed">
              <strong>Clinical Executive Summary:</strong> {article.excerpt}
            </div>

            {/* Print Protocol Button */}
            <PrintableFieldProtocol
              articleTitle={article.title}
              recommendedProductName={article.recommendedProductName}
              dosageSummary={article.dosageSummary || 'Refer to article clinical protocol.'}
            />

            {/* Telugu Regional Advisory Panel */}
            {article.teluguSummary && (
              <TeluguClinicalCard
                conditionNameTe={article.teluguSummary.conditionNameTe}
                conditionNameEn={article.targetCondition || article.title}
                symptomsTe={article.teluguSummary.symptomsTe}
                treatmentProtocolTe={article.teluguSummary.treatmentProtocolTe}
                recommendedProductTe={article.teluguSummary.recommendedProductTe}
                productSlug={article.recommendedProductSlug}
              />
            )}

            {/* Interactive Dosage Calculator Embedded into Article */}
            <InteractiveInPostCalculator
              defaultProductSlug={article.recommendedProductSlug}
              defaultProductName={article.recommendedProductName}
              targetCondition={article.targetCondition || article.title}
            />

            {/* Institutional Comparison Benchmark Card */}
            <InstitutionalComparisonCard
              conditionName={article.targetCondition || article.title}
            />

            {/* Content Sections */}
            {article.contentSections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-black text-[#002D3A] font-display border-b border-slate-200 pb-2">
                  {section.heading}
                </h2>

                {section.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {p}
                  </p>
                ))}

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc list-inside bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {section.bulletPoints.map((bp, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {bp}
                      </li>
                    ))}
                  </ul>
                )}

                {section.tableData && (
                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm mt-4">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#002D3A] text-white">
                          {section.tableData.headers.map((h, idx) => (
                            <th key={idx} className="p-3 font-bold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {section.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3 text-slate-700 leading-normal">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.callout && (
                  <div
                    className={`rounded-2xl p-5 border text-xs sm:text-sm mt-4 ${
                      section.callout.type === 'regulatory'
                        ? 'bg-amber-50 border-amber-300 text-amber-950'
                        : section.callout.type === 'warning'
                        ? 'bg-rose-50 border-rose-300 text-rose-950'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-1 text-sm">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>{section.callout.title}</span>
                    </div>
                    <p className="leading-relaxed">{section.callout.text}</p>
                  </div>
                )}
              </section>
            ))}

            {/* Embedded Recommended Formulation Card */}
            <section className="bg-gradient-to-r from-[#002D3A] to-[#014154] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
                  Prescribed Clinical Formulation
                </span>
                <span className="text-xs text-slate-300">100% Antibiotic-Free • CAA Approved</span>
              </div>

              <h3 className="text-2xl font-black font-display text-white mb-2">
                {article.recommendedProductName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Manufactured under sterile conditions in New Autonagar, Vijayawada, Andhra Pradesh. Directly calibrated against the clinical protocol outlined above.
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div>
                  <span className="text-xs text-slate-400 block">Direct Factory Price:</span>
                  <span className="text-xl font-black text-white">₹1,199 (1L) / ₹5,000 (5L Can)</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/products/${article.recommendedProductSlug}`}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition text-xs flex items-center gap-1.5 shadow"
                  >
                    <span>View Specs &amp; Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/pond-doctor"
                    className="border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl transition text-xs flex items-center gap-1.5"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Calculate Pond Dosage</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* Companion Internal Links Grid (Diseases, Calculators & Solutions) */}
            <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#002D3A] font-bold text-base">
                <Microscope className="w-5 h-5 text-emerald-600" />
                <span>Related Knowledge Assets &amp; Diagnostic Engines</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {article.relatedDiseaseSlug && (
                  <Link
                    href={`/diseases/${article.relatedDiseaseSlug}`}
                    className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-white transition-all group block"
                  >
                    <span className="text-[10px] text-emerald-700 font-bold block mb-1">Pathology Monograph:</span>
                    <strong className="text-slate-900 group-hover:text-emerald-700 block mb-1">
                      {article.targetCondition || 'Clinical Monograph'}
                    </strong>
                    <span className="text-slate-500 text-[11px]">View full PCR targets &amp; histology →</span>
                  </Link>
                )}
                <Link
                  href="/calculators"
                  className="p-3 rounded-xl border border-slate-200 hover:border-cyan-500 bg-slate-50 hover:bg-white transition-all group block"
                >
                  <span className="text-[10px] text-cyan-700 font-bold block mb-1">Clinical Tools:</span>
                  <strong className="text-slate-900 group-hover:text-cyan-700 block mb-1">
                    Aqua Calculators Suite
                  </strong>
                  <span className="text-slate-500 text-[11px]">Ammonia TAN, Biomass, Aeration math →</span>
                </Link>
                <Link
                  href="/pond-doctor"
                  className="p-3 rounded-xl border border-slate-200 hover:border-purple-500 bg-slate-50 hover:bg-white transition-all group block"
                >
                  <span className="text-[10px] text-purple-700 font-bold block mb-1">Diagnostic AI:</span>
                  <strong className="text-slate-900 group-hover:text-purple-700 block mb-1">
                    Pond Doctor Engine
                  </strong>
                  <span className="text-slate-500 text-[11px]">Interactive symptom prescription →</span>
                </Link>
              </div>
            </section>

            {/* Telugu Regional Tags */}
            {article.teluguKeywords && article.teluguKeywords.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  తెలుగు ప్రాంతీయ కీలక పదాలు (Telugu Aqua Search Keywords):
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {article.teluguKeywords.map((kw, i) => (
                    <span key={i} className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Accordion */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#002D3A] font-bold text-lg mb-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <span>Frequently Asked Questions</span>
              </div>

              <div className="space-y-3">
                {article.faqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 text-xs sm:text-sm">
                    <strong className="block text-[#002D3A] text-sm mb-1">{faq.question}</strong>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Scientific References */}
            {article.scientificReferences && article.scientificReferences.length > 0 && (
              <section className="bg-slate-100 rounded-2xl p-6 border border-slate-200 text-xs text-slate-600 space-y-2">
                <strong className="text-slate-900 block text-xs uppercase tracking-wider">
                  Scientific Citations &amp; Institutional Regulatory References:
                </strong>
                <ol className="list-decimal list-inside space-y-1">
                  {article.scientificReferences.map((ref, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {ref}
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
