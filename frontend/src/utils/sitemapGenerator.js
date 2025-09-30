import { portfolioData } from '../apps/Portfolio/store/data/portfolioData';

export const generateSitemap = () => {
  const baseUrl = 'https://devkantkumar.com';
  const currentDate = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.9', changefreq: 'monthly' },
    { url: '/projects', priority: '0.9', changefreq: 'weekly' },
    { url: '/skills', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/marketplace', priority: '0.6', changefreq: 'monthly' },
  ];

  // Dynamic project pages
  const projectPages = portfolioData.projects.map(project => ({
    url: `/projects/${project.id}`,
    priority: '0.7',
    changefreq: 'monthly'
  }));

  const allPages = [...staticPages, ...projectPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemapXml;
};

export const downloadSitemap = () => {
  const sitemapContent = generateSitemap();
  const blob = new Blob([sitemapContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Function to generate sitemap for production build
export const generateSitemapForBuild = () => {
  return generateSitemap();
};
