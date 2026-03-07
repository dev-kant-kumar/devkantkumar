/**
 * Marketplace Sitemap Generator
 *
 * Run this script to regenerate sitemap-marketplace.xml with real product/service IDs.
 * Usage: node generateMarketplaceSitemap.js
 *
 * This hits the public API to fetch all published products and services,
 * then outputs XML entries for each and writes to frontend/public/sitemap-marketplace.xml.
 *
 * Requirements: Node.js 18+ (native fetch) or install node-fetch.
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://www.devkantkumar.com';
const API_BASE = process.env.VITE_API_BASE_URL || 'http://localhost:5000';
const TODAY = new Date().toISOString().split('T')[0];

async function fetchAllProducts() {
  try {
    const res = await fetch(`${API_BASE}/api/marketplace/products?limit=1000&status=published`);
    const data = await res.json();
    return data.products || [];
  } catch (err) {
    console.warn('Could not fetch products:', err.message);
    return [];
  }
}

async function fetchAllServices() {
  try {
    const res = await fetch(`${API_BASE}/api/marketplace/services?limit=1000&status=published`);
    const data = await res.json();
    return data.services || [];
  } catch (err) {
    console.warn('Could not fetch services:', err.message);
    return [];
  }
}

function buildUrlEntry({ loc, lastmod = TODAY, changefreq = 'weekly', priority = '0.8', imageUrl, imageTitle, imageCaption }) {
  const imageBlock = imageUrl
    ? `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      ${imageTitle ? `<image:title>${escapeXml(imageTitle)}</image:title>` : ''}
      ${imageCaption ? `<image:caption>${escapeXml(imageCaption)}</image:caption>` : ''}
    </image:image>`
    : '';

  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageBlock}
  </url>`;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function generateSitemap() {
  console.log('Fetching products and services from API...');
  const [products, services] = await Promise.all([fetchAllProducts(), fetchAllServices()]);

  console.log(`Found ${products.length} products and ${services.length} services.`);

  const staticPages = [
    buildUrlEntry({ loc: `${BASE_URL}/marketplace`, changefreq: 'daily', priority: '1.0' }),
    buildUrlEntry({ loc: `${BASE_URL}/marketplace/products`, changefreq: 'daily', priority: '0.9' }),
    buildUrlEntry({ loc: `${BASE_URL}/marketplace/services`, changefreq: 'daily', priority: '0.9' }),
    buildUrlEntry({ loc: `${BASE_URL}/marketplace/custom-solutions`, changefreq: 'weekly', priority: '0.8' }),
    buildUrlEntry({ loc: `${BASE_URL}/marketplace/support`, changefreq: 'monthly', priority: '0.7' }),
    buildUrlEntry({ loc: `${BASE_URL}/marketplace/contact`, changefreq: 'monthly', priority: '0.7' }),
    buildUrlEntry({ loc: `${BASE_URL}/marketplace/faq`, changefreq: 'monthly', priority: '0.6' }),
    buildUrlEntry({ loc: `${BASE_URL}/marketplace/terms`, changefreq: 'monthly', priority: '0.5' }),
    buildUrlEntry({ loc: `${BASE_URL}/marketplace/privacy`, changefreq: 'monthly', priority: '0.5' }),
    buildUrlEntry({ loc: `${BASE_URL}/marketplace/refunds`, changefreq: 'monthly', priority: '0.5' }),
    buildUrlEntry({ loc: `${BASE_URL}/marketplace/license`, changefreq: 'monthly', priority: '0.5' }),
  ];

  const productEntries = products.map(product =>
    buildUrlEntry({
      loc: `${BASE_URL}/marketplace/products/${product._id}`,
      lastmod: product.updatedAt ? product.updatedAt.split('T')[0] : TODAY,
      changefreq: 'weekly',
      priority: '0.8',
      imageUrl: product.images?.[0]?.url,
      imageTitle: product.title,
      imageCaption: product.description?.slice(0, 200)
    })
  );

  const serviceEntries = services.map(service =>
    buildUrlEntry({
      loc: `${BASE_URL}/marketplace/services/${service._id}`,
      lastmod: service.updatedAt ? service.updatedAt.split('T')[0] : TODAY,
      changefreq: 'weekly',
      priority: '0.8',
      imageUrl: service.images?.[0]?.url,
      imageTitle: service.title,
      imageCaption: service.description?.slice(0, 200)
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- ============================================ -->
  <!-- MARKETPLACE MAIN PAGES -->
  <!-- ============================================ -->
${staticPages.slice(0, 4).join('\n')}

  <!-- ============================================ -->
  <!-- SUPPORT & INFO PAGES -->
  <!-- ============================================ -->
${staticPages.slice(4, 7).join('\n')}

  <!-- ============================================ -->
  <!-- LEGAL PAGES -->
  <!-- ============================================ -->
${staticPages.slice(7).join('\n')}

  <!-- ============================================ -->
  <!-- PRODUCT PAGES (${products.length} products) -->
  <!-- Auto-generated by generateMarketplaceSitemap.js on ${TODAY} -->
  <!-- ============================================ -->
${productEntries.join('\n')}

  <!-- ============================================ -->
  <!-- SERVICE PAGES (${services.length} services) -->
  <!-- Auto-generated by generateMarketplaceSitemap.js on ${TODAY} -->
  <!-- ============================================ -->
${serviceEntries.join('\n')}

</urlset>`;

  const outputPath = join(__dirname, '../../public/sitemap-marketplace.xml');
  writeFileSync(outputPath, xml, 'utf-8');
  console.log(`Sitemap written to: ${outputPath}`);
  console.log(`Total URLs: ${staticPages.length + productEntries.length + serviceEntries.length}`);
}

generateSitemap().catch(err => {
  console.error('Failed to generate sitemap:', err);
  process.exit(1);
});
