const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  // Recipient information
  to: {
    type: String,
    required: true,
    index: true
  },

  // Sender information
  from: {
    type: String,
    required: true
  },

  // Email content
  subject: {
    type: String,
    required: true
  },

  // Email type (maps to job name from queue)
  type: {
    type: String,
    required: true,
    enum: [
      'verification-email',
      'password-reset-email',
      'email-change-otp',
      'password-change-otp',
      'order-confirmation-email',
      'payment-receipt',
      'refund-notification',
      'contact-admin-notification',
      'contact-user-auto-reply',
      'newsletter-welcome-email',
      'newsletter-update',
      'generic-email'
    ],
    index: true
  },

  // Delivery status
  status: {
    type: String,
    enum: ['pending', 'processing', 'sent', 'failed'],
    default: 'pending',
    index: true
  },

  // Queue job information
  jobId: {
    type: String,
    index: true
  },

  // Retry tracking
  attempts: {
    type: Number,
    default: 0
  },
  maxAttempts: {
    type: Number,
    default: 3
  },

  // Error information (for failed emails)
  error: {
    message: String,
    code: String,
    stack: String
  },

  // Timestamps
  queuedAt: {
    type: Date,
    default: Date.now
  },
  processedAt: Date,
  sentAt: Date,
  failedAt: Date,

  // Additional metadata
  metadata: {
    // IP address if available
    ip: String,
    // User agent if available
    userAgent: String,
    // User ID if associated with a user action
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    // Any additional context
    context: mongoose.Schema.Types.Mixed
  },

  // Email content preview (truncated for storage efficiency)
  htmlPreview: {
    type: String,
    maxlength: 500
  },

  // Response from mail server
  serverResponse: {
    messageId: String,
    response: String
  }
}, {
  timestamps: true
});

// Compound indexes for efficient querying
emailLogSchema.index({ status: 1, createdAt: -1 });
emailLogSchema.index({ type: 1, status: 1 });
emailLogSchema.index({ to: 1, createdAt: -1 });

// Static methods for statistics
emailLogSchema.statics.getStats = async function(dateRange = {}) {
  const match = {};

  if (dateRange.start || dateRange.end) {
    match.createdAt = {};
    if (dateRange.start) match.createdAt.$gte = new Date(dateRange.start);
    if (dateRange.end) match.createdAt.$lte = new Date(dateRange.end);
  }

  const [overview, byType, byStatus, recent] = await Promise.all([
    // Overall counts
    this.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          sent: { $sum: { $cond: [{ $eq: ['$status', 'sent'] }, 1, 0] } },
          failed: { $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] } },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
          processing: { $sum: { $cond: [{ $eq: ['$status', 'processing'] }, 1, 0] } }
        }
      }
    ]),

    // By type breakdown
    this.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          sent: { $sum: { $cond: [{ $eq: ['$status', 'sent'] }, 1, 0] } },
          failed: { $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] } }
        }
      },
      { $sort: { count: -1 } }
    ]),

    // By status breakdown
    this.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]),

    // Recent activity (last 7 days by day)
    this.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          total: { $sum: 1 },
          sent: { $sum: { $cond: [{ $eq: ['$status', 'sent'] }, 1, 0] } },
          failed: { $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ])
  ]);

  const stats = overview[0] || { total: 0, sent: 0, failed: 0, pending: 0, processing: 0 };

  return {
    overview: {
      total: stats.total,
      sent: stats.sent,
      failed: stats.failed,
      pending: stats.pending,
      processing: stats.processing,
      successRate: stats.total > 0 ? ((stats.sent / stats.total) * 100).toFixed(1) : 0
    },
    byType,
    byStatus,
    recentActivity: recent
  };
};

// Instance method to mark as sent
emailLogSchema.methods.markAsSent = async function(serverResponse) {
  this.status = 'sent';
  this.sentAt = new Date();
  this.serverResponse = serverResponse;
  return this.save();
};

// Instance method to mark as failed
emailLogSchema.methods.markAsFailed = async function(error) {
  this.status = 'failed';
  this.failedAt = new Date();
  this.error = {
    message: error.message,
    code: error.code,
    stack: error.stack
  };
  return this.save();
};

module.exports = mongoose.model('EmailLog', emailLogSchema);
