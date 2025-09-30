const { getRedisClient } = require('../db/redis');
const logger = require('../utils/logger');

class CacheService {
  // Get Redis client safely
  getClient() {
    return getRedisClient();
  }

  // Set cache with expiration
  async set(key, value, expiration = 3600) {
    try {
      const redis = this.getClient();
      if (!redis) {
        logger.warn('Redis client not available, skipping cache set');
        return false;
      }
      const serializedValue = JSON.stringify(value);
      await redis.setEx(key, expiration, serializedValue);
      return true;
    } catch (error) {
      logger.error('Cache set error:', error);
      return false;
    }
  }

  // Get cache
  async get(key) {
    try {
      const redis = this.getClient();
      if (!redis) {
        logger.warn('Redis client not available, skipping cache get');
        return null;
      }
      const value = await redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  }

  // Delete cache
  async del(key) {
    try {
      const redis = this.getClient();
      if (!redis) {
        logger.warn('Redis client not available, skipping cache delete');
        return false;
      }
      await redis.del(key);
      return true;
    } catch (error) {
      logger.error('Cache delete error:', error);
      return false;
    }
  }

  // Check if key exists
  async exists(key) {
    try {
      const redis = this.getClient();
      if (!redis) {
        logger.warn('Redis client not available, skipping cache exists check');
        return false;
      }
      const result = await redis.exists(key);
      return result === 1;
    } catch (error) {
      logger.error('Cache exists error:', error);
      return false;
    }
  }

  // Set cache with pattern-based expiration
  async setWithPattern(pattern, key, value, expiration = 3600) {
    try {
      const fullKey = `${pattern}:${key}`;
      return await this.set(fullKey, value, expiration);
    } catch (error) {
      logger.error('Cache set with pattern error:', error);
      return false;
    }
  }

  // Get cache with pattern
  async getWithPattern(pattern, key) {
    try {
      const fullKey = `${pattern}:${key}`;
      return await this.get(fullKey);
    } catch (error) {
      logger.error('Cache get with pattern error:', error);
      return null;
    }
  }

  // Delete all keys matching pattern
  async delPattern(pattern) {
    try {
      const redis = this.getClient();
      if (!redis) {
        logger.warn('Redis client not available, skipping cache pattern delete');
        return false;
      }
      const keys = await redis.keys(`${pattern}:*`);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
      return true;
    } catch (error) {
      logger.error('Cache delete pattern error:', error);
      return false;
    }
  }

  // Increment counter
  async incr(key, expiration = 3600) {
    try {
      const redis = this.getClient();
      if (!redis) {
        logger.warn('Redis client not available, skipping cache increment');
        return 0;
      }
      const result = await redis.incr(key);
      if (result === 1) {
        await redis.expire(key, expiration);
      }
      return result;
    } catch (error) {
      logger.error('Cache increment error:', error);
      return 0;
    }
  }
}

module.exports = new CacheService();
