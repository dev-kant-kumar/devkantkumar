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
const WishlistButton = ({
  itemId,
  type = 'product',
  className = '',
  showText = false,
  text,
}) => {
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

  const defaultClass = showText
    ? 'py-3.5 px-4 bg-white border-2 border-gray-200 hover:border-red-500 text-gray-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer'
    : 'flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 hover:border-red-300 transition-all cursor-pointer';

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
      className={`${defaultClass} ${className}`}
    >
      <Heart
        className={`h-5 w-5 transition-colors ${
          isSaved ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'
        }`}
      />
      {showText && (
        <span className={isSaved ? 'text-red-500' : 'text-gray-700'}>
          {text || (isSaved ? 'Saved to Wishlist' : 'Add to Wishlist')}
        </span>
      )}
    </button>
  );
};

export default WishlistButton;
