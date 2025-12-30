const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

const createLimiter = (options) => {
  return rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
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
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter
};
