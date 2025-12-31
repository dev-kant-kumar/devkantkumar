import { AnimatePresence, motion } from "framer-motion";
import {
    Edit2,
    ExternalLink,
    Filter,
    FolderOpen,
    Github,
    Plus,
    Search,
    Star,
    Trash2
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
    useDeleteProjectMutation,
    useGetAdminProjectsQuery
} from "../../store/api/adminApiSlice";

const ProjectsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAdminProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();

  const projects = data?.data || [];

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id).unwrap();
        toast.success("Project deleted successfully");
      } catch (error) {
        toast.error("Failed to delete project");
      }
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <FolderOpen size={16} />
            </span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Portfolio</span>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Projects Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Showcase your best work. Manage your projects and technical stack.
          </p>
        </div>
        <Link
          to="new"
          className="group flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 whitespace-nowrap"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-semibold tracking-tight">Add New Project</span>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-3 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm focus-within:border-blue-500/50 transition-all">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search projects by title or tech stack..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
          />
        </div>
        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block mx-2" />
        <button className="flex items-center gap-2 px-4 py-2.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-all text-sm font-medium">
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800/40 rounded-2xl animate-pulse border border-gray-200 dark:border-gray-700/50" />
            ))
          ) : filteredProjects.length === 0 ? (
            <div className="col-span-full py-20 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <FolderOpen size={40} className="text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">No projects found</h3>
              <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                Time to share your awesome projects with the world. Click the button above to get started!
              </p>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 overflow-hidden relative flex flex-col h-full"
              >
                {/* Project Image Shell */}
                <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {project.image?.url ? (
                    <img
                       src={project.image.url}
                       alt={project.title}
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                       <FolderOpen size={48} />
                    </div>
                  )}
                  {/* Overlay Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {project.featured && (
                       <span className="flex items-center gap-1 px-2 py-1 bg-yellow-400 text-yellow-900 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-lg">
                          <Star size={10} fill="currentColor" />
                          Featured
                       </span>
                    )}
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-lg ${
                      project.status === 'published' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3">
                     <Link
                        to={`edit/${project._id}`}
                        className="p-3 bg-white text-gray-900 rounded-full hover:scale-110 transition-transform shadow-lg"
                        title="Edit Project"
                     >
                        <Edit2 size={20} />
                     </Link>
                     <button
                        onClick={() => handleDelete(project._id)}
                        className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                        title="Delete Project"
                     >
                        <Trash2 size={20} />
                     </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-medium rounded-md border border-gray-200/50 dark:border-gray-700/50">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-medium rounded-md">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between mt-auto">
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                          <Github size={18} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">
                      Priority: {project.priority || 0}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsManagement;
