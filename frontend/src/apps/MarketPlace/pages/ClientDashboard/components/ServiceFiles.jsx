import { motion } from 'framer-motion';
import { Download, File, FileText, Image, MoreVertical, UploadCloud } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ServiceFiles = ({ orderId, order }) => {
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
                : 'Admin',
              url: att.url,
            });
          });
        }
      });
    }

    // Get download links from order items
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

    return files;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return 'N/A';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  // Determine file type from filename
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

  const handleDownload = (file) => {
    if (!file.url) {
      toast.error('Download link not available');
      return;
    }
    window.open(file.url, '_blank');
  };

  const files = getFilesFromOrder();

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
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 hover:bg-green-50/30 transition-all cursor-pointer group">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Upload Files</h3>
        <p className="text-sm text-gray-500 mt-1">Drag & drop files here, or click to browse</p>
        <p className="text-xs text-gray-400 mt-2">Supports PDF, PNG, JPG, ZIP (Max 50MB)</p>
        <p className="text-xs text-yellow-600 mt-2">File upload coming soon</p>
      </div>

      {/* File List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-900">Project Files ({files.length})</h3>
        </div>

        {files.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <File className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No files yet</p>
            <p className="text-sm text-gray-400 mt-1">Files shared in messages or delivered will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg border ${file.isDeliverable ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                    {getFileIcon(file.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                      {file.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {file.size !== 'N/A' && `${file.size} • `}
                      {file.uploader} • {file.date}
                    </p>
                    {file.isDeliverable && (
                      <span className="inline-flex items-center mt-1 text-xs text-green-600 font-medium">
                        ✓ Deliverable
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(file)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical className="h-4 w-4" />
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
