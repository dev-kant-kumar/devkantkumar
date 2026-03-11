const SupportTicket = require("../models/SupportTicket");
const SystemSetting = require("../models/SystemSetting");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const notificationService = require("../services/notificationService");
const emailService = require("../services/emailService");
const { emitToUser, emitToAdmins } = require("../config/socket");

/**
 * @desc    Submit a support ticket (public — guest or logged-in)
 * @route   POST /api/v1/marketplace/support
 * @access  Public
 */
exports.submitTicket = catchAsync(async (req, res, next) => {
  const { name, email, category, subject, message, orderId, source } = req.body;

  // Validate required fields
  if (!name || !email || !category || !subject || !message) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const isLoggedIn = !!req.user;

  // Create ticket
  const ticket = await SupportTicket.create({
    name,
    email,
    category,
    subject,
    message,
    orderId: orderId || undefined,
    user: req.user?._id || undefined,
    isGuest: !isLoggedIn,
    source: source || "support-page",
    unreadByAdmin: 1,
  });

  // Notify admins about new ticket (in-app + socket)
  const submitter = req.user || { firstName: name, lastName: "" };
  notificationService
    .sendNewTicketNotification(submitter, ticket)
    .catch((err) => {
      console.error("Failed to send ticket notification:", err);
    });

  // For guests, send email confirmation
  if (!isLoggedIn) {
    emailService
      .sendSupportTicketConfirmation({
        name,
        email,
        ticketNumber: ticket.ticketNumber,
        subject,
      })
      .catch((err) => {
        console.error("Failed to send ticket confirmation email:", err);
      });
  }

  res.status(201).json({
    status: "success",
    message: `Your support ticket ${ticket.ticketNumber} has been submitted. We will respond within 24 hours.`,
    data: {
      _id: ticket._id,
      ticketNumber: ticket.ticketNumber,
      subject: ticket.subject,
      category: ticket.categoryDisplay,
      status: ticket.status,
    },
  });
});

// ============= USER ENDPOINTS (authenticated) =============

/**
 * @desc    Get current user's support tickets
 * @route   GET /api/v1/marketplace/support/my-tickets
 * @access  Protected
 */
exports.getMyTickets = catchAsync(async (req, res, next) => {
  const { status, page = 1, limit = 20 } = req.query;
  const safeStatus = typeof status === "string" ? status : undefined;

  // Match by user ID or by email (for tickets created before user linking)
  const query = {
    $or: [{ user: req.user._id }, { email: req.user.email }],
  };
  if (safeStatus && safeStatus !== "all") query.status = safeStatus;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [tickets, total] = await Promise.all([
    SupportTicket.find(query)
      .sort("-lastActivity")
      .skip(skip)
      .limit(parseInt(limit))
      .select(
        "ticketNumber subject category status priority lastActivity unreadByUser responses createdAt",
      )
      .lean(),
    SupportTicket.countDocuments(query),
  ]);

  // Add lastMessage preview to each ticket
  const ticketsWithPreview = tickets.map((t) => ({
    ...t,
    lastMessage:
      t.responses?.length > 0
        ? {
            message: t.responses[t.responses.length - 1].message.substring(
              0,
              100,
            ),
            sender: t.responses[t.responses.length - 1].sender,
            timestamp: t.responses[t.responses.length - 1].timestamp,
          }
        : {
            message: t.message?.substring(0, 100) || "",
            sender: "user",
            timestamp: t.createdAt,
          },
    responseCount: t.responses?.length || 0,
    responses: undefined, // don't send full responses in list
  }));

  // Status counts for sidebar badges
  const statusCounts = await SupportTicket.aggregate([
    { $match: { $or: [{ user: req.user._id }, { email: req.user.email }] } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      tickets: ticketsWithPreview,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
      },
      statusCounts: statusCounts.reduce((acc, c) => {
        acc[c._id] = c.count;
        return acc;
      }, {}),
      totalUnread: tickets.reduce((sum, t) => sum + (t.unreadByUser || 0), 0),
    },
  });
});

