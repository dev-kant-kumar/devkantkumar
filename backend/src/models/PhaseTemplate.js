const mongoose = require('mongoose');

const phaseTemplateSchema = new mongoose.Schema({
  service_type: {
    type: String,
    required: true,
  },
  phase_key: {
    type: String, // 'requirements_gathering', 'legal_documentation', etc
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
  expected_duration_days: {
    type: Number,
    default: 1,
  },
  requires_customer_approval: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PhaseTemplate', phaseTemplateSchema);
