const express = require('express');
const analyticsController = require('../controllers/analyticsController');
const { getGAOverview } = require('../services/googleAnalytics');
const { getSearchConsoleOverview } = require('../services/searchConsole');
const router = express.Router();

// Public route to record hits (Local storage)
router.post('/hit', analyticsController.trackHit);

// Google Analytics & Search Console Overview
router.get('/overview', async (req, res) => {
  try {
    const [ga, gsc] = await Promise.all([
      getGAOverview(),
      getSearchConsoleOverview(),
    ]);

    res.json({
      success: true,
      data: {
        ga,
        gsc,
      },
    });
  } catch (error) {
    console.error('Analytics overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Google analytics'
    });
  }
});

module.exports = router;
