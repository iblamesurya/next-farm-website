import fs from 'node:fs';
import path from 'node:path';
import { PRODUCTS } from '../src/lib/catalog';

const BASE_URL = 'https://nextfarmbiosciences.app';

interface OpenAIProductRecord {
  item_id: string;
  group_id: string;
  listing_has_variations: boolean;
  variant_dict: { size: string };
  size: string;
  offer_id: string;
  mpn: string;
  title: string;
  description: string;
  url: string;
  brand: string;
  seller_name: string;
  seller_url: string;
  image_url: string;
  additional_image_urls: string[];
  price: string;
  availability: 'in_stock';
  condition: 'new';
  is_eligible_search: boolean;
  product_category: string;
  weight: string;
  item_weight_unit: 'kg';
}

const records: OpenAIProductRecord[] = [];

for (const product of PRODUCTS) {
  const upperSlug = product.slug.toUpperCase();
  const groupId = `NF-${upperSlug}`;
  const mainImage = `${BASE_URL}${product.packshotImage}`;
  const additionalImages = product.galleryImages
    .filter((img) => img !== product.packshotImage)
    .map((img) => `${BASE_URL}${img}`);

  const fullDescription = `${product.overview} Potency: ${product.cfuCount}. Microbial Consortium: ${product.strains.join(', ')}. Primary Indications: ${product.indications.join('; ')}. CAA-Approved, ISO 9001:2015 Certified, 100% Antibiotic-Free. Manufactured by Next Farm Bio Sciences, New Autonagar, Vijayawada, India.`;

  const variants = [
    {
      code: '5L',
      sizeLabel: product.format5L || '5-Liter HDPE Industrial Canister',
      priceAmount: (product.pricing.can5L || 5000).toFixed(2),
      weightKg: '5.0'
    },
    {
      code: '2L',
      sizeLabel: product.format2L || '2-Liter Twin Field Pack',
      priceAmount: (product.pricing.pack2L || 2299).toFixed(2),
      weightKg: '2.0'
    },
    {
      code: '1L',
      sizeLabel: product.format1L || '1-Liter Precision Bottle',
      priceAmount: (product.pricing.bottle1L || 1199).toFixed(2),
      weightKg: '1.0'
    }
  ];

  for (const v of variants) {
    records.push({
      item_id: `${groupId}-${v.code}`,
      group_id: groupId,
      listing_has_variations: true,
      variant_dict: { size: v.sizeLabel },
      size: v.sizeLabel,
      offer_id: `nextfarm-${product.slug}-${v.code}`,
      mpn: `NF-BIO-${product.id.toUpperCase()}-${v.code}`,
      title: `${product.name} — ${v.sizeLabel} (${product.categoryDisplay})`,
      description: fullDescription,
      url: `${BASE_URL}/products/${product.slug}?size=${v.code}`,
      brand: 'Next Farm Bio Sciences',
      seller_name: 'Next Farm Bio Sciences',
      seller_url: BASE_URL,
      image_url: mainImage,
      additional_image_urls: additionalImages,
      price: `${v.priceAmount} INR`,
      availability: 'in_stock',
      condition: 'new',
      is_eligible_search: true,
      product_category: 'Business & Industrial > Agriculture > Aquaculture & Livestock Supplies',
      weight: v.weightKg,
      item_weight_unit: 'kg'
    });
  }
}

// 1. Write JSONL (OpenAI Primary Feed Format)
const jsonlPath = path.join('public', 'openai-products.jsonl');
const jsonlContent = records.map((r) => JSON.stringify(r)).join('\n') + '\n';
fs.writeFileSync(jsonlPath, jsonlContent, 'utf8');

// 2. Write JSON array (for human/API inspection)
const jsonPath = path.join('public', 'openai-products.json');
fs.writeFileSync(jsonPath, JSON.stringify(records, null, 2) + '\n', 'utf8');

// 3. Write CSV (OpenAI CSV Feed Format)
const csvHeaders = [
  'item_id',
  'group_id',
  'listing_has_variations',
  'variant_dict',
  'size',
  'offer_id',
  'mpn',
  'title',
  'description',
  'url',
  'brand',
  'seller_name',
  'seller_url',
  'image_url',
  'additional_image_urls',
  'price',
  'availability',
  'condition',
  'is_eligible_search',
  'product_category',
  'weight',
  'item_weight_unit'
];

function escapeCsvCell(val: string): string {
  if (val.includes('"') || val.includes(',') || val.includes('\n')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

const csvRows = [csvHeaders.join(',')];
for (const r of records) {
  const row = [
    r.item_id,
    r.group_id,
    String(r.listing_has_variations),
    JSON.stringify(r.variant_dict),
    r.size,
    r.offer_id,
    r.mpn,
    r.title,
    r.description,
    r.url,
    r.brand,
    r.seller_name,
    r.seller_url,
    r.image_url,
    r.additional_image_urls.join(','),
    r.price,
    r.availability,
    r.condition,
    String(r.is_eligible_search),
    r.product_category,
    r.weight,
    r.item_weight_unit
  ].map(escapeCsvCell);
  csvRows.push(row.join(','));
}

const csvPath = path.join('public', 'openai-products.csv');
fs.writeFileSync(csvPath, csvRows.join('\n') + '\n', 'utf8');

console.log(`✅ Generated ${records.length} OpenAI Agentic Commerce SKUs across JSONL, CSV, and JSON!`);
