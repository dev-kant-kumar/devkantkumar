/**
 * Mock Authentication Service using LocalStorage
 * Simulates a backend database for users.
 */

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

        const newUser = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          password: userData.password, // In a real app, this would be hashed!
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
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
          // Fallback for the hardcoded demo user if not found in DB
          if (email === 'demo@example.com' && password === 'Password123!') {
             resolve({
                id: '1',
                name: 'Demo User',
                email: 'demo@example.com',
                role: 'client'
             });
             return;
          }

          reject(new Error('Invalid email or password'));
          return;
        }

        const { password: _, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      }, DELAY_MS);
    });
  }
};
