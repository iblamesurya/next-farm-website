import fs from 'fs';
import path from 'path';

const basePath = path.resolve(process.cwd(), '.vercel/output/static/products');
const products = ['next-min.html', 'next-pro.html'];

for (const prod of products) {
  const filePath = path.join(basePath, prod);
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const hasValidFrom = html.includes('validFrom');
    const hasCertId = html.includes('certificationIdentification');
    const hasCertRating = html.includes('certificationRating');
    console.log(`[${prod}] hasValidFrom: ${hasValidFrom}, hasCertId: ${hasCertId}, hasCertRating: ${hasCertRating}`);
  } else {
    console.log(`[${prod}] NOT FOUND at ${filePath}`);
  }
}
