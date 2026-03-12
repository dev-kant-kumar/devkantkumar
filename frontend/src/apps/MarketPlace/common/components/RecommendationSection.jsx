import { motion } from 'framer-motion';
import { AlertCircle, Flame, Loader2, ShoppingCart, Sparkles, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCurrency } from '../../context/CurrencyContext';
import {
  useGetPersonalizedRecommendationsQuery,
  useGetRelatedProductsQuery,
  useGetTrendingQuery,
} from '../../store/api/marketplaceApi';
import { selectIsAuthenticated } from '../../store/auth/authSlice';
import WishlistButton from './WishlistButton';

/**
 * Renders a single product/service card in the recommendations grid.
 */
const RecommendationCard = ({ item, type = 'product' }) => {
  const { formatPrice } = useCurrency();

  const href =
    type === 'service'
      ? `/marketplace/services/${item._id}`
      : `/marketplace/products/${item._id}`;

  const displayPrice =
    type === 'service'
      ? item.packages?.[0]?.price ?? null
      : item.price ?? null;

  const originalPrice =
    type === 'service' ? item.packages?.[0]?.originalPrice : item.originalPrice;

  const discount =
    type === 'service' ? item.packages?.[0]?.discount : item.discount;

  const image = item.images?.[0]?.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <Link to={href} className="block overflow-hidden aspect-video bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ShoppingCart size={32} />
          </div>
        )}
      </Link>

      {/* Discount badge */}
      {discount > 0 && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          -{discount}%
        </span>
      )}

      {/* Wishlist button */}
      <div className="absolute top-2 right-2">
        <WishlistButton itemId={item._id} type={type} />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={href} className="flex-1">
          <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1 truncate">
            {item.category}
          </p>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
        </Link>

        {/* Rating */}
        {item.rating?.average > 0 && (
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs text-gray-600 font-medium">
              {item.rating.average.toFixed(1)}
              <span className="text-gray-400 font-normal ml-0.5">({item.rating.count})</span>
            </span>
          </div>
        )}

        {/* Price */}
        {displayPrice !== null && (
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-base font-bold text-gray-900">
              {formatPrice(displayPrice)}
            </span>
            {originalPrice > displayPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/**
 * Renders a section header with an icon.
 */
const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-6">
    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-0.5 flex-shrink-0">
      <Icon size={20} />
    </div>
    <div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

/**
 * RecommendationSection
 *
 * Displays one of three recommendation modes depending on props:
 *   - mode="related"       → related products for a given productId
 *   - mode="trending"      → site-wide trending products / services
 *   - mode="personalized"  → personalised for the logged-in user;
 *                            falls back to trending when unauthenticated
 *
 * @param {string}  mode         - "related" | "trending" | "personalized"
 * @param {string}  [productId]  - required when mode="related"
 * @param {string}  [type]       - "products" | "services" | undefined (both) when mode="trending"
 * @param {number}  [limit]      - max items per group (default 6)
 * @param {string}  [className]  - additional wrapper classes
 */
const RecommendationSection = ({
  mode = 'trending',
  productId,
  type,
  limit = 6,
  className = '',
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // When mode="personalized" but user is not authenticated, fall through to trending
  const effectiveMode = (mode === 'personalized' && !isAuthenticated) ? 'trending' : mode;

  // ── Related ──────────────────────────────────────────────────────────────
  const {
    data: relatedData,
    isLoading: relatedLoading,
    isError: relatedError,
  } = useGetRelatedProductsQuery(
    { productId, limit },
    { skip: effectiveMode !== 'related' || !productId },
  );

  // ── Trending ─────────────────────────────────────────────────────────────
  const {
    data: trendingData,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useGetTrendingQuery(
    { type, limit },
    { skip: effectiveMode !== 'trending' },
  );

  // ── Personalized ─────────────────────────────────────────────────────────
  const {
    data: personalizedData,
    isLoading: personalizedLoading,
    isError: personalizedError,
  } = useGetPersonalizedRecommendationsQuery(
    { limit },
    { skip: effectiveMode !== 'personalized' },
  );

  // ─── Resolve data based on effective mode ────────────────────────────────
  const isLoading = relatedLoading || trendingLoading || personalizedLoading;
  const isError = relatedError || trendingError || personalizedError;

  let products = [];
  let services = [];
  let isPersonalized = false;

  if (effectiveMode === 'related') {
    products = relatedData?.related || [];
  } else if (effectiveMode === 'trending') {
    products = trendingData?.products || [];
    services = trendingData?.services || [];
  } else if (effectiveMode === 'personalized') {
    products = personalizedData?.products || [];
    services = personalizedData?.services || [];
    isPersonalized = personalizedData?.isPersonalized ?? false;
  }

  const hasContent = products.length > 0 || services.length > 0;

  // Nothing to show while loading or when there are no items
  if (!isLoading && !hasContent && !isError) return null;

  // ─── Section meta ────────────────────────────────────────────────────────
  const meta = {
    related: {
      icon: Sparkles,
      title: 'You May Also Like',
      subtitle: 'Similar products in the same category',
      loadingText: 'Loading similar products…',
    },
    trending: {
      icon: TrendingUp,
      title: 'Trending Now',
      subtitle: 'Most popular products and services this week',
      loadingText: 'Loading trending items…',
    },
    personalized: {
      icon: isPersonalized ? Sparkles : Flame,
      title: isPersonalized ? 'Recommended for You' : 'Top Picks',
      subtitle: isPersonalized
        ? 'Based on your purchase history and wishlist'
        : 'Handpicked products and services',
      loadingText: 'Loading your recommendations…',
    },
  };

  const { icon, title, subtitle, loadingText } = meta[effectiveMode] || meta.trending;

  return (
    <section className={`py-10 ${className}`}>
      <SectionHeader icon={icon} title={title} subtitle={subtitle} />

      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span className="text-sm">{loadingText}</span>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center py-10 text-gray-400 gap-2">
          <AlertCircle className="h-5 w-5 text-gray-300" />
          <span className="text-sm">Recommendations unavailable right now.</span>
        </div>
      ) : (
        <>
          {/* Products grid */}
          {products.length > 0 && (
            <>
              {(effectiveMode === 'trending' || effectiveMode === 'personalized') && services.length > 0 && (
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Digital Products
                </h3>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {products.map((product) => (
                  <RecommendationCard key={product._id} item={product} type="product" />
                ))}
              </div>
            </>
          )}

          {/* Services grid */}
          {services.length > 0 && (
            <>
              {(effectiveMode === 'trending' || effectiveMode === 'personalized') && products.length > 0 && (
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 mt-8">
                  Services
                </h3>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {services.map((service) => (
                  <RecommendationCard key={service._id} item={service} type="service" />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default RecommendationSection;
