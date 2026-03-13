const cacheService = require('../services/cacheService');
const logger = require('../utils/logger');

/**
 * Route-level response-caching middleware backed by Redis.
 *
 * How it works:
 *   1. On a cache HIT  — returns the stored JSON and sets `X-Cache: HIT`.
 *   2. On a cache MISS — lets the request fall through to the handler, then
 *      intercepts `res.json()` to persist the response before sending it.
 *
 * When Redis is unavailable the middleware is a transparent no-op; the
 * request is served normally without caching.
 *
 * @param {number}  ttl       Time-to-live in seconds (default 60 s).
 * @param {string}  keyPrefix Namespace prefix added before the URL path
 *                            (default 'route').  Use a distinct prefix per
 *                            resource family so `delPattern` invalidations are
 *                            scoped (e.g. 'products', 'services').
 */
const cacheMiddleware = (ttl = 60, keyPrefix = 'route') => async (req, res, next) => {
  // Only cache idempotent read requests
  if (req.method !== 'GET') return next();

  const cacheKey = `${keyPrefix}:${req.originalUrl}`;

  try {
    const cached = await cacheService.get(cacheKey);
    if (cached !== null) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }
  } catch (err) {
    logger.warn(`Cache read error for ${cacheKey}: ${err.message}`);
  }

  // Intercept res.json so we can store the response before it is sent.
  // Restore the original method after the first successful write so that any
  // downstream middleware that calls res.json() a second time (e.g. error
  // handlers) gets the unmodified behaviour and we never double-cache.
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    // Restore immediately so subsequent calls go straight to the original
    res.json = originalJson;
    // Only cache successful responses (2xx)
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cacheService.set(cacheKey, data, ttl).catch((err) => {
        logger.warn(`Cache write error for ${cacheKey}: ${err.message}`);
      });
    }
    res.setHeader('X-Cache', 'MISS');
    return originalJson(data);
  };

  next();
};

module.exports = cacheMiddleware;
