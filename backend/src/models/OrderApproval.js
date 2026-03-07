const mongoose = require('mongoose');

const orderApprovalSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  order_phase_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderPhase',
    required: true,
  },
  approval_type: {
    type: String,
    enum: ['design_approval', 'delivery_acceptance'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'auto_approved'],
    default: 'pending'
  },
  requested_at: Date,
  responded_at: Date,
  auto_approved_at: Date,
  customer_notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('OrderApproval', orderApprovalSchema);
