/**
 * Form Validation and Sanitation Utilities
 */

// Regular Expressions
export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^\+?[1-9]\d{1,14}$/, // E.164 format
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  ZIP_CODE: /^\d{5,6}(-\d{4})?$/, // US (5) or India (6) Zip code
  CARD_NUMBER: /^\d{16}$/, // Basic 16 digit check
  CVV: /^\d{3,4}$/,
  NAME: /^[a-zA-Z\s'-]+$/, // No numbers or special chars allowed in name
};

// Sanitation Functions
export const sanitize = {
  trim: (value) => (typeof value === 'string' ? value.trim() : value),
  email: (value) => (typeof value === 'string' ? value.trim().toLowerCase() : value),
  phone: (value) => (typeof value === 'string' ? value.replace(/[^+\d]/g, '') : value), // Keep only digits and +
  digitsOnly: (value) => (typeof value === 'string' ? value.replace(/\D/g, '') : value),
  cardName: (value) => (typeof value === 'string' ? value.replace(/[^a-zA-Z\s'-]/g, '') : value), // Remove invalid chars for name
};

// Card Utilities
export const getCardType = (number) => {
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6/,
  };
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(number)) return type;
  }
  return 'unknown';
};

export const formatExpiryDate = (value) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  }
  return digits;
};

// Validation Functions
export const validate = {
  required: (value, fieldName = 'Field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} is required`;
    }
    return null;
  },

  name: (value, fieldName = 'Name') => {
    if (!value) return null;
    if (!REGEX.NAME.test(value)) {
      return `${fieldName} should not contain numbers or special characters`;
    }
    return null;
  },

  email: (value) => {
    if (!value) return null; // Allow empty if not required (combine with required validator if needed)
    if (!REGEX.EMAIL.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  phone: (value) => {
    if (!value) return null;
    if (!REGEX.PHONE.test(value)) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  password: (value) => {
    if (!value) return null;
    if (!REGEX.PASSWORD.test(value)) {
      return 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
    }
    return null;
  },

  minLength: (value, min, fieldName = 'Field') => {
    if (!value) return null;
    if (value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (value, max, fieldName = 'Field') => {
    if (!value) return null;
    if (value.length > max) {
      return `${fieldName} must not exceed ${max} characters`;
    }
    return null;
  },

  match: (value, matchValue, fieldName = 'Fields') => {
    if (value !== matchValue) {
      return `${fieldName} do not match`;
    }
    return null;
  },

  zipCode: (value) => {
    if (!value) return null;
    if (!REGEX.ZIP_CODE.test(value)) {
        return 'Invalid ZIP code';
    }
    return null;
  }
};

// Form Helper to run multiple validations
export const runValidation = (value, validators) => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};
