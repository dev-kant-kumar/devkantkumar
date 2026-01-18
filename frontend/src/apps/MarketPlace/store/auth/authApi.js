import { API_ENDPOINTS } from "../../../../config/api";
import { baseApiSlice } from "../../../../store/api/baseApiSlice";

export const authApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      // Note: Don't invalidate tags here - causes race condition.
      // Token is set via dispatch(setCredentials) after login returns.
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: API_ENDPOINTS.AUTH.REGISTER,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Auth'],
    }),
    getMe: builder.query({
      query: () => API_ENDPOINTS.AUTH.ME,
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.AUTH.UPDATE_PROFILE,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
        method: 'PUT',
        body: data,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.AUTH.REFRESH_TOKEN,
        method: 'POST',
      }),
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `${API_ENDPOINTS.AUTH.VERIFY_EMAIL}/${token}`,
        method: 'POST',
      }),
    }),
    resendVerification: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.AUTH.RESEND_VERIFICATION, // Ensure this constant exists or use raw string if needed, checking api.js next
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, ...data }) => ({
        url: `${API_ENDPOINTS.AUTH.RESET_PASSWORD}/${token}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteAccount: builder.mutation({
      query: ({ password, reason }) => ({
        url: API_ENDPOINTS.USERS.DELETE_ME,
        method: 'DELETE',
        body: { password, reason },
      }),
    }),
    reactivateAccount: builder.mutation({
      query: ({ email, password }) => ({
        url: API_ENDPOINTS.USERS.REACTIVATE,
        method: 'POST',
        body: { email, password },
      }),
    }),
    // 2FA Mutations
    setup2FA: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.AUTH.SETUP_2FA,
        method: 'POST',
      }),
    }),
    verify2FA: builder.mutation({
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
    addAddress: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.USERS.ADDRESSES,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateAddress: builder.mutation({
      query: ({ addressId, ...data }) => ({
        url: `${API_ENDPOINTS.USERS.ADDRESSES}/${addressId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteAddress: builder.mutation({
      query: (addressId) => ({
        url: `${API_ENDPOINTS.USERS.ADDRESSES}/${addressId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useRefreshTokenMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation,
  useReactivateAccountMutation,
  useSetup2FAMutation,
  useVerify2FAMutation,
  useDisable2FAMutation,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = authApi;
