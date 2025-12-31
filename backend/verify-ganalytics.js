const { google } = require('googleapis');
require('dotenv').config();

async function testSearchConsole() {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    // Falling back to GOOGLE_APPLICATION_CREDENTIALS or using JSON from env
    credentials: process.env.GOOGLE_SERVICE_ACCOUNT_JSON
      ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
      : undefined
  });

  const client = await auth.getClient();

  const searchConsole = google.searchconsole({
    version: "v1",
    auth: client,
  });

  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  const formatDate = (date) => date.toISOString().split('T')[0];

  try {
    const res = await searchConsole.searchanalytics.query({
      siteUrl: "https://www.devkantkumar.com/",
      requestBody: {
        startDate: formatDate(sevenDaysAgo),
        endDate: formatDate(today),
        dimensions: ["query"],
        rowLimit: 5,
      },
    });

    console.log('--- Search Console Result ---');
    console.log(res.data);
  } catch (error) {
    console.error('❌ Search Console test failed:', error.message);
  }
}

testSearchConsole();
