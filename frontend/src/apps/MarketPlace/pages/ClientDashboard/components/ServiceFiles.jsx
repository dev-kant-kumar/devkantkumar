import { motion } from 'framer-motion';
import { Download, File, FileText, Image, MoreVertical, UploadCloud } from 'lucide-react';

const ServiceFiles = () => {
  const files = [
    { id: 1, name: 'Project_Requirements.pdf', size: '2.4 MB', type: 'pdf', date: 'Oct 24, 2023', uploader: 'You' },
    { id: 2, name: 'Logo_Assets.zip', size: '15.8 MB', type: 'zip', date: 'Oct 25, 2023', uploader: 'Alex M.' },
    { id: 3, name: 'Homepage_Mockup_v1.png', size: '4.2 MB', type: 'image', date: 'Oct 26, 2023', uploader: 'Alex M.' },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="h-8 w-8 text-red-500" />;
      case 'image': return <Image className="h-8 w-8 text-blue-500" />;
      case 'zip': return <File className="h-8 w-8 text-yellow-500" />;
      default: return <File className="h-8 w-8 text-gray-400" />;
    }
  };

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
      </div>

      {/* File List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-900">Project Files ({files.length})</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {files.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                  {getFileIcon(file.type)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors cursor-pointer">
                    {file.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {file.size} • Uploaded by {file.uploader} • {file.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Download">
                  <Download className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceFiles;
