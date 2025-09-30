import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, API_URL } from "../../config/api";

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
  baseUrl: API_URL,
  timeout: API_CONFIG.TIMEOUT,
  credentials: API_CONFIG.CORS.credentials ? 'include' : 'same-origin',

  prepareHeaders: (headers, { getState }) => {
    // Add default headers from config
    Object.entries(API_CONFIG.DEFAULT_HEADERS).forEach(([key, value]) => {
      headers.set(key, value);
    });

    // Add auth token if available (from any panel's auth state)
    const state = getState();

    // Check for auth tokens from different panels
    const portfolioToken = state.portfolioUI?.auth?.token;
    const adminToken = state.adminAuth?.adminToken;

    const token = portfolioToken || adminToken; // Add more as needed

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Add environment-specific headers
    if (API_CONFIG.IS_DEVELOPMENT) {
      headers.set("X-Environment", "development");
    }

    return headers;
  },
});

/**
 * Enhanced base query with error handling and token refresh logic
 */
const baseQueryWithReauth = async (args, api, extraOptions) => {
  console.log(`🌐 [RTK Query] ${args.method || 'GET'} ${args.url}`);

  let result = await baseQuery(args, api, extraOptions);

  // Handle successful responses
  if (result.data) {
    console.log(`✅ [RTK Query] Success: ${args.url}`, result.data);
  }

  // Handle 401 unauthorized responses
  if (result.error && result.error.status === 401) {
    console.warn("🔒 [RTK Query] Unauthorized request detected");

    // Try to refresh token
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh-token',
        method: 'POST',
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Token refreshed successfully, retry original request
      console.log("🔄 [RTK Query] Token refreshed, retrying request");
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed, logout user
      console.error("❌ [RTK Query] Token refresh failed, logging out");
      // Import and dispatch logout action when needed
      // api.dispatch(logout());
    }
  }

  // Handle network errors
  if (result.error && result.error.status === "FETCH_ERROR") {
    console.error("🌐 [RTK Query] Network error occurred:", result.error);
  }

  // Handle other errors
  if (result.error && result.error.status !== 401) {
    console.error(`❌ [RTK Query] API Error ${result.error.status}:`, result.error);
  }

  return result;
};

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,

  // Keep data fresh for 60 seconds
  keepUnusedDataFor: 60,

  // Refetch on mount and focus
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  // Global tag types that can be used across all panels
  tagTypes: [
    // Authentication
    "Auth",
    "User",
    "Admin",

    // Portfolio
    "Project",
    "Skill",
    "Experience",
    "Education",
    "Testimonial",
    "About",

    // Content Management
    "Blog",
    "BlogPost",
    "Category",
    "Tag",

    // Communication
    "Contact",
    "Message",
    "Newsletter",

    // File Management
    "Upload",
    "File",
    "Image",

    // Analytics
    "Analytics",
    "PageView",
    "Interaction",

    // System
    "Health",
    "Settings",
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
