import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../../../config/api';

export const subscriberApiSlice = createApi({
  reducerPath: 'subscriberApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/subscribers`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      // Look for token in both possible locations
      const token = state.adminAuth?.adminToken || state.auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Subscribers'],
  endpoints: (builder) => ({
    subscribe: builder.mutation({
      query: (email) => ({
        url: '/',
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['Subscribers'],
    }),
    getSubscribers: builder.query({
      query: () => '/',
      providesTags: ['Subscribers'],
    }),
    unsubscribe: builder.mutation({
      query: (email) => ({
        url: '/unsubscribe',
        method: 'PUT',
        body: { email }
      }),
      invalidatesTags: ['Subscribers']
    })
  }),
});

export const {
  useSubscribeMutation,
  useGetSubscribersQuery,
  useUnsubscribeMutation
} = subscriberApiSlice;
