import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nextfarmbiosciences.app';

  return {
    rules: [
      {
        userAgent: [
          'Googlebot',
          'Google-Extended',
          'GoogleOther',
          'Bingbot',
          'Applebot',
          'Applebot-Extended',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-SearchBot',
          'Claude-User',
          'anthropic-ai',
          'PerplexityBot',
          'Perplexity-User',
          'GrokBot',
          'xai-grok',
          'KimiBot',
          'MoonshotBot',
          'QwenBot',
          'Alibaba-Cloud',
          'DeepSeekBot',
          'Baiduspider',
          'Meta-ExternalAgent',
          'Meta-ExternalFetcher',
          'FacebookBot',
          'YouBot',
          'cohere-ai',
          'cohere-training-data-crawler',
          'Amazonbot',
          'Bytespider',
          'MistralBot',
          'DuckAssistBot',
          'DuckDuckBot',
          'Bravebot',
          'PhindBot',
          'ExaBot',
          'Diffbot',
          'PetalBot',
          'Omgilibot',
          'Timpibot',
          'CCBot',
          'ia_archiver'
        ],
        allow: [
          '/',
          '/pond-doctor',
          '/products/',
          '/solutions/',
          '/shrimp-medicine',
          '/aquaculture',
          '/support',
          '/llms.txt',
          '/llms-full.txt',
          '/.well-known/ai-catalog.json'
        ],
        disallow: ['/api/', '/admin/']
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/']
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
