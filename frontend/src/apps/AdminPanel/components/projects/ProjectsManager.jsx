import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Tag,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';

// RTK Query hooks
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useUploadProjectImageMutation,
} from '../../store/api/adminApiSlice';

// UI slice selectors and actions
import {
  selectProjectsList,
  selectProjectFilter,
  selectTableView,
  selectSorting,
  setProjectFilter,
  setTableView,
  setSorting,
  openModal,
  closeModal,
  selectIsModalOpen,
  selectModalType,
  selectSelectedItem,
  setActiveSection,
} from '../../store/ui/adminUISlice';

const ProjectsManager = () => {
  const dispatch = useDispatch();

  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // RTK Query hooks
  const {
    data: projectsData,
    isLoading,
    error,
    refetch,
  } = useGetProjectsQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
    status: useSelector(selectProjectFilter),
    sortBy: useSelector(selectSorting).sortBy,
    sortOrder: useSelector(selectSorting).sortOrder,
  });

  // Mutations
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadProjectImageMutation();

  // Selectors
  const cachedProjects = useSelector(selectProjectsList);
  const filter = useSelector(selectProjectFilter);
  const tableView = useSelector(selectTableView);
  const sorting = useSelector(selectSorting);
  const isModalOpen = useSelector(selectIsModalOpen);
  const modalType = useSelector(selectModalType);
  const selectedItem = useSelector(selectSelectedItem);

  // Use RTK Query data or fallback to cached data
  const projects = projectsData?.data?.projects || cachedProjects;
  const totalCount = projectsData?.data?.totalCount || projects?.length || 0;

  // Set active section on mount
  useEffect(() => {
    dispatch(setActiveSection('projects'));
  }, [dispatch]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      refetch();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, refetch]);

  // Handle create project
  const handleCreateProject = async (projectData) => {
    try {
      await createProject(projectData).unwrap();
      dispatch(closeModal());
      refetch();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  // Handle update project
  const handleUpdateProject = async (projectId, projectData) => {
    try {
      await updateProject({ id: projectId, ...projectData }).unwrap();
      dispatch(closeModal());
      refetch();
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  // Handle delete project
  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId).unwrap();
        refetch();
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    dispatch(setProjectFilter(newFilter));
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (sortBy) => {
    const newSortOrder = sorting.sortBy === sortBy && sorting.sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSorting({ sortBy, sortOrder: newSortOrder }));
    setCurrentPage(1);
  };

  // Handle view change
  const handleViewChange = (view) => {
    dispatch(setTableView(view));
  };

  // Open create modal
  const openCreateModal = () => {
    dispatch(openModal({ type: 'project', item: null }));
  };

  // Open edit modal
  const openEditModal = (project) => {
    dispatch(openModal({ type: 'project', item: project }));
  };

  // Filter projects based on search term
  const filteredProjects = projects?.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.technologies?.some(tech =>
      tech.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-4 w-4" />;
      case 'draft':
        return <Clock className="h-4 w-4" />;
      case 'archived':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your portfolio projects
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openCreateModal}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Project</span>
          </motion.button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              {/* Status Filter */}
              <select
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleViewChange('grid')}
                  className={`p-2 rounded-lg ${
                    tableView === 'grid'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-1 h-4 w-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => handleViewChange('list')}
                  className={`p-2 rounded-lg ${
                    tableView === 'list'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  <div className="space-y-1 h-4 w-4">
                    <div className="bg-current h-1 rounded-sm"></div>
                    <div className="bg-current h-1 rounded-sm"></div>
                    <div className="bg-current h-1 rounded-sm"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-600 dark:text-red-400">
                Failed to load projects. Please try again.
              </p>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Grid/List */}
        {!isLoading && (
          <AnimatePresence mode="wait">
            {tableView === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={() => openEditModal(project)}
                    onDelete={() => handleDeleteProject(project.id)}
                    isDeleting={isDeleting}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <ProjectTable
                  projects={filteredProjects}
                  sorting={sorting}
                  onSort={handleSortChange}
                  onEdit={openEditModal}
                  onDelete={handleDeleteProject}
                  isDeleting={isDeleting}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Empty State */}
        {!isLoading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first project'}
            </p>
            {!searchTerm && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openCreateModal}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Create Project</span>
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Pagination */}
        {totalCount > itemsPerPage && (
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Previous
              </button>

              <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
                Page {currentPage} of {Math.ceil(totalCount / itemsPerPage)}
              </span>

              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage >= Math.ceil(totalCount / itemsPerPage)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {isModalOpen && modalType === 'project' && (
        <ProjectModal
          project={selectedItem}
          onSave={selectedItem ? handleUpdateProject : handleCreateProject}
          onClose={() => dispatch(closeModal())}
          isLoading={isCreating || isUpdating}
          uploadImage={uploadImage}
          isUploading={isUploading}
        />
      )}
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, onEdit, onDelete, isDeleting, getStatusColor, getStatusIcon }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
  >
    {/* Project Image */}
    <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <FolderOpen className="h-12 w-12 text-gray-400" />
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-3 left-3">
        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {getStatusIcon(project.status)}
          <span className="capitalize">{project.status}</span>
        </span>
      </div>
    </div>

    {/* Project Content */}
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
        {project.title}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs text-gray-500">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Meta Info */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Eye className="h-4 w-4" />
          <span>{project.views || 0}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEdit}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Edit className="h-4 w-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDelete}
            disabled={isDeleting}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
          </motion.button>
        </div>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Eye className="h-4 w-4" />
            <span>View Live</span>
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

// Project Table Component
const ProjectTable = ({ projects, sorting, onSort, onEdit, onDelete, isDeleting, getStatusColor, getStatusIcon }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <button
              onClick={() => onSort('title')}
              className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <span>Project</span>
              {sorting.sortBy === 'title' && (
                <span className={sorting.sortOrder === 'asc' ? 'rotate-0' : 'rotate-180'}>
                  ↑
                </span>
              )}
            </button>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Technologies
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <button
              onClick={() => onSort('updatedAt')}
              className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <span>Updated</span>
              {sorting.sortBy === 'updatedAt' && (
                <span className={sorting.sortOrder === 'asc' ? 'rotate-0' : 'rotate-180'}>
                  ↑
                </span>
              )}
            </button>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Views
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        {projects.map((project) => (
          <motion.tr
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  {project.image ? (
                    <img
                      className="h-10 w-10 rounded-lg object-cover"
                      src={project.image}
                      alt={project.title}
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <FolderOpen className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {project.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                    {project.description}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                <span className="capitalize">{project.status}</span>
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex flex-wrap gap-1">
                {project.technologies?.slice(0, 2).map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies?.length > 2 && (
                  <span className="text-xs text-gray-500">
                    +{project.technologies.length - 2}
                  </span>
                )}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {new Date(project.updatedAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {project.views || 0}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex items-center justify-end space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onEdit(project)}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Edit className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onDelete(project.id)}
                  disabled={isDeleting}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </motion.button>
              </div>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Project Modal Component (simplified - you can expand this)
const ProjectModal = ({ project, onSave, onClose, isLoading, uploadImage, isUploading }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    technologies: project?.technologies || [],
    status: project?.status || 'draft',
    liveUrl: project?.liveUrl || '',
    githubUrl: project?.githubUrl || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (project) {
      onSave(project.id, formData);
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {project ? 'Edit Project' : 'Create Project'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Project'}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsManager;
