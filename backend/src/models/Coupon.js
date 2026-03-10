const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Coupon code is required'],
    unique: true,
    uppercase: true,
    trim: true,
    minlength: [3, 'Code must be at least 3 characters'],
    maxlength: [20, 'Code cannot exceed 20 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: [true, 'Discount type is required']
  },
  discountValue: {
    type: Number,
    required: [true, 'Discount value is required'],
    min: [0, 'Discount value must be positive']
  },
  // For percentage discount - max amount that can be discounted
  maxDiscount: {
    type: Number,
    default: null,
    min: 0
  },
  // Minimum order amount to apply coupon
  minOrderAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  // Usage limits
  maxUses: {
    type: Number,
    default: null  // null = unlimited
  },
  usedCount: {
    type: Number,
    default: 0,
    min: 0
  },
  maxUsesPerCustomer: {
    type: Number,
    default: 1,
    min: 1
  },
  // Validity period
  validFrom: {
    type: Date,
    required: [true, 'Valid from date is required']
  },
  validUntil: {
    type: Date,
    required: [true, 'Valid until date is required']
  },
  // Product/Service specific
  applicableProductIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  applicableServiceIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    }
  ],
  // If false, applies to specific products/services only
  applicableToAll: {
    type: Boolean,
    default: true
  },
  // Usage tracking
  usedByUsers: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      orderId: mongoose.Schema.Types.ObjectId,
      usedAt: { type: Date, default: Date.now },
      discountApplied: Number
    }
  ],
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for fast lookup
couponSchema.index({ isActive: 1, validUntil: 1 });
couponSchema.index({ validFrom: 1, validUntil: 1 });

// Instance method to validate coupon
couponSchema.methods.isValid = function(userId, orderTotal) {
  const now = new Date();

  // Check if expired
  if (now > this.validUntil || now < this.validFrom) {
    return { valid: false, reason: 'Coupon has expired' };
  }

  // Check if inactive
  if (!this.isActive) {
    return { valid: false, reason: 'Coupon is currently inactive' };
  }

  // Check max uses
  if (this.maxUses && this.usedCount >= this.maxUses) {
    return { valid: false, reason: 'Coupon usage limit has been exceeded' };
  }

  // Check user usage limit
  if (userId) {
    const userUsageCount = this.usedByUsers.filter(u =>
      u.userId && u.userId.toString() === userId.toString()
    ).length;
    if (userUsageCount >= this.maxUsesPerCustomer) {
      return { valid: false, reason: `You can only use this coupon ${this.maxUsesPerCustomer} time(s)` };
    }
  }

  // Check minimum order amount
  if (orderTotal < this.minOrderAmount) {
    return { valid: false, reason: `Minimum order amount required: ₹${this.minOrderAmount}` };
  }

  return { valid: true };
};

// Instance method to calculate discount
couponSchema.methods.calculateDiscount = function(orderTotal) {
  let discount = 0;

  if (this.discountType === 'percentage') {
    discount = (orderTotal * this.discountValue) / 100;
    // Apply max discount limit if set
    if (this.maxDiscount) {
      discount = Math.min(discount, this.maxDiscount);
    }
  } else if (this.discountType === 'fixed') {
    discount = Math.min(this.discountValue, orderTotal);
  }

  return Math.round(discount * 100) / 100; // Round to 2 decimals
};

// Instance method to mark coupon as used
couponSchema.methods.markAsUsed = function(userId, orderId, discountAmount) {
  this.usedByUsers.push({
    userId,
    orderId,
    discountApplied: discountAmount
  });
  this.usedCount += 1;
  return this.save();
};

// Pre-save validation
couponSchema.pre('save', function(next) {
  // Ensure validUntil is after validFrom
  if (this.validUntil <= this.validFrom) {
    next(new Error('Valid until date must be after valid from date'));
  }

  // If discountType is percentage, validate value
  if (this.discountType === 'percentage' && (this.discountValue < 0 || this.discountValue > 100)) {
    next(new Error('Percentage discount must be between 0 and 100'));
  }

  next();
});

module.exports = mongoose.model('Coupon', couponSchema);
