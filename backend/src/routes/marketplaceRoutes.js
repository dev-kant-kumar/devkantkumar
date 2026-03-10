const express = require("express");
const marketplaceController = require("../controllers/marketplaceController");
const quoteController = require("../controllers/quoteController");
const supportController = require("../controllers/supportController");
const { protect, optionalAuth } = require("../middlewares/auth");

const reviewRouter = require("./reviewRoutes");

const router = express.Router();

// Mount review routes
router.use("/products/:productId/reviews", reviewRouter);
router.use("/services/:serviceId/reviews", reviewRouter);

// Public routes
router.get("/services", marketplaceController.getServices);
router.get("/services/:id", marketplaceController.getServiceById);
router.get("/products", marketplaceController.getProducts);
router.get("/products/:id", marketplaceController.getProductById);
router.get("/categories", marketplaceController.getCategories);
router.get("/search", marketplaceController.search);
router.post("/payment/webhook", marketplaceController.handleRazorpayWebhook);

// Quote request (public - no auth required)
router.post("/quote-request", quoteController.submitQuote);

// Support (public, but optionalAuth to link logged-in users)
router.get("/support/settings", supportController.getSupportSettings);
router.post("/support", optionalAuth, supportController.submitTicket);

// Protected routes
router.use(protect);

// User support tickets (authenticated — chat system)
router.get("/support/my-tickets", supportController.getMyTickets);
router.get("/support/my-tickets/:id", supportController.getMyTicketById);
router.post("/support/my-tickets/:id/reply", supportController.replyToTicket);

// Cart routes - DEPRECATED: Use /api/v1/cart via cartRoutes instead
// These are kept for backward compatibility if needed, but should be phased out
// router.get('/cart', marketplaceController.getCart);
// router.post('/cart/add', marketplaceController.addToCart);
// router.put('/cart/update', marketplaceController.updateCartItem);
// router.delete('/cart/remove/:itemId', marketplaceController.removeFromCart);
// router.delete('/cart/clear', marketplaceController.clearCart);

// Order routes
router.post("/orders", marketplaceController.createOrder);
router.get("/orders", marketplaceController.getUserOrders);
router.get("/orders/:id", marketplaceController.getOrderById);
router.post("/orders/:id/revision", marketplaceController.requestRevision);
router.post(
  "/orders/:id/approve-delivery",
  marketplaceController.approveDelivery,
);
router.post(
  "/orders/:id/requirements",
  marketplaceController.submitRequirements,
);

// Order Communication routes
router.get("/orders/:orderId/messages", marketplaceController.getOrderMessages);
router.post("/orders/:orderId/messages", marketplaceController.addOrderMessage);

// Payment routes
router.post("/payment/create-order", marketplaceController.createRazorpayOrder);
router.post("/payment/verify", marketplaceController.verifyRazorpayPayment);

// Download routes
router.get(
  "/orders/:orderId/items/:itemId/download",
  marketplaceController.downloadPurchasedItem,
);
router.post(
  "/orders/:orderId/regenerate/:itemId",
  marketplaceController.regenerateDownloadLinks,
);

// Invoice routes
router.get("/orders/:orderId/invoice", marketplaceController.downloadInvoice);
router.post(
  "/orders/:orderId/invoice/send",
  marketplaceController.sendInvoiceByEmail,
);

// Review routes

module.exports = router;
