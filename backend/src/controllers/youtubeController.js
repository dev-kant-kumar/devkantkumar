const youtubeService = require('../services/youtubeService');
const logger = require('../utils/logger');

exports.getYouTubeData = async (req, res, next) => {
  try {
    const data = await youtubeService.getYouTubeData();
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (error) {
    logger.error('YouTube Controller Error:', error.message);
    res.status(error.response?.status || 500).json({
      status: 'error',
      message: error.message || 'Failed to fetch YouTube data'
    });
  }
};
