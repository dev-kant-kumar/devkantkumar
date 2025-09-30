import { createSlice } from '@reduxjs/toolkit';

/**
 * Admin Panel UI Slice
 *
 * Manages UI-specific state for the Admin panel including:
 * - Theme preferences
 * - Navigation state
 * - Loading states
 * - Modal/popup states
 * - User preferences specific to admin
 */

const initialState = {
  // Theme and appearance
  theme: 'light', // 'light' | 'dark' | 'auto'

  // Navigation
  activeSection: 'dashboard', // Current active section for highlighting
  isSidebarCollapsed: false, // Sidebar collapse state
  isMobileMenuOpen: false, // Mobile menu state

  // Loading states
  isLoading: false,
  loadingMessage: '',

  // UI states
  isModalOpen: false,
  modalType: null, // 'project' | 'blog' | 'skill' | 'settings'
  selectedItem: null,

  // Admin specific preferences
  tableView: 'grid', // 'grid' | 'list' | 'table'
  itemsPerPage: 10,
  sortBy: 'updated_at',
  sortOrder: 'desc', // 'asc' | 'desc'

  // Filters
  projectFilter: 'all', // 'all' | 'published' | 'draft' | 'archived'
  blogFilter: 'all', // 'all' | 'published' | 'draft'

  // Dashboard
  dashboardLayout: 'default', // 'default' | 'compact' | 'detailed'
  showStats: true,
  showRecentActivity: true,

  // Notifications
  notifications: [],
  unreadCount: 0,

  // Form states
  forms: {
    project: {
      isSubmitting: false,
      isDirty: false,
      errors: {},
    },
    blog: {
      isSubmitting: false,
      isDirty: false,
      errors: {},
    },
    settings: {
      isSubmitting: false,
      isDirty: false,
      errors: {},
    },
  },

  // Error handling
  error: null,
  lastError: null,

  // Performance
  enableAnimations: true,
  enableAutoSave: true,
  autoSaveInterval: 30000, // 30 seconds
};

const adminUISlice = createSlice({
  name: 'adminUI',
  initialState,
  reducers: {
    // Theme actions
    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    // Navigation actions
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },

    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },

    setSidebarCollapsed: (state, action) => {
      state.isSidebarCollapsed = action.payload;
    },

    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },

    setMobileMenuOpen: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },

    // Loading actions
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message || '';
    },

    // Modal actions
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalType = action.payload.type;
      state.selectedItem = action.payload.item || null;
    },

    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = null;
      state.selectedItem = null;
    },

    // View preferences
    setTableView: (state, action) => {
      state.tableView = action.payload;
    },

    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },

    setSorting: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },

    // Filter actions
    setProjectFilter: (state, action) => {
      state.projectFilter = action.payload;
    },

    setBlogFilter: (state, action) => {
      state.blogFilter = action.payload;
    },

    // Dashboard actions
    setDashboardLayout: (state, action) => {
      state.dashboardLayout = action.payload;
    },

    toggleDashboardStats: (state) => {
      state.showStats = !state.showStats;
    },

    toggleRecentActivity: (state) => {
      state.showRecentActivity = !state.showRecentActivity;
    },

    // Notification actions
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },

    removeNotification: (state, action) => {
      const index = state.notifications.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        state.notifications.splice(index, 1);
      }
    },

    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },

    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },

    // Form actions
    setFormState: (state, action) => {
      const { formType, field, value } = action.payload;
      if (state.forms[formType]) {
        state.forms[formType][field] = value;
      }
    },

    setFormErrors: (state, action) => {
      const { formType, errors } = action.payload;
      if (state.forms[formType]) {
        state.forms[formType].errors = errors;
      }
    },

    resetForm: (state, action) => {
      const formType = action.payload;
      if (state.forms[formType]) {
        state.forms[formType] = {
          isSubmitting: false,
          isDirty: false,
          errors: {},
        };
      }
    },

    // Error actions
    setError: (state, action) => {
      state.error = action.payload;
      state.lastError = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    // Performance actions
    setAnimationsEnabled: (state, action) => {
      state.enableAnimations = action.payload;
    },

    setAutoSaveEnabled: (state, action) => {
      state.enableAutoSave = action.payload;
    },

    setAutoSaveInterval: (state, action) => {
      state.autoSaveInterval = action.payload;
    },

    // Reset all state
    resetAdminUI: () => initialState,
  },
});

export const {
  setTheme,
  setActiveSection,
  toggleSidebar,
  setSidebarCollapsed,
  toggleMobileMenu,
  setMobileMenuOpen,
  setLoading,
  openModal,
  closeModal,
  setTableView,
  setItemsPerPage,
  setSorting,
  setProjectFilter,
  setBlogFilter,
  setDashboardLayout,
  toggleDashboardStats,
  toggleRecentActivity,
  addNotification,
  removeNotification,
  markNotificationAsRead,
  clearAllNotifications,
  setFormState,
  setFormErrors,
  resetForm,
  setError,
  clearError,
  setAnimationsEnabled,
  setAutoSaveEnabled,
  setAutoSaveInterval,
  resetAdminUI,
} = adminUISlice.actions;

export default adminUISlice.reducer;

// Selectors
export const selectAdminTheme = (state) => state.adminUI.theme;
export const selectActiveSection = (state) => state.adminUI.activeSection;
export const selectIsSidebarCollapsed = (state) => state.adminUI.isSidebarCollapsed;
export const selectIsLoading = (state) => state.adminUI.isLoading;
export const selectLoadingMessage = (state) => state.adminUI.loadingMessage;
export const selectIsModalOpen = (state) => state.adminUI.isModalOpen;
export const selectModalType = (state) => state.adminUI.modalType;
export const selectSelectedItem = (state) => state.adminUI.selectedItem;
export const selectTableView = (state) => state.adminUI.tableView;
export const selectSorting = (state) => ({
  sortBy: state.adminUI.sortBy,
  sortOrder: state.adminUI.sortOrder,
});
export const selectProjectFilter = (state) => state.adminUI.projectFilter;
export const selectBlogFilter = (state) => state.adminUI.blogFilter;
export const selectNotifications = (state) => state.adminUI.notifications;
export const selectUnreadCount = (state) => state.adminUI.unreadCount;
export const selectFormState = (formType) => (state) => state.adminUI.forms[formType];
export const selectError = (state) => state.adminUI.error;
export const selectAnimationsEnabled = (state) => state.adminUI.enableAnimations;
