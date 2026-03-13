/**
 * registerMerchantApiGcp.js
 *
 * Complete Merchant API v1 setup script.
 * Follows the official guide: https://developers.google.com/merchant/api/guides/direct-api-calls
 *
 * Steps:
 *   1. Register GCP project with Merchant API (required)
 *   2. (Optional) List existing data sources
 *   3. (Optional) Create primary products data source
 *   4. (Optional) Test product insert
 *
 * Usage:
 *   node scripts/registerMerchantApiGcp.js                     # Just register
 *   node scripts/registerMerchantApiGcp.js --grant-permissions # Register + grant ADMIN + API_DEVELOPER
 *   node scripts/registerMerchantApiGcp.js --create-datasource # Register + create data source
 *   node scripts/registerMerchantApiGcp.js --test-product      # Register + test product insert
 *   node scripts/registerMerchantApiGcp.js --all               # All steps
 */

const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");
require("dotenv").config();

const MERCHANT_ID = process.env.GOOGLE_MERCHANT_ID;
const DEVELOPER_EMAIL = process.env.GOOGLE_MERCHANT_DEVELOPER_EMAIL || process.env.SMTP_USER || "dev.mytechhandle@gmail.com";
const BASE_URL = "https://merchantapi.googleapis.com";

const args = process.argv.slice(2);
const CREATE_DATASOURCE =
  args.includes("--create-datasource") || args.includes("--all");
const TEST_PRODUCT = args.includes("--test-product") || args.includes("--all");
const GRANT_PERMISSIONS =
  args.includes("--grant-permissions") || args.includes("--all");

if (!MERCHANT_ID) {
  console.error("❌ GOOGLE_MERCHANT_ID not set in .env");
  process.exit(1);
}

const merchantAuth = new GoogleAuth({
  credentials: process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
    : undefined,
  scopes: ["https://www.googleapis.com/auth/content"],
});

let accessToken = null;

async function getAccessToken() {
  if (accessToken) return accessToken;
  const client = await merchantAuth.getClient();
  const tokenResp = await client.getAccessToken();
  accessToken = tokenResp.token;
  return accessToken;
}

function buildHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function step1RegisterGcp() {
  console.log("\n📋 STEP 1: Register GCP Project with Merchant API\n");

  try {
    const token = await getAccessToken();

    const url = `${BASE_URL}/accounts/v1/accounts/${MERCHANT_ID}/developerRegistration:registerGcp`;
    const body = { developerEmail: DEVELOPER_EMAIL };

    console.log(`📤 POST ${url}`);
    console.log(`📝 Payload: ${JSON.stringify(body)}\n`);

    const response = await axios.post(url, body, {
      headers: buildHeaders(token),
    });

    console.log("✅ SUCCESS! GCP registered with Merchant API");
    console.log(`   ✓ Developer email: ${DEVELOPER_EMAIL}`);
    console.log(`   ✓ GCP Project ID: ${response.data.gcpIds?.[0] || "N/A"}`);
    console.log(`   ✓ Name: ${response.data.name}\n`);

    return response.data;
  } catch (error) {
    console.error("❌ Registration failed");
    if (error.response?.status === 409) {
      console.log("   ℹ️  GCP is already registered (expected on retry)\n");
      return null;
    }
    console.error(
      "   Error:",
      JSON.stringify(error.response?.data || error.message, null, 2),
    );
    process.exit(1);
  }
}

async function step1bGrantPermissions() {
  console.log("\n📋 STEP 1b: Grant Additional Permissions to Developer\n");

  try {
    const token = await getAccessToken();

    // Encode email for URL (replace @ with %40)
    const encodedEmail = DEVELOPER_EMAIL.replace("@", "%40");
    const url = `${BASE_URL}/accounts/v1/accounts/${MERCHANT_ID}/users/${encodedEmail}?update_mask=access_rights`;
    const body = {
      access_rights: ["ADMIN", "API_DEVELOPER"],
    };

    console.log(`📤 PATCH ${url}`);
    console.log(`📝 Payload: ${JSON.stringify(body, null, 2)}\n`);

    const response = await axios.patch(url, body, {
      headers: buildHeaders(token),
    });

    console.log("✅ Permissions updated successfully!");
    console.log(`   ✓ Developer email: ${DEVELOPER_EMAIL}`);
    console.log(
      `   ✓ Roles granted: ${response.data.access_rights?.join(", ")}`,
    );
    console.log(`   ✓ Status: ${response.data.status}\n`);

    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.log(
        "ℹ️  Developer user not found yet. They may need to accept an invitation first.\n",
      );
      return null;
    }
    console.error(
      "⚠️  Could not update permissions:",
      JSON.stringify(error.response?.data || error.message, null, 2),
    );
    // Don't exit — this is non-critical
  }
}

async function step2ListDataSources() {
  console.log("📋 STEP 2: List Existing Data Sources\n");

  try {
    const token = await getAccessToken();
    const url = `${BASE_URL}/datasources/v1/accounts/${MERCHANT_ID}/dataSources`;

    const response = await axios.get(url, { headers: buildHeaders(token) });

    const sources = response.data.dataSources || [];
    console.log(`Found ${sources.length} data source(s):\n`);

    if (sources.length === 0) {
      console.log("   (None found)\n");
      return [];
    }

    sources.forEach((source, i) => {
      console.log(`   ${i + 1}. ${source.displayName}`);
      console.log(`      Name: ${source.name}`);
      console.log(`      Input: ${source.input || "N/A"}`);
      if (source.primaryProductDataSource) {
        console.log(
          `      Feed Label: ${source.primaryProductDataSource.feedLabel}`,
        );
        console.log(
          `      Countries: ${source.primaryProductDataSource.countries.join(", ")}`,
        );
      }
      console.log();
    });

    return sources;
  } catch (error) {
    console.error(
      "⚠️  Could not list data sources:",
      error.response?.data || error.message,
    );
    return [];
  }
}

