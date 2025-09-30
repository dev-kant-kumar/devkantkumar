import { createSlice } from '@reduxjs/toolkit';

/**
 * Portfolio Panel UI Slice
 * 
 * Manages UI-specific state for the Portfolio panel including:
 * - Theme preferences
 * - Navigation state
 * - Loading states
 * - Modal/popup states
 * - Animation preferences
 * - User preferences specific to portfolio
 */

const initialState = {
  // Theme and appearance
  theme: 'dark', // 'light' | 'dark' | 'auto'
  
  // Navigation
  activeSection: 'home', // Current active section for highlighting
  isMenuOpen: false, // Mobile menu state
  
  // Loading states
  isLoading: false,
  loadingMessage: '',
  
  // UI states
  isContactModalOpen: false,
  isProjectModalOpen: false,
  selectedProject: null,
  
  // Animation preferences
  reduceMotion: false, // Accessibility: reduce animations
  enableParticles: true, // Performance: enable/disable particle effects
  
  // Scroll and navigation
  scrollY: 0,
  showScrollTop: false,
  
  // Portfolio specific preferences
  projectFilter: 'all', // 'all' | 'web' | 'mobile' | 'saas' | 'open-source'
  skillsView: 'grid', // 'grid' | 'list' | 'chart'
  
  // Page-specific states
  heroAnimationComplete: false,
  visibleSections: [], // Array of sections currently in viewport
  
  // Contact form
  contactForm: {
    isSubmitting: false,
    isSuccess: false,
    errors: {},
  },
  
  // Blog
  blogFilter: 'all',
  blogSearchQuery: '',
  
  // Error handling
  error: null,
  lastError: null,
};

const portfolioUISlice = createSlice({
  name: 'portfolioUI',
  initialState,
  reducers: {
    // Theme actions
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    
    // Navigation actions
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMenuOpen = false;
    },
    
    // Loading actions
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message || '';
    },
    
    // Modal actions
    openContactModal: (state) => {
      state.isContactModalOpen = true;
    },
    closeContactModal: (state) => {
      state.isContactModalOpen = false;
    },
    openProjectModal: (state, action) => {
      state.isProjectModalOpen = true;
      state.selectedProject = action.payload;
    },
    closeProjectModal: (state) => {
      state.isProjectModalOpen = false;
      state.selectedProject = null;
    },
    
    // Animation and performance
    setReduceMotion: (state, action) => {
      state.reduceMotion = action.payload;
    },
    toggleParticles: (state) => {
      state.enableParticles = !state.enableParticles;
    },
    
    // Scroll tracking
    setScrollY: (state, action) => {
      state.scrollY = action.payload;
      state.showScrollTop = action.payload > 1000; // Show scroll to top after 1000px
    },
    
    // Filter actions
    setProjectFilter: (state, action) => {
      state.projectFilter = action.payload;
    },
    setBlogFilter: (state, action) => {
      state.blogFilter = action.payload;
    },
    setBlogSearchQuery: (state, action) => {
      state.blogSearchQuery = action.payload;
    },
    setSkillsView: (state, action) => {
      state.skillsView = action.payload;
    },
    
    // Hero animation
    setHeroAnimationComplete: (state, action) => {
      state.heroAnimationComplete = action.payload;
    },
    
    // Viewport tracking
    updateVisibleSections: (state, action) => {
      state.visibleSections = action.payload;
    },
    
    // Contact form
    setContactFormSubmitting: (state, action) => {
      state.contactForm.isSubmitting = action.payload;
    },
    setContactFormSuccess: (state, action) => {
      state.contactForm.isSuccess = action.payload;
      if (action.payload) {
        state.contactForm.isSubmitting = false;
        state.contactForm.errors = {};
      }
    },
    setContactFormErrors: (state, action) => {
      state.contactForm.errors = action.payload;
      state.contactForm.isSubmitting = false;
    },
    resetContactForm: (state) => {
      state.contactForm = {
        isSubmitting: false,
        isSuccess: false,
        errors: {},
      };
    },
    
    // Error handling
    setError: (state, action) => {
      state.error = action.payload;
      state.lastError = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    
    // Reset entire state (useful for cleanup)
    resetPortfolioUI: (state) => {
      return { ...initialState, theme: state.theme }; // Preserve theme preference
    },
  },
});

// Export actions
export const {
  setTheme,
  toggleTheme,
  setActiveSection,
  toggleMobileMenu,
  closeMobileMenu,
  setLoading,
  openContactModal,
  closeContactModal,
  openProjectModal,
  closeProjectModal,
  setReduceMotion,
  toggleParticles,
  setScrollY,
  setProjectFilter,
  setBlogFilter,
  setBlogSearchQuery,
  setSkillsView,
  setHeroAnimationComplete,
  updateVisibleSections,
  setContactFormSubmitting,
  setContactFormSuccess,
  setContactFormErrors,
  resetContactForm,
  setError,
  clearError,
  resetPortfolioUI,
} = portfolioUISlice.actions;

// Export selector functions
export const selectPortfolioUI = (state) => state.portfolioUI;
export const selectTheme = (state) => state.portfolioUI.theme;
export const selectActiveSection = (state) => state.portfolioUI.activeSection;
export const selectIsMenuOpen = (state) => state.portfolioUI.isMenuOpen;
export const selectIsLoading = (state) => state.portfolioUI.isLoading;
export const selectProjectFilter = (state) => state.portfolioUI.projectFilter;
export const selectContactForm = (state) => state.portfolioUI.contactForm;
export const selectScrollY = (state) => state.portfolioUI.scrollY;
export const selectShowScrollTop = (state) => state.portfolioUI.showScrollTop;

// Export reducer
export default portfolioUISlice.reducer;
