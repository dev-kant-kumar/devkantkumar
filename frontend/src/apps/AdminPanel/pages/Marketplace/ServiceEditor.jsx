import { Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useCreateServiceMutation,
    useGetAdminServiceByIdQuery,
    useUpdateServiceMutation
} from '../../store/api/adminApiSlice';
import ServiceForm from './components/ServiceForm';

const ServiceEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Fetch service data if editing
  const { data: serviceData, isLoading: isLoadingService, error } = useGetAdminServiceByIdQuery(id, {
    skip: !isEditing,
  });

  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

  const handleCreate = async (formData) => {
    try {
      await createService(formData).unwrap();
      toast.success('Service created successfully');
      navigate('/admin/marketplace/services');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to create service');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateService({ id, ...formData }).unwrap();
      toast.success('Service updated successfully');
      navigate('/admin/marketplace/services');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update service');
    }
  };

  const handleCancel = () => {
    navigate('/admin/marketplace/services');
  };

  if (isEditing && isLoadingService) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isEditing && error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Service not found</h3>
        <button
          onClick={() => navigate('/admin/marketplace/services')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Service' : 'New Service'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {isEditing ? 'Update service details and packages.' : 'Add a new service offering to your store.'}
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white/80 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-100/10 dark:shadow-black/20">
        <ServiceForm
          initialData={isEditing ? serviceData?.data : null}
          onSubmit={isEditing ? handleUpdate : handleCreate}
          isLoading={isCreating || isUpdating}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default ServiceEditor;
