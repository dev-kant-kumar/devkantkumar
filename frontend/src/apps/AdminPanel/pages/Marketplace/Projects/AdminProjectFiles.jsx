import { motion } from 'framer-motion';
import { Download, File, FileText, Image, Loader2, UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAddAdminMessageMutation, useUploadFilesMutation } from '../../../store/api/adminApiSlice';

const AdminProjectFiles = ({ orderId, order }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [uploadFiles] = useUploadFilesMutation();
  const [addMessage] = useAddAdminMessageMutation();

  // Get files from order attachments and deliverables
  const getFilesFromOrder = () => {
    if (!order) return [];

    const files = [];

    // Get files from message attachments
    if (order.communication?.messages) {
      order.communication.messages.forEach(msg => {
        if (msg.attachments && msg.attachments.length > 0) {
          msg.attachments.forEach((att, idx) => {
            files.push({
              id: `msg-${msg._id}-${idx}`,
              name: att.name || 'Attachment',
              size: formatFileSize(att.size),
              type: getFileType(att.name),
              date: new Date(msg.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }),
              uploader: msg.sender?.firstName
                ? `${msg.sender.firstName} ${msg.sender.lastName || ''}`.trim()
                : 'Admin (You)',
              url: att.url,
            });
          });
        }
      });
    }

    // Get download links from order items (deliverables)
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
              url: link.url,
              isDeliverable: true,
            });
          });
        }
      });
    }

    // Sort by date descending (newest first)
    return files.reverse();
  };

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

  const handleDownload = (file) => {
    if (!file.url) {
      toast.error('Download link not available');
      return;
    }
    window.open(file.url, '_blank');
  };

  const handleFileUpload = async (event) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsUploading(true);

    try {
      // 1. Upload files to server/Cloudinary
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        formData.append('files', file);
      });

      const uploadResult = await uploadFiles(formData).unwrap();

      if (!uploadResult.files || uploadResult.files.length === 0) {
        throw new Error('Upload failed: No URLs returned');
      }

      // 2. Map returned files to the attachment format
      const attachments = uploadResult.files.map((file) => ({
        name: file.originalName || file.name,
        url: file.url,
        size: file.size,
      }));

      // 3. Send a silent message to attach them to the order
      await addMessage({
        id: orderId,
        message: `Admin uploaded ${attachments.length} new file(s).`,
        attachments: attachments,
      }).unwrap();

      toast.success('Files uploaded uniquely to this project successfully');

      // Clear input
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('File upload error:', error);
      toast.error(error?.data?.message || error?.message || 'Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  };

  const files = getFilesFromOrder();

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
            accept=".pdf,.png,.jpg,.jpeg,.zip,.rar,.doc,.docx"
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
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <h3 className="font-bold text-gray-900 dark:text-white">Project Files ({files.length})</h3>
        </div>

        {files.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <File className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">No files yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Upload files to share them with the client</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {files.map((file) => (
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
                      <span className="font-medium">{file.uploader}</span> • {file.date}
                    </p>
                    {file.isDeliverable && (
                      <span className="inline-flex items-center mt-1 text-xs text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                        ✓ Deliverable
                      </span>
                    )}
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
