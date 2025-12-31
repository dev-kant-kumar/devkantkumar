import {
    BookOpen,
    Calendar,
    Edit2,
    Eye,
    FileText,
    Filter,
    Plus,
    Search,
    Tag,
    Trash2
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
    useDeleteBlogPostMutation,
    useGetAdminBlogPostsQuery
} from "../../store/api/adminApiSlice";

const BlogManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAdminBlogPostsQuery();
  const [deleteBlog] = useDeleteBlogPostMutation();

  const posts = data?.data || [];

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteBlog(id).unwrap();
        toast.success("Blog post deleted");
      } catch (error) {
        toast.error("Failed to delete post");
      }
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                <BookOpen size={16} />
            </span>
            <span className="text-sm font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Knowledge Base</span>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Blog Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Share your thoughts, tutorials and updates with your audience.
          </p>
        </div>
        <Link
          to="new"
          className="group flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 whitespace-nowrap"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-semibold tracking-tight">Create Post</span>
        </Link>
      </div>

      {/* Search & Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 flex items-center gap-4 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-3 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm focus-within:border-blue-500/50 transition-all">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search articles, tags or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
            />
          </div>
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block mx-1" />
          <button className="p-2.5 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Filter size={18} />
          </button>
        </div>

        <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-3 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm flex items-center justify-around">
           <div className="text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{posts.length}</p>
           </div>
           <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
           <div className="text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live</p>
              <p className="text-lg font-bold text-green-500">{posts.filter(p => p.status === 'published').length}</p>
           </div>
           <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
           <div className="text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Drafts</p>
              <p className="text-lg font-bold text-orange-500">{posts.filter(p => p.status === 'draft').length}</p>
           </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Article</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Stats</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-8"><div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full" /></td>
                  </tr>
                ))
              ) : filteredPosts.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                         <FileText size={48} className="text-gray-300" />
                         <p className="text-gray-500 font-medium">No articles found. Time to write your first story!</p>
                      </div>
                   </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post._id} className="group hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                          {post.coverImage?.url ? (
                            <img src={post.coverImage.url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                               <FileText size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-[10px] text-gray-400">
                              <Calendar size={10} />
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-gray-400">
                              <Tag size={10} />
                              {post.tags.slice(0, 2).join(", ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg border border-blue-200/50 dark:border-blue-700/50">
                          {post.category}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col items-center justify-center">
                          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                             <Eye size={14} />
                             <span className="text-sm font-bold">{post.views || 0}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 uppercase mt-0.5">Views</p>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                         post.status === 'published'
                           ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                           : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                       }`}>
                         <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'published' ? 'bg-green-500' : 'bg-orange-500'}`} />
                         {post.status}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            to={`edit/${post.slug}`}
                            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all"
                            title="Edit Article"
                          >
                             <Edit2 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all"
                            title="Delete Article"
                          >
                             <Trash2 size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
