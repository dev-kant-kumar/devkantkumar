import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import dotenv from 'dotenv';
import { blogData } from '../apps/Portfolio/pages/Blog/data/blogData.js';
import { portfolioData } from '../apps/Portfolio/store/data/portfolioData.js';
import { aiToolSlugs } from '../apps/Portfolio/pages/AITools/utils.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateSitemap = async () => {
    console.log('Generating sitemap...');
    const { seoConfig } = portfolioData;
    const siteUrl = seoConfig?.site?.url || 'https://www.devkantkumar.com';
    const blogUrl = `${siteUrl}/blog`;

    const currentDate = new Date().toISOString().split('T')[0];

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/projects',
        '/skills',
        '/contact',
        '/blog',
        '/tools',
        '/faq',
        '/sitemap',
        '/privacy',
        '/terms',
        '/content',
        // Marketplace static pages
        '/marketplace',
        '/marketplace/services',
        '/marketplace/products',
        '/marketplace/products/templates',
        '/marketplace/products/components',
        '/marketplace/products/tools',
        '/marketplace/products/courses',
        '/marketplace/custom-solutions',
        '/marketplace/support',
        '/marketplace/faq',
        '/marketplace/terms',
        '/marketplace/privacy',
        '/marketplace/refunds',
        '/marketplace/license',
        '/marketplace/contact'
    ];

    const toolSlugs = [
        'json-formatter',
        'base64-encoder-decoder',
        'password-generator',
        'lorem-ipsum-generator',
        'color-palette-generator',
        'qr-code-generator',
        'uuid-generator',
        'css-gradient-generator',
        'meta-tag-generator',
        'markdown-previewer',
        'og-preview',
        'jwt-decoder',
        'hash-generator',
        'timestamp-converter',
        'url-encoder-decoder'
    ];

    // Try to fetch products and services from local API
    let products = [];
    let services = [];

    // Fallbacks from database seed
    const fallbackProducts = [
        { slug: 'budget-tracker-2026-canva-spreadsheet-template-monthly-budget-planner-expense-tracker', updatedAt: currentDate },
        { slug: 'social-media-content-calendar-2026-canva-template-for-instagram-facebook-twitter', updatedAt: currentDate },
        { slug: 'vinoba-bhave-university-assignment-cover-page-template-bca-editable-printable-a4', updatedAt: currentDate }
    ];

    const fallbackServices = [
        { slug: 'static-website-development', updatedAt: currentDate }
    ];

    const apiBase = process.env.VITE_API_BASE_URL || 'http://localhost:5000';

    try {
        const response = await fetch(`${apiBase}/api/v1/marketplace/products?limit=100`);
        if (response.ok) {
            const data = await response.json();
            products = data.products || [];
            console.log(`Fetched ${products.length} products from API for sitemap.`);
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }
    } catch (err) {
        console.log('⚠️ Could not fetch products from API, using sitemap database fallbacks:', err.message);
        products = fallbackProducts;
    }

    try {
        const response = await fetch(`${apiBase}/api/v1/marketplace/services?limit=100`);
        if (response.ok) {
            const data = await response.json();
            services = data.services || [];
            console.log(`Fetched ${services.length} services from API for sitemap.`);
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }
    } catch (err) {
        console.log('⚠️ Could not fetch services from API, using sitemap database fallbacks:', err.message);
        services = fallbackServices;
    }

    const sitemapItems = [
        ...staticPages.map(page => ({
            url: `${siteUrl}${page}`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: page === '' ? '1.0' : (page.startsWith('/marketplace') ? '0.8' : '0.8')
        })),
        ...blogData.map(post => ({
            url: `${blogUrl}/${post.slug}`,
            lastModified: post.modifiedDate || post.publishDate || currentDate,
            changeFrequency: 'weekly',
            priority: '0.9'
        })),
        ...toolSlugs.map(slug => ({
            url: `${siteUrl}/tools/${slug}`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: '0.7'
        })),
        // AI Tools directory hub + per-tool review pages (programmatic SEO)
        {
            url: `${siteUrl}/ai-tools`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: '0.8'
        },
        ...aiToolSlugs.map(slug => ({
            url: `${siteUrl}/ai-tools/${slug}`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: '0.6'
        })),
        ...products.map(product => ({
            url: `${siteUrl}/marketplace/products/${product.slug}`,
            lastModified: product.updatedAt ? product.updatedAt.split('T')[0] : currentDate,
            changeFrequency: 'weekly',
            priority: '0.9'
        })),
        ...services.map(service => ({
            url: `${siteUrl}/marketplace/services/${service.slug}`,
            lastModified: service.updatedAt ? service.updatedAt.split('T')[0] : currentDate,
            changeFrequency: 'weekly',
            priority: '0.9'
        }))
    ];

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapItems.map(item => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    const publicPath = path.resolve(__dirname, '../../public');
    if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath, { recursive: true });
    }

    fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemapXml);
    console.log(`✅ Sitemap generated successfully with ${sitemapItems.length} URLs!`);
};

// Run when executed directly (cross-platform: pathToFileURL handles Windows drive paths).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    generateSitemap();
}
