import {
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    Eye,
    MessageSquare,
    RefreshCw,
    Search,
    Trash2
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PremiumDropdown from '../../../../shared/components/PremiumDropdown.jsx';
import PremiumButton from '../../common/components/PremiumButton';
import PremiumConfirmModal from '../../common/components/PremiumConfirmModal';
import {
    useDeleteSupportTicketMutation,
    useGetAdminSupportStatsQuery,
    useGetAdminSupportTicketsQuery
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





// Main Page Component
const SupportTickets = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: ticketsData, isLoading: isLoadingTickets, refetch } = useGetAdminSupportTicketsQuery({
    page,
    limit: 10,
    search: debouncedSearch,
    status: statusFilter
  });

  const { data: statsData } = useGetAdminSupportStatsQuery();

  const [deleteTicket] = useDeleteSupportTicketMutation();

  const tickets = ticketsData?.data?.tickets || [];
  const pagination = ticketsData?.data?.pagination || {};
  const stats = statsData?.data || {};

  const handleOpenTicket = (ticket) => {
    navigate(`/admin/support/tickets/${ticket._id}`);
  };

  const handleDeleteTicket = async () => {
    if (!deleteId) return;
    try {
      await deleteTicket(deleteId).unwrap();
      toast.success('Ticket deleted successfully');
      setDeleteId(null);
    } catch (error) {
      toast.error('Failed to delete ticket');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Stats */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Support Center
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Manage support tickets and inquiries</p>
          </div>
          <PremiumButton
            onClick={refetch}
            label="Refresh"
            icon={RefreshCw}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-5 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <TicketIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-lg font-medium">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.total || 0}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">All Tickets</p>
          </div>

          <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-5 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs rounded-lg font-medium">Pending</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.byStatus?.['open'] || 0}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Open Tickets</p>
          </div>

          <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-5 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs rounded-lg font-medium">Active</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.byStatus?.['in-progress'] || 0}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
          </div>

          <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-5 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
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
      <div className="relative z-20 flex flex-col md:flex-row gap-4 justify-between bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-3 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm transition-all duration-300">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search tickets by ID, subject, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border-none rounded-xl focus:ring-0 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div className="flex gap-3">
          <PremiumDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="All Statuses"
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'open', label: 'Open' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'awaiting-response', label: 'Awaiting Response' },
              { value: 'resolved', label: 'Resolved' },
              { value: 'closed', label: 'Closed' }
            ]}
            className="w-56"
            buttonClassName="bg-white/50 dark:bg-gray-800/50 border-none rounded-xl text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50">
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
                    className="hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200 group cursor-pointer"
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
                          onClick={() => setDeleteId(ticket._id)}
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
          <div className="bg-gray-50/50 dark:bg-gray-800/50 px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
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

      <PremiumConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteTicket}
        title="Delete Ticket?"
        message="Are you sure you want to delete this ticket? This action cannot be undone."
        confirmLabel="Delete Ticket"
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
