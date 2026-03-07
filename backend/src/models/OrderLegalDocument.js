const mongoose = require('mongoose');

const orderLegalDocumentSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  document_type: {
    type: String,
    enum: ['nda', 'sow', 'ip_transfer', 'tos', 'revision_policy', 'change_order', 'completion_certificate'],
    required: true,
  },
  document_url: String,
  version: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['generated', 'sent', 'signed', 'expired'],
    default: 'generated'
  },
  sent_at: Date,
  signed_at: Date,
  signed_by_customer: {
    type: Boolean,
    default: false
  },
  signed_by_provider: {
    type: Boolean,
    default: false
  },
  portfolio_use_permitted: {
    type: Boolean,
    default: true
  },
  expires_at: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('OrderLegalDocument', orderLegalDocumentSchema);
