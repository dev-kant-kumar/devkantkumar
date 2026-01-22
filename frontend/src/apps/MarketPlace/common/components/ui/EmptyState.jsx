import { motion } from 'framer-motion';
import { Package, Rocket, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({
  icon: Icon = Package,
  title = 'Coming Soon!',
  description = 'We\'re adding exciting new content. Stay tuned!',
  actionLabel,
  actionLink,
  onAction,
  variant = 'default', // 'default' | 'products' | 'services' | 'cart'
  showNewsletter = false
}) => {
  const variants = {
    products: {
      icon: Package,
      title: 'Products Coming Soon',
      description: 'We\'re curating premium digital products just for you. Templates, components, and more!',
      gradient: 'from-blue-500 to-purple-500'
    },
    services: {
      icon: Rocket,
      title: 'Services Coming Soon',
      description: 'Expert development services are being prepared. From web apps to custom solutions!',
      gradient: 'from-emerald-500 to-teal-500'
    },
    cart: {
      icon: Package,
      title: 'Your Cart is Empty',
      description: 'Start exploring our products and services to find something you love!',
      gradient: 'from-orange-500 to-red-500'
    },
    default: {
      icon: Sparkles,
      title: title,
      description: description,
      gradient: 'from-blue-500 to-indigo-500'
    }
  };

  const config = variants[variant] || variants.default;
  const DisplayIcon = Icon !== Package ? Icon : config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {/* Animated Icon Container */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className={`relative mb-8`}
      >
        {/* Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-full blur-2xl opacity-30 scale-150`}></div>

        {/* Icon Circle */}
        <div className={`relative w-24 h-24 bg-gradient-to-br ${config.gradient} rounded-full flex items-center justify-center shadow-2xl`}>
          <DisplayIcon className="h-12 w-12 text-white" strokeWidth={1.5} />
        </div>

        {/* Sparkle decorations */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
          <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
          <div className="absolute top-1/2 -right-4 w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {config.title}
      </h3>
      <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
        {config.description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {actionLink && (
          <Link
            to={actionLink}
            className={`px-6 py-3 bg-gradient-to-r ${config.gradient} text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center`}
          >
            {actionLabel || 'Explore'}
            <Rocket className="ml-2 h-4 w-4" />
          </Link>
        )}
        {onAction && !actionLink && (
          <button
            onClick={onAction}
            className={`px-6 py-3 bg-gradient-to-r ${config.gradient} text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center`}
          >
            {actionLabel || 'Explore'}
          </button>
        )}
        {variant === 'cart' && (
          <Link
            to="/marketplace/products"
            className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all duration-300"
          >
            Browse Products
          </Link>
        )}
      </div>

      {/* Newsletter Section */}
      {showNewsletter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 w-full max-w-md"
        >
          <p className="text-sm text-gray-500 mb-3">Get notified when we launch:</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button className={`px-6 py-3 bg-gradient-to-r ${config.gradient} text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300`}>
              Notify Me
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;
