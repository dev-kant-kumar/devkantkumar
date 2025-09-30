const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();

// All admin routes require admin authentication
router.use(adminAuth);

// Dashboard
router.get('/dashboard', adminController.getDashboard);
router.get('/analytics', adminController.getAnalytics);

// User management
router.get('/users', adminController.getUsers);
router.put('/users/:id/status', adminController.updateUserStatus);
router.delete('/users/:id', adminController.deleteUser);

// Content management
router.get('/content', adminController.getContent);
router.put('/content/:type/:id', adminController.updateContent);

// Order management
router.get('/orders', adminController.getOrders);
router.put('/orders/:id/status', adminController.updateOrderStatus);

// System settings
router.get('/settings', adminController.getSettings);
router.put('/settings', adminController.updateSettings);

module.exports = router;
