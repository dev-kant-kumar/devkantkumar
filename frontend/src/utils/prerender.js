import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";

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
  "/blog/yt-dlp-guide",
  "/blog/anti-gravity-editor",
  "/blog/git-survival-guide",
  "/blog/react-server-components-2025",
];

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

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const route of routes) {
      const page = await browser.newPage();

      // Set viewport to desktop to ensure all content is visible/rendered
      await page.setViewport({ width: 1280, height: 800 });

      const url = `http://localhost:4173${route}`;
      console.log(`Rendering: ${route}`);

      // Go to the page and wait for network idle (all requests finished)
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
    process.exit(1);
  } finally {
    await browser.close();
    console.log("🛑 Stopping preview server...");
    server.kill();
    // Force exit in case server hangs
    process.exit(0);
  }
}

prerender();
