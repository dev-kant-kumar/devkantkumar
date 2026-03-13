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
 *
 * Industry-grade features:
 *  - Redis caching (via cacheService) with configurable TTL
 *  - ETag + Vary: User-Agent for proper HTTP cache semantics at CDN / proxy
 *  - Cache invalidation helpers exported for use by admin controllers
 *  - Rich Schema.org JSON-LD (priceValidUntil, aggregateRating, hasOfferCatalog)
 *  - HTML/markdown description sanitisation (truncated to 155 chars)
 *  - og:image:secure_url + og:image:type for maximum crawler compatibility
 *  - og:updated_time for content-freshness signals
 */

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("../utils/logger");
const cache = require("../services/cacheService");

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
// Redis cache helpers
// ---------------------------------------------------------------------------

/** Redis key TTL for cached meta fragments (seconds). 10 minutes by default. */
const META_CACHE_TTL = 600;

/** Prefix used for all meta-fragment cache keys — easy to pattern-delete. */
const META_CACHE_PREFIX = "meta";

function metaCacheKey(type, identifier) {
  return `${META_CACHE_PREFIX}:${type}:${identifier}`;
}

/**
 * Invalidate all cached meta entries for a given product or service.
 * Call this from admin controllers after create / update / delete.
 *
 * @param {"product"|"service"} type
 * @param {string} id    - MongoDB ObjectId string
 * @param {string} [slug] - slug, when available
 */
