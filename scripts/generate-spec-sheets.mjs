import fs from 'fs';
import path from 'path';

const products = [
  {
    code: 'TDS_Next_Viro_Nill.pdf',
    title: 'NEXT VIRO NILL - Technical Data Sheet',
    category: 'Pond Water & Sediment Conditioner (WSSV Biosecurity)',
    strains: 'Bacillus subtilis, Bacillus licheniformis, Pediococcus acidilactici',
    cfu: 'Minimum 5 Billion CFU/ml (5 x 10^9 CFU/ml)',
    dosage: 'Pond Prep: 1.0 L/Acre | Maintenance: 500 mL/Acre | Stress: 1.5 L/Acre',
    certs: 'CAA Approved | ISO 9001:2015 | 100% Antibiotic-Free',
    shelfLife: '24 months at 15C-25C in cool shaded conditions'
  },
  {
    code: 'TDS_Next_Gut.pdf',
    title: 'NEXT GUT - Technical Data Sheet',
    category: 'Digestive & Gut Health Support (Enteric Probiotic)',
    strains: 'Citrobacter, L. sporogenes, Bacteroides, Bifidobacteria, S. cerevisiae',
    cfu: 'Minimum 10 Billion CFU/g (1 x 10^10 CFU/g)',
    dosage: 'Nursery: 5 mL/kg feed | Grow-out: 10 mL/kg | White Gut: 15-20 mL/kg',
    certs: 'CAA Approved | ISO 9001:2015 | 100% Antibiotic-Free',
    shelfLife: '24 months at 15C-25C in cool shaded conditions'
  },
  {
    code: 'TDS_Next_Converter.pdf',
    title: 'NEXT CONVERTER - Technical Data Sheet',
    category: 'Water Quality Conditioner & Gas Remediation',
    strains: 'Bacillus polymyxa, Nitrosomonas biostimulants, Candida sp.',
    cfu: 'Minimum 4 Billion CFU/ml (4 x 10^9 CFU/ml)',
    dosage: 'Maintenance: 1.0 L/Acre | NH3 Spike: 2.0 L/Acre | Emergency: 3.0 L/Acre',
    certs: 'CAA Approved | ISO 9001:2015 | 100% Antibiotic-Free',
    shelfLife: '24 months at 15C-25C in cool shaded conditions'
  },
  {
    code: 'TDS_Next_Sludge.pdf',
    title: 'NEXT SLUDGE - Technical Data Sheet',
    category: 'Pond Bottom & Sludge Conditioner (Benthic Digestion)',
    strains: 'Rhizopus, Cunninghemella, Chrysosporium, Mucor, Aspergillus, Chitinase',
    cfu: 'Bio-enzymatic fungal matrix with active chitinase & cellulase',
    dosage: 'DOC 30-60: 1.0 kg/Acre | DOC 61-90: 1.5 kg/Acre | DOC 91+: 2.0 kg/Acre',
    certs: 'CAA Approved | ISO 9001:2015 | 100% Antibiotic-Free',
    shelfLife: '24 months at 15C-25C in moisture-barrier packaging'
  },
  {
    code: 'TDS_Next_Vibriosis.pdf',
    title: 'NEXT VIBRIOSIS - Technical Data Sheet',
    category: 'Targeted Vibrio & EMS/AHPND Management',
    strains: 'Lactobacillus plantarum, L. curvatus, P. acidilactici, Streptomyces griseus',
    cfu: 'Minimum 8 Billion CFU/ml (8 x 10^9 CFU/ml)',
    dosage: 'Water: 1.0 L/Acre every 4 days | Feed: 10-15 mL/kg feed',
    certs: 'CAA Approved | ISO 9001:2015 | 100% Antibiotic-Free',
    shelfLife: '24 months at 15C-25C in cool shaded conditions'
  },
  {
    code: 'TDS_Next_Min.pdf',
    title: 'NEXT-MIN - Technical Data Sheet',
    category: 'Balanced Bio-Mineral Supplement (Ionic Electrolytes)',
    strains: 'Calcium 22%, Magnesium 11%, Phosphorus 4.5%, Potassium 3%, Trace Zn/Mn/Fe',
    cfu: '100% Bioavailable water-soluble pharmaceutical grade mineral salts',
    dosage: 'Low salinity: 10 kg/Acre weekly | Normal: 5 kg/Acre | Pre-molt: 10 kg/Acre',
    certs: 'CAA Approved | ISO 9001:2015 | 100% Antibiotic-Free (Heavy Metal Tested)',
    shelfLife: '36 months in multi-wall sealed packaging'
  },
  {
    code: 'TDS_Next_Food_Pro.pdf',
    title: 'NEXT FOOD PRO - Technical Data Sheet',
    category: 'Feed-Grade Bio-Nutrition Probiotic Supplement',
    strains: 'Bacillus subtilis, Lactobacillus acidophilus, Enterococcus faecium, Beta-glucans',
    cfu: 'Minimum 6 Billion CFU/g (6 x 10^9 CFU/g)',
    dosage: 'Nursery: 5 g/kg feed | Grow-out: 3-5 g/kg feed daily',
    certs: 'CAA Approved | ISO 9001:2015 | 100% Antibiotic-Free',
    shelfLife: '24 months at 15C-25C in heat-sealed pouches'
  },
  {
    code: 'TDS_Next_Softner.pdf',
    title: 'NEXT SOFTNER - Technical Data Sheet',
    category: 'Water Hardness & Carbonate Conditioner (Bio-Chelation)',
    strains: 'Acetobacter sp., Arthrobacter, Azotobacter, Azomonas, natural organic acids',
    cfu: 'Biological chelation consortium for hardness reduction',
    dosage: 'Maintenance: 1.0 L/Acre | Hardness > 250 ppm: 2.0 L/Acre | Severe: 3.0 L/Acre',
    certs: 'CAA Approved | ISO 9001:2015 | 100% Antibiotic-Free',
    shelfLife: '24 months at 15C-25C in cool shaded conditions'
  },
  {
    code: 'TDS_Next_Remedy.pdf',
    title: 'NEXT REMEDY - Technical Data Sheet',
    category: 'Microbial Balance & Cyanobacteria Control',
    strains: 'Candida sp., Rhodococcus, Arthrobacter, Rhodotorula',
    cfu: 'Minimum 5 Billion CFU/ml (5 x 10^9 CFU/ml)',
    dosage: 'Maintenance: 1.0 L/Acre | Green Bloom: 2.0 L/Acre | Crash Alert: 3.0 L/Acre',
    certs: 'CAA Approved | ISO 9001:2015 | 100% Antibiotic-Free',
    shelfLife: '24 months at 15C-25C in cool shaded conditions'
  },
  {
    code: 'TDS_Next_Pro_Plus.pdf',
    title: 'NEXT PRO PLUS - Technical Data Sheet',
    category: 'Herbal Water & Bottom Conditioner (Zooplankton Bloom)',
    strains: 'Herbal botanical L-amino acids (20% active extract) + selective Bacillus sp.',
    cfu: 'Minimum 3 Billion CFU/ml (3 x 10^9 CFU/ml)',
    dosage: 'Pre-stocking: 2.0 L/Acre | DOC 1-30: 1.0 L/Acre | DOC 31+: 1.5 L/Acre',
    certs: 'CAA Approved | ISO 9001:2015 | 100% Antibiotic-Free',
    shelfLife: '24 months at 15C-25C in cool shaded conditions'
  },
  {
    code: 'TDS_Next_Pro.pdf',
    title: 'NEXT PRO - Technical Data Sheet',
    category: 'Dual-Action Multi-Strain Beneficial Bacteria',
    strains: 'B. subtilis, B. licheniformis, L. sporogenes, B. megaterium',
    cfu: 'Minimum 15 Billion CFU/ml (1.5 x 10^10 CFU/ml High Concentration)',
    dosage: 'Water: 500 mL - 1.0 L/Acre weekly | Feed: 5 - 10 mL/kg feed',
    certs: 'CAA Approved | ISO 9001:2015 | 100% Antibiotic-Free',
    shelfLife: '24 months at 15C-25C in cool shaded conditions'
  }
];

