import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaStar,
  FaFilter,
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaClock
} from 'react-icons/fa';

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'development', name: 'Development' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'consulting', name: 'Consulting' },
    { id: 'content', name: 'Content Creation' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-100', name: '$0 - $100' },
    { id: '100-500', name: '$100 - $500' },
    { id: '500-1000', name: '$500 - $1000' },
    { id: '1000+', name: '$1000+' }
  ];

  // Mock services data
  useEffect(() => {
    const mockServices = [
      {
        id: 'web-development',
        title: 'Custom Web Development',
        description: 'Professional web development services tailored to your business needs',
        image: '/api/placeholder/400/250',
        price: 299,
        rating: 4.9,
        reviews: 127,
        category: 'development',
        seller: 'DevKant Kumar',
        deliveryTime: '7-14 days',
        tags: ['React', 'Node.js', 'MongoDB']
      },
      {
        id: 'ui-ux-design',
        title: 'UI/UX Design Services',
        description: 'Create stunning user interfaces and experiences for your applications',
        image: '/api/placeholder/400/250',
        price: 199,
        rating: 4.8,
        reviews: 89,
        category: 'design',
        seller: 'Design Studio',
        deliveryTime: '5-10 days',
        tags: ['Figma', 'Adobe XD', 'Prototyping']
      },
      {
        id: 'digital-marketing',
        title: 'Digital Marketing Strategy',
        description: 'Comprehensive digital marketing solutions to grow your business',
        image: '/api/placeholder/400/250',
        price: 399,
        rating: 4.7,
        reviews: 156,
        category: 'marketing',
        seller: 'Marketing Pro',
        deliveryTime: '3-7 days',
        tags: ['SEO', 'Social Media', 'PPC']
      },
      {
        id: 'mobile-app',
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications',
        image: '/api/placeholder/400/250',
        price: 799,
        rating: 4.9,
        reviews: 203,
        category: 'development',
        seller: 'Mobile Expert',
        deliveryTime: '14-21 days',
        tags: ['React Native', 'Flutter', 'iOS']
      },
      {
        id: 'content-writing',
        title: 'Professional Content Writing',
        description: 'High-quality content for websites, blogs, and marketing materials',
        image: '/api/placeholder/400/250',
        price: 99,
        rating: 4.6,
        reviews: 78,
        category: 'content',
        seller: 'Content Creator',
        deliveryTime: '2-5 days',
        tags: ['SEO Writing', 'Blog Posts', 'Copywriting']
      },
      {
        id: 'business-consulting',
        title: 'Business Strategy Consulting',
        description: 'Expert business advice and strategic planning services',
        image: '/api/placeholder/400/250',
        price: 599,
        rating: 4.8,
        reviews: 92,
        category: 'consulting',
        seller: 'Business Advisor',
        deliveryTime: '7-10 days',
        tags: ['Strategy', 'Planning', 'Analysis']
      }
    ];

    setTimeout(() => {
      setServices(mockServices);
      setFilteredServices(mockServices);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter services based on search term, category, and price range
  useEffect(() => {
    let filtered = services;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      filtered = filtered.filter(service => {
        if (priceRange === '1000+') {
          return service.price >= 1000;
        }
        return service.price >= parseInt(min) && service.price <= parseInt(max);
      });
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, selectedCategory, priceRange]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover expert services to help grow your business and achieve your goals
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-6 sticky top-8"
            >
              <div className="flex items-center mb-4">
                <FaFilter className="mr-2 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Services
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priceRanges.map(range => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange('all');
                }}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          </div>

          {/* Services Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredServices.length} of {services.length} services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <FaHeart className="text-gray-400 hover:text-red-500" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {categories.find(c => c.id === service.category)?.name}
                      </span>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{service.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({service.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <FaUser className="mr-1" />
                      <span className="mr-4">{service.seller}</span>
                      <FaClock className="mr-1" />
                      <span>{service.deliveryTime}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {service.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500">Starting at</span>
                        <div className="text-xl font-bold text-gray-900">${service.price}</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <FaShoppingCart className="text-gray-600" />
                        </button>
                        <Link
                          to={`/marketplace/services/${service.id}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
