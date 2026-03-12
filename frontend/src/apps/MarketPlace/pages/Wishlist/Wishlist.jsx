import { motion } from 'framer-motion';
import {
  AlertCircle,
  Heart,
  Loader2,
  Package,
  RefreshCw,
  ShoppingCart,
  Trash2,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PriceDisplay from '../../../../components/common/PriceDisplay';
import { useAddToCartMutation } from '../../../../store/cart/cartApi';
import { useCurrency } from '../../context/CurrencyContext';
import { selectIsAuthenticated } from '../../store/auth/authSlice';
import { addToCart } from '../../store/cart/cartSlice';
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from '../../store/wishlist/wishlistApi';
import RecommendationSection from '../../common/components/RecommendationSection';

const Wishlist = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { getPrice, formatPrice } = useCurrency();

  const {
    data: wishlistData,
    isLoading,
    isError,
    refetch,
  } = useGetWishlistQuery(undefined, { skip: !isAuthenticated });

  const [removeFromWishlist, { isLoading: isRemoving }] =
    useRemoveFromWishlistMutation();
  const [addToCartApi, { isLoading: isAddingToCart }] = useAddToCartMutation();

  const favorites = wishlistData?.favorites || wishlistData || {};
  const products = favorites?.products || [];
  const services = favorites?.services || [];
  const totalItems = products.length + services.length;

  const handleRemove = async (itemId, type) => {
    try {
      await removeFromWishlist({ itemId, type }).unwrap();
      toast.success('Removed from wishlist');
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const handleAddProductToCart = async (product) => {
    if (isAuthenticated) {
      try {
        await addToCartApi({ productId: product._id, quantity: 1 }).unwrap();
        toast.success('Added to cart!');
      } catch (err) {
        toast.error(err?.data?.message || 'Failed to add to cart');
      }
    } else {
      dispatch(
        addToCart({
          id: product._id,
          itemId: product._id,
          itemType: 'product',
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          discount: product.discount,
          regionalPricing: product.regionalPricing,
          image: product.images?.[0]?.url,
          quantity: 1,
        })
      );
      toast.success('Added to cart!');
    }
  };

  const handleAddServiceToCart = async (service) => {
    const pkg = service.packages?.[0];
    if (!pkg) return;

    if (isAuthenticated) {
      try {
        await addToCartApi({
          serviceId: service._id,
          quantity: 1,
          package: pkg.name,
        }).unwrap();
        toast.success('Added to cart!');
      } catch (err) {
        toast.error(err?.data?.message || 'Failed to add to cart');
      }
    } else {
      dispatch(
        addToCart({
          id: `${service._id}-${pkg.name}`,
          itemId: service._id,
          itemType: 'service',
          title: `${service.title} - ${pkg.name}`,
          price: pkg.price,
          originalPrice: pkg.originalPrice,
          discount: pkg.discount,
          regionalPricing: pkg.regionalPricing,
          image: service.images?.[0]?.url,
          quantity: 1,
          package: pkg.name,
          packageName: pkg.name,
          deliveryTime: pkg.deliveryTime,
        })
      );
      toast.success('Added to cart!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-8">
        <Heart className="h-16 w-16 text-gray-300" />
        <h2 className="text-xl font-semibold text-gray-700">
          Sign in to view your wishlist
        </h2>
        <p className="text-gray-500 text-center max-w-sm">
          Create an account or sign in to save your favorite products and
          services.
        </p>
        <Link
          to="/marketplace/auth/signin"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-gray-700 font-medium">Failed to load wishlist</p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" /> Retry
        </button>
      </div>
    );
  }

  if (totalItems === 0) {
    return (
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 gap-4"
        >
          <Heart className="h-16 w-16 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-700">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 text-center max-w-sm">
            Browse our products and services and click the heart icon to save
            items you like.
          </p>
          <div className="flex gap-3">
            <Link
              to="/marketplace/products"
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Browse Products
            </Link>
            <Link
              to="/marketplace/services"
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Browse Services
            </Link>
          </div>
        </motion.div>

        {/* Show trending items so the empty page is still useful */}
        <div className="border-t border-gray-100 pt-2">
          <RecommendationSection mode="trending" limit={6} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="mt-1 text-sm text-gray-500">
            {totalItems} saved item{totalItems !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Products Section */}
      {products.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-green-600" />
            Digital Products ({products.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <WishlistCard
                key={product._id}
                item={product}
                type="product"
                onRemove={handleRemove}
                onAddToCart={() => handleAddProductToCart(product)}
                isAddingToCart={isAddingToCart}
                isRemoving={isRemoving}
                getPrice={getPrice}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        </section>
      )}

      {/* Services Section */}
      {services.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-purple-600" />
            Services ({services.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <WishlistCard
                key={service._id}
                item={service}
                type="service"
                onRemove={handleRemove}
                onAddToCart={() => handleAddServiceToCart(service)}
                isAddingToCart={isAddingToCart}
                isRemoving={isRemoving}
                getPrice={getPrice}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        </section>
      )}

      {/* You may also like */}
      <div className="border-t border-gray-100 pt-2">
        <RecommendationSection mode="personalized" limit={6} />
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Internal card component
// ─────────────────────────────────────────────────────────────────────────────

const WishlistCard = ({
  item,
  type,
  onRemove,
  onAddToCart,
  isAddingToCart,
  isRemoving,
  getPrice,
}) => {
  const detailPath =
    type === 'product'
      ? `/marketplace/products/${item._id}`
      : `/marketplace/services/${item._id}`;

  const image = item.images?.[0]?.url;

  // Get price for display
  const priceData = getPrice(
    type === 'service' ? item.packages?.[0] : item
  );
  const displayPrice = priceData?.convertedPrice ?? item.price ?? item.packages?.[0]?.price;
  const originalPrice =
    priceData?.convertedOriginalPrice ??
    item.originalPrice ??
    item.packages?.[0]?.originalPrice;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <Link to={detailPath} className="block">
        <div className="relative h-40 bg-gray-100 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <Package className="h-12 w-12" />
            </div>
          )}
          <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full capitalize bg-white/90 text-gray-700 shadow-sm border border-gray-200">
            {type}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={detailPath} className="block">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug hover:text-green-600 transition-colors line-clamp-2">
            {item.title}
          </h3>
        </Link>
        {item.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          {displayPrice !== undefined ? (
            <>
              <PriceDisplay
                price={item.price || item.packages?.[0]?.price || 0}
                originalPrice={originalPrice}
                discount={item.discount || item.packages?.[0]?.discount}
                regionalPricing={
                  item.regionalPricing || item.packages?.[0]?.regionalPricing
                }
                className="text-base font-bold text-gray-900"
              />
            </>
          ) : (
            <span className="text-sm text-gray-500">Price on request</span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={onAddToCart}
            disabled={isAddingToCart}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60 cursor-pointer"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>
          <button
            onClick={() => onRemove(item._id, type)}
            disabled={isRemoving}
            title="Remove from wishlist"
            className="flex items-center justify-center w-9 h-9 border border-gray-200 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors cursor-pointer disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Wishlist;
