import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Mail, MessageSquare, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteMessageMutation,
  useGetContactMessagesQuery,
  useMarkMessageAsReadMutation
} from "../../store/api/adminApiSlice";

const Messages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetContactMessagesQuery();
  const [markRead] = useMarkMessageAsReadMutation();
  const [deleteMsg] = useDeleteMessageMutation();

  const [selectedMsg, setSelectedMsg] = useState(null);
  const [msgToDelete, setMsgToDelete] = useState(null);

  const messages = data?.data || [];

  // Sync selected message with URL ID
  useEffect(() => {
    if (id && messages.length > 0) {
      const msg = messages.find(m => m._id === id);
      if (msg) setSelectedMsg(msg);
    } else if (!id) {
      setSelectedMsg(null);
    }
  }, [id, messages]);

  const handleMarkRead = async (id) => {
    try {
      await markRead(id).unwrap();
      toast.success("Marked as read");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = (id) => {
    setMsgToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteMsg(msgToDelete).unwrap();
      toast.success("Message deleted");
      if (id === msgToDelete) navigate('/admin/messages');
      setMsgToDelete(null);
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  const filteredMessages = messages.filter((msg) =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-10rem)] w-full flex-1 flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <AnimatePresence mode="wait">
        {!selectedMsg ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col space-y-6"
          >
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500 dark:text-blue-400 ring-1 ring-blue-500/20">
                      <Mail size={16} />
                  </span>
                  <span className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest">Inbox</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Communication Hub</h1>
              </div>

              <div className="flex items-center bg-white/40 dark:bg-gray-900/40 backdrop-blur-md p-1 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm w-fit">
                 <div className="flex items-center gap-3 px-4 py-1.5 border-r border-gray-200 dark:border-gray-800">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white leading-none">{messages.length}</span>
                 </div>
                 <div className="flex items-center gap-3 px-4 py-1.5">
                    <span className="text-[10px] font-bold text-blue-500/60 uppercase tracking-wider">New</span>
                    <span className="text-lg font-bold text-blue-600 leading-none">{messages.filter(m => !m.isRead).length}</span>
                 </div>
              </div>
            </div>

            {/* Gmail-style Toolbar/Search */}
            <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md p-3 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 flex items-center gap-4 transition-all focus-within:bg-white dark:focus-within:bg-gray-900 shadow-sm">
               <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input
                    type="text"
                    placeholder="Search in messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-2 rounded-xl bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                  />
               </div>
            </div>

            {/* Inbox Section */}
            <div className="flex-1 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm overflow-hidden flex flex-col">
               <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {isLoading ? (
                    [...Array(10)].map((_, i) => (
                      <div key={i} className="h-12 border-b border-gray-50 dark:border-gray-800/50 animate-pulse bg-gray-50/50 dark:bg-gray-800/20" />
                    ))
                  ) : filteredMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400/50 p-10">
                       <MessageSquare size={48} className="mb-4 opacity-10" />
                       <p className="font-bold text-sm">Inbox is empty</p>
                    </div>
                  ) : (
                    filteredMessages.map((msg) => (
                      <div
                        key={msg._id}
                        onClick={() => navigate(`/admin/messages/${msg._id}`)}
                        className={`flex items-center gap-4 px-4 md:px-6 py-2.5 border-b border-gray-50 dark:border-gray-800/50 group cursor-pointer transition-all hover:bg-white/60 dark:hover:bg-gray-800/20 relative overflow-hidden ${!msg.isRead ? 'bg-white dark:bg-gray-800/10' : 'bg-transparent filter grayscale-[0.2]'}`}
                      >
                         {!msg.isRead && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600" />}

                        <div className="flex items-center gap-3 shrink-0 w-32 md:w-48">
                           <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${!msg.isRead ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'}`}>
                              {msg.name.charAt(0)}
                           </div>
                           <h3 className={`text-sm truncate tracking-tight ${!msg.isRead ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-500 dark:text-gray-400'}`}>
                              {msg.name}
                           </h3>
                        </div>

                        <div className="flex-1 min-w-0 flex items-center gap-3">
                           <span className={`text-sm truncate shrink-0 max-w-[40%] ${!msg.isRead ? 'font-bold text-gray-900 dark:text-gray-100' : 'font-semibold text-gray-600 dark:text-gray-400'}`}>
                              {msg.subject}
                           </span>
                           <span className="text-sm text-gray-400 dark:text-gray-500 truncate font-medium">- {msg.message}</span>
                        </div>

                        <div className="shrink-0 flex items-center gap-4 ml-2">
                           <span className={`text-[11px] font-bold tabular-nums ${!msg.isRead ? 'text-blue-600' : 'text-gray-400'}`}>
                              {new Date(msg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                           </span>
                           <button
                             onClick={(e) => { e.stopPropagation(); handleDelete(msg._id); }}
                             className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all md:opacity-0 group-hover:opacity-100"
                           >
                              <Trash2 size={14} />
                           </button>
                        </div>
                      </div>
                    ))
                  )}
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-3xl rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-2xl flex flex-col overflow-hidden ring-1 ring-black/5"
          >
             {/* Mail Detail Toolbar */}
             <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between bg-white/40 dark:bg-gray-800/20">
                <div className="flex items-center gap-1.5">
                   <button
                    onClick={() => navigate('/admin/messages')}
                    className="p-2 text-gray-500 hover:bg-gray-200/50 dark:hover:bg-gray-800 rounded-full transition-all group"
                   >
                      <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                   </button>
                   <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1.5" />
                   <button
                    onClick={() => handleDelete(selectedMsg._id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                    title="Delete"
                   >
                      <Trash2 size={18} />
                   </button>
                   {!selectedMsg.isRead && (
                      <button
                        onClick={() => handleMarkRead(selectedMsg._id)}
                        className="p-2 text-gray-500 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full transition-all"
                        title="Mark read"
                      >
                         <CheckCircle size={18} />
                      </button>
                   )}
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden xs:block">
                   #{selectedMsg._id.slice(-6)}
                </div>
             </div>

             {/* Content Header & Body */}
             <div className="flex-1 overflow-y-auto custom-scrollbar px-5 md:px-10 py-6 md:py-8">
                <div className="max-w-4xl mx-auto">
                   {/* Subject Header */}
                   <div className="mb-8 space-y-3">
                      <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight leading-snug flex-1">
                           {selectedMsg.subject}
                        </h2>
                        {selectedMsg.projectType && (
                           <span className="shrink-0 w-fit px-3 py-1 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-blue-200/30 dark:border-blue-500/30">
                              {selectedMsg.projectType.replace('-', ' ')}
                           </span>
                        )}
                      </div>
                   </div>

                   {/* Sender Card */}
                   <div className="flex items-center justify-between gap-4 mb-8">
                      <div className="flex items-center gap-3 min-w-0">
                         <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/20">
                            {selectedMsg.name.charAt(0)}
                         </div>
                         <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                               <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">{selectedMsg.name}</h3>
                               <p className="text-gray-400 text-[11px] font-medium">&lt;{selectedMsg.email}&gt;</p>
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">to Portfolio Admin</p>
                         </div>
                      </div>
                      <div className="text-right shrink-0 hidden md:block">
                         <p className="text-xs font-bold text-gray-900 dark:text-white">
                            {new Date(selectedMsg.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                         </p>
                         <p className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-tighter">
                            {new Date(selectedMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                         </p>
                      </div>
                   </div>

                   {/* Message Body Content */}
                   <div className="p-6 md:p-8 bg-gray-50/50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                      <MessageSquare className="absolute -bottom-6 -right-6 opacity-[0.03] text-blue-500 -rotate-12" size={160} />
                      <p className="text-[15px] md:text-[16px] text-gray-700 dark:text-gray-200 leading-relaxed relative z-10 whitespace-pre-wrap font-medium">
                         {selectedMsg.message}
                      </p>
                   </div>

                   {/* Smart Reply Section */}
                   <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center gap-6">
                      <a
                        href={`mailto:${encodeURIComponent(`${selectedMsg.name} <${selectedMsg.email}>`)}?subject=${encodeURIComponent(`RE: ${selectedMsg.subject}`)}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold shadow-xl hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all hover:-translate-y-0.5"
                      >
                         <Mail size={16} />
                         Reply Now
                      </a>
                      <p className="text-xs font-medium text-gray-400 text-center sm:text-left">
                        Opens your default mail client to reply to {selectedMsg.name}
                      </p>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Delete Confirmation Modal */}
      <AnimatePresence>
        {msgToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMsgToDelete(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6">
                  <Trash2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Message?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                  This action cannot be undone. The message will be permanently removed from your inbox.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setMsgToDelete(null)}
                    className="flex-1 px-6 py-3 rounded-xl font-bold text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 transition-all active:scale-95"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Messages;
