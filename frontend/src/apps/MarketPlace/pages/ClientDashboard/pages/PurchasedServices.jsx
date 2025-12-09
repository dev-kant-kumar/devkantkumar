import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, FileText, MessageSquare, MoreVertical, Search, Shield } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const PurchasedServices = () => {
  const services = [
    {
      id: 'SRV-001',
      name: 'Custom E-commerce Development',
      status: 'active',
      progress: 65,
      nextMilestone: 'Frontend Integration',
      dueDate: 'Dec 25, 2023',
      manager: 'Alex M.',
      price: '$2,500',
      description: 'Full-stack e-commerce solution with custom payment gateway integration.'
    },
    {
      id: 'SRV-002',
      name: 'Logo Design & Branding',
      status: 'completed',
      progress: 100,
      nextMilestone: 'Completed',
      dueDate: 'Nov 10, 2023',
      manager: 'Sarah K.',
      price: '$800',
      description: 'Complete brand identity package including logo, color palette, and typography.'
    },
    {
      id: 'SRV-003',
      name: 'SEO Audit & Optimization',
      status: 'pending',
      progress: 0,
      nextMilestone: 'Initial Consultation',
      dueDate: 'Jan 05, 2024',
      manager: 'Mike R.',
      price: '$450',
      description: 'Comprehensive SEO audit and on-page optimization strategy.'
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyles = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
                        {service.status}
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
                      <span>Order ID: <span className="font-medium text-gray-900">{service.id}</span></span>
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
                        {service.status === 'completed' ? 'All milestones completed' : `Current Milestone: `}
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
    </motion.div>
  );
};

export default PurchasedServices;
