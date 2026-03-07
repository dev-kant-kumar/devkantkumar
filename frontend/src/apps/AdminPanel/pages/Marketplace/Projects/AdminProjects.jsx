import { AnimatePresence, motion } from 'framer-motion';
import {
    Briefcase,
    Check,
    ChevronDown,
    Eye,
    Filter,
    Search
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
    useGetAdminOrdersQuery,
    useUpdateAdminOrderStatusMutation
} from '../../../store/api/adminApiSlice';

const STATUS_OPTIONS = [
  { value: '', label: 'All Status', icon: '📋', color: 'text-gray-400' },
  { value: 'pending', label: 'Pending', icon: '⏳', color: 'text-amber-500' },
  { value: 'confirmed', label: 'Confirmed', icon: '✅', color: 'text-blue-500' },
  { value: 'awaiting_requirements', label: 'Awaiting Reqs', icon: '⏳', color: 'text-orange-500' },
  { value: 'revising', label: 'Revising', icon: '🔄', color: 'text-amber-600' },
  { value: 'in_progress', label: 'In Progress', icon: '🔄', color: 'text-purple-500' },
  { value: 'delivered', label: 'Delivered', icon: '📦', color: 'text-emerald-500' },
  { value: 'completed', label: 'Completed', icon: '🎉', color: 'text-green-500' },
  { value: 'cancelled', label: 'Cancelled', icon: '❌', color: 'text-rose-500' },
];

const STATUS_COLORS = {
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20',
  confirmed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-blue-500/20',
  awaiting_requirements: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-orange-500/20',
  revising: 'bg-amber-600/10 text-amber-700 dark:text-amber-500 ring-amber-600/20',
  in_progress: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-purple-500/20',
  delivered: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20',
  completed: 'bg-green-500/10 text-green-600 dark:text-green-400 ring-green-500/20',
  cancelled: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20',
};

const PROJECT_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', icon: '⏳', color: 'text-amber-500' },
  { value: 'confirmed', label: 'Confirmed', icon: '✅', color: 'text-blue-500' },
  { value: 'awaiting_requirements', label: 'Awaiting Reqs', icon: '⏳', color: 'text-orange-500' },
  { value: 'revising', label: 'Revising', icon: '🔄', color: 'text-amber-600' },
  { value: 'in_progress', label: 'In Progress', icon: '🔄', color: 'text-purple-500' },
  { value: 'delivered', label: 'Delivered', icon: '📦', color: 'text-emerald-500' },
  { value: 'completed', label: 'Completed', icon: '🎉', color: 'text-green-500' },
  { value: 'cancelled', label: 'Cancelled', icon: '❌', color: 'text-rose-500' },
];

// Calculate progress from timeline
const calculateProgress = (order) => {
  if (order?.status === 'completed') return 100;
  if (order?.status === 'cancelled') return 0;
  if (order?.status === 'delivered') return 90;

  if (!order?.timeline || order.timeline.length === 0) return 0;

  const completedStatuses = ['completed', 'delivered', 'payment_completed', 'confirmed', 'in_progress'];

  // Count unique progression steps from timeline
  const uniqueSteps = new Set(
    order.timeline
      .filter(entry => completedStatuses.includes(entry.status))
      .map(entry => entry.status)
  ).size;

  const totalMilestones = 5;
  return Math.min(Math.round((uniqueSteps / totalMilestones) * 100), 85);
};

const ProjectStatusDropdown = ({ value, onChange, options = PROJECT_STATUS_OPTIONS, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const selectedOption = options.find(opt => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 px-3 py-1.5 rounded-full ring-1 ring-inset transition-all duration-200 capitalize text-xs font-semibold
          ${STATUS_COLORS[value] || 'bg-gray-500/10 text-gray-500 ring-gray-500/20'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95 cursor-pointer'}`}
      >
        <span>{selectedOption.icon}</span>
        <span>{selectedOption.label.replace('_', ' ')}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} opacity-60 group-hover:opacity-100`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute z-[100] left-0 mt-2 w-44 py-1.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-white/10 shadow-2xl shadow-black/20 overflow-hidden"
          >
            <div className="px-3 py-1 mb-1 border-b border-gray-100 dark:border-white/5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Change Status</span>
            </div>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 flex items-center gap-2.5 text-left transition-all duration-200
                  ${value === option.value
                    ? 'bg-gray-100/50 dark:bg-white/5 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${option.color.replace('text-', 'bg-')}`} />
                <span className="text-xs font-medium flex-1">{option.label}</span>
                {value === option.value && (
                  <div className="w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Check size={10} className="text-blue-500" />
                  </div>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminProjects = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch all orders - will filter client side since API might not have itemType filter
  const { data, isLoading, refetch } = useGetAdminOrdersQuery({
    page,
    limit: 50, // Get more to ensure we catch services
    search: searchTerm,
    status: statusFilter
  });

  const [updateStatus, { isLoading: isUpdating }] = useUpdateAdminOrderStatusMutation();

  const allOrders = data?.orders || [];

  // Filter for services
  const projects = useMemo(() => {
    return allOrders.filter(order =>
      order.items && order.items.some(item => item.itemType === 'service')
    );
  }, [allOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateStatus({ id: orderId, status: newStatus }).unwrap();
      toast.success('Project status updated');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update status');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Client Projects
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Manage active client server setups and purchased services.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
          <Briefcase size={18} className="text-purple-500" />
          <span className="font-medium">{projects.length || 0}</span> active projects
        </div>
      </div>

      {/* Filters Bar */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-2 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-500/10 transition-all duration-300">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by Project ID or Client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0"
          />
        </div>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden md:block" />

        <ProjectStatusDropdown value={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS} />

        <button className="p-3 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
          <Filter size={20} />
        </button>
      </div>

      {/* Projects Grid/Table */}
      <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden relative z-0">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500 animate-pulse">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Briefcase size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No active projects</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                Client services and server deployments will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Project</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Client</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Progress</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Created</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">Workspace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                {projects.map((project) => {
                  const serviceItem = project.items?.find(i => i.itemType === 'service') || project.items[0];
                  const progress = calculateProgress(project);

                  return (
                  <tr key={project._id} className="group hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white truncate max-w-[200px]" title={serviceItem?.title}>
                          {serviceItem?.title || 'Unknown Service'}
                        </p>
                        <span className="font-mono text-xs text-gray-500 mt-1 block">
                          #{project._id.substring(project._id.length - 8).toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                            {project.billing?.firstName} {project.billing?.lastName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{project.billing?.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full max-w-[150px]">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500 font-medium">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden ring-1 ring-inset ring-black/5 dark:ring-white/5">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <ProjectStatusDropdown
                        value={project.status}
                        onChange={(newStatus) => handleStatusChange(project._id, newStatus)}
                        disabled={isUpdating}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(project.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/marketplace/projects/${project._id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors shadow-sm shadow-purple-500/20"
                      >
                        <Eye size={16} />
                        Open
                      </Link>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
