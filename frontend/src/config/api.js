// API Configuration
export const API_CONFIG = {
  // Base URLs
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  CLIENT_URL: import.meta.env.VITE_CLIENT_URL || "http://localhost:5173",
  API_VERSION: "/api/v1",

  // Timeout settings
  TIMEOUT: 30000, // 30 seconds for production

  // Environment
  IS_PRODUCTION: import.meta.env.VITE_NODE_ENV === "production",
  IS_DEVELOPMENT: import.meta.env.VITE_NODE_ENV === "development",

  // CORS settings
  CORS: {
    credentials: true,
    withCredentials: true,
  },

  // Headers
  DEFAULT_HEADERS: {
    Accept: "application/json",
  },
};

// Full API URL
export const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}`;
console.log('API_URL:', API_URL);

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication endpoints
  USERS: {
    PROFILE: `${API_URL}/users/profile`, // Public profile
    DASHBOARD: `${API_URL}/users/dashboard`,
    UPDATE_PROFILE: `${API_URL}/users/profile`,
    ORDERS: `${API_URL}/users/orders`,
    DOWNLOADS: `${API_URL}/users/downloads`,
    FAVORITES: `${API_URL}/users/favorites`,
    DELETE_ME: `${API_URL}/users/me`,
    ADDRESSES: `${API_URL}/users/addresses`,
    REACTIVATE: `${API_URL}/users/reactivate`,
  },
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    VERIFY_TOKEN: '/auth/verify-token',
    ME: '/auth/me',
    UPDATE_PROFILE: '/auth/update-profile',
    CHANGE_PASSWORD: '/auth/change-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    LOGIN_2FA: '/auth/login/verify-2fa',
    SETUP_2FA: '/auth/2fa/setup',
    VERIFY_2FA: '/auth/2fa/verify',
    DISABLE_2FA: '/auth/2fa/disable',
  },

  // Admin endpoints
  ADMIN: {
    // Authentication
    LOGIN: '/admin/auth/login',
    LOGOUT: '/admin/auth/logout',
    REFRESH: '/admin/auth/refresh',
    VERIFY: '/admin/auth/verify',

    // Profile
    PROFILE: '/admin/profile',
    UPDATE_PROFILE: '/admin/profile',
    PASSWORD_CHANGE: '/admin/change-password',
    UPLOAD_AVATAR: '/admin/upload-avatar',
    INITIATE_EMAIL_CHANGE: '/admin/email-update/initiate',
    VERIFY_EMAIL_CHANGE: '/admin/email-update/verify',
    INITIATE_PASSWORD_CHANGE: '/admin/password-change/initiate',
    VERIFY_PASSWORD_CHANGE: '/admin/password-change/verify',

    // Dashboard
    DASHBOARD_OVERVIEW: '/admin/dashboard',
    DASHBOARD_STATS: '/admin/dashboard',
    DASHBOARD_ANALYTICS: '/admin/analytics',

    // Content Management (Portfolio)
    CONTENT: {
      PROJECTS: '/portfolio/projects',
      SKILLS: '/portfolio/skills',
      EXPERIENCE: '/portfolio/experience',
      BLOG: '/portfolio/blog',
    },

    // Contact Messages (Admin)
    MESSAGES: '/portfolio/contact',
    MARK_MESSAGE_READ: '/portfolio/contact',

    // Settings
    SETTINGS: '/admin/settings',
    GENERAL_SETTINGS: '/admin/settings/general',
    SEO_SETTINGS: '/admin/settings/seo',

    // Marketplace
    MARKETPLACE: {
      PRODUCTS: '/admin/products',
      SERVICES: '/admin/services',
      ORDERS: '/admin/marketplace/orders',
    },
    UPLOAD_IMAGE: '/admin/upload/image',
    UPLOAD_PROJECT_IMAGE: '/admin/upload/project-image',
  },

  // Portfolio endpoints (public)
  PORTFOLIO: {
    PROJECTS: '/portfolio/projects',
    PROJECT_BY_ID: '/portfolio/projects', // + /{id}
    SKILLS: '/portfolio/skills',
    EXPERIENCE: '/portfolio/experience',
    EDUCATION: '/portfolio/education',
    CONTACT: '/portfolio/contact',
    ABOUT: '/portfolio/about',
    SETTINGS: '/portfolio/settings',
  },

  // File upload endpoints
  UPLOAD: {
    IMAGE: '/upload/image',
    FILE: '/upload/file',
    AVATAR: '/upload/avatar',
  },

  // Marketplace endpoints (public/user)
  MARKETPLACE: {
    SERVICES: '/marketplace/services',
    PRODUCTS: '/marketplace/products',
    CATEGORIES: '/marketplace/categories',
    SEARCH: '/marketplace/search',
    ORDERS: '/marketplace/orders',
    CART: '/cart',
    PAYMENT: {
      CREATE_ORDER: '/marketplace/payment/create-order',
      VERIFY: '/marketplace/payment/verify',
    },
  },
};

// Create full URL for API calls
export const createApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${endpoint}`;
};

// API request configuration
export const API_REQUEST_CONFIG = {
  headers: API_CONFIG.DEFAULT_HEADERS,
  timeout: API_CONFIG.TIMEOUT,
};

// API upload configuration
export const API_UPLOAD_CONFIG = {
  headers: {},
  timeout: API_CONFIG.TIMEOUT * 2, // Double timeout for uploads
};

export default API_CONFIG;
