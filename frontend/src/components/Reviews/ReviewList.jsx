import { format } from 'date-fns';
import { useGetReviewsQuery } from '../../apps/MarketPlace/store/reviews/reviewsApiSlice';
import StarRating from '../common/StarRating';

const ReviewList = ({ productId, serviceId }) => {
  const { data, isLoading, error } = useGetReviewsQuery({ productId, serviceId });

  if (isLoading) return <div className="p-4 text-center">Loading reviews...</div>;
  if (error) return null; // Or show error message if critical, but for empty list might imply no reviews? API shoud return empty array.

  const reviews = data?.data?.reviews || [];

  if (reviews.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
        <p>No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Customer Reviews ({reviews.length})</h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {review.user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{review.user?.name || 'Anonymous'}</h4>
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} readOnly size={14} />
                    <span className="text-xs text-gray-500">
                      {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
              {review.isVerifiedPurchase && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                  ✓ Verified Purchase
                </span>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
