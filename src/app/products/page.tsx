import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, ArrowRight, Sparkles, CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { PRODUCTS } from '@/lib/catalog';
import { getCollectionPageJsonLd, getBreadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'All Aquaculture Bio-Inputs & Probiotics Catalog | Next Farm Bio Sciences',
  description:
    'Complete product catalog of 11 CAA-approved, 100% antibiotic-free aquaculture probiotics, water conditioners, soil bioremediators, and shrimp gut formulations by Next Farm Bio Sciences (Vijayawada, India).',
  keywords: [
    'Next Farm Bio Sciences products',
    'aquaculture probiotics catalog India',
    'CAA approved shrimp probiotics',
    'Next Gut',
    'Next Converter',
    'Next Sludge',
    'Next Vibriosis',
    'Next Min',
    'Next Viro Nill',
    'Vijayawada aquaculture bio-inputs'
  ],
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/products'
  },
  openGraph: {
    title: 'All Aquaculture Bio-Inputs & Probiotics Catalog | Next Farm Bio Sciences',
    description:
      'Explore all 11 CAA-certified aquaculture formulations and 33 commercial SKUs (1L/1kg, 2L/2kg, 5L Can) from Next Farm Bio Sciences.',
    url: 'https://nextfarmbiosciences.app/products',
    siteName: 'Next Farm Bio Sciences',
    locale: 'en_IN',
    type: 'website'
  }
};

export default function ProductsCatalogPage() {
  const collectionSchema = getCollectionPageJsonLd({
    title: 'All Aquaculture Bio-Inputs & Probiotics Catalog | Next Farm Bio Sciences',
    description:
      'Complete catalog of 11 CAA-approved, 100% antibiotic-free aquaculture probiotics, water conditioners, and shrimp gut formulations.',
    url: 'https://nextfarmbiosciences.app/products',
    items: PRODUCTS.map((p) => ({
      name: p.name,
      url: `https://nextfarmbiosciences.app/products/${p.slug}`,
      description: p.overview || p.biologicalMechanism
    }))
  });

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: 'https://nextfarmbiosciences.app' },
    { name: 'Products Catalog', url: 'https://nextfarmbiosciences.app/products' }
  ]);

  return (
    <main className="min-h-screen bg-[#020B13] text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-emerald-500/20 bg-gradient-to-b from-[#041824] to-[#020B13] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-300 uppercase mb-6">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            CAA Certified • ISO 9001:2015 • 100% Antibiotic-Free • 11 Formulations (33 SKUs)
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Next Farm Bio Sciences — Complete Aquaculture Formulations Catalog
          </h1>
          <p className="max-w-3xl text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
            Manufactured in New Autonagar, Vijayawada, Andhra Pradesh (520010), India. Every Next Farm Bio Sciences
            formulation is engineered for intensive{' '}
            <em className="text-emerald-300 not-italic font-medium">Litopenaeus vannamei</em> (Pacific White Shrimp),{' '}
            <em className="text-emerald-300 not-italic font-medium">Penaeus monodon</em> (Black Tiger Prawn), and
            commercial finfish ponds with Coastal Aquaculture Authority (CAA) compliance and zero antibiotic residues.
          </p>
          <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-300">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900/80 border border-slate-800 px-3.5 py-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <strong>1L Bottle / 1kg Pouch:</strong> ₹1,199 INR
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900/80 border border-slate-800 px-3.5 py-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <strong>2L / 2kg Pack:</strong> ₹2,299 INR
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900/80 border border-slate-800 px-3.5 py-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <strong>5L Can (Commercial Farm Standard):</strong> ₹5,000 INR
            </span>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#061621]/90 p-6 shadow-xl transition hover:border-emerald-500/50"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {product.categoryDisplay || product.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    CAA Approved • ISO 9001
                  </span>
                </div>

                <Link href={`/products/${product.slug}`} className="block">
                  <div className="relative mx-auto mb-5 h-52 w-full overflow-hidden rounded-xl bg-slate-950/70 p-4 flex items-center justify-center">
                    <Image
                      src={product.packshotImage}
                      alt={`${product.name} - ${product.tagline}`}
                      width={220}
                      height={220}
                      className="h-44 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                    {product.name}
                  </h2>
                </Link>

                <p className="text-sm font-medium text-emerald-400 mb-3">{product.tagline}</p>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {product.overview || product.biologicalMechanism}
                </p>

                <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-3.5 mb-5 text-xs space-y-1.5 text-slate-300">
                  <div>
                    <strong className="text-white">Active Strains / Matrix:</strong> {product.strains.join(', ')}
                  </div>
                  <div>
                    <strong className="text-white">Potency:</strong> {product.cfuCount}
                  </div>
                  <div>
                    <strong className="text-white">Preventive Dosage:</strong> {product.dosageProtocol.preventive}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-xs text-slate-400 block">
                      {product.format1L || '1L Bottle'} / {product.format5L || '5L Can'}
                    </span>
                    <span className="text-2xl font-extrabold text-white">
                      ₹{product.pricing.bottle1L.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5">
                      – ₹{product.pricing.can5L.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">
                    In Stock
                  </span>
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
                >
                  View Clinical Specs & Buy
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Direct Technical Consultation Footer Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/50 via-slate-900 to-cyan-950/40 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4" />
              Direct Factory Dispatch Across India
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Need Pond Dosage Calculation or Bulk Dealer Pricing?
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Use our interactive <strong>Pond Doctor</strong> clinical tool or talk directly to our aquaculture
              biologists in New Autonagar, Vijayawada, Andhra Pradesh.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/pond-doctor"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition"
            >
              Launch Pond Doctor
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/918977656444"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:border-emerald-500/50 transition"
            >
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              WhatsApp: +91 89776 56444
            </a>
            <a
              href="tel:+918977656444"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:border-emerald-500/50 transition"
            >
              <Phone className="h-4 w-4 text-cyan-400" />
              +91 89776 56444
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
