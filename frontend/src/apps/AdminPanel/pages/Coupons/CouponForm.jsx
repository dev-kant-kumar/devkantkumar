import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import PremiumDropdown from '../../../../shared/components/PremiumDropdown.jsx';
import PremiumButton from '../../common/components/PremiumButton';
import {
    useCreateCouponMutation,
    useGetAdminProductsQuery,
    useGetAdminServicesQuery,
    useUpdateCouponMutation
} from '../../store/api/adminApiSlice';

const CouponForm = ({ coupon, onSuccess }) => {
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: 10,
    maxDiscount: '',
    minOrderAmount: 0,
    maxUses: '',
    maxUsesPerCustomer: 1,
    validFrom: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    applicableToAll: true,
    applicableProductIds: [],
    applicableServiceIds: [],
    isActive: true
  });

  const [errors, setErrors] = useState({});

  // Fetch products
  const { data: productsData } = useGetAdminProductsQuery({ limit: 1000 });
  const products = productsData?.products || [];

  // Fetch services
  const { data: servicesData } = useGetAdminServicesQuery({ limit: 1000 });
  const services = servicesData?.services || [];

  // Create/Update mutations
  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
  const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();
  const isPending = isCreating || isUpdating;

  // Populate form if editing
  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code,
        description: coupon.description || '',
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        maxDiscount: coupon.maxDiscount || '',
        minOrderAmount: coupon.minOrderAmount || 0,
        maxUses: coupon.maxUses || '',
        maxUsesPerCustomer: coupon.maxUsesPerCustomer || 1,
        validFrom: coupon.validFrom.split('T')[0],
        validUntil: coupon.validUntil.split('T')[0],
        applicableToAll: coupon.applicableToAll,
        applicableProductIds: coupon.applicableProductIds.map(id => id._id) || [],
        applicableServiceIds: coupon.applicableServiceIds.map(id => id._id) || [],
        isActive: coupon.isActive
      });
    }
  }, [coupon]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = 'Code is required';
    } else if (formData.code.length < 3) {
      newErrors.code = 'Code must be at least 3 characters';
    }

    if (!formData.discountValue || formData.discountValue <= 0) {
      newErrors.discountValue = 'Discount value must be greater than 0';
    }

    if (formData.discountType === 'percentage' && formData.discountValue > 100) {
      newErrors.discountValue = 'Percentage discount cannot exceed 100%';
    }

    if (new Date(formData.validUntil) <= new Date(formData.validFrom)) {
      newErrors.validUntil = 'Valid until date must be after valid from date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'applicableProductIds' || name === 'applicableServiceIds') {
      const array = formData[name];
      if (checked && !array.includes(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: [...array, value]
        }));
      } else if (!checked) {
        setFormData(prev => ({
          ...prev,
          [name]: array.filter(id => id !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = {
      code: formData.code.toUpperCase(),
      description: formData.description,
      discountType: formData.discountType,
      discountValue: parseFloat(formData.discountValue),
      maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : null,
      minOrderAmount: parseFloat(formData.minOrderAmount),
      maxUses: formData.maxUses ? parseInt(formData.maxUses) : null,
      maxUsesPerCustomer: parseInt(formData.maxUsesPerCustomer),
      validFrom: new Date(formData.validFrom).toISOString(),
      validUntil: new Date(formData.validUntil).toISOString(),
      applicableToAll: formData.applicableToAll,
      applicableProductIds: formData.applicableProductIds,
      applicableServiceIds: formData.applicableServiceIds,
      isActive: formData.isActive
    };

    const submitCoupon = async () => {
      try {
        if (coupon) {
          await updateCoupon({ id: coupon._id, ...submitData }).unwrap();
          toast.success('Coupon updated successfully');
        } else {
          await createCoupon(submitData).unwrap();
          toast.success('Coupon created successfully');
        }
        onSuccess();
      } catch (error) {
        toast.error(error?.data?.message || 'Failed to save coupon');
      }
    };
    submitCoupon();
  };

  return (
    <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm p-6 or p-8 relative z-0">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {coupon ? 'Edit Coupon' : 'Create New Coupon'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Code and Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Coupon Code *
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="SUMMER20"
              disabled={coupon} // Prevent editing code
              className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:text-white transition-all"
            />
            {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Summer Sale - Get 20% off"
              className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            />
          </div>
        </div>

        {/* Discount Settings */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Discount Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount Type *</label>
              <PremiumDropdown
                value={formData.discountType}
                onChange={(val) => handleChange({ target: { name: 'discountType', value: val } })}
                options={[
                  { value: 'percentage', label: 'Percentage (%)' },
                  { value: 'fixed', label: 'Fixed Amount (₹)' }
                ]}
                buttonClassName="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white hover:bg-white/80 dark:hover:bg-gray-800/80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Discount Value *
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleChange}
                  placeholder="20"
                  step={formData.discountType === 'percentage' ? 0.1 : 1}
                  className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white pr-8 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  {formData.discountType === 'percentage' ? '%' : '₹'}
                </span>
              </div>
              {errors.discountValue && <p className="text-red-500 text-sm mt-1">{errors.discountValue}</p>}
            </div>

            {formData.discountType === 'percentage' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Discount (₹)</label>
                <input
                  type="number"
                  name="maxDiscount"
                  value={formData.maxDiscount}
                  onChange={handleChange}
                  placeholder="5000 (optional)"
                  step="1"
                  className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                />
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Optional cap on discount amount</p>
              </div>
            )}
          </div>
        </div>

        {/* Usage Limits */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Usage Limits</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimum Order Amount (₹)</label>
              <input
                type="number"
                name="minOrderAmount"
                value={formData.minOrderAmount}
                onChange={handleChange}
                placeholder="0"
                step="1"
                className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Uses Limit</label>
              <input
                type="number"
                name="maxUses"
                value={formData.maxUses}
                onChange={handleChange}
                placeholder="Leave empty for unlimited"
                step="1"
                className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Leave blank for unlimited</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Uses Per Customer</label>
              <input
                type="number"
                name="maxUsesPerCustomer"
                value={formData.maxUsesPerCustomer}
                onChange={handleChange}
                placeholder="1"
                min="1"
                step="1"
                className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Validity Period */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Validity Period</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Valid From *</label>
              <input
                type="date"
                name="validFrom"
                value={formData.validFrom}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all [&::-webkit-calendar-picker-indicator]:dark:invert"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Valid Until *</label>
              <input
                type="date"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all [&::-webkit-calendar-picker-indicator]:dark:invert"
              />
              {errors.validUntil && <p className="text-red-500 text-sm mt-1">{errors.validUntil}</p>}
            </div>
          </div>
        </div>

        {/* Applicable Items */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Applicable Items</h3>
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                name="applicableToAll"
                checked={formData.applicableToAll}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded transition-colors"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Apply to all products & services</span>
            </label>
          </div>

          {!formData.applicableToAll && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Products</label>
                <div className="space-y-2 max-h-48 overflow-y-auto bg-white/30 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-all">
                  {products.map(product => (
                    <label key={product._id} className="flex items-center gap-2 cursor-pointer group hover:bg-white/50 dark:hover:bg-gray-800/80 p-1.5 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        name="applicableProductIds"
                        value={product._id}
                        checked={formData.applicableProductIds.includes(product._id)}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded transition-colors"
                      />
                      <span className="text-gray-700 dark:text-gray-300 text-sm group-hover:text-gray-900 dark:group-hover:text-white">{product.title}</span>
                    </label>
                  ))}
                  {products.length === 0 && <p className="text-gray-500 dark:text-gray-400 text-sm italic">No products available</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Services</label>
                <div className="space-y-2 max-h-48 overflow-y-auto bg-white/30 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-all">
                  {services.map(service => (
                    <label key={service._id} className="flex items-center gap-2 cursor-pointer group hover:bg-white/50 dark:hover:bg-gray-800/80 p-1.5 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        name="applicableServiceIds"
                        value={service._id}
                        checked={formData.applicableServiceIds.includes(service._id)}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded transition-colors"
                      />
                      <span className="text-gray-700 dark:text-gray-300 text-sm group-hover:text-gray-900 dark:group-hover:text-white">{service.title}</span>
                    </label>
                  ))}
                  {services.length === 0 && <p className="text-gray-500 dark:text-gray-400 text-sm italic">No services available</p>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-6">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded transition-colors"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Active Status</span>
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <PremiumButton
            type="submit"
            disabled={isPending}
            label={isPending ? 'Saving...' : (coupon ? 'Update Coupon' : 'Create Coupon')}
          />
        </div>
      </form>
    </div>
  );
};

export default CouponForm;
