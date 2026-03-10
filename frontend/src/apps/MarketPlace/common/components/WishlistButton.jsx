import { Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../store/auth/authSlice';
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from '../../store/wishlist/wishlistApi';

/**
 * WishlistButton - A reusable heart button that toggles an item in/out of the wishlist.
 * Shows a filled heart when saved, outline when not.
 *
 * @param {string} itemId   - The product or service _id
 * @param {string} type     - 'product' | 'service'
 * @param {string} className - Extra Tailwind classes for positioning
 */
const WishlistButton = ({ itemId, type = 'product', className = '' }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const { data: wishlistData } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();

  const isLoading = isAdding || isRemoving;

  // Check if this item is already in the wishlist
  const favorites = wishlistData?.favorites || wishlistData || {};
  const productFavs = favorites?.products || [];
  const serviceFavs = favorites?.services || [];

  const isSaved =
    type === 'product'
      ? productFavs.some((p) => (p._id || p) === itemId)
      : serviceFavs.some((s) => (s._id || s) === itemId);

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please sign in to save items');
      navigate('/marketplace/auth/signin');
      return;
    }

    try {
      if (isSaved) {
        await removeFromWishlist({ itemId, type }).unwrap();
        toast.success('Removed from wishlist');
      } else {
        await addToWishlist({ itemId, type }).unwrap();
        toast.success('Saved to wishlist');
      }
    } catch {
      toast.error('Failed to update wishlist');
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
      className={`flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 hover:border-red-300 transition-all cursor-pointer disabled:opacity-50 ${className}`}
    >
      <Heart
        className={`h-5 w-5 transition-colors ${
          isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'
        }`}
      />
    </button>
  );
};

export default WishlistButton;
