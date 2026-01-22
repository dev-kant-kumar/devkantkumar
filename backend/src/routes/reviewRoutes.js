const express = require('express');
const reviewController = require('../controllers/reviewController');
const { protect, authorize } = require('../middlewares/auth');

// mergeParams: true allows access to params from other routers (e.g. /products/:productId/reviews)
const router = express.Router({ mergeParams: true });

router.route('/')
  .get(reviewController.getAllReviews)
  .post(
    protect,
    authorize('user'),
    reviewController.createReview
  );

router.route('/:id')
  .patch(protect, authorize('user', 'admin'), reviewController.updateReview)
  .delete(protect, authorize('user', 'admin'), reviewController.deleteReview);

module.exports = router;
