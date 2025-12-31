const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
    index: true
  },
  ip: {
    type: String,
    select: false // Privacy: Hide IP from normal queries
  },
  userAgent: String,
  referrer: String,
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Index for aggregation performance
visitSchema.index({ path: 1, timestamp: -1 });

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
