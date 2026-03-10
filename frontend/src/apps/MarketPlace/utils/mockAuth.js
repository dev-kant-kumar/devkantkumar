/**
 * Mock Authentication Service using LocalStorage
 * Simulates a backend database for users.
 *
 * WARNING: This module is for LOCAL DEVELOPMENT ONLY.
 * It uses btoa() (base64) — this is NOT cryptographic security.
 * It must never be used in production. Delete this file once fully migrated
 * to real backend authentication.
 */

// Hard-fail in production builds so this code never runs outside development
if (import.meta.env.PROD) {
  throw new Error('[mockAuth] FATAL: mockAuth.js must not be used in production. Switch to real backend auth.');
}

const USERS_KEY = 'marketPlace_users';
const DELAY_MS = 1000; // Simulate network delay

// Helper to get users from storage
const getUsers = () => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Helper to save users to storage
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const mockAuth = {
  /**
   * Register a new user
   * @param {Object} userData - { name, email, password }
   * @returns {Promise<Object>} - The created user object (without password)
   */
  register: async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();

        // Check if email already exists
        if (users.some(u => u.email === userData.email)) {
          reject(new Error('Email already registered'));
          return;
        }

        // MOCK OBFUSCATION: In production, always use bcrypt/argon2 on backend
        const obfuscatedPassword = btoa(userData.password);

        const newUser = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          password: obfuscatedPassword,
          role: 'client',
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);

        // Return user without password
        const { password, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword);
      }, DELAY_MS);
    });
  },

  /**
   * Login a user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} - The user object
   */
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const obfuscatedPassword = btoa(password);
        const user = users.find(u => u.email === email && u.password === obfuscatedPassword);

        if (!user) {
          reject(new Error('Invalid email or password'));
          return;
        }

        const { password: _, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      }, DELAY_MS);
    });
  }
};
