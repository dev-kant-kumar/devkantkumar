import { baseApiSlice } from "../../../../store/api/baseApiSlice";
import { API_ENDPOINTS } from "../../../../config/api";

/**
 * Admin Panel API Slice
 *
 * Extends the base API slice with admin-specific endpoints
 * All admin API calls should go through this slice
 */
export const adminApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ===================
    // AUTHENTICATION ENDPOINTS
    // ===================
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth', 'Admin'],
      transformResponse: (response) => {
        console.log('🔐 [Admin API] Login response:', response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error('❌ [Admin API] Login error:', response);
        return response;
      },
    }),

    adminLogout: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'Admin', 'User'],
    }),

    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: API_ENDPOINTS.AUTH.REFRESH_TOKEN,
        method: 'POST',
        body: { refreshToken },
      }),
      invalidatesTags: ['Auth'],
    }),

    verifyToken: builder.query({
      query: () => API_ENDPOINTS.AUTH.VERIFY_TOKEN,
      providesTags: ['Auth'],
    }),

    // ===================
    // ADMIN PROFILE ENDPOINTS
    // ===================
    getAdminProfile: builder.query({
      query: () => API_ENDPOINTS.ADMIN.PROFILE.GET,
      providesTags: ['Admin', 'User'],
    }),

    updateAdminProfile: builder.mutation({
      query: (profileData) => ({
        url: API_ENDPOINTS.ADMIN.PROFILE.UPDATE,
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['Admin', 'User'],
    }),

    changeAdminPassword: builder.mutation({
      query: (passwordData) => ({
        url: API_ENDPOINTS.ADMIN.PROFILE.CHANGE_PASSWORD,
        method: 'POST',
        body: passwordData,
      }),
      invalidatesTags: ['Auth'],
    }),

    uploadAdminAvatar: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.ADMIN.PROFILE.UPLOAD_AVATAR,
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['Admin', 'User'],
    }),

    // ===================
    // DASHBOARD ENDPOINTS
    // ===================
    getAdminDashboard: builder.query({
      query: () => API_ENDPOINTS.ADMIN.DASHBOARD.OVERVIEW,
      providesTags: ['Admin'],
    }),

    getDashboardStats: builder.query({
      query: () => API_ENDPOINTS.ADMIN.DASHBOARD.STATS,
      providesTags: ['Analytics'],
    }),

    getDashboardAnalytics: builder.query({
      query: (params) => ({
        url: API_ENDPOINTS.ADMIN.DASHBOARD.ANALYTICS,
        params,
      }),
      providesTags: ['Analytics'],
    }),

    // ===================
    // CONTENT MANAGEMENT ENDPOINTS
    // ===================

    // Projects Management
    getAdminProjects: builder.query({
      query: () => API_ENDPOINTS.ADMIN.CONTENT.PROJECTS,
      providesTags: ['Project'],
    }),

    createProject: builder.mutation({
      query: (projectData) => ({
        url: API_ENDPOINTS.ADMIN.CONTENT.PROJECTS,
        method: 'POST',
        body: projectData,
      }),
      invalidatesTags: ['Project'],
    }),

    updateProject: builder.mutation({
      query: ({ id, ...projectData }) => ({
        url: `${API_ENDPOINTS.ADMIN.CONTENT.PROJECTS}/${id}`,
        method: 'PUT',
        body: projectData,
      }),
      invalidatesTags: ['Project'],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS.ADMIN.CONTENT.PROJECTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),

    // Skills Management
    getAdminSkills: builder.query({
      query: () => API_ENDPOINTS.ADMIN.CONTENT.SKILLS,
      providesTags: ['Skill'],
    }),

    createSkill: builder.mutation({
      query: (skillData) => ({
        url: API_ENDPOINTS.ADMIN.CONTENT.SKILLS,
        method: 'POST',
        body: skillData,
      }),
      invalidatesTags: ['Skill'],
    }),

    updateSkill: builder.mutation({
      query: ({ id, ...skillData }) => ({
        url: `${API_ENDPOINTS.ADMIN.CONTENT.SKILLS}/${id}`,
        method: 'PUT',
        body: skillData,
      }),
      invalidatesTags: ['Skill'],
    }),

    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS.ADMIN.CONTENT.SKILLS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Skill'],
    }),

    // Experience Management
    getAdminExperience: builder.query({
      query: () => API_ENDPOINTS.ADMIN.CONTENT.EXPERIENCE,
      providesTags: ['Experience'],
    }),

    createExperience: builder.mutation({
      query: (experienceData) => ({
        url: API_ENDPOINTS.ADMIN.CONTENT.EXPERIENCE,
        method: 'POST',
        body: experienceData,
      }),
      invalidatesTags: ['Experience'],
    }),

    updateExperience: builder.mutation({
      query: ({ id, ...experienceData }) => ({
        url: `${API_ENDPOINTS.ADMIN.CONTENT.EXPERIENCE}/${id}`,
        method: 'PUT',
        body: experienceData,
      }),
      invalidatesTags: ['Experience'],
    }),

    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS.ADMIN.CONTENT.EXPERIENCE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Experience'],
    }),

    // ===================
    // FILE UPLOAD ENDPOINTS
    // ===================
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.UPLOAD.IMAGE,
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['Upload'],
    }),

    uploadProjectImage: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.UPLOAD.PROJECT_IMAGE,
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['Upload', 'Project'],
    }),

    // ===================
    // CONTACT & MESSAGES
    // ===================
    getContactMessages: builder.query({
      query: () => API_ENDPOINTS.CONTACT.GET_MESSAGES,
      providesTags: ['Message'],
    }),

    markMessageAsRead: builder.mutation({
      query: (messageId) => ({
        url: `${API_ENDPOINTS.CONTACT.MARK_AS_READ}/${messageId}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Message'],
    }),

    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `${API_ENDPOINTS.CONTACT.DELETE_MESSAGE}/${messageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),

    // ===================
    // SETTINGS ENDPOINTS
    // ===================
    getGeneralSettings: builder.query({
      query: () => API_ENDPOINTS.ADMIN.SETTINGS.GENERAL,
      providesTags: ['Settings'],
    }),

    updateGeneralSettings: builder.mutation({
      query: (settingsData) => ({
        url: API_ENDPOINTS.ADMIN.SETTINGS.GENERAL,
        method: 'PUT',
        body: settingsData,
      }),
      invalidatesTags: ['Settings'],
    }),

    getSeoSettings: builder.query({
      query: () => API_ENDPOINTS.ADMIN.SETTINGS.SEO,
      providesTags: ['Settings'],
    }),

    updateSeoSettings: builder.mutation({
      query: (seoData) => ({
        url: API_ENDPOINTS.ADMIN.SETTINGS.SEO,
        method: 'PUT',
        body: seoData,
      }),
      invalidatesTags: ['Settings'],
    }),
  }),
});

// Export hooks for use in components
export const {
  // Authentication
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useRefreshTokenMutation,
  useVerifyTokenQuery,

  // Profile
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useChangeAdminPasswordMutation,
  useUploadAdminAvatarMutation,

  // Dashboard
  useGetAdminDashboardQuery,
  useGetDashboardStatsQuery,
  useGetDashboardAnalyticsQuery,

  // Projects
  useGetAdminProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,

  // Skills
  useGetAdminSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,

  // Experience
  useGetAdminExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,

  // File Upload
  useUploadImageMutation,
  useUploadProjectImageMutation,

  // Messages
  useGetContactMessagesQuery,
  useMarkMessageAsReadMutation,
  useDeleteMessageMutation,

  // Settings
  useGetGeneralSettingsQuery,
  useUpdateGeneralSettingsMutation,
  useGetSeoSettingsQuery,
  useUpdateSeoSettingsMutation,
} = adminApiSlice;
