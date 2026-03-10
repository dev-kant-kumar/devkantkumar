const express = require('express');
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get unread count (must come before parameterized routes)
router.get('/unread-count', notificationController.getUnreadCount);

// Get all notifications with pagination
router.get('/', notificationController.getNotifications);

// Mark all notifications as read (must come before /:id/read)
router.put('/mark-all-read', notificationController.markAllAsRead);

// Mark single notification as read
router.put('/:id/read', notificationController.markAsRead);

// Clear all notifications (must come before /:id)
router.delete('/clear-all', notificationController.clearAllNotifications);

// Delete single notification
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
