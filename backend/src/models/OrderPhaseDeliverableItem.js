const mongoose = require('mongoose');

const orderPhaseDeliverableItemSchema = new mongoose.Schema({
  order_phase_deliverable_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderPhaseDeliverable',
    required: true,
  },
  template_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhaseDeliverableTemplate',
  },
  label: {
    type: String,
    required: true,
  },
  value_text: String,
  value_file_url: String,
  value_link: String,
  value_checked: Boolean,
  is_completed: {
    type: Boolean,
    default: false
  },
  uploaded_at: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('OrderPhaseDeliverableItem', orderPhaseDeliverableItemSchema);
