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
    email: 'support@nextfarmbiosciences.app',
    alternateName: [
      'NextFarm Bio Sciences',
      'Next Farm Biosciences',
      'Next Farm Biosciences Vijayawada',
      'Next Farm Aqua',
      'Next Farm'
    ],
    sameAs: [
      'https://www.wikidata.org/wiki/Q141685540',
      'https://www.wikidata.org/entity/Q141685540',
      'https://wa.me/918977656444',
      'https://nextfarmbiosciences.app'
    ],
    hasMap: 'https://maps.google.com/?q=Next+Farm+Bio+Sciences+New+Autonagar+Vijayawada',
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
      latitude: '16.5160',
      longitude: '80.6920'
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
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Andhra Pradesh' },
      { '@type': 'AdministrativeArea', name: 'Tamil Nadu' },
      { '@type': 'AdministrativeArea', name: 'Telangana' },
      { '@type': 'AdministrativeArea', name: 'Gujarat' },
      { '@type': 'AdministrativeArea', name: 'Odisha' },
      { '@type': 'AdministrativeArea', name: 'West Bengal' }
    ],
    knowsAbout: [
      'Aquaculture Biotechnology',
      'Shrimp Disease Management',
      'Penaeus monodon Health',
      'Litopenaeus vannamei Probiotics',
      'Water Quality Bioremediation',
      'Nitrifying Bacteria',
      'Vibrio Parahaemolyticus Control'
    ],
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
    sku: `NF-${product.slug.toUpperCase().replace(/-/g, '_')}-5L`,
    mpn: `NF-BIO-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Next Farm Bio Sciences'
    },
    category: product.category,
    hasMemberProgram: {
      '@type': 'MemberProgram',
      name: 'Next Farm Aqua Farmer Direct',
      description: 'Direct-to-farmer aquaculture biosecurity membership and express dispatch'
    },
    offers: {
      '@type': 'Offer',
      name: `${product.name} (5L Can)`,
      price: product.pricing?.can5L || 5000,
      priceCurrency: 'INR',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url,
      seller: {
        '@type': 'Organization',
        name: 'Next Farm Bio Sciences'
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 0,
          currency: 'INR'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 4,
            unitCode: 'DAY'
          }
        }
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '142',
      bestRating: '5',
      worstRating: '1'
    },
    hasCertification: [
      {
        '@type': 'Certification',
        name: 'Coastal Aquaculture Authority (CAA) Approval',
        issuedBy: {
          '@type': 'Organization',
          name: 'Coastal Aquaculture Authority (Govt. of India)'
        }
      },
      {
        '@type': 'Certification',
        name: 'ISO 9001:2015 Quality Management System',
        issuedBy: {
          '@type': 'Organization',
          name: 'International Organization for Standardization'
        }
      }
    ],
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

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nextfarmbiosciences.app';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
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
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/solutions?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function getPondDoctorAppJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nextfarmbiosciences.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${baseUrl}/pond-doctor#app`,
    name: 'Pond Doctor Clinical Diagnostic Engine',
    url: `${baseUrl}/pond-doctor`,
    description:
      'Interactive clinical diagnostic assistant and volumetric dosage calculator for shrimp and prawn aquaculture ponds. Diagnoses White Gut, Toxic Ammonia, Vibrio, Benthic Sludge, and Molting Cramps with precise pack allocation.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All Modern Web Browsers',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR'
    },
    provider: {
      '@type': 'Organization',
      name: 'Next Farm Bio Sciences',
      url: baseUrl
    }
  };
}

export function getMedicalWebPageJsonLd({
  title,
  description,
  url,
  keywords,
  datePublished = '2026-01-15',
  dateModified = '2026-10-10'
}: {
  title: string;
  description: string;
  url: string;
  keywords: string[];
  datePublished?: string;
  dateModified?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nextfarmbiosciences.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    headline: title,
    description,
    keywords: keywords.join(', '),
    inLanguage: 'en-IN',
    datePublished,
    dateModified,
    publisher: {
      '@type': 'Organization',
      name: 'Next Farm Bio Sciences',
      url: baseUrl,
      logo: `${baseUrl}/images/branding/logo_primary.png`
    },
    author: {
      '@type': 'Organization',
      name: 'Next Farm Bio Sciences Research & Biosecurity Team',
      url: baseUrl
    },
    about: {
      '@type': 'MedicalCondition',
      name: 'Aquaculture Pathology & Biosecurity Management'
    }
  };
}

export function getCollectionPageJsonLd({
  title,
  description,
  url,
  items
}: {
  title: string;
  description: string;
  url: string;
  items: Array<{ name: string; url: string; description?: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nextfarmbiosciences.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: title,
    description,
    inLanguage: 'en-IN',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
        description: item.description
      }))
    }
  };
}

