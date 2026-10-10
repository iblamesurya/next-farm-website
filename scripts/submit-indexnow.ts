import { PRODUCTS } from '../src/lib/catalog';
import { BLOG_ARTICLES } from '../src/lib/blog-data';

const HOST = 'nextfarmbiosciences.app';
const BASE_URL = `https://${HOST}`;
const KEY = '7f9e3c2b1d844e6f9a0b2c3d4e5f6a7b';
const KEY_LOCATION = `${BASE_URL}/${KEY}.txt`;

const STATIC_ROUTES = [
  '/',
  '/aquaculture',
  '/shrimp-medicine',
  '/calculators',
  '/pond-doctor',
  '/products',
  '/solutions',
  '/solutions/white-gut-treatment-shrimp',
  '/solutions/ammonia-control-shrimp-pond',
  '/solutions/vibrio-red-disease-cure-shrimp',
  '/solutions/black-soil-sludge-digester-pond',
  '/solutions/soft-shell-molting-cramps-shrimp',
  '/solutions/running-mortality-syndrome-shrimp',
  '/solutions/blue-green-algae-control-pond',
  '/solutions/loose-shell-slow-growth-shrimp',
  '/solutions/hard-water-salinity-conditioner-pond',
  '/blog',
  '/llms.txt',
  '/llms-full.txt',
  '/openai-products.jsonl',
  '/openai-products.csv',
  '/openai-products.json',
  '/google-merchant-feed.xml',
  '/.well-known/ai-catalog.json',
  '/.well-known/agent-card.json',
];

async function submitIndexNow() {
  const productUrls = PRODUCTS.map((p) => `${BASE_URL}/products/${p.slug}`);
  const blogUrls = BLOG_ARTICLES.map((b) => `${BASE_URL}/blog/${b.slug}`);
  const staticUrls = STATIC_ROUTES.map((r) => `${BASE_URL}${r}`);
  const urlList = [...staticUrls, ...productUrls, ...blogUrls];

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ];

  console.log(`Submitting ${urlList.length} URLs via IndexNow...`);

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      console.log(`[${endpoint}] HTTP ${res.status} ${res.statusText} ${text ? `- ${text}` : ''}`);
    } catch (err) {
      console.error(`[${endpoint}] Error:`, err);
    }
  }
}

submitIndexNow();
