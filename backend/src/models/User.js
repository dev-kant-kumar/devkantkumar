const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==========================================
// Sub-Schemas
// ==========================================

const SocialLinksSchema = new mongoose.Schema({
  linkedin: { type: String, trim: true },
  github: { type: String, trim: true },
  twitter: { type: String, trim: true },
  instagram: { type: String, trim: true }
}, { _id: false });

const AddressSchema = new mongoose.Schema({
  street: { type: String, trim: true, required: true },
  city: { type: String, trim: true, required: true },
  state: { type: String, trim: true, required: true },
  zipCode: { type: String, trim: true, required: true },
  country: { type: String, trim: true, required: true },
  isDefault: { type: Boolean, default: false },
  addressType: {
    type: String,
    enum: ['shipping', 'billing'],
    default: 'shipping'
  }
});

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  type: {
    type: String,
    enum: ['product', 'service'],
    default: 'product',
    required: true
  },
  packageName: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    min: 1,
    default: 1
  }
});

const PreferencesSchema = new mongoose.Schema({
  newsletter: { type: Boolean, default: true },
  notifications: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true }
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'auto'
  }
}, { _id: false });

// ==========================================
// Main User Schema
// ==========================================

const userSchema = new mongoose.Schema({
  // --- Identity ---
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    index: true
  },
  avatar: {
    public_id: String,
    url: String
  },

  // --- Authentication & Security ---
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,

  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,

  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date,
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },

  // --- Profile Details ---
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say']
  },
  dateOfBirth: Date,

  profile: {
    bio: { type: String, maxlength: 500 },
    title: { type: String, maxlength: 100 },
    website: String,
    location: String,
    company: String,
    phone: String,
    socialLinks: { type: SocialLinksSchema, default: {} }
  },

  preferences: {
    type: PreferencesSchema,
    default: () => ({})
  },

  // --- Marketplace: Customer ---
  addresses: [AddressSchema],

  cart: {
    items: [CartItemSchema],
    updatedAt: { type: Date, default: Date.now }
  },

  // --- Marketplace: Activity Stats ---
  marketplace: {
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    favoriteProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    favoriteServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ==========================================
// Virtuals & Indexes
// ==========================================

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Compound Indexes if needed
userSchema.index({ createdAt: -1 });

// ==========================================
// Middleware
// ==========================================

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ==========================================
// Methods
// ==========================================

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d' } // Default to 30d if env not set
  );
};

// Method to increment login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };

  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }

  return this.updateOne(updates);
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

module.exports = mongoose.model('User', userSchema);
