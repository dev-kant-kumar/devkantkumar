import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Heart,
  Loader2,
  Package,
  RefreshCw,
  ShoppingCart,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PriceDisplay from "../../../../components/common/PriceDisplay";
import { useAddToCartMutation } from "../../../../store/cart/cartApi";
import RecommendationSection from "../../common/components/RecommendationSection";
import { useCurrency } from "../../context/CurrencyContext";
import { selectIsAuthenticated } from "../../store/auth/authSlice";
import { addToCart } from "../../store/cart/cartSlice";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../../store/wishlist/wishlistApi";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      toast.success("Removed from wishlist");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const handleAddProductToCart = async (product) => {
    if (isAuthenticated) {
      try {
        await addToCartApi({ productId: product._id, quantity: 1 }).unwrap();
        toast.success("Added to cart!");
      } catch (err) {
        toast.error(err?.data?.message || "Failed to add to cart");
      }
    } else {
      dispatch(
        addToCart({
          id: product._id,
          itemId: product._id,
          itemType: "product",
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          discount: product.discount,
          regionalPricing: product.regionalPricing,
          image: product.images?.[0]?.url,
          quantity: 1,
        }),
      );
      toast.success("Added to cart!");
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
        toast.success("Added to cart!");
      } catch (err) {
        toast.error(err?.data?.message || "Failed to add to cart");
      }
    } else {
      dispatch(
        addToCart({
          id: `${service._id}-${pkg.name}`,
          itemId: service._id,
          itemType: "service",
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
        }),
      );
      toast.success("Added to cart!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-8 bg-slate-50">
        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full">
          <Heart className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Sign in to view your wishlist</h2>
        <p className="text-slate-600 text-center max-w-sm text-sm">
          Create an account or sign in to save your favorite products and services.
        </p>
        <Link
          to="/marketplace/auth/signin"
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-500/20 transition-all"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 bg-slate-50">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-slate-800 font-bold">Failed to load wishlist</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 cursor-pointer text-sm shadow-xs"
        >
          <RefreshCw className="h-4 w-4" /> Retry Loading
        </button>
      </div>
    );
  }

  if (totalItems === 0) {
    return (
      <div className="bg-slate-50 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 gap-4 max-w-md mx-auto text-center"
        >
          <div className="p-4 bg-gray-100 rounded-full text-gray-400">
            <Heart className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Your wishlist is empty</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Browse our products and services and click the heart icon to save items you like.
          </p>
          <div className="flex gap-3 mt-2">
            <Link
              to="/marketplace/products"
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Browse Products
            </Link>
            <Link
              to="/marketplace/services"
              className="px-5 py-2.5 bg-white border border-gray-300 text-slate-700 rounded-xl hover:bg-gray-50 transition-all text-xs font-bold"
            >
              Browse Services
            </Link>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 pt-8">
          <RecommendationSection mode="trending" limit={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-10 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">My Wishlist</h1>
            <p className="mt-1 text-sm text-slate-600">
              {totalItems} saved item{totalItems !== 1 ? "s" : ""} in your collection
            </p>
          </div>
        </div>

        {/* Products Section */}
        {products.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-emerald-600" />
              Digital Products ({products.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                />
              ))}
            </div>
          </section>
        )}

        {/* Services Section */}
        {services.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-600" />
              Services ({services.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                />
              ))}
            </div>
          </section>
        )}

        {/* Recommendations */}
        <div className="border-t border-slate-200/80 pt-8">
          <RecommendationSection mode="personalized" limit={6} />
        </div>
      </div>
    </div>
  );
};

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
    type === "product"
      ? `/marketplace/products/${item.slug || item._id}`
      : `/marketplace/services/${item.slug || item._id}`;

  const image = item.images?.[0]?.url;
  const priceData = getPrice(type === "service" ? item.packages?.[0] : item);
  const displayPrice = priceData?.convertedPrice ?? item.price ?? item.packages?.[0]?.price;
  const originalPrice = priceData?.convertedOriginalPrice ?? item.originalPrice ?? item.packages?.[0]?.originalPrice;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <Link to={detailPath} className="block relative h-40 bg-gray-100 overflow-hidden group">
          {image ? (
            <img
              src={image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <Package className="h-12 w-12" />
            </div>
          )}
          <span className="absolute top-2 left-2 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
            {type}
          </span>
        </Link>

        <div className="p-4">
          <Link to={detailPath} className="block">
            <h3 className="font-bold text-slate-900 text-sm leading-snug hover:text-emerald-600 transition-colors line-clamp-2 mb-1">
              {item.title}
            </h3>
          </Link>
          {item.description && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="mb-3">
          {displayPrice !== undefined ? (
            <PriceDisplay
              price={item.price || item.packages?.[0]?.price || 0}
              originalPrice={originalPrice}
              className="text-lg"
              textClass="text-slate-900 font-bold"
            />
          ) : (
            <span className="text-xs text-slate-500">Price on request</span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onAddToCart}
            disabled={isAddingToCart}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-60"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => onRemove(item._id, type)}
            disabled={isRemoving}
            title="Remove from wishlist"
            className="flex items-center justify-center w-9 h-9 border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-300 transition-all cursor-pointer disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Wishlist;
