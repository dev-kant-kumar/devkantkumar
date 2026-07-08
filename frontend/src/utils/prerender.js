import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// We use dynamic imports to handle the different environments
// This prevents crashes if dependencies are missing locally or on Vercel

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../../dist");

import { blogData } from "../apps/Portfolio/pages/Blog/data/blogData.js";
import { aiToolSlugs } from "../apps/Portfolio/pages/AITools/utils.js";

// Routes to prerender
const baseRoutes = [
  "/",
  "/about",
  "/projects",
  "/skills",
  "/blog",
  "/contact",
  "/tools",
  "/ai-tools",
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
  "jwt-decoder",
  "hash-generator",
  "timestamp-converter",
  "url-encoder-decoder",
];

async function getBrowser() {
  // Check if we are running on Vercel
  const isVercel = process.env.VERCEL === "1";

  if (isVercel) {
    console.log("🚀 Detected Vercel environment. Using @sparticuz/chromium...");
    try {
      const chromium = await import("@sparticuz/chromium");
      const puppeteerCore = await import("puppeteer-core");

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
  let server;

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

  const apiBase = process.env.VITE_API_BASE_URL || 'http://localhost:5000';

  try {
    const response = await fetch(`${apiBase}/api/v1/marketplace/products?limit=100`);
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
    const response = await fetch(`${apiBase}/api/v1/marketplace/services?limit=100`);
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
    ...aiToolSlugs.map((slug) => `/ai-tools/${slug}`),
    ...products.map((p) => `/marketplace/products/${p.slug}`),
    ...services.map((s) => `/marketplace/services/${s.slug}`)
  ];

  // 1. Start an in-process static HTTP server to serve the dist folder
  console.log("🚀 Starting in-process preview server...");
  server = http.createServer((req, res) => {
    // Parse url using URL constructor to strip query string and hash
    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const cleanPath = parsedUrl.pathname;
    let filePath = path.join(distPath, decodeURIComponent(cleanPath));
    
    // If folder, try serving index.html inside it
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    // Fallback to SPA routing index.html
    if (!fs.existsSync(filePath)) {
      filePath = path.join(distPath, "index.html");
    }

    // Content-type mapping
    const ext = path.extname(filePath);
    const contentTypes = {
      ".html": "text/html",
      ".js": "application/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".ico": "image/x-icon",
    };
    const contentType = contentTypes[ext] || "application/octet-stream";

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(`Error loading file: ${err.code}`);
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  });

  // Start listening with active and fallback ports
  let activePort = 4173;
  await new Promise((resolve) => {
    server.listen(activePort, () => {
      console.log(`📡 In-process preview server running on port ${activePort}`);
      resolve();
    });
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        activePort = 4174;
        server.listen(activePort, () => {
          console.log(`📡 In-process preview server running on port ${activePort} (fallback)`);
          resolve();
        });
      } else {
        console.error("❌ Inline server error:", err.message);
        resolve();
      }
    });
  });

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

      // Go to the page and wait for network idle (allow up to 2 in-flight requests for sockets)
      await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

      // Wait a bit more for any client-side hydration/animations
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get the HTML
      const html = await page.content();

      // Determine where to save the file.
      // Write FLAT files (e.g. /blog/x -> dist/blog/x.html), NOT /blog/x/index.html.
      // On Cloudflare Pages a flat file makes the no-trailing-slash URL the one served
      // with 200, and the /blog/x/ variant 308-redirects to it. That matches our sitemap
      // and <link rel="canonical">, which both use the no-slash form — eliminating the
      // "Page with redirect" / "Duplicate without canonical" coverage errors that the old
      // directory layout caused (it forced the opposite: /blog/x -> 308 -> /blog/x/).
      const routePath =
        route === "/"
          ? "/index.html"
          : route.endsWith(".html")
          ? route
          : `${route}.html`;
      const filePath = path.join(distPath, routePath);

      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write the file
      fs.writeFileSync(filePath, html);
    }
    await page.close();

    // Copy index.html to 200.html for Cloudflare Pages SPA fallback support
    const indexHtmlPath = path.join(distPath, "index.html");
    const fallbackHtmlPath = path.join(distPath, "200.html");
    if (fs.existsSync(indexHtmlPath)) {
      fs.copyFileSync(indexHtmlPath, fallbackHtmlPath);
      console.log("✅ Copied index.html to 200.html for Cloudflare Pages SPA fallback.");
    }
  } catch (error) {
    console.error("❌ Prerendering failed:", error);
    // Soft fail in CI to prevent blocking deployments, hard fail locally for debugging
    const isCI = process.env.CI || process.env.CF_PAGES === "1";
    if (isCI) {
      console.log("⚠️ Soft failing prerendering step in CI to allow deployment to proceed.");
      if (server) server.close();
      process.exit(0);
    } else {
      if (server) server.close();
      process.exit(1);
    }
  } finally {
    if (browser) {
      await browser.close();
    }
    if (server) {
      console.log("🛑 Stopping preview server...");
      server.close();
    }
    // Force exit in case sockets hang
    process.exit(0);
  }
}

prerender();
