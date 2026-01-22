import {
    AlertCircle,
    ArrowLeft,
    Calendar,
    Check,
    Loader2,
    RefreshCw,
    Share2,
    ShoppingCart,
    Star,
    User
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PriceDisplay from '../../../../components/common/PriceDisplay';
import ShareModal from '../../../../components/common/ShareModal';
import ReviewForm from '../../../../components/Reviews/ReviewForm';
import ReviewList from '../../../../components/Reviews/ReviewList';
import SEOHead from '../../../../components/SEO/SEOHead';
import { useAddToCartMutation } from '../../../../store/cart/cartApi';
import { useCurrency } from '../../context/CurrencyContext';
import { useGetServiceByIdQuery } from '../../store/api/marketplaceApi';
import { selectIsAuthenticated } from '../../store/auth/authSlice';
import { addToCart } from '../../store/cart/cartSlice';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Fetch real service data
  const { data: serviceData, isLoading, isError, error, refetch } = useGetServiceByIdQuery(serviceId, {
    skip: !serviceId,
  });

  const service = serviceData?.service || serviceData;

  // Handle add to cart
  // Handle add to cart
  const [addToCartApi, { isLoading: isAdding }] = useAddToCartMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleAddToCart = async () => {
    if (!service || !service.packages?.[selectedPackage]) return;

    const pkg = service.packages[selectedPackage];

    if (isAuthenticated) {
        try {
            await addToCartApi({
                serviceId: service._id,
                quantity: 1,
                package: pkg.name
            }).unwrap();
            toast.success('Added to cart!');
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to add to cart');
        }
    } else {
        dispatch(addToCart({
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
        }));
        toast.success('Added to cart!');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: service.title,
                text: service.description,
                url: window.location.href,
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    } else {
        setIsShareModalOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-500">Loading service...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load service</h3>
          <p className="text-gray-600 mb-4">{error?.data?.message || 'Something went wrong'}</p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h2>
          <Link to="/marketplace/services" className="text-blue-600 hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  // Build packages array - handle both array and empty cases
  const packages = service.packages?.length > 0 ? service.packages : [
    { name: 'Standard', price: service.startingPrice || 99, deliveryTime: service.deliveryTime || 7, features: service.features || [] }
  ];

  const { getPrice, formatPrice } = useCurrency();
  const currentPkg = packages[selectedPackage];
  const priceData = getPrice(currentPkg);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={service.title}
        description={service.description}
        image={service.images?.[0]?.url}
        type="service"
      />
      <ServiceSchema service={service} />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 h-14 flex items-center">
          <Link to="/marketplace/services" className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>
          <div className="h-4 w-px bg-gray-300 mx-4"></div>
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{service.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">

            {/* Gallery Section */}
            <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200 overflow-hidden mb-8">
               <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                   <img
                      src={service.images?.[0]?.url || '/api/placeholder/800/400'}
                      alt={service.title}
                      className="w-full h-full object-cover"
                   />
               </div>
            </div>

            {/* Service Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider">
                        {service.category || 'Service'}
                    </span>
                    <div className="flex items-center">
                         <Star className="text-yellow-400 mr-1 h-4 w-4" />
                         <span className="font-medium">{service.rating?.average || 0}</span>
                         <span className="ml-1">({service.rating?.count || 0} reviews)</span>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-6">{service.title}</h1>

                <div className="prose max-w-none text-gray-600">
                    <p className="whitespace-pre-wrap">{service.longDescription || service.description}</p>
                </div>

                {service.features && service.features.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                                    <span className="text-gray-600">{typeof feature === 'string' ? feature : feature.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* FAQ Section */}
            {service.faq && service.faq.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {service.faq.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                      <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-8">
                 <ReviewForm serviceId={service._id} />
                 <ReviewList serviceId={service._id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">

                {/* Package Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Package Selector */}
                    {packages.length > 1 && (
                        <div className="flex border-b border-gray-200">
                            {packages.map((pkg, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedPackage(idx)}
                                    className={`flex-1 py-3 text-sm font-medium transition-colors ${
                                        selectedPackage === idx
                                            ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                                    }`}
                                >
                                    {pkg.name}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="p-6">
                        {/* Pricing Header */}
                        <div className="flex items-start justify-between mb-6">
                             <div className="flex flex-col">
                                 <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">{packages[selectedPackage]?.name}</span>
                                 {/* Dynamic Badge if Discount */}
                                 {packages[selectedPackage]?.discount > 0 && (
                                     <span className="inline-block self-start text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                                         SAVE {packages[selectedPackage]?.discount}%
                                     </span>
                                 )}
                             </div>

                             <div className="text-right">
                                <PriceDisplay
                                    price={packages[selectedPackage]?.price}
                                    originalPrice={packages[selectedPackage]?.originalPrice}
                                    showOriginal={true}
                                    className="items-end"
                                    textClass="text-gray-900"
                                />
                             </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-6 min-h-[60px]">
                            {packages[selectedPackage]?.description || service.description}
                        </p>

                         <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span className="font-medium">{packages[selectedPackage]?.deliveryTime || 7} Days Delivery</span>
                            </div>
                            <div className="flex items-center">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                <span className="font-medium">
                                    {packages[selectedPackage]?.revisions === -1 || !packages[selectedPackage]?.revisions
                                        ? 'Unlimited'
                                        : packages[selectedPackage]?.revisions} Revisions
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                             {(packages[selectedPackage]?.features || []).map((feature, idx) => (
                                 <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                     <Check className="h-4 w-4 text-green-500" />
                                     <span>{typeof feature === 'string' ? feature : feature.name}</span>
                                 </div>
                             ))}
                        </div>

                         <div className="space-y-3">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {isAdding ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShoppingCart size={20} />}
                                {isAdding ? 'Adding...' : 'Continue'}
                            </button>
                            <Link
                                to="/marketplace/contact"
                                className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                            >
                                Contact Seller
                            </Link>
                            <button
                                onClick={handleShare}
                                className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <Share2 size={18} />
                                Share Service
                            </button>
                        </div>
                    </div>
                </div>

                {/* Seller Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                     <div className="flex items-center gap-4 mb-4">
                         <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                             <User />
                         </div>
                         <div>
                             <h4 className="font-bold text-gray-900">Dev Kant Kumar</h4>
                             <p className="text-sm text-gray-500">Full Stack Developer</p>
                         </div>
                     </div>
                     <button className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                         View Profile
                     </button>
                </div>

            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={service?.title}
        text={service?.description}
      />
    </div>
  );
};

export default ServiceDetail;
