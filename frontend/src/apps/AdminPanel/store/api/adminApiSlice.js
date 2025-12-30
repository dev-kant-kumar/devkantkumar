import { API_ENDPOINTS } from "../../../../config/api";
import { baseApiSlice } from "../../../../store/api/baseApiSlice";

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
      query: () => API_ENDPOINTS.ADMIN.PROFILE,
      providesTags: ['Admin', 'User'],
      transformResponse: (response) => response.data,
    }),

    updateAdminProfile: builder.mutation({
      query: (profileData) => ({
        url: API_ENDPOINTS.ADMIN.UPDATE_PROFILE,
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['Admin', 'User'],
    }),

    changeAdminPassword: builder.mutation({
      query: (passwordData) => ({
        url: API_ENDPOINTS.ADMIN.CHANGE_PASSWORD,
        method: 'POST',
        body: passwordData,
      }),
      invalidatesTags: ['Auth'],
    }),

    uploadAdminAvatar: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.ADMIN.UPLOAD_AVATAR,
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['Admin', 'User'],
    }),

    // ===================
    // UPLOAD ENDPOINTS
    // ===================
    // Removed duplicate uploadImage here. Using the one defined later.

    uploadFiles: builder.mutation({
      query: (formData) => ({
        url: '/upload/multiple',
        method: 'POST',
        body: formData,
      }),
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
    // ===================
    // FILE UPLOAD ENDPOINTS
    // ===================
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: '/upload/image',
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
      query: () => API_ENDPOINTS.ADMIN.GENERAL_SETTINGS,
      providesTags: ['Settings'],
    }),

    updateGeneralSettings: builder.mutation({
      query: (settingsData) => ({
        url: API_ENDPOINTS.ADMIN.GENERAL_SETTINGS,
        method: 'PUT',
        body: settingsData,
      }),
      invalidatesTags: ['Settings'],
    }),

    getSeoSettings: builder.query({
      query: () => API_ENDPOINTS.ADMIN.SEO_SETTINGS,
      providesTags: ['Settings'],
    }),

    updateSeoSettings: builder.mutation({
      query: (seoData) => ({
        url: API_ENDPOINTS.ADMIN.SEO_SETTINGS,
        method: 'PUT',
        body: seoData,
      }),
      invalidatesTags: ['Settings'],
    }),
    // ===================
    // MARKETPLACE ENDPOINTS
    // ===================

    // Products
    getAdminProducts: builder.query({
      query: (params) => ({
        url: API_ENDPOINTS.ADMIN.MARKETPLACE.PRODUCTS,
        params,
      }),
      providesTags: ['Product'],
    }),

    getAdminProductById: builder.query({
      query: (id) => `${API_ENDPOINTS.ADMIN.MARKETPLACE.PRODUCTS}/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    createProduct: builder.mutation({
      query: (productData) => ({
        url: API_ENDPOINTS.ADMIN.MARKETPLACE.PRODUCTS,
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...productData }) => ({
        url: `${API_ENDPOINTS.ADMIN.MARKETPLACE.PRODUCTS}/${id}`,
        method: 'PUT',
        body: productData,
      }),
      invalidatesTags: ['Product'],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS.ADMIN.MARKETPLACE.PRODUCTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    // Services
    getAdminServices: builder.query({
      query: (params) => ({
        url: API_ENDPOINTS.ADMIN.MARKETPLACE.SERVICES,
        params,
      }),
      providesTags: ['Service'],
    }),

    getAdminServiceById: builder.query({
      query: (id) => `${API_ENDPOINTS.ADMIN.MARKETPLACE.SERVICES}/${id}`,
      providesTags: (result, error, id) => [{ type: 'Service', id }],
    }),

    createService: builder.mutation({
      query: (serviceData) => ({
        url: API_ENDPOINTS.ADMIN.MARKETPLACE.SERVICES,
        method: 'POST',
        body: serviceData,
      }),
      invalidatesTags: ['Service'],
    }),

    updateService: builder.mutation({
      query: ({ id, ...serviceData }) => ({
        url: `${API_ENDPOINTS.ADMIN.MARKETPLACE.SERVICES}/${id}`,
        method: 'PUT',
        body: serviceData,
      }),
      invalidatesTags: ['Service'],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS.ADMIN.MARKETPLACE.SERVICES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Service'],
    }),

    // Orders
    getAdminOrders: builder.query({
      query: (params) => ({
        url: API_ENDPOINTS.ADMIN.MARKETPLACE.ORDERS,
        params,
      }),
      providesTags: ['Order'],
    }),

    updateAdminOrderStatus: builder.mutation({
      query: ({ id, ...statusData }) => ({
        url: `${API_ENDPOINTS.ADMIN.MARKETPLACE.ORDERS}/${id}`,
        method: 'PUT',
        body: statusData,
      }),
      invalidatesTags: ['Order'],
    }),

    getMarketplaceStats: builder.query({
      query: () => '/admin/marketplace/stats',
      providesTags: ['Order', 'Product', 'Service'],
    }),

    // Customers
    getCustomers: builder.query({
      query: (params) => ({
        url: '/admin/customers',
        params,
      }),
      providesTags: ['Customer'],
    }),

    getCustomerById: builder.query({
      query: (id) => `/admin/customers/${id}`,
      providesTags: (result, error, id) => [{ type: 'Customer', id }],
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
  useUploadFilesMutation,
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

  // Marketplace
  useGetAdminProductsQuery,
  useGetAdminProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAdminServicesQuery,
  useGetAdminServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetAdminOrdersQuery,
  useUpdateAdminOrderStatusMutation,
  useGetMarketplaceStatsQuery,
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
} = adminApiSlice;
