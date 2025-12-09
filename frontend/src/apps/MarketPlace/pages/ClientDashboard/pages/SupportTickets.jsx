import { motion } from 'framer-motion';
import { MessageSquare, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import EmptyState from '../../../common/components/ui/EmptyState';

const SupportTickets = () => {
  const [tickets, setTickets] = useState([
    {
      id: 'TCK-9021',
      subject: 'Issue with downloading files',
      category: 'Technical',
      status: 'open',
      lastUpdate: '2 hours ago',
      priority: 'high'
    },
    {
      id: 'TCK-8823',
      subject: 'Billing inquiry for Oct invoice',
      category: 'Billing',
      status: 'closed',
      lastUpdate: '3 days ago',
      priority: 'medium'
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyles = (status) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-100';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
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
          <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
          <p className="mt-1 text-sm text-gray-500">Track and manage your support requests.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm">
          <Plus className="h-4 w-4" />
          Create Ticket
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-64"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      </div>

      {/* Ticket List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredTickets.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-1">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-gray-900">{ticket.subject}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getPriorityStyles(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      #{ticket.id} • {ticket.category} • Updated {ticket.lastUpdate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${getStatusStyles(ticket.status)}`}>
                    {ticket.status}
                  </span>
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No tickets found"
            description="You haven't created any support tickets yet."
            actionLabel="Create Ticket"
            onAction={() => {}}
          />
        )}
      </div>
    </motion.div>
  );
};

export default SupportTickets;
