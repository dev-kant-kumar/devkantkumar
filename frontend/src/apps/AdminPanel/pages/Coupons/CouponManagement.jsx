import {
  Calendar,
  DollarSign,
  Edit2,
  Plus,
  Search,
  Trash2,
  Zap
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import PremiumButton from '../../common/components/PremiumButton';
import PremiumDropdown from '../../common/components/PremiumDropdown';
import { useDeleteCouponMutation, useGetCouponsQuery, useGetCouponStatsQuery } from '../../store/api/adminApiSlice';
import CouponForm from './CouponForm';
import CouponStats from './CouponStats';

const CouponManagement = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const token = localStorage.getItem('token');

  // Fetch coupons
  const { data: couponsData, isLoading, refetch } = useGetCouponsQuery({
    page,
    limit: 10,
    search: search || undefined,
    isActive: filterType !== 'all' ? filterType === 'active' : undefined
  });

  // Fetch stats
  const { data: stats } = useGetCouponStatsQuery();

  // Delete coupon
  const [deleteCoupon] = useDeleteCouponMutation();

  const handleEdit = useCallback((coupon) => {
    setEditingCoupon(coupon);
    setShowForm(true);
  }, []);

  const handleCreateNew = useCallback(() => {
    setEditingCoupon(null);
    setShowForm(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setShowForm(false);
    setEditingCoupon(null);
  }, []);

  const handleFormSuccess = useCallback(() => {
    refetch();
    handleFormClose();
  }, [refetch, handleFormClose]);

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleFormClose}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
          >
            ← Back to Coupons
          </button>
        </div>
        <CouponForm
          coupon={editingCoupon}
          onSuccess={handleFormSuccess}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Coupon Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Create and manage discount codes.
          </p>
        </div>
        <PremiumButton
          onClick={handleCreateNew}
          label="Create Coupon"
          icon={Plus}
          statsCount={stats?.totalCoupons?.[0]?.count}
          statsIcon={Zap}
        />
      </div>


      {/* Statistics */}
      {stats && <CouponStats stats={stats} />}

      {/* Search and Filter */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-2 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by code or description..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0"
          />
        </div>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden md:block" />

        <PremiumDropdown
          value={filterType}
          onChange={(val) => {
            setFilterType(val);
            setPage(1);
          }}
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
          ]}
          className="w-40"
          buttonClassName="px-4 py-2 bg-transparent text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 font-medium transition-colors"
        />
      </div>



      {/* Coupons Table */}
      <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden relative z-0">
        {isLoading ? (
          <div className="flex items-center justify-center p-12 text-gray-500 animate-pulse">
            <div className="flex flex-col items-center">
              <Zap className="text-blue-600 mb-4 animate-bounce" size={32} />
              Loading coupons...
            </div>
          </div>
        ) : couponsData?.coupons?.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
              <Plus size={32} className="text-blue-500 opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No coupons found</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              Create a new coupon to start offering discounts to your users.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50">
                  <tr>
                    <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Code</th>
                    <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Discount</th>
                    <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Valid</th>
                    <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Usage</th>
                    <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                    <th className="px-6 py-5 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  {couponsData?.coupons?.map((coupon) => (
                    <tr key={coupon._id} className="group hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md">
                          {coupon.code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
                          <DollarSign size={16} className="text-green-500" />
                          {coupon.discountType === 'percentage'
                            ? `${coupon.discountValue}%`
                            : `₹${coupon.discountValue}`
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="opacity-70" />
                          {new Date(coupon.validUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="text-gray-700 dark:text-gray-300">
                          {coupon.usedCount} / {coupon.maxUses || '∞'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          coupon.isActive
                            ? 'bg-green-50 text-green-700 border-green-200/50 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20'
                            : 'bg-red-50 text-red-700 border-red-200/50 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
                        }`}>
                          {coupon.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(coupon)}
                          className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          title="Edit coupon"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Are you sure you want to delete this coupon?')) {
                              try {
                                await deleteCoupon(coupon._id).unwrap();
                                toast.success('Coupon deleted successfully');
                              } catch (err) {
                                toast.error('Failed to delete coupon');
                              }
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Delete coupon"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {couponsData?.pagination && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-800/30">
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Page {couponsData.pagination.page} of {couponsData.pagination.pages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors shadow-sm"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= couponsData.pagination.pages}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors shadow-sm"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CouponManagement;
