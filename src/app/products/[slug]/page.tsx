import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProductBySlug } from '@/lib/catalog';
import { ProductDetailView } from '@/components/pdp/product-detail-view';
import { getProductJsonLd } from '@/lib/structured-data';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Formulation Not Found | Next Farm Bio Sciences',
      description: 'The requested aquaculture formulation could not be found.'
    };
  }

  return {
    title: `${product.name} | Next Farm Bio Sciences Aquaculture Biotechnology`,
    description: `${product.tagline}. High-potency biological formulation for shrimp and prawn farming. CAA Approved, ISO 9001:2015, 100% Antibiotic-Free.`,
    keywords: [
      product.name,
      product.category,
      'aquaculture probiotics',
      'shrimp farming India',
      'CAA approved pond conditioner',
      'Vijayawada biotechnology',
      ...product.strains
    ],
    openGraph: {
      title: `${product.name} | Next Farm Bio Sciences`,
      description: product.tagline,
      images: [
        {
          url: product.packshotImage,
          width: 1200,
          height: 1200,
          alt: `${product.name} Studio Packshot`
        }
      ]
    }
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get up to 3 complementary products
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProductJsonLd(product))
        }}
      />
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </>
  );
}
