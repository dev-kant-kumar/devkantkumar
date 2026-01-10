import { motion } from 'framer-motion';
import { Lock, TrendingUp } from 'lucide-react';

const CommunityForum = () => {
  const topics = [
    {
      id: 1,
      title: 'Feedback on the new Dashboard UI',
      author: 'Sarah J.',
      replies: 45,
      views: 1200,
      category: 'General Discussion',
      lastActive: '2 hours ago',
      isHot: true
    },
    {
      id: 2,
      title: 'Feature Request: Dark Mode for Reports',
      author: 'Mike Chen',
      replies: 128,
      views: 3400,
      category: 'Feature Requests',
      lastActive: '1 day ago',
      isHot: true
    },
    {
      id: 3,
      title: 'Integration with Google Sheets',
      author: 'Alex D.',
      replies: 12,
      views: 450,
      category: 'Q&A',
      lastActive: '4 hours ago',
      isHot: false
    },
    {
      id: 4,
      title: 'Upcoming Maintenance Schedule - Jan 2026',
      author: 'Admin Team',
      replies: 0,
      views: 5600,
      category: 'Announcements',
      lastActive: '1 week ago',
      isHot: false,
      isPinned: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Community Forum
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Connect, share, and learn from 10,000+ creators and developers.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
               <button className="flex-1 bg-white hover:bg-gray-100 text-blue-700 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-900/10">
                 Join Discussion
               </button>
               <button className="flex-1 bg-blue-800/50 hover:bg-blue-800/70 border border-blue-400/30 text-white py-3 rounded-xl font-bold transition-colors backdrop-blur-sm">
                 Browse Topics
               </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Forum List */}
          <div className="lg:flex-1">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
               <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                 <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                   <TrendingUp size={18} className="text-blue-600" />
                   Trending Topics
                 </h2>
                 <div className="flex gap-2">
                   <select className="text-sm border-gray-300 rounded-lg p-1.5 bg-white">
                     <option>Latest</option>
                     <option>Top</option>
                     <option>Most Viewed</option>
                   </select>
                 </div>
               </div>

               <div className="divide-y divide-gray-100">
                 {topics.map((topic, idx) => (
                   <motion.div
                    key={topic.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 hover:bg-gray-50 transition-colors flex gap-4"
                   >
                     <div className="flex-1">
                       <div className="flex items-center gap-2 mb-1">
                         {topic.isPinned && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">Pinned</span>}
                         <h3 className="font-semibold text-gray-900 text-lg hover:text-blue-600 cursor-pointer">{topic.title}</h3>
                         {topic.isHot && <span className="text-orange-500 text-xs flex items-center"><TrendingUp size={12} className="mr-1" /> Hot</span>}
                       </div>
                       <p className="text-sm text-gray-500">
                         in <span className="font-medium text-gray-700">{topic.category}</span> • by {topic.author} • {topic.lastActive}
                       </p>
                     </div>
                     <div className="text-right flex items-center gap-6 text-gray-500">
                       <div className="text-center w-12">
                         <div className="text-lg font-bold text-gray-700">{topic.replies}</div>
                         <div className="text-xs">Replies</div>
                       </div>
                       <div className="text-center w-12">
                         <div className="text-lg font-bold text-gray-700">{topic.views}</div>
                         <div className="text-xs">Views</div>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
             </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
               <ul className="space-y-2">
                 {['General Discussion', 'Feature Requests', 'Q&A', 'Announcements', 'Showcase', 'Jobs'].map((cat, i) => (
                   <li key={i} className="flex justify-between items-center text-gray-600 hover:text-blue-600 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                     <span>{cat}</span>
                     <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs">12+</span>
                   </li>
                 ))}
               </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white text-center">
              <Lock className="h-10 w-10 mx-auto mb-3 text-white/80" />
              <h3 className="font-bold text-lg mb-2">Members Only Area</h3>
              <p className="text-sm text-white/80 mb-4">Upgrade to Premium to access exclusive developer channels and direct support.</p>
              <button className="w-full bg-white text-indigo-700 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
