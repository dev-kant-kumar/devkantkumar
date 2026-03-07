const mongoose = require('mongoose');

const orderPhaseDeliverableSchema = new mongoose.Schema({
  order_phase_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderPhase',
    required: true,
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  submitted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  submitted_at: Date,
  status: {
    type: String,
    enum: ['draft', 'submitted'],
    default: 'draft'
  },
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('OrderPhaseDeliverable', orderPhaseDeliverableSchema);
