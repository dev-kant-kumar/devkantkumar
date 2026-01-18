import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from 'async-mutex';
import { logout, setCredentials } from "../../apps/MarketPlace/store/auth/authSlice";
import { API_CONFIG, API_ENDPOINTS, API_URL } from "../../config/api";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: API_CONFIG.CORS.credentials ? 'include' : 'same-origin',

  prepareHeaders: (headers, { getState }) => {
    Object.entries(API_CONFIG.DEFAULT_HEADERS).forEach(([key, value]) => {
      headers.set(key, value);
    });

    const state = getState();
    const marketplaceToken = state.auth?.token;
    const portfolioToken = state.portfolioUI?.auth?.token;
    const adminToken = state.adminAuth?.adminToken;
    const token = marketplaceToken || portfolioToken || adminToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const countryCode = state.region?.countryCode;
    if (countryCode) {
      headers.set("x-country-code", countryCode);
    }

    if (API_CONFIG.IS_DEVELOPMENT) {
      headers.set("X-Environment", "development");
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  const state = api.getState();
  const token = state.auth?.token;

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const isRefreshRequest = typeof args === 'string'
      ? args.includes('refresh')
      : args.url?.includes('refresh');

    if (isRefreshRequest || !token) {
      if (token && isRefreshRequest) {
        api.dispatch(logout());
      }
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
          api.dispatch(setCredentials({
            user: user || state.auth.user,
            token: newToken
          }));
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
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: [
    "Auth", "User", "Admin", "Project", "Skill", "Experience",
    "Education", "Testimonial", "About", "Blog", "BlogPost",
    "Category", "Tag", "Contact", "Message", "Newsletter",
    "Upload", "File", "Image", "Analytics", "PageView",
    "Interaction", "Health", "Settings", "AdminSettings", "Service", "Product",
  ],
  endpoints: () => ({}),
});
