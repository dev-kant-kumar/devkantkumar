import { motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 ,Package } from "lucide-react";
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

  const { getPrice, formatPrice, currency: currentCurrency } = useCurrency();

  const getCartItemPrice = (item) => {
      const displayItem = item.product || item.service;
      if (!displayItem) return { amount: 0, currency: currentCurrency };

      if (item.type === 'service') {
           if (item.package && displayItem.packages) {
                const pkg = displayItem.packages.find(p => p.name === item.package);
                if (pkg) return getPrice(pkg);
           }
           // Fallback: Use startingPrice if package not found
           return getPrice({ ...displayItem, price: displayItem.startingPrice || 0 });
      }
      return getPrice(displayItem);
  };

  // Calculate totals with regional pricing and determine consistent currency
  const calculateTotals = () => {
    let total = 0;
    // Default to first item's currency or currentCurrency if empty
    let usedCurrency = currentCurrency;
    let currencySet = false;

    cartItems.forEach((item) => {
      const displayItem = item.product || item.service;
      if (displayItem) {
          const { amount, currency } = getCartItemPrice(item);
          total += amount * item.quantity;

          // Capture the currency from the first valid item to ensure consistency
          if (!currencySet && amount > 0) {
              usedCurrency = currency;
              currencySet = true;
          }
      }
    });
    return { total, currency: usedCurrency };
  };

  const { total: subtotal, currency: summaryCurrency } = calculateTotals();
  const tax = subtotal * 0.08; // Assuming 8% tax
  const total = subtotal + tax;

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
            className="text-center py-16"
          >
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Start shopping to add items to your cart
            </p>
            <Link
              to="/marketplace/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
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
                      <div className="flex items-center space-x-4">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={title}
                            className="w-20 h-20 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center ${imageUrl ? 'hidden' : 'flex'}`}
                        >
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {title}
                            </h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                              (item.itemType || item.type) === 'service'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {(item.itemType || item.type) === 'service' ? 'Service' : 'Product'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-1">
                            {category}
                          </p>
                          {(item.package || item.packageName) && (
                            <p className="text-xs text-purple-600 font-medium mb-2">
                              📦 Package: {item.package || item.packageName}
                            </p>
                          )}
                          <div className="flex items-center mt-2">
                            <span className="text-xl font-bold text-blue-600">
                              {(() => {
                                const priceData = getCartItemPrice(item);
                                return formatPrice(priceData.amount, priceData.currency);
                              })()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1 || isUpdating}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 border-x border-gray-300 pointer-events-none">
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
                              className="p-2 hover:bg-gray-100 disabled:opacity-50"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item)}
                            disabled={isRemoving}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50"
                          >
                            <Trash2 className="h-4 w-4" />
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
                    <span className="font-medium">
                      {formatPrice(subtotal, summaryCurrency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">
                      {formatPrice(tax, summaryCurrency)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {formatPrice(total, summaryCurrency)}
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
