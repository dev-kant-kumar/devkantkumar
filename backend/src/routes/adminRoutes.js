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
const settingsController = require('../controllers/settingsController');

// System settings
router.get('/settings', settingsController.getSettings);
router.put('/settings', settingsController.updateSettings);
router.get('/settings/general', settingsController.getSettings);
router.put('/settings/general', settingsController.updateSettings);
router.get('/settings/seo', settingsController.getSettings);
router.put('/settings/seo', settingsController.updateSettings);

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
router.get('/marketplace/orders/:id', adminMarketplaceController.getOrderById);
router.put('/marketplace/orders/:id', adminMarketplaceController.updateAdminOrderStatus);
router.post('/marketplace/orders/:id/milestones', adminMarketplaceController.addMilestone);
router.put('/marketplace/orders/:id/milestones/:milestoneId', adminMarketplaceController.updateMilestone);
router.post('/marketplace/orders/:id/messages', adminMarketplaceController.addAdminMessage);
router.post('/marketplace/orders/:id/deliver', adminMarketplaceController.markDelivered);
router.get('/marketplace/stats', adminMarketplaceController.getStats);

// Customers
router.get('/customers', adminMarketplaceController.getCustomers);
router.get('/customers/:id', adminMarketplaceController.getCustomerById);

// Quote Requests
const quoteController = require('../controllers/quoteController');
router.get('/marketplace/quotes/stats', quoteController.getQuoteStats);
router.get('/marketplace/quotes', quoteController.getAllQuotes);
router.get('/marketplace/quotes/:id', quoteController.getQuoteById);
router.put('/marketplace/quotes/:id', quoteController.updateQuote);
router.delete('/marketplace/quotes/:id', quoteController.deleteQuote);

// Support Tickets
const supportController = require('../controllers/supportController');
router.get('/support/stats', supportController.getStats);
router.get('/support/tickets', supportController.getAllTickets);
router.get('/support/tickets/:id', supportController.getTicketById);
router.put('/support/tickets/:id', supportController.updateTicket);
router.post('/support/tickets/:id/respond', supportController.respondToTicket);
router.delete('/support/tickets/:id', supportController.deleteTicket);

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
router.post('/email-update/initiate', adminController.initiateEmailChange);
router.post('/email-update/verify', adminController.verifyEmailChangeOTP);

// Password Change
router.post('/password-change/initiate', adminController.initiatePasswordChange);
router.post('/password-change/verify', adminController.verifyPasswordChangeOTP);

// --- EMAIL TRACKING ---
const emailTrackingController = require('../controllers/emailTrackingController');

router.get('/emails/stats', emailTrackingController.getEmailStats);
router.get('/emails/types', emailTrackingController.getEmailTypes);
router.get('/emails', emailTrackingController.getEmailLogs);
router.get('/emails/:id', emailTrackingController.getEmailById);
router.post('/emails/:id/retry', emailTrackingController.retryEmail);
router.delete('/emails/cleanup', emailTrackingController.cleanupOldLogs);

const adminEmailController = require('../controllers/adminEmailController');

// ... existing code ...

// Email Templates
// Email Templates
router.get('/email-templates', adminEmailController.getTemplates);
router.post('/email-templates/preview', adminEmailController.previewTemplate);

module.exports = router;
