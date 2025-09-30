const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    itemType: {
      type: String,
      enum: ['product', 'service'],
      required: true
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'items.itemType'
    },
    title: {
      type: String,
      required: true
    },
    description: String,
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    // For services
    selectedPackage: {
      name: String,
      features: [String],
      deliveryTime: Number,
      revisions: String
    },
    // For products
    downloadLinks: [{
      name: String,
      url: String,
      expiresAt: Date
    }],
    licenseType: String
  }],
  billing: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: 'US'
      }
    },
    company: String
  },
  payment: {
    method: {
      type: String,
      enum: ['stripe', 'paypal', 'bank_transfer'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
      default: 'pending'
    },
    transactionId: String,
    paymentIntentId: String,
    amount: {
      subtotal: {
        type: Number,
        required: true,
        min: 0
      },
      tax: {
        type: Number,
        default: 0,
        min: 0
      },
      discount: {
        type: Number,
        default: 0,
        min: 0
      },
      total: {
        type: Number,
        required: true,
        min: 0
      }
    },
    currency: {
      type: String,
      default: 'USD'
    },
    paidAt: Date,
    refundedAt: Date,
    refundAmount: Number,
    refundReason: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  fulfillment: {
    status: {
      type: String,
      enum: ['pending', 'processing', 'delivered', 'failed'],
      default: 'pending'
    },
    deliveredAt: Date,
    trackingInfo: String,
    notes: String
  },
  communication: {
    messages: [{
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      message: String,
      timestamp: {
        type: Date,
        default: Date.now
      },
      attachments: [{
        name: String,
        url: String,
        size: Number
      }]
    }],
    lastMessageAt: Date
  },
  timeline: [{
    status: String,
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  metadata: {
    source: {
      type: String,
      default: 'website'
    },
    userAgent: String,
    ipAddress: String,
    referrer: String
  },
  notes: {
    customer: String,
    internal: String
  },
  estimatedDelivery: Date,
  actualDelivery: Date,
  isRushOrder: {
    type: Boolean,
    default: false
  },
  rushOrderFee: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for total items
orderSchema.virtual('totalItems').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for order age
orderSchema.virtual('orderAge').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for is overdue
orderSchema.virtual('isOverdue').get(function() {
  if (!this.estimatedDelivery) return false;
  return this.estimatedDelivery < new Date() && this.status !== 'completed';
});

// Indexes for better performance
orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ estimatedDelivery: 1 });

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${String(count + 1).padStart(6, '0')}`;

    // Add initial timeline entry
    this.timeline.push({
      status: 'created',
      message: 'Order created',
      timestamp: new Date()
    });
  }
  next();
});

// Method to add timeline entry
orderSchema.methods.addTimelineEntry = function(status, message, updatedBy) {
  this.timeline.push({
    status,
    message,
    timestamp: new Date(),
    updatedBy
  });
  return this.save();
};

// Method to update status
orderSchema.methods.updateStatus = function(newStatus, message, updatedBy) {
  this.status = newStatus;
  return this.addTimelineEntry(newStatus, message || `Order status updated to ${newStatus}`, updatedBy);
};

// Method to add message
orderSchema.methods.addMessage = function(sender, message, attachments = []) {
  this.communication.messages.push({
    sender,
    message,
    attachments,
    timestamp: new Date()
  });
  this.communication.lastMessageAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Order', orderSchema);
