const mongoose = require('mongoose');

// ==========================================
// Notification Schema
// ==========================================

const notificationSchema = new mongoose.Schema({
  // Recipient of the notification
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  // Who triggered the notification (optional, for user actions)
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // Role of the recipient for filtering
  recipientRole: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    index: true
  },

  // Notification type for categorization and icons
  type: {
    type: String,
    enum: [
      'order_created',      // New order placed (admin)
      'order_status',       // Order status updated (user)
      'order_completed',    // Order delivered (user)
      'payment_received',   // Payment successful (admin)
      'payment_failed',     // Payment failed (user)
      'support_ticket',     // New support ticket (admin)
      'support_response',   // Support response (user)
      'quote_request',      // New quote submitted (admin)
      'quote_response',     // Quote responded (user)
      'message',            // New message received
      'system',             // System notifications (password, email changes)
      'announcement',       // Admin broadcast to all users
      'product_update',     // Product updated (user who purchased)
      'service_update',     // Service updated (user who purchased)
      'welcome'             // Welcome notification for new users
    ],
    required: true,
    index: true
  },

  // Notification title
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },

  // Notification message/body
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },

  // Additional data for context (orderId, ticketId, etc.)
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

  // Clickable navigation link
  link: {
    type: String,
    trim: true
  },

  // Priority level
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },

  // Read status
  read: {
    type: Boolean,
    default: false,
    index: true
  },

  // When it was read
  readAt: {
    type: Date
  },

  // Whether notification was delivered via email
  emailSent: {
    type: Boolean,
    default: false
  },

  // Whether notification was delivered via push
  pushSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ==========================================
// Indexes
// ==========================================

// Compound index for fetching user notifications
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, read: 1, createdAt: -1 });
notificationSchema.index({ recipientRole: 1, createdAt: -1 });

// TTL index to auto-delete old notifications after 90 days
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

// ==========================================
// Static Methods
// ==========================================

// Get unread count for a user
notificationSchema.statics.getUnreadCount = async function(userId) {
  return this.countDocuments({ recipient: userId, read: false });
};

// Mark all as read for a user
notificationSchema.statics.markAllAsRead = async function(userId) {
  return this.updateMany(
    { recipient: userId, read: false },
    { read: true, readAt: new Date() }
  );
};

// Get notifications for a user with pagination
notificationSchema.statics.getForUser = async function(userId, options = {}) {
  const {
    page = 1,
    limit = 20,
    unreadOnly = false,
    type = null
  } = options;

  const query = { recipient: userId };

  if (unreadOnly) {
    query.read = false;
  }

  if (type) {
    query.type = type;
  }

  const skip = (page - 1) * limit;

  const [notifications, total] = await Promise.all([
    this.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('sender', 'firstName lastName avatar')
      .lean(),
    this.countDocuments(query)
  ]);

  return {
    notifications,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasMore: skip + notifications.length < total
    }
  };
};

// Create notification and return populated version
notificationSchema.statics.createAndPopulate = async function(notificationData) {
  const notification = await this.create(notificationData);
  return this.findById(notification._id)
    .populate('sender', 'firstName lastName avatar')
    .lean();
};

module.exports = mongoose.model('Notification', notificationSchema);
