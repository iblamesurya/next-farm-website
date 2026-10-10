import React from 'react';
import { Metadata } from 'next';
import { Stethoscope, HelpCircle } from 'lucide-react';
import { PondDoctorApp } from '@/components/pond-doctor/pond-doctor-app';
import { getPondDoctorAppJsonLd, getBreadcrumbJsonLd, getPondDoctorFaqJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Pond Doctor Diagnostic Engine | Next Farm Bio Sciences',
  description:
    'Interactive clinical diagnostic engine for shrimp and prawn aquaculture. Identify symptoms, calculate required formulation volumes by pond acreage, and receive targeted biosecurity prescriptions.',
  keywords: [
    'Pond Doctor',
    'Shrimp disease diagnosis',
    'Aquaculture dosage calculator',
    'Vannamei pond calculator',
    'White gut treatment calculator',
    'Ammonia dosage shrimp',
    'Pond bottom sludge dosage',
    'Next Farm Bio Sciences'
  ],
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/pond-doctor'
  },
  openGraph: {
    title: 'Pond Doctor Diagnostic Engine | Next Farm Bio Sciences',
    description:
      'Interactive clinical diagnostic engine for shrimp and prawn aquaculture. Identify symptoms, calculate required formulation volumes by pond acreage, and receive targeted biosecurity prescriptions.',
    url: 'https://nextfarmbiosciences.app/pond-doctor',
    siteName: 'Next Farm Bio Sciences',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/branding/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Pond Doctor Diagnostic Engine'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pond Doctor Diagnostic Engine | Next Farm Bio Sciences',
    description: 'Interactive clinical diagnostic engine & dosage calculator for shrimp and prawn ponds.',
    images: ['/images/branding/og_image.png']
  }
};

export default function PondDoctorPage() {
  const breadcrumbsJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Pond Doctor Diagnostic Engine', url: '/pond-doctor' }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPondDoctorAppJsonLd())
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsJsonLd)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPondDoctorFaqJsonLd())
        }}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#004B50]/10 text-[#004B50] font-heading font-extrabold text-xs uppercase tracking-wider rounded-full">
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Clinical Diagnostic Assistant</span>
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#002B5B] tracking-tight">
          Pond Doctor Diagnostic Engine
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Select observed pond symptoms to identify the underlying biological pathology, compute depth-adjusted
          volumetric dosage schedules, and receive targeted biotechnology prescriptions.
        </p>
      </div>

      {/* Interactive Application */}
      <PondDoctorApp />

      {/* Clinical Pathology FAQ Section */}
      <div className="mt-20 pt-12 border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              <span>Diagnostic FAQ</span>
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#002B5B]">
              Frequently Asked Diagnostic &amp; Application Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
              Authoritative clinical protocols, volumetric calculation dynamics, and biosecurity schedules
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm">
              <h3 className="font-heading font-bold text-base text-[#002B5B] mb-2">
                How does Pond Doctor compute depth-adjusted volumetric dosages?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dosages in aquaculture cannot be calculated by surface acreage alone. Pond Doctor multiplies pond surface acreage by water column depth (in meters or feet) to calculate total water volume (acre-feet / megaliters). Dosages scale with biological infection severity (low, moderate, acute shock dose) and automatically allocate into 5-Liter industrial cans and 1-Liter precision bottles.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm">
              <h3 className="font-heading font-bold text-base text-[#002B5B] mb-2">
                What is the protocol for sudden ammonia (TAN &gt; 1.0 ppm) spikes?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Administer shock bio-treatment using Next Converter (autotrophic nitrifying consortium) @ 2.0 to 3.0 Liters per Acre during morning aeration. Broadcast 60% of requirement on Day 1 and 40% on Day 2, maintaining dissolved oxygen above 4.5 ppm.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm">
              <h3 className="font-heading font-bold text-base text-[#002B5B] mb-2">
                How to eliminate White Gut and White Feces Syndrome without banned antibiotics?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Top-dress Next Gut enteric probiotic @ 15–20 mL per kg feed across all daily meals for 5 consecutive days bound with Next Bind Plus, combined with water broadcasting of Next Viro Nill @ 1.0 L/Acre to neutralize water-column Vibrio reservoirs.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm">
              <h3 className="font-heading font-bold text-base text-[#002B5B] mb-2">
                How fast are prescription orders delivered to farms in Andhra Pradesh?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Orders placed before 2:00 PM IST dispatch same-day from Vijayawada via dedicated cold-chain aquaculture freight, arriving within 24 to 48 hours in Bhimavaram, Machilipatnam, Nellore, Ongole, and Kakinada farming belts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
