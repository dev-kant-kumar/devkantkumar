import { Check, Loader, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useValidateCouponMutation } from '../../store/api/marketplaceApi';
import { selectCurrentToken } from '../../store/auth/authSlice';

const CouponInput = ({ subtotal, onCouponApplied, onCouponRemoved, disabled = false }) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const token = useSelector(selectCurrentToken);

  const [validateCoupon, { isLoading: isValidating }] = useValidateCouponMutation();

  const handleApply = async (e) => {
    e.preventDefault();

    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    try {
      const data = await validateCoupon({
        code: couponCode.trim(),
        orderTotal: subtotal
      }).unwrap();

      setAppliedCoupon(data.coupon);
      onCouponApplied(data.coupon);
      toast.success('Coupon applied successfully!');
    } catch (error) {
      toast.error(error?.data?.message || error.message || 'Invalid coupon code');
    }
  };

  const handleRemove = () => {
    setCouponCode('');
    setAppliedCoupon(null);
    onCouponRemoved();
    toast.success('Coupon removed');
  };

  if (appliedCoupon) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Check className="text-green-600 mt-1" size={20} />
            <div>
              <p className="font-semibold text-green-900">Coupon Applied</p>
              <p className="text-sm text-green-700 mt-1">
                <span className="font-bold">{appliedCoupon.code}</span>
                {appliedCoupon.description && ` - ${appliedCoupon.description}`}
              </p>
              <p className="text-sm text-green-700 mt-2">
                Discount: <span className="font-bold">
                  {appliedCoupon.discountType === 'percentage'
                    ? `${appliedCoupon.discountValue}%`
                    : `₹${appliedCoupon.discountAmount}`
                  }
                </span>
                <span className="ml-4">
                  Saves: <span className="font-bold text-green-600">₹{appliedCoupon.discountAmount}</span>
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="text-green-600 hover:text-green-700 mt-1"
            title="Remove coupon"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleApply} className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative group">
          <input
            type="text"
            placeholder="Coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            disabled={disabled || isValidating}
            className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all font-bold tracking-widest text-gray-900 placeholder:text-gray-400 placeholder:font-normal placeholder:tracking-normal"
          />
        </div>
        <button
          type="submit"
          disabled={disabled || isValidating || !couponCode.trim()}
          className="px-6 py-3.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 active:scale-95"
        >
          {isValidating ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            'Apply'
          )}
        </button>
      </div>
      <div className="flex items-center gap-2 px-1">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50" />
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">exclusive offer</p>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50" />
      </div>
    </form>
  );
};

export default CouponInput;
