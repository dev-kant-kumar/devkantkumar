const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();

// Public routes
router.get('/profile/:userId', userController.getUserProfile);

// Protected routes
router.use(protect); // All routes below require authentication

router.get('/dashboard', userController.getDashboard);
router.put('/profile', userController.updateProfile);
router.get('/orders', userController.getUserOrders);
router.get('/downloads', userController.getUserDownloads);
router.get('/favorites', userController.getFavorites);
router.post('/favorites/:itemId', userController.addToFavorites);
router.delete('/favorites/:itemId', userController.removeFromFavorites);

// Admin only routes
router.get('/all', adminAuth, userController.getAllUsers);
router.put('/:userId/status', adminAuth, userController.updateUserStatus);
router.delete('/:userId', adminAuth, userController.deleteUser);

module.exports = router;
