/**
 * merchantCenterService.js
 *
 * Syncs digital products to Google Merchant Center via the NEW Merchant API
 * (merchantapi.googleapis.com) — fully replacing the legacy Content API v2.1.
 *
 * Merchant API reference:
 *   https://developers.google.com/merchant/api
 *
 * Key design decisions:
 *  - All prices are stored in INR in MongoDB.
 *  - The final price shown to buyers = base price × (1 + surchargeRate / 100),
 *    where surchargeRate is fetched live from SystemSetting so the Merchant
 *    Center listing always reflects the true checkout amount.
 *  - Products with an originalPrice > price are mapped as sale items.
 *  - A primary "API upload" data source is created once per merchant account
 *    and reused for all subsequent product inserts.
 *  - The service is fire-and-forget from the controller: failures are logged
 *    but never propagate back to the HTTP response.
 */

const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");
const logger = require("../utils/logger");
const SystemSetting = require("../models/SystemSetting");

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const MERCHANT_ID = process.env.GOOGLE_MERCHANT_ID; // e.g. "5745579580"
const BASE_URL = process.env.CLIENT_URL || "https://www.devkantkumar.com";
const BRAND_NAME = process.env.MERCHANT_BRAND_NAME || "Dev Kant Kumar";

// Merchant API base URLs (v1 — v1beta was discontinued Feb 28 2026)
const MC_BASE = "https://merchantapi.googleapis.com";
const DATASOURCES_API = `${MC_BASE}/datasources/v1/accounts/${MERCHANT_ID}/dataSources`;
const PRODUCTS_API = (dataSourceId) =>
  `${MC_BASE}/products/v1/accounts/${MERCHANT_ID}/productInputs:insert?dataSource=${encodeURIComponent(dataSourceId)}`;
// PRODUCT_DELETE_API is built inline in deleteProduct() so it can read _cachedDataSourceName at call time

// Auth — needs the content scope
const merchantAuth = new GoogleAuth({
  credentials: process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
    : undefined,
  scopes: ["https://www.googleapis.com/auth/content"],
});

// ---------------------------------------------------------------------------
// Data Source cache (in-process singleton)
// ---------------------------------------------------------------------------

let _cachedDataSourceName = null; // e.g. "accounts/5745579580/dataSources/12345"

/**
 * Ensure a primary "API upload" data source exists for this merchant account.
 * Creates one if none is found, then caches the resource name.
 *
 * @returns {Promise<string>} Full data source resource name
 */
async function getPrimaryDataSource() {
  if (_cachedDataSourceName) return _cachedDataSourceName;

  const token = await getAccessToken();
  const headers = buildHeaders(token);

  // 1. List existing data sources and look for an existing API upload source
  try {
    const listResp = await axios.get(DATASOURCES_API, { headers });
    const sources = listResp.data.dataSources || [];
    const existing = sources.find(
      (s) => s.primaryProductDataSource || (s.input && s.input === "API"),
    );
    if (existing) {
      _cachedDataSourceName = existing.name;
      logger.info(
        `[MerchantCenter] Reusing existing data source: ${_cachedDataSourceName}`,
      );
      return _cachedDataSourceName;
    }
  } catch (err) {
    logger.warn(
      "[MerchantCenter] Could not list data sources, will attempt create:",
      err?.response?.data || err.message,
    );
  }

  // 2. Create a new primary product data source
  const body = {
    displayName: "API Upload – devkantkumar.com",
    primaryProductDataSource: {
      contentLanguage: "en",
      feedLabel: "IN",
      countries: ["IN"],
    },
  };

  const createResp = await axios.post(DATASOURCES_API, body, { headers });
  _cachedDataSourceName = createResp.data.name;
  logger.info(
    `[MerchantCenter] Created new data source: ${_cachedDataSourceName}`,
  );
  return _cachedDataSourceName;
}

// ---------------------------------------------------------------------------
// Auth helpers
// ---------------------------------------------------------------------------

async function getAccessToken() {
  const client = await merchantAuth.getClient();
  const tokenResp = await client.getAccessToken();
  return tokenResp.token;
}

function buildHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Strip HTML tags and common Markdown, then truncate.
 * Merchant Center descriptions must be plain text (≤ 5 000 chars).
 */
