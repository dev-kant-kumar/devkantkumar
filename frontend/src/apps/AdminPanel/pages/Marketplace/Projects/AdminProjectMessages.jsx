import { motion } from 'framer-motion';
import { Download, FileText, Image as ImageIcon, Loader2, MessageSquare, Paperclip, Send, User, UserCheck, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../../../../config/api';
import { useAddAdminMessageMutation, useGetAdminOrderByIdQuery } from '../../../store/api/adminApiSlice';

// Helper: format file size
const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

// Attachment preview in message bubble
const AttachmentPreview = ({ att, isAdmin }) => {
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

// Pending file chip
const PendingFileChip = ({ file, onRemove }) => {
  const isImage = file.mimetype?.startsWith('image/');
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-full text-xs">
      {isImage ? <ImageIcon className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" /> : <FileText className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />}
      <span className="max-w-[120px] truncate font-medium text-purple-800 dark:text-purple-300">{file.name}</span>
      <span className="text-purple-500 dark:text-purple-400">{formatFileSize(file.size)}</span>
      <button onClick={onRemove} className="text-purple-400 hover:text-red-500 transition-colors ml-0.5">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

const AdminProjectMessages = ({ orderId }) => {
  const [message, setMessage] = useState('');
  const [pendingFiles, setPendingFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const { data, isLoading, refetch } = useGetAdminOrderByIdQuery(orderId, {
    pollingInterval: 15000,
  });

  const [sendMessage, { isLoading: isSending }] = useAddAdminMessageMutation();

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
    if (!message.trim() && pendingFiles.length === 0) return;

    try {
      await sendMessage({
        id: orderId,
        message: message.trim() || '',
        attachments: pendingFiles,
      }).unwrap();

      setMessage('');
      setPendingFiles([]);
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
  }, [data?.data?.communication?.messages, data?.order?.communication?.messages]);

  const order = data?.data || data?.order;
  const messages = order?.communication?.messages || [];

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
            const isAdmin = msg.sender?.role === 'admin';
            const senderName = msg.sender?.firstName
              ? `${msg.sender.firstName} ${msg.sender.lastName || ''}`.trim()
              : 'Client';

            // Date separator logic
            const msgDate = new Date(msg.timestamp);
            const prevDate = index > 0 ? new Date(messages[index - 1]?.timestamp) : null;
            const showDate = index === 0 || (prevDate && msgDate.toDateString() !== prevDate.toDateString());

            const formatDateLabel = (d) => {
              const today = new Date();
              const yesterday = new Date(today);
              yesterday.setDate(yesterday.getDate() - 1);
              if (d.toDateString() === today.toDateString()) return 'Today';
              if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
              return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            };

            return (
              <div key={msg._id || index}>
              {showDate && (
                <div className="text-center my-4">
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    {formatDateLabel(msgDate)}
                  </span>
                </div>
              )}
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
                      {isAdmin ? 'Admin (You)' : senderName} •{' '}
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    {/* Text */}
                    {msg.message && (
                      <div className={`px-4 py-2.5 rounded-2xl ${
                        isAdmin
                          ? 'bg-purple-600 text-white rounded-tr-none'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none border border-gray-200 dark:border-gray-700'
                      }`}>
                        <p className="text-sm break-words whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    )}

                    {/* Attachments */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-1 space-y-1">
                        {msg.attachments.map((att, attIndex) => (
                          <AttachmentPreview key={attIndex} att={att} isAdmin={isAdmin} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Pending Files Bar */}
      {pendingFiles.length > 0 && (
        <div className="px-4 py-2 bg-purple-50/50 dark:bg-purple-900/10 border-t border-purple-100 dark:border-purple-800/50 flex flex-wrap gap-2">
          {pendingFiles.map((file, i) => (
            <PendingFileChip key={i} file={file} onRemove={() => removePendingFile(i)} />
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-xl">
        <form onSubmit={handleSend} className="flex gap-4">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar,.svg,.webp"
          />

          {/* Paperclip */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="p-3 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-colors disabled:opacity-50"
            title="Attach files"
          >
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
            ) : (
              <Paperclip className="h-5 w-5" />
            )}
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={pendingFiles.length > 0 ? 'Add a caption (optional)...' : 'Type your message to the client...'}
            className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={(!message.trim() && pendingFiles.length === 0) || isSending}
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
