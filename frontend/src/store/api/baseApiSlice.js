import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Base API Slice for RTK Query
 *
 * This is the foundation API slice that all panel-specific API slices will extend.
 * It contains common configuration like base URL, headers, error handling, etc.
 *
 * Each panel will create their own API slice by calling:
 * export const panelApiSlice = baseApiSlice.injectEndpoints({ ... })
 */

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api",

  prepareHeaders: (headers, { getState }) => {
    // Add common headers
    headers.set("Content-Type", "application/json");

    // Add auth token if available (from any panel's auth state)
    const state = getState();

    // Check for auth tokens from different panels
    const portfolioToken = state.portfolioUI?.auth?.token;
    // const adminToken = state.adminUI?.auth?.token;

    const token = portfolioToken; // || adminToken; // Add more as needed

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

/**
 * Enhanced base query with error handling and token refresh logic
 */
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle 401 unauthorized responses
  if (result.error && result.error.status === 401) {
    // Try to refresh token or redirect to login
    // Implementation depends on your auth strategy
    console.warn("Unauthorized request detected");

    // For now, just log out user (can be enhanced later)
    // api.dispatch(logoutUser());
  }

  // Handle network errors
  if (result.error && result.error.status === "FETCH_ERROR") {
    console.error("Network error occurred:", result.error);
  }

  return result;
};

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,

  // Global tag types that can be used across all panels
  tagTypes: [
    "User",
    "Project",
    "Skill",
    "Experience",
    "Blog",
    "Service",
    "Product",
    "Order",
    "Client",
    "Analytics",
  ],

  // No endpoints defined here - each panel will inject their own
  endpoints: () => ({}),
});

// Export hooks (these will be empty until endpoints are injected)
export const {
  // Portfolio endpoints will be added here when injected
  // Admin endpoints will be added here when injected
  // Marketplace endpoints will be added here when injected
} = baseApiSlice;
