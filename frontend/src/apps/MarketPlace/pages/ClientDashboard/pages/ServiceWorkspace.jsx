import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Clock, FileText, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ServiceChat from '../components/ServiceChat';
import ServiceFiles from '../components/ServiceFiles';

const ServiceWorkspace = () => {
  const { serviceId } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'overview');

  const service = {
    id: serviceId || 'SRV-001',
    name: 'Custom E-commerce Development',
    status: 'active',
    progress: 65,
    manager: 'Alex M.',
    milestones: [
      { id: 1, title: 'Project Kickoff & Requirements', status: 'completed', date: 'Oct 20, 2023' },
      { id: 2, title: 'UI/UX Design Phase', status: 'completed', date: 'Oct 28, 2023' },
      { id: 3, title: 'Frontend Integration', status: 'active', date: 'In Progress' },
      { id: 4, title: 'Backend Development', status: 'pending', date: 'Upcoming' },
      { id: 5, title: 'Testing & QA', status: 'pending', date: 'Upcoming' },
      { id: 6, title: 'Final Delivery', status: 'pending', date: 'Upcoming' },
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link to="/marketplace/dashboard/services" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to My Services
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{service.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border bg-blue-100 text-blue-800 border-blue-200">
                {service.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">Order ID: {service.id} • Managed by {service.manager}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Request Support
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm">
              Approve Milestone
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
              ${activeTab === 'overview'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <Clock className="h-4 w-4" />
            Timeline & Overview
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
              ${activeTab === 'messages'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <MessageSquare className="h-4 w-4" />
            Messages
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
              ${activeTab === 'files'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <FileText className="h-4 w-4" />
            Files & Assets
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Timeline */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Project Timeline</h3>
                <div className="relative">
                  <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200" />
                  <div className="space-y-8">
                    {service.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="relative flex items-start pl-12">
                        <div
                          className={`
                            absolute left-0 top-1 h-8 w-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10
                            ${milestone.status === 'completed' ? 'bg-green-500' : milestone.status === 'active' ? 'bg-blue-500' : 'bg-gray-200'}
                          `}
                        >
                          {milestone.status === 'completed' && <CheckCircle className="h-4 w-4 text-white" />}
                          {milestone.status === 'active' && <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />}
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-sm font-bold ${milestone.status === 'pending' ? 'text-gray-500' : 'text-gray-900'}`}>
                            {milestone.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{milestone.date}</p>
                          {milestone.status === 'active' && (
                            <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800">
                              Current Phase: The team is working on integrating the frontend components with the API.
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Project Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Overall Progress</span>
                      <span className="font-bold text-gray-900">{service.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${service.progress}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Start Date</span>
                    <span className="text-sm font-medium text-gray-900">Oct 20, 2023</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Est. Delivery</span>
                    <span className="text-sm font-medium text-gray-900">Dec 25, 2023</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Total Budget</span>
                    <span className="text-sm font-medium text-gray-900">$2,500.00</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'messages' && <ServiceChat />}
        {activeTab === 'files' && <ServiceFiles />}
      </div>
    </motion.div>
  );
};

export default ServiceWorkspace;
