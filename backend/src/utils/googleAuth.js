const { google } = require('googleapis');

/**
 * Works in BOTH:
 * - Local (GOOGLE_APPLICATION_CREDENTIALS=file path)
 * - Vercel (GOOGLE_SERVICE_ACCOUNT_JSON=full json)
 */
const googleAuth = new google.auth.GoogleAuth({
  credentials: process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
    : undefined, // fallback to GOOGLE_APPLICATION_CREDENTIALS
  scopes: [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/webmasters.readonly",
  ],
});

module.exports = { googleAuth };
