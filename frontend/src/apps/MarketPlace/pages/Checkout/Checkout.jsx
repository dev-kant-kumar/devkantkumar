import { motion } from 'framer-motion';
import { Calendar, Check, ChevronRight, CreditCard, Eye, EyeOff, Lock, Mail, MapPin, Phone, Shield, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { formatExpiryDate, getCardType, runValidation, sanitize, validate } from '../../../../utils/formValidation';
import { clearCart, selectCartItems, selectCartTotal } from '../../store/cart/cartSlice';
import {
    resetCheckout,
    selectCheckoutState,
    setErrors,
    setIsSubmitting,
    setStep,
    updateBillingInfo,
    updatePaymentInfo
} from '../../store/checkout/checkoutSlice';

import { selectIsAuthenticated } from '../../store/auth/authSlice';

// ... imports

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { step, billingInfo, paymentInfo, errors, isSubmitting } = useSelector(selectCheckoutState);
  const [showCVV, setShowCVV] = useState(false);
  const [cardType, setCardType] = useState('unknown');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/marketplace/auth/signin', { state: { from: '/marketplace/checkout' } });
      return;
    }

    if (cartItems.length === 0 && step !== 3) {
      navigate('/marketplace/cart');
    }
  }, [cartItems, navigate, step, isAuthenticated]);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    // Sanitize input based on field type
    let sanitizedValue = value;
    if (name === 'email') sanitizedValue = sanitize.email(value);
    if (name === 'phone') sanitizedValue = sanitize.phone(value);

    dispatch(updateBillingInfo({ [name]: sanitizedValue }));

    // Clear error when user types
    if (errors[name]) {
      dispatch(setErrors({ ...errors, [name]: null }));
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    if (name === 'cardNumber') {
      sanitizedValue = sanitize.digitsOnly(value);
      setCardType(getCardType(sanitizedValue));
    } else if (name === 'cvv') {
      sanitizedValue = sanitize.digitsOnly(value);
    } else if (name === 'expiryDate') {
      sanitizedValue = formatExpiryDate(value);
    } else if (name === 'cardName') {
      sanitizedValue = sanitize.cardName(value);
    }

    dispatch(updatePaymentInfo({ [name]: sanitizedValue }));

    if (errors[name]) {
      dispatch(setErrors({ ...errors, [name]: null }));
    }
  };

  const validateBilling = () => {
    const newErrors = {};

    newErrors.firstName = validate.required(billingInfo.firstName, 'First Name');
    newErrors.lastName = validate.required(billingInfo.lastName, 'Last Name');
    newErrors.email = runValidation(billingInfo.email, [
      (v) => validate.required(v, 'Email'),
      validate.email
    ]);
    newErrors.phone = runValidation(billingInfo.phone, [
      (v) => validate.required(v, 'Phone'),
      validate.phone
    ]);
    newErrors.address = validate.required(billingInfo.address, 'Address');
    newErrors.city = validate.required(billingInfo.city, 'City');
    newErrors.state = validate.required(billingInfo.state, 'State');
    newErrors.zipCode = runValidation(billingInfo.zipCode, [
      (v) => validate.required(v, 'ZIP Code'),
      validate.zipCode
    ]);

    // Filter out nulls
    const activeErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, v]) => v != null)
    );

    dispatch(setErrors(activeErrors));
    return Object.keys(activeErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};

    newErrors.cardName = runValidation(paymentInfo.cardName, [
      (v) => validate.required(v, 'Name on Card'),
      (v) => validate.name(v, 'Name on Card')
    ]);
    newErrors.cardNumber = runValidation(paymentInfo.cardNumber, [
      (v) => validate.required(v, 'Card Number'),
      (v) => validate.match(v.length, 16, 'Card Number must be 16 digits')
    ]);
    newErrors.expiryDate = runValidation(paymentInfo.expiryDate, [
      (v) => validate.required(v, 'Expiry Date'),
      (v) => validate.match(v.length, 5, 'Expiry Date must be MM/YY')
    ]);
    newErrors.cvv = runValidation(paymentInfo.cvv, [
      (v) => validate.required(v, 'CVV'),
      (v) => validate.minLength(v, 3, 'CVV'),
      (v) => validate.maxLength(v, 4, 'CVV')
    ]);

    const activeErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, v]) => v != null)
    );

    dispatch(setErrors(activeErrors));
    return Object.keys(activeErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateBilling()) {
        dispatch(setStep(2));
        window.scrollTo(0, 0);
      }
    } else if (step === 2) {
      if (validatePayment()) {
        handleSubmitOrder();
      }
    }
  };

  const handleSubmitOrder = async () => {
    dispatch(setIsSubmitting(true));

    // Simulate API call
    setTimeout(() => {
      dispatch(setIsSubmitting(false));
      dispatch(setStep(3));
      dispatch(clearCart());
      window.scrollTo(0, 0);
    }, 2000);
  };

  const getCardIcon = () => {
    switch (cardType) {
      case 'visa': return <span className="font-bold text-blue-600 text-xs">VISA</span>;
      case 'mastercard': return <span className="font-bold text-red-600 text-xs">MC</span>;
      case 'amex': return <span className="font-bold text-blue-400 text-xs">AMEX</span>;
      case 'discover': return <span className="font-bold text-orange-500 text-xs">DISC</span>;
      default: return <CreditCard className="h-5 w-5 text-gray-400" />;
    }
  };



  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. We've sent a confirmation email to {billingInfo.email}.
          </p>
          <div className="space-y-3">
            <Link
              to="/marketplace"
              onClick={() => dispatch(resetCheckout())}
              className="block w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/marketplace/dashboard"
              onClick={() => dispatch(resetCheckout())}
              className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'} font-bold mr-2`}>1</div>
              <span className="font-medium">Billing</span>
            </div>
            <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'} font-bold mr-2`}>2</div>
              <span className="font-medium">Payment</span>
            </div>
            <div className={`w-16 h-0.5 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'} font-bold mr-2`}>3</div>
              <span className="font-medium">Done</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="First Name"
                      name="firstName"
                      value={billingInfo.firstName}
                      onChange={handleBillingChange}
                      error={errors.firstName}
                      icon={User}
                    />
                    <InputField
                      label="Last Name"
                      name="lastName"
                      value={billingInfo.lastName}
                      onChange={handleBillingChange}
                      error={errors.lastName}
                      icon={User}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={billingInfo.email}
                      onChange={handleBillingChange}
                      error={errors.email}
                      icon={Mail}
                    />
                    <InputField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={billingInfo.phone}
                      onChange={handleBillingChange}
                      error={errors.phone}
                      icon={Phone}
                    />
                  </div>
                  <InputField
                    label="Address"
                    name="address"
                    value={billingInfo.address}
                    onChange={handleBillingChange}
                    error={errors.address}
                    icon={MapPin}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                      label="City"
                      name="city"
                      value={billingInfo.city}
                      onChange={handleBillingChange}
                      error={errors.city}
                      icon={MapPin}
                    />
                    <InputField
                      label="State"
                      name="state"
                      value={billingInfo.state}
                      onChange={handleBillingChange}
                      error={errors.state}
                      icon={MapPin}
                    />
                    <InputField
                      label="ZIP Code"
                      name="zipCode"
                      value={billingInfo.zipCode}
                      onChange={handleBillingChange}
                      error={errors.zipCode}
                      icon={MapPin}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
                  <div className="bg-blue-50 p-4 rounded-xl mb-6 flex items-start">
                    <Shield className="text-blue-600 h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-900">Secure Payment</h4>
                      <p className="text-sm text-blue-700">Your payment information is encrypted and secure.</p>
                    </div>
                  </div>

                  <InputField
                    label="Name on Card"
                    name="cardName"
                    value={paymentInfo.cardName}
                    onChange={handlePaymentChange}
                    error={errors.cardName}
                    icon={User}
                  />
                  <InputField
                    label="Card Number"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentChange}
                    error={errors.cardNumber}
                    placeholder="0000 0000 0000 0000"
                    iconElement={getCardIcon()}
                    maxLength={16}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Expiry Date"
                      name="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentChange}
                      error={errors.expiryDate}
                      placeholder="MM/YY"
                      icon={Calendar}
                      maxLength={5}
                    />
                    <InputField
                      label="CVV"
                      name="cvv"
                      type={showCVV ? "text" : "password"}
                      value={paymentInfo.cvv}
                      onChange={handlePaymentChange}
                      error={errors.cvv}
                      placeholder="123"
                      icon={Lock}
                      maxLength={4}
                      rightElement={
                        <button
                          type="button"
                          onClick={() => setShowCVV(!showCVV)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCVV ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      }
                    />
                  </div>
                </div>
              )}
              <div className="mt-8 flex justify-between">
                {step === 2 && (
                  <button
                    onClick={() => dispatch(setStep(1))}
                    className="px-6 py-3 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                  className={`ml-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Processing...' : step === 2 ? 'Pay Now' : 'Continue'}
                  {!isSubmitting && <ChevronRight className="ml-2 h-5 w-5" />}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.type}`} className="flex items-center space-x-4">
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${(total / 1.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${(total - (total / 1.08)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, error, type = "text", placeholder, icon: Icon, iconElement, rightElement, maxLength }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
        } focus:border-transparent focus:ring-2 outline-none transition-all pl-10 ${rightElement ? 'pr-10' : ''}`}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-5 h-5">
        {iconElement ? iconElement : (Icon && <Icon className="text-gray-400 h-5 w-5" />)}
      </div>
      {rightElement}
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default Checkout;
