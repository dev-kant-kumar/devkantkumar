import { motion } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle,
    Clock,
    Layers,
    Loader2,
    Star,
    Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PriceDisplay from '../../../../components/common/PriceDisplay';
import FAQ from '../../common/components/FAQ';
import Testimonials from '../../common/components/Testimonials';
import WhyChooseUs from '../../common/components/WhyChooseUs';
import { useGetProductsQuery, useGetServicesQuery } from '../../store/api/marketplaceApi';

const Home = () => {
  // Fetch real services and products from API
  const { data: servicesData, isLoading: servicesLoading } = useGetServicesQuery({ limit: 6 });
  const { data: productsData, isLoading: productsLoading } = useGetProductsQuery({ limit: 6 });

  const services = servicesData?.services || [];
  const products = productsData?.products || [];

  const featuredServices = services.slice(0, 3);
  const featuredProducts = products.slice(0, 3);

  const isLoading = servicesLoading || productsLoading;

  const stats = [
    { number: "500+", label: "Projects Delivered", icon: CheckCircle },
    { number: "98%", label: "Client Satisfaction", icon: Star },
    { number: "24/7", label: "Expert Support", icon: Users },
    { number: "100+", label: "Premium Products", icon: Layers }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold mb-6">
                🚀 The #1 Marketplace for Devs & Founders
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                Build Faster with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Premium Resources
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Access top-tier development services and ready-to-use digital assets.
                Accelerate your project timeline with verified experts and high-quality code.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/marketplace/services"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center"
              >
                Find a Service
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/marketplace/products"
                className="px-8 py-4 bg-white text-blue-900 hover:bg-gray-100 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center border border-transparent hover:border-blue-200"
              >
                Browse Products
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="fill-gray-50">
            <path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center transform hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-full mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-extrabold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Top-Rated Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Hire world-class developers and designers for your next project.
              </p>
            </div>
            <Link
              to="/marketplace/services"
              className="hidden md:flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors"
            >
              View All Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
          ) : featuredServices.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl">
              <p className="text-gray-500">No services available at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => (
                <motion.div
                  key={service._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                    <img
                      src={service.images?.[0]?.url || '/api/placeholder/400/250'}
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 flex items-center shadow-sm">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      {service.rating?.average || 0} ({service.rating?.count || 0})
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                        {service.category?.replace(/-/g, ' ') || 'Service'}
                      </span>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {service.packages?.[0]?.deliveryTime || 7} days
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed flex-1">
                      {service.description}
                    </p>

                    {service.features && service.features.length > 0 && (
                      <div className="space-y-3 mb-6 border-t border-gray-100 pt-4">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-500">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                            {typeof feature === 'string' ? feature : feature.name}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase">Starting at</p>
                        <PriceDisplay
                          price={service.packages?.[0]?.price || service.startingPrice || 0}
                          className="text-2xl"
                          textClass="text-gray-900"
                        />
                      </div>
                      <Link
                        to={`/marketplace/services/${service._id}`}
                        className="px-4 py-2 bg-gray-50 text-gray-700 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center"
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/marketplace/services"
              className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors"
            >
              View All Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trending Digital Products
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Save hundreds of hours with our premium templates and components.
              </p>
            </div>
            <Link
              to="/marketplace/products"
              className="hidden md:flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors"
            >
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">No products available at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                    <img
                      src={product.images?.[0]?.url || '/api/placeholder/400/250'}
                      alt={product.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 flex items-center shadow-sm">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      {product.rating?.average || 0}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors truncate">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <PriceDisplay
                          price={product.price || 0}
                          className="text-2xl"
                          textClass="text-gray-900"
                        />
                        <span className="text-xs text-gray-500 block">
                          One-time payment
                        </span>
                      </div>
                      <Link
                        to={`/marketplace/products/${product._id}`}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:border-blue-600 hover:text-blue-600 transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/marketplace/products"
              className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors"
            >
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Testimonials />
      <FAQ />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join 500+ satisfied clients who have transformed their business with our solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/marketplace/custom-solutions"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center"
            >
              Get a Custom Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/marketplace/contact"
              className="px-8 py-4 bg-blue-700 text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition-all border border-blue-500 flex items-center justify-center"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
