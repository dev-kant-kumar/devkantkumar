import { createSlice } from '@reduxjs/toolkit';
import { adminApiSlice } from '../api/adminApiSlice';

/**
 * Admin Authentication Slice
 *
 * Manages authentication state for the admin panel including:
 * - Login/logout state
 * - Token management
 * - User information
 * - Integration with RTK Query mutations
 */

// Helper function to safely parse JSON from localStorage
const parseStoredUser = () => {
  try {
    const storedUser = localStorage.getItem('adminUser');

    // Check if storedUser is null, undefined, or the string "undefined"
    if (!storedUser || storedUser === 'undefined' || storedUser === 'null') {
      localStorage.removeItem('adminUser');
      return null;
    }

    return JSON.parse(storedUser);
  } catch (error) {
    console.error('Error parsing stored user data:', error);
    localStorage.removeItem('adminUser');
    return null;
  }
};

const initialState = {
  isAuthenticated: false,
  adminToken: localStorage.getItem('adminToken') || null,
  adminUser: parseStoredUser(),
  isLoading: false,
  error: null,
  lastLoginTime: localStorage.getItem('adminLastLogin') || null,
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    // Manual auth actions (for backward compatibility)
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.adminToken = action.payload.token;
      state.adminUser = action.payload.user;
      state.error = null;
      state.lastLoginTime = new Date().toISOString();

      // Store in localStorage
      localStorage.setItem('adminToken', action.payload.token);
      localStorage.setItem('adminUser', JSON.stringify(action.payload.user));
      localStorage.setItem('adminLastLogin', state.lastLoginTime);
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.adminToken = null;
      state.adminUser = null;
      state.error = action.payload;
      state.lastLoginTime = null;

      // Clear localStorage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminLastLogin');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.adminToken = null;
      state.adminUser = null;
      state.error = null;
      state.isLoading = false;
      state.lastLoginTime = null;

      // Clear localStorage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminLastLogin');
    },
    clearError: (state) => {
      state.error = null;
    },
    // Initialize auth state from localStorage on app start
    initializeAuth: (state) => {
      const token = localStorage.getItem('adminToken');
      const userStr = localStorage.getItem('adminUser');
      const lastLogin = localStorage.getItem('adminLastLogin');

      // This is a synchronous operation, no loading state needed
      state.isLoading = false;

      // Validate that we have valid data (not null, undefined, or string "undefined")
      const hasValidToken = token && token !== 'undefined' && token !== 'null';
      const hasValidUserStr = userStr && userStr !== 'undefined' && userStr !== 'null';

      if (hasValidToken && hasValidUserStr) {
        try {
          const user = JSON.parse(userStr);

          // Additional validation: make sure parsed user is an object
          if (user && typeof user === 'object') {
            state.adminToken = token;
            state.adminUser = user;
            state.isAuthenticated = true;
            state.lastLoginTime = lastLogin;
          } else {
            throw new Error('Invalid user data structure');
          }
        } catch (error) {
          console.error('Error initializing auth from localStorage:', error);
          // If user data is corrupted, clear everything
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          localStorage.removeItem('adminLastLogin');
          state.adminToken = null;
          state.adminUser = null;
          state.isAuthenticated = false;
          state.lastLoginTime = null;
        }
      } else {
        // Clear any partial or invalid data
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminLastLogin');
        state.adminToken = null;
        state.adminUser = null;
        state.isAuthenticated = false;
        state.lastLoginTime = null;
      }
    },
    // Update profile data
    updateProfile: (state, action) => {
      if (state.adminUser) {
        state.adminUser = { ...state.adminUser, ...action.payload };
        localStorage.setItem('adminUser', JSON.stringify(state.adminUser));
      }
    },
  },

  // Handle RTK Query mutations
  extraReducers: (builder) => {
    builder
      // Admin Login
      .addMatcher(
        adminApiSlice.endpoints.adminLogin.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        adminApiSlice.endpoints.adminLogin.matchFulfilled,
        (state, action) => {
          state.isLoading = false;

          // If 2FA is required, we don't complete the authentication yet
          if (action.payload.otpRequired) {
            state.isAuthenticated = false;
            state.adminToken = null;
            state.adminUser = null;
            state.error = null;
            return;
          }

          state.isAuthenticated = true;
          state.adminToken = action.payload.token;
          state.adminUser = action.payload.user;
          state.error = null;
          state.lastLoginTime = new Date().toISOString();

          // Store in localStorage
          localStorage.setItem('adminToken', action.payload.token);
          localStorage.setItem('adminUser', JSON.stringify(action.payload.user));
          localStorage.setItem('adminLastLogin', state.lastLoginTime);
        }
      )
      .addMatcher(
        adminApiSlice.endpoints.verify2FALogin.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.adminToken = action.payload.token;
          state.adminUser = action.payload.user;
          state.error = null;
          state.lastLoginTime = new Date().toISOString();

          // Store in localStorage
          localStorage.setItem('adminToken', action.payload.token);
          localStorage.setItem('adminUser', JSON.stringify(action.payload.user));
          localStorage.setItem('adminLastLogin', state.lastLoginTime);
        }
      )
      .addMatcher(
        adminApiSlice.endpoints.adminLogin.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = false;
          state.adminToken = null;
          state.adminUser = null;
          state.error = action.error?.message || 'Login failed';
          state.lastLoginTime = null;

          // Clear localStorage
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          localStorage.removeItem('adminLastLogin');
        }
      )

      // Admin Logout
      .addMatcher(
        adminApiSlice.endpoints.adminLogout.matchFulfilled,
        (state) => {
          state.isAuthenticated = false;
          state.adminToken = null;
          state.adminUser = null;
          state.error = null;
          state.isLoading = false;
          state.lastLoginTime = null;

          // Clear localStorage
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          localStorage.removeItem('adminLastLogin');
        }
      )

      // Profile Update
      .addMatcher(
        adminApiSlice.endpoints.updateAdminProfile.matchFulfilled,
        (state, action) => {
          if (state.adminUser && action.payload.user) {
            state.adminUser = { ...state.adminUser, ...action.payload.user };
            localStorage.setItem('adminUser', JSON.stringify(state.adminUser));
          }
        }
      );
  },
});

// Export actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  initializeAuth,
  updateProfile,
} = adminAuthSlice.actions;

// Export selectors
export const selectAdminAuth = (state) => state.adminAuth;
export const selectIsAuthenticated = (state) => state.adminAuth.isAuthenticated;
export const selectAdminToken = (state) => state.adminAuth.adminToken;
export const selectAdminUser = (state) => state.adminAuth.adminUser;
export const selectAuthLoading = (state) => state.adminAuth.isLoading;
export const selectAuthError = (state) => state.adminAuth.error;
export const selectLastLoginTime = (state) => state.adminAuth.lastLoginTime;

export default adminAuthSlice.reducer;
