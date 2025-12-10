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
      invalidatesTags: ['User'],
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
} = authApi;