function buildPdf(p) {
  const lines = [
    `BT`,
    `/F1 16 Tf`,
    `50 740 Td`,
    `(${escapePdf(p.title)}) Tj`,
    `/F1 11 Tf`,
    `0 -24 Td`,
    `(NEXT FARM BIO SCIENCES - VIJAYAWADA, ANDHRA PRADESH) Tj`,
    `0 -20 Td`,
    `(${escapePdf('Category: ' + p.category)}) Tj`,
    `0 -20 Td`,
    `(${escapePdf('Strains / Actives: ' + p.strains)}) Tj`,
    `0 -20 Td`,
    `(${escapePdf('Guaranteed CFU: ' + p.cfu)}) Tj`,
    `0 -20 Td`,
    `(${escapePdf('Dosage Protocol: ' + p.dosage)}) Tj`,
    `0 -20 Td`,
    `(${escapePdf('Certifications: ' + p.certs)}) Tj`,
    `0 -20 Td`,
    `(${escapePdf('Shelf Life & Storage: ' + p.shelfLife)}) Tj`,
    `0 -30 Td`,
    `(/F1 10 Tf (Manufacturer: Next Farm Bio Sciences, New Autonagar, Vijayawada 520010)) Tj`,
    `0 -16 Td`,
    `((Helpline: +91 8977656444 | Email: support@nextfarm.in | Web: https://nextfarm.in)) Tj`,
    `ET`
  ];
  const streamContent = lines.join('\n');
  const streamLength = Buffer.byteLength(streamContent, 'utf-8');

  let pdf = `%PDF-1.4\n`;
  const offsets = [];

  function addObj(content) {
    offsets.push(Buffer.byteLength(pdf, 'utf-8'));
    pdf += content + '\n';
  }

  addObj(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`);
  addObj(`2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj`);
  addObj(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj`);
  addObj(`4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj`);
  addObj(`5 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj`);

  const startXref = Buffer.byteLength(pdf, 'utf-8');
  pdf += `xref\n0 6\n0000000000 65535 f \n`;
  for (const off of offsets) {
    pdf += off.toString().padStart(10, '0') + ` 00000 n \n`;
  }
  pdf += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;

  return Buffer.from(pdf, 'utf-8');
}

function escapePdf(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

const docsDir = path.resolve('public/docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

for (const prod of products) {
  const filePath = path.join(docsDir, prod.code);
  fs.writeFileSync(filePath, buildPdf(prod));
  console.log(`Generated: ${prod.code}`);
}
console.log('All 11 TDS PDF sheets successfully generated.');
