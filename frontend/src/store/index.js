import { configureStore } from "@reduxjs/toolkit";
import { baseApiSlice } from "./api/baseApiSlice";

// Import UI slices from different panels
import adminAuthReducer from '../apps/AdminPanel/store/auth/adminAuthSlice';
import adminUIReducer from '../apps/AdminPanel/store/ui/adminUISlice';
import authReducer from '../apps/MarketPlace/store/auth/authSlice';
import cartReducer from '../apps/MarketPlace/store/cart/cartSlice';
import checkoutReducer from '../apps/MarketPlace/store/checkout/checkoutSlice';
import productsReducer from '../apps/MarketPlace/store/products/productsSlice';
import servicesReducer from '../apps/MarketPlace/store/services/servicesSlice';
import marketplaceUIReducer from '../apps/MarketPlace/store/ui/marketplaceUISlice';
import regionReducer from './region/regionSlice';
import portfolioUIReducer from "../apps/Portfolio/store/ui/portfolioUISlice";

/**
 * Root Redux Store Configuration
 *
 * Architecture:
 * - Each panel registers only its UI slices here
 * - API slices are handled by baseApiSlice and extended per panel
 * - This keeps the root store clean and scalable
 */
export const store = configureStore({
  reducer: {
    // Base API slice for all RTK Query
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,

    // Global Slices
    region: regionReducer,

    // Panel-specific UI slices
    portfolioUI: portfolioUIReducer,
    adminUI: adminUIReducer,
    adminAuth: adminAuthReducer,

    // Marketplace Slices
    marketplaceUI: marketplaceUIReducer,
    products: productsReducer,
    services: servicesReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // Ignore RTK Query actions
          "api/executeQuery/pending",
          "api/executeQuery/fulfilled",
          "api/executeQuery/rejected",
        ],
      },
    }).concat(baseApiSlice.middleware),
});
