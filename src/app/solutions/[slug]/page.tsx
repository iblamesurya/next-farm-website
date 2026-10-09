import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SOLUTIONS, getSolutionBySlug } from '@/lib/solutions-data';
import { getProductBySlug } from '@/lib/catalog';
import { SolutionDetailView } from '@/components/solutions/solution-detail-view';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return SOLUTIONS.map((solution) => ({
    slug: solution.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {
      title: 'Aquaculture Treatment Guide Not Found | Next Farm Bio Sciences',
      description: 'The requested shrimp aquaculture disease treatment protocol could not be found.'
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nextfarmbiosciences.app';
  const canonicalUrl = `${baseUrl}/solutions/${solution.slug}`;

  return {
    title: solution.metaTitle,
    description: solution.metaDescription,
    keywords: [
      solution.targetKeyword,
      ...solution.secondaryKeywords,
      'Next Farm Bio Sciences',
      'Shrimp disease treatment Andhra Pradesh',
      'CAA approved probiotics'
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: solution.metaTitle,
      description: solution.metaDescription,
      url: canonicalUrl,
      siteName: 'Next Farm Bio Sciences',
      locale: 'en_IN',
      type: 'article',
      images: [
        {
          url: '/images/branding/logo_primary.png',
          width: 800,
          height: 600,
          alt: `${solution.targetKeyword} - Next Farm Bio Sciences`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: solution.metaTitle,
      description: solution.metaDescription,
      images: ['/images/branding/logo_primary.png']
    }
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const primaryProduct = getProductBySlug(solution.primaryProductSlug);
  if (!primaryProduct) {
    notFound();
  }

  const secondaryProduct = solution.secondaryProductSlug
    ? getProductBySlug(solution.secondaryProductSlug)
    : undefined;

  const relatedSolutions = SOLUTIONS.filter((s) => s.slug !== solution.slug).slice(0, 3);

  // Generate FAQPage Schema JSON-LD
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: solution.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd)
        }}
      />
      <SolutionDetailView
        solution={solution}
        primaryProduct={primaryProduct}
        secondaryProduct={secondaryProduct}
        relatedSolutions={relatedSolutions}
      />
    </>
  );
}
