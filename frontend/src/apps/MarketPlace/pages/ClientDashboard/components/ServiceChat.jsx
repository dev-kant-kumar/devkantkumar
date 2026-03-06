import { motion } from 'framer-motion';
import { AlertCircle, Download, FileText, Image as ImageIcon, Loader2, Paperclip, RefreshCw, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../../../../config/api';
import { useGetOrderMessagesQuery, useSendOrderMessageMutation } from '../../../store/orders/ordersApi';

// Helper: format file size
const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

// Attachment preview in message bubble
const AttachmentPreview = ({ att }) => {
  const isImage = att.mimetype?.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(att.name);

  if (isImage) {
    return (
      <a href={att.url} target="_blank" rel="noopener noreferrer" className="block mt-2 group">
        <img
          src={att.url}
          alt={att.name}
          className="max-w-[260px] max-h-[200px] rounded-lg object-cover border border-gray-200/50 cursor-pointer group-hover:opacity-90 transition-opacity"
          loading="lazy"
        />
      </a>
    );
  }

  return (
    <a
      href={att.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 mt-2 px-3 py-2.5 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors max-w-[260px]"
    >
      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{att.name}</p>
        <p className="text-[10px] text-gray-500">{formatFileSize(att.size)}</p>
      </div>
      <Download className="h-4 w-4 text-gray-400 flex-shrink-0" />
    </a>
  );
};

// Pending file chip in input area
const PendingFileChip = ({ file, onRemove }) => {
  const isImage = file.mimetype?.startsWith('image/');
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs">
      {isImage ? <ImageIcon className="h-3.5 w-3.5 text-green-600" /> : <FileText className="h-3.5 w-3.5 text-green-600" />}
      <span className="max-w-[120px] truncate font-medium text-green-800">{file.name}</span>
      <span className="text-green-500">{formatFileSize(file.size)}</span>
      <button onClick={onRemove} className="text-green-400 hover:text-red-500 transition-colors ml-0.5">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

const ServiceChat = ({ orderId }) => {
  const [newMessage, setNewMessage] = useState('');
  const [pendingFiles, setPendingFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const {
    data: messagesData,
    isLoading,
    isError,
    error,
    refetch
  } = useGetOrderMessagesQuery(orderId, {
    skip: !orderId,
    pollingInterval: 10000,
  });

  const [sendMessage, { isLoading: isSending }] = useSendOrderMessageMutation();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesData?.data?.messages]);

  // Upload a single file to Cloudinary via backend
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token') ||
      JSON.parse(localStorage.getItem('userInfo') || '{}')?.token;

    const res = await fetch(`${API_URL}/upload/single`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return {
      name: data.file.originalName,
      url: data.file.url,
      size: data.file.size,
      mimetype: data.file.mimetype,
    };
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const uploads = await Promise.all(files.map(uploadFile));
      setPendingFiles((prev) => [...prev, ...uploads]);
      toast.success(`${uploads.length} file${uploads.length > 1 ? 's' : ''} ready to send`);
    } catch (err) {
      console.error('File upload error:', err);
      toast.error('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removePendingFile = (index) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if ((!newMessage.trim() && pendingFiles.length === 0) || !orderId) return;

    try {
      await sendMessage({
        orderId,
        message: newMessage.trim() || '',
        attachments: pendingFiles,
      }).unwrap();

      setNewMessage('');
      setPendingFiles([]);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to send message');
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
            <p className="text-sm">Send a message or file to start the conversation</p>
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
                        {/* Text bubble */}
                        {msg.message && (
                          <div
                            className={`p-3 rounded-2xl text-sm ${
                              isUser
                                ? 'bg-green-600 text-white rounded-tr-none'
                                : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                            }`}
                          >
                            {msg.message}
                          </div>
                        )}

                        {/* Attachments */}
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-1 space-y-1">
                            {msg.attachments.map((att, attIndex) => (
                              <AttachmentPreview key={attIndex} att={att} />
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

      {/* Pending Files Bar */}
      {pendingFiles.length > 0 && (
        <div className="px-4 py-2 bg-green-50/50 border-t border-green-100 flex flex-wrap gap-2">
          {pendingFiles.map((file, i) => (
            <PendingFileChip key={i} file={file} onRemove={() => removePendingFile(i)} />
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar,.svg,.webp"
          />

          {/* Paperclip button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors disabled:opacity-50"
            title="Attach files"
          >
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-green-600" />
            ) : (
              <Paperclip className="h-5 w-5" />
            )}
          </button>

          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={pendingFiles.length > 0 ? 'Add a caption (optional)...' : 'Type a message...'}
            disabled={isSending}
            className="flex-1 py-2 px-4 bg-gray-100 border-transparent focus:bg-white focus:border-green-500 focus:ring-0 rounded-full text-sm transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={(!newMessage.trim() && pendingFiles.length === 0) || isSending}
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
