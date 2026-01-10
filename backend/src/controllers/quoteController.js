const QuoteRequest = require('../models/QuoteRequest');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

/**
 * @desc    Submit a new quote request (public)
 * @route   POST /api/v1/marketplace/quote-request
 * @access  Public
 */
exports.submitQuote = catchAsync(async (req, res, next) => {
  const { name, email, company, projectType, budget, timeline, features, description } = req.body;

  // Validate required fields
  if (!name || !email || !projectType || !budget || !timeline || !description) {
    return next(new AppError('Please provide all required fields', 400));
  }

  // Create quote request
  const quoteRequest = await QuoteRequest.create({
    name,
    email,
    company,
    projectType,
    budget,
    timeline,
    features: features || [],
    description
  });

  res.status(201).json({
    status: 'success',
    message: 'Your quote request has been submitted successfully. We will contact you within 24 hours.',
    data: {
      id: quoteRequest._id,
      name: quoteRequest.name,
      email: quoteRequest.email,
      projectType: quoteRequest.projectType
    }
  });
});

/**
 * @desc    Get all quote requests (admin)
 * @route   GET /api/v1/admin/marketplace/quotes
 * @access  Admin
 */
exports.getAllQuotes = catchAsync(async (req, res, next) => {
  const { status, priority, sort = '-createdAt', page = 1, limit = 20, search } = req.query;

  // Build query
  const query = {};

  if (status && status !== 'all') {
    query.status = status;
  }

  if (priority && priority !== 'all') {
    query.priority = priority;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } }
    ];
  }

  // Execute query with pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [quotes, total] = await Promise.all([
    QuoteRequest.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit)),
    QuoteRequest.countDocuments(query)
  ]);

  // Get status counts for filters
  const statusCounts = await QuoteRequest.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      quotes,
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
 * @desc    Get single quote request (admin)
 * @route   GET /api/v1/admin/marketplace/quotes/:id
 * @access  Admin
 */
exports.getQuoteById = catchAsync(async (req, res, next) => {
  const quote = await QuoteRequest.findById(req.params.id);

  if (!quote) {
    return next(new AppError('Quote request not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: quote
  });
});

/**
 * @desc    Update quote request (admin)
 * @route   PUT /api/v1/admin/marketplace/quotes/:id
 * @access  Admin
 */
exports.updateQuote = catchAsync(async (req, res, next) => {
  const { status, priority, adminNotes, estimatedValue } = req.body;

  const quote = await QuoteRequest.findById(req.params.id);

  if (!quote) {
    return next(new AppError('Quote request not found', 404));
  }

  // Update fields
  if (status) {
    quote.status = status;

    // Track status change timestamps
    if (status === 'contacted' && !quote.contactedAt) {
      quote.contactedAt = new Date();
    }
    if (status === 'completed' && !quote.completedAt) {
      quote.completedAt = new Date();
    }
  }

  if (priority) quote.priority = priority;
  if (adminNotes !== undefined) quote.adminNotes = adminNotes;
  if (estimatedValue !== undefined) quote.estimatedValue = estimatedValue;

  await quote.save();

  res.status(200).json({
    status: 'success',
    message: 'Quote request updated successfully',
    data: quote
  });
});

/**
 * @desc    Delete quote request (admin)
 * @route   DELETE /api/v1/admin/marketplace/quotes/:id
 * @access  Admin
 */
exports.deleteQuote = catchAsync(async (req, res, next) => {
  const quote = await QuoteRequest.findById(req.params.id);

  if (!quote) {
    return next(new AppError('Quote request not found', 404));
  }

  await quote.deleteOne();

  res.status(200).json({
    status: 'success',
    message: 'Quote request deleted successfully'
  });
});

/**
 * @desc    Get quote statistics (admin)
 * @route   GET /api/v1/admin/marketplace/quotes/stats
 * @access  Admin
 */
exports.getQuoteStats = catchAsync(async (req, res, next) => {
  const [stats] = await QuoteRequest.aggregate([
    {
      $facet: {
        byStatus: [
          { $group: { _id: '$status', count: { $sum: 1 } } }
        ],
        byPriority: [
          { $group: { _id: '$priority', count: { $sum: 1 } } }
        ],
        byProjectType: [
          { $group: { _id: '$projectType', count: { $sum: 1 } } }
        ],
        totals: [
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              totalEstimatedValue: { $sum: '$estimatedValue' },
              avgEstimatedValue: { $avg: '$estimatedValue' }
            }
          }
        ],
        recent: [
          { $sort: { createdAt: -1 } },
          { $limit: 5 },
          { $project: { name: 1, email: 1, projectType: 1, budget: 1, status: 1, createdAt: 1 } }
        ]
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      byStatus: stats.byStatus.reduce((acc, curr) => { acc[curr._id] = curr.count; return acc; }, {}),
      byPriority: stats.byPriority.reduce((acc, curr) => { acc[curr._id] = curr.count; return acc; }, {}),
      byProjectType: stats.byProjectType.reduce((acc, curr) => { acc[curr._id] = curr.count; return acc; }, {}),
      totals: stats.totals[0] || { total: 0, totalEstimatedValue: 0, avgEstimatedValue: 0 },
      recentQuotes: stats.recent
    }
  });
});
