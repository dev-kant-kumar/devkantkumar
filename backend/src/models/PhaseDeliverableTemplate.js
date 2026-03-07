const mongoose = require('mongoose');

const phaseDeliverableTemplateSchema = new mongoose.Schema({
  phase_template_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhaseTemplate',
    required: true
  },
  label: {
    type: String,
    required: true
  },
  deliverable_type: {
    type: String,
    enum: ['file', 'link', 'checkbox', 'text'],
    required: true
  },
  is_required: {
    type: Boolean,
    default: false
  },
  display_order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PhaseDeliverableTemplate', phaseDeliverableTemplateSchema);
