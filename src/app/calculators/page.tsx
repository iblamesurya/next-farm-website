import React from 'react';
import { Metadata } from 'next';
import { CalculatorsSuite } from '@/components/calculators/calculators-suite';
import { getCalculatorsAppJsonLd, getBreadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Aquaculture Clinical Calculators & Bio-Metrics Suite | Next Farm Bio Sciences',
  description:
    'Free interactive clinical calculators for shrimp & prawn aquaculture: Toxic Free Ammonia (NH3) & TAN dissociation, Pond Standing Biomass & Feed FCR planner, Vannamei Ionic Mineral Ratio (Ca:Mg:K) molting analyzer, and Aeration DO Horsepower calculator. Calibrated to ICAR-CIBA & MPEDA standards.',
  keywords: [
    'Aquaculture calculator',
    'Shrimp ammonia calculator',
    'TAN to NH3 calculator',
    'Un-ionized ammonia calculator shrimp pond',
    'Vannamei feed calculator',
    'Pond biomass calculator',
    'Shrimp mineral ratio calculator',
    'Ca Mg K ratio vannamei',
    'Shrimp aeration calculator',
    'Next Farm Bio Sciences'
  ],
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/calculators'
  },
  openGraph: {
    title: 'Aquaculture Clinical Calculators & Bio-Metrics Suite | Next Farm Bio Sciences',
    description:
      'Free interactive clinical calculators for shrimp & prawn aquaculture: Toxic Free Ammonia (NH3), Standing Biomass & Feed FCR, Ionic Mineral Ratios (Ca:Mg:K), and Paddlewheel Aeration DO requirements.',
    url: 'https://nextfarmbiosciences.app/calculators',
    siteName: 'Next Farm Bio Sciences',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/branding/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Aquaculture Clinical Calculators & Bio-Metrics Suite'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aquaculture Clinical Calculators & Bio-Metrics Suite | Next Farm Bio Sciences',
    description:
      'Interactive scientific calculators for shrimp pond ammonia, biomass, feed FCR, minerals, and DO aeration.',
    images: ['/images/branding/og_image.png']
  }
};

export default function CalculatorsPage() {
  const breadcrumbsJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Aquaculture Clinical Calculators', url: '/calculators' }
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does water pH and temperature impact toxic ammonia (NH3) in shrimp ponds?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Total Ammonia Nitrogen (TAN) exists in equilibrium between harmless ionized ammonium (NH4+) and highly toxic un-ionized free ammonia (NH3). As pH and temperature rise, the equilibrium shifts drastically toward toxic NH3. At pH 8.5 and 30°C, more than 15% of TAN is lethal NH3, causing gill tissue hyperplasia and acute hypoxia.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the ideal Calcium to Magnesium ratio for Litopenaeus vannamei?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In natural oceanic seawater, the Magnesium to Calcium ratio (Mg:Ca) is approximately 3.1:1. For healthy vannamei shrimp molting, the ratio must never drop below 2.8:1. When Magnesium is deficient relative to Calcium, shrimp cannot properly calcify new cuticles, resulting in soft-shell syndrome and molt cramps.'
        }
      },
      {
        '@type': 'Question',
        name: 'How much probiotic (Next Gut) should be coated on feed per day?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For commercial prevention and growth optimization, mix 15 to 20 ml of Next Gut per kilogram of commercial feed twice daily using a non-toxic feed binder. During active White Gut or White Feces outbreaks, increase dosage to 20-25 ml/kg for 5 consecutive days.'
        }
      },
      {
        '@type': 'Question',
        name: 'How many paddlewheel aerators are required per acre of shrimp pond?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The standard rule of thumb is 1 Horsepower (HP) of aeration for every 350 to 400 kg of standing shrimp biomass. For an intensive pond with 4,000 kg biomass, a minimum of 10-12 HP of aeration (5 to 6 two-HP paddlewheel aerators) is required during nocturnal hours.'
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getCalculatorsAppJsonLd())
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
          __html: JSON.stringify(faqSchema)
        }}
      />

      <CalculatorsSuite />
    </div>
  );
}
