const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  // Ticket reference
  ticketNumber: {
    type: String,
    unique: true
  },

  // Submitter info
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },

  // Ticket content
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['technical', 'billing', 'general', 'feedback', 'order', 'refund'],
    default: 'general'
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    maxlength: [5000, 'Message cannot exceed 5000 characters']
  },

  // Order reference (optional)
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },

  // Status tracking
  status: {
    type: String,
    enum: ['open', 'in-progress', 'awaiting-response', 'resolved', 'closed'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },

  // User reference (if logged in)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // Admin handling
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adminNotes: {
    type: String,
    maxlength: [2000, 'Admin notes cannot exceed 2000 characters']
  },

  // Response history
  responses: [{
    message: {
      type: String,
      required: true
    },
    sender: {
      type: String,
      enum: ['user', 'admin'],
      required: true
    },
    senderName: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],

  // Timestamps for tracking
  resolvedAt: Date,
  closedAt: Date,
  firstResponseAt: Date

}, {
  timestamps: true
});

// Generate ticket number before save
supportTicketSchema.pre('save', async function(next) {
  if (!this.ticketNumber) {
    const count = await mongoose.model('SupportTicket').countDocuments();
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    this.ticketNumber = `TKT-${year}${month}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

// Indexes for efficient querying
supportTicketSchema.index({ status: 1, createdAt: -1 });
supportTicketSchema.index({ email: 1 });

supportTicketSchema.index({ category: 1 });
supportTicketSchema.index({ user: 1 });

// Virtual for category display name
supportTicketSchema.virtual('categoryDisplay').get(function() {
  const categoryNames = {
    'technical': 'Technical Support',
    'billing': 'Billing & Payments',
    'general': 'General Inquiry',
    'feedback': 'Feedback',
    'order': 'Order Issue',
    'refund': 'Refund Request'
  };
  return categoryNames[this.category] || this.category;
});

supportTicketSchema.set('toJSON', { virtuals: true });
supportTicketSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
