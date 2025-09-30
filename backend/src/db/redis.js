const { createClient } = require('redis');
const logger = require('../utils/logger');

let client = null;

const connectRedis = async () => {
  try {
    // Create Redis client with the provided credentials
    client = createClient({
      username: process.env.REDIS_USERNAME || 'default',
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST || 'redis-18949.c267.us-east-1-4.ec2.redns.redis-cloud.com',
        port: parseInt(process.env.REDIS_PORT) || 18949,
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            logger.error('Redis connection attempts exhausted');
            return new Error('Redis connection attempts exhausted');
          }
          return Math.min(retries * 100, 3000);
        }
      }
    });

    client.on('error', (err) => {
      logger.error(`Redis error: ${err.message}`);
    });

    client.on('connect', () => {
      logger.info(`Redis connected to ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
    });

    client.on('end', () => {
      logger.warn('Redis disconnected');
    });

    client.on('reconnecting', () => {
      logger.info('Redis reconnecting...');
    });

    await client.connect();

    // Test the connection
    await client.set('connection_test', 'success');
    const testResult = await client.get('connection_test');
    if (testResult === 'success') {
      logger.info('Redis connection verified and ready');
    }

    return client;
  } catch (error) {
    logger.error('Redis connection failed:', error);
    throw error;
  }
};

const getRedisClient = () => {
  return client;
};

const disconnectRedis = async () => {
  if (client) {
    try {
      await client.quit();
      client = null;
      logger.info('Redis disconnected');
    } catch (error) {
      logger.error('Error disconnecting Redis:', error);
    }
  }
};

module.exports = {
  connectRedis,
  getRedisClient,
  disconnectRedis
};
