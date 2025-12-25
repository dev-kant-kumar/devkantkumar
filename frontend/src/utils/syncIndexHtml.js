import fs from 'fs';
import path from 'path';
import { portfolioData } from '../apps/Portfolio/store/data/portfolioData.js';

/**
 * Updates index.html with dynamic content from portfolioData
 * This ensures the initial HTML matches the portfolio data
 */
export const syncIndexHtml = () => {
  const { personalInfo, professionalSummary } = portfolioData;

  const indexHtmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Google AdSense -->
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9028817265614961"
      crossorigin="anonymous"
    ></script>

    <!-- Google Analytics (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-SC4Q0YTRSW"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-SC4Q0YTRSW');
    </script>

    <!-- Initial SEO (will be enhanced by React Helmet) -->
    <title>${personalInfo.name} | ${personalInfo.title} Portfolio</title>
    <meta name="description" content="${personalInfo.name} – ${personalInfo.title}. ${professionalSummary.overview.slice(0, 150)}..." />
    <meta name="author" content="${personalInfo.name}" />

    <!-- Preload Fonts & Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />

    <!-- Favicon -->
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="apple-touch-icon" href="/devkantkumar.jpg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

    <!-- Sitemap -->
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    <link rel="alternate" type="application/rss+xml" title="Dev Kant Kumar's Blog" href="https://devkantkumar.com/rss.xml" />

    <!-- Performance & Crawl -->
    <meta http-equiv="x-dns-prefetch-control" content="on" />
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
    <meta name="theme-color" content="#0f172a" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

  // Write to index.html
  const indexPath = path.resolve(process.cwd(), 'index.html');
  fs.writeFileSync(indexPath, indexHtmlTemplate, 'utf8');

  console.log('✅ index.html synced with portfolioData');
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  syncIndexHtml();
}
