import { motion } from 'framer-motion';
import { Download, File, FileText, Image, Loader2, Search, UploadCloud, Users } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../../../../config/api';
import { useSendOrderMessageMutation } from '../../../store/orders/ordersApi';

const ServiceFiles = ({ orderId, order }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [sendMessage] = useSendOrderMessageMutation();

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return 'N/A';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const getFileType = (filename) => {
    if (!filename) return 'file';
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['pdf'].includes(ext)) return 'pdf';
    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'zip';
    if (['doc', 'docx', 'txt', 'md'].includes(ext)) return 'doc';
    return 'file';
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="h-8 w-8 text-red-500" />;
      case 'image': return <Image className="h-8 w-8 text-blue-500" />;
      case 'zip': return <File className="h-8 w-8 text-yellow-500" />;
      case 'doc': return <FileText className="h-8 w-8 text-blue-500" />;
      default: return <File className="h-8 w-8 text-gray-400" />;
    }
  };

  // Extract all files with source tracking
  const allFiles = useMemo(() => {
    if (!order) return [];
    const files = [];

    if (order.communication?.messages) {
      order.communication.messages.forEach(msg => {
        if (msg.attachments && msg.attachments.length > 0) {
          // Check sender role: admin role = team file, anything else = client's own upload
          const isClientUpload = msg.sender?.role !== 'admin';
          const uploaderName = msg.sender?.firstName
            ? `${msg.sender.firstName} ${msg.sender.lastName || ''}`.trim()
            : (isClientUpload ? 'You' : 'Admin');

          msg.attachments.forEach((att, idx) => {
            files.push({
              id: `msg-${msg._id || msg.id}-${idx}`,
              name: att.name || 'Attachment',
              size: formatFileSize(att.size),
              type: getFileType(att.name),
              date: new Date(msg.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }),
              uploader: isClientUpload ? 'YOU' : uploaderName,
              source: isClientUpload ? 'mine' : 'team',
              url: att.url,
              mimetype: att.mimetype,
            });
          });
        }
      });
    }

    // Deliverables
    if (order.items) {
      order.items.forEach(item => {
        if (item.downloadLinks && item.downloadLinks.length > 0) {
          item.downloadLinks.forEach((link, idx) => {
            files.push({
              id: `item-${item._id}-${idx}`,
              name: link.name || `${item.title} - Download`,
              size: 'N/A',
              type: getFileType(link.name || link.url),
              date: link.expiresAt
                ? `Expires: ${new Date(link.expiresAt).toLocaleDateString()}`
                : 'Available',
              uploader: 'Delivery',
              source: 'team',
              url: link.url,
              isDeliverable: true,
            });
          });
        }
      });
    }

    return files.reverse();
  }, [order]);

  // Filter and search
  const filteredFiles = useMemo(() => {
    let result = allFiles;
    if (activeFilter === 'mine') {
      result = result.filter(f => f.source === 'mine');
    } else if (activeFilter === 'team') {
      result = result.filter(f => f.source === 'team');
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(f => f.name.toLowerCase().includes(q));
    }
    return result;
  }, [allFiles, activeFilter, searchQuery]);

  const myCount = allFiles.filter(f => f.source === 'mine').length;
  const teamCount = allFiles.filter(f => f.source === 'team').length;

  const handleDownload = (file) => {
    if (!file.url) {
      toast.error('Download link not available');
      return;
    }
    let downloadUrl = file.url;
    try {
      const parsed = new URL(file.url);
      if (
        (parsed.hostname === 'res.cloudinary.com' ||
          parsed.hostname.endsWith('.cloudinary.com')) &&
        parsed.pathname.includes('/upload/')
      ) {
        downloadUrl = file.url.replace('/upload/', '/upload/fl_attachment/');
      }
    } catch (_) {
      // Not a valid absolute URL — use as-is
    }
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = file.name || 'download';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Upload file to Cloudinary then attach to a message
  const handleFileUpload = async (event) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsUploading(true);
    try {
      const token = localStorage.getItem('token') ||
        JSON.parse(localStorage.getItem('userInfo') || '{}')?.token;

      // Upload each file to Cloudinary
      const uploadPromises = Array.from(selectedFiles).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(`${API_URL}/upload/single`, {
          method: 'POST',
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
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
      });

      const attachments = await Promise.all(uploadPromises);

      // Attach to a message
      await sendMessage({
        orderId,
        message: `Uploaded ${attachments.length} file(s).`,
        attachments,
      }).unwrap();

      toast.success(`${attachments.length} file${attachments.length > 1 ? 's' : ''} uploaded successfully`);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('File upload error:', error);
      toast.error('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const FILTER_TABS = [
    { key: 'all',  label: 'All Assets',  count: allFiles.length, icon: File },
    { key: 'mine', label: 'My Uploads',  count: myCount,         icon: UploadCloud },
    { key: 'team', label: 'Team Files',  count: teamCount,       icon: Users },
  ];

  if (!orderId) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-sm border border-gray-200">
        <p className="text-gray-500">No order selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer group ${
          isUploading
            ? 'border-gray-300 opacity-70 cursor-not-allowed'
            : 'border-gray-300 hover:border-green-500 hover:bg-green-50/30'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.zip,.rar,.doc,.docx,.webp,.svg"
        />
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          {isUploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <UploadCloud className="h-6 w-6" />}
        </div>
        <h3 className="text-lg font-medium text-gray-900">
          {isUploading ? 'Uploading...' : 'Upload Files'}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {isUploading ? 'Please wait while files upload securely' : 'Drag & drop files here, or click to browse'}
        </p>
        <p className="text-xs text-gray-400 mt-2">Supports PDF, PNG, JPG, ZIP, DOC (Max 50MB)</p>
      </div>

      {/* File List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-900">Project Assets</h3>
          <p className="text-xs text-gray-500 mt-0.5">Your central vault for all shared files and deliverables.</p>
        </div>

        {/* Filter Tabs + Search */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {FILTER_TABS.map(tab => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeFilter === tab.key
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <TabIcon className="h-3.5 w-3.5" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
              className="pl-9 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 w-full sm:w-56"
            />
          </div>
        </div>

        {filteredFiles.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <File className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">
              {searchQuery ? 'No files matching your search' : activeFilter !== 'all' ? `No ${activeFilter === 'mine' ? 'uploaded' : 'team'} files yet` : 'No files yet'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {!searchQuery && activeFilter === 'all' && 'Files shared in messages or delivered will appear here'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition-colors group gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`p-2 rounded-lg border shrink-0 ${file.isDeliverable ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                    {getFileIcon(file.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors truncate">
                        {file.name}
                      </h4>
                      {file.isDeliverable && (
                        <span className="inline-flex items-center text-[10px] text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded-full uppercase tracking-wide shrink-0">
                          DMT
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {file.size !== 'N/A' && `${file.size} • `}
                      <span className={`font-medium ${file.source === 'mine' ? 'text-green-600' : 'text-blue-600'}`}>
                        {file.uploader}
                      </span>
                      {' • '}{file.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDownload(file)}
                    className="p-2.5 text-white bg-green-600 hover:bg-green-700 rounded-full transition-colors shadow-sm"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceFiles;