async function invalidateMetaCache(type, id, slug) {
  try {
    if (id) await cache.del(metaCacheKey(type, id));
    if (slug) await cache.del(metaCacheKey(type, slug));
  } catch (err) {
    // Non-fatal — log and continue
    logger.warn(`productMetaMiddleware: cache invalidation failed: ${err.message}`);
  }
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

/**
 * Strip HTML tags and common Markdown syntax from a string, then truncate to
 * 155 characters (the standard SEO meta-description limit).  This prevents
 * raw HTML or markdown leaking into meta tags shown by ad-platforms.
 */
function sanitizeDescription(raw, maxLen = 155) {
  if (!raw) return "";
  return String(raw)
    // Remove HTML tags
    .replace(/<[^>]+>/g, " ")
    // Remove common Markdown: bold/italic/code markers
    .replace(/[*_`~>#]/g, "")
    // Remove Markdown links: [text](url) → text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    // Normalise whitespace
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

function buildProductMetaTags(product) {
  const url = `${BASE_URL}/marketplace/products/${product.slug || product._id}`;
  const title = escapeHtml(product.seo?.metaTitle || product.title);
  const rawDesc =
    product.seo?.metaDescription || product.description || "";
  const description = escapeHtml(sanitizeDescription(rawDesc));
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

  // All images for og:image tags (capped at 5 to keep <head> lean)
  const allImages =
    product.images?.map((img) => img.url).filter(Boolean).slice(0, 5) || [];
  if (allImages.length === 0) allImages.push(`${BASE_URL}/images/marketplace-og.jpg`);
  const primaryImage = allImages[0];

  const ogImageTags = allImages
    .map(
      (imgUrl) =>
        `  <meta property="og:image" content="${escapeHtml(imgUrl)}" />\n` +
        `  <meta property="og:image:secure_url" content="${escapeHtml(imgUrl)}" />\n` +
        `  <meta property="og:image:type" content="image/jpeg" />`,
    )
    .join("\n");

  const updatedAt = product.updatedAt
    ? new Date(product.updatedAt).toISOString()
    : new Date().toISOString();

  // Schema.org aggregateRating (if the product carries rating data)
  const aggregateRating =
    product.rating?.count > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating.average,
          reviewCount: product.rating.count,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined;

  // Price valid until: 1 year from last update — a sensible default for digital goods
  const priceValidUntil = new Date(
    Date.now() + 365 * 24 * 60 * 60 * 1000,
  )
    .toISOString()
    .split("T")[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: sanitizeDescription(rawDesc, 500),
    image: allImages,
    url,
    sku: itemId,
    brand: { "@type": "Brand", name: brand },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: currency,
      price,
      priceValidUntil,
      availability,
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Person", name: "Dev Kant Kumar" },
    },
    category: product.category,
  };
  if (aggregateRating) jsonLd.aggregateRating = aggregateRating;
  if (product.version) jsonLd.version = product.version;

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
  <meta property="og:updated_time" content="${escapeHtml(updatedAt)}" />
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
  <meta name="twitter:image" content="${escapeHtml(primaryImage)}" />
  <meta name="twitter:site" content="@dev_kant_kumar" />

  <!-- Schema.org Product (JSON-LD) -->
  <script type="application/ld+json">
  ${JSON.stringify(jsonLd, null, 2)}
  </script>`;
}

function buildServiceMetaTags(service) {
  const url = `${BASE_URL}/marketplace/services/${service.slug || service._id}`;
  const title = escapeHtml(service.seo?.metaTitle || service.title);
  const rawDesc =
    service.seo?.metaDescription || service.description || "";
  const description = escapeHtml(sanitizeDescription(rawDesc));
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
  const highPrice =
    prices.length > 0 ? Math.max(...prices) : lowPrice;
  const availability = service.isActive
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";
  const availabilityLabel = service.isActive ? "in stock" : "out of stock";
  const brand = "Dev Kant Kumar Marketplace";
  const itemId = String(service._id);
  const keywords = escapeHtml(
    (service.seo?.keywords || service.tags || []).join(", "),
  );

  const updatedAt = service.updatedAt
    ? new Date(service.updatedAt).toISOString()
    : new Date().toISOString();

  const priceValidUntil = new Date(
    Date.now() + 365 * 24 * 60 * 60 * 1000,
  )
    .toISOString()
    .split("T")[0];

  // Build individual Offer objects per package for hasOfferCatalog
  const offerCatalogItems = packages.map((pkg) => ({
    "@type": "Offer",
    name: pkg.title || pkg.name,
    description: pkg.description,
    price: pkg.price,
    priceCurrency: currency,
    priceValidUntil,
    availability,
    itemCondition: "https://schema.org/NewCondition",
  }));

  const aggregateRating =
    service.rating?.count > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: service.rating.average,
          reviewCount: service.rating.count,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Service", "Product"],
    name: service.title,
    description: sanitizeDescription(rawDesc, 500),
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
            highPrice,
            offerCount: packages.length,
            priceValidUntil,
          }
        : {
            "@type": "Offer",
            url,
            priceCurrency: currency,
            price: lowPrice,
            priceValidUntil,
            availability,
          },
    category: service.category,
  };
  if (offerCatalogItems.length > 0) {
    jsonLd.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: `${service.title} — Service Packages`,
      itemListElement: offerCatalogItems,
    };
  }
  if (aggregateRating) jsonLd.aggregateRating = aggregateRating;

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
  <meta property="og:image:secure_url" content="${escapeHtml(image)}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:site_name" content="Dev Kant Kumar Marketplace" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:updated_time" content="${escapeHtml(updatedAt)}" />

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
  ${JSON.stringify(jsonLd, null, 2)}
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

      // -----------------------------------------------------------------------
      // 1. Redis cache lookup (fast path for repeat bot visits)
      // -----------------------------------------------------------------------
      const cacheKey = metaCacheKey(type, identifier);
      let metaTags = null;

      try {
        metaTags = await cache.get(cacheKey);
      } catch (cacheErr) {
        logger.warn(`productMetaMiddleware: cache get failed: ${cacheErr.message}`);
      }

      // -----------------------------------------------------------------------
      // 2. DB lookup (cache miss or Redis unavailable)
      // -----------------------------------------------------------------------
      let item = null;
      if (!metaTags) {
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
          // DB not available — fall through to SPA
          logger.warn(
            `productMetaMiddleware: DB lookup failed for ${identifier}: ${dbErr.message}`,
          );
          return next();
        }

        if (!item) return next();

        // Build meta tags
        metaTags =
          type === "product"
            ? buildProductMetaTags(item)
            : buildServiceMetaTags(item);

        // Store in Redis for subsequent bot requests
        // Also cache under the canonical ID so slug-based and ID-based requests
        // can both populate the cache.
        try {
          const idKey = metaCacheKey(type, String(item._id));
          const slugKey = item.slug ? metaCacheKey(type, item.slug) : null;
          await cache.set(idKey, metaTags, META_CACHE_TTL);
          if (slugKey && slugKey !== idKey) {
            await cache.set(slugKey, metaTags, META_CACHE_TTL);
          }
        } catch (cacheSetErr) {
          logger.warn(`productMetaMiddleware: cache set failed: ${cacheSetErr.message}`);
        }
      }

      // -----------------------------------------------------------------------
      // 3. ETag + conditional GET support
      // -----------------------------------------------------------------------
      const etag = `"meta-${type}-${identifier}"`;
      if (req.headers["if-none-match"] === etag) {
        return res.status(304).end();
      }

      // -----------------------------------------------------------------------
      // 4. Read index.html and inject
      // -----------------------------------------------------------------------
      const indexHtml = getIndexHtml(publicDir);
      if (!indexHtml) return next();

      // Replace the opening <head> tag to inject our meta block
      const injected = indexHtml.replace(
        /<head([^>]*)>/i,
        `<head$1>${metaTags}`,
      );

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      // Vary: User-Agent tells CDNs/proxies that bot and browser responses differ
      res.setHeader("Vary", "User-Agent");
      res.setHeader("ETag", etag);
      // 5 min browser + 1 min CDN cache for bot responses
      res.setHeader("Cache-Control", "public, max-age=300, s-maxage=60, stale-while-revalidate=600");
      res.send(injected);
    } catch (err) {
      logger.error("productMetaMiddleware unexpected error:", err);
      next(); // Graceful fallback — don't break the request
    }
  };
}

module.exports = { createProductMetaMiddleware, isBot, invalidateMetaCache };
