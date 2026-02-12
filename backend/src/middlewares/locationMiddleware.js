const logger = require('../utils/logger');

/**
 * Middleware to extract location from Cloudflare headers or fallback headers
 * Priority:
 * 1. CF-IPCountry (Cloudflare)
 * 2. x-country-code (Custom/Frontend)
 */
const extractLocation = (req, res, next) => {
  try {
    // 1. Check Cloudflare header (most reliable)
    const cfCountry = req.headers['cf-ipcountry'];

    // 2. Check custom header (fallback)
    const customCountry = req.headers['x-country-code'];

    // Determine location
    let location = cfCountry || customCountry;

    // Handle "XX" or "T1" (Tor) from Cloudflare if needed, but usually it's a 2-letter code
    if (location && location.toUpperCase() === 'XX') {
      location = null; // Unknown
    }

    // Attach to request object
    if (location) {
      req.location = location.toUpperCase();
      // Also set on query for convenience if needed, though strictly we use req.location
      // req.query.countryCode = location.toUpperCase();
    }

    // Log for debugging
    // if (location) {
    //     logger.info(`[LocationMiddleware] Detected: ${location}`);
    // }

    next();
  } catch (error) {
    logger.error('Error in location middleware:', error);
    next(); // Don't block request on error
  }
};

module.exports = extractLocation;
