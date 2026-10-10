/**
 * Schema.org JSON-LD Structured Data Generators
 * Generates VeterinaryBusiness, Product, Offer, and FAQPage schemas
 * Source: ORIGINAL_REQUEST.md (R5), survey_integrations.md § 5.4
 */

import { Product } from '@/types/catalog';

export function getVeterinaryBusinessJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nextfarmbiosciences.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryBusiness',
    '@id': `${baseUrl}/#organization`,
    name: 'Next Farm Bio Sciences',
    legalName: 'Next Farm Bio Sciences Private Limited',
    url: baseUrl,
    logo: `${baseUrl}/images/branding/logo_primary.png`,
    image: `${baseUrl}/images/branding/logo_primary.png`,
    description:
      'Pioneering sustainable aquaculture biotechnology, providing CAA-approved, antibiotic-free probiotics, mineral supplements, and water conditioners for shrimp and prawn farming.',
    telephone: '+91-8977656444',
    email: 'info@nextfarmbiosciences.app',
    alternateName: [
      'NextFarm Bio Sciences',
      'Next Farm Biosciences',
      'Next Farm Biosciences Vijayawada',
      'Next Farm'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'New Autonagar',
      addressLocality: 'Vijayawada',
      addressRegion: 'Andhra Pradesh',
      postalCode: '520010',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '16.5062',
      longitude: '80.6480'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '17:00'
      }
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'UPI, Credit Card, Debit Card, Net Banking (Razorpay Pre-Paid)',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Aquaculture Biotechnology Formulations',
      itemListElement: [
        { '@type': 'OfferCatalog', name: 'Gut Health & Probiotics' },
        { '@type': 'OfferCatalog', name: 'Ammonia & Water Quality Conditioners' },
        { '@type': 'OfferCatalog', name: 'Pond Bottom & Sludge Digesters' }
      ]
    }
  };
}

export function getProductJsonLd(product: Product) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nextfarmbiosciences.app';
  const url = `${baseUrl}/products/${product.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: product.name,
    url,
    image: product.packshotImage.startsWith('http')
      ? product.packshotImage
      : `${baseUrl}${product.packshotImage}`,
    description: product.tagline,
    brand: {
      '@type': 'Brand',
      name: 'Next Farm Bio Sciences'
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      name: `${product.name} (5L Can)`,
      price: product.pricing?.can5L || 5000,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url,
      seller: {
        '@type': 'Organization',
        name: 'Next Farm Bio Sciences'
      }
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Regulatory Approval',
        value: 'CAA Approved (Coastal Aquaculture Authority)'
      },
      {
        '@type': 'PropertyValue',
        name: 'Quality Certification',
        value: 'ISO 9001:2015'
      },
      {
        '@type': 'PropertyValue',
        name: 'Antibiotic Safety',
        value: '100% Antibiotic-Free'
      }
    ]
  };
}

export function getFaqPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I treat White Gut Syndrome in shrimp without using antibiotics?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Apply Next Gut multi-strain probiotic (Citrobacter, Lactobacillus, Saccharomyces) mixed with feed at 15-20ml per kg twice daily for 5 days. Simultaneously broadcast Next Viro Nill water bio-conditioner at 1 Liter per acre to eliminate pathogenic Vibrio reservoirs.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the dosage of Next Converter for severe ammonia (NH3) spikes in pond water?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For active toxic ammonia spikes above 0.5 ppm TAN, apply 2.0 to 3.0 Liters of Next Converter per 1 Acre of pond surface (1 meter water depth) during morning aeration.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are Next Farm Bio Sciences products approved by the Coastal Aquaculture Authority (CAA)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All biological formulations produced by Next Farm Bio Sciences are approved by the Coastal Aquaculture Authority (CAA), certified under ISO 9001:2015, and guaranteed 100% free from banned antibiotics.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I order Next Farm products using Cash on Delivery (COD)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. To ensure optimal biological cold-chain handling and prevent transit delays for living bacterial formulations, all orders must be pre-paid securely online via Razorpay (UPI, GPay, PhonePe, Cards, NetBanking).'
        }
      },
      {
        '@type': 'Question',
        name: 'How quickly are orders dispatched to prawn farms in Andhra Pradesh?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pre-paid orders confirmed before 2:00 PM IST are dispatched same-day from our New Autonagar, Vijayawada warehouse via dedicated express aquaculture freight, reaching coastal districts within 24-48 hours.'
        }
      }
    ]
  };
}

export function getWebSiteJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nextfarmbiosciences.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Next Farm Bio Sciences',
    alternateName: [
      'NextFarm Biosciences',
      'Next Farm Biosciences',
      'Next Farm Biosciences Vijayawada',
      'Next Farm'
    ],
    description:
      'Official commercial aquaculture biotechnology portal in New Autonagar, Vijayawada, Andhra Pradesh.',
    publisher: {
      '@id': `${baseUrl}/#organization`
    },
    inLanguage: 'en-IN'
  };
}
