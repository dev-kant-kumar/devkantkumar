import { motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    FileText,
    Mail,
    MessageSquare,
    Send,
    Shield,
    Tag,
    User
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import PremiumDropdown from '../../../../shared/components/PremiumDropdown.jsx';
import PremiumButton from '../../common/components/PremiumButton';
import {
    useGetAdminSupportTicketByIdQuery,
    useRespondToSupportTicketMutation,
    useUpdateSupportTicketMutation
} from '../../store/api/adminApiSlice';

// --- Constants & Config ---
const STATUS_CONFIG = {
    'open': { label: 'Open', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: Clock },
    'in-progress': { label: 'In Progress', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20', icon: MessageSquare },
    'awaiting-response': { label: 'Awaiting Response', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', icon: Clock },
    'resolved': { label: 'Resolved', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: CheckCircle },
    'closed': { label: 'Closed', color: 'bg-gray-500/10 text-gray-500 border-gray-500/20', icon: Shield }
};

const PRIORITY_CONFIG = {
    'low': { label: 'Low', color: 'text-gray-400' },
    'medium': { label: 'Medium', color: 'text-blue-400' },
    'high': { label: 'High', color: 'text-orange-400' },
    'urgent': { label: 'Urgent', color: 'text-red-400' }
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const TicketDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [replyMessage, setReplyMessage] = useState('');

    const { data: ticketResponse, isLoading, error } = useGetAdminSupportTicketByIdQuery(id);
    const [respondToTicket, { isLoading: isResponding }] = useRespondToSupportTicketMutation();
    const [updateTicket] = useUpdateSupportTicketMutation();

    const ticket = ticketResponse?.data;

    const handleSendReply = async (e) => {
        e.preventDefault();
        if (!replyMessage.trim()) return;

        try {
            await respondToTicket({ id, message: replyMessage }).unwrap();
            toast.success('Reply sent successfully');
            setReplyMessage('');
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to send reply');
        }
    };

    const handleUpdateStatus = async (newStatus) => {
        try {
            await updateTicket({ id, status: newStatus }).unwrap();
            toast.success(`Status updated to ${newStatus}`);
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to update status');
        }
    };

    const handleUpdatePriority = async (newPriority) => {
        try {
            await updateTicket({ id, priority: newPriority }).unwrap();
            toast.success(`Priority updated to ${newPriority}`);
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to update priority');
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-gray-400 animate-pulse font-medium">Loading ticket details...</p>
            </div>
        );
    }

    if (error || !ticket) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                <div className="p-4 bg-red-500/10 rounded-full">
                    <AlertCircle className="w-12 h-12 text-red-500" />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">Ticket Not Found</h2>
                    <p className="text-gray-400 mt-2">The ticket you are looking for does not exist or has been removed.</p>
                </div>
                <PremiumButton
                    onClick={() => navigate('/admin/support/tickets')}
                    label="Back to Tickets"
                    icon={ArrowLeft}
                />
            </div>
        );
    }

    const { label: statusLabel, color: statusColor, icon: StatusIcon } = STATUS_CONFIG[ticket.status] || STATUS_CONFIG['open'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto space-y-8 pb-12"
        >
            {/* Top Navigation & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/support/tickets')}
                        className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all shadow-xl group"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-white font-mono tracking-tight">{ticket.ticketNumber}</h1>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${statusColor} flex items-center gap-1.5`}>
                                <StatusIcon className="w-3 h-3" />
                                {statusLabel}
                            </span>
                        </div>
                        <p className="text-gray-400 mt-1.5 flex items-center gap-2 text-sm">
                             <Calendar className="w-4 h-4 opacity-50" />
                             Opened on {formatDate(ticket.createdAt)}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Status</span>
                        <PremiumDropdown
                            value={ticket.status}
                            onChange={handleUpdateStatus}
                            options={[
                                { value: 'open', label: 'Open' },
                                { value: 'in-progress', label: 'In Progress' },
                                { value: 'awaiting-response', label: 'Awaiting Response' },
                                { value: 'resolved', label: 'Resolved' },
                                { value: 'closed', label: 'Closed' }
                            ]}
                            className="w-48"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Priority</span>
                        <PremiumDropdown
                            value={ticket.priority}
                            onChange={handleUpdatePriority}
                            options={[
                                { value: 'low', label: 'Low Priority' },
                                { value: 'medium', label: 'Medium Priority' },
                                { value: 'high', label: 'High Priority' },
                                { value: 'urgent', label: 'Urgent' }
                            ]}
                            className="w-48"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Original Message Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                            <MessageSquare className="w-48 h-48 text-blue-500" />
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2">
                             <div className="p-1.5 bg-blue-500/10 rounded-lg">
                                <FileText className="w-4 h-4 text-blue-500" />
                            </div>
                            Original Request
                        </h3>
                        <div className="space-y-6">
                            <h4 className="text-2xl font-bold text-white tracking-tight">{ticket.subject}</h4>
                            <div className="p-8 bg-black/40 rounded-3xl border border-white/5 shadow-inner">
                                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-lg">
                                    {ticket.message}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Conversation Thread */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Conversation History</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
                        </div>

                        {ticket.responses && ticket.responses.length > 0 ? (
                            <div className="space-y-8">
                                {ticket.responses.map((response, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className={`flex flex-col ${response.sender === 'admin' ? 'items-end' : 'items-start'}`}
                                    >
                                        <div className={`max-w-[85%] p-6 rounded-[2rem] shadow-xl ${
                                            response.sender === 'admin'
                                                ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/10'
                                                : 'bg-gray-800/80 backdrop-blur-md border border-white/5 text-gray-100 rounded-tl-none'
                                        }`}>
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{response.message}</p>
                                        </div>
                                        <div className={`flex items-center gap-3 mt-3 px-4 text-[10px] font-bold ${response.sender === 'admin' ? 'text-blue-500' : 'text-gray-500'}`}>
                                            <span className="uppercase tracking-widest">
                                                {response.senderName || (response.sender === 'admin' ? 'Support Team' : ticket.name)}
                                            </span>
                                            <span className="opacity-20">•</span>
                                            <span className="opacity-70">{formatDate(response.timestamp)}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white/5 backdrop-blur-sm rounded-[2.5rem] p-16 text-center border-2 border-dashed border-white/10">
                                <div className="w-20 h-20 bg-gray-900 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                                    <MessageSquare className="w-10 h-10 text-gray-700" />
                                </div>
                                <h4 className="text-white text-xl font-bold">No replies yet</h4>
                                <p className="text-gray-500 mt-2 max-w-sm mx-auto">Click below to start a professional conversation with this customer.</p>
                            </div>
                        )}
                    </div>

                    {/* Reply Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-30"></div>

                        <form onSubmit={handleSendReply} className="space-y-6">
                            <div className="relative">
                                <textarea
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    placeholder="Type your professional response here..."
                                    rows={5}
                                    className="w-full p-8 bg-black/40 border border-white/5 rounded-3xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all outline-none text-white placeholder-gray-600 resize-none text-base shadow-inner"
                                />
                                <div className="absolute top-6 right-8 text-[10px] font-black uppercase tracking-tighter text-gray-700 pointer-events-none">
                                    Reply Editor
                                </div>
                            </div>
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
                                    <Shield className="w-3 h-3" />
                                    Encrypted Channel
                                </div>
                                <PremiumButton
                                    type="submit"
                                    disabled={isResponding || !replyMessage.trim()}
                                    label={isResponding ? "Sending..." : "Send Response"}
                                    icon={Send}
                                    className="px-10 py-4 shadow-xl shadow-blue-500/20"
                                />
                            </div>
                        </form>
                    </motion.div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    {/* Customer Info Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl"
                    >
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2">
                            <User className="w-3 h-3" />
                            Customer Profile
                        </h3>
                        <div className="flex flex-col items-center text-center mb-10">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-500/20 mb-4 ring-4 ring-white/5">
                                {ticket.name.charAt(0).toUpperCase()}
                            </div>
                            <h4 className="text-xl font-bold text-white tracking-tight">{ticket.name}</h4>
                            <p className="text-sm text-gray-500 mt-1 font-medium">{ticket.email}</p>
                        </div>

                        <div className="space-y-4">
                            <a
                                href={`mailto:${ticket.email}`}
                                className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                        <Mail className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Direct Email</span>
                                </div>
                                <span className="text-xs font-black text-blue-500 uppercase tracking-tighter">Contact</span>
                            </a>

                            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500/10 rounded-xl">
                                        <Tag className="w-4 h-4 text-purple-500" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Category</span>
                                </div>
                                <span className="text-sm font-bold text-white">
                                    {ticket.categoryDisplay}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-500/10 rounded-xl">
                                        <AlertCircle className="w-4 h-4 text-orange-500" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Priority</span>
                                </div>
                                <span className={`text-sm font-black uppercase tracking-tighter ${PRIORITY_CONFIG[ticket.priority]?.color || 'text-white'}`}>
                                    {PRIORITY_CONFIG[ticket.priority]?.label || ticket.priority}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Tips or Stats Card */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[2rem] p-8 text-white shadow-2xl shadow-blue-500/10 relative overflow-hidden group border border-white/10">
                        <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                            <Shield className="w-48 h-48" />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2 text-blue-200">
                             <CheckCircle className="w-4 h-4" />
                             Support Protocol
                        </h4>
                        <p className="text-sm text-blue-100 leading-relaxed font-medium">
                            Follow professional communication standards. Aim for a resolution within 4 business hours for high-priority tickets.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TicketDetail;
