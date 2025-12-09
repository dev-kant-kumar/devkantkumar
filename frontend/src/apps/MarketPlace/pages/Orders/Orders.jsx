import { motion } from 'framer-motion';
import { ChevronRight, Download, Filter, Package, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../store/auth/authSlice';

import ecommerceUiKit from '../../assets/images/ecommerce-ui-kit.png';

const Orders = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/marketplace/auth/signin', { state: { from: '/marketplace/dashboard/orders' } });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const recentOrders = [
    {
      id: 'ORD-7352',
      product: 'E-commerce UI Kit',
      date: 'Oct 24, 2023',
      amount: '$49.00',
      status: 'completed',
      items: 1,
      image: ecommerceUiKit
    },
    {
      id: 'ORD-7351',
      product: 'SaaS Dashboard Template',
      date: 'Oct 22, 2023',
      amount: '$79.00',
      status: 'processing',
      items: 1,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
      id: 'ORD-7350',
      product: 'Portfolio Website Theme',
      date: 'Oct 15, 2023',
      amount: '$39.00',
      status: 'completed',
      items: 1,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
      id: 'ORD-7349',
      product: 'Mobile App UI Kit',
      date: 'Oct 10, 2023',
      amount: '$59.00',
      status: 'cancelled',
      items: 1,
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=100&h=100'
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = recentOrders.filter(order =>
    order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyles = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-1 text-sm text-gray-500">View and manage your purchase history</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-64"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <motion.div
            key={order.id}
            whileHover={{ y: -2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Order Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors cursor-pointer">
                        {order.product}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Order #{order.id} • {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{order.amount}</p>
                      <p className="text-xs text-gray-500">{order.items} item(s)</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(order.status)} capitalize`}>
                      {order.status}
                    </span>

                    <div className="flex items-center gap-3">
                      {order.status === 'completed' && (
                        <Link
                          to={`/marketplace/dashboard/orders/${order.id}/invoice`}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          <Download className="h-4 w-4 mr-1.5" />
                          Invoice
                        </Link>
                      )}
                      <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium group">
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar for Processing Orders */}
            {order.status === 'processing' && (
              <div className="bg-blue-50 px-6 py-3 border-t border-blue-100 flex items-center gap-3">
                <Package className="h-4 w-4 text-blue-600 animate-pulse" />
                <span className="text-sm text-blue-700 font-medium">
                  Your order is being processed. Estimated completion: 24 hours.
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Orders;
