import {
    Edit2,
    Filter,
    Package,
    Plus,
    Search,
    Trash2
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../../common/components/DeleteConfirmationModal';
import {
    useDeleteServiceMutation,
    useGetAdminServicesQuery
} from '../../store/api/adminApiSlice';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const navigate = useNavigate();

  const { data, isLoading } = useGetAdminServicesQuery({});
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();

  const services = data?.services || [];

  const confirmDelete = (service) => {
    setItemToDelete(service);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      await deleteService(itemToDelete._id).unwrap();
      toast.success('Service deleted');
      setDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      toast.error(error.data?.message || 'Failed to delete service');
    }
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get minimum package price for display
  const getMinPrice = (packages) => {
    if (!packages?.length) return 0;
    return Math.min(...packages.map(p => p.price || 0));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Services
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Manage your freelance services and packages.
          </p>
        </div>
        <Link
          to="new"
          className="group flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-semibold">Add Service</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center space-x-4 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-2 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0"
          />
        </div>
        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2" />
        <button className="p-3 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
          <Filter size={20} />
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500 animate-pulse">Loading services...</div>
        ) : filteredServices.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Package size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No services found</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                Get started by creating your first service. It will appear here once added.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Service</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Category</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Starting From</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                {filteredServices.map((service) => (
                  <tr
                    key={service._id}
                    className="group hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 overflow-hidden shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-300">
                          {service.images?.[0]?.url ? (
                            <img src={service.images[0].url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package size={20} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white line-clamp-1">{service.title}</p>
                          <p className="text-xs text-gray-500 truncate max-w-[200px] font-mono opacity-80">{service.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 capitalize ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/20">
                        {service.category?.replace(/-/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                      ₹{getMinPrice(service.packages)}
                    </td>
                    <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-inset ring-green-600/20 dark:ring-green-400/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Active
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => navigate(`edit/${service._id}`)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => confirmDelete(service)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
            setDeleteModalOpen(false);
            setItemToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        itemName={itemToDelete?.title}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Services;
