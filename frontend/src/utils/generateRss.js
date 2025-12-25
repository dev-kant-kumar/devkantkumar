import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Simple polyfill for portfolioData if we can't import it directly due to JSX
// Ideally we should import it, but if it has JSX dependencies it will fail.
// PortfolioData usually is pure JS/JSON, so let's try importing it.
// If it fails, we'll need to hardcode the site metadata here.
import { portfolioData } from '../apps/Portfolio/store/data/portfolioData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateRss = () => {
  const { personalInfo, seoConfig } = portfolioData;
  const siteUrl = seoConfig.site.url;
  const blogUrl = `${siteUrl}/blog`;
  const postsDir = path.resolve(__dirname, '../apps/Portfolio/pages/Blog/Posts');

  // Read all JSX files in the posts directory
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.jsx'));

  const posts = files.map(file => {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');

    // Regex to extract the info object: export const info = { ... };
    // We match roughly from "export const info = {" to "};"
    // This is brittle but sufficient for a build script if formatting is consistent.
    const match = content.match(/export const info = ({[\s\S]*?});/);

    if (match && match[1]) {
      try {
        // We need to evaluate this string to get the object.
        // It might contain variables not defined here, but usually it's static literals.
        // We replace newlines to make it eval-friendly if needed,
        // but evaling trusted content (our own code) in build script is "okay".
        // A safer way: use Function constructor

        // However, the object might use unquoted keys or template strings.
        // Let's try to verify it's valid JS object literal syntax.

        // CAUTION: 'eval' is dangerous generally, but this is a build script running on source code.
        const meta = eval('(' + match[1] + ')');
        return meta;
      } catch (e) {
        console.warn(`⚠️ Failed to parse metadata from ${file}:`, e.message);
        return null;
      }
    }
    return null;
  }).filter(Boolean);

  const rssItems = posts
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .map((meta) => {
      const postUrl = `${blogUrl}/${meta.slug}`;
      return `
    <item>
      <title><![CDATA[${meta.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <description><![CDATA[${meta.excerpt}]]></description>
      <pubDate>${new Date(meta.publishDate).toUTCString()}</pubDate>
      <author>${personalInfo.contact.email} (${personalInfo.name})</author>
      ${meta.tags ? meta.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('') : ''}
    </item>`;
    }).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${personalInfo.name}'s Blog</title>
    <link>${blogUrl}</link>
    <description>${personalInfo.tagline}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <copyright>Copyright ${new Date().getFullYear()} ${personalInfo.name}</copyright>
    ${rssItems}
  </channel>
</rss>`;

  // Write to public folder
  const publicPath = path.resolve(__dirname, '../../public');
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }

  fs.writeFileSync(path.join(publicPath, 'rss.xml'), rssXml);
  console.log(`✅ RSS Feed generated successfully with ${posts.length} posts!`);
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateRss();
}

export { generateRss };
