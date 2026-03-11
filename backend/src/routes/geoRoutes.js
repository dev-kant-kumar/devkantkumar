const express = require('express');
const { getGeo } = require('../controllers/geoController');

const router = express.Router();

// @route GET /api/v1/geo
router.get('/', getGeo);

module.exports = router;
