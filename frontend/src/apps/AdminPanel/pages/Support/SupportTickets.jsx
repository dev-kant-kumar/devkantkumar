import { AnimatePresence, motion } from 'framer-motion';
import {
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    Eye,
    Loader2,
    MessageSquare,
    RefreshCw,
    Search,
    Send,
    Tag,
    Trash2,
    User,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
    useDeleteSupportTicketMutation,
    useGetSupportStatsQuery,
    useGetSupportTicketsQuery,
    useRespondToSupportTicketMutation,
    useUpdateSupportTicketMutation
} from '../../store/api/adminApiSlice';

// --- Constants & Config ---
const STATUS_COLORS = {
  'open': 'bg-blue-50 text-blue-700 ring-blue-600/20',
  'in-progress': 'bg-purple-50 text-purple-700 ring-purple-600/20',
  'awaiting-response': 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  'resolved': 'bg-green-50 text-green-700 ring-green-600/20',
  'closed': 'bg-gray-50 text-gray-700 ring-gray-600/20'
};

const PRIORITY_COLORS = {
  'low': 'text-gray-600',
  'medium': 'text-blue-600',
  'high': 'text-orange-600',
  'urgent': 'text-red-600'
};

const TICKET_CATEGORIES = {
  'technical': { label: 'Technical', color: 'text-purple-600 bg-purple-50' },
  'billing': { label: 'Billing', color: 'text-green-600 bg-green-50' },
  'general': { label: 'General', color: 'text-blue-600 bg-blue-50' },
  'feedback': { label: 'Feedback', color: 'text-pink-600 bg-pink-50' },
  'order': { label: 'Order', color: 'text-orange-600 bg-orange-50' },
  'refund': { label: 'Refund', color: 'text-red-600 bg-red-50' }
};

// --- Helper Functions ---
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// --- Components ---

