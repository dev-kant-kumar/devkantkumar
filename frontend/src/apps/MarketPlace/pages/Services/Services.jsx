import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Star,
  Clock,
  User,
  ArrowRight,
  Globe,
  Smartphone,
  Code,
  Palette,
  Database,
  Shield
} from 'lucide-react';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const categories = [
    { id: 'all', name: 'All Services', icon: Globe },
    { id: 'web', name: 'Web Development', icon: Globe },
    { id: 'mobile', name: 'Mobile Apps', icon: Smartphone },
    { id: 'design', name: 'UI/UX Design', icon: Palette },
    { id: 'backend', name: 'Backend Development', icon: Database },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'custom', name: 'Custom Solutions', icon: Code }
  ];

  const services = [
    {
      id: 'web-development',
      title: 'Custom Web Development',
      description: 'Professional web development services with modern technologies',
      category: 'web',
      price: 999,
      rating: 4.9,
      reviews: 127,
      deliveryTime: '7-14 days',
      seller: 'DevKant Kumar',
      image: '/api/placeholder/400/250',
      tags: ['React', 'Node.js', 'MongoDB', 'Responsive']
    },
    {
      id: 'mobile-app',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications',
      category: 'mobile',
      price: 1999,
      rating: 4.8,
      reviews: 89,
      deliveryTime: '14-21 days',
      seller: 'DevKant Kumar',
      image: '/api/placeholder/400/250',
      tags: ['React Native', 'Flutter', 'iOS', 'Android']
    },
    {
      id: 'ui-design',
      title: 'UI/UX Design Services',
      description: 'Modern and user-friendly interface design',
      category: 'design',
      price: 599,
      rating: 5.0,
      reviews: 156,
      deliveryTime: '5-10 days',
      seller: 'DevKant Kumar',
      image: '/api/placeholder/400/250',
      tags: ['Figma', 'Adobe XD', 'Prototyping', 'User Research']
    },
    {
      id: 'backend-api',
      title: 'Backend API Development',
      description: 'Scalable and secure backend solutions',
      category: 'backend',
      price: 799,
      rating: 4.7,
      reviews: 73,
      deliveryTime: '10-15 days',
      seller: 'DevKant Kumar',
      image: '/api/placeholder/400/250',
      tags: ['Node.js', 'Express', 'MongoDB', 'REST API']
    },
    {
      id: 'security-audit',
      title: 'Security Audit & Testing',
      description: 'Comprehensive security assessment and testing',
      category: 'security',
      price: 1299,
      rating: 4.9,
      reviews: 45,
      deliveryTime: '7-12 days',
      seller: 'DevKant Kumar',
      image: '/api/placeholder/400/250',
      tags: ['Penetration Testing', 'Vulnerability Assessment', 'Security']
    },
    {
      id: 'custom-solution',
      title: 'Custom Software Solutions',
      description: 'Tailored software solutions for your business needs',
      category: 'custom',
      price: 2499,
      rating: 4.8,
      reviews: 62,
      deliveryTime: '21-30 days',
      seller: 'DevKant Kumar',
      image: '/api/placeholder/400/250',
      tags: ['Custom Development', 'Enterprise', 'Scalable', 'Integration']
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === 'low' && service.price < 1000) ||
                        (priceRange === 'medium' && service.price >= 1000 && service.price < 2000) ||
                        (priceRange === 'high' && service.price >= 2000);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover expert development services to bring your ideas to life
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Services
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <category.icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under $1,000</option>
                  <option value="medium">$1,000 - $2,000</option>
                  <option value="high">$2,000+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredServices.length} services found
              </p>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Sort by: Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
                <option>Delivery Time</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {categories.find(cat => cat.id === service.category)?.name}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">
                          {service.rating} ({service.reviews})
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <User className="h-4 w-4 mr-1" />
                      <span className="mr-4">{service.seller}</span>
                      <Clock className="h-4 w-4 mr-1" />
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
                      {service.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{service.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-blue-600">
                        ${service.price.toLocaleString()}
                      </div>
                      <Link
                        to={`/marketplace/services/${service.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                      >
                        View Details
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No services found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or browse all services
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
