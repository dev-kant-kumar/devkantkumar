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
import RecommendationSection from "../../common/components/RecommendationSection";

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
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Shopping Cart</h1>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
          </div>
        ) : cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-12 shadow-xs border border-slate-200/80 text-center max-w-xl mx-auto"
          >
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-xs mx-auto mb-6">
              <ShoppingBag className="h-10 w-10" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-600 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Explore our marketplace for premium website templates, BCA/MCA study notes, and developer services.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/marketplace/products"
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-500/20 hover:from-emerald-600 hover:to-green-700 transition-all inline-flex items-center justify-center"
              >
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/marketplace/services"
                className="px-6 py-3 bg-white border border-gray-300 text-slate-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
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
            </div>            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sticky top-24"
              >
                <h2 className="text-xl font-extrabold text-slate-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3.5 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-semibold text-slate-900">
                       {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Surcharge ({surchargeRate}%)</span>
                    <span className="font-semibold text-slate-900">
                       {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(surchargeAmount)}
                    </span>
                  </div>
                  <div className="border-t border-slate-100 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-slate-900">
                        Total
                      </span>
                      <span className="text-2xl font-extrabold text-emerald-600">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/marketplace/checkout"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center mb-3 cursor-pointer"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  to="/marketplace/products"
                  className="w-full border border-gray-200 text-slate-700 py-3 px-4 rounded-xl font-semibold text-xs hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* You may also like – shown on both empty and filled cart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <RecommendationSection mode="trending" type="products" limit={6} />
      </div>
    </div>
  );
};

export default Cart;
