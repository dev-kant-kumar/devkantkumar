/**
 * merchantCenterService.js
 *
 * Syncs digital products to Google Merchant Center via the Content API v2.1.
 *
 * Key design decisions:
 *  - All prices are stored in INR in MongoDB.
 *  - The final price shown to buyers = base price × (1 + surchargeRate / 100),
 *    where surchargeRate is fetched live from SystemSetting so the Merchant
 *    Center listing always reflects the true checkout amount.
 *  - Products with an originalPrice > price are mapped as sale items:
 *      price      → originalPrice + surcharge   (regular / struck-through)
 *      salePrice  → price + surcharge            (current selling price)
 *  - The service is fire-and-forget from the controller: failures are logged
 *    but never propagate back to the HTTP response.
 *  - A dedicated GoogleAuth instance (separate scope) is used so existing
 *    Analytics / Search Console integrations are unaffected.
 *  - Bulk-sync helper exposed for the admin "Sync all" endpoint.
 */

const { google } = require("googleapis");
const logger = require("../utils/logger");
const SystemSetting = require("../models/SystemSetting");

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const MERCHANT_ID = process.env.GOOGLE_MERCHANT_ID;
const BASE_URL = process.env.CLIENT_URL || "https://www.devkantkumar.com";
const BRAND_NAME = process.env.MERCHANT_BRAND_NAME || "Dev Kant Kumar";

