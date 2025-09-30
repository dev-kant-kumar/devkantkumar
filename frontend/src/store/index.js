import { configureStore } from "@reduxjs/toolkit";
import { baseApiSlice } from "./api/baseApiSlice";

// Import UI slices from different panels
import portfolioUIReducer from "../apps/Portfolio/store/ui/portfolioUISlice";
import adminUIReducer from '../apps/AdminPanel/store/ui/adminUISlice';
import adminAuthReducer from '../apps/AdminPanel/store/auth/adminAuthSlice';
// Add other panel reducers here as they're implemented
// import marketplaceUIReducer from '../apps/MarketPlace/store/ui/marketplaceUISlice';

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

    // Panel-specific UI slices
    portfolioUI: portfolioUIReducer,
    adminUI: adminUIReducer,
    adminAuth: adminAuthReducer,
    // Add other panel UI slices here
    // marketplaceUI: marketplaceUIReducer,
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
