import { motion } from "framer-motion";
import { ArrowRight, Minus, Package, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    useGetCartQuery,
    useRemoveFromCartMutation,
    useUpdateCartItemMutation,
} from "../../../../store/cart/cartApi";
import { useCurrency } from "../../context/CurrencyContext";
import { selectIsAuthenticated } from "../../store/auth/authSlice";
import { removeFromCart as removeFromLocalCart, selectCartItems, updateQuantity } from "../../store/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Use backend cart for authenticated users, local cart for unauthenticated
  const { data: backendCartData, isLoading: isLoadingBackend } = useGetCartQuery(undefined, {
    skip: !isAuthenticated, // Skip API call if not authenticated
  });
  const localCartItems = useSelector(selectCartItems);

  // Determine which cart to use
  const cartItems = isAuthenticated ? (backendCartData?.cart?.items || []) : localCartItems;
  const isLoading = isAuthenticated ? isLoadingBackend : false;

  // Backend cart mutations (only for authenticated users)
  const [updateCartItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
  const [removeFromCartApi, { isLoading: isRemoving }] = useRemoveFromCartMutation();

  const { getFinalPrice, surchargeRate } = useCurrency();

  const getCartItemPrice = (item) => {
      const displayItem = item.product || item.service;

      // For local cart (unauthenticated), price is stored directly on item
      // For backend cart (authenticated), price is on displayItem (item.product or item.service)

      if ((item.type === 'service' || item.itemType === 'service')) {
           // Check local cart item price first
           if (item.price !== undefined && item.price !== null) {
               return item.price;
           }
           // Backend cart - get from service packages
           if (displayItem) {
                if ((item.package || item.packageName) && displayItem.packages) {
                     const pkgName = item.package || item.packageName;
                     const pkg = displayItem.packages.find(p => p.name === pkgName);
                     if (pkg) return pkg.price;
                }
                return displayItem.startingPrice || 0;
           }
           return 0;
      } else {
          // For products:
          // 1. Check item.price (local cart stores price directly)
          // 2. Check displayItem.price (backend cart has price on populated product)
          if (item.price !== undefined && item.price !== null) {
              return item.price;
          }
          return displayItem?.price || 0;
      }
  };

  // Calculate totals
  const calculateTotals = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      const price = getCartItemPrice(item);
      subtotal += price * item.quantity;
    });

    // Calculate surcharge as exact percentage
    const surchargeAmount = subtotal * (surchargeRate / 100);
    // Total = subtotal + surcharge (no rounding, show exact values)
    const total = subtotal + surchargeAmount;

    return { subtotal, surchargeAmount, total };
  };

  const { subtotal, surchargeAmount, total } = calculateTotals();

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) return;

    if (isAuthenticated) {
      // Backend cart
      try {
        await updateCartItem({ itemId: item._id, quantity: newQuantity }).unwrap();
      } catch (error) {
        console.error("Failed to update quantity:", error);
        toast.error(error?.data?.message || "Failed to update quantity");
      }
    } else {
      // Local cart
      dispatch(updateQuantity({ id: item.id, itemType: item.itemType, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = async (item) => {
    if (isAuthenticated) {
      // Backend cart
      try {
        await removeFromCartApi(item._id).unwrap();
        toast.success("Item removed from cart");
      } catch (error) {
        console.error("Failed to remove item:", error);
        toast.error("Failed to remove item");
      }
    } else {
      // Local cart
      dispatch(removeFromLocalCart({ id: item.id, itemType: item.itemType }));
      toast.success("Item removed from cart");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} items in your cart
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl shadow-sm p-10"
          >
            {/* Animated Shopping Bag */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="relative mb-8 inline-block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 scale-150"></div>
              <div className="relative w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl mx-auto">
                <ShoppingBag className="h-14 w-14 text-white" strokeWidth={1.5} />
              </div>
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-gray-900"
              >
                0
              </motion.div>
            </motion.div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
              Looks like you haven't added anything to your cart yet. Start exploring our products and services!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/marketplace/products"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center"
              >
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/marketplace/services"
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md">
                {cartItems.map((item, index) => {
                  const displayItem = item.product || item.service;

                  // Handle different image structures
                  // For local cart (unauthenticated): item.image is set directly
                  // For backend cart (authenticated): displayItem.images[0].url or displayItem.image
                  const imageUrl =
                    item.image ||  // Local cart has image directly on item
                    displayItem?.images?.[0]?.url ||  // Backend product structure
                    displayItem?.image;  // Backend service structure

                  // For local cart, use item data directly; for backend cart, use displayItem
                  const title = item.title || displayItem?.title || "Unknown Item";
                  const category = item.category || displayItem?.category || (item.itemType === "service" ? "Service" : "Product");

                  return (
                    <motion.div
                      key={item._id || item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                        {/* Product Image & Info */}
                        <div className="flex items-start flex-1 gap-4 min-w-0">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={title}
                              className="w-20 h-20 flex-shrink-0 object-cover rounded-lg bg-gray-100"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center ${imageUrl ? 'hidden' : 'flex'}`}
                          >
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start gap-1 sm:gap-2 mb-1">
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                                {title}
                              </h3>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase whitespace-nowrap w-fit flex-shrink-0 ${
                                (item.itemType || item.type) === 'service'
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {(item.itemType || item.type) === 'service' ? 'Service' : 'Product'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-1 truncate">
                              {category}
                            </p>
                            {(item.package || item.packageName) && (
                              <p className="text-xs text-purple-600 font-medium mb-1">
                                📦 Package: {item.package || item.packageName}
                              </p>
                            )}
                            <div className="mt-1">
                                {(() => {
                                    const price = getCartItemPrice(item);
                                    // Show base price without surcharge (surcharge is added in Order Summary)
                                    return (
                                        <span className="text-lg font-bold text-gray-900">
                                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price)}
                                        </span>
                                    );
                                })()}
                            </div>
                          </div>
                        </div>

                        {/* Actions (Quantity & Remove) */}
                        <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-none border-gray-100 flex-shrink-0">
                          <div className="flex items-center border border-gray-300 rounded-lg ml-auto sm:ml-0">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1 || isUpdating}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50 text-gray-600 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 border-x border-gray-300 font-medium text-gray-900 min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item,
                                  item.quantity + 1
                                )
                              }
                              disabled={isUpdating}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50 text-gray-600 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item)}
                            disabled={isRemoving}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-md p-6 sticky top-24"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">

                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                       {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Surcharge ({surchargeRate}%)</span>
                    <span className="font-medium text-gray-900">
                       {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(surchargeAmount)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/marketplace/checkout"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center mb-4 shadow-lg shadow-blue-200"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  to="/marketplace/products"
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
