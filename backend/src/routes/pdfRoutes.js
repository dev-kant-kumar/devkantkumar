const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.get('/', async (req, res) => {
  const { url, filename = 'git-guide.pdf' } = req.query;

  if (!url) {
    return res.status(400).json({ message: 'Missing required query param: url' });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });

    console.log('Attempting to navigate to:', url);

    // Avoid waiting forever on dev-server websockets; wait for content instead
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    console.log('Page loaded, waiting for #git-guide selector...');
    await page.waitForSelector('#git-guide', { timeout: 20000 });
    await page.emulateMediaType('screen');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
    });

    if (!pdfBuffer || pdfBuffer.length < 1000) {
      throw new Error('Generated PDF is empty or too small');
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.status(200);
    res.end(pdfBuffer);
  } catch (err) {
    console.error('PDF generation error:', err);
    res.status(500).json({
      message: 'Failed to generate PDF',
      error: err?.message || String(err)
    });
  } finally {
    if (browser) {
      try { await browser.close(); } catch {}
    }
  }
});

module.exports = router;