function toPlainText(raw, maxLen = 5000) {
  if (!raw) return "";
  return raw
    .replace(/<[^>]+>/g, " ")
    .replace(/[*_`#~>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

/**
 * Fetch the current surcharge rate (%) from SystemSetting.
 * Defaults to 0 if the DB call fails.
 */
async function getSurchargeRate() {
  try {
    const settings = await SystemSetting.getSettings();
    return Number(settings?.marketplace?.surchargeRate ?? 0);
  } catch (err) {
    logger.error(
      "[MerchantCenter] Failed to fetch surcharge rate:",
      err.message,
    );
    return 0;
  }
}

/**
 * Apply surcharge and return a formatted price string (2 decimal places).
 */
function applyAndFormat(basePrice, surchargeRate) {
  const final = Math.round(basePrice * (1 + surchargeRate / 100) * 100) / 100;
  return final.toFixed(2);
}

/**
 * Map a MongoDB Product document to a Merchant API productInput resource.
 *
 * Merchant API product input reference:
 *   https://developers.google.com/merchant/api/reference/rest/products_v1beta/accounts.productInputs
 */
function buildProductInput(product, surchargeRate) {
  const offerId = String(product._id);
  const slug = product.slug || offerId;
  const productUrl = `${BASE_URL}/marketplace/products/${slug}`;

  // Images
  const images = (product.images || []).map((img) => img.url).filter(Boolean);
  const imageLink = images[0] || `${BASE_URL}/og-image.jpg`;
  const additionalImageLinks = images.slice(1, 10);

  // Pricing
  const basePrice = Number(product.price) || 0;
  const hasOriginalPrice =
    product.originalPrice && Number(product.originalPrice) > basePrice;

  const finalPrice = applyAndFormat(basePrice, surchargeRate);
  const finalOriginalPrice = hasOriginalPrice
    ? applyAndFormat(Number(product.originalPrice), surchargeRate)
    : null;

  // Availability
  const availability = product.isActive !== false ? "in_stock" : "out_of_stock";

  // Category mapping
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

  // Merchant API v1: top-level = offerId, feedLabel, contentLanguage
  // All product data goes inside "productAttributes"
  const input = {
    offerId,
    feedLabel: "IN",
    contentLanguage: "en",

    productAttributes: {
      title: String(product.title).slice(0, 150),
      description: toPlainText(product.description),
      link: productUrl,
      imageLink,
      availability,
      condition: "new",
      brand: BRAND_NAME,
      identifierExists: false,
      productTypes: [productType],

      // Price uses amountMicros + currencyCode in Merchant API v1
      price: {
        amountMicros: String(
          Math.round(
            Number(hasOriginalPrice ? finalOriginalPrice : finalPrice) *
              1_000_000,
          ),
        ),
        currencyCode: "INR",
      },

      // Free digital delivery
      shipping: [
        {
          price: { amountMicros: "0", currencyCode: "INR" },
          country: "IN",
          service: "Digital Delivery",
        },
      ],

      ...(additionalImageLinks.length > 0 && { additionalImageLinks }),
    },
  };

  // Sale price when there is a discount
  if (hasOriginalPrice) {
    input.productAttributes.salePrice = {
      amountMicros: String(Math.round(Number(finalPrice) * 1_000_000)),
      currencyCode: "INR",
    };
  }

  return input;
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
    const [surchargeRate, dataSourceName, token] = await Promise.all([
      getSurchargeRate(),
      getPrimaryDataSource(),
      getAccessToken(),
    ]);

    const productInput = buildProductInput(product, surchargeRate);
    const url = PRODUCTS_API(dataSourceName);

    await axios.post(url, productInput, { headers: buildHeaders(token) });

    logger.info(
      `[MerchantCenter] Upserted product: ${product._id} (${product.title})`,
    );
  } catch (err) {
    logger.error(
      `[MerchantCenter] Failed to upsert product ${product._id}:`,
      err?.response?.data || err.message,
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
    logger.warn(
      "[MerchantCenter] GOOGLE_MERCHANT_ID not set – skipping delete",
    );
    return;
  }

  try {
    // Ensure data source is cached so PRODUCT_DELETE_API can use it
    await getPrimaryDataSource();
    const token = await getAccessToken();

    // Merchant API product input name format:
    // accounts/{merchantId}/productInputs/online~en~IN~{offerId}
    const productInputName = `accounts/${MERCHANT_ID}/productInputs/online~en~IN~${productId}`;
    const url = `${MC_BASE}/products/v1/${productInputName}?dataSource=${encodeURIComponent(_cachedDataSourceName)}`;

    await axios.delete(url, { headers: buildHeaders(token) });

    logger.info(`[MerchantCenter] Deleted product: ${productId}`);
  } catch (err) {
    const status = err?.response?.status;
    // 404 is expected when the product was never synced
    if (status !== 404) {
      logger.error(
        `[MerchantCenter] Failed to delete product ${productId}:`,
        err?.response?.data || err.message,
      );
    }
  }
}

/**
 * Bulk-sync all products from MongoDB to Google Merchant Center.
 * Runs in sequential batches to respect API rate limits.
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

  const BATCH_SIZE = 20;
  const BATCH_DELAY_MS = 500;

  let synced = 0;
  let failed = 0;
  let lastId = null;

  try {
    const [surchargeRate, dataSourceName, token] = await Promise.all([
      getSurchargeRate(),
      getPrimaryDataSource(),
      getAccessToken(),
    ]);

    const total = await Product.countDocuments({});
    logger.info(`[MerchantCenter] Starting bulk sync of ${total} products…`);

    while (true) {
      const query = lastId ? { _id: { $gt: lastId } } : {};
      const products = await Product.find(query)
        .sort({ _id: 1 })
        .limit(BATCH_SIZE)
        .lean();

      if (products.length === 0) break;

      // Merchant API does not have a custombatch endpoint in v1beta,
      // so we fire concurrent requests per batch (Promise.allSettled keeps
      // failures isolated).
      const insertUrl = PRODUCTS_API(dataSourceName);
      const headers = buildHeaders(token);

      const results = await Promise.allSettled(
        products.map((product) =>
          axios.post(insertUrl, buildProductInput(product, surchargeRate), {
            headers,
          }),
        ),
      );

      results.forEach((result, idx) => {
        if (result.status === "fulfilled") {
          synced++;
        } else {
          failed++;
          logger.error(
            `[MerchantCenter] Failed to sync product ${products[idx]._id}:`,
            result.reason?.response?.data || result.reason?.message,
          );
        }
      });

      lastId = products[products.length - 1]._id;

      if (products.length === BATCH_SIZE) {
        await new Promise((r) => setTimeout(r, BATCH_DELAY_MS));
      }
    }

    logger.info(
      `[MerchantCenter] Bulk sync complete — synced: ${synced}, failed: ${failed}, total: ${synced + failed}`,
    );
    return { synced, failed, total: synced + failed };
  } catch (err) {
    logger.error(
      "[MerchantCenter] Bulk sync error:",
      err?.response?.data || err.message,
    );
    return { synced, failed, total: synced + failed, error: err.message };
  }
}

module.exports = { upsertProduct, deleteProduct, syncAllProducts };
