const mongoose = require('mongoose');

const quoteRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  company: {
    type: String,
    trim: true,
    maxlength: [200, 'Company name cannot exceed 200 characters']
  },
  projectType: {
    type: String,
    required: [true, 'Please select a project type'],
    enum: {
      values: ['web-app', 'mobile-app', 'desktop-app', 'api', 'cloud', 'security', 'other'],
      message: 'Invalid project type'
    }
  },
  budget: {
    type: String,
    required: [true, 'Please select a budget range'],
    enum: {
      values: ['5000-15000', '15000-50000', '50000-100000', '100000+'],
      message: 'Invalid budget range'
    }
  },
  timeline: {
    type: String,
    required: [true, 'Please select a timeline'],
    enum: {
      values: ['1-2', '3-6', '6-12', 'flexible'],
      message: 'Invalid timeline'
    }
  },
  features: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    required: [true, 'Please provide a project description'],
    trim: true,
    minlength: [20, 'Description must be at least 20 characters'],
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'in-progress', 'proposal-sent', 'completed', 'rejected'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  adminNotes: {
    type: String,
    trim: true,
    maxlength: [2000, 'Notes cannot exceed 2000 characters']
  },
  estimatedValue: {
    type: Number,
    min: 0
  },
  contactedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
quoteRequestSchema.index({ status: 1 });
quoteRequestSchema.index({ createdAt: -1 });
quoteRequestSchema.index({ email: 1 });
quoteRequestSchema.index({ priority: 1 });

// Virtual for display-friendly budget
quoteRequestSchema.virtual('budgetDisplay').get(function() {
  const budgetMap = {
    '5000-15000': '$5,000 - $15,000',
    '15000-50000': '$15,000 - $50,000',
    '50000-100000': '$50,000 - $100,000',
    '100000+': '$100,000+'
  };
  return budgetMap[this.budget] || this.budget;
});

// Virtual for display-friendly timeline
quoteRequestSchema.virtual('timelineDisplay').get(function() {
  const timelineMap = {
    '1-2': '1-2 months',
    '3-6': '3-6 months',
    '6-12': '6-12 months',
    'flexible': 'Flexible'
  };
  return timelineMap[this.timeline] || this.timeline;
});

// Virtual for display-friendly project type
quoteRequestSchema.virtual('projectTypeDisplay').get(function() {
  const typeMap = {
    'web-app': 'Web Application',
    'mobile-app': 'Mobile Application',
    'desktop-app': 'Desktop Application',
    'api': 'API Development',
    'cloud': 'Cloud Solutions',
    'security': 'Security Solutions',
    'other': 'Other'
  };
  return typeMap[this.projectType] || this.projectType;
});

// Ensure virtuals are included in JSON
quoteRequestSchema.set('toJSON', { virtuals: true });
quoteRequestSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('QuoteRequest', quoteRequestSchema);
