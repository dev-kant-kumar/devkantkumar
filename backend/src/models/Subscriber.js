const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  source: {
    type: String,
    enum: ['products', 'services', 'general', 'homepage', 'footer', 'cart'],
    default: 'general'
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  emailsSentCount: {
    type: Number,
    default: 0
  },
  lastEmailSentAt: {
    type: Date
  }
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
