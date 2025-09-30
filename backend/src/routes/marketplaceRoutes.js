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

// Cart routes
router.get('/cart', marketplaceController.getCart);
router.post('/cart/add', marketplaceController.addToCart);
router.put('/cart/update', marketplaceController.updateCartItem);
router.delete('/cart/remove/:itemId', marketplaceController.removeFromCart);
router.delete('/cart/clear', marketplaceController.clearCart);

// Order routes
router.post('/orders', marketplaceController.createOrder);
router.get('/orders', marketplaceController.getUserOrders);
router.get('/orders/:id', marketplaceController.getOrderById);

// Payment routes
router.post('/payment/create-intent', marketplaceController.createPaymentIntent);
router.post('/payment/confirm', marketplaceController.confirmPayment);

// Review routes
router.post('/reviews', marketplaceController.createReview);
router.get('/reviews/:itemId', marketplaceController.getReviews);

module.exports = router;
