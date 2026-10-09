import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nextfarm.in';

  return {
    rules: [
      {
        userAgent: ['Googlebot', 'GPTBot', 'PerplexityBot', 'ClaudeBot', 'Bingbot', 'Applebot'],
        allow: [
          '/',
          '/pond-doctor',
          '/products/',
          '/solutions/',
          '/support',
          '/llms.txt',
          '/llms-full.txt'
        ],
        disallow: ['/api/', '/admin/']
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
