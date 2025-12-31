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

    verify2FALogin: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.AUTH.LOGIN_2FA,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth', 'Admin'],
    }),

    setup2FA: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.AUTH.SETUP_2FA,
        method: 'POST',
      }),
    }),

    verify2FASetup: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.AUTH.VERIFY_2FA,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    disable2FA: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.AUTH.DISABLE_2FA,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
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

    initiateEmailChange: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.ADMIN.INITIATE_EMAIL_CHANGE,
        method: 'POST',
        body: data,
      }),
    }),

    verifyEmailChangeOTP: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.ADMIN.VERIFY_EMAIL_CHANGE,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Admin', 'User'],
    }),

    // ===================
    // DASHBOARD ENDPOINTS
    // ===================
    getAdminDashboard: builder.query({
      query: () => API_ENDPOINTS.ADMIN.DASHBOARD_OVERVIEW,
      providesTags: ['Admin'],
    }),

    getDashboardStats: builder.query({
      query: () => API_ENDPOINTS.ADMIN.DASHBOARD_STATS,
      providesTags: ['Analytics'],
    }),

    getPortfolioStats: builder.query({
      query: () => '/portfolio/stats',
      providesTags: ['Project', 'Skill', 'Message'],
    }),

    getDashboardAnalytics: builder.query({
      query: (params) => ({
        url: API_ENDPOINTS.ADMIN.DASHBOARD_ANALYTICS,
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

    getProjectById: builder.query({
      query: (id) => `${API_ENDPOINTS.ADMIN.CONTENT.PROJECTS}/${id}`,
      providesTags: (result, error, id) => [{ type: 'Project', id }],
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

    // Blog Management
    getAdminBlogPosts: builder.query({
      query: () => API_ENDPOINTS.ADMIN.CONTENT.BLOG,
      providesTags: ['BlogPost'],
    }),

    getAdminBlogPostBySlug: builder.query({
      query: (slug) => `${API_ENDPOINTS.ADMIN.CONTENT.BLOG}/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'BlogPost', id: slug }],
    }),

    createBlogPost: builder.mutation({
      query: (blogData) => ({
        url: API_ENDPOINTS.ADMIN.CONTENT.BLOG,
        method: 'POST',
        body: blogData,
      }),
      invalidatesTags: ['BlogPost'],
    }),

    updateBlogPost: builder.mutation({
      query: ({ id, ...blogData }) => ({
        url: `${API_ENDPOINTS.ADMIN.CONTENT.BLOG}/${id}`,
        method: 'PUT',
        body: blogData,
      }),
      invalidatesTags: ['BlogPost'],
    }),

    deleteBlogPost: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS.ADMIN.CONTENT.BLOG}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BlogPost'],
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
        url: API_ENDPOINTS.ADMIN.UPLOAD_IMAGE,
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['Upload'],
    }),

    uploadFiles: builder.mutation({
      query: (formData) => ({
        url: '/api/v1/upload/multiple',
        method: 'POST',
        body: formData,
      }),
    }),

    uploadProjectImage: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.ADMIN.UPLOAD_PROJECT_IMAGE,
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
      query: () => API_ENDPOINTS.ADMIN.MESSAGES,
      providesTags: ['Message'],
    }),

    markMessageAsRead: builder.mutation({
      query: (messageId) => ({
        url: `${API_ENDPOINTS.ADMIN.MARK_MESSAGE_READ}/${messageId}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Message'],
    }),

    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `${API_ENDPOINTS.ADMIN.MESSAGES}/${messageId}`,
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

    initiatePasswordChange: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.ADMIN.INITIATE_PASSWORD_CHANGE,
        method: "POST",
        body: data,
      }),
    }),

    verifyPasswordChangeOTP: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.ADMIN.VERIFY_PASSWORD_CHANGE,
        method: "POST",
        body: data,
      }),
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

  // 2FA
  useVerify2FALoginMutation,
  useSetup2FAMutation,
  useVerify2FASetupMutation,
  useDisable2FAMutation,

  // Profile
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useChangeAdminPasswordMutation,
  useUploadAdminAvatarMutation,
  useInitiateEmailChangeMutation,
  useVerifyEmailChangeOTPMutation,
  useInitiatePasswordChangeMutation,
  useVerifyPasswordChangeOTPMutation,

  // Dashboard
  useGetAdminDashboardQuery,
  useGetDashboardStatsQuery,
  useGetDashboardAnalyticsQuery,
  useGetPortfolioStatsQuery,

  // Projects
  useGetAdminProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,

  // Blog
  useGetAdminBlogPostsQuery,
  useGetAdminBlogPostBySlugQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation,

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
