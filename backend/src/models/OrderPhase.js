const mongoose = require('mongoose');

const orderPhaseSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  phase_key: {
    type: String,
    required: true,
  },
  phase_name: {
    type: String,
    required: true,
  },
  phase_order: {
    type: Number,
    required: true,
  },
  weight_percent: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'awaiting_approval', 'completed', 'delayed'],
    default: 'pending'
  },
  started_at: Date,
  completed_at: Date,
  expected_completion: Date,
  delay_reason: String,
  admin_notes: String,
  submitted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('OrderPhase', orderPhaseSchema);
