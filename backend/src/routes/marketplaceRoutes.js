const express = require('express');
const marketplaceController = require('../controllers/marketplaceController');
const quoteController = require('../controllers/quoteController');
const supportController = require('../controllers/supportController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Review routes (Protected & Specific)
router.post('/products/:id/reviews', protect, marketplaceController.createReview);
router.put('/products/:id/reviews', protect, marketplaceController.updateReview);
router.delete('/products/:id/reviews', protect, marketplaceController.deleteReview);
router.get('/products/:id/reviews', protect, marketplaceController.getReviews);

// Public routes
router.get('/services', marketplaceController.getServices);
router.get('/services/:id', marketplaceController.getServiceById);
router.get('/products', marketplaceController.getProducts);
router.get('/products/:id', marketplaceController.getProductById);
router.get('/categories', marketplaceController.getCategories);
router.get('/search', marketplaceController.search);
router.post('/payment/webhook', marketplaceController.handleRazorpayWebhook);

// Quote request (public - no auth required)
router.post('/quote-request', quoteController.submitQuote);

// Support (public)
router.get('/support/settings', supportController.getSupportSettings);
router.post('/support', supportController.submitTicket);

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

// Order Communication routes
router.get('/orders/:orderId/messages', marketplaceController.getOrderMessages);
router.post('/orders/:orderId/messages', marketplaceController.addOrderMessage);

// Payment routes
router.post('/payment/create-order', marketplaceController.createRazorpayOrder);
router.post('/payment/verify', marketplaceController.verifyRazorpayPayment);

// Download routes
router.get('/orders/:orderId/items/:itemId/download', marketplaceController.downloadPurchasedItem);
router.post('/orders/:orderId/regenerate/:itemId', marketplaceController.regenerateDownloadLinks);

// Review routes


module.exports = router;
