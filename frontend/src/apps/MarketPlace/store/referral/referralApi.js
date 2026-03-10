import { API_ENDPOINTS } from '../../../../config/api';
import { baseApiSlice } from '../../../../store/api/baseApiSlice';

export const referralApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get referral program info (public)
    getReferralProgram: builder.query({
      query: () => API_ENDPOINTS.REFERRAL.PROGRAM,
    }),

    // Get current user's referral data
    getMyReferral: builder.query({
      query: () => API_ENDPOINTS.REFERRAL.ME,
      providesTags: ['Referral'],
    }),

    // Get referral conversions history
    getReferralConversions: builder.query({
      query: () => API_ENDPOINTS.REFERRAL.CONVERSIONS,
      providesTags: ['Referral'],
    }),

    // Get payout history
    getReferralPayouts: builder.query({
      query: () => API_ENDPOINTS.REFERRAL.PAYOUTS,
      providesTags: ['Referral'],
    }),

    // Request a payout
    requestPayout: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.REFERRAL.REQUEST_PAYOUT,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Referral'],
    }),

    // Admin: Get all referrals
    adminGetAllReferrals: builder.query({
      query: (params = {}) => {
        const { page = 1, limit = 20 } = params;
        return `${API_ENDPOINTS.REFERRAL.ADMIN.ALL}?page=${page}&limit=${limit}`;
      },
      providesTags: ['Referral'],
    }),

    // Admin: Get pending payouts
    adminGetPendingPayouts: builder.query({
      query: () => API_ENDPOINTS.REFERRAL.ADMIN.PENDING_PAYOUTS,
      providesTags: ['Referral'],
    }),

    // Admin: Process a payout
    adminProcessPayout: builder.mutation({
      query: ({ referralId, payoutId, ...data }) => ({
        url: `${API_ENDPOINTS.REFERRAL.ADMIN.PROCESS_PAYOUT}/${referralId}/${payoutId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Referral'],
    }),
  }),
});

export const {
  useGetReferralProgramQuery,
  useGetMyReferralQuery,
  useGetReferralConversionsQuery,
  useGetReferralPayoutsQuery,
  useRequestPayoutMutation,
  useAdminGetAllReferralsQuery,
  useAdminGetPendingPayoutsQuery,
  useAdminProcessPayoutMutation,
} = referralApi;
