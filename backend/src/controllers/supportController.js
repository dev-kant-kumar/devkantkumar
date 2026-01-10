const SupportTicket = require('../models/SupportTicket');
const SystemSetting = require('../models/SystemSetting');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

/**
 * @desc    Submit a support ticket (public)
 * @route   POST /api/v1/marketplace/support
 * @access  Public
 */
exports.submitTicket = catchAsync(async (req, res, next) => {
  const { name, email, category, subject, message, orderId } = req.body;

  // Validate required fields
  if (!name || !email || !category || !subject || !message) {
    return next(new AppError('Please provide all required fields', 400));
  }

  // Create ticket
  const ticket = await SupportTicket.create({
    name,
    email,
    category,
    subject,
    message,
    orderId: orderId || undefined,
    user: req.user?._id || undefined
  });

  res.status(201).json({
    status: 'success',
    message: `Your support ticket ${ticket.ticketNumber} has been submitted. We will respond within 24 hours.`,
    data: {
      ticketNumber: ticket.ticketNumber,
      subject: ticket.subject,
      category: ticket.categoryDisplay,
      status: ticket.status
    }
  });
});

/**
 * @desc    Get support page settings (FAQs, contact info)
 * @route   GET /api/v1/marketplace/support/settings
 * @access  Public
 */
exports.getSupportSettings = catchAsync(async (req, res, next) => {
  const settings = await SystemSetting.getSettings();

  // Get FAQs (you could store these in DB but for now we return static ones)
  const faqs = [
    {
      category: 'General',
      question: 'How do I purchase a digital product?',
      answer: 'You can purchase digital products by browsing our marketplace, selecting the product you want, adding it to cart, and completing the secure checkout process.'
    },
    {
      category: 'Technical',
      question: 'What file formats do you provide?',
      answer: 'We provide various file formats depending on the product type, including source code files, documentation, and deployment guides. Each product page lists the included formats.'
    },
    {
      category: 'Billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, UPI, net banking, and various digital wallets through our secure Razorpay payment gateway.'
    },
    {
      category: 'Technical',
      question: 'Do you provide source code?',
      answer: 'Yes, most of our products include full source code. This is clearly indicated on each product page under the "What\'s Included" section.'
    },
    {
      category: 'General',
      question: 'Can I get a refund?',
      answer: 'We offer a 7-day money-back guarantee for digital products if they don\'t work as described. Contact our support team with your order details for assistance.'
    },
    {
      category: 'Technical',
      question: 'Do you provide technical support?',
      answer: 'Yes, we provide technical support for all our products. Submit a support ticket and our team will assist you within 24 hours.'
    },
    {
      category: 'Billing',
      question: 'How do I download my purchased products?',
      answer: 'After successful payment, you\'ll receive download links via email. You can also access all your purchases from your account dashboard.'
    },
    {
      category: 'General',
      question: 'Do you offer custom development services?',
      answer: 'Yes! We offer custom development services. Visit our Custom Solutions page to request a quote for your project.'
    }
  ];

  // Contact info from settings or defaults
  const contactInfo = {
    email: settings.general?.supportEmail || 'support@devkantkumar.com',
    phone: settings.support?.phone || '+91 8873754827',
    supportHours: settings.support?.hours || 'Mon-Fri: 10AM-7PM IST'
  };

  // Quick help resources
  const resources = [
    {
      title: 'Documentation',
      description: 'Comprehensive guides and API documentation',
      link: '/docs',
      icon: 'book'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      link: '/tutorials',
      icon: 'video'
    },
    {
      title: 'Knowledge Base',
      description: 'Searchable articles and solutions',
      link: '/kb',
      icon: 'file'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      link: '/community',
      icon: 'users'
    }
  ];

  res.status(200).json({
    status: 'success',
    data: {
      faqs,
      contactInfo,
      resources,
      categories: [
        { id: 'technical', name: 'Technical Support' },
        { id: 'billing', name: 'Billing & Payments' },
        { id: 'general', name: 'General Inquiry' },
        { id: 'feedback', name: 'Feedback' },
        { id: 'order', name: 'Order Issue' },
        { id: 'refund', name: 'Refund Request' }
      ]
    }
  });
});

// ============= ADMIN ENDPOINTS =============

/**
 * @desc    Get all support tickets (admin)
 * @route   GET /api/v1/admin/support/tickets
 * @access  Admin
 */
