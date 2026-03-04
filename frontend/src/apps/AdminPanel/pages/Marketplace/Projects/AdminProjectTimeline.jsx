import { motion } from 'framer-motion';
import { CheckCircle, Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import PremiumButton from '../../../common/components/PremiumButton';
import { useAddMilestoneMutation } from '../../../store/api/adminApiSlice';

// Timeline status colors matching the client dashboard
const TIMELINE_STATUS_COLORS = {
  completed: 'bg-green-500',
  active: 'bg-blue-500',
  in_progress: 'bg-blue-500',
  pending: 'bg-gray-200 dark:bg-gray-700',
  created: 'bg-gray-400',
  payment_completed: 'bg-green-500',
  delivered: 'bg-green-500',
  message: 'bg-indigo-500',
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

  const [addMilestone, { isLoading: isSubmitting }] = useAddMilestoneMutation();

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
    <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Project Timeline</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            isAdding
              ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              : 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50'
          }`}
        >
          <Plus size={16} className={isAdding ? 'rotate-45 transition-transform' : 'transition-transform'} />
          {isAdding ? 'Cancel' : 'Add Milestone'}
        </button>
      </div>

      {isAdding && (
        <motion.form
          initial={{ opacity: 0, height: 0, mb: 0 }}
          animate={{ opacity: 1, height: 'auto', mb: 32 }}
          exit={{ opacity: 0, height: 0, mb: 0 }}
          onSubmit={handleAddMilestone}
          className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status Type</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
        <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-8">
          {order.timeline && order.timeline.length > 0 ? (
            // Reverse so newest is at the top conceptually, or keep original order. Original order is oldest first typical.
            // Using a slice().reverse() ensures newest milestones are at the top, like an activity feed.
            [...order.timeline].reverse().map((entry, index) => (
              <div key={entry._id || index} className="relative flex items-start pl-12">
                <div
                  className={`absolute left-0 top-1 h-8 w-8 rounded-full border-4 border-white dark:border-gray-900 shadow-sm flex items-center justify-center z-10 ${TIMELINE_STATUS_COLORS[entry.status] || 'bg-gray-300 dark:bg-gray-600'}`}
                >
                  {['completed', 'delivered', 'payment_completed'].includes(entry.status) && (
                    <CheckCircle className="h-4 w-4 text-white" />
                  )}
                  {entry.status === 'in_progress' && (
                    <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
                  )}
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {entry.message}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                      {entry.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
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
