import { createSlice } from '@reduxjs/toolkit';
import { adminApiSlice } from '../api/adminApiSlice';

/**
 * Admin Panel UI Slice
 *
 * Manages UI-specific state for the Admin panel including:
 * - Theme preferences
 * - Navigation state
 * - Loading states
 * - Modal/popup states
 * - User preferences specific to admin
 * - API response data management
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

  // Preferences
  enableAnimations: true,
  enableAutoSave: true,
  autoSaveInterval: 30000, // 30 seconds

  // API Data Management
  apiData: {
    // Dashboard data
    dashboard: {
      overview: null,
      stats: null,
      analytics: null,
      lastUpdated: null,
    },

    // Content data
    projects: {
      list: [],
      currentProject: null,
      totalCount: 0,
      lastUpdated: null,
    },

    skills: {
      list: [],
      categories: [],
      lastUpdated: null,
    },

    experience: {
      list: [],
      lastUpdated: null,
    },

    // Communication data
    messages: {
      list: [],
      unreadCount: 0,
      totalCount: 0,
      lastUpdated: null,
    },

    // Settings data
    settings: {
      general: null,
      seo: null,
      lastUpdated: null,
    },

    // File management
    uploads: {
      recent: [],
      totalSize: 0,
      lastUpdated: null,
    },
  },

  // Data refresh flags
  dataRefreshNeeded: {
    dashboard: false,
    projects: false,
    skills: false,
    experience: false,
    messages: false,
    settings: false,
  },
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

    // API Data Management
    setDashboardData: (state, action) => {
      const { type, data } = action.payload;
      state.apiData.dashboard[type] = data;
      state.apiData.dashboard.lastUpdated = new Date().toISOString();
      state.dataRefreshNeeded.dashboard = false;
    },

    setProjectsData: (state, action) => {
      const { projects, totalCount, currentProject } = action.payload;
      if (projects) state.apiData.projects.list = projects;
      if (totalCount !== undefined) state.apiData.projects.totalCount = totalCount;
      if (currentProject !== undefined) state.apiData.projects.currentProject = currentProject;
      state.apiData.projects.lastUpdated = new Date().toISOString();
      state.dataRefreshNeeded.projects = false;
    },

    setSkillsData: (state, action) => {
      const { skills, categories } = action.payload;
      if (skills) state.apiData.skills.list = skills;
      if (categories) state.apiData.skills.categories = categories;
      state.apiData.skills.lastUpdated = new Date().toISOString();
      state.dataRefreshNeeded.skills = false;
    },

    setExperienceData: (state, action) => {
      state.apiData.experience.list = action.payload;
      state.apiData.experience.lastUpdated = new Date().toISOString();
      state.dataRefreshNeeded.experience = false;
    },

    setMessagesData: (state, action) => {
      const { messages, unreadCount, totalCount } = action.payload;
      if (messages) state.apiData.messages.list = messages;
      if (unreadCount !== undefined) state.apiData.messages.unreadCount = unreadCount;
      if (totalCount !== undefined) state.apiData.messages.totalCount = totalCount;
      state.apiData.messages.lastUpdated = new Date().toISOString();
      state.dataRefreshNeeded.messages = false;
    },

    setSettingsData: (state, action) => {
      const { type, data } = action.payload;
      state.apiData.settings[type] = data;
      state.apiData.settings.lastUpdated = new Date().toISOString();
      state.dataRefreshNeeded.settings = false;
    },

    setUploadsData: (state, action) => {
      const { recent, totalSize } = action.payload;
      if (recent) state.apiData.uploads.recent = recent;
      if (totalSize !== undefined) state.apiData.uploads.totalSize = totalSize;
      state.apiData.uploads.lastUpdated = new Date().toISOString();
    },

    // Data refresh management
    markDataForRefresh: (state, action) => {
      const dataTypes = Array.isArray(action.payload) ? action.payload : [action.payload];
      dataTypes.forEach(type => {
        if (state.dataRefreshNeeded.hasOwnProperty(type)) {
          state.dataRefreshNeeded[type] = true;
        }
      });
    },

    clearDataRefreshFlags: (state) => {
      Object.keys(state.dataRefreshNeeded).forEach(key => {
        state.dataRefreshNeeded[key] = false;
      });
    },

    // Individual item updates
    updateProjectInList: (state, action) => {
      const updatedProject = action.payload;
      const index = state.apiData.projects.list.findIndex(p => p.id === updatedProject.id);
      if (index !== -1) {
        state.apiData.projects.list[index] = updatedProject;
      }
    },

    removeProjectFromList: (state, action) => {
      const projectId = action.payload;
      state.apiData.projects.list = state.apiData.projects.list.filter(p => p.id !== projectId);
      state.apiData.projects.totalCount = Math.max(0, state.apiData.projects.totalCount - 1);
    },

    updateMessageInList: (state, action) => {
      const updatedMessage = action.payload;
      const index = state.apiData.messages.list.findIndex(m => m.id === updatedMessage.id);
      if (index !== -1) {
        state.apiData.messages.list[index] = updatedMessage;
        // Update unread count if message was marked as read
        if (!updatedMessage.isRead && state.apiData.messages.list[index].isRead) {
          state.apiData.messages.unreadCount = Math.max(0, state.apiData.messages.unreadCount - 1);
        }
      }
    },

    // Reset entire state
    resetAdminUI: () => initialState,
  },

  // Handle RTK Query API responses
  extraReducers: (builder) => {
    // Dashboard data
    builder
      .addMatcher(
        adminApiSlice.endpoints.getAdminDashboard.matchFulfilled,
        (state, action) => {
          state.apiData.dashboard.overview = action.payload.data;
          state.apiData.dashboard.lastUpdated = new Date().toISOString();
          state.dataRefreshNeeded.dashboard = false;
        }
      )
      .addMatcher(
        adminApiSlice.endpoints.getDashboardStats.matchFulfilled,
        (state, action) => {
          state.apiData.dashboard.stats = action.payload.data;
          state.apiData.dashboard.lastUpdated = new Date().toISOString();
        }
      )
      .addMatcher(
        adminApiSlice.endpoints.getDashboardAnalytics.matchFulfilled,
        (state, action) => {
          state.apiData.dashboard.analytics = action.payload.data;
          state.apiData.dashboard.lastUpdated = new Date().toISOString();
        }
      );

    // Projects data
    builder
      .addMatcher(
        adminApiSlice.endpoints.getAdminProjects.matchFulfilled,
        (state, action) => {
          state.apiData.projects.list = action.payload.data.projects || action.payload.data;
          state.apiData.projects.totalCount = action.payload.data.totalCount || action.payload.data.length;
          state.apiData.projects.lastUpdated = new Date().toISOString();
          state.dataRefreshNeeded.projects = false;
        }
      )
      .addMatcher(
        adminApiSlice.endpoints.createProject.matchFulfilled,
        (state, action) => {
          state.apiData.projects.list.unshift(action.payload.data);
          state.apiData.projects.totalCount += 1;
        }
      )
      .addMatcher(
        adminApiSlice.endpoints.updateProject.matchFulfilled,
        (state, action) => {
          const updatedProject = action.payload.data;
          const index = state.apiData.projects.list.findIndex(p => p.id === updatedProject.id);
          if (index !== -1) {
            state.apiData.projects.list[index] = updatedProject;
          }
          if (state.apiData.projects.currentProject?.id === updatedProject.id) {
            state.apiData.projects.currentProject = updatedProject;
          }
        }
      )
      .addMatcher(
        adminApiSlice.endpoints.deleteProject.matchFulfilled,
        (state, action) => {
          const projectId = action.meta.arg.originalArgs;
          state.apiData.projects.list = state.apiData.projects.list.filter(p => p.id !== projectId);
          state.apiData.projects.totalCount = Math.max(0, state.apiData.projects.totalCount - 1);
          if (state.apiData.projects.currentProject?.id === projectId) {
            state.apiData.projects.currentProject = null;
          }
        }
      );

    // Skills data
    builder
      .addMatcher(
        adminApiSlice.endpoints.getAdminSkills.matchFulfilled,
        (state, action) => {
          state.apiData.skills.list = action.payload.data.skills || action.payload.data;
          if (action.payload.data.categories) {
            state.apiData.skills.categories = action.payload.data.categories;
          }
          state.apiData.skills.lastUpdated = new Date().toISOString();
          state.dataRefreshNeeded.skills = false;
        }
      );

    // Experience data
    builder
      .addMatcher(
        adminApiSlice.endpoints.getAdminExperience.matchFulfilled,
        (state, action) => {
          state.apiData.experience.list = action.payload.data.experience || action.payload.data;
          state.apiData.experience.lastUpdated = new Date().toISOString();
          state.dataRefreshNeeded.experience = false;
        }
      );

    // Messages data
    builder
      .addMatcher(
        adminApiSlice.endpoints.getContactMessages.matchFulfilled,
        (state, action) => {
          state.apiData.messages.list = action.payload.data.messages || action.payload.data;
          state.apiData.messages.totalCount = action.payload.data.totalCount || action.payload.data.length;
          state.apiData.messages.unreadCount = action.payload.data.unreadCount ||
            action.payload.data.filter(m => !m.isRead).length;
          state.apiData.messages.lastUpdated = new Date().toISOString();
          state.dataRefreshNeeded.messages = false;
        }
      )
      .addMatcher(
        adminApiSlice.endpoints.markMessageAsRead.matchFulfilled,
        (state, action) => {
          const messageId = action.meta.arg.originalArgs;
          const index = state.apiData.messages.list.findIndex(m => m.id === messageId);
          if (index !== -1 && !state.apiData.messages.list[index].isRead) {
            state.apiData.messages.list[index].isRead = true;
            state.apiData.messages.unreadCount = Math.max(0, state.apiData.messages.unreadCount - 1);
          }
        }
      );

    // Settings data
    builder
      .addMatcher(
        adminApiSlice.endpoints.getGeneralSettings.matchFulfilled,
        (state, action) => {
          state.apiData.settings.general = action.payload.data;
          state.apiData.settings.lastUpdated = new Date().toISOString();
          state.dataRefreshNeeded.settings = false;
        }
      )
      .addMatcher(
        adminApiSlice.endpoints.getSeoSettings.matchFulfilled,
        (state, action) => {
          state.apiData.settings.seo = action.payload.data;
          state.apiData.settings.lastUpdated = new Date().toISOString();
        }
      );
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
  // API Data Management
  setDashboardData,
  setProjectsData,
  setSkillsData,
  setExperienceData,
  setMessagesData,
  setSettingsData,
  setUploadsData,
  markDataForRefresh,
  clearDataRefreshFlags,
  updateProjectInList,
  removeProjectFromList,
  updateMessageInList,
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

// API Data Selectors
export const selectApiData = (state) => state.adminUI.apiData;

// Dashboard selectors
export const selectDashboardData = (state) => state.adminUI.apiData.dashboard;
export const selectDashboardOverview = (state) => state.adminUI.apiData.dashboard.overview;
export const selectDashboardStats = (state) => state.adminUI.apiData.dashboard.stats;
export const selectDashboardAnalytics = (state) => state.adminUI.apiData.dashboard.analytics;

// Projects selectors
export const selectProjectsData = (state) => state.adminUI.apiData.projects;
export const selectProjectsList = (state) => state.adminUI.apiData.projects.list;
export const selectCurrentProject = (state) => state.adminUI.apiData.projects.currentProject;
export const selectProjectsCount = (state) => state.adminUI.apiData.projects.totalCount;

// Skills selectors
export const selectSkillsData = (state) => state.adminUI.apiData.skills;
export const selectSkillsList = (state) => state.adminUI.apiData.skills.list;
export const selectSkillsCategories = (state) => state.adminUI.apiData.skills.categories;

// Experience selectors
export const selectExperienceData = (state) => state.adminUI.apiData.experience;
export const selectExperienceList = (state) => state.adminUI.apiData.experience.list;

// Messages selectors
export const selectMessagesData = (state) => state.adminUI.apiData.messages;
export const selectMessagesList = (state) => state.adminUI.apiData.messages.list;
export const selectMessagesUnreadCount = (state) => state.adminUI.apiData.messages.unreadCount;
export const selectMessagesTotalCount = (state) => state.adminUI.apiData.messages.totalCount;

// Settings selectors
export const selectSettingsData = (state) => state.adminUI.apiData.settings;
export const selectGeneralSettings = (state) => state.adminUI.apiData.settings.general;
export const selectSeoSettings = (state) => state.adminUI.apiData.settings.seo;

// Uploads selectors
export const selectUploadsData = (state) => state.adminUI.apiData.uploads;
export const selectRecentUploads = (state) => state.adminUI.apiData.uploads.recent;
export const selectUploadsTotalSize = (state) => state.adminUI.apiData.uploads.totalSize;

// Data refresh selectors
export const selectDataRefreshNeeded = (state) => state.adminUI.dataRefreshNeeded;
export const selectIsDataRefreshNeeded = (dataType) => (state) =>
  state.adminUI.dataRefreshNeeded[dataType] || false;

// Combined selectors
export const selectFilteredProjects = (state) => {
  const projects = state.adminUI.apiData.projects.list;
  const filter = state.adminUI.projectFilter;

  if (filter === 'all') return projects;
  return projects.filter(project => project.status === filter);
};

export const selectUnreadMessages = (state) => {
  return state.adminUI.apiData.messages.list.filter(message => !message.isRead);
};

export const selectProjectById = (projectId) => (state) => {
  return state.adminUI.apiData.projects.list.find(project => project.id === projectId);
};

export const selectMessageById = (messageId) => (state) => {
  return state.adminUI.apiData.messages.list.find(message => message.id === messageId);
};
