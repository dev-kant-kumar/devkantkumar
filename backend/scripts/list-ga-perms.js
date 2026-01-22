const { AnalyticsAdminServiceClient } = require("@google-analytics/admin");
require('dotenv').config();

const adminClient = new AnalyticsAdminServiceClient({
  credentials: process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
    : undefined,
});

async function listProperties() {
  console.log('Listing accessible GA4 properties...');
  try {
    // Note: This lists the accounts the service account has access to
    const [accounts] = await adminClient.listAccounts();
    console.log(`Found ${accounts.length} accounts.`);

    for (const account of accounts) {
      console.log(`- Account: ${account.displayName} (${account.name})`);

      // List properties for each account
      const [properties] = await adminClient.listProperties({ filter: `parent:${account.name}` });
      for (const property of properties) {
        console.log(`  * Property: ${property.displayName} (${property.name})`);
      }
    }
  } catch (error) {
    console.error('❌ Failed to list properties:', error.message);
  }
}

listProperties();
