const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");

const router = express.Router();

// Allowlist of permitted hostnames for PDF generation (prevents SSRF).
// NOTE: By default, localhost and other internal hosts are NOT allowed.
const ALLOWED_PDF_HOSTNAMES = process.env.PDF_ALLOWED_HOSTNAMES
  ? process.env.PDF_ALLOWED_HOSTNAMES.split(",").map((h) => h.trim().toLowerCase())
  : ["devkantkumar.com", "www.devkantkumar.com"];

router.get("/", async (req, res) => {
  const { url } = req.query;
  // Sanitize the filename: strip path separators and limit characters
  const rawFilename = typeof req.query.filename === "string" ? req.query.filename : "git-guide.pdf";
  const filename = path.basename(rawFilename).replace(/[^a-zA-Z0-9._\-]/g, "_") || "git-guide.pdf";

  if (!url) {
    return res
      .status(400)
      .json({ message: "Missing required query param: url" });
  }

  // Strict URL validation using an allowlist to prevent SSRF
  let safeUrl;
  try {
    const parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return res.status(400).json({ message: "Invalid URL scheme" });
    }
    const hostname = parsedUrl.hostname.toLowerCase();

    // Reject obvious localhost/loopback hosts even if misconfigured in the allowlist
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      hostname.startsWith("127.")
    ) {
      return res
        .status(400)
        .json({ message: "URL hostname is not permitted" });
    }

    // Only allow requests to explicitly permitted hostnames
    if (!ALLOWED_PDF_HOSTNAMES.includes(hostname)) {
      return res
        .status(400)
        .json({ message: "URL hostname is not permitted" });
    }

    // Use the reconstructed URL from the parsed object, not raw user input
    safeUrl = parsedUrl.href;
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

    // Avoid waiting forever on dev-server websockets; wait for content instead
    await page.goto(safeUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

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
