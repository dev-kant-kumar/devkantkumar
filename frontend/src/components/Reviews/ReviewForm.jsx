import { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../apps/MarketPlace/store/auth/authSlice'; // Correct path based on previous file reads
import { useGetUserOrdersQuery } from '../../apps/MarketPlace/store/orders/ordersApi';
import { useAddReviewMutation } from '../../apps/MarketPlace/store/reviews/reviewsApiSlice';
import StarRating from '../common/StarRating';

const ReviewForm = ({ productId, serviceId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { data: ordersData, isLoading: isOrdersLoading } = useGetUserOrdersQuery(undefined, {
    skip: !isAuthenticated
  });

  const [addReview, { isLoading: isSubmitting }] = useAddReviewMutation();

  const hasPurchased = useMemo(() => {
    if (!ordersData?.data) return false;

    // Check if the item exists in any of the user's completed orders
    return ordersData.data.some(order =>
      // Only verify against completed orders - or whatever status implies purchase.
      // Assuming 'completed' or existence in list is enough?
      // Usually all user orders are returned.
      // Let's assume all orders returned are valid "purchases" or check status if needed.
      // Safe bet: check if payment status is completed or order status is completed/processing?
      // For digital products, usually 'completed'.
      // Let's match backend logic: 'payment.status': 'completed'
      // But ordersData might have flat structure.
      // Based on PurchasedProductDetails, order.status === 'completed'.

      order.status === 'completed' && order.items.some(item => {
        const itemId = item.itemId?._id || item.itemId;
        if (productId) return itemId === productId;
        if (serviceId) return itemId === serviceId;
        return false;
      })
    );
  }, [ordersData, productId, serviceId]);

  if (!isAuthenticated || !hasPurchased) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    try {
      await addReview({
        productId,
        serviceId,
        rating,
        comment
      }).unwrap();

      toast.success('Review submitted successfully!');
      setRating(0);
      setComment('');
    } catch (err) {
      console.error('Failed to submit review:', err);
      toast.error(err.data?.message || 'Failed to submit review');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <StarRating rating={rating} setRating={setRating} size={24} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
          <textarea
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
