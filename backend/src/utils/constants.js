// API Response Messages
const MESSAGES = {
  SUCCESS: 'Operation completed successfully',
  ERROR: 'An error occurred',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation failed',
  SERVER_ERROR: 'Internal server error',

  // Auth messages
  AUTH: {
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logout successful',
    REGISTER_SUCCESS: 'Registration successful',
    PASSWORD_RESET_SENT: 'Password reset email sent',
    PASSWORD_RESET_SUCCESS: 'Password reset successful',
    EMAIL_VERIFIED: 'Email verified successfully',
    INVALID_CREDENTIALS: 'Invalid credentials',
    EMAIL_ALREADY_EXISTS: 'Email already exists',
    TOKEN_EXPIRED: 'Token has expired',
    INVALID_TOKEN: 'Invalid token'
  },

  // User messages
  USER: {
    PROFILE_UPDATED: 'Profile updated successfully',
    PASSWORD_CHANGED: 'Password changed successfully',
    ACCOUNT_DELETED: 'Account deleted successfully'
  },

  // Marketplace messages
  MARKETPLACE: {
    ITEM_ADDED_TO_CART: 'Item added to cart',
    ITEM_REMOVED_FROM_CART: 'Item removed from cart',
    CART_CLEARED: 'Cart cleared',
    ORDER_CREATED: 'Order created successfully',
    PAYMENT_SUCCESSFUL: 'Payment processed successfully',
    PAYMENT_FAILED: 'Payment processing failed'
  }
};

// HTTP Status Codes
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// User Roles
const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
};

// Order Status
const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

// Product/Service Status
const ITEM_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived'
};

// File Upload Limits
const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// Cache Keys
const CACHE_KEYS = {
  USER_PROFILE: 'user_profile',
  PRODUCTS: 'products',
  SERVICES: 'services',
  CATEGORIES: 'categories',
  ORDERS: 'orders'
};

// Cache Expiration Times (in seconds)
const CACHE_EXPIRATION = {
  SHORT: 300,    // 5 minutes
  MEDIUM: 1800,  // 30 minutes
  LONG: 3600,    // 1 hour
  VERY_LONG: 86400 // 24 hours
};

module.exports = {
  MESSAGES,
  STATUS_CODES,
  USER_ROLES,
  ORDER_STATUS,
  ITEM_STATUS,
  UPLOAD_LIMITS,
  CACHE_KEYS,
  CACHE_EXPIRATION
};
