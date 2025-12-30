import { Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useCreateProductMutation,
    useGetAdminProductByIdQuery,
    useUpdateProductMutation
} from '../../store/api/adminApiSlice';
import ProductForm from './components/ProductForm';

const ProductEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Fetch product data if editing
  const { data: productData, isLoading: isLoadingProduct, error } = useGetAdminProductByIdQuery(id, {
    skip: !isEditing,
  });

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const handleCreate = async (formData) => {
    try {
      await createProduct(formData).unwrap();
      toast.success('Product created successfully');
      navigate('/admin/marketplace/products');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to create product');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateProduct({ id, ...formData }).unwrap();
      toast.success('Product updated successfully');
      navigate('/admin/marketplace/products');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update product');
    }
  };

  const handleCancel = () => {
    navigate('/admin/marketplace/products');
  };

  if (isEditing && isLoadingProduct) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isEditing && error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Product not found</h3>
        <button
          onClick={() => navigate('/admin/marketplace/products')}
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
            {isEditing ? 'Edit Product' : 'New Product'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {isEditing ? 'Update product details and files.' : 'Add a new digital asset to your store.'}
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white/80 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-100/10 dark:shadow-black/20">
        <ProductForm
          initialData={isEditing ? productData?.data : null}
          onSubmit={isEditing ? handleUpdate : handleCreate}
          isLoading={isCreating || isUpdating}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default ProductEditor;
