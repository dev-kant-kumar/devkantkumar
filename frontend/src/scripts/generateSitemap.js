import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blogData } from '../apps/Portfolio/pages/Blog/data/blogData.js';
import { portfolioData } from '../apps/Portfolio/store/data/portfolioData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateSitemap = () => {
    console.log('Generating sitemap...');
    const { seoConfig } = portfolioData;
    const siteUrl = seoConfig?.site?.url || 'https://devkantkumar.com';
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
        '/tools'
    ];

    const sitemapItems = [
        ...staticPages.map(page => ({
            url: `${siteUrl}${page}`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: page === '' ? '1.0' : '0.8'
        })),
        ...blogData.map(post => ({
            url: `${blogUrl}/${post.slug}`,
            lastModified: post.modifiedDate || post.publishDate || currentDate,
            changeFrequency: 'weekly',
            priority: '0.9'
        }))
    ];

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
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

if (import.meta.url === `file://${process.argv[1]}`) {
    generateSitemap();
}