async function step3CreateDataSource() {
  console.log("📋 STEP 3: Create Primary Products Data Source\n");

  try {
    const token = await getAccessToken();
    const url = `${BASE_URL}/datasources/v1/accounts/${MERCHANT_ID}/dataSources`;

    const body = {
      displayName: "API Upload – devkantkumar.com",
      primaryProductDataSource: {
        contentLanguage: "en",
        feedLabel: "IN",
        countries: ["IN"],
      },
    };

    console.log(`📤 POST ${url}`);
    console.log(`📝 Payload: ${JSON.stringify(body, null, 2)}\n`);

    const response = await axios.post(url, body, {
      headers: buildHeaders(token),
    });

    console.log("✅ Data source created successfully!");
    console.log(`   ✓ Name: ${response.data.name}`);
    console.log(`   ✓ Display: ${response.data.displayName}`);
    console.log(
      `   ✓ Feed Label: ${response.data.primaryProductDataSource.feedLabel}`,
    );
    console.log(
      `   ✓ Countries: ${response.data.primaryProductDataSource.countries.join(", ")}`,
    );
    console.log(
      "\n⚠️  Copy this name to your .env as GOOGLE_MERCHANT_DATASOURCE_NAME:\n",
    );
    console.log(`   GOOGLE_MERCHANT_DATASOURCE_NAME=${response.data.name}\n`);

    return response.data;
  } catch (error) {
    if (error.response?.status === 409) {
      console.log("   ℹ️  Data source already exists (expected on retry)\n");
      return null;
    }
    console.error(
      "❌ Failed to create data source:",
      JSON.stringify(error.response?.data || error.message, null, 2),
    );
    process.exit(1);
  }
}

async function step4TestProductInsert() {
  console.log("📋 STEP 4: Test Product Insert\n");

  try {
    // Use the env-configured data source
    const dataSourceId =
      process.env.GOOGLE_MERCHANT_DATASOURCE_NAME ||
      "accounts/5745579580/dataSources/10622961135";

    if (!dataSourceId) {
      console.error("❌ No data source configured. Create one first.");
      process.exit(1);
    }

    const token = await getAccessToken();
    const url = `${BASE_URL}/products/v1/accounts/${MERCHANT_ID}/productInputs:insert?dataSource=${encodeURIComponent(dataSourceId)}`;

    const testOfferId = "test-product-" + Date.now();
    const body = {
      contentLanguage: "en",
      feedLabel: "IN",
      offerId: testOfferId,
      name: "Test Product – Merchant API Setup",
      productAttributes: {
        title: "Test Product – Merchant API Setup",
        description:
          "This is a test product to verify Merchant API integration",
        link: "https://devkantkumar.com/marketplace/products/test",
        imageLink: "https://via.placeholder.com/300",
        availability: "in_stock",
        price: {
          amountMicros: "50000000",
          currencyCode: "INR",
        },
        brand: "Dev Kant Kumar",
        condition: "new",
        productTypes: ["Software > Digital Downloads"],
        identifierExists: false,
      },
    };

    console.log(`📤 POST ${url}`);
    console.log(`📝 Test Product ID: ${testOfferId}\n`);

    const response = await axios.post(url, body, {
      headers: buildHeaders(token),
    });

    console.log("✅ Product insert successful!");
    console.log(`   ✓ Product: ${response.data.product}`);
    console.log(`   ✓ Offer ID: ${response.data.offerId}`);
    console.log(`   ✓ Content Language: ${response.data.contentLanguage}`);
    console.log(`   ✓ Feed Label: ${response.data.feedLabel}\n`);

    return response.data;
  } catch (error) {
    console.error(
      "❌ Product insert failed:",
      JSON.stringify(error.response?.data || error.message, null, 2),
    );
    process.exit(1);
  }
}

async function main() {
  console.log("🚀 Merchant API v1 Setup Script");
  console.log("================================");
  console.log(`📍 Merchant ID: ${MERCHANT_ID}`);
  console.log(`📧 Developer Email: ${DEVELOPER_EMAIL}\n`);

  // Step 1: Register (always)
  await step1RegisterGcp();

  // Step 1b: Grant permissions (optional)
  if (GRANT_PERMISSIONS) {
    await step1bGrantPermissions();
  }

  // Step 2: List data sources
  const sources = await step2ListDataSources();

  // Step 3: Create data source (optional)
  if (CREATE_DATASOURCE) {
    await step3CreateDataSource();
  } else if (sources.length === 0) {
    console.log("📌 No data sources found.");
    console.log("   Run with --create-datasource to create one:\n");
    console.log(
      "   node scripts/registerMerchantApiGcp.js --create-datasource\n",
    );
  }

  // Step 4: Test product insert (optional)
  if (TEST_PRODUCT) {
    await step4TestProductInsert();
  }

  console.log("✅ Setup complete!\n");
  console.log("📝 Next steps:");
  console.log(
    "   • Grant permissions: node scripts/registerMerchantApiGcp.js --grant-permissions",
  );
  console.log(
    "   • Create data source: node scripts/registerMerchantApiGcp.js --create-datasource",
  );
  console.log(
    "   • Test product sync: node scripts/registerMerchantApiGcp.js --test-product",
  );
  console.log(
    "   • Do all at once: node scripts/registerMerchantApiGcp.js --all",
  );
  console.log("   • Restart backend: npm run dev:watch");
  console.log("   • Click 'Sync to Google' in Admin → Market → Products\n");
}

main().catch((err) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
