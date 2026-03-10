import { motion } from 'framer-motion';
import { CheckCircle, Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import PremiumButton from '../../../common/components/PremiumButton';
import { useAddAdminMilestoneMutation } from '../../../store/api/adminApiSlice';

// Timeline status colors matching the premium theme
const TIMELINE_STATUS_COLORS = {
  completed: 'bg-emerald-500 shadow-emerald-500/50',
  active: 'bg-blue-500 shadow-blue-500/50',
  in_progress: 'bg-purple-500 shadow-purple-500/50',
  pending: 'bg-amber-500 shadow-amber-500/50',
  created: 'bg-gray-400 shadow-gray-400/50',
  payment_completed: 'bg-emerald-500 shadow-emerald-500/50',
  delivered: 'bg-emerald-500 shadow-emerald-500/50',
  message: 'bg-indigo-500 shadow-indigo-500/50',
};

const STATUS_BADGE_COLORS = {
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20',
  confirmed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-blue-500/20',
  in_progress: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-purple-500/20',
  completed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20',
  cancelled: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20',
  delivered: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20',
  payment_completed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20',
  message: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-indigo-500/20',
  created: 'bg-gray-500/10 text-gray-500 dark:text-gray-400 ring-gray-500/20',
};

const STATUS_OPTIONS = [
  { value: 'created', label: 'Created' },
  { value: 'pending', label: 'Pending' },
  { value: 'payment_completed', label: 'Payment Completed' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'message', label: 'Message/Update' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'completed', label: 'Completed' },
];


const AdminProjectTimeline = ({ order, refetch }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newStatus, setNewStatus] = useState('in_progress');
  const [newMessage, setNewMessage] = useState('');

  const [addMilestone, { isLoading: isSubmitting }] = useAddAdminMilestoneMutation();

  const handleAddMilestone = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      toast.error('Message is required');
      return;
    }

    try {
      await addMilestone({
        id: order._id,
        status: newStatus,
        message: newMessage
      }).unwrap();

      toast.success('Milestone added successfully');
      setNewMessage('');
      setIsAdding(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add milestone');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Project Timeline</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ${
            isAdding
              ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              : 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50'
          }`}
        >
          <Plus size={16} className={isAdding ? 'rotate-45 transition-transform duration-300' : 'transition-transform duration-300'} />
          {isAdding ? 'Cancel' : 'Add Milestone'}
        </button>
      </div>

      {isAdding && (
        <motion.form
          initial={{ opacity: 0, height: 0, mb: 0 }}
          animate={{ opacity: 1, height: 'auto', mb: 32 }}
          exit={{ opacity: 0, height: 0, mb: 0 }}
          onSubmit={handleAddMilestone}
          className="bg-gray-50/50 dark:bg-gray-800/20 backdrop-blur-lg rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-inner overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status Type</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Milestone Message</label>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="e.g., Initial design drafts uploaded"
                className="w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <PremiumButton
              type="submit"
              disabled={isSubmitting}
              label="Save Milestone"
              icon={isSubmitting ? Loader2 : CheckCircle}
            />
          </div>
        </motion.form>
      )}

      <div className="relative">
        <div className="absolute top-0 left-4 h-full w-0.5 bg-gradient-to-b from-purple-500/50 to-blue-500/20 rounded-full" />
        <div className="space-y-8">
          {order.timeline && order.timeline.length > 0 ? (
            [...order.timeline].reverse().map((entry, index) => (
              <div key={entry._id || index} className="relative flex items-start pl-12 group">
                <div
                  className={`absolute left-0 top-1.5 h-8 w-8 rounded-full border-2 border-white dark:border-gray-900 shadow-lg flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${TIMELINE_STATUS_COLORS[entry.status] || 'bg-gray-300 dark:bg-gray-600'}`}
                >
                  {['completed', 'delivered', 'payment_completed'].includes(entry.status) && (
                    <CheckCircle className="h-4 w-4 text-white shadow-sm" />
                  )}
                  {(entry.status === 'in_progress' || entry.status === 'active') && (
                    <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
                  )}
                  {entry.status === 'message' && (
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </div>
                <div className="flex-1 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-xl p-4 border border-white/20 dark:border-white/5 shadow-xl shadow-black/5 transition-all duration-300 group-hover:bg-white/60 dark:group-hover:bg-gray-800/60 group-hover:translate-x-1">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-relaxed">
                    {entry.message}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 ring-inset ${STATUS_BADGE_COLORS[entry.status] || 'bg-gray-500/10 text-gray-500 ring-gray-500/10'}`}>
                      {entry.status.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                      {formatDate(entry.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No timeline entries yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProjectTimeline;