/**
 * @desc    Get single ticket detail with full chat history (user)
 * @route   GET /api/v1/marketplace/support/my-tickets/:id
 * @access  Protected
 */
exports.getMyTicketById = catchAsync(async (req, res, next) => {
  const ticket = await SupportTicket.findOne({
    _id: String(req.params.id),
    $or: [{ user: req.user._id }, { email: req.user.email }],
  }).populate("orderId", "orderNumber status");

  if (!ticket) {
    return next(new AppError("Ticket not found", 404));
  }

  // Mark all admin messages as read by user
  if (ticket.unreadByUser > 0) {
    ticket.responses.forEach((r) => {
      if (r.sender === "admin" && !r.isRead) r.isRead = true;
    });
    ticket.unreadByUser = 0;
    await ticket.save();
  }

  res.status(200).json({
    status: "success",
    data: ticket,
  });
});

/**
 * @desc    User replies to their own ticket (chat message)
 * @route   POST /api/v1/marketplace/support/my-tickets/:id/reply
 * @access  Protected
 */
exports.replyToTicket = catchAsync(async (req, res, next) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return next(new AppError("Please provide a message", 400));
  }

  const ticket = await SupportTicket.findOne({
    _id: String(req.params.id),
    $or: [{ user: req.user._id }, { email: req.user.email }],
  });

  if (!ticket) {
    return next(new AppError("Ticket not found", 404));
  }

  // Backfill user field if missing (for tickets created before linking)
  if (!ticket.user) {
    ticket.user = req.user._id;
    ticket.isGuest = false;
  }

  if (ticket.status === "closed") {
    return next(
      new AppError("This ticket is closed. Please open a new ticket.", 400),
    );
  }

  const newResponse = {
    message: message.trim(),
    sender: "user",
    senderName: `${req.user.firstName} ${req.user.lastName}`.trim(),
    isRead: false,
    timestamp: new Date(),
  };

  ticket.responses.push(newResponse);
  ticket.unreadByAdmin += 1;

  // If ticket was resolved/awaiting-response, re-open it
  if (["resolved", "awaiting-response"].includes(ticket.status)) {
    ticket.status = "open";
  }

  await ticket.save();

  // Real-time: emit to admin room
  emitToAdmins("support:message", {
    ticketId: ticket._id,
    ticketNumber: ticket.ticketNumber,
    response: newResponse,
    status: ticket.status,
  });

  // In-app notification to admins
  notificationService
    .sendNewTicketNotification(
      { firstName: req.user.firstName, lastName: req.user.lastName },
      ticket,
    )
    .catch((err) =>
      console.error("Failed to send ticket reply notification:", err),
    );

  res.status(200).json({
    status: "success",
    data: {
      response: newResponse,
      status: ticket.status,
    },
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
      category: "General",
      question: "How do I purchase a digital product?",
      answer:
        "You can purchase digital products by browsing our marketplace, selecting the product you want, adding it to cart, and completing the secure checkout process.",
    },
    {
      category: "Technical",
      question: "What file formats do you provide?",
      answer:
        "We provide various file formats depending on the product type, including source code files, documentation, and deployment guides. Each product page lists the included formats.",
    },
    {
      category: "Billing",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI, net banking, and various digital wallets through our secure Razorpay payment gateway.",
    },
    {
      category: "Technical",
      question: "Do you provide source code?",
      answer:
        'Yes, most of our products include full source code. This is clearly indicated on each product page under the "What\'s Included" section.',
    },
    {
      category: "General",
      question: "Can I get a refund?",
      answer:
        "We offer a 7-day money-back guarantee for digital products if they don't work as described. Contact our support team with your order details for assistance.",
    },
    {
      category: "Technical",
      question: "Do you provide technical support?",
      answer:
        "Yes, we provide technical support for all our products. Submit a support ticket and our team will assist you within 24 hours.",
    },
    {
      category: "Billing",
      question: "How do I download my purchased products?",
      answer:
        "After successful payment, you'll receive download links via email. You can also access all your purchases from your account dashboard.",
    },
    {
      category: "General",
      question: "Do you offer custom development services?",
      answer:
        "Yes! We offer custom development services. Visit our Custom Solutions page to request a quote for your project.",
    },
  ];

  // Contact info from settings or defaults
  const contactInfo = {
    email: settings.general?.supportEmail || "support@devkantkumar.com",
    phone: settings.support?.phone || "+91 8873754827",
    supportHours: settings.support?.hours || "Mon-Fri: 10AM-7PM IST",
  };

  // Quick help resources
  const resources = [
    {
      title: "Documentation",
      description: "Comprehensive guides and API documentation",
      link: "/docs",
      icon: "book",
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      link: "/tutorials",
      icon: "video",
    },
    {
      title: "Knowledge Base",
      description: "Searchable articles and solutions",
      link: "/kb",
      icon: "file",
    },
    {
      title: "Community Forum",
      description: "Connect with other users",
      link: "/community",
      icon: "users",
    },
  ];

  res.status(200).json({
    status: "success",
    data: {
      faqs,
      contactInfo,
      resources,
      categories: [
        { id: "technical", name: "Technical Support" },
        { id: "billing", name: "Billing & Payments" },
        { id: "general", name: "General Inquiry" },
        { id: "feedback", name: "Feedback" },
        { id: "order", name: "Order Issue" },
        { id: "refund", name: "Refund Request" },
      ],
    },
  });
});

