import { motion } from "framer-motion";
import {
    Check,
    ChevronRight,
    Mail,
    MapPin,
    Package,
    Phone,
    Shield,
    User
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PriceDisplay from "../../../../components/common/PriceDisplay";
import {
    runValidation,
    sanitize,
    validate,
} from "../../../../utils/formValidation";
import { useCurrency } from "../../context/CurrencyContext";
import {
    logout,
    selectCurrentToken,
    selectCurrentUser,
    selectIsAuthenticated,
} from "../../store/auth/authSlice";
import { clearCart, selectCartItems } from "../../store/cart/cartSlice";
import {
    resetCheckout,
    selectCheckoutState,
    setErrors,
    setIsSubmitting,
    setStep,
    updateBillingInfo,
} from "../../store/checkout/checkoutSlice";
import CouponInput from "./CouponInput";

import { API_URL } from "../../../../config/api";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

import { useGetCartQuery } from "../../../../store/cart/cartApi";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localCartItems = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Fetch backend cart if authenticated
  const { data: cartData, isLoading: isLoadingCart, error: cartError } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
    // Refetch on mount to ensure freshness
    refetchOnMountOrArgChange: true
  });

  // Determine which cart items to use
  // Determine which cart items to use
  const cartItems = isAuthenticated ? (cartData?.cart?.items || []) : localCartItems;

  // We ignore selectCartTotal as it is in base currency. We recalculate.
  const { getFinalPrice, currency: currentCurrency, surchargeRate, countryCode: detectedCountryCode } = useCurrency();

  const getCartItemPrice = (item) => {
      const displayItem = item.product || item.service;
      if (!displayItem) return 0;

      let basePrice = 0;

      if (item.type === 'service') {
           if (item.package && displayItem.packages) {
                const pkg = displayItem.packages.find(p => p.name === item.package);
                if (pkg) basePrice = pkg.price;
           } else {
               // Fallback
               basePrice = displayItem.startingPrice || 0;
           }
      } else {
          basePrice = displayItem.price;
      }
      return basePrice;
  };

  // Calculate totals
  const calculateTotals = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      const price = getCartItemPrice(item);
      subtotal += price * item.quantity;
    });

    // Apply surcharge using the helper from context which handles the math
    const totalWithSurcharge = getFinalPrice(subtotal);

    // Surcharge Amount for display
    const surchargeAmount = totalWithSurcharge - subtotal;

    // Apply coupon discount if exist
    let discountAmount = 0;
    if (appliedCoupon?.discountAmount) {
      discountAmount = appliedCoupon.discountAmount;
    }

    // Final total after discount
    const total = totalWithSurcharge - discountAmount;

    return { subtotal, surchargeAmount, discountAmount, total };
  };

  const { subtotal, surchargeAmount, discountAmount, total } = calculateTotals();
  // Legacy mappings for existing code
  const summaryCurrency = 'INR';
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const { step, billingInfo, errors, isSubmitting } =
    useSelector(selectCheckoutState);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/marketplace/auth/signin", {
        state: { from: "/marketplace/checkout" },
      });
      return;
    }

    // Wait for cart load before redirecting empty cart
    // Don't redirect if there's an error (user might retry) or if still loading
    if (!isLoadingCart && !cartError && cartItems.length === 0 && step !== 3) {
      navigate("/marketplace/cart");
    }
  }, [cartItems, navigate, step, isAuthenticated, isLoadingCart, cartError]);

  // Auto-fill form from user profile
  useEffect(() => {
    if (user) {
      const defaultAddress =
        user.addresses?.find((addr) => addr.isDefault) || user.addresses?.[0];

      const prefillData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || user.profile?.phone || "",
        address: defaultAddress?.street || "",
        city: defaultAddress?.city || "",
        state: defaultAddress?.state || "",
        zipCode: defaultAddress?.zipCode || "",
        country: defaultAddress?.country || "",
      };

      const dataToUpdate = {};

      if (!billingInfo.firstName && prefillData.firstName)
        dataToUpdate.firstName = prefillData.firstName;
      if (!billingInfo.lastName && prefillData.lastName)
        dataToUpdate.lastName = prefillData.lastName;
      if (!billingInfo.email && prefillData.email)
        dataToUpdate.email = prefillData.email;
      if (!billingInfo.phone && prefillData.phone)
        dataToUpdate.phone = prefillData.phone;
      if (!billingInfo.address && prefillData.address)
        dataToUpdate.address = prefillData.address;
      if (!billingInfo.city && prefillData.city)
        dataToUpdate.city = prefillData.city;
      if (!billingInfo.state && prefillData.state)
        dataToUpdate.state = prefillData.state;
      if (!billingInfo.zipCode && prefillData.zipCode)
        dataToUpdate.zipCode = prefillData.zipCode;
      if (!billingInfo.country && prefillData.country)
        dataToUpdate.country = prefillData.country;

      if (Object.keys(dataToUpdate).length > 0) {
        dispatch(updateBillingInfo(dataToUpdate));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch]);

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
    newErrors.country = validate.required(billingInfo.country, "Country");

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
            Authorization: `Bearer ${token}`,
            "x-country-code": detectedCountryCode || "INR",
          },
          body: JSON.stringify({
            amount: total,
            currency: summaryCurrency,
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
            couponCode: appliedCoupon?.code || undefined,
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
        name: "Dev Kant Kumar Marketplace",
        description: "Digital Purchase",
        image: "https://avatars.githubusercontent.com/u/101362859?v=4",
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
                  Authorization: `Bearer ${token}`,
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
      const errorMessage = err.message || "Unknown error";

      if (
        errorMessage.includes("Invalid token") ||
        errorMessage.includes("Access denied") ||
        errorMessage.includes("jwt malformed")
      ) {
        toast.error("Session expired. Please log in again.");
        dispatch(logout());
        navigate("/marketplace/auth/signin", {
          state: { from: "/marketplace/checkout" },
        });
      } else {
        toast.error("Failed to initiate payment: " + errorMessage);
      }
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
                      placeholder="Enter your first name"
                    />
                    <InputField
                      label="Last Name"
                      name="lastName"
                      value={billingInfo.lastName}
                      onChange={handleBillingChange}
                      error={errors.lastName}
                      icon={User}
                      placeholder="Enter your last name"
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
                      placeholder="you@example.com"
                    />
                    <InputField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={billingInfo.phone}
                      onChange={handleBillingChange}
                      error={errors.phone}
                      icon={Phone}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <InputField
                    label="Address"
                    name="address"
                    value={billingInfo.address}
                    onChange={handleBillingChange}
                    error={errors.address}
                    icon={MapPin}
                    placeholder="123 Main St, Apt 4B"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="City"
                      name="city"
                      value={billingInfo.city}
                      onChange={handleBillingChange}
                      error={errors.city}
                      icon={MapPin}
                      placeholder="Mumbai"
                    />
                    <InputField
                      label="State"
                      name="state"
                      value={billingInfo.state}
                      onChange={handleBillingChange}
                      error={errors.state}
                      icon={MapPin}
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="ZIP Code"
                      name="zipCode"
                      value={billingInfo.zipCode}
                      onChange={handleBillingChange}
                      error={errors.zipCode}
                      icon={MapPin}
                      placeholder="400001"
                    />
                     <InputField
                      label="Country"
                      name="country"
                      value={billingInfo.country}
                      onChange={handleBillingChange}
                      error={errors.country}
                      icon={MapPin}
                      placeholder="India"
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
                    className="px-6 py-3 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                  className={`ml-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center cursor-pointer ${
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
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-blue-900/5 border border-white/50 p-8 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Package className="text-blue-600" size={24} />
                Order Summary
              </h3>

              <div className="space-y-6 mb-8 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {cartItems.map((item) => (
                  <div key={item._id || item.id} className="flex gap-4 group">
                    <div className="relative shrink-0">
                      {(() => {
                        const imageUrl = item.product?.images?.[0]?.url || item.service?.image || item.image;
                        if (imageUrl) {
                          return (
                            <img
                              src={imageUrl}
                              alt={item.title}
                              className="w-20 h-20 object-cover rounded-2xl shadow-sm border border-gray-100"
                            />
                          );
                        }
                        return (
                          <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                            <Package className="w-10 h-10 text-gray-300" />
                          </div>
                        );
                      })()}
                    </div>

                    <div className="flex-1 min-w-0 py-1">
                      <div className="flex flex-col gap-1">
                        <span className={`w-fit px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.itemType === 'service'
                            ? 'bg-purple-50 text-purple-600 border border-purple-100'
                            : 'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                          {item.itemType === 'service' ? 'Service' : 'Product'}
                        </span>
                        <h4 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-gray-500 font-medium">
                            Qty: <span className="text-gray-900">{item.quantity}</span>
                          </span>
                          <div className="font-bold text-gray-900">
                            {(() => {
                              const priceData = getCartItemPrice(item);
                              return (
                                <PriceDisplay price={priceData * item.quantity} className="text-right" textClass="text-gray-900" />
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Separator */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8 opacity-50" />

              {/* Coupon Input Section */}
              <div className="mb-8">
                <CouponInput
                  subtotal={subtotal + surchargeAmount}
                  onCouponApplied={(couponData) => {
                    setAppliedCoupon(couponData);
                    toast.success(`Coupon ${couponData.code} applied! You saved ₹${couponData.discountAmount.toFixed(2)}`);
                  }}
                  onCouponRemoved={() => {
                    setAppliedCoupon(null);
                    toast.success("Coupon removed");
                  }}
                />
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium flex items-center gap-1.5">
                      Surcharge
                      <span className="px-1.5 py-0.5 bg-gray-100 text-[10px] rounded leading-none text-gray-600 font-bold">{surchargeRate}%</span>
                    </span>
                    <span className="font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(surchargeAmount)}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center text-sm animate-in fade-in slide-in-from-top-2">
                      <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                        <Check size={14} />
                        Discount
                        <span className="px-1.5 py-0.5 bg-emerald-50 text-[10px] rounded leading-none text-emerald-600 font-extrabold">{appliedCoupon?.code}</span>
                      </span>
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                        -{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(discountAmount)}
                      </span>
                    </div>
                  )}

                  {/* Total Separator - Refined Hairline instead of border-t */}
                  <div className="pt-6 mt-8 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1.5px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-extrabold text-gray-900">
                        Total
                      </span>
                      <div className="text-right">
                        <span className="text-3xl font-black text-blue-600 tracking-tight">
                          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total)}
                        </span>
                        {currentCurrency !== 'INR' && (
                          <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-wider">
                            (~{new Intl.NumberFormat('en-US', { style: 'currency', currency: currentCurrency }).format(total * 0.012)})
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {currentCurrency !== "INR" && (
                    <div className="mt-6 p-4 bg-gray-50/80 rounded-2xl border border-gray-100/50 flex flex-col gap-2">
                       <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                          <strong className="text-gray-700 uppercase tracking-tighter mr-1">Note:</strong>
                          Transactions are processed in <span className="text-blue-600 font-bold">INR</span>. Your financial institution will determine the final conversion rate.
                       </p>
                    </div>
                  )}
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
