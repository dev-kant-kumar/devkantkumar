const express = require('express');
const couponController = require('../controllers/couponController');
const { protect, optionalAuth } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();

// =======================================
// PUBLIC ROUTES (No authentication)
// =======================================

// Validate coupon code and calculate discount (optionalAuth populates req.user when logged in)
router.post('/validate', optionalAuth, couponController.validateCoupon);

// Get all active coupons
router.get('/active', couponController.getActiveCoupons);

// =======================================
// ADMIN ROUTES (Protected + Admin only)
// =======================================

// Create new coupon
router.post('/', protect, adminAuth, couponController.createCoupon);

// Get all coupons with pagination
router.get('/', protect, adminAuth, couponController.getCoupons);

// Get coupon stats/analytics
router.get('/stats/overview', protect, adminAuth, couponController.getCouponStats);

// Get single coupon details
router.get('/:id', protect, adminAuth, couponController.getCoupon);

// Update coupon
router.put('/:id', protect, adminAuth, couponController.updateCoupon);

// Delete coupon
router.delete('/:id', protect, adminAuth, couponController.deleteCoupon);

module.exports = router;
