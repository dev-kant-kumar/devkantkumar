const { google } = require('googleapis');
const { googleAuth } = require('../utils/googleAuth.js');
const { getRedisClient } = require('../db/redis');
const logger = require('../utils/logger');

const SITE_URL = "https://www.devkantkumar.com/";

async function getSearchConsoleOverview() {
  const redis = getRedisClient();
  const cacheKey = `gsc_overview_${SITE_URL}`;

  // Try cache
  if (redis) {
    try {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
    } catch (err) {
      logger.error('Redis GSC Get Error:', err.message);
    }
  }

  try {
    const authClient = await googleAuth.getClient();

    const searchConsole = google.searchconsole({
      version: "v1",
      auth: authClient,
    });

    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const formatDate = (date) => date.toISOString().split('T')[0];
    const startDate = formatDate(thirtyDaysAgo);
    const endDate = formatDate(today);

    const [res, queriesRes] = await Promise.all([
      searchConsole.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: { startDate, endDate },
      }),
      searchConsole.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate,
          endDate,
          dimensions: ["query"],
          rowLimit: 10,
        },
      })
    ]);

    const row = res.data.rows?.[0];

    const result = {
      overview: {
        clicks: Math.round(row?.clicks || 0),
        impressions: Math.round(row?.impressions || 0),
        ctr: Number(((row?.ctr || 0) * 100).toFixed(2)),
        position: Number((row?.position || 0).toFixed(1)),
      },
      topQueries: queriesRes.data.rows?.map(r => ({
        query: r.keys[0],
        clicks: Math.round(r.clicks),
        impressions: Math.round(r.impressions)
      })) || [],
      isFallback: !res.data.rows || res.data.rows.length === 0,
      lastUpdated: new Date().toISOString()
    };

    // Save to cache
    if (redis) {
      try {
        await redis.setEx(cacheKey, 1800, JSON.stringify(result));
      } catch (err) {
        logger.error('Redis GSC Set Error:', err.message);
      }
    }

    return result;
  } catch (error) {
    logger.error('Search Console Fetch Error:', error.message);
    return {
      overview: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
      topQueries: [],
      isFallback: true,
      error: error.message
    };
  }
}

module.exports = { getSearchConsoleOverview };
