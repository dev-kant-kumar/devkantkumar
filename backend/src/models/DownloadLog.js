const mongoose = require('mongoose');

/**
 * DownloadLog Model
 * Tracks all download attempts for audit, analytics, and abuse detection
 */
const downloadLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    index: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true
  },
  orderItem: {
    type: mongoose.Schema.Types.ObjectId,
    description: 'Reference to the specific order item'
  },
  token: {
    type: String,
    required: true,
    index: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    default: 0
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    maxlength: 500
  },
  downloadedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  success: {
    type: Boolean,
    default: true
  },
  failureReason: {
    type: String,
    enum: ['expired', 'limit_exceeded', 'invalid_token', 'unauthorized', 'file_not_found', 'server_error'],
  },
  // For detecting abuse patterns
  sessionId: String,
  referrer: String,
  // Geographic info (optional - can be populated via IP lookup)
  country: String,
  city: String
}, {
  timestamps: true
});

// Indexes for efficient queries
downloadLogSchema.index({ user: 1, product: 1 });
downloadLogSchema.index({ downloadedAt: -1 });
downloadLogSchema.index({ ipAddress: 1, downloadedAt: -1 });

// Static method to get download stats for a product
downloadLogSchema.statics.getProductStats = async function(productId) {
  const stats = await this.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId), success: true } },
    {
      $group: {
        _id: null,
        totalDownloads: { $sum: 1 },
        uniqueUsers: { $addToSet: '$user' }
      }
    },
    {
      $project: {
        totalDownloads: 1,
        uniqueDownloaders: { $size: '$uniqueUsers' }
      }
    }
  ]);

  return stats[0] || { totalDownloads: 0, uniqueDownloaders: 0 };
};

// Static method to get download stats for a user
downloadLogSchema.statics.getUserDownloadHistory = async function(userId, options = {}) {
  const { limit = 50, skip = 0 } = options;

  return this.find({ user: userId, success: true })
    .sort({ downloadedAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate('product', 'title slug images')
    .populate('order', 'orderNumber');
};

// Static method to detect potential abuse (many downloads from different IPs)
downloadLogSchema.statics.detectAbuse = async function(token, timeWindowHours = 24) {
  const since = new Date(Date.now() - timeWindowHours * 60 * 60 * 1000);

  const stats = await this.aggregate([
    {
      $match: {
        token,
        downloadedAt: { $gte: since },
        success: true
      }
    },
    {
      $group: {
        _id: null,
        uniqueIPs: { $addToSet: '$ipAddress' },
        downloadCount: { $sum: 1 }
      }
    },
    {
      $project: {
        uniqueIPCount: { $size: '$uniqueIPs' },
        downloadCount: 1
      }
    }
  ]);

  const result = stats[0] || { uniqueIPCount: 0, downloadCount: 0 };

  // Flag as suspicious if more than 3 unique IPs used the same token
  return {
    ...result,
    isSuspicious: result.uniqueIPCount > 3
  };
};

module.exports = mongoose.model('DownloadLog', downloadLogSchema);
