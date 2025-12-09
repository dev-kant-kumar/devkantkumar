import { motion } from 'framer-motion';
import {
    FaArrowLeft,
    FaBolt,
    FaCheckCircle,
    FaDownload,
    FaEye,
    FaFileAlt,
    FaHeart,
    FaShareAlt,
    FaShieldAlt,
    FaShoppingCart,
    FaStar
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../../store/cart/cartSlice';
import { selectProductById } from '../../store/products/productsSlice';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(state => selectProductById(state, productId));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <Link to="/marketplace/products" className="text-blue-600 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  const discountPercentage = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    console.log('Adding to cart:', product.title);
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      type: 'Digital Product'
    }));
    navigate('/marketplace/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb & Navigation */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/marketplace" className="hover:text-blue-600">Marketplace</Link>
              <span>/</span>
              <Link to="/marketplace/products" className="hover:text-blue-600">Products</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.title}</span>
            </div>
            <Link
              to="/marketplace/products"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back to List
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Product Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8"
            >
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.isPopular && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center border border-white/50">
                    <FaStar className="mr-1.5 text-yellow-400" /> POPULAR CHOICE
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold uppercase tracking-wide">
                  {product.category}
                </span>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full">
                    <FaHeart className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-blue-500 transition-colors p-2 hover:bg-blue-50 rounded-full">
                    <FaShareAlt className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                {product.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">{product.rating}</span>
                  <span className="ml-1">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <FaDownload className="mr-2 text-blue-500" />
                  <span className="font-medium">{product.downloads.toLocaleString()} Sales</span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="mr-2 text-green-500" />
                  <span className="font-medium">Last Updated: Jan 2024</span>
                </div>
              </div>

              <div className="prose max-w-none text-gray-600 leading-relaxed mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="mb-4">{product.longDescription || product.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Specifications & Includes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.specifications && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Specifications</h3>
                  <div className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between pb-3 border-b border-gray-50 last:border-0">
                        <span className="text-gray-500">{key}</span>
                        <span className="font-bold text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {product.includes && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">What's Included</h3>
                  <div className="space-y-4">
                    {product.includes.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm">
                          <FaFileAlt />
                        </div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar - Sticky Purchase Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                <div className="mb-6">
                  <p className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">Total Price</p>
                  <div className="flex items-end gap-3">
                    {product.price === 0 ? (
                      <span className="text-4xl font-extrabold text-green-600">Free</span>
                    ) : (
                      <>
                        <span className="text-4xl font-extrabold text-gray-900">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-xl text-gray-400 line-through mb-1">${product.originalPrice}</span>
                        )}
                      </>
                    )}
                  </div>
                  {discountPercentage > 0 && (
                    <div className="mt-2 inline-block bg-red-50 text-red-600 px-3 py-1 rounded-lg text-sm font-bold">
                      Save {discountPercentage}% Today
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    <FaShoppingCart className="mr-2" />
                    {product.price === 0 ? 'Download Now' : 'Add to Cart'}
                  </button>
                  <button className="w-full bg-white border-2 border-gray-100 text-gray-700 py-3 px-6 rounded-xl font-bold hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center">
                    <FaEye className="mr-2" /> Live Preview
                  </button>
                </div>

                <div className="space-y-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center">
                    <FaBolt className="text-yellow-500 mr-3 text-lg" />
                    <span>Instant Download Access</span>
                  </div>
                  <div className="flex items-center">
                    <FaShieldAlt className="text-blue-500 mr-3 text-lg" />
                    <span>Secure 256-bit Payment</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-3 text-lg" />
                    <span>Quality Verified by Team</span>
                  </div>
                </div>
              </motion.div>

              {/* Support Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <h4 className="font-bold text-gray-900 mb-4">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Have questions about this product? Our support team is here to help you.
                </p>
                <button className="text-blue-600 font-bold text-sm hover:underline">
                  Contact Support &rarr;
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
