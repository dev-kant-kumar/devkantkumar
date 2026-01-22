import { motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowLeft,
    Check,
    Download,
    Loader2,
    RefreshCw,
    Share2,
    ShoppingCart
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PriceDisplay from '../../../../components/common/PriceDisplay';
import ShareModal from '../../../../components/common/ShareModal';
import SEOHead from '../../../../components/SEO/SEOHead';
import { useAddToCartMutation } from '../../../../store/cart/cartApi';
import { useCurrency } from '../../context/CurrencyContext';
import { useGetProductByIdQuery } from '../../store/api/marketplaceApi';
import { selectIsAuthenticated } from '../../store/auth/authSlice';
import { addToCart } from '../../store/cart/cartSlice';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('overview');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Fetch real product data
  const { data: productData, isLoading, isError, error, refetch } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  const product = productData?.product || productData;
  const { getPrice, formatPrice } = useCurrency();
  const priceData = getPrice(product);

  // Handle add to cart
  // Handle add to cart
  const [addToCartApi, { isLoading: isAdding }] = useAddToCartMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleAddToCart = async () => {
    if (!product) return;

    if (isAuthenticated) {
        try {
            await addToCartApi({
                productId: product._id,
                quantity: 1
            }).unwrap();
            toast.success('Added to cart!');
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to add to cart');
        }
    } else {
        dispatch(addToCart({
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
        }));
        toast.success('Added to cart!');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: product.title,
                text: product.description,
                url: window.location.href,
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    } else {
        setIsShareModalOpen(true);
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'features', name: 'Features' },
    { id: 'files', name: 'Files Included' },
    { id: 'requirements', name: 'Requirements' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load product</h3>
          <p className="text-gray-600 mb-4">{error?.data?.message || 'Something went wrong'}</p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Link to="/marketplace/products" className="text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={product.title}
        description={product.description}
        image={product.images?.[0]?.url}
        type="product"
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 h-14 flex items-center">
          <Link to="/marketplace/products" className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
          <div className="h-4 w-px bg-gray-300 mx-4"></div>
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Gallery Section */}
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-200 overflow-hidden">
               <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 relative">
                   <img
                      src={product.images?.[0]?.url || '/api/placeholder/800/450'}
                      alt={product.title}
                      className="w-full h-full object-cover"
                   />
               </div>
               {product.images?.length > 1 && (
                   <div className="flex gap-2 mt-2 px-2 pb-2 overflow-x-auto">
                       {product.images.map((img, idx) => (
                           <button key={idx} className="w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all flex-shrink-0 cursor-pointer">
                               <img src={img.url} alt="" className="w-full h-full object-cover" />
                           </button>
                       ))}
                   </div>
               )}
            </div>

            {/* Product Info & Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8 pb-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                        <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">
                            {product.category}
                        </span>
                        <span>v{product.version || '1.0.0'}</span>
                        <span>•</span>
                        <span>Updated {new Date(product.lastUpdated || product.updatedAt).toLocaleDateString()}</span>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {product.description}
                    </p>
                </div>

                {/* Tabs Header */}
                <div className="border-b border-gray-200 overflow-x-auto scrollbar-hide">
                    <div className="flex gap-8 px-8 min-w-max">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-4 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tabs Content */}
                <div className="p-8 min-h-[300px]">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'overview' && (
                            <div className="prose max-w-none">
                                <h3 className="text-xl font-semibold mb-4 text-gray-900">Product Overview</h3>
                                <div dangerouslySetInnerHTML={{ __html: product.longDescription || product.description }} />
                            </div>
                        )}

                        {activeTab === 'features' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(product.features || []).map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
                                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                                {(!product.features || product.features.length === 0) && (
                                    <p className="text-gray-500 italic">No specific features listed.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'files' && (
                             <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Included Files</h3>
                                {(product.downloadFiles || []).map((file, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                                <Download size={20} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{file.name}</p>
                                                <p className="text-xs text-gray-500">{file.size ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'} • {file.format || 'ZIP'}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        )}

                        {activeTab === 'requirements' && (
                             <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Requirements</h3>
                                 <ul className="space-y-2">
                                     {(product.requirements || ['Standard web server', 'Modern browser']).map((req, idx) => (
                                         <li key={idx} className="flex items-center gap-2 text-gray-600">
                                             <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                             {req}
                                         </li>
                                     ))}
                                 </ul>
                             </div>
                        )}
                    </motion.div>
                </div>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1 space-y-6">

            {/* Purchase Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24">
                <PriceDisplay
                    price={product.price}
                    originalPrice={product.originalPrice}
                    showOriginal={true}
                    className="text-4xl mb-6"
                    textClass="text-gray-900"
                />

                <div className="space-y-4 mb-8">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed"
                    >
                        {isAdding ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShoppingCart size={20} />}
                        {isAdding ? 'Adding...' : 'Add to Cart'}
                    </button>
                    <button
                        onClick={handleShare}
                        className="w-full py-4 bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Share2 size={20} />
                        Share Product
                    </button>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>Instant Download</span>
                    </div>
                     <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>Lifetime Updates</span>
                    </div>
                     <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{product.license || 'Personal'} License</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={product?.title}
        text={product?.description}
    />
    </div>
  );
};

export default ProductDetail;
