import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/catalog';
import { SOLUTIONS } from '@/lib/solutions-data';
import { BLOG_ARTICLES } from '@/lib/blog-data';
import { DISEASE_MONOGRAPHS } from '@/lib/diseases-data';
import { DISTRICT_GUIDES } from '@/lib/districts-data';

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

  const blogRoutes: MetadataRoute.Sitemap = BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.92
  }));

  const diseaseRoutes: MetadataRoute.Sitemap = DISEASE_MONOGRAPHS.map((disease) => ({
    url: `${baseUrl}/diseases/${disease.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.96
  }));

  const districtRoutes: MetadataRoute.Sitemap = DISTRICT_GUIDES.map((d) => ({
    url: `${baseUrl}/districts/${d.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.94
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
      url: `${baseUrl}/diseases`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.99
    },
    {
      url: `${baseUrl}/districts`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.98
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.98
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.98
    },
    {
      url: `${baseUrl}/research`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95
    },
    {
      url: `${baseUrl}/certifications`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95
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
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.98
    },
    {
      url: `${baseUrl}/feed.xml`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9
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

  return [
    ...staticRoutes, 
    ...diseaseRoutes, 
    ...districtRoutes, 
    ...solutionRoutes, 
    ...productRoutes, 
    ...blogRoutes
  ];
}
