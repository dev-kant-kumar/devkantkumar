import { baseApiSlice } from "../../../../store/api/baseApiSlice";

/**
 * Email Tracking API Slice
 * RTK Query endpoints for email monitoring and management
 */
export const emailTrackingApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get email statistics
    getEmailStats: builder.query({
      query: (params = {}) => ({
        url: '/admin/emails/stats',
        params
      }),
      providesTags: ['EmailStats']
    }),

    // Get paginated email logs
    getEmailLogs: builder.query({
      query: (params = {}) => ({
        url: '/admin/emails',
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          status: params.status,
          type: params.type,
          search: params.search,
          sortBy: params.sortBy || 'createdAt',
          sortOrder: params.sortOrder || 'desc',
          startDate: params.startDate,
          endDate: params.endDate
        }
      }),
      providesTags: (result) =>
        result?.data?.emails
          ? [
              ...result.data.emails.map(({ _id }) => ({ type: 'EmailLog', id: _id })),
              { type: 'EmailLog', id: 'LIST' }
            ]
          : [{ type: 'EmailLog', id: 'LIST' }]
    }),

    // Get single email details
    getEmailById: builder.query({
      query: (id) => `/admin/emails/${id}`,
      providesTags: (result, error, id) => [{ type: 'EmailLog', id }]
    }),

    // Get all email types for filtering
    getEmailTypes: builder.query({
      query: () => '/admin/emails/types',
      providesTags: ['EmailTypes']
    }),

    // Retry a failed email
    retryEmail: builder.mutation({
      query: (id) => ({
        url: `/admin/emails/${id}/retry`,
        method: 'POST'
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'EmailLog', id },
        { type: 'EmailLog', id: 'LIST' },
        'EmailStats'
      ]
    }),

    // Cleanup old email logs
    cleanupEmailLogs: builder.mutation({
      query: (daysOld = 90) => ({
        url: '/admin/emails/cleanup',
        method: 'DELETE',
        body: { daysOld }
      }),
      invalidatesTags: [{ type: 'EmailLog', id: 'LIST' }, 'EmailStats']
    })
  })
});

export const {
  useGetEmailStatsQuery,
  useGetEmailLogsQuery,
  useGetEmailByIdQuery,
  useGetEmailTypesQuery,
  useRetryEmailMutation,
  useCleanupEmailLogsMutation
} = emailTrackingApiSlice;
