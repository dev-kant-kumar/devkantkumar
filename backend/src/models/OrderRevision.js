const mongoose = require('mongoose');

const orderRevisionSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  revision_number: {
    type: Number,
    required: true,
  },
  requested_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  requested_at: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true,
  },
  attachment_urls: [String],
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'rejected_out_of_scope'],
    default: 'pending'
  },
  is_out_of_scope: {
    type: Boolean,
    default: false
  },
  out_of_scope_reason: String,
  credit_refunded: {
    type: Boolean,
    default: false
  },
  started_at: Date,
  completed_at: Date,
  admin_notes: String,
  change_summary: String,
  updated_file_urls: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('OrderRevision', orderRevisionSchema);
