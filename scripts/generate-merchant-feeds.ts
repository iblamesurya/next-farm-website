import fs from 'node:fs';
import path from 'node:path';
import { PRODUCTS } from '../src/lib/catalog';

const BASE_URL = 'https://nextfarmbiosciences.app';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const itemsXml: string[] = [];

for (const product of PRODUCTS) {
  const upperSlug = product.slug.toUpperCase();
  const groupId = `NF-${upperSlug}`;
  const mainImage = `${BASE_URL}${product.packshotImage}`;
  const additionalImages = product.galleryImages
    .filter((img) => img !== product.packshotImage)
    .map((img) => `${BASE_URL}${img}`);

  const fullDescription = `${product.overview} Potency: ${product.cfuCount}. Microbial Consortium: ${product.strains.join(', ')}. Primary Indications: ${product.indications.join('; ')}. CAA-Approved, ISO 9001:2015 Certified, 100% Antibiotic-Free. Manufactured by Next Farm Bio Sciences, New Autonagar, Vijayawada, India.`;

  const isDryWeight = ['next-min', 'next-sludge', 'next-food-pro'].includes(product.slug);

  const variants = isDryWeight
    ? [
        {
          code: '5L',
          sizeLabel: product.format5L || (product.slug === 'next-min' ? '10 kg Heavy-Duty Multi-Wall Bag' : '5 kg Master Industrial Pouch'),
          priceAmount: (product.pricing.can5L || 5000).toFixed(2),
          weightKg: product.slug === 'next-min' ? '10.0 kg' : '5.0 kg'
        },
        {
          code: '2L',
          sizeLabel: product.format2L || (product.slug === 'next-min' ? '4 kg Twin Field Pack' : '2 kg Twin Field Pack'),
          priceAmount: (product.pricing.pack2L || 2299).toFixed(2),
          weightKg: product.slug === 'next-min' ? '4.0 kg' : '2.0 kg'
        },
        {
          code: '1L',
          sizeLabel: product.format1L || (product.slug === 'next-min' ? '2 kg Precision Bag' : '1 kg Stand-Up Foil Pouch'),
          priceAmount: (product.pricing.bottle1L || 1199).toFixed(2),
          weightKg: product.slug === 'next-min' ? '2.0 kg' : '1.0 kg'
        }
      ]
    : [
        {
          code: '5L',
          sizeLabel: product.format5L || '5-Liter HDPE Industrial Canister',
          priceAmount: (product.pricing.can5L || 5000).toFixed(2),
          weightKg: '5.0 kg'
        },
        {
          code: '2L',
          sizeLabel: product.format2L || '2-Liter Twin Field Pack',
          priceAmount: (product.pricing.pack2L || 2299).toFixed(2),
          weightKg: '2.0 kg'
        },
        {
          code: '1L',
          sizeLabel: product.format1L || '1-Liter Precision Bottle',
          priceAmount: (product.pricing.bottle1L || 1199).toFixed(2),
          weightKg: '1.0 kg'
        }
      ];

  for (const v of variants) {
    const additionalImgTags = additionalImages
      .map((img) => `      <g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`)
      .join('\n');

    // Precision keyword mapping for Google Shopping search intent
    let searchHeadline = 'Aquaculture Probiotic & Pond Conditioner';
    if (product.slug.includes('gut')) {
      searchHeadline = 'White Gut & EHP Probiotic Medicine for Shrimp';
    } else if (product.slug.includes('viro') || product.slug.includes('vibrio')) {
      searchHeadline = 'Anti-Vibrio & Pathogen Control Shrimp Medicine';
    } else if (product.slug.includes('pond-clear') || product.slug.includes('sludge')) {
      searchHeadline = 'Pond Bottom Sludge & H2S Digester';
    } else if (product.slug.includes('eco') || product.slug.includes('ammonia')) {
      searchHeadline = 'Ammonia (TAN) & Nitrite Reducer Water Probiotic';
    } else if (product.slug.includes('min')) {
      searchHeadline = 'Shrimp Molting Cramps & Soft Shell Mineral Mixture';
    } else if (product.slug.includes('converter')) {
      searchHeadline = 'Shrimp Growth Booster & Feed Conversion Probiotic';
    } else if (product.slug.includes('pro')) {
      searchHeadline = 'Multi-Strain Water & Soil Probiotic for Vannamei';
    }

    const shoppingTitle = `${product.name} (${v.code}) - ${searchHeadline} | CAA Approved`;

    itemsXml.push(`    <item>
      <g:id>${escapeXml(`${groupId}-${v.code}`)}</g:id>
      <g:item_group_id>${escapeXml(groupId)}</g:item_group_id>
      <g:mpn>${escapeXml(`NF-BIO-${product.id.toUpperCase()}-${v.code}`)}</g:mpn>
      <g:title>${escapeXml(shoppingTitle)}</g:title>
      <g:description>${escapeXml(fullDescription)}</g:description>
      <g:link>${escapeXml(`${BASE_URL}/products/${product.slug}?size=${v.code}`)}</g:link>
      <g:image_link>${escapeXml(mainImage)}</g:image_link>
${additionalImgTags}
      <g:availability>in_stock</g:availability>
      <g:price>${v.priceAmount} INR</g:price>
      <g:brand>Next Farm Bio Sciences</g:brand>
      <g:condition>new</g:condition>
      <g:size>${escapeXml(v.sizeLabel)}</g:size>
      <g:shipping_weight>${v.weightKg}</g:shipping_weight>
      <g:google_product_category>Business &amp; Industrial &gt; Agriculture</g:google_product_category>
      <g:product_type>${escapeXml(`Aquaculture Bio-Inputs > ${product.categoryDisplay}`)}</g:product_type>
      <g:product_highlight>${escapeXml(product.cfuCount)} Laboratory Certified Microbial Potency</g:product_highlight>
      <g:product_highlight>100% Antibiotic-Free Formulation (CAA &amp; MPEDA Export Compliant)</g:product_highlight>
      <g:product_highlight>Zero Chloramphenicol &amp; Nitrofurans Guarantee</g:product_highlight>
      <g:product_highlight>Express Pan-India Cold-Chain Dispatch from Vijayawada</g:product_highlight>
      <g:product_detail>
        <g:section_name>Technical Specifications</g:section_name>
        <g:attribute_name>Microbial Consortium</g:attribute_name>
        <g:attribute_value>${escapeXml(product.strains.slice(0, 3).join(', '))}</g:attribute_value>
      </g:product_detail>
      <g:product_detail>
        <g:section_name>Technical Specifications</g:section_name>
        <g:attribute_name>Formulation Type</g:attribute_name>
        <g:attribute_value>${escapeXml(product.categoryDisplay || (isDryWeight ? 'Dry Powder / Micro-Granule' : 'Liquid Probiotic Consortium'))}</g:attribute_value>
      </g:product_detail>
      <g:product_detail>
        <g:section_name>Storage &amp; Compliance</g:section_name>
        <g:attribute_name>Quality Standard</g:attribute_name>
        <g:attribute_value>ISO 9001:2015 Certified Aquaculture Facility</g:attribute_value>
      </g:product_detail>
      <g:product_detail>
        <g:section_name>Storage &amp; Compliance</g:section_name>
        <g:attribute_name>Shelf Life</g:attribute_name>
        <g:attribute_value>24 Months (Store in cool, dry place)</g:attribute_value>
      </g:product_detail>
      <g:identifier_exists>no</g:identifier_exists>
      <g:return_policy_label>default_7day_sealed_biological</g:return_policy_label>
      <g:shipping>
        <g:country>IN</g:country>
        <g:region>AP</g:region>
        <g:service>AP Aqua Belt Express (Bhimavaram/Kaikaluru/Nellore/Bapatla)</g:service>
        <g:price>0.00 INR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>IN</g:country>
        <g:service>Standard National Surface Cargo</g:service>
        <g:price>0.00 INR</g:price>
      </g:shipping>
    </item>`);
  }
}

const xmlFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Next Farm Bio Sciences — Official Aquaculture Bio-Inputs Catalog</title>
    <link>${BASE_URL}</link>
    <description>11 CAA-Approved, ISO 9001:2015 Certified, 100% Antibiotic-Free Aquaculture Probiotics, Water Conditioners, Benthic Sludge Digestors, and Ionic Minerals manufactured in Vijayawada, India.</description>
${itemsXml.join('\n')}
  </channel>
</rss>
`;

const publicDir = fs.existsSync(path.join(process.cwd(), 'next-farm-website', 'public'))
  ? path.join(process.cwd(), 'next-farm-website', 'public')
  : path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'google-merchant-feed.xml'), xmlFeed, 'utf8');

// Also create /.well-known/agent-card.json (Google A2A / Multi-Agent Discovery Card)
const agentCard = {
  name: 'Next Farm Bio Sciences — Pond Doctor & Aquaculture Bio-Inputs Agent',
  description:
    'Official aquaculture biotechnology diagnostic and commerce platform by Next Farm Bio Sciences (Vijayawada, India). Provides CAA-approved shrimp & fish probiotics, ammonia/H2S bioremediators, benthic sludge digestors, and automated pond dosage calculations.',
  url: BASE_URL,
  provider: {
    organization: 'Next Farm Bio Sciences Private Limited',
    url: BASE_URL,
    contactEmail: 'support@nextfarmbiosciences.app',
    phone: '+91-8977656444',
    location: 'New Autonagar, Vijayawada, Andhra Pradesh 520010, India'
  },
  version: '1.0.0',
  capabilities: {
    streaming: false,
    pushNotifications: false
  },
  defaultInputModes: ['text/plain'],
  defaultOutputModes: ['text/markdown', 'application/json'],
  skills: [
    {
      id: 'pond-doctor-diagnostics',
      name: 'Pond Doctor Aquaculture Symptom & Dosage Calculator',
      description:
        'Diagnoses White Gut, White Feces, WSSV viral risk, Vibrio Red Disease, Toxic Ammonia/Nitrite/H2S spikes, and Soft Shell molting cramps, calculating exact 5L and 1L biological dosages per pond acre and water depth.',
      tags: ['aquaculture', 'shrimp-farming', 'probiotics', 'white-gut', 'ammonia', 'vibrio', 'wssv'],
      examples: [
        'What is the dosage of Next Gut for a 3-acre vannamei shrimp pond with White Gut?',
        'How to reduce toxic ammonia and black mud in a 1.5m deep prawn pond?'
      ]
    },
    {
      id: 'caa-catalog-lookup',
      name: 'CAA-Approved Aquaculture Formulations Catalog & Feed',
      description:
        'Provides specifications, microbial CFU counts, strain compositions, and INR pricing for all 11 Next Farm Bio Sciences formulations across 5L, 2L, and 1L packs.',
      tags: ['catalog', 'pricing', 'caa-approved', 'antibiotic-free', 'india'],
      examples: [
        'List all 11 CAA-approved aquaculture products from Next Farm Bio Sciences.',
        'What are the microbial strains and CFU count in Next Viro Nill?'
      ]
    }
  ],
  links: {
    llmsTxt: `${BASE_URL}/llms.txt`,
    llmsFullTxt: `${BASE_URL}/llms-full.txt`,
    aiCatalog: `${BASE_URL}/.well-known/ai-catalog.json`,
    openaiProductFeedJsonl: `${BASE_URL}/openai-products.jsonl`,
    openaiProductFeedCsv: `${BASE_URL}/openai-products.csv`,
    googleMerchantFeedXml: `${BASE_URL}/google-merchant-feed.xml`,
    sitemapXml: `${BASE_URL}/sitemap.xml`
  }
};

const wellKnownDir = path.join(publicDir, '.well-known');
if (!fs.existsSync(wellKnownDir)) {
  fs.mkdirSync(wellKnownDir, { recursive: true });
}

fs.writeFileSync(
  path.join(wellKnownDir, 'agent-card.json'),
  JSON.stringify(agentCard, null, 2) + '\n',
  'utf8'
);

console.log(`✅ Generated ${path.join(publicDir, 'google-merchant-feed.xml')} and ${path.join(wellKnownDir, 'agent-card.json')}!`);

