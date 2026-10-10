import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { DISTRICT_GUIDES, DistrictGuide } from '@/lib/districts-data';
import { 
  MapPin, 
  Droplets, 
  ShieldAlert, 
  Sparkles, 
  Phone, 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Thermometer,
  CalendarCheck
} from 'lucide-react';

interface DistrictPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return DISTRICT_GUIDES.map((d) => ({
    slug: d.slug
  }));
}

export async function generateMetadata({ params }: DistrictPageProps): Promise<Metadata> {
  const { slug } = await params;
  const district = DISTRICT_GUIDES.find((d) => d.slug === slug);

  if (!district) {
    return {
      title: 'District Not Found | Next Farm Bio Sciences'
    };
  }

  return {
    title: `${district.metaTitle} | Next Farm Bio Sciences`,
    description: district.metaDescription,
    alternates: {
      canonical: `https://nextfarmbiosciences.app/districts/${district.slug}`
    },
    openGraph: {
      title: `${district.name} Aquaculture Protocol | Next Farm Bio Sciences`,
      description: district.metaDescription,
      url: `https://nextfarmbiosciences.app/districts/${district.slug}`,
      type: 'article'
    }
  };
}

export default async function DistrictDetailPage({ params }: DistrictPageProps) {
  const { slug } = await params;
  const d = DISTRICT_GUIDES.find((item) => item.slug === slug);

  if (!d) {
    notFound();
  }

  // Schema.org LocalBusiness + AreaServed Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Next Farm Bio Sciences — ${d.name} Clinical Hub`,
    description: d.metaDescription,
    url: `https://nextfarmbiosciences.app/districts/${d.slug}`,
    telephone: d.contactHelpline,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: d.district,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: d.state
      }
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Next Farm Bio Sciences',
      url: 'https://nextfarmbiosciences.app'
    },
    knowsAbout: [
      'Litopenaeus vannamei aquaculture',
      'Shrimp probiotic formulations',
      'White Gut Disease management',
      'Toxic ammonia and nitrite remediation',
      'Benthic black sludge oxidation'
    ]
  };

  return (
    <article className="min-h-screen bg-slate-50 py-12">
      {/* JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-medium">
          <Link href="/" className="hover:text-[#002B5B] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/districts" className="hover:text-[#002B5B] transition-colors">
            Districts
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">{d.name}</span>
        </nav>

        {/* Back Link */}
        <Link
          href="/districts"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004B50] hover:text-[#002B5B] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Aquaculture Districts</span>
        </Link>

        {/* Hero Card */}
        <header className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#002B5B]/10 text-[#002B5B] uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{d.state} &bull; {d.district}</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
              Salinity Range: {d.averageSalinity} ({d.salinityType})
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002B5B] font-heading mb-3 leading-tight">
            {d.name} Aquaculture Medicine &amp; Biosecurity Hub
          </h1>

          {/* Telugu Headline Banner */}
          <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-xl mb-6">
            <p className="text-sm font-bold text-emerald-900 leading-relaxed font-heading">
              {d.teluguName} — రొయ్యల చెరువుల ఆరోగ్య రక్షణ మరియు క్లినికల్ ప్రొబయోటిక్ మార్గదర్శకాలు
            </p>
          </div>

          <p className="text-base text-slate-600 leading-relaxed mb-6">
            Commercial aquaculture across {d.district} operates under distinct geochemical parameters. Discover targeted biological input strategies, check tray calibration protocols, and preventive regimens formulated to combat prevalent local pathogens without veterinary antibiotics.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Target Species</span>
              <span className="text-xs font-extrabold text-slate-800">{d.primarySpecies[0]}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Stocking Density</span>
              <span className="text-xs font-extrabold text-slate-800">{d.stockingDensity}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Water Source</span>
              <span className="text-xs font-extrabold text-slate-800 line-clamp-1">{d.primaryWaterSource}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Soil Profile</span>
              <span className="text-xs font-extrabold text-slate-800 line-clamp-1">{d.soilCharacteristics}</span>
            </div>
          </div>
        </header>

        {/* Section 1: Geographic Focus Areas */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-10">
          <h2 className="text-xl font-bold text-[#002B5B] font-heading mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#004B50]" />
            <span>Key Aquaculture Mandals &amp; Farming Belts</span>
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Next Farm Bio Sciences dispatches daily high-potency bio-inputs directly to commercial farmers, hatcheries, and feed stores across these mandals:
          </p>
          <div className="flex flex-wrap gap-2">
            {d.keyGeography.map((area) => (
              <span
                key={area}
                className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200"
              >
                📍 {area}
              </span>
            ))}
          </div>
        </section>

        {/* Section 2: Regional Pathology Risks */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-10">
          <div className="flex items-center gap-2 mb-6">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
            <h2 className="text-xl font-bold text-[#002B5B] font-heading">
              Dominant Pathological Risks &amp; Environmental Triggers
            </h2>
          </div>

          <div className="space-y-6">
            {d.pathologyRisks.map((risk, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200/80"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {risk.disease}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white uppercase">
                    Severity: {risk.severity}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-1">Environmental Trigger:</span>
                    <span className="text-slate-600">{risk.trigger}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-1">Check Tray Clinical Signs:</span>
                    <span className="text-slate-600">{risk.clinicalSigns}</span>
                  </div>
                </div>
                <div className="mt-3 bg-white p-3 rounded-xl border border-emerald-200">
                  <span className="font-bold text-emerald-800 block mb-1">Recommended Biological Protocol:</span>
                  <span className="text-emerald-950 font-medium">{risk.preventativeProtocol}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Recommended Bio-Input Regimen */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-[#004B50]" />
            <h2 className="text-xl font-bold text-[#002B5B] font-heading">
              Calibrated Formulation Regimen for {d.district}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {d.recommendedFormulations.map((rec, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#004B50] uppercase tracking-wider block mb-1">
                    Formulation #{i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-[#002B5B] font-heading mb-2">
                    {rec.productName}
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 mb-3 bg-white p-2 rounded-lg border border-slate-200">
                    🎯 {rec.indication}
                  </p>
                  <div className="text-xs text-slate-600 space-y-1.5 mb-4">
                    <p><strong className="text-slate-800">Dosage:</strong> {rec.dosage}</p>
                    <p><strong className="text-slate-800">Timing:</strong> {rec.timing}</p>
                  </div>
                </div>

                <Link
                  href={`/products/${rec.productSlug}`}
                  className="mt-2 w-full py-2 px-3 rounded-xl bg-[#002B5B] hover:bg-[#004B50] text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Specifications</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Bilingual Field Advisory Panel */}
        <section className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg mb-10">
          <div className="flex items-center gap-2 mb-4">
            <CalendarCheck className="w-6 h-6 text-[#FFD200]" />
            <h2 className="text-xl font-bold font-heading text-[#FFD200]">
              ఫీల్డ్ డాక్టర్ సలహా (Bilingual Technical Advisory)
            </h2>
          </div>

          <p className="text-sm sm:text-base font-medium leading-relaxed mb-6 bg-white/10 p-5 rounded-2xl border border-white/10">
            {d.localFieldAdvisory.teluguAdvisory}
          </p>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
            <strong>English Summary:</strong> {d.localFieldAdvisory.englishSummary}
          </p>

          <div className="border-t border-white/20 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFD200] mb-3">
              Daily Pond Supervisor Checklist:
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              {d.localFieldAdvisory.seasonalChecklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Direct Action Footer */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-[#002B5B] font-heading mb-1">
              Farming in {d.district}? Get Direct Clinical Assistance
            </h3>
            <p className="text-xs text-slate-600">
              Speak directly with our Vijayawada biotechnology laboratory for water test interpretation or emergency delivery.
            </p>
          </div>
          <a
            href={`https://wa.me/918977656444?text=Hello%20Next%20Farm%20Team%2C%20I%20am%20calling%20regarding%20aquaculture%20in%20${encodeURIComponent(d.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp Helpline: +91 8977656444</span>
          </a>
        </div>
      </div>
    </article>
  );
}