exports.getAllTickets = catchAsync(async (req, res, next) => {
  const { status, category, priority, sort = '-createdAt', page = 1, limit = 20, search } = req.query;

  const query = {};

  if (status && status !== 'all') query.status = status;
  if (category && category !== 'all') query.category = category;
  if (priority && priority !== 'all') query.priority = priority;

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } },
      { ticketNumber: { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [tickets, total] = await Promise.all([
    SupportTicket.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('user', 'firstName lastName email'),
    SupportTicket.countDocuments(query)
  ]);

  // Status counts
  const statusCounts = await SupportTicket.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      tickets,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit)
      },
      statusCounts: statusCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {})
    }
  });
});

/**
 * @desc    Get single ticket (admin)
 * @route   GET /api/v1/admin/support/tickets/:id
 * @access  Admin
 */
exports.getTicketById = catchAsync(async (req, res, next) => {
  const ticket = await SupportTicket.findById(req.params.id)
    .populate('user', 'firstName lastName email')
    .populate('orderId', 'orderNumber status');

  if (!ticket) {
    return next(new AppError('Ticket not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: ticket
  });
});

/**
 * @desc    Update ticket (admin)
 * @route   PUT /api/v1/admin/support/tickets/:id
 * @access  Admin
 */
exports.updateTicket = catchAsync(async (req, res, next) => {
  const { status, priority, adminNotes, assignedTo } = req.body;

  const ticket = await SupportTicket.findById(req.params.id);

  if (!ticket) {
    return next(new AppError('Ticket not found', 404));
  }

  if (status) {
    ticket.status = status;
    if (status === 'resolved' && !ticket.resolvedAt) ticket.resolvedAt = new Date();
    if (status === 'closed' && !ticket.closedAt) ticket.closedAt = new Date();
  }

  if (priority) ticket.priority = priority;
  if (adminNotes !== undefined) ticket.adminNotes = adminNotes;
  if (assignedTo) ticket.assignedTo = assignedTo;

  await ticket.save();

  res.status(200).json({
    status: 'success',
    message: 'Ticket updated successfully',
    data: ticket
  });
});

/**
 * @desc    Add response to ticket (admin)
 * @route   POST /api/v1/admin/support/tickets/:id/respond
 * @access  Admin
 */
exports.respondToTicket = catchAsync(async (req, res, next) => {
  const { message } = req.body;

  if (!message) {
    return next(new AppError('Please provide a response message', 400));
  }

  const ticket = await SupportTicket.findById(req.params.id);

  if (!ticket) {
    return next(new AppError('Ticket not found', 404));
  }

  ticket.responses.push({
    message,
    sender: 'admin',
    senderName: req.user?.firstName || 'Support Team'
  });

  if (!ticket.firstResponseAt) {
    ticket.firstResponseAt = new Date();
  }

  ticket.status = 'awaiting-response';
  await ticket.save();

  res.status(200).json({
    status: 'success',
    message: 'Response added successfully',
    data: ticket
  });
});

/**
 * @desc    Delete ticket (admin)
 * @route   DELETE /api/v1/admin/support/tickets/:id
 * @access  Admin
 */
exports.deleteTicket = catchAsync(async (req, res, next) => {
  const ticket = await SupportTicket.findById(req.params.id);

  if (!ticket) {
    return next(new AppError('Ticket not found', 404));
  }

  await ticket.deleteOne();

  res.status(200).json({
    status: 'success',
    message: 'Ticket deleted successfully'
  });
});

/**
 * @desc    Get support ticket stats (admin)
 * @route   GET /api/v1/admin/support/stats
 * @access  Admin
 */
exports.getStats = catchAsync(async (req, res, next) => {
  const [stats] = await SupportTicket.aggregate([
    {
      $facet: {
        byStatus: [{ $group: { _id: '$status', count: { $sum: 1 } } }],
        byCategory: [{ $group: { _id: '$category', count: { $sum: 1 } } }],
        byPriority: [{ $group: { _id: '$priority', count: { $sum: 1 } } }],
        totals: [
          {
            $group: {
              _id: null,
              total: { $sum: 1 }
            }
          }
        ],
        recent: [
          { $sort: { createdAt: -1 } },
          { $limit: 5 },
          { $project: { ticketNumber: 1, subject: 1, status: 1, category: 1, createdAt: 1 } }
        ]
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      byStatus: stats.byStatus.reduce((acc, curr) => { acc[curr._id] = curr.count; return acc; }, {}),
      byCategory: stats.byCategory.reduce((acc, curr) => { acc[curr._id] = curr.count; return acc; }, {}),
      byPriority: stats.byPriority.reduce((acc, curr) => { acc[curr._id] = curr.count; return acc; }, {}),
      total: stats.totals[0]?.total || 0,
      recentTickets: stats.recent
    }
  });
});
