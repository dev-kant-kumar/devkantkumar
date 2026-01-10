import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertCircle,
    Calendar,
    Check,
    ChevronDown,
    Clock,
    DollarSign,
    Eye,
    FileText,
    Filter,
    Mail,
    MessageSquare,
    Search,
    Trash2,
    User,
    X
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
    useDeleteAdminQuoteMutation,
    useGetAdminQuotesQuery,
    useUpdateAdminQuoteMutation
} from '../../store/api/adminApiSlice';

const STATUS_OPTIONS = [
  { value: '', label: 'All Quotes', icon: '📋', color: 'gray' },
  { value: 'pending', label: 'Pending', icon: '⏳', color: 'yellow' },
  { value: 'contacted', label: 'Contacted', icon: '📞', color: 'blue' },
  { value: 'in-progress', label: 'In Progress', icon: '🔄', color: 'purple' },
  { value: 'proposal-sent', label: 'Proposal Sent', icon: '📤', color: 'indigo' },
  { value: 'completed', label: 'Completed', icon: '✅', color: 'green' },
  { value: 'rejected', label: 'Rejected', icon: '❌', color: 'red' },
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: 'gray' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'high', label: 'High', color: 'red' },
];

const PROJECT_TYPES = {
  'web-app': 'Web Application',
  'mobile-app': 'Mobile Application',
  'desktop-app': 'Desktop Application',
  'api': 'API Development',
  'cloud': 'Cloud Solutions',
  'security': 'Security Solutions',
  'other': 'Other'
};

const BUDGET_LABELS = {
  '5000-15000': '$5,000 - $15,000',
  '15000-50000': '$15,000 - $50,000',
  '50000-100000': '$50,000 - $100,000',
  '100000+': '$100,000+'
};

const TIMELINE_LABELS = {
  '1-2': '1-2 months',
  '3-6': '3-6 months',
  '6-12': '6-12 months',
  'flexible': 'Flexible'
};

// Custom Status Dropdown Component
const StatusDropdown = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = STATUS_OPTIONS.find(opt => opt.value === value) || STATUS_OPTIONS[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-transparent text-left transition-all duration-200 outline-none hover:bg-white/50 dark:hover:bg-gray-800/50
                    ${isOpen ? 'bg-white/50 dark:bg-gray-800/50' : ''}`}
            >
                <span className="text-lg">{selectedOption.icon}</span>
                <span className="text-gray-900 dark:text-white font-medium">{selectedOption.label}</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 right-0 w-48 mt-2 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-black/30 animate-in fade-in slide-in-from-top-2 duration-200">
                    {STATUS_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelect(option.value)}
                            className={`w-full px-4 py-2.5 flex items-center gap-3 text-left transition-colors
                                ${value === option.value
                                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                }`}
                        >
                            <span className="text-lg">{option.icon}</span>
                            <span className="flex-1 font-medium">{option.label}</span>
                            {value === option.value && (
                                <Check size={16} className="text-blue-600 dark:text-blue-400" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[1];
  const colorClasses = {
    gray: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${colorClasses[statusConfig.color]}`}>
      <span>{statusConfig.icon}</span>
      {statusConfig.label}
    </span>
  );
};

