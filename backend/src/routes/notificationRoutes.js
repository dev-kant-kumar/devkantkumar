const express = require('express');
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all notifications with pagination
router.get('/', notificationController.getNotifications);

// Get unread count
router.get('/unread-count', notificationController.getUnreadCount);

// Mark single notification as read
router.put('/:id/read', notificationController.markAsRead);

// Mark all notifications as read
router.put('/mark-all-read', notificationController.markAllAsRead);

// Delete single notification
router.delete('/:id', notificationController.deleteNotification);

// Clear all notifications
router.delete('/clear-all', notificationController.clearAllNotifications);

module.exports = router;
