import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Briefcase, CheckCircle, Clock, FileText, Loader2, MessageSquare, MoreVertical, RefreshCw, Search, Shield } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetUserOrdersQuery } from '../../../store/orders/ordersApi';

// Status styles mapping
const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  in_progress: 'bg-purple-100 text-purple-800 border-purple-200',
  active: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const PurchasedServices = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch user orders
  const { data: ordersData, isLoading, isError, error, refetch } = useGetUserOrdersQuery();

  // Extract service orders
  const getServicesFromOrders = () => {
    if (!ordersData) return [];

    const services = [];
    const orders = Array.isArray(ordersData) ? ordersData : ordersData.orders || [];

    orders.forEach(order => {
      // Find service items in order
      const serviceItems = order.items?.filter(item => item.itemType === 'service') || [];

      serviceItems.forEach(item => {
        // Calculate progress from timeline
        let progress = 0;
        if (order.status === 'completed') {
          progress = 100;
        } else if (order.status === 'in_progress') {
          progress = 50;
        } else if (order.status === 'confirmed') {
          progress = 25;
        } else if (order.status === 'pending') {
          progress = 0;
        }

        // Get latest milestone
        const latestMilestone = order.timeline?.[order.timeline.length - 1];

        services.push({
          id: order._id,
          orderId: order._id,
          orderNumber: order.orderNumber,
          name: item.title,
          status: order.status === 'in_progress' ? 'active' : order.status,
          progress,
          nextMilestone: latestMilestone?.message || 'Order placed',
          dueDate: order.estimatedDelivery
            ? new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })
            : 'TBD',
          manager: 'Dev Kant Kumar',
          price: new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: order.payment?.amount?.currency || 'INR',
            minimumFractionDigits: 0,
          }).format(item.price || 0),
          description: item.description || `${item.title} - Professional service`,
          createdAt: order.createdAt,
        });
      });
    });

    return services.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const services = getServicesFromOrders();

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyles = (status) => {
    return STATUS_STYLES[status] || STATUS_STYLES.pending;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-sm text-gray-500">Loading your services...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-12 w-12 text-red-500 mb-3" />
        <p className="text-gray-700 font-medium mb-2">Failed to load services</p>
        <p className="text-sm text-gray-500 mb-4">{error?.data?.message || 'Something went wrong'}</p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Services</h1>
          <p className="mt-1 text-sm text-gray-500">Track and manage your active projects and deliverables.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-64"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Link to="/marketplace/services" className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm">
            Browse Services
          </Link>
        </div>
      </div>

      {filteredServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Briefcase className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
          <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
            You haven't purchased any services yet. Browse our services to find web development, design, and more.
          </p>
          <Link
            to="/marketplace/services"
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Services
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Service Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusStyles(service.status)}`}>
                          {service.status.replace('_', ' ')}
                        </span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-4 w-4 text-gray-400" />
                        <span>Order: <span className="font-medium text-gray-900">{service.orderNumber}</span></span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <div>Manager: <span className="font-medium text-gray-900">{service.manager}</span></div>
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <div>Due: <span className="font-medium text-gray-900">{service.dueDate}</span></div>
                    </div>

                    {/* Progress Section */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Project Progress</span>
                        <span className="text-sm font-bold text-gray-900">{service.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                        <div
                          className={`h-2.5 rounded-full transition-all duration-500 ${service.status === 'completed' ? 'bg-green-500' : 'bg-blue-600'}`}
                          style={{ width: `${service.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {service.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-blue-500" />
                        )}
                        <span className="text-gray-600">
                          {service.status === 'completed' ? 'All milestones completed' : `Current: `}
                          {service.status !== 'completed' && <span className="font-medium text-gray-900">{service.nextMilestone}</span>}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col items-center justify-center gap-3 lg:border-l lg:border-gray-100 lg:pl-6 min-w-[140px]">
                    <Link
                      to={`/marketplace/dashboard/services/${service.id}`}
                      state={{ tab: 'messages' }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </Link>
                    <Link
                      to={`/marketplace/dashboard/services/${service.id}`}
                      state={{ tab: 'files' }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      Files
                    </Link>
                    <Link
                      to={`/marketplace/dashboard/services/${service.id}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PurchasedServices;