// Ticket Detail Modal
const TicketDetailModal = ({ ticket, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('conversation');
  const [replyMessage, setReplyMessage] = useState('');
  const [status, setStatus] = useState(ticket?.status || 'open');
  const [priority, setPriority] = useState(ticket?.priority || 'medium');

  const [respondToTicket, { isLoading: isResponding }] = useRespondToSupportTicketMutation();
  const [updateTicket, { isLoading: isUpdating }] = useUpdateSupportTicketMutation();

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
      setPriority(ticket.priority);
    }
  }, [ticket]);

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    try {
      await respondToTicket({ id: ticket._id, message: replyMessage }).unwrap();
      toast.success('Reply sent successfully');
      setReplyMessage('');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to send reply');
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      await updateTicket({ id: ticket._id, status: newStatus }).unwrap();
      setStatus(newStatus);
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update status');
    }
  };

  const handleUpdatePriority = async (newPriority) => {
    try {
      await updateTicket({ id: ticket._id, priority: newPriority }).unwrap();
      setPriority(newPriority);
      toast.success(`Priority updated to ${newPriority}`);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update priority');
    }
  };

  if (!ticket) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-end z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-2xl h-full bg-white dark:bg-gray-800 shadow-2xl overflow-hidden flex flex-col border-l border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {ticket.ticketNumber}
                  </h2>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${STATUS_COLORS[status]}`}>
                    {status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-md">
                  {ticket.subject}
                </p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center gap-4">
              <select
                value={status}
                onChange={(e) => handleUpdateStatus(e.target.value)}
                className="text-sm border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="awaiting-response">Awaiting Response</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={priority}
                onChange={(e) => handleUpdatePriority(e.target.value)}
                className="text-sm border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <div className="p-6 space-y-6">
                {/* User Info Card */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Customer Details</h3>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{ticket.name}</p>
                        <a href={`mailto:${ticket.email}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                          {ticket.email}
                        </a>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300`}>
                        <Tag className="h-3 w-3" />
                        {ticket.categoryDisplay}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        Opened {formatDate(ticket.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Original Message */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3 border-b border-gray-100 dark:border-gray-700 pb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Original Request</h3>
                    <span className="text-xs text-gray-500">{formatDate(ticket.createdAt)}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {ticket.message}
                  </p>
                </div>

                {/* Responses Thread */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-gray-50 dark:bg-gray-900 px-2 text-sm text-gray-500">Conversation History</span>
                    </div>
                  </div>

                  {ticket.responses && ticket.responses.length > 0 ? (
                    ticket.responses.map((response, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col max-w-[85%] ${
                          response.sender === 'admin'
                            ? 'ml-auto items-end'
                            : 'mr-auto items-start'
                        }`}
                      >
                        <div className={`p-4 rounded-2xl shadow-sm ${
                          response.sender === 'admin'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
                        }`}>
                          <p className="whitespace-pre-wrap text-sm leading-relaxed">{response.message}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 px-1">
                          <span className="text-xs font-medium text-gray-500">
                            {response.senderName || (response.sender === 'admin' ? 'Support Team' : ticket.name)}
                          </span>
                          <span className="text-[10px] text-gray-400">•</span>
                          <span className="text-[10px] text-gray-400">{formatDate(response.timestamp)}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
                      No responses yet. Be the first to reply.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Reply Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSendReply}>
                <div className="relative">
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply here..."
                    rows={3}
                    className="w-full p-4 pr-12 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-500"
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={isResponding || !replyMessage.trim()}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-600/20"
                    >
                      {isResponding ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
                  <span>Formatting is handled automatically</span>
                  <span>{replyMessage.length}/5000</span>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Page Component
const SupportTickets = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activeTicket, setActiveTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: ticketsData, isLoading: isLoadingTickets, refetch } = useGetSupportTicketsQuery({
    page,
    limit: 10,
    search: debouncedSearch,
    status: statusFilter
  });

  const { data: statsData } = useGetSupportStatsQuery();

  const [deleteTicket] = useDeleteSupportTicketMutation();

  const tickets = ticketsData?.data?.tickets || [];
  const pagination = ticketsData?.data?.pagination || {};
  const stats = statsData?.data || {};

  const handleOpenTicket = (ticket) => {
    setActiveTicket(ticket);
    setIsModalOpen(true);
  };

  const handleDeleteTicket = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ticket? This cannot be undone.')) return;
    try {
      await deleteTicket(id).unwrap();
      toast.success('Ticket deleted successfully');
    } catch (error) {
      toast.error('Failed to delete ticket');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Stats */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Support Center
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage support tickets and inquiries</p>
          </div>
          <button
            onClick={refetch}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <TicketIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-lg font-medium">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.total || 0}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">All Tickets</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs rounded-lg font-medium">Pending</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.byStatus?.['open'] || 0}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Open Tickets</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs rounded-lg font-medium">Active</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.byStatus?.['in-progress'] || 0}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg font-medium">Done</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.byStatus?.['resolved'] || 0}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Resolved</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search tickets by ID, subject, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="awaiting-response">Awaiting Response</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ticket Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Requested By</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoadingTickets ? (
                // Loading Skeleton
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div><div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-48"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div><div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : tickets.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <MessageSquare className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                      <p className="text-lg font-medium">No tickets found</p>
                      <p className="text-sm">Try adjusting your filters or search terms</p>
                    </div>
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group cursor-pointer"
                    onClick={() => handleOpenTicket(ticket)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {ticket.subject}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          {ticket.ticketNumber}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 mr-3">
                          {ticket.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{ticket.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{ticket.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${TICKET_CATEGORIES[ticket.category]?.color || 'bg-gray-100 text-gray-800'}`}>
                        {TICKET_CATEGORIES[ticket.category]?.label || ticket.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${STATUS_COLORS[ticket.status]}`}>
                        {ticket.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`h-2 w-2 rounded-full ${
                          ticket.priority === 'urgent' ? 'bg-red-500' :
                          ticket.priority === 'high' ? 'bg-orange-500' :
                          ticket.priority === 'medium' ? 'bg-blue-500' :
                          'bg-gray-400'
                        }`} />
                        <span className={`text-sm font-medium ${PRIORITY_COLORS[ticket.priority]}`}>
                          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleOpenTicket(ticket)}
                          className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="View Ticket"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteTicket(ticket._id)}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete Ticket"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */
          pagination.pages > 1 && (
          <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{(page - 1) * 10 + 1}</span> to <span className="font-medium">{Math.min(page * 10, pagination.total)}</span> of <span className="font-medium">{pagination.total}</span> results
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronLeft size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                disabled={page === pagination.pages}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronRight size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>

      <TicketDetailModal
        ticket={activeTicket}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveTicket(null);
        }}
      />
    </div>
  );
};

// Icon component needed for stats
const TicketIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
  </svg>
);

export default SupportTickets;
