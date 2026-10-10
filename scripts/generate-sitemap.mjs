import fs from 'node:fs';
import path from 'node:path';

const baseUrl = 'https://nextfarmbiosciences.app';
const currentDate = new Date().toISOString().split('T')[0];

const productSlugs = [
  'next-viro-nill',
  'next-gut',
  'next-converter',
  'next-vibriosis',
  'next-sludge',
  'next-min',
  'next-pro',
  'next-pro-plus',
  'next-softner',
  'next-remedy',
  'next-food-pro'
];

const solutionSlugs = [
  'white-gut-treatment-shrimp',
  'ammonia-control-shrimp-pond',
  'vibrio-red-disease-cure-shrimp',
  'black-soil-sludge-digester-pond',
  'soft-shell-molting-cramps-shrimp',
  'running-mortality-syndrome-shrimp',
  'blue-green-algae-control-pond',
  'loose-shell-slow-growth-shrimp',
  'hard-water-salinity-conditioner-pond'
];

const blogSlugs = [
  'vannamei-white-gut-white-feces-ehp-treatment-protocol',
  'ammonia-tan-nitrite-toxicity-shrimp-pond-nitrification-guide',
  'luminescent-vibriosis-red-disease-ems-ahpnd-shrimp-protocol',
  'caa-mpeda-banned-antibiotics-gazette-legal-probiotics-guide',
  'andhra-pradesh-regional-shrimp-farming-bhimavaram-nellore-guide',
  'benthic-sludge-black-soil-h2s-bioremediation-guide',
  'vannamei-mineral-ionic-ratios-molting-soft-shell-cure',
  'running-mortality-syndrome-rms-andhra-pradesh-field-guide',
  'freshwater-low-salinity-vannamei-farming-mineral-guide',
  'doc-1-to-120-shrimp-probiotic-master-schedule-fcr-guide'
];

const urls = [
  { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
  { loc: `${baseUrl}/aquaculture`, priority: '0.99', changefreq: 'daily' },
  { loc: `${baseUrl}/shrimp-medicine`, priority: '0.99', changefreq: 'daily' },
  { loc: `${baseUrl}/calculators`, priority: '0.98', changefreq: 'daily' },
  { loc: `${baseUrl}/pond-doctor`, priority: '0.98', changefreq: 'daily' },
  { loc: `${baseUrl}/products`, priority: '0.96', changefreq: 'daily' },
  { loc: `${baseUrl}/solutions`, priority: '0.96', changefreq: 'daily' },
  { loc: `${baseUrl}/blog`, priority: '0.96', changefreq: 'daily' },
  ...blogSlugs.map((slug) => ({
    loc: `${baseUrl}/blog/${slug}`,
    priority: '0.95',
    changefreq: 'weekly'
  })),
  ...solutionSlugs.map((slug) => ({
    loc: `${baseUrl}/solutions/${slug}`,
    priority: '0.92',
    changefreq: 'weekly'
  })),
  ...productSlugs.map((slug) => ({
    loc: `${baseUrl}/products/${slug}`,
    priority: '0.90',
    changefreq: 'weekly'
  })),
  { loc: `${baseUrl}/llms.txt`, priority: '0.80', changefreq: 'weekly' },
  { loc: `${baseUrl}/llms-full.txt`, priority: '0.80', changefreq: 'weekly' },
  { loc: `${baseUrl}/google-merchant-feed.xml`, priority: '0.85', changefreq: 'daily' }
];

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const publicPath = path.join('public', 'sitemap.xml');
fs.writeFileSync(publicPath, xmlContent.trim() + '\n', 'utf8');
console.log(`✅ Generated valid XML sitemap with ${urls.length} URLs at ${publicPath}`);