// ============= ADMIN ENDPOINTS =============

/**
 * @desc    Get all support tickets (admin)
 * @route   GET /api/v1/admin/support/tickets
 * @access  Admin
 */
exports.getAllTickets = catchAsync(async (req, res, next) => {
  const {
    status,
    category,
    priority,
    sort = "-createdAt",
    page = 1,
    limit = 20,
    search,
  } = req.query;

  const query = {};

  const safeStatus = typeof status === "string" ? status : undefined;
  const safeCategory = typeof category === "string" ? category : undefined;
  const safePriority = typeof priority === "string" ? priority : undefined;
  const safeSearch = typeof search === "string" ? search : undefined;

  if (safeStatus && safeStatus !== "all") query.status = safeStatus;
  if (safeCategory && safeCategory !== "all") query.category = safeCategory;
  if (safePriority && safePriority !== "all") query.priority = safePriority;

  if (safeSearch) {
    query.$or = [
      { name: { $regex: safeSearch, $options: "i" } },
      { email: { $regex: safeSearch, $options: "i" } },
      { subject: { $regex: safeSearch, $options: "i" } },
      { ticketNumber: { $regex: safeSearch, $options: "i" } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const safeSort = typeof sort === "string" ? sort : "-createdAt";
  const [tickets, total] = await Promise.all([
    SupportTicket.find(query)
      .sort(safeSort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("user", "firstName lastName email"),
    SupportTicket.countDocuments(query),
  ]);

  // Status counts
  const statusCounts = await SupportTicket.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      tickets,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit),
      },
      statusCounts: statusCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
    },
  });
});

/**
 * @desc    Get single ticket (admin)
 * @route   GET /api/v1/admin/support/tickets/:id
 * @access  Admin
 */
exports.getTicketById = catchAsync(async (req, res, next) => {
  const ticket = await SupportTicket.findById(String(req.params.id))
    .populate("user", "firstName lastName email")
    .populate("orderId", "orderNumber status");

  if (!ticket) {
    return next(new AppError("Ticket not found", 404));
  }

  // Mark all user messages as read by admin
  if (ticket.unreadByAdmin > 0) {
    ticket.responses.forEach((r) => {
      if (r.sender === "user" && !r.isRead) r.isRead = true;
    });
    ticket.unreadByAdmin = 0;
    await ticket.save();
  }

  res.status(200).json({
    status: "success",
    data: ticket,
  });
});

/**
 * @desc    Update ticket (admin)
 * @route   PUT /api/v1/admin/support/tickets/:id
 * @access  Admin
 */
