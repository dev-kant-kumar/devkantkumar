const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a skill name'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Tools', 'Other']
  },
  level: {
    type: Number,
    required: [true, 'Please add a proficiency level'],
    min: 0,
    max: 100
  },
  icon: {
    type: String,
    default: ''
  },
  priority: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);
