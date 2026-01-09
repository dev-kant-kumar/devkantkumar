import { motion } from 'framer-motion';
import { AlertCircle, Loader2, Paperclip, RefreshCw, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useGetOrderMessagesQuery, useSendOrderMessageMutation } from '../../../store/orders/ordersApi';

const ServiceChat = ({ orderId }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Fetch messages with polling
  const {
    data: messagesData,
    isLoading,
    isError,
    error,
    refetch
  } = useGetOrderMessagesQuery(orderId, {
    skip: !orderId,
    pollingInterval: 10000, // Poll every 10 seconds
  });

  // Send message mutation
  const [sendMessage, { isLoading: isSending }] = useSendOrderMessageMutation();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesData?.data?.messages]);

  // Handle send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !orderId) return;

    try {
      await sendMessage({
        orderId,
        message: newMessage.trim()
      }).unwrap();

      setNewMessage('');
      toast.success('Message sent!');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to send message');
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Get sender initials
  const getInitials = (sender) => {
    if (!sender) return 'A';
    const firstName = sender.firstName || '';
    const lastName = sender.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || 'A';
  };

  const messages = messagesData?.data?.messages || [];

  if (!orderId) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-white rounded-xl shadow-sm border border-gray-200">
        <p className="text-gray-500">No order selected</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-sm text-gray-500">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-white rounded-xl shadow-sm border border-gray-200">
        <AlertCircle className="h-12 w-12 text-red-500 mb-3" />
        <p className="text-gray-700 font-medium mb-2">Failed to load messages</p>
        <p className="text-sm text-gray-500 mb-4">{error?.data?.message || 'Something went wrong'}</p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
            DK
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Dev Kant Kumar</h3>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="block w-2 h-2 rounded-full bg-green-500" /> Available
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Order: {messagesData?.data?.orderNumber || orderId}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Send className="h-8 w-8 text-gray-400" />
            </div>
            <p className="font-medium">No messages yet</p>
            <p className="text-sm">Send a message to start the conversation</p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => {
              const isUser = msg.isOwn;
              const showDate = index === 0 ||
                formatDate(msg.timestamp) !== formatDate(messages[index - 1]?.timestamp);

              return (
                <div key={msg.id || index}>
                  {showDate && (
                    <div className="text-center my-4">
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {formatDate(msg.timestamp)}
                      </span>
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                      {!isUser && (
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 text-xs font-bold mt-1">
                          {getInitials(msg.sender)}
                        </div>
                      )}

                      <div>
                        {!isUser && msg.sender && (
                          <p className="text-xs text-gray-500 mb-1">
                            {msg.sender.firstName} {msg.sender.lastName}
                          </p>
                        )}
                        <div
                          className={`p-3 rounded-2xl text-sm ${
                            isUser
                              ? 'bg-green-600 text-white rounded-tr-none'
                              : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                          }`}
                        >
                          {msg.message}
                        </div>

                        {/* Attachments */}
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {msg.attachments.map((att, attIndex) => (
                              <a
                                key={attIndex}
                                href={att.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                              >
                                <Paperclip className="h-3 w-3" />
                                {att.name}
                              </a>
                            ))}
                          </div>
                        )}

                        <p className={`text-[10px] text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Attach file (coming soon)"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={isSending}
            className="flex-1 py-2 px-4 bg-gray-100 border-transparent focus:bg-white focus:border-green-500 focus:ring-0 rounded-full text-sm transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            {isSending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceChat;
