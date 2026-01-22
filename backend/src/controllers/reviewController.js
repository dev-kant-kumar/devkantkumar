const Review = require('../models/Review');
const Product = require('../models/Product');
const Service = require('../models/Service');
const Order = require('../models/Order');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.productId) filter = { product: req.params.productId };
  if (req.params.serviceId) filter = { service: req.params.serviceId };

  const reviews = await Review.find(filter)
    .sort({ createdAt: -1 })
    .populate('user', 'name photo');

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.service) req.body.service = req.params.serviceId;
  req.body.user = req.user.id; // Assuming auth middleware sets req.user

  const { product, service, user } = req.body;

  if (!product && !service) {
    return next(new AppError('Review must belong to a product or service.', 400));
  }

  // 1. Check if user actually purchased the product/service
  // Order items structure: [{ itemType: 'product', itemId: ObjectId, ... }]
  // Also check if order is completed
  const orders = await Order.find({
    user: user,
    'payment.status': 'completed', // Or whatever status means "paid/acquired"
    // We need to match at least one item in the items array
    items: {
      $elemMatch: {
        itemId: product || service,
        itemType: product ? 'product' : 'service'
      }
    }
  });

  if (orders.length === 0) {
     // Check if it's a "free" verification (optional, assuming mainly paid products)
     // Or if user is admin?
     // For now, strict purchase check.
     return next(new AppError('You can only review items you have purchased.', 403));
  }

  // 2. Check for duplicate review
  const existingReview = await Review.findOne({
    user: user,
    product: product,
    service: service
  });

  if (existingReview) {
    return next(new AppError('You have already reviewed this item.', 400));
  }

  req.body.isVerifiedPurchase = true; // Proven by order check

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  // Ensure review belongs to user
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
     return next(new AppError('You are not authorized to update this review.', 403));
  }

  // Allowed fields
  if (req.body.rating) review.rating = req.body.rating;
  if (req.body.comment) review.comment = req.body.comment;

  await review.save(); // Triggers post-save hook

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('You are not authorized to delete this review.', 403));
  }

  await Review.findByIdAndDelete(req.params.id);
  // We need to trigger stats update. findByIdAndDelete triggers findOneAndDelete middleware if defined.
  // I defined hook on /^findOneAnd/ in Review.js, so it should catch this if it translates to findOneAndDelete

  // Re-calculate stats manually if hook doesn't fire on findByIdAndDelete (it usually does as it uses findOneAndDelete under the hood in newer Mongoose, or we should use doc.remove() if we fetched it)
  // To be safe, let's call the static method manually or ensure middleware covers it.
  // My Review.js hook: reviewSchema.post(/^findOneAnd/, ...)
  // Mongoose findByIdAndDelete triggers findOneAndDelete.

  res.status(204).json({
    status: 'success',
    data: null
  });
});
