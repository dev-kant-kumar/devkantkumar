import { motion } from "framer-motion";
import {
    Check,
    ChevronRight,
    Mail,
    MapPin,
    Phone,
    Shield,
    User,
} from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetCartQuery } from "../../../../store/cart/cartApi";
import { selectCountryCode } from "../../../../store/region/regionSlice";
import {
    runValidation,
    sanitize,
    validate,
} from "../../../../utils/formValidation";
import { formatCurrency } from "../../../../utils/price";
import {
    resetCheckout,
    selectCheckoutState,
    setErrors,
    setIsSubmitting,
    setStep,
    updateBillingInfo,
} from "../../store/checkout/checkoutSlice";
  updateBillingInfo,
import {
    selectCurrentUser,
    selectIsAuthenticated,
} from "../../store/auth/authSlice";
  selectIsAuthenticated,
} from "../../store/auth/authSlice";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const { step, billingInfo, errors, isSubmitting } =
    useSelector(selectCheckoutState);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/marketplace/auth/signin", {
        state: { from: "/marketplace/checkout" },
      });
      return;
    }

    if (cartItems.length === 0 && step !== 3) {
      navigate("/marketplace/cart");
    }
  }, [cartItems, navigate, step, isAuthenticated]);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    if (name === "email") sanitizedValue = sanitize.email(value);
    if (name === "phone") sanitizedValue = sanitize.phone(value);

    dispatch(updateBillingInfo({ [name]: sanitizedValue }));

    if (errors[name]) {
      dispatch(setErrors({ ...errors, [name]: null }));
    }
  };

  const validateBilling = () => {
    const newErrors = {};

    newErrors.firstName = validate.required(
      billingInfo.firstName,
      "First Name"
    );
    newErrors.lastName = validate.required(billingInfo.lastName, "Last Name");
    newErrors.email = runValidation(billingInfo.email, [
      (v) => validate.required(v, "Email"),
      validate.email,
    ]);
    newErrors.phone = runValidation(billingInfo.phone, [
      (v) => validate.required(v, "Phone"),
      validate.phone,
    ]);
    newErrors.address = validate.required(billingInfo.address, "Address");
    newErrors.city = validate.required(billingInfo.city, "City");
    newErrors.state = validate.required(billingInfo.state, "State");
    newErrors.zipCode = runValidation(billingInfo.zipCode, [
      (v) => validate.required(v, "ZIP Code"),
      validate.zipCode,
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
      handleRazorpayPayment();
    }
  };

  const handleRazorpayPayment = async () => {
    dispatch(setIsSubmitting(true));

    const res = await loadRazorpayScript();

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      dispatch(setIsSubmitting(false));
      return;
    }

    // 1. Create Order on Backend
    try {
      const orderRes = await fetch(
        `${API_URL}/marketplace/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            amount: total,
            currency: currency,
            items: cartItems.map((item) => ({
              itemType: item.type,
              product: item.type === "product" ? item.id : undefined,
              service: item.type === "service" ? item.id : undefined,
              itemId: item.id, // Fallback
              title: item.title,
              price: item.currentPrice || item.price,
              quantity: item.quantity,
            })),
            shippingAddress: billingInfo,
          }),
        }
      );

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(
          orderData.details ||
            orderData.message ||
            "Server error creating order"
        );
      }

      // 2. Open Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use ENV variable
        amount: orderData.amount,
        currency: orderData.currency,
        name: "DevKant Marketplace",
        description: "Digital Purchase",
        image: "https://your-logo-url", // Optional
        order_id: orderData.id,
        handler: async function (response) {
          // 3. Verify Payment
          try {
            const verifyRes = await fetch(
              `${API_URL}/marketplace/payment/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderId: orderData.orderId, // IMPORTANT: Send your internal order ID if you saved it
                }),
              }
            );

            const verifyData = await verifyRes.json();

            if (verifyRes.ok) {
              dispatch(setStep(3));
              dispatch(clearCart());
              window.scrollTo(0, 0);
              toast.success("Payment Successful!");
            } else {
              toast.error(verifyData.message || "Payment verification failed");
            }
          } catch (verifyErr) {
            console.error(verifyErr);
            toast.error("Payment verification failed on server");
          }
        },
        prefill: {
          name: `${billingInfo.firstName} ${billingInfo.lastName}`,
          email: billingInfo.email,
          contact: billingInfo.phone,
        },
        theme: {
          color: "#2563EB",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      dispatch(setIsSubmitting(false)); // Modal opened, stop loader
    } catch (err) {
      console.error(err);
      toast.error("Failed to initiate payment: " + err.message);
      dispatch(setIsSubmitting(false));
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. We've sent a confirmation email to{" "}
            {billingInfo.email}.
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
            <div
              className={`flex items-center ${
                step >= 1 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 1 ? "border-blue-600 bg-blue-50" : "border-gray-300"
                } font-bold mr-2`}
              >
                1
              </div>
              <span className="font-medium">Billing</span>
            </div>
            <div
              className={`w-16 h-0.5 ${
                step >= 2 ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`flex items-center ${
                step >= 2 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 2 ? "border-blue-600 bg-blue-50" : "border-gray-300"
                } font-bold mr-2`}
              >
                2
              </div>
              <span className="font-medium">Payment</span>
            </div>
            <div
              className={`w-16 h-0.5 ${
                step >= 3 ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`flex items-center ${
                step >= 3 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 3 ? "border-blue-600 bg-blue-50" : "border-gray-300"
                } font-bold mr-2`}
              >
                3
              </div>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Billing Information
                  </h2>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Payment Method
                  </h2>
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-8">
                    <div className="flex items-center mb-4">
                      <Shield className="text-blue-600 h-8 w-8 mr-3" />
                      <div>
                        <h4 className="font-bold text-xl text-blue-900">
                          Secure Payment with Razorpay
                        </h4>
                        <p className="text-blue-700 mt-1">
                          Pay securely using Credit Card, Debit Card, UPI, or
                          Net Banking.
                        </p>
                      </div>
                    </div>
                    <ul className="text-sm text-blue-800 list-disc list-inside space-y-1 ml-2">
                      <li>SSL Encrypted Transaction</li>
                      <li>Supports all major Indian banks</li>
                      <li>International cards accepted</li>
                      <li>Instant Confirmation</li>
                    </ul>
                  </div>
                  <p className="text-gray-600 text-center mb-4">
                    Click "Pay Now" to open the secure payment gateway.
                  </p>
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
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting
                    ? "Processing..."
                    : step === 2
                    ? "Pay Now"
                    : "Continue"}
                  {!isSubmitting && <ChevronRight className="ml-2 h-5 w-5" />}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h3>
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item._id || item.id} className="flex space-x-4">
                    <img
                      src={
                        item.product?.images?.[0]?.url ||
                        item.service?.image ||
                        item.image ||
                        "https://via.placeholder.com/150"
                      }
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 line-clamp-2">
                        {item.title}
                      </h4>
                      {item.packageName && (
                        <p className="text-xs text-blue-600 font-medium">
                          Package: {item.packageName}
                        </p>
                      )}
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-bold text-gray-900">
                          {formatCurrency(
                            (item.currentPrice || item.price) * item.quantity,
                            currency
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total / 1.08, currency)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>{formatCurrency(total - total / 1.08, currency)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(total, currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  icon: Icon,
  iconElement,
  rightElement,
  maxLength,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-4 py-3 rounded-lg border ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        } focus:border-transparent focus:ring-2 outline-none transition-all pl-10 ${
          rightElement ? "pr-10" : ""
        }`}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-5 h-5">
        {iconElement
          ? iconElement
          : Icon && <Icon className="text-gray-400 h-5 w-5" />}
      </div>
      {rightElement}
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default Checkout;
