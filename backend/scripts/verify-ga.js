const { BetaAnalyticsDataClient } = require("@google-analytics/data");
require('dotenv').config();

const analyticsClient = new BetaAnalyticsDataClient({
  credentials: process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
    : undefined,
});

const PROPERTY_ID = process.env.GA_PROPERTY_ID;

async function testGA() {
  console.log('Testing GA Property:', PROPERTY_ID);
  try {
    const [response] = await analyticsClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [
        { name: "screenPageViews" },
        { name: "totalUsers" },
        { name: "sessions" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
      ],
    });

    console.log('--- GA Full Response ---');
    console.log(JSON.stringify(response, null, 2));

    if (response.rows && response.rows.length > 0) {
      console.log('Metrics Values:', response.rows[0].metricValues);
    } else {
      console.log('⚠️ No rows returned from GA. This might mean the property ID is wrong or there is no data for the selected range.');
    }
  } catch (error) {
    console.error('❌ GA test failed:', error.message);
  }
}

testGA();
