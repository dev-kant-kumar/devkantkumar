import {
  ArrowLeft,
  CheckCircle2,
  Github,
  Image as ImageIcon,
  Link,
  Loader,
  Plus,
  Save,
  Star,
  Trash2,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateProjectMutation,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useUploadImageMutation
} from "../../store/api/adminApiSlice";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const isEditing = projectId !== "new";

  const { data: projectData, isLoading: isLoadingProject } = useGetProjectByIdQuery(projectId, {
    skip: !isEditing
  });

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    liveUrl: "",
    githubUrl: "",
    image: { url: "", publicId: "" },
    featured: false,
    priority: 0,
    status: "published"
  });

  const [newTech, setNewTech] = useState("");

  useEffect(() => {
    if (isEditing && projectData?.data) {
      setFormData(projectData.data);
    }
  }, [isEditing, projectData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTech = (e) => {
    if (e.key === 'Enter' && newTech.trim()) {
      e.preventDefault();
      if (!formData.technologies.includes(newTech.trim())) {
        setFormData(prev => ({
          ...prev,
          technologies: [...prev.technologies, newTech.trim()]
        }));
      }
      setNewTech("");
    }
  };

  const removeTech = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
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
        image: {
          url: result.image.url,
          publicId: result.image.id
        }
      }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateProject({ id: projectId, ...formData }).unwrap();
        toast.success("Project updated successfully");
      } else {
        await createProject(formData).unwrap();
        toast.success("Project created successfully");
      }
      navigate("/admin/projects");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  if (isEditing && isLoadingProject) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/projects")}
            className="p-2.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isEditing ? "Edit Project" : "Create New Project"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
               {isEditing ? `Refining details for "${formData.title}"` : "Add a new masterpiece to your portfolio"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button
             onClick={() => navigate("/admin/projects")}
             className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-mono text-sm"
           >
             Cancel
           </button>
           <button
             onClick={handleSubmit}
             disabled={isCreating || isUpdating}
             className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
           >
             {isCreating || isUpdating ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
             <span>{isEditing ? "Update Project" : "Publish Project"}</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Information */}
          <section className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white border-l-4 border-blue-500 pl-4">General Details</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. NextGen E-commerce Platform"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Project Description</label>
                <textarea
                  name="description"
                  rows={6}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your project in detail..."
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white resize-none"
                />
              </div>
            </div>
          </section>

          {/* Tech Stack & Status */}
          <section className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white border-l-4 border-purple-500 pl-4">Technologies & Visibility</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tech Stack</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.technologies.map(tech => (
                    <span key={tech} className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold border border-blue-200/50 dark:border-blue-700/50">
                      {tech}
                      <button onClick={() => removeTech(tech)} className="hover:text-red-500 transition-colors">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyDown={handleAddTech}
                  placeholder="Press Enter to add technology..."
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600">
                      <Star size={20} fill={formData.featured ? "currentColor" : "none"} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Featured Project</p>
                      <p className="text-xs text-gray-500">Show in highlight section</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-6 h-6 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Status</p>
                      <p className="text-xs text-gray-500">Visibility of this project</p>
                    </div>
                  </div>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="bg-transparent text-sm font-semibold outline-none cursor-pointer text-blue-600 dark:text-blue-400"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Media & Links */}
        <div className="space-y-8">
          {/* Project Image */}
          <section className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm space-y-6">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ImageIcon size={20} className="text-blue-500" />
                Featured Image
             </h3>
             <div className="relative group aspect-video rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-blue-500/50">
                {formData.image?.url ? (
                  <>
                    <img src={formData.image.url} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <label className="p-3 bg-white text-gray-900 rounded-full cursor-pointer hover:scale-110 transition-transform">
                            <Plus size={20} />
                            <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                        </label>
                        <button
                           onClick={() => setFormData(p => ({...p, image: {url: "", publicId: ""}}))}
                           className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                  </>
                ) : (
                  <label className="flex flex-col items-center gap-3 cursor-pointer group/label">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-full group-hover/label:scale-110 transition-transform">
                       {isUploading ? <Loader className="animate-spin" size={24} /> : <Plus size={24} />}
                    </div>
                    <div className="text-center">
                       <p className="text-sm font-bold text-gray-900 dark:text-white">Upload Image</p>
                       <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Recomm. 1200x800</p>
                    </div>
                    <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                  </label>
                )}
             </div>
          </section>

          {/* Links & Priority */}
          <section className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm space-y-6">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white">Links & Order</h3>
             <div className="space-y-4">
                <div>
                   <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      <Link size={14} className="text-blue-500" />
                      Live Demo URL
                   </label>
                   <input
                     type="url"
                     name="liveUrl"
                     value={formData.liveUrl}
                     onChange={handleInputChange}
                     placeholder="https://..."
                     className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-blue-500 transition-all"
                   />
                </div>
                <div>
                   <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      <Github size={14} className="text-gray-900 dark:text-white" />
                      GitHub Repository
                   </label>
                   <input
                     type="url"
                     name="githubUrl"
                     value={formData.githubUrl}
                     onChange={handleInputChange}
                     placeholder="https://github.com/..."
                     className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-blue-500 transition-all font-mono"
                   />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Display Priority</label>
                  <input
                    type="number"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-blue-500 font-mono"
                  />
                  <p className="text-[10px] text-gray-500 mt-2 italic">Higher numbers appear first in the list.</p>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
