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
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// Full API URL
export const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}`;
console.log('API_URL:', API_URL);

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    VERIFY_TOKEN: '/auth/verify-token',
    ME: '/auth/me',
    UPDATE_PROFILE: '/auth/update-profile',
    CHANGE_PASSWORD: '/auth/change-password',
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
    CHANGE_PASSWORD: '/admin/change-password',
    UPLOAD_AVATAR: '/admin/upload-avatar',

    // Dashboard
    DASHBOARD_OVERVIEW: '/admin/dashboard/overview',
    DASHBOARD_STATS: '/admin/dashboard/stats',
    DASHBOARD_ANALYTICS: '/admin/dashboard/analytics',

    // Projects
    PROJECTS: '/admin/projects',
    PROJECT_BY_ID: '/admin/projects', // + /{id}

    // Skills
    SKILLS: '/admin/skills',
    SKILL_BY_ID: '/admin/skills', // + /{id}

    // Experience
    EXPERIENCE: '/admin/experience',
    EXPERIENCE_BY_ID: '/admin/experience', // + /{id}

    // Contact Messages
    MESSAGES: '/admin/messages',
    MESSAGE_BY_ID: '/admin/messages', // + /{id}
    MARK_MESSAGE_READ: '/admin/messages', // + /{id}/read

    // Settings
    GENERAL_SETTINGS: '/admin/settings/general',
    SEO_SETTINGS: '/admin/settings/seo',

    // File Uploads
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
  },

  // File upload endpoints
  UPLOAD: {
    IMAGE: '/upload/image',
    FILE: '/upload/file',
    AVATAR: '/upload/avatar',
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
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: API_CONFIG.TIMEOUT * 2, // Double timeout for uploads
};

export default API_CONFIG;
