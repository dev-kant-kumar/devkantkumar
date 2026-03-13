/**
 * productMetaMiddleware.js
 *
 * Server-side meta tag injection for product and service pages.
 *
 * Problem: The frontend is a React SPA (client-side rendered). When ad-platform
 * crawlers (Facebook/Meta Ads, Google Merchant Center, LinkedIn, etc.) visit a
 * product URL they receive a bare HTML shell with no product data, causing the
 * error "A product could not be extracted from this URL."
 *
 * Solution: Intercept requests for /marketplace/products/:id and
 * /marketplace/services/:id coming from known bot user-agents, fetch the real
 * product/service data from MongoDB, and return the index.html with all
 * necessary Open Graph + product-specific meta tags already injected into
 * <head> before the browser (or crawler) parses the page.
 *
 * Regular browsers are unaffected — they still receive the normal React app.
 */

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("../utils/logger");

// ---------------------------------------------------------------------------
// Bot / crawler detection
// ---------------------------------------------------------------------------

const BOT_USER_AGENTS = [
  // Meta / Facebook
  "facebookexternalhit",
  "facebookbot",
  "facebookcatalog",
  "facebookcrawler",
  "meta-externalagent",
  "meta-externalfetcher",
  // Google
  "googlebot",
  "google-inspectiontool",
  "googleother",
  "google-extended",
  "adsbot-google",
  "mediapartners-google",
  "google-shopping",
  "googleimageproxy",
  // Twitter / X
  "twitterbot",
  // LinkedIn
  "linkedinbot",
  // Pinterest
  "pinterest",
  // Slack
  "slackbot",
  // Telegram
  "telegrambot",
  // WhatsApp
  "whatsapp",
  // Discord
  "discordbot",
  // Generic crawlers / auditors
  "bingbot",
  "yandexbot",
  "duckduckbot",
  "ia_archiver",
  "semrushbot",
  "ahrefsbot",
  "rogerbot",
  "mj12bot",
  "screaming frog",
  "seobilitybot",
  // Generic preview fetchers
  "preview",
  "iframely",
  "embedly",
  "outbrain",
  "quora",
  "xhtml2pdf",
  "curl/",
  "wget/",
  "python-requests",
  "go-http-client",
  "okhttp",
  "axios/",
];

/**
 * Returns true when the User-Agent string belongs to a known crawler / preview
 * fetcher that cannot execute JavaScript.
 */
function isBot(userAgent = "") {
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot));
}

// ---------------------------------------------------------------------------
// HTML index template cache
// ---------------------------------------------------------------------------

let indexHtmlCache = null;

function getIndexHtml(publicDir) {
  if (indexHtmlCache) return indexHtmlCache;
  const indexPath = path.join(publicDir, "index.html");
  if (!fs.existsSync(indexPath)) return null;
  indexHtmlCache = fs.readFileSync(indexPath, "utf8");
  return indexHtmlCache;
}

// ---------------------------------------------------------------------------
// Meta tag builders
// ---------------------------------------------------------------------------

