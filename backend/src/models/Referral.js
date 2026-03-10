const mongoose = require('mongoose');

// ==========================================
// Sub-Schemas
// ==========================================

const ReferralConversionSchema = new mongoose.Schema({
  referredUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  referredUserEmail: {
    type: String,
    trim: true
  },
  referredUserName: {
    type: String,
    trim: true
  },
  // Order that triggered the commission (first paid order)
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  orderAmount: {
    type: Number,
    default: 0
  },
  commissionAmount: {
    type: Number,
    default: 0
  },
  commissionRate: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'paid', 'cancelled'],
    default: 'pending'
  },
  // Signed up via referral link but hasn't ordered yet
  signedUpAt: {
    type: Date,
    default: Date.now
  },
  // First order placed
  convertedAt: Date,
  // Commission paid out
  paidAt: Date
}, { _id: true });

const PayoutRequestSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: [1, 'Payout amount must be at least ₹1']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'paid'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['bank_transfer', 'upi', 'paypal'],
    required: true
  },
  paymentDetails: {
    accountName: String,
    accountNumber: String,
    ifsc: String,
    upiId: String,
    paypalEmail: String
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  processedAt: Date,
  adminNote: String,
  transactionId: String
}, { _id: true });

// ==========================================
// Main Referral Schema
// ==========================================

const referralSchema = new mongoose.Schema({
  // The referring user
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  // Unique referral code for this user
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    index: true
  },
  // Program settings at time of referral
  commissionRate: {
    type: Number,
    default: 10, // percentage
    min: 0,
    max: 100
  },
  // Stats
  totalReferrals: {
    type: Number,
    default: 0
  },
  totalConversions: {
    type: Number,
    default: 0
  },
  totalEarned: {
    type: Number,
    default: 0
  },
  totalPaid: {
    type: Number,
    default: 0
  },
  pendingBalance: {
    type: Number,
    default: 0
  },
  availableBalance: {
    type: Number,
    default: 0
  },
  // Conversion tracking
  conversions: [ReferralConversionSchema],
  // Payout history
  payoutRequests: [PayoutRequestSchema],
  // Link to the referral program settings
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
referralSchema.index({ 'conversions.referredUser': 1 });
referralSchema.index({ 'conversions.status': 1 });

// ==========================================
// Static Methods
// ==========================================

// Generate a unique referral code for a user
referralSchema.statics.generateCode = async function(userId) {
  const base = userId.toString().slice(-6).toUpperCase();
  const maxAttempts = 10;

  for (let i = 0; i < maxAttempts; i++) {
    const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const code = `REF-${base}${suffix}`;
    const existing = await this.findOne({ code });
    if (!existing) return code;
  }

  // Fallback: use a longer random segment to virtually guarantee uniqueness
  const fallback = `REF-${Date.now().toString(36).toUpperCase().slice(-8)}`;
  const exists = await this.findOne({ code: fallback });
  if (exists) {
    throw new Error('Could not generate a unique referral code. Please try again.');
  }
  return fallback;
};

module.exports = mongoose.model('Referral', referralSchema);
