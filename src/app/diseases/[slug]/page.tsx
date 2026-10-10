import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Microscope,
  Stethoscope,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ShoppingBag,
  ExternalLink,
  Droplets,
  Scale
} from 'lucide-react';
import { DISEASE_MONOGRAPHS, getDiseaseBySlug } from '@/lib/diseases-data';
import { getProductBySlug } from '@/lib/catalog';
import { getBreadcrumbJsonLd } from '@/lib/structured-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DISEASE_MONOGRAPHS.map((disease) => ({
    slug: disease.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const disease = getDiseaseBySlug(slug);

  if (!disease) {
    return {
      title: 'Disease Monograph Not Found | Next Farm Bio Sciences'
    };
  }

  return {
    title: `${disease.metaTitle} | Next Farm Bio Sciences`,
    description: disease.metaDescription,
    keywords: disease.keywords,
    alternates: {
      canonical: `https://nextfarmbiosciences.app/diseases/${disease.slug}`
    },
    openGraph: {
      title: disease.metaTitle,
      description: disease.metaDescription,
      url: `https://nextfarmbiosciences.app/diseases/${disease.slug}`,
      siteName: 'Next Farm Bio Sciences',
      locale: 'en_IN',
      type: 'article',
      images: [
        {
          url: '/images/branding/og_image.png',
          width: 1200,
          height: 630,
          alt: disease.name
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: disease.metaTitle,
      description: disease.metaDescription,
      images: ['/images/branding/og_image.png']
    }
  };
}

export default async function DiseaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const disease = getDiseaseBySlug(slug);

  if (!disease) {
    notFound();
  }

  const primaryProduct = getProductBySlug(disease.recommendedProductSlug);
  const secondaryProduct = disease.secondaryProductSlug
    ? getProductBySlug(disease.secondaryProductSlug)
    : undefined;

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Shrimp Pathology Compendium', url: '/diseases' },
    { name: disease.name, url: `/diseases/${disease.slug}` }
  ]);

  const medicalConditionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: disease.name,
    alternateName: [disease.scientificName, disease.teluguName],
    description: disease.metaDescription,
    possibleTreatment: [
      {
        '@type': 'MedicalTherapy',
        name: `CAA-Approved Biological Protocol using ${disease.recommendedProductName}`,
        description: disease.caaBiologicalProtocol.map((s) => `${s.title}: ${s.rationale}`).join('; ')
      }
    ],
    signOrSymptom: disease.grossPathology.fieldSigns.concat(disease.grossPathology.trayObservations).map((sign) => ({
      '@type': 'MedicalSignOrSymptom',
      name: sign
    }))
  };

  const scholarlyArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: disease.metaTitle,
    description: disease.clinicalOverview,
    author: {
      '@type': 'Organization',
      name: 'Next Farm Bio Sciences Pathology Laboratory'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Next Farm Bio Sciences',
      url: 'https://nextfarmbiosciences.app'
    },
    citation: disease.academicReferences
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: disease.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalConditionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link href="/" className="hover:text-[#004B50] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/diseases" className="hover:text-[#004B50] transition-colors">
            Shrimp Pathology Compendium
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#002B5B] truncate max-w-[200px] sm:max-w-none">
            {disease.name}
          </span>
        </nav>

        {/* Article Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-[#004B50]/10 text-[#004B50] font-heading font-extrabold text-xs uppercase tracking-wider rounded-full flex items-center gap-1.5">
              <Microscope className="w-3.5 h-3.5" />
              <span>{disease.pathogenType} Pathology</span>
            </span>
            <span className="px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 font-extrabold text-xs uppercase tracking-wider rounded-full">
              {disease.severity}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Host: <strong>{disease.affectedSpecies}</strong>
            </span>
          </div>

          <div>
            <h1 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-[#002B5B] tracking-tight leading-tight">
              {disease.name}
            </h1>
            <p className="text-sm sm:text-base italic font-mono text-slate-500 mt-2">
              Scientific Classification: {disease.scientificName}
            </p>
          </div>

          {/* Bilingual Telugu Section */}
          <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl space-y-1">
            <span className="text-xs font-extrabold text-[#004B50] uppercase tracking-wider block">
              తెలుగు ప్రాంతీయ వ్యాధి సమాచారం (Andhra Pradesh Regional Advisory):
            </span>
            <h2 className="text-base font-bold text-slate-800">
              {disease.teluguName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {disease.teluguDescription}
            </p>
          </div>

          {/* Jump-to Table of Contents */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs font-bold text-[#004B50]">
            <span className="text-slate-400 uppercase tracking-wider text-[11px] mr-1">Jump to:</span>
            <a href="#overview" className="hover:underline bg-slate-100 px-2.5 py-1 rounded-md">Overview</a>
            <a href="#etiology" className="hover:underline bg-slate-100 px-2.5 py-1 rounded-md">Etiology</a>
            <a href="#gross-signs" className="hover:underline bg-slate-100 px-2.5 py-1 rounded-md">Gross Signs</a>
            <a href="#microscopic" className="hover:underline bg-slate-100 px-2.5 py-1 rounded-md">Microscopy &amp; PCR</a>
            <a href="#differential" className="hover:underline bg-slate-100 px-2.5 py-1 rounded-md">Differential Matrix</a>
            <a href="#protocol" className="hover:underline bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md">CAA Protocol</a>
            <a href="#faqs" className="hover:underline bg-slate-100 px-2.5 py-1 rounded-md">FAQs</a>
          </div>
        </div>

        {/* Two Column Layout: Main Clinical Text + Sticky Product Action Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Section 1: Clinical Overview */}
            <section id="overview" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="font-heading font-black text-xl sm:text-2xl text-[#002B5B] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#004B50]" />
                <span>1. Clinical Overview</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {disease.clinicalOverview}
              </p>
            </section>

            {/* Section 2: Etiology & Transmission Dynamics */}
            <section id="etiology" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="font-heading font-black text-xl sm:text-2xl text-[#002B5B] flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#004B50]" />
                <span>2. Etiology &amp; Transmission Dynamics</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">Causative Agent</span>
                  <p className="text-slate-800 font-semibold">{disease.etiology.agent}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">Transmission Mode</span>
                  <p className="text-slate-800 font-semibold">{disease.etiology.transmissionMode}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">Incubation Period</span>
                  <p className="text-slate-800 font-semibold">{disease.etiology.incubationPeriod}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">Expected Mortality</span>
                  <p className="text-slate-800 font-semibold">{disease.etiology.mortalityRate}</p>
                </div>
              </div>
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900">
                <strong>Primary Target Organ:</strong> {disease.etiology.targetTissue}
              </div>
            </section>

            {/* Section 3: Gross Pathology & Field Diagnostic Signs */}
            <section id="gross-signs" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="font-heading font-black text-xl sm:text-2xl text-[#002B5B] flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#004B50]" />
                <span>3. Gross Pathology &amp; Field Signs</span>
              </h2>

              <div className="space-y-4">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-800">
                  A. Pond Dike &amp; Aerator Observations
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {disease.grossPathology.fieldSigns.map((sign, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-800 pt-2">
                  B. Check Tray Pathology
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {disease.grossPathology.trayObservations.map((sign, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-800 pt-2">
                  C. Gross Dissection Findings
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {disease.grossPathology.dissectionSigns.map((sign, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#004B50] mt-2 flex-shrink-0" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 4: Microscopic Diagnosis & PCR Primers */}
            <section id="microscopic" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="font-heading font-black text-xl sm:text-2xl text-[#002B5B] flex items-center gap-2">
                <Microscope className="w-5 h-5 text-[#004B50]" />
                <span>4. Microscopic &amp; Molecular Laboratory Diagnosis</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="font-bold text-[#004B50] uppercase text-[10px] tracking-wider block">Wet Mount Microscopy</span>
                  <p className="text-slate-700 leading-relaxed">{disease.microscopicDiagnosis.wetMount}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="font-bold text-[#004B50] uppercase text-[10px] tracking-wider block">Histopathology (H&amp;E)</span>
                  <p className="text-slate-700 leading-relaxed">{disease.microscopicDiagnosis.histopathology}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="font-bold text-[#004B50] uppercase text-[10px] tracking-wider block">Special Stains</span>
                  <p className="text-slate-700 leading-relaxed">{disease.microscopicDiagnosis.stainingMethods}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="font-bold text-[#004B50] uppercase text-[10px] tracking-wider block">PCR Assay Primers</span>
                  <p className="text-slate-700 font-mono text-xs leading-relaxed">{disease.microscopicDiagnosis.pcrPrimers}</p>
                </div>
              </div>
            </section>

            {/* Section 5: Water Quality Trigger Thresholds */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="font-heading font-black text-xl sm:text-2xl text-[#002B5B] flex items-center gap-2">
                <Droplets className="w-5 h-5 text-[#004B50]" />
                <span>5. Water Quality Trigger Thresholds</span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="p-3">Parameter</th>
                      <th className="p-3">Critical Danger Threshold</th>
                      <th className="p-3">Biological Impact on Shrimp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {disease.waterQualityTriggers.map((t, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-800">{t.param}</td>
                        <td className="p-3 font-bold text-rose-700 font-mono">{t.dangerThreshold}</td>
                        <td className="p-3 text-slate-600">{t.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 6: Differential Diagnosis Matrix */}
            <section id="differential" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="font-heading font-black text-xl sm:text-2xl text-[#002B5B] flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#004B50]" />
                <span>6. Differential Diagnosis (Rule-Out Matrix)</span>
              </h2>

              <div className="space-y-4">
                {disease.differentialDiagnosis.map((diff, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs sm:text-sm">
                    <span className="font-bold text-rose-800 uppercase tracking-wider text-[11px] block">
                      Versus: {diff.lookAlikeCondition}
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>Key Distinguishing Features:</strong> {diff.keyDifferences}
                    </p>
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs text-[#004B50] font-semibold">
                      Definitive Diagnostic Test: {diff.distinguishingTest}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7: CAA-Approved Biological Protocol */}
            <section id="protocol" className="bg-emerald-50/50 rounded-2xl border border-emerald-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#002B5B] flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  <span>7. CAA Statutory Biological Protocol</span>
                </h2>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase rounded-full">
                  100% Antibiotic-Free
                </span>
              </div>

              <div className="space-y-6">
                {disease.caaBiologicalProtocol.map((step) => (
                  <div key={step.stepNumber} className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                        {step.stepNumber}
                      </span>
                      <h3 className="font-heading font-black text-base text-[#002B5B]">
                        {step.title}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-slate-500 font-bold block uppercase text-[10px]">Feed Application</span>
                        <p className="text-slate-800 font-semibold">{step.feedDose}</p>
                      </div>
                      <div>
                        <span className="text-slate-500 font-bold block uppercase text-[10px]">Water Application</span>
                        <p className="text-slate-800 font-semibold">{step.waterDose}</p>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-emerald-800">Timing &amp; Rationale:</strong> ({step.timing}) {step.rationale}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 8: Clinical FAQs */}
            <section id="faqs" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="font-heading font-black text-xl sm:text-2xl text-[#002B5B] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#004B50]" />
                <span>8. Clinical Frequently Asked Questions</span>
              </h2>

              <div className="space-y-4">
                {disease.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <h3 className="font-heading font-bold text-sm text-[#002B5B]">
                      Q: {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 9: Academic & Peer-Reviewed References */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="font-heading font-black text-base text-[#002B5B] uppercase tracking-wider">
                Scientific Citations &amp; Institutional References
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 font-mono leading-relaxed">
                {disease.academicReferences.map((ref, idx) => (
                  <li key={idx}>{ref}</li>
                ))}
              </ol>
            </section>
          </div>

          {/* Sticky Sidebar: Prescribed Formulation & Dosage Actions */}
          <aside className="space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Primary Product Card */}
              {primaryProduct && (
                <div className="bg-white rounded-2xl border-2 border-[#004B50] p-6 shadow-md space-y-4">
                  <span className="px-2.5 py-0.5 bg-[#004B50] text-[#FFD200] text-[10px] font-black uppercase tracking-wider rounded-md">
                    Primary Prescribed Formulation
                  </span>

                  <div>
                    <h3 className="font-heading font-black text-xl text-[#002B5B]">
                      {primaryProduct.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                      {primaryProduct.tagline}
                    </p>
                  </div>

                  <div className="relative w-full h-44 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                    <Image
                      src={primaryProduct.packshotImage}
                      alt={primaryProduct.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">Standard Pack:</span>
                      <strong className="text-slate-800">{primaryProduct.format5L || '5-Liter Can'}</strong>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">Price (Pre-Paid):</span>
                      <strong className="text-emerald-700 text-sm font-black font-mono">
                        ₹{primaryProduct.pricing.can5L.toLocaleString('en-IN')}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">Certification:</span>
                      <strong className="text-[#004B50]">CAA Approved / ISO 9001</strong>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Link
                      href={`/products/${primaryProduct.slug}`}
                      className="w-full py-3 bg-[#004B50] hover:bg-[#00383C] text-white font-heading font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Order Direct (Pan-India Dispatch)</span>
                    </Link>
                    <a
                      href={`https://wa.me/918977656444?text=Hello%20Next%20Farm%20Team%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(primaryProduct.name)}%20for%20${encodeURIComponent(disease.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <span>WhatsApp Technical Help: +91 8977656444</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Secondary Product Card if present */}
              {secondaryProduct && (
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Complementary Water Treatment
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 bg-white rounded-lg border border-slate-200 flex-shrink-0 overflow-hidden">
                      <Image
                        src={secondaryProduct.packshotImage}
                        alt={secondaryProduct.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#002B5B]">
                        {secondaryProduct.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {secondaryProduct.format5L || '5-Liter Can'} • ₹{secondaryProduct.pricing.can5L.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/products/${secondaryProduct.slug}`}
                    className="block text-center text-xs font-bold text-[#004B50] hover:underline pt-1"
                  >
                    View Formulation Specifications &rarr;
                  </Link>
                </div>
              )}

              {/* Diagnostic Tools Widget Box */}
              <div className="bg-gradient-to-br from-[#002B5B] to-[#004B50] rounded-2xl p-6 text-white space-y-3 shadow-md">
                <span className="inline-flex items-center gap-1 text-[#FFD200] text-xs font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Sizing Tools</span>
                </span>
                <h3 className="font-heading font-black text-base">
                  Calculate Dosage for Your Pond Size
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Enter pond acreage, water depth, and stocking DOC to compute exact kilograms and litres required.
                </p>
                <Link
                  href="/calculators"
                  className="inline-flex items-center justify-center w-full py-2.5 bg-[#FFD200] hover:bg-yellow-400 text-[#002B5B] font-heading font-black text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  <span>Open Clinical Calculators Suite</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
