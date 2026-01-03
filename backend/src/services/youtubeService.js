const axios = require('axios');
const { getRedisClient } = require('../db/redis');
const logger = require('../utils/logger');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

async function getYouTubeData() {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    logger.error('YouTube Configuration Check:', {
      hasApiKey: !!YOUTUBE_API_KEY,
      hasChannelId: !!YOUTUBE_CHANNEL_ID
    });
    throw new Error('YouTube configuration missing in backend environment');
  }

  const redis = getRedisClient();
  const cacheKey = `youtube_data_${YOUTUBE_CHANNEL_ID}`;

  // Try to get from cache
  if (redis) {
    try {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
    } catch (err) {
      logger.error('Redis Get Error (YouTube):', err.message);
    }
  }

  try {
    const [latestRes, statsRes, mostViewedRes] = await Promise.all([
      // Latest video
      axios.get(`${BASE_URL}/search`, {
        params: {
          key: YOUTUBE_API_KEY,
          channelId: YOUTUBE_CHANNEL_ID,
          part: 'snippet,id',
          order: 'date',
          type: 'video',
          maxResults: 1
        }
      }),
      // Channel statistics + branding
      axios.get(`${BASE_URL}/channels`, {
        params: {
          key: YOUTUBE_API_KEY,
          id: YOUTUBE_CHANNEL_ID,
          part: 'snippet,statistics,brandingSettings'
        }
      }),
      // Most viewed videos for grid
      axios.get(`${BASE_URL}/search`, {
        params: {
          key: YOUTUBE_API_KEY,
          channelId: YOUTUBE_CHANNEL_ID,
          part: 'snippet,id',
          order: 'viewCount',
          type: 'video',
          maxResults: 7
        }
      })
    ]);

    const latestItem = latestRes.data.items?.[0];
    const latestVideo = latestItem ? {
      id: latestItem.id?.videoId || latestItem.id,
      title: latestItem.snippet.title,
      description: latestItem.snippet.description,
      publishedAt: latestItem.snippet.publishedAt,
      thumbnail: latestItem.snippet.thumbnails?.high?.url || latestItem.snippet.thumbnails?.medium?.url
    } : null;

    const mostViewedVideos = (mostViewedRes.data.items || [])
      .filter(item => item.id?.videoId)
      .map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url
      }));

    const channel = statsRes.data.items?.[0];
    let channelStats = null;
    if (channel) {
      const rawBanner = channel.brandingSettings?.image?.bannerExternalUrl;
      const bannerUrl = rawBanner ? (rawBanner.startsWith('http') ? rawBanner : `https:${rawBanner}`) : null;
      const rawAvatar = channel.snippet.thumbnails?.high?.url;
      const avatarUrl = rawAvatar ? (rawAvatar.startsWith('http') ? rawAvatar : `https:${rawAvatar}`) : null;

      channelStats = {
        title: channel.snippet.title,
        description: channel.snippet.description,
        subscribers: channel.statistics.subscriberCount,
        videos: channel.statistics.videoCount,
        views: channel.statistics.viewCount,
        banner: bannerUrl,
        avatar: avatarUrl
      };
    }

    const result = {
      latestVideo,
      youTubeVideos: mostViewedVideos,
      channelStats,
      lastUpdated: new Date().toISOString()
    };

    // Cache for 30 minutes
    if (redis) {
      try {
        await redis.setEx(cacheKey, 1800, JSON.stringify(result));
      } catch (err) {
        logger.error('Redis Set Error (YouTube):', err.message);
      }
    }

    return result;
  } catch (error) {
    if (error.response) {
      logger.error('YouTube API Error Response', {
        status: error.response.status,
        data: error.response.data
      });
    } else {
      logger.error('YouTube Data Fetch Error', { message: error.message });
    }
    throw error;
  }
}

module.exports = { getYouTubeData };
