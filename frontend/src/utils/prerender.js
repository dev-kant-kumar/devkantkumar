import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// We use dynamic imports to handle the different environments
// This prevents crashes if dependencies are missing locally or on Vercel

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../../dist");

import { blogData } from "../apps/Portfolio/pages/Blog/data/blogData.js";

// Routes to prerender
const baseRoutes = [
  "/",
  "/about",
  "/projects",
  "/skills",
  "/blog",
  "/contact",
  "/tools",
  "/faq",
  "/sitemap",
  "/privacy",
  "/terms",
  "/content",
  // Marketplace catalog routes
  "/marketplace",
  "/marketplace/services",
  "/marketplace/products",
  "/marketplace/custom-solutions",
  "/marketplace/faq",
  "/marketplace/contact",
];

const toolSlugs = [
  "json-formatter",
  "base64-encoder-decoder",
  "password-generator",
  "lorem-ipsum-generator",
  "color-palette-generator",
  "qr-code-generator",
  "uuid-generator",
  "css-gradient-generator",
  "meta-tag-generator",
  "markdown-previewer",
  "og-preview",
];

async function getBrowser() {
  // Check if we are running on Vercel
  const isVercel = process.env.VERCEL === "1";

  if (isVercel) {
    console.log("🚀 Detected Vercel environment. Using @sparticuz/chromium...");
    try {
      const chromium = await import("@sparticuz/chromium");
      const puppeteerCore = await import("puppeteer-core");

      // Optional: Load local chrome if available (for testing Vercel build locally)
      // But usually we rely on the package

      // Configure sparticuz/chromium
      // Note: We might need to adjust graphics mode for screenshots, but for HTML scraping headless is fine

      return await puppeteerCore.default.launch({
        args: chromium.default.args,
        defaultViewport: chromium.default.defaultViewport,
        executablePath: await chromium.default.executablePath(),
        headless: chromium.default.headless,
      });
    } catch (e) {
      console.error("❌ Failed to launch Vercel browser:", e);
      throw e;
    }
  } else {
    console.log("💻 Detected local environment. Using full Puppeteer...");
    const puppeteer = await import("puppeteer");
    return await puppeteer.default.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
}

async function prerender() {
  console.log("📦 Starting prerendering process...");

  // Try to fetch products and services from local API
  let products = [];
  let services = [];

  const fallbackProducts = [
    { slug: 'budget-tracker-2026-canva-spreadsheet-template-monthly-budget-planner-expense-tracker' },
    { slug: 'social-media-content-calendar-2026-canva-template-for-instagram-facebook-twitter' },
    { slug: 'vinoba-bhave-university-assignment-cover-page-template-bca-editable-printable-a4' }
  ];

  const fallbackServices = [
    { slug: 'static-website-development' }
  ];

  try {
    const response = await fetch('http://localhost:5000/api/v1/marketplace/products?limit=100');
    if (response.ok) {
      const data = await response.json();
      products = data.products || [];
      console.log(`Fetched ${products.length} products from API for prerender.`);
    } else {
      throw new Error(`HTTP error ${response.status}`);
    }
  } catch (err) {
    console.log('⚠️ Could not fetch products from API, using prerender database fallbacks:', err.message);
    products = fallbackProducts;
  }

  try {
    const response = await fetch('http://localhost:5000/api/v1/marketplace/services?limit=100');
    if (response.ok) {
      const data = await response.json();
      services = data.services || [];
      console.log(`Fetched ${services.length} services from API for prerender.`);
    } else {
      throw new Error(`HTTP error ${response.status}`);
    }
  } catch (err) {
    console.log('⚠️ Could not fetch services from API, using prerender database fallbacks:', err.message);
    services = fallbackServices;
  }

  const routes = [
    ...baseRoutes,
    ...blogData.map((post) => `/blog/${post.slug}`),
    ...toolSlugs.map((slug) => `/tools/${slug}`),
    ...products.map((p) => `/marketplace/products/${p.slug}`),
    ...services.map((s) => `/marketplace/services/${s.slug}`)
  ];

  // 1. Start a local server to serve the dist folder
  console.log("🚀 Starting preview server...");
  const server = spawn("npm", ["run", "preview", "--", "--port", "4173"], {
    stdio: "inherit",
    shell: true,
  });

  // Give the server some time to start
  await new Promise((resolve) => setTimeout(resolve, 3000));

  let activePort = 4173;
  try {
    const res = await fetch("http://localhost:4173/");
    if (res.ok || res.status) activePort = 4173;
  } catch (err) {
    try {
      const res = await fetch("http://localhost:4174/");
      if (res.ok || res.status) activePort = 4174;
    } catch (err2) {
      console.log("⚠️ Preview ports offline, defaulting to 4173:", err2.message);
    }
  }
  console.log(`📡 Rendering using active preview port: ${activePort}`);

  let browser;

  try {
    browser = await getBrowser();
    const page = await browser.newPage();
    // Set viewport to desktop to ensure all content is visible/rendered
    await page.setViewport({ width: 1280, height: 800 });

    let index = 0;
    for (const route of routes) {
      index++;
      const url = `http://localhost:${activePort}${route}`;
      const percentage = ((index / routes.length) * 100).toFixed(0);
      console.log(`[${percentage}%] Rendering: ${route}`);

      // Go to the page and wait for network idle (all requests finished)
      // We use a slightly more relaxed timeout for Vercel
      await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

      // Wait a bit more for any client-side hydration/animations
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get the HTML
      const html = await page.content();

      // Determine where to save the file
      // e.g. /blog -> dist/blog/index.html
      const routePath = route === "/" ? "/index.html" : route;
      const filePath = path.join(
        distPath,
        routePath.endsWith(".html") ? routePath : `${routePath}/index.html`
      );

      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write the file
      fs.writeFileSync(filePath, html);
    }
    await page.close();
  } catch (error) {
    console.error("❌ Prerendering failed:", error);
    // On Vercel, we might want to fail the build if prerendering fails
    // But for now, let's log it and maybe allow the build to proceed (soft fail)
    // or hard fail. Hard fail is better for SEO guarantees.
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
    console.log("🛑 Stopping preview server...");
    server.kill();
    // Force exit in case server hangs
    process.exit(0);
  }
}

prerender();
