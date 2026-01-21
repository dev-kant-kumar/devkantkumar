const crypto = require('crypto');
const DownloadLog = require('../models/DownloadLog');
const Order = require('../models/Order');
const logger = require('../utils/logger');

// Security configurations
const TOKEN_LENGTH = 32; // 64 chars hex
const DEFAULT_EXPIRY_HOURS = 48; // 2 days
const MAX_REGENERATIONS = 3;
const LINK_VALIDITY_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in ms for signed URL (if used)

/**
 * Download Service
 * Handles secure token generation, validation, and tracking
 */
const downloadService = {

  /**
   * Generate a secure random token
   * @returns {string} Hex string token
   */
  generateDownloadToken: () => {
    return crypto.randomBytes(TOKEN_LENGTH).toString('hex');
  },

  /**
   * Generate secure download link objects for an order item
   * @param {Object} item Product item from order
   * @param {number} maxDownloads Limit per file (default 5)
   * @returns {Array} Array of secure link objects
   */
  generateSecureDownloadLinks: (product, options = {}) => {
    const files = product.downloadFiles || [];
    const maxDownloads = options.maxDownloads || 5;
    const expiryHours = options.expiryHours || DEFAULT_EXPIRY_HOURS;

    return files.map(file => ({
      token: crypto.randomBytes(TOKEN_LENGTH).toString('hex'),
      name: file.name,
      // We don't expose the direct fileUrl to the frontend in this object
      // It is retrieved internally when validateDownloadToken is called
      fileId: file.source?._id || file._id || 'unknown',
      fileUrl: file.url, // Stored internally, not sent to user in safe view
      expiresAt: new Date(Date.now() + expiryHours * 60 * 60 * 1000),
      maxDownloads: maxDownloads,
      downloadCount: 0,
      createdAt: new Date()
    }));
  },

  /**
   * Validate a download token
   * @param {string} token
   * @param {string} userId (optional) to verify ownership
   * @returns {Object} { isValid, file, error }
   */
  validateDownloadToken: async (token, userId, ipAddress, userAgent) => {
    try {
      // Find order containing this token
      const order = await Order.findOne({
        'items.downloadLinks.token': token
      });

      if (!order) {
        return { isValid: false, error: 'Invalid download link' };
      }

      // If userId provided, check ownership
      if (userId && order.user.toString() !== userId.toString()) {
        await downloadService.logDownload({
          token, userId, ipAddress, userAgent, success: false, failureReason: 'Unauthorized access'
        });
        return { isValid: false, error: 'Unauthorized access' };
      }

      // Check payment status
      if (order.payment.status !== 'completed') {
         return { isValid: false, error: 'Order payment not completed' };
      }

      // Find the specific link object
      let targetLink = null;
      let targetItem = null;

      for (const item of order.items) {
        const link = item.downloadLinks?.find(l => l.token === token);
        if (link) {
          targetLink = link;
          targetItem = item;
          break;
        }
      }

      if (!targetLink) {
        return { isValid: false, error: 'Link not found' };
      }

      const now = new Date();

      // Check Expiry
      if (targetLink.expiresAt && new Date(targetLink.expiresAt) < now) {
         await downloadService.logDownload({
          token, userId, orderId: order._id, ipAddress, userAgent, success: false, failureReason: 'Link expired'
        });
        return { isValid: false, error: 'Download link has expired' };
      }

      // Check Download Limit
      if (targetLink.downloadCount >= targetLink.maxDownloads) {
        await downloadService.logDownload({
          token, userId, orderId: order._id, ipAddress, userAgent, success: false, failureReason: 'Download limit exceeded'
        });
        return { isValid: false, error: 'Download limit exceeded' };
      }

      return {
        isValid: true,
        order,
        link: targetLink,
        item: targetItem,
        fileUrl: targetLink.fileUrl
      };

    } catch (error) {
      logger.error('Token validation error:', error);
      return { isValid: false, error: 'Validation failed' };
    }
  },

  /**
   * Log download attempt
   */
  logDownload: async ({ user, order, product, token, fileName, ipAddress, userAgent, success, failureReason }) => {
    try {
      await DownloadLog.create({
        user,
        order,
        product,
        token,
        fileName,
        ipAddress,
        userAgent,
        success,
        failureReason,
        downloadedAt: new Date()
      });
    } catch (err) {
      logger.error('Failed to create download log:', err);
    }
  },

  /**
   * Helper to get client IP
   */
  getClientIP: (req) => {
    return req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
  },

  /**
   * Sanitize download links for frontend (hide internal URLs)
   */
  sanitizeDownloadLinks: (links) => {
    if (!links) return [];
    return links.map(link => ({
      ...link,
      fileUrl: undefined, // Hide real URL
      token: link.token,   // Expose token
      isExpired: new Date(link.expiresAt) < new Date(),
      isExhausted: link.downloadCount >= link.maxDownloads
    }));
  }
};

module.exports = downloadService;
