const Visit = require('../models/Visit');
const logger = require('../utils/logger');

// @desc    Track a page visit
// @route   POST /api/v1/analytics/hit
// @access  Public
const trackHit = async (req, res) => {
  try {
    const { path, referrer } = req.body;

    if (!path) {
      return res.status(400).json({ success: false, message: 'Path is required' });
    }

    // Don't track admin paths or common assets
    if (path.startsWith('/admin') || path.includes('/api/') || path.includes('.')) {
      return res.status(200).json({ success: true });
    }

    await Visit.create({
      path,
      referrer,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });

    res.status(200).json({ success: true });
  } catch (error) {
    logger.error('Track hit error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  trackHit
};
