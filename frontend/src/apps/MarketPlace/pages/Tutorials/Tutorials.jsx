import { motion } from 'framer-motion';
import { Clock, Filter, Play, Search, Share2, Star } from 'lucide-react';

const Tutorials = () => {
  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with Our Marketplace',
      duration: '5:20',
      thumbnail: 'bg-blue-100', // Placeholder color
      views: '1.2k',
      category: 'Basics'
    },
    {
      id: 2,
      title: 'How to Customize Your Profile',
      duration: '3:45',
      thumbnail: 'bg-purple-100',
      views: '856',
      category: 'Account'
    },
    {
      id: 3,
      title: 'Searching for Products & Services',
      duration: '4:10',
      thumbnail: 'bg-green-100',
      views: '2.1k',
      category: 'Buying'
    },
    {
      id: 4,
      title: 'Understanding Licensing',
      duration: '6:30',
      thumbnail: 'bg-orange-100',
      views: '3.4k',
      category: 'Legal'
    },
    {
      id: 5,
      title: 'Managing Your Orders',
      duration: '4:50',
      thumbnail: 'bg-red-100',
      views: '1.5k',
      category: 'Buying'
    },
    {
      id: 6,
      title: 'Troubleshooting Common Issues',
      duration: '8:15',
      thumbnail: 'bg-gray-100',
      views: '5.2k',
      category: 'Support'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Video Tutorials
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Learn how to get the most out of our platform with these step-by-step guides.
            </p>

            <div className="max-w-2xl mx-auto flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-white/30 focus:border-white text-lg text-gray-900 shadow-xl placeholder-gray-500"
                />
              </div>
              <button className="px-6 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-xl text-white font-semibold flex items-center gap-2 backdrop-blur-sm transition-all focus:ring-4 focus:ring-white/30">
                <Filter size={20} />
                <span>Filters</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100 group"
            >
              {/* Thumbnail Placeholder */}
              <div className={`h-48 ${video.thumbnail} relative flex items-center justify-center group-hover:brightness-95 transition-all cursor-pointer`}>
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="h-6 w-6 text-blue-600 ml-1" fill="currentColor" />
                </div>
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {video.category}
                  </span>
                  <div className="flex items-center text-gray-400 text-xs">
                    <Star size={12} className="mr-1" />
                    {video.views} views
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    Updated 2 days ago
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
