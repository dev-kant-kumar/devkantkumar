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
    const marketplaceToken = state.auth?.token; // Marketplace auth
    const portfolioToken = state.portfolioUI?.auth?.token;
    const adminToken = state.adminAuth?.adminToken;

    const token = marketplaceToken || portfolioToken || adminToken; // Check marketplace first (most common)

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Add region header
    const countryCode = state.region?.countryCode;
    if (countryCode) {
      headers.set("x-country-code", countryCode);
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
import { Mutex } from 'async-mutex';
import { jwtDecode } from "jwt-decode";
import { logout, setCredentials } from "../../apps/MarketPlace/store/auth/authSlice";
import { API_ENDPOINTS } from "../../config/api";

const mutex = new Mutex();

/**
 * Enhanced base query with error handling, smart token refresh, and concurrency control
 */
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // Wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  // Smart Refresh: Check if token is expired or about to expire (within 1 minute)
  const state = api.getState();
  const token = state.auth?.token;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // If token is expired or expires in less than 60 seconds
      if (decoded.exp < currentTime + 60) {
        if (!mutex.isLocked()) {
          const release = await mutex.acquire();
          try {
            const refreshResult = await baseQuery(
              { url: API_ENDPOINTS.AUTH.REFRESH_TOKEN, method: 'POST' },
              api,
              extraOptions
            );

            if (refreshResult.data) {
              const { token: newToken, user } = refreshResult.data;
              api.dispatch(setCredentials({ user: user || state.auth.user, token: newToken }));
            } else {
              api.dispatch(logout());
            }
          } finally {
            release();
          }
        } else {
          await mutex.waitForUnlock();
        }
      }
    } catch (error) {
      // If decoding fails, let the 401 handler deal with it
    }
  }

  let result = await baseQuery(args, api, extraOptions);

  // Handle 401 unauthorized responses (Fallback)
  if (result.error && result.error.status === 401) {
    // Don't try to refresh if the failed request was already a refresh attempt
    if (args.url === API_ENDPOINTS.AUTH.REFRESH_TOKEN) {
      api.dispatch(logout());
      return result;
    }

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { url: API_ENDPOINTS.AUTH.REFRESH_TOKEN, method: 'POST' },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const { token: newToken, user } = refreshResult.data;
          api.dispatch(setCredentials({ user: user || state.auth.user, token: newToken }));
          // Retry original request
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
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

    // Marketplace
    "Service",
    "Product",
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
