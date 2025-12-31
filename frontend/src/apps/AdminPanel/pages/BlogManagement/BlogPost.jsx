import { AnimatePresence, motion } from "framer-motion";
import {
    AlertCircle,
    ArrowLeft,
    Eye,
    FileText,
    Image as ImageIcon,
    Layout,
    Loader,
    Plus,
    Save,
    Settings,
    Tag as TagIcon,
    Trash2,
    X
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from "react-router-dom";
import remarkGfm from 'remark-gfm';
import {
    useCreateBlogPostMutation,
    useGetAdminBlogPostBySlugQuery,
    useUpdateBlogPostMutation,
    useUploadImageMutation
} from "../../store/api/adminApiSlice";

const BlogPost = () => {
  const { slug: existingSlug } = useParams();
  const navigate = useNavigate();
  const isEditing = !!existingSlug && existingSlug !== "new";

  const { data: blogData, isLoading: isLoadingBlog } = useGetAdminBlogPostBySlugQuery(existingSlug, {
    skip: !isEditing
  });

  const [createPost, { isLoading: isCreating }] = useCreateBlogPostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdateBlogPostMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "Tutorial",
    tags: [],
    coverImage: { url: "", publicId: "" },
    status: "draft"
  });

  const [newTag, setNewTag] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (isEditing && blogData?.data) {
      setFormData(blogData.data);
    }
  }, [isEditing, blogData]);

  // Auto-generate slug from title if not editing
  useEffect(() => {
    if (!isEditing && formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(newTag.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()]
        }));
      }
      setNewTag("");
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      const result = await uploadImage(data).unwrap();
      setFormData(prev => ({
        ...prev,
        coverImage: {
          url: result.image.url,
          publicId: result.image.id
        }
      }));
      toast.success("Cover image uploaded");
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Find existing ID from data
        const id = blogData.data._id;
        await updatePost({ id, ...formData }).unwrap();
        toast.success("Article updated successfully");
      } else {
        await createPost(formData).unwrap();
        toast.success("Article published successfully");
      }
      navigate("/admin/blog");
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  if (isEditing && isLoadingBlog) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Navbar Style Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-4 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/blog")}
            className="p-2.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-blue-600 transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
              {isEditing ? `Editing: ${formData.title}` : "New Publication"}
            </h1>
            <div className="flex items-center gap-2">
               <span className={`w-2 h-2 rounded-full ${formData.status === 'published' ? 'bg-green-500' : 'bg-orange-500'}`} />
               <span className="text-xs font-mono uppercase text-gray-500 tracking-wider font-bold">
                 {isEditing ? "Database Mode" : "Creation Mode"}
               </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <button
             onClick={() => setShowPreview(!showPreview)}
             className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
               showPreview ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
             }`}
           >
             <Eye size={18} />
             <span>Preview</span>
           </button>
           <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1" />
           <button
             onClick={handleSubmit}
             disabled={isCreating || isUpdating}
             className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50"
           >
             {isCreating || isUpdating ? <Loader className="animate-spin" size={16} /> : <Save size={16} />}
             <span>{isEditing ? "Save Changes" : "Publish"}</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Side */}
        <div className={`${showPreview ? 'lg:col-span-6' : 'lg:col-span-8'} space-y-6 transition-all duration-500`}>
          {/* Post Header */}
          <section className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm space-y-6">
             <div className="space-y-4">
                <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Topic Title</label>
                   <input
                     type="text"
                     name="title"
                     value={formData.title}
                     onChange={handleInputChange}
                     placeholder="The Future of Agentic AI..."
                     className="w-full bg-transparent text-3xl font-black text-gray-900 dark:text-white border-none outline-none placeholder:text-gray-300 dark:placeholder:text-gray-700"
                   />
                </div>

                <div className="flex flex-col md:flex-row gap-4 border-t border-gray-200/50 dark:border-gray-700/50 pt-4">
                   <div className="flex-1">
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        <Settings size={12} />
                        URL Identifier (Slug)
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-mono text-blue-600 dark:text-blue-400"
                        placeholder="article-url-slug"
                      />
                   </div>
                   <div className="w-full md:w-1/3">
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                         <Layout size={12} />
                         Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm outline-none cursor-pointer"
                      >
                         <option>Tutorial</option>
                         <option>Insight</option>
                         <option>Update</option>
                         <option>Tech</option>
                      </select>
                   </div>
                </div>
             </div>
          </section>

          {/* Main Content */}
          <section className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm flex flex-col min-h-[500px] overflow-hidden">
             <div className="px-6 py-3 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
                <div className="flex items-center gap-4">
                   <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <FileText size={14} />
                      Mardown Source
                   </span>
                </div>
                <div className="flex items-center gap-1.5 p-1 bg-white/50 dark:bg-black/20 rounded-lg text-[10px] text-gray-400 font-mono">
                   {formData.content.length} characters
                </div>
             </div>
             <textarea
               name="content"
               value={formData.content}
               onChange={handleInputChange}
               placeholder="Unleash your creativity here. Supports Markdown (GFM)..."
               className="w-full flex-1 p-8 bg-transparent text-gray-800 dark:text-gray-200 border-none outline-none resize-none font-mono text-sm leading-relaxed scrollbar-thin overflow-y-auto"
             />
          </section>
        </div>

        {/* Preview or Settings Side */}
        <div className={`${showPreview ? 'lg:col-span-6' : 'lg:col-span-4'} transition-all duration-500`}>
           <AnimatePresence mode="wait">
             {showPreview ? (
               <motion.div
                 key="preview"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 20 }}
                 className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden flex flex-col h-full sticky top-4 max-h-[calc(100vh-8rem)]"
               >
                  <div className="px-6 py-4 bg-blue-600 flex items-center justify-between text-white shrink-0">
                     <div className="flex items-center gap-2">
                        <Eye size={18} />
                        <span className="font-bold text-sm uppercase tracking-widest">Live Preview</span>
                     </div>
                     <button onClick={() => setShowPreview(false)} className="hover:rotate-90 transition-transform">
                        <X size={20} />
                     </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-8 prose dark:prose-invert max-w-none">
                     <h1 className="border-b pb-4 mb-6">{formData.title || "Untitled Presentation"}</h1>
                     <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {formData.content || "*Empty content. Start typing to see it reflected here.*"}
                     </ReactMarkdown>
                  </div>
               </motion.div>
             ) : (
               <motion.div
                 key="settings"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 20 }}
                 className="space-y-6 sticky top-4"
               >
                  {/* Metadata Settings */}
                  <section className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm space-y-6">
                     <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                        <Settings size={16} className="text-blue-500" />
                        Publication Config
                     </h3>

                     <div className="space-y-6">
                        <div>
                           <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Cover Image</label>
                           <div className="relative group aspect-video rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all">
                              {formData.coverImage?.url ? (
                                <>
                                  <img src={formData.coverImage.url} alt="Cover" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                                     <label className="p-2 bg-white rounded-full text-gray-900 cursor-pointer hover:scale-110 transition-transform">
                                        <Plus size={18} />
                                        <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                     </label>
                                     <button
                                        onClick={() => setFormData(p => ({...p, coverImage: {url: "", publicId: ""}}))}
                                        className="p-2 bg-red-500 rounded-full text-white hover:scale-110 transition-transform"
                                     >
                                        <Trash2 size={18} />
                                     </button>
                                  </div>
                                </>
                              ) : (
                                <label className="flex flex-col items-center justify-center p-4 h-full cursor-pointer hover:scale-105 transition-transform duration-300">
                                   <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-full mb-2">
                                      {isUploading ? <Loader className="animate-spin" size={20} /> : <ImageIcon size={20} />}
                                   </div>
                                   <p className="text-[10px] font-bold text-gray-500 uppercase">Upload Cover</p>
                                   <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                </label>
                              )}
                           </div>
                        </div>

                        <div>
                           <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Excerpt (Short Meta Summary)</label>
                           <textarea
                             name="excerpt"
                             value={formData.excerpt}
                             onChange={handleInputChange}
                             rows={4}
                             placeholder="Provide a brief summary for search engines and social cards..."
                             className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs outline-none focus:ring-4 focus:ring-blue-500/5 transition-all resize-none"
                           />
                        </div>

                        <div>
                           <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Keywords & Tags</label>
                           <div className="flex flex-wrap gap-2 mb-3">
                              {formData.tags.map(tag => (
                                <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg text-[10px] font-black uppercase border border-blue-100 dark:border-blue-700">
                                   {tag}
                                   <button onClick={() => removeTag(tag)} className="hover:text-red-500">
                                      <X size={10} />
                                   </button>
                                </span>
                              ))}
                           </div>
                           <div className="relative">
                              <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                              <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={handleAddTag}
                                placeholder="Add tag + press Enter"
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-blue-500 transition-all font-mono"
                              />
                           </div>
                        </div>

                        <div className="pt-6 border-t border-gray-200/50 dark:border-gray-700/50 grid grid-cols-2 gap-4">
                           <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Publish Status</label>
                              <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold font-mono outline-none"
                              >
                                 <option value="draft">Draft (Private)</option>
                                 <option value="published">Published (Public)</option>
                              </select>
                           </div>
                           <div className="flex flex-col items-center justify-end">
                              <div className="flex items-center gap-1.5 p-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 rounded-xl border border-yellow-100 dark:border-yellow-700/50 w-full justify-center">
                                 <AlertCircle size={14} />
                                 <span className="text-[10px] font-bold uppercase">Ready?</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
