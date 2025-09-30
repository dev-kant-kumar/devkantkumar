import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  Star,
  User,
  Calendar,
  ShoppingCart,
  Heart,
  Share2
} from 'lucide-react';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock service data - in real app, this would come from API
  useEffect(() => {
    const mockServices = {
      'web-development': {
        id: 'web-development',
        title: 'Custom Web Development',
        description: 'Professional web development services tailored to your business needs',
        longDescription: 'Transform your digital presence with our comprehensive web development services. We create responsive, scalable, and user-friendly websites that drive results and enhance your brand identity.',
        image: '/api/placeholder/800/400',
        rating: 4.9,
        reviews: 127,
        deliveryTime: '7-14 days',
        revisions: 'Unlimited',
        category: 'Development',
        tags: ['React', 'Node.js', 'MongoDB', 'Responsive Design'],
        packages: [
          {
            name: 'Basic',
            price: 299,
            description: 'Perfect for small businesses',
            features: [
              'Responsive Design',
              '5 Pages',
              'Contact Form',
              'Basic SEO',
              '30 Days Support'
            ]
          },
          {
            name: 'Standard',
            price: 599,
            description: 'Most popular choice',
            features: [
              'Everything in Basic',
              '10 Pages',
              'CMS Integration',
              'Advanced SEO',
              'Social Media Integration',
              '60 Days Support'
            ]
          },
          {
            name: 'Premium',
            price: 999,
            description: 'For growing businesses',
            features: [
              'Everything in Standard',
              'Unlimited Pages',
              'E-commerce Integration',
              'Custom Features',
              'Performance Optimization',
              '90 Days Support'
            ]
          }
        ],
        portfolio: [
          { title: 'E-commerce Platform', image: '/api/placeholder/300/200' },
          { title: 'Corporate Website', image: '/api/placeholder/300/200' },
          { title: 'Portfolio Site', image: '/api/placeholder/300/200' }
        ],
        faq: [
          {
            question: 'What technologies do you use?',
            answer: 'We use modern technologies like React, Node.js, MongoDB, and other cutting-edge tools based on project requirements.'
          },
          {
            question: 'How long does development take?',
            answer: 'Development time varies based on complexity, typically ranging from 1-4 weeks for most projects.'
          },
          {
            question: 'Do you provide ongoing support?',
            answer: 'Yes, we provide comprehensive support and maintenance packages to keep your website running smoothly.'
          }
        ]
      }
    };

    setTimeout(() => {
      setService(mockServices[serviceId] || mockServices['web-development']);
      setLoading(false);
    }, 1000);
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h2>
          <Link to="/marketplace/services" className="text-blue-600 hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/marketplace" className="hover:text-blue-600">Marketplace</Link>
            <span>/</span>
            <Link to="/marketplace/services" className="hover:text-blue-600">Services</Link>
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
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {service.category}
                  </span>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-red-500">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-blue-500">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h1>
                <p className="text-gray-600 mb-4">{service.longDescription}</p>

                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-1 h-4 w-4 fill-current" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="ml-1">({service.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{service.deliveryTime}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="mr-1 h-4 w-4" />
                    <span>{service.revisions} revisions</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {service.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Portfolio Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Portfolio</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {service.portfolio.map((item, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3 bg-gray-50">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {service.faq.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                    <p className="text-gray-600">{item.answer}</p>
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
              className="bg-white rounded-lg shadow-md p-6 sticky top-8"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Your Package</h3>

              {/* Package Selector */}
              <div className="flex space-x-2 mb-6">
                {service.packages.map((pkg, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPackage(index)}
                    className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                      selectedPackage === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pkg.name}
                  </button>
                ))}
              </div>

              {/* Selected Package Details */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-2xl text-gray-900">
                    ${service.packages[selectedPackage].price}
                  </h4>
                  <span className="text-sm text-gray-600">
                    {service.packages[selectedPackage].name}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {service.packages[selectedPackage].description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.packages[selectedPackage].features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <Check className="text-green-500 mr-2 flex-shrink-0 h-4 w-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </button>
                <button className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Contact Seller
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
                <div className="flex justify-between mb-2">
                  <span>Delivery Time:</span>
                  <span className="font-medium">{service.deliveryTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Revisions:</span>
                  <span className="font-medium">{service.revisions}</span>
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
