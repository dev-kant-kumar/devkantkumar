const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const { getRedisClient } = require('../db/redis');
const logger = require('../utils/logger');

/**
 * Build a RedisStore for express-rate-limit when a Redis client is available,
 * or fall back to the default in-memory store for single-instance / dev setups.
 * Using Redis ensures rate-limit counters are shared across all Node.js processes
 * behind a load balancer, preventing per-instance bypass.
 */
const buildStore = () => {
  const redis = getRedisClient();
  if (!redis) return undefined; // fall back to in-memory
  return new RedisStore({
    sendCommand: (...args) => redis.sendCommand(args),
  });
};

const createLimiter = (options) => {
  return rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    store: buildStore(),
    message: {
      success: false,
      message: options.message || 'Too many requests, please try again later.'
    },
    handler: (req, res, next, options) => {
      logger.warn(`Rate limit exceeded: ${req.ip} - ${req.originalUrl}`);
      res.status(options.statusCode).json(options.message);
    },
    ...options
  });
};

// Strict limiter for Login - 5 attempts per 15 mins
const loginLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many login attempts, please try again after 15 minutes'
});

// Limiter for Registration - 3 accounts per hour
const registerLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: 'Too many accounts created from this IP, please try again after an hour'
});

// Limiter for Forgot Password - 3 requests per hour
const forgotPasswordLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: 'Too many password reset requests, please try again after an hour'
});

module.exports = {
  createLimiter,
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter
};
