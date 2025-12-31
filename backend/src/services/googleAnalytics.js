const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const { getRedisClient } = require('../db/redis');
const logger = require('../utils/logger');

const analyticsClient = new BetaAnalyticsDataClient({
  credentials: process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
    : undefined,
});

const PROPERTY_ID = process.env.GA_PROPERTY_ID; // e.g. 123456789

async function getGAOverview() {
  if (!PROPERTY_ID) {
    throw new Error('GA_PROPERTY_ID is not defined');
  }

  const redis = getRedisClient();
  const cacheKey = `ga_overview_${PROPERTY_ID}`;

  // Try to get from cache
  if (redis) {
    try {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
    } catch (err) {
      logger.error('Redis Get Error:', err.message);
    }
  }

  try {
    // 1. Core Overview Report
    const [overviewResponse] = await analyticsClient.runReport({
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

    // 2. Top Pages Report
    const [pagesResponse] = await analyticsClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      limit: 10,
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    });

    // 3. Countries Report
    const [countriesResponse] = await analyticsClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "country" }, { name: "countryId" }],
      metrics: [{ name: "totalUsers" }],
      limit: 5,
      orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
    });

    // 4. Devices Report
    const [devicesResponse] = await analyticsClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "totalUsers" }],
    });

    const overviewMetrics = overviewResponse.rows?.[0]?.metricValues || [];

    const result = {
      overview: {
        pageViews: Number(overviewMetrics[0]?.value || 0),
        users: Number(overviewMetrics[1]?.value || 0),
        sessions: Number(overviewMetrics[2]?.value || 0),
        bounceRate: (Number(overviewMetrics[3]?.value || 0) * 100).toFixed(2) + '%',
        avgSessionDuration: Number(overviewMetrics[4]?.value || 0),
      },
      topPages: pagesResponse.rows?.map(row => ({
        path: row.dimensionValues[0].value,
        views: Number(row.metricValues[0].value)
      })) || [],
      countries: countriesResponse.rows?.map(row => ({
        country: row.dimensionValues[0].value,
        countryCode: row.dimensionValues[1].value,
        users: Number(row.metricValues[0].value)
      })) || [],
      devices: devicesResponse.rows?.map(row => ({
        category: row.dimensionValues[0].value,
        users: Number(row.metricValues[0].value)
      })) || [],
      isFallback: overviewResponse.rowCount === 0,
      lastUpdated: new Date().toISOString()
    };

    // Save to cache (30 mins TTL)
    if (redis) {
      try {
        await redis.setEx(cacheKey, 1800, JSON.stringify(result));
      } catch (err) {
        logger.error('Redis Set Error:', err.message);
      }
    }

    return result;
  } catch (error) {
    logger.error('GA Data Fetch Error:', error.message);
    // Fallback object to prevent crashes
    return {
      overview: { pageViews: 0, users: 0, sessions: 0, bounceRate: '0%', avgSessionDuration: '0s' },
      topPages: [],
      countries: [],
      devices: [],
      isFallback: true,
      error: error.message
    };
  }
}

module.exports = { getGAOverview };
