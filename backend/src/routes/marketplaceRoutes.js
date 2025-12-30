const express = require('express');
const marketplaceController = require('../controllers/marketplaceController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/services', marketplaceController.getServices);
router.get('/services/:id', marketplaceController.getServiceById);
router.get('/products', marketplaceController.getProducts);
router.get('/products/:id', marketplaceController.getProductById);
router.get('/categories', marketplaceController.getCategories);
router.get('/search', marketplaceController.search);

// Protected routes
router.use(protect);

// Cart routes - DEPRECATED: Use /api/v1/cart via cartRoutes instead
// These are kept for backward compatibility if needed, but should be phased out
// router.get('/cart', marketplaceController.getCart);
// router.post('/cart/add', marketplaceController.addToCart);
// router.put('/cart/update', marketplaceController.updateCartItem);
// router.delete('/cart/remove/:itemId', marketplaceController.removeFromCart);
// router.delete('/cart/clear', marketplaceController.clearCart);

// Order routes
router.post('/orders', marketplaceController.createOrder);
router.get('/orders', marketplaceController.getUserOrders);
router.get('/orders/:id', marketplaceController.getOrderById);

// Payment routes
// Payment routes
router.post('/payment/create-order', marketplaceController.createRazorpayOrder);
router.post('/payment/verify', marketplaceController.verifyRazorpayPayment);

// Download route
router.get('/orders/:orderId/download/:itemId', marketplaceController.downloadPurchasedItem);

// Review routes
router.post('/reviews', marketplaceController.createReview);
router.get('/reviews/:itemId', marketplaceController.getReviews);

module.exports = router;