exports.updateTicket = catchAsync(async (req, res, next) => {
  const { status, priority, adminNotes, assignedTo } = req.body;

  const ticket = await SupportTicket.findById(String(req.params.id));

  if (!ticket) {
    return next(new AppError("Ticket not found", 404));
  }

  if (status) {
    ticket.status = status;
    if (status === "resolved" && !ticket.resolvedAt)
      ticket.resolvedAt = new Date();
    if (status === "closed" && !ticket.closedAt) ticket.closedAt = new Date();
  }

  if (priority) ticket.priority = priority;
  if (adminNotes !== undefined) ticket.adminNotes = adminNotes;
  if (assignedTo) ticket.assignedTo = assignedTo;

  await ticket.save();

  res.status(200).json({
    status: "success",
    message: "Ticket updated successfully",
    data: ticket,
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
    return next(new AppError("Please provide a response message", 400));
  }

  const ticket = await SupportTicket.findById(String(req.params.id));

  if (!ticket) {
    return next(new AppError("Ticket not found", 404));
  }

  const newResponse = {
    message,
    sender: "admin",
    senderName: req.user?.firstName || "Support Team",
    isRead: false,
    timestamp: new Date(),
  };

  ticket.responses.push(newResponse);
  ticket.unreadByUser += 1;

  if (!ticket.firstResponseAt) {
    ticket.firstResponseAt = new Date();
  }

  ticket.status = "awaiting-response";
  // Reset admin unread since admin just responded
  ticket.unreadByAdmin = 0;
  // Mark all user messages as read by admin
  ticket.responses.forEach((r) => {
    if (r.sender === "user" && !r.isRead) r.isRead = true;
  });

  await ticket.save();

  // Real-time: emit to the user's socket room
  if (ticket.user) {
    emitToUser(ticket.user.toString(), "support:message", {
      ticketId: ticket._id,
      ticketNumber: ticket.ticketNumber,
      response: newResponse,
      status: ticket.status,
    });

    // In-app notification for logged-in user
    notificationService
      .sendTicketResponseNotification(ticket.user, ticket)
      .catch((err) => {
        console.error("Failed to send ticket response notification:", err);
      });
  }

  // For guest tickets (no user account), send email response
  if (ticket.isGuest || !ticket.user) {
    emailService
      .sendSupportTicketResponse({
        name: ticket.name,
        email: ticket.email,
        ticketNumber: ticket.ticketNumber,
        subject: ticket.subject,
        responseMessage: message,
        responderName: req.user?.firstName || "Support Team",
      })
      .catch((err) => {
        console.error("Failed to send guest ticket response email:", err);
      });
  }

  res.status(200).json({
    status: "success",
    message: "Response added successfully",
    data: ticket,
  });
});

/**
 * @desc    Delete ticket (admin)
 * @route   DELETE /api/v1/admin/support/tickets/:id
 * @access  Admin
 */
exports.deleteTicket = catchAsync(async (req, res, next) => {
  const ticket = await SupportTicket.findById(String(req.params.id));

  if (!ticket) {
    return next(new AppError("Ticket not found", 404));
  }

  await ticket.deleteOne();

  res.status(200).json({
    status: "success",
    message: "Ticket deleted successfully",
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
        byStatus: [{ $group: { _id: "$status", count: { $sum: 1 } } }],
        byCategory: [{ $group: { _id: "$category", count: { $sum: 1 } } }],
        byPriority: [{ $group: { _id: "$priority", count: { $sum: 1 } } }],
        totals: [
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
            },
          },
        ],
        recent: [
          { $sort: { createdAt: -1 } },
          { $limit: 5 },
          {
            $project: {
              ticketNumber: 1,
              subject: 1,
              status: 1,
              category: 1,
              createdAt: 1,
            },
          },
        ],
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      byStatus: stats.byStatus.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      byCategory: stats.byCategory.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      byPriority: stats.byPriority.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      total: stats.totals[0]?.total || 0,
      recentTickets: stats.recent,
    },
  });
});