// Content API requires a write-capable scope that the read-only shared
// googleAuth (analytics + search console) deliberately does not include.
// Using a dedicated instance keeps the principle of least-privilege intact
// for existing integrations.
const merchantAuth = new google.auth.GoogleAuth({
  credentials: process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
    : undefined, // fallback → GOOGLE_APPLICATION_CREDENTIALS env var
  scopes: ["https://www.googleapis.com/auth/content"],
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Strip HTML tags and common Markdown from a string, then truncate.
 * Google Merchant Center descriptions must be plain text (≤ 5 000 chars).
 */
function toPlainText(raw, maxLen = 5000) {
  if (!raw) return "";
  return raw
    .replace(/<[^>]+>/g, " ")         // HTML tags
    .replace(/[*_`#~>]/g, "")         // Markdown symbols
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

/**
 * Fetch the current surcharge rate (%) from SystemSetting.
 * Defaults to 0 if the DB call fails so we never block a product save.
 */
async function getSurchargeRate() {
  try {
    const settings = await SystemSetting.getSettings();
    return Number(settings?.marketplace?.surchargeRate ?? 0);
  } catch (err) {
    logger.error("[MerchantCenter] Failed to fetch surcharge rate:", err.message);
    return 0;
  }
}

/**
 * Apply surcharge to a base INR price and return a string suitable for the
 * Merchant Center price field (2 decimal places).
 *
 * @param {number} basePrice   Base price in INR (as stored in DB)
 * @param {number} surchargeRate  Percentage, e.g. 18 for 18 %
 * @returns {string}  e.g. "118.00"
 */
function applyAndFormat(basePrice, surchargeRate) {
  const final = Math.round(basePrice * (1 + surchargeRate / 100) * 100) / 100;
  return final.toFixed(2);
}

/**
 * Map a MongoDB Product document to a Google Content API product resource.
 *
 * @param {object} product       Mongoose document or plain object
 * @param {number} surchargeRate Current surcharge percentage
 * @returns {object}  Content API product body
 */
function buildMerchantProduct(product, surchargeRate) {
  const offerId = String(product._id);
  const slug = product.slug || offerId;
  const productUrl = `${BASE_URL}/marketplace/products/${slug}`;

  // Images
  const images = (product.images || []).map((img) => img.url).filter(Boolean);
  const imageLink = images[0] || `${BASE_URL}/og-image.jpg`;
  const additionalImageLinks = images.slice(1, 10); // API limit

  // Pricing
  const basePrice = Number(product.price) || 0;
  const hasOriginalPrice =
    product.originalPrice && Number(product.originalPrice) > basePrice;

  const finalPrice = applyAndFormat(basePrice, surchargeRate);
  const finalOriginalPrice = hasOriginalPrice
    ? applyAndFormat(Number(product.originalPrice), surchargeRate)
    : null;

  // Availability
  const availability = product.isActive !== false ? "in stock" : "out of stock";

  // Category → Google product type hierarchy
  const categoryMap = {
    templates: "Software > Website Templates",
    components: "Software > UI Components",
    themes: "Software > Website Themes",
    plugins: "Software > Plugins & Extensions",
    graphics: "Arts & Entertainment > Digital Art",
    fonts: "Software > Fonts",
    courses: "Education > Online Courses",
    ebooks: "Media > Books > eBooks",
  };
  const productType =
    categoryMap[product.category] || "Software > Digital Downloads";

  // Custom attributes for richer data
  const customAttributes = [];
  if (product.version) {
    customAttributes.push({ name: "version", value: product.version });
  }
  if (product.license) {
    customAttributes.push({ name: "license", value: product.license });
  }
  if ((product.technologies || []).length > 0) {
    customAttributes.push({
      name: "technologies",
      value: product.technologies.slice(0, 5).join(", "),
    });
  }

  const resource = {
    offerId,
    title: String(product.title).slice(0, 150), // GMC title limit
    description: toPlainText(product.description),
    link: productUrl,
    imageLink,
    contentLanguage: "en",
    targetCountry: "IN",
    channel: "online",
    availability,
    condition: "new",
    brand: BRAND_NAME,
    // Digital product → no physical GTIN/MPN
    identifierExists: "false",
    productTypes: [productType],
    // Price field = "full" / regular price
    price: {
      value: hasOriginalPrice ? finalOriginalPrice : finalPrice,
      currency: "INR",
    },
    // Free digital delivery (no physical shipping)
    shipping: [
      {
        price: { value: "0.00", currency: "INR" },
        country: "IN",
        service: "Digital Delivery",
      },
    ],
    // Custom labels for campaign targeting (up to label4)
    customLabel0: product.category || "",
    customLabel1: product.isFeatured ? "featured" : "standard",
    customLabel2: product.license || "",
    ...(customAttributes.length > 0 && { customAttributes }),
  };

  // Add additionalImageLinks only when present (API rejects empty arrays)
  if (additionalImageLinks.length > 0) {
    resource.additionalImageLinks = additionalImageLinks;
  }

  // Sale price when there is a discount
  if (hasOriginalPrice) {
    resource.salePrice = { value: finalPrice, currency: "INR" };
    // salePriceEffectiveDate is optional; omitting it means "always on sale"
  }

  return resource;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Upsert (insert or update) a single product in Google Merchant Center.
 * Resolves when done; never rejects (errors are logged only).
 *
 * @param {object} product  Mongoose document or plain object
 */
async function upsertProduct(product) {
  if (!MERCHANT_ID) {
    logger.warn("[MerchantCenter] GOOGLE_MERCHANT_ID not set – skipping sync");
    return;
  }

  try {
    const surchargeRate = await getSurchargeRate();
    const authClient = await merchantAuth.getClient();
    const content = google.content({ version: "v2.1", auth: authClient });

    const productResource = buildMerchantProduct(product, surchargeRate);

    await content.products.insert({
      merchantId: MERCHANT_ID,
      requestBody: productResource,
    });

    logger.info(
      `[MerchantCenter] Upserted product: ${product._id} (${product.title})`
    );
  } catch (err) {
    logger.error(
      `[MerchantCenter] Failed to upsert product ${product._id}:`,
      err.message
    );
  }
}

/**
 * Remove a product from Google Merchant Center.
 * Resolves when done; never rejects.
 *
 * @param {string|object} productId  MongoDB _id (string or ObjectId)
 */
async function deleteProduct(productId) {
  if (!MERCHANT_ID) {
    logger.warn("[MerchantCenter] GOOGLE_MERCHANT_ID not set – skipping delete");
    return;
  }

  try {
    const authClient = await merchantAuth.getClient();
    const content = google.content({ version: "v2.1", auth: authClient });

    // Content API product ID format: online:en:IN:<offerId>
    const gmcProductId = `online:en:IN:${productId}`;

    await content.products.delete({
      merchantId: MERCHANT_ID,
      productId: gmcProductId,
    });

    logger.info(`[MerchantCenter] Deleted product: ${productId}`);
  } catch (err) {
    // 404 is expected when the product was never synced; suppress it
    if (err?.code !== 404 && err?.response?.status !== 404) {
      logger.error(
        `[MerchantCenter] Failed to delete product ${productId}:`,
        err.message
      );
    }
  }
}

/**
 * Bulk-sync all products from MongoDB to Google Merchant Center.
 * Runs in batches to respect API rate limits.
 * Returns a summary { synced, failed, total }.
 */
async function syncAllProducts() {
  if (!MERCHANT_ID) {
    const msg = "GOOGLE_MERCHANT_ID not set – bulk sync skipped";
    logger.warn(`[MerchantCenter] ${msg}`);
    return { synced: 0, failed: 0, total: 0, message: msg };
  }

  // Lazy-load Product to avoid circular dependency
  const Product = require("../models/Product");

  const BATCH_SIZE = 20; // Content API custombatch limit is 1,000, but keep batches small
  const BATCH_DELAY_MS = 500; // Pause between batches

  let synced = 0;
  let failed = 0;
  let lastId = null; // cursor for efficient pagination

  try {
    const surchargeRate = await getSurchargeRate();
    const authClient = await merchantAuth.getClient();
    const content = google.content({ version: "v2.1", auth: authClient });

    const total = await Product.countDocuments({});
    logger.info(`[MerchantCenter] Starting bulk sync of ${total} products…`);

    while (true) {
      // Cursor-based pagination: filter on _id > lastId to avoid skip() scans
      const query = lastId ? { _id: { $gt: lastId } } : {};
      const products = await Product.find(query)
        .sort({ _id: 1 })
        .limit(BATCH_SIZE)
        .lean();

      if (products.length === 0) break;

      // Build custombatch entries
      const entries = products.map((product, idx) => ({
        batchId: idx + 1,
        merchantId: MERCHANT_ID,
        method: "insert",
        product: buildMerchantProduct(product, surchargeRate),
      }));

      try {
        const resp = await content.products.custombatch({
          requestBody: { entries },
        });

        const kinds = resp.data.entries || [];
        kinds.forEach((entry) => {
          if (entry.errors) {
            failed++;
            logger.error(
              `[MerchantCenter] Batch entry error (batchId ${entry.batchId}):`,
              JSON.stringify(entry.errors)
            );
          } else {
            synced++;
          }
        });
      } catch (batchErr) {
        logger.error("[MerchantCenter] Batch insert error:", batchErr.message);
        failed += products.length;
      }

      // Advance cursor to the _id of the last product in this batch
      lastId = products[products.length - 1]._id;

      if (products.length === BATCH_SIZE) {
        await new Promise((r) => setTimeout(r, BATCH_DELAY_MS));
      }
    }

    logger.info(
      `[MerchantCenter] Bulk sync complete — synced: ${synced}, failed: ${failed}, total: ${synced + failed}`
    );
    return { synced, failed, total: synced + failed };
  } catch (err) {
    logger.error("[MerchantCenter] Bulk sync error:", err.message);
    return { synced, failed, total: synced + failed, error: err.message };
  }
}

module.exports = { upsertProduct, deleteProduct, syncAllProducts };
