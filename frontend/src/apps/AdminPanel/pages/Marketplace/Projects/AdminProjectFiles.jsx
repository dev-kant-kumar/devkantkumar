import { motion } from 'framer-motion';
import { Download, File, FileText, Image, Loader2, Search, UploadCloud, Users } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAddAdminMessageMutation, useUploadFilesMutation } from '../../../store/api/adminApiSlice';

const AdminProjectFiles = ({ orderId, order }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef(null);

  const [uploadFiles] = useUploadFilesMutation();
  const [addMessage] = useAddAdminMessageMutation();

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
      default: return <File className="h-8 w-8 text-purple-400" />;
    }
  };

  // Get all files with role-based source tracking
  const allFiles = useMemo(() => {
    if (!order) return [];
    const files = [];

    // Files from message attachments
    if (order.communication?.messages) {
      order.communication.messages.forEach(msg => {
        if (msg.attachments && msg.attachments.length > 0) {
          const isAdmin = msg.sender?.role === 'admin';
          const uploaderName = msg.sender?.firstName
            ? `${msg.sender.firstName} ${msg.sender.lastName || ''}`.trim()
            : 'Unknown';

          msg.attachments.forEach((att, idx) => {
            files.push({
              id: `msg-${msg._id}-${idx}`,
              name: att.name || 'Attachment',
              size: formatFileSize(att.size),
              rawSize: att.size,
              type: getFileType(att.name),
              date: new Date(msg.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }),
              uploader: isAdmin ? 'Admin (You)' : uploaderName,
              source: isAdmin ? 'admin' : 'client',
              url: att.url,
              mimetype: att.mimetype,
            });
          });
        }
      });
    }

    // Deliverables from order items
    if (order.items) {
      order.items.forEach(item => {
        if (item.downloadLinks && item.downloadLinks.length > 0) {
          item.downloadLinks.forEach((link, idx) => {
            files.push({
              id: `item-${item._id}-${idx}`,
              name: link.name || `${item.title} - Download`,
              size: 'N/A',
              rawSize: 0,
              type: getFileType(link.name || link.url),
              date: link.expiresAt
                ? `Expires: ${new Date(link.expiresAt).toLocaleDateString()}`
                : 'Available',
              uploader: 'Delivery',
              source: 'admin',
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

    // Filter by source
    if (activeFilter === 'admin') {
      result = result.filter(f => f.source === 'admin');
    } else if (activeFilter === 'client') {
      result = result.filter(f => f.source === 'client');
    }

    // Search by name
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(f => f.name.toLowerCase().includes(q));
    }

    return result;
  }, [allFiles, activeFilter, searchQuery]);

  // Counts for tabs
  const adminCount = allFiles.filter(f => f.source === 'admin').length;
  const clientCount = allFiles.filter(f => f.source === 'client').length;

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

  const handleFileUpload = async (event) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        formData.append('files', file);
      });

      const uploadResult = await uploadFiles(formData).unwrap();

      if (!uploadResult.files || uploadResult.files.length === 0) {
        throw new Error('Upload failed: No URLs returned');
      }

      const attachments = uploadResult.files.map((file) => ({
        name: file.originalName || file.name,
        url: file.url,
        size: file.size,
        mimetype: file.mimetype,
      }));

      await addMessage({
        id: orderId,
        message: `Admin uploaded ${attachments.length} new file(s).`,
        attachments: attachments,
      }).unwrap();

      toast.success('Files uploaded successfully');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('File upload error:', error);
      toast.error(error?.data?.message || error?.message || 'Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  };

  const FILTER_TABS = [
    { key: 'all',    label: 'All Assets',    count: allFiles.length },
    { key: 'admin',  label: 'Admin Uploads', count: adminCount },
    { key: 'client', label: 'Client Files',  count: clientCount },
  ];

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer group ${
            isUploading
                ? 'border-gray-300 dark:border-gray-700 opacity-70 cursor-not-allowed'
                : 'border-purple-300 dark:border-purple-700/50 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-900/20'
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
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          {isUploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <UploadCloud className="h-6 w-6" />}
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {isUploading ? 'Uploading...' : 'Upload Files for Client'}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isUploading ? 'Please wait while files securely upload' : 'Drag & drop files here, or click to browse'}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Supports PDF, PNG, JPG, ZIP, DOC (Max 50MB)</p>
      </div>

      {/* File List */}
      <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        {/* Header with title */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <h3 className="font-bold text-gray-900 dark:text-white">Project Assets</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Your central vault for all shared files and deliverables.</p>
        </div>

        {/* Filter Tabs + Search */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeFilter === tab.key
                    ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.key === 'all' && <File className="h-3.5 w-3.5" />}
                {tab.key === 'admin' && <UploadCloud className="h-3.5 w-3.5" />}
                {tab.key === 'client' && <Users className="h-3.5 w-3.5" />}
                {tab.label}
                {tab.count > 0 && (
                  <span className="text-[10px] bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
              className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-500 w-full sm:w-56"
            />
          </div>
        </div>

        {filteredFiles.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <File className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              {searchQuery ? 'No files matching your search' : activeFilter !== 'all' ? `No ${activeFilter} files yet` : 'No files yet'}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              {!searchQuery && activeFilter === 'all' && 'Upload files to share them with the client'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`p-2 rounded-lg border shrink-0 ${file.isDeliverable ? 'bg-green-50 border-green-100 dark:bg-green-900/30 dark:border-green-800' : 'bg-gray-50 border-gray-100 dark:bg-gray-800 dark:border-gray-700'}`}>
                    {getFileIcon(file.type)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                      {file.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                      {file.size !== 'N/A' && `${file.size} • `}
                      <span className={`font-medium ${file.source === 'admin' ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400'}`}>
                        {file.uploader}
                      </span>
                      {' • '}{file.date}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {file.isDeliverable && (
                        <span className="inline-flex items-center text-xs text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                          ✓ Deliverable
                        </span>
                      )}
                      {file.source === 'client' && (
                        <span className="inline-flex items-center text-[10px] text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                          Client
                        </span>
                      )}
                      {file.source === 'admin' && !file.isDeliverable && (
                        <span className="inline-flex items-center text-[10px] text-purple-600 dark:text-purple-400 font-medium bg-purple-50 dark:bg-purple-900/30 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDownload(file)}
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl transition-colors"
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

export default AdminProjectFiles;
