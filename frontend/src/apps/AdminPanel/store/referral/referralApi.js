import { API_ENDPOINTS } from '../../../../config/api';
import { baseApiSlice } from '../../../../store/api/baseApiSlice';

export const adminReferralApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Admin: Get all referrals
    adminGetAllReferrals: builder.query({
      query: (params = {}) => {
        const { page = 1, limit = 50 } = params;
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
  useAdminGetAllReferralsQuery,
  useAdminGetPendingPayoutsQuery,
  useAdminProcessPayoutMutation,
} = adminReferralApi;
