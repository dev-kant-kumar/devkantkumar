// =====================================================
// llms.txt generator
// Produces /llms.txt (https://llmstxt.org/) so AI crawlers and
// agents get a concise, curated map of the site's best content.
// Reuses the SAME data sources as the sitemap/prerenderer so the
// three layers never drift. Written to BOTH public/ (source) and
// dist/ (deployed output) — see generateSitemap.js for the why.
// =====================================================
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { blogData } from '../apps/Portfolio/pages/Blog/data/blogData.js';
import { portfolioData } from '../apps/Portfolio/store/data/portfolioData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Acronyms that should stay uppercase when prettifying a slug.
const ACRONYMS = new Set(['json', 'jwt', 'uuid', 'css', 'url', 'qr', 'og', 'api', 'ai']);

const prettify = (slug = '') =>
    slug
        .split('-')
        .map((w) => (ACRONYMS.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
        .join(' ');

// Free developer tools (single source of truth mirrors generateSitemap.js).
const devToolSlugs = [
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
    'url-encoder-decoder',
];

// Key navigational pages worth surfacing to an agent.
const keyPages = [
    ['/about', 'About Dev Kant Kumar — background, experience, and stack'],
    ['/projects', 'Portfolio projects with descriptions and links'],
    ['/skills', 'Technical skills and expertise'],
    ['/ai-tools', 'Curated directory of 100+ AI tools with filtering'],
    ['/tools', 'Free browser-based developer utilities'],
    ['/blog', 'All articles on web development, React, and AI engineering'],
    ['/contact', 'Contact and hiring information'],
];

const generateLlmsTxt = () => {
    console.log('Generating llms.txt...');
    const { seoConfig } = portfolioData;
    const siteUrl = (seoConfig?.site?.url || 'https://www.devkantkumar.com').replace(/\/$/, '');

    const lines = [];
    lines.push('# Dev Kant Kumar');
    lines.push('');
    lines.push(
        '> Full-stack (MERN) developer. This site hosts an in-depth technical blog, a curated directory of 100+ AI tools, free browser-based developer utilities, and a digital-products marketplace. The blog covers React, React Native, JavaScript internals, system design, and AI/agent engineering (MCP, agentic AI).'
    );
    lines.push('');
    lines.push(
        'All pages are pre-rendered to static HTML. Content is original and written by Dev Kant Kumar.'
    );
    lines.push('');

    // Blog — the highest-value content for an LLM, so give each post its excerpt.
    lines.push('## Blog posts');
    lines.push('');
    for (const post of blogData) {
        const excerpt = (post.excerpt || '').trim();
        lines.push(`- [${post.title}](${siteUrl}/blog/${post.slug})${excerpt ? `: ${excerpt}` : ''}`);
    }
    lines.push('');

    // Key pages.
    lines.push('## Key pages');
    lines.push('');
    for (const [url, desc] of keyPages) {
        lines.push(`- [${prettify(url.replace(/^\//, '')) || 'Home'}](${siteUrl}${url}): ${desc}`);
    }
    lines.push('');

    // Developer tools.
    lines.push('## Developer tools');
    lines.push('');
    for (const slug of devToolSlugs) {
        lines.push(`- [${prettify(slug)}](${siteUrl}/tools/${slug})`);
    }
    lines.push('');

    // Optional section — lower-priority resources (llms.txt convention).
    lines.push('## Optional');
    lines.push('');
    lines.push(`- [RSS feed](${siteUrl}/rss.xml): Blog feed`);
    lines.push(`- [Sitemap](${siteUrl}/sitemap.xml): Full URL index`);
    lines.push(`- [Marketplace](${siteUrl}/marketplace): Digital products and services`);
    lines.push('');

    const content = lines.join('\n');

    // Write to BOTH public/ (source, committed) and dist/ (deployed output),
    // because `vite build` copies public/ -> dist/ BEFORE this script runs.
    const publicPath = path.resolve(__dirname, '../../public');
    const distPath = path.resolve(__dirname, '../../dist');
    const targets = [publicPath, ...(fs.existsSync(distPath) ? [distPath] : [])];
    for (const dir of targets) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(path.join(dir, 'llms.txt'), content, 'utf8');
    }
    console.log(
        `✅ llms.txt generated (${blogData.length} posts, ${devToolSlugs.length} tools) written to ${targets.length} location(s).`
    );
};

// Run when executed directly (cross-platform: pathToFileURL handles Windows drive paths).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    generateLlmsTxt();
}

export default generateLlmsTxt;