const BASE_URL = "https://www.devkantkumar.com";

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildProductMetaTags(product) {
  const url = `${BASE_URL}/marketplace/products/${product.slug || product._id}`;
  const title = escapeHtml(product.seo?.metaTitle || product.title);
  const description = escapeHtml(
    product.seo?.metaDescription ||
      (product.description || "").slice(0, 300),
  );
  const image =
    product.images?.[0]?.url ||
    `${BASE_URL}/images/marketplace-og.jpg`;
  const price = product.price;
  const currency = "INR";
  const availability = product.isActive
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";
  const availabilityLabel = product.isActive ? "in stock" : "out of stock";
  const brand = "Dev Kant Kumar Marketplace";
  const itemId = String(product._id);
  const keywords = escapeHtml(
    (product.seo?.keywords || product.tags || []).join(", "),
  );

  // All images for og:image tags
  const allImages =
    product.images?.map((img) => img.url).filter(Boolean) || [];
  if (allImages.length === 0) allImages.push(`${BASE_URL}/images/marketplace-og.jpg`);

  const ogImageTags = allImages
    .map((imgUrl) => `  <meta property="og:image" content="${escapeHtml(imgUrl)}" />`)
    .join("\n");

  return `
  <!-- Primary SEO -->
  <title>${title} | Dev Kant Kumar Marketplace</title>
  <meta name="description" content="${description}" />
  ${keywords ? `<meta name="keywords" content="${keywords}" />` : ""}
  <link rel="canonical" href="${escapeHtml(url)}" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="product" />
  <meta property="og:url" content="${escapeHtml(url)}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:site_name" content="Dev Kant Kumar Marketplace" />
  <meta property="og:locale" content="en_US" />
${ogImageTags}

  <!-- Facebook / Meta Ads product-specific tags -->
  <meta property="product:price:amount" content="${price}" />
  <meta property="product:price:currency" content="${currency}" />
  <meta property="product:availability" content="${availabilityLabel}" />
  <meta property="product:condition" content="new" />
  <meta property="product:retailer_item_id" content="${escapeHtml(itemId)}" />
  <meta property="product:brand" content="${escapeHtml(brand)}" />
  <meta property="product:category" content="${escapeHtml(product.category || "")}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${escapeHtml(allImages[0])}" />
  <meta name="twitter:site" content="@dev_kant_kumar" />

  <!-- Schema.org Product (JSON-LD) -->
  <script type="application/ld+json">
  ${JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: product.description,
      image: allImages,
      url,
      sku: itemId,
      brand: { "@type": "Brand", name: brand },
      offers: {
        "@type": "Offer",
        url,
        priceCurrency: currency,
        price,
        availability,
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Person", name: "Dev Kant Kumar" },
      },
      category: product.category,
    },
    null,
    2,
  )}
  </script>`;
}

function buildServiceMetaTags(service) {
  const url = `${BASE_URL}/marketplace/services/${service.slug || service._id}`;
  const title = escapeHtml(service.seo?.metaTitle || service.title);
  const description = escapeHtml(
    service.seo?.metaDescription ||
      (service.description || "").slice(0, 300),
  );
  const image =
    service.images?.[0]?.url ||
    `${BASE_URL}/images/marketplace-og.jpg`;
  const currency = "INR";
  const packages = service.packages || [];
  const prices = packages
    .map((p) => p.price)
    .filter((p) => typeof p === "number" && p >= 0);
  const lowPrice =
    prices.length > 0 ? Math.min(...prices) : service.startingPrice || 0;
  const availability = service.isActive
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";
  const availabilityLabel = service.isActive ? "in stock" : "out of stock";
  const brand = "Dev Kant Kumar Marketplace";
  const itemId = String(service._id);
  const keywords = escapeHtml(
    (service.seo?.keywords || service.tags || []).join(", "),
  );

  return `
  <!-- Primary SEO -->
  <title>${title} | Dev Kant Kumar Marketplace</title>
  <meta name="description" content="${description}" />
  ${keywords ? `<meta name="keywords" content="${keywords}" />` : ""}
  <link rel="canonical" href="${escapeHtml(url)}" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="product" />
  <meta property="og:url" content="${escapeHtml(url)}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${escapeHtml(image)}" />
  <meta property="og:site_name" content="Dev Kant Kumar Marketplace" />
  <meta property="og:locale" content="en_US" />

  <!-- Facebook / Meta Ads product-specific tags -->
  <meta property="product:price:amount" content="${lowPrice}" />
  <meta property="product:price:currency" content="${currency}" />
  <meta property="product:availability" content="${availabilityLabel}" />
  <meta property="product:condition" content="new" />
  <meta property="product:retailer_item_id" content="${escapeHtml(itemId)}" />
  <meta property="product:brand" content="${escapeHtml(brand)}" />
  <meta property="product:category" content="${escapeHtml(service.category || "")}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${escapeHtml(image)}" />
  <meta name="twitter:site" content="@dev_kant_kumar" />

  <!-- Schema.org Service (JSON-LD) -->
  <script type="application/ld+json">
  ${JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": ["Service", "Product"],
      name: service.title,
      description: service.description,
      image,
      url,
      brand: { "@type": "Brand", name: brand },
      offers:
        packages.length > 1
          ? {
              "@type": "AggregateOffer",
              url,
              priceCurrency: currency,
              lowPrice,
              highPrice: prices.length > 0 ? Math.max(...prices) : lowPrice,
              offerCount: packages.length,
            }
          : {
              "@type": "Offer",
              url,
              priceCurrency: currency,
              price: lowPrice,
              availability,
            },
      category: service.category,
    },
    null,
    2,
  )}
  </script>`;
}

