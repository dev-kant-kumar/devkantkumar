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

    <!-- Initial SEO (will be enhanced by React Helmet) -->
    <title>${personalInfo.name} | ${personalInfo.title} Portfolio</title>
    <meta name="description" content="${personalInfo.name} – ${personalInfo.title}. ${professionalSummary.overview.slice(0, 150)}..." />
    <meta name="author" content="${personalInfo.name}" />

    <!-- Preload Fonts & Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
      rel="stylesheet"
    />

    <!-- Favicon -->
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />

    <!-- Performance & Crawl -->
    <meta http-equiv="x-dns-prefetch-control" content="on" />
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
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
