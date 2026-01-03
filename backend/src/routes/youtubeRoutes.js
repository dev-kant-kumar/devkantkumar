const express = require('express');
const youtubeController = require('../controllers/youtubeController');

const router = express.Router();

router.get('/data', youtubeController.getYouTubeData);

module.exports = router;