// ---------------------------------------------------------------------------
// Middleware factory
// ---------------------------------------------------------------------------

/**
 * Creates the product/service meta injection middleware.
 *
 * @param {string} publicDir  Absolute path to the directory containing index.html
 */
function createProductMetaMiddleware(publicDir) {
  // URL patterns:  /marketplace/products/<id>  and  /marketplace/services/<id>
  const productPattern =
    /^\/marketplace\/products\/([^/?#]+)\/?$/i;
  const servicePattern =
    /^\/marketplace\/services\/([^/?#]+)\/?$/i;

  return async function productMetaMiddleware(req, res, next) {
    try {
      // Only GET requests matter here
      if (req.method !== "GET") return next();

      const ua = req.headers["user-agent"] || "";
      const botRequest = isBot(ua);

      // Let regular browser traffic pass straight through to the SPA
      if (!botRequest) return next();

      const pathname = req.path;

      let identifier = null;
      let type = null;

      const productMatch = pathname.match(productPattern);
      const serviceMatch = pathname.match(servicePattern);

      if (productMatch) {
        identifier = productMatch[1];
        type = "product";
      } else if (serviceMatch) {
        identifier = serviceMatch[1];
        type = "service";
      }

      if (!identifier || !type) return next();

      // Fetch from DB
      let item = null;
      try {
        if (type === "product") {
          const Product = mongoose.model("Product");
          if (
            mongoose.Types.ObjectId.isValid(identifier) &&
            /^[0-9a-fA-F]{24}$/.test(identifier)
          ) {
            item = await Product.findById(identifier).lean();
          }
          if (!item) {
            item = await Product.findOne({ slug: identifier }).lean();
          }
        } else {
          const Service = mongoose.model("Service");
          if (
            mongoose.Types.ObjectId.isValid(identifier) &&
            /^[0-9a-fA-F]{24}$/.test(identifier)
          ) {
            item = await Service.findById(identifier).lean();
          }
          if (!item) {
            item = await Service.findOne({ slug: identifier }).lean();
          }
        }
      } catch (dbErr) {
        // DB not available during build / dev — fall through to SPA
        logger.warn(
          `productMetaMiddleware: DB lookup failed for ${identifier}: ${dbErr.message}`,
        );
        return next();
      }

      if (!item) return next();

      // Read index.html (cached after first read)
      const indexHtml = getIndexHtml(publicDir);
      if (!indexHtml) return next();

      // Build and inject meta tags
      const metaTags =
        type === "product"
          ? buildProductMetaTags(item)
          : buildServiceMetaTags(item);

      // Replace the opening <head> tag to inject our meta block
      const injected = indexHtml.replace(
        /<head([^>]*)>/i,
        `<head$1>${metaTags}`,
      );

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=300"); // 5 min cache for bot responses
      res.send(injected);
    } catch (err) {
      logger.error("productMetaMiddleware unexpected error:", err);
      next(); // Graceful fallback — don't break the request
    }
  };
}

module.exports = { createProductMetaMiddleware, isBot };
