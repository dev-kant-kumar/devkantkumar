import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  Calendar,
  Check,
  CheckCircle,
  Heart,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAddToCartMutation } from "../../../../store/cart/cartApi";
import { selectCountryCode } from "../../../../store/region/regionSlice";
import { formatCurrency, getPriceForRegion } from "../../../../utils/price";
import { selectCurrentUser } from "../../store/auth/authSlice";
import { selectServiceById } from "../../store/services/servicesSlice";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const countryCode = useSelector(selectCountryCode);
  const service = useSelector((state) => selectServiceById(state, serviceId));
  const [selectedPackage, setSelectedPackage] = useState(0);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Service Not Found
          </h2>
          <Link to="/marketplace/services" className="text-blue-600 hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  // Get price for the selected package based on region
  const selectedPkg = service.packages?.[selectedPackage] || service.packages?.[0];
  const { price, currency } = getPriceForRegion(selectedPkg, countryCode);

  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    if (!user) {
       toast.error("Please login to book a service");
       navigate("/marketplace/auth/signin");
       return;
    }

    const pkg = service.packages[selectedPackage];

    try {
      await addToCart({
        itemType: 'service',
        itemId: service._id, // Ensure we use _id
        packageName: pkg.name,
        quantity: 1
      }).unwrap();
      toast.success(`added ${pkg.name} package to cart`);
      navigate("/marketplace/cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error(error?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/marketplace" className="hover:text-blue-600">
              Marketplace
            </Link>
            <span>/</span>
            <Link to="/marketplace/services" className="hover:text-blue-600">
              Services
            </Link>
            <span>/</span>
            <span className="text-gray-900">{service.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Link
                to="/marketplace/services"
                className="inline-flex items-center text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </motion.div>

            {/* Service Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {service.category}
                  </span>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="h-6 w-6" />
                    </button>
                    <button className="text-gray-400 hover:text-blue-500 transition-colors">
                      <Share2 className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {service.longDescription}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-t border-gray-100 pt-6">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-2 h-5 w-5 fill-current" />
                    <span className="font-bold text-gray-900 text-lg">
                      {service.rating}
                    </span>
                    <span className="ml-1">({service.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                    <span>{service.deliveryTime} Delivery</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    <span>{service.revisions} Revisions</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {service.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Why Choose Us Section (CRO) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-blue-50 rounded-lg p-8 mb-8 border border-blue-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose Us?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Top 1% Talent</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Vetted experts delivering quality.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Fast Delivery</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    On-time project completion.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    <ShieldCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Secure Code</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Enterprise-grade security.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Portfolio Section */}
            {service.portfolio && service.portfolio.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-8 mb-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Portfolio
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {service.portfolio.map((item, index) => (
                    <div
                      key={index}
                      className="group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 bg-gray-50">
                        <h4 className="font-medium text-gray-900">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                {service.faq.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2 text-lg">
                      {item.question}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-6 sticky top-8 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Choose Your Package
              </h3>

              {/* Package Selector */}
              <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
                {service.packages.map((pkg, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPackage(index)}
                    className={`flex-1 py-2 px-2 rounded-md text-sm font-medium transition-all ${
                      selectedPackage === index
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {pkg.name}
                  </button>
                ))}
              </div>

              {/* Selected Package Details */}
              <div className="mb-8">
                <div className="flex items-end justify-between mb-4">
                  <h4 className="font-bold text-4xl text-gray-900">
                    ${service.packages[selectedPackage].price.toLocaleString()}
                  </h4>
                  <span className="text-sm font-medium text-gray-500 mb-1">
                    {service.packages[selectedPackage].name}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-6 pb-6 border-b border-gray-100">
                  {service.packages[selectedPackage].description}
                </p>

                <ul className="space-y-4 mb-8">
                  {service.packages[selectedPackage].features.map(
                    (feature, index) => (
                      <li
                        key={index}
                        className="flex items-start text-sm text-gray-700"
                      >
                        <Check className="text-green-500 mr-3 flex-shrink-0 h-5 w-5" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-blue-200 flex items-center justify-center ${
                    isAddingToCart ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {isAddingToCart ? "Adding..." : `Continue (${formatCurrency(price, currency)})`}
                </button>
                <button className="w-full border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors">
                  Contact Seller
                </button>
              </div>

              {/* Trust Badges (CRO) */}
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <ShieldCheck className="h-5 w-5 text-green-500 mr-3" />
                  <span>100% Satisfaction Guarantee</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                  <span>Verified Professional Seller</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-100 text-sm text-gray-500 flex justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{service.deliveryTime}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{service.revisions} Revs</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
