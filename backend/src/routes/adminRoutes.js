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
router.get('/settings/general', adminController.getSettings);
router.put('/settings/general', adminController.updateSettings);
router.get('/settings/seo', adminController.getSettings);
router.put('/settings/seo', adminController.updateSettings);

// --- MARKETPLACE MANAGEMENT ---
const adminMarketplaceController = require('../controllers/adminMarketplaceController');

// Products
// Products
router.get('/products', adminMarketplaceController.getAllProducts);
router.get('/products/:id', adminMarketplaceController.getProductById);
router.post('/products', adminMarketplaceController.createProduct);
router.put('/products/:id', adminMarketplaceController.updateProduct);
router.delete('/products/:id', adminMarketplaceController.deleteProduct);

// Services
router.get('/services', adminMarketplaceController.getAdminServices);
router.get('/services/:id', adminMarketplaceController.getAdminServiceById);
router.post('/services', adminMarketplaceController.createService);
router.put('/services/:id', adminMarketplaceController.updateService);
router.delete('/services/:id', adminMarketplaceController.deleteService);

// Marketplace Orders
router.get('/marketplace/orders', adminMarketplaceController.getAllOrders);
router.put('/marketplace/orders/:id', adminMarketplaceController.updateAdminOrderStatus);
router.get('/marketplace/stats', adminMarketplaceController.getStats);

// Customers
router.get('/customers', adminMarketplaceController.getCustomers);
router.get('/customers/:id', adminMarketplaceController.getCustomerById);

const upload = require('../middlewares/upload');
const uploadController = require('../controllers/uploadController');

// Uploads
router.post('/upload/files', upload.array('files'), uploadController.uploadMultiple);
router.post('/upload/image', upload.single('image'), uploadController.uploadImage);

// Profile
router.get('/profile', adminController.getProfile);
router.put('/profile', adminController.updateProfile);
router.post('/change-password', adminController.changePassword);
router.post('/upload-avatar', upload.single('avatar'), adminController.uploadAvatar);

module.exports = router;
