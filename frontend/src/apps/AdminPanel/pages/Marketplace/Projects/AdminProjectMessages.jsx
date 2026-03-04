import { motion } from 'framer-motion';
import { Loader2, Send, User, UserCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAddAdminMessageMutation, useGetAdminOrderByIdQuery } from '../../../store/api/adminApiSlice';

const AdminProjectMessages = ({ orderId }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const { data, isLoading, refetch } = useGetAdminOrderByIdQuery(orderId, {
    pollingInterval: 15000, // Poll every 15s to check for client replies
  });

  const [sendMessage, { isLoading: isSending }] = useAddAdminMessageMutation();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await sendMessage({
        id: orderId,
        message: message.trim()
      }).unwrap();

      setMessage('');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to send message');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data?.order?.communication?.messages]);

  const messages = data?.order?.communication?.messages || [];

  if (isLoading) {
    return (
      <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 h-[600px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 flex flex-col h-[600px]">
      {/* Messages Header */}
      <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
            <UserCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Project Chat</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Communication with the client</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 space-y-4">
            <MessageSquare className="h-12 w-12 opacity-20" />
            <p>No messages yet. Send a message to start the conversation.</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isAdmin = msg.senderModel === 'Admin';

            return (
              <motion.div
                key={msg._id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${isAdmin ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      isAdmin
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {isAdmin ? <UserCheck size={16} /> : <User size={16} />}
                    </div>
                  </div>

                  {/* Message Bubble */}
                  <div className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 px-1">
                      {isAdmin ? 'Admin (You)' : (msg.sender?.name || 'Client')} •
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className={`px-4 py-2.5 rounded-2xl ${
                      isAdmin
                        ? 'bg-purple-600 text-white rounded-tr-none'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none border border-gray-200 dark:border-gray-700'
                    }`}>
                      <p className="text-sm break-words whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-xl">
        <form onSubmit={handleSend} className="flex gap-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message to the client..."
            className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={!message.trim() || isSending}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {isSending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProjectMessages;
