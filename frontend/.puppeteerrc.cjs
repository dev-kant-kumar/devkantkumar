const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer to be inside the project
  // This ensures it is accessible during Vercel build
  cacheDirectory: join(__dirname, 'node_modules', '.puppeteer_cache'),
};
