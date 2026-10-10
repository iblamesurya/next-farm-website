import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/catalog';
import { SOLUTIONS } from '@/lib/solutions-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nextfarmbiosciences.app';
  const lastModified = new Date();

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  const solutionRoutes: MetadataRoute.Sitemap = SOLUTIONS.map((solution) => ({
    url: `${baseUrl}/solutions/${solution.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.95
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/products`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.99
    },
    {
      url: `${baseUrl}/aquaculture`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.99
    },
    {
      url: `${baseUrl}/shrimp-medicine`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.98
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.95
    },
    {
      url: `${baseUrl}/pond-doctor`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8
    }
  ];

  return [...staticRoutes, ...solutionRoutes, ...productRoutes];
}
