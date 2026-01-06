import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// We use dynamic imports to handle the different environments
// This prevents crashes if dependencies are missing locally or on Vercel

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../../dist");

// Routes to prerender
const routes = [
  "/",
  "/about",
  "/projects",
  "/skills",
  "/blog",
  "/contact",
  "/content",
  // Blog posts
  "/blog/yt-dlp-ultimate-guide-2026",
  "/blog/anti-gravity-editor",
  "/blog/git-survival-guide",
  "/blog/react-server-components-2025",
  "/blog/agentic-ai-2025-guide",
  "/blog/dotnet-assembly-guide",
  "/blog/ollama-guide",
  "/blog/ultimate-ai-tools-directory-2025",
  "/blog/react-native-cli-vs-expo-2025",
  "/blog/react-native-vs-flutter-2026",
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

  // 1. Start a local server to serve the dist folder
  console.log("🚀 Starting preview server...");
  const server = spawn("npm", ["run", "preview", "--", "--port", "4173"], {
    stdio: "inherit",
    shell: true,
  });

  // Give the server some time to start
  await new Promise((resolve) => setTimeout(resolve, 3000));

  let browser;

  try {
    browser = await getBrowser();

    for (const route of routes) {
      const page = await browser.newPage();

      // Set viewport to desktop to ensure all content is visible/rendered
      await page.setViewport({ width: 1280, height: 800 });

      const url = `http://localhost:4173${route}`;
      console.log(`Rendering: ${route}`);

      // Go to the page and wait for network idle (all requests finished)
      // We use a slightly more relaxed timeout for Vercel
      await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

      // Wait a bit more for any client-side hydration/animations
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
      console.log(`✅ Saved: ${filePath}`);

      await page.close();
    }
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