// Priority Badge Component
const PriorityBadge = ({ priority }) => {
  const config = PRIORITY_OPTIONS.find(p => p.value === priority) || PRIORITY_OPTIONS[1];
  const colorClasses = {
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
    yellow: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colorClasses[config.color]}`}>
      {config.label}
    </span>
  );
};

// Quote Detail Modal
const QuoteDetailModal = ({ quote, isOpen, onClose, onUpdate, onDelete }) => {
  const [status, setStatus] = useState(quote?.status || 'pending');
  const [priority, setPriority] = useState(quote?.priority || 'medium');
  const [adminNotes, setAdminNotes] = useState(quote?.adminNotes || '');
  const [updateQuote, { isLoading: isUpdating }] = useUpdateAdminQuoteMutation();
  const [deleteQuote, { isLoading: isDeleting }] = useDeleteAdminQuoteMutation();

  useEffect(() => {
    if (quote) {
      setStatus(quote.status);
      setPriority(quote.priority);
      setAdminNotes(quote.adminNotes || '');
    }
  }, [quote]);

  const handleSave = async () => {
    try {
      await updateQuote({ id: quote._id, status, priority, adminNotes }).unwrap();
      toast.success('Quote updated successfully');
      onUpdate();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update quote');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this quote request?')) return;
    try {
      await deleteQuote(quote._id).unwrap();
      toast.success('Quote deleted successfully');
      onClose();
      onDelete();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete quote');
    }
  };

  if (!quote) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quote Request Details</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">ID: #{quote._id?.substring(quote._id?.length - 8).toUpperCase()}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] bg-white dark:bg-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Customer Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User size={18} className="text-gray-400 dark:text-gray-500" />
                        <span className="font-medium text-gray-900 dark:text-white">{quote.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail size={18} className="text-gray-400 dark:text-gray-500" />
                        <a href={`mailto:${quote.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">{quote.email}</a>
                      </div>
                      {quote.company && (
                        <div className="flex items-center gap-3">
                          <FileText size={18} className="text-gray-400 dark:text-gray-500" />
                          <span className="text-gray-700 dark:text-gray-300">{quote.company}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Project Details</h3>
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 space-y-3 border border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Type</span>
                        <span className="font-medium text-gray-900 dark:text-white">{PROJECT_TYPES[quote.projectType]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Budget</span>
                        <span className="font-medium text-green-600 dark:text-green-400">{BUDGET_LABELS[quote.budget]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Timeline</span>
                        <span className="font-medium text-gray-900 dark:text-white">{TIMELINE_LABELS[quote.timeline]}</span>
                      </div>
                    </div>
                  </div>

                  {quote.features && quote.features.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Required Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {quote.features.map((feature, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm border border-blue-200 dark:border-blue-800">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Status & Actions */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Status & Priority</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                        >
                          {STATUS_OPTIONS.filter(s => s.value).map(option => (
                            <option key={option.value} value={option.value} className="bg-white dark:bg-gray-800">{option.icon} {option.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                        <select
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                        >
                          {PRIORITY_OPTIONS.map(option => (
                            <option key={option.value} value={option.value} className="bg-white dark:bg-gray-800">{option.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Admin Notes</label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add internal notes about this quote..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={16} />
                    <span>Submitted: {new Date(quote.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Project Description</h3>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{quote.description}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
              >
                <Trash2 size={18} />
                Delete
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-lg shadow-blue-600/20"
                >
                  {isUpdating ? (
                    <span className="animate-spin">⏳</span>
                  ) : (
                    <Check size={18} />
                  )}
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const QuoteRequests = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to first page on search
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when status filter changes
  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  const { data, isLoading, refetch } = useGetAdminQuotesQuery({
    page,
    limit: 10,
    search: debouncedSearch,
    status: statusFilter
  });

  const quotes = data?.data?.quotes || [];
  const pagination = data?.data?.pagination || {};
  const statusCounts = data?.data?.statusCounts || {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewQuote = (quote) => {
    setSelectedQuote(quote);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuote(null);
  };

  const pendingCount = statusCounts.pending || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Quote Requests
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Manage custom solution quote requests from potential clients.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {pendingCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 px-4 py-2 rounded-xl border border-amber-200 dark:border-amber-800">
              <AlertCircle size={18} />
              <span className="font-medium">{pendingCount} pending</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <MessageSquare size={18} className="text-blue-500" />
            <span className="font-medium">{pagination.total || 0}</span> total quotes
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-2 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0"
          />
        </div>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden md:block" />

        {/* Custom Status Dropdown */}
        <StatusDropdown value={statusFilter} onChange={setStatusFilter} />

        <button className="p-3 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
          <Filter size={20} />
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500 animate-pulse">Loading quote requests...</div>
        ) : quotes.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <MessageSquare size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No quote requests found</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                Quote requests will appear here when potential clients submit the custom solutions form.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Client</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Project</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Budget</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Timeline</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Date</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                {quotes.map((quote) => (
                  <tr key={quote._id} className="group hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {quote.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{quote.name}</p>
                          <p className="text-xs text-gray-500">{quote.email}</p>
                          {quote.company && <p className="text-xs text-gray-400">{quote.company}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-gray-900 dark:text-white">{PROJECT_TYPES[quote.projectType]}</span>
                        <PriorityBadge priority={quote.priority} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <DollarSign size={14} className="text-green-500" />
                        <span className="font-medium text-gray-900 dark:text-white">{BUDGET_LABELS[quote.budget]}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{TIMELINE_LABELS[quote.timeline]}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={quote.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(quote.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleViewQuote(quote)}
                        className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors inline-block"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {quotes.length > 0 && pagination.pages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-800/30">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{pagination.pages}</span>
            </span>
            <button
              disabled={page === pagination.pages}
              onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Quote Detail Modal */}
      <QuoteDetailModal
        quote={selectedQuote}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={refetch}
        onDelete={refetch}
      />
    </div>
  );
};

export default QuoteRequests;
