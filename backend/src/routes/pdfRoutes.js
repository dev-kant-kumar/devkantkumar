const express = require("express");
const puppeteer = require("puppeteer");

const router = express.Router();

router.get("/", async (req, res) => {
  const { url, filename = "git-guide.pdf" } = req.query;

  if (!url) {
    return res
      .status(400)
      .json({ message: "Missing required query param: url" });
  }

  // Basic URL validation to prevent SSRF
  try {
    const parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return res.status(400).json({ message: "Invalid URL scheme" });
    }
    const hostname = parsedUrl.hostname.toLowerCase();
    // Check for private / local IPs to mitigate SSRF
    if (
      ["localhost", "127.0.0.1", "0.0.0.0", "::1"].includes(hostname) ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
      hostname.endsWith(".internal") ||
      hostname.endsWith(".local") ||
      parsedUrl.protocol === "file:"
    ) {
      return res
        .status(400)
        .json({ message: "Local/private URLs are not permitted" });
    }

    // Instead of using the raw user input, capture the verified URL
    req.safeUrl = parsedUrl.href;
  } catch (e) {
    return res.status(400).json({ message: "Invalid URL format" });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });

    console.log("Attempting to navigate to:", req.safeUrl);

    // Avoid waiting forever on dev-server websockets; wait for content instead
    await page.goto(req.safeUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    console.log("Page loaded, waiting for #git-guide selector...");
    await page.waitForSelector("#git-guide", { timeout: 20000 });
    await page.emulateMediaType("screen");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
    });

    if (!pdfBuffer || pdfBuffer.length < 1000) {
      throw new Error("Generated PDF is empty or too small");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Length", pdfBuffer.length);
    res.status(200);
    res.end(pdfBuffer);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({
      message: "Failed to generate PDF",
      error: err?.message || String(err),
    });
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {}
    }
  }
});

module.exports = router;
