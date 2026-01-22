const Notification = require('../models/Notification');
const logger = require('../utils/logger');

/**
 * Get notifications for authenticated user with pagination
 */
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      page = 1,
      limit = 20,
      unreadOnly = false,
      type
    } = req.query;

    const result = await Notification.getForUser(userId, {
      page: parseInt(page),
      limit: parseInt(limit),
      unreadOnly: unreadOnly === 'true',
      type: type || null
    });

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    logger.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications'
    });
  }
};

/**
 * Get unread notification count
 */
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await Notification.getUnreadCount(userId);

    res.json({
      success: true,
      count
    });
  } catch (error) {
    logger.error('Error fetching unread count:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch unread count'
    });
  }
};

/**
 * Mark a single notification as read
 */
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, recipient: userId },
      { read: true, readAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      notification
    });
  } catch (error) {
    logger.error('Error marking notification as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read'
    });
  }
};

/**
 * Mark all notifications as read
 */
exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await Notification.markAllAsRead(userId);

    res.json({
      success: true,
      message: 'All notifications marked as read',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    logger.error('Error marking all as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark all as read'
    });
  }
};

/**
 * Delete a single notification
 */
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOneAndDelete({
      _id: id,
      recipient: userId
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      message: 'Notification deleted'
    });
  } catch (error) {
    logger.error('Error deleting notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification'
    });
  }
};

/**
 * Clear all notifications
 */
exports.clearAllNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await Notification.deleteMany({ recipient: userId });

    res.json({
      success: true,
      message: 'All notifications cleared',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    logger.error('Error clearing notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear notifications'
    });
  }
};

/**
 * Get notification statistics (for admin dashboard)
 */
exports.getNotificationStats = async (req, res) => {
  try {
    const [totalCount, unreadCount, typeBreakdown] = await Promise.all([
      Notification.countDocuments({}),
      Notification.countDocuments({ read: false }),
      Notification.aggregate([
        { $group: { _id: '$type', count: { $sum: 1 } } }
      ])
    ]);

    res.json({
      success: true,
      stats: {
        total: totalCount,
        unread: unreadCount,
        byType: typeBreakdown.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    logger.error('Error fetching notification stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notification stats'
    });
  }
};
