import { baseApiSlice } from "../../../../store/api/baseApiSlice";

/**
 * Support Ticket API Slice
 * Handles all user-facing support ticket CRUD + chat operations
 */
export const supportApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Submit a new support ticket (works for both guest and logged-in users)
    submitSupportTicket: builder.mutation({
      query: (data) => ({
        url: "/marketplace/support",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "SupportTicket", id: "LIST" }],
    }),

    // Get current user's tickets (authenticated)
    getMyTickets: builder.query({
      query: ({ status, page = 1, limit = 20 } = {}) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        if (status && status !== "all") params.append("status", status);
        return `/marketplace/support/my-tickets?${params.toString()}`;
      },
      providesTags: (result) =>
        result?.data?.tickets
          ? [
              ...result.data.tickets.map(({ _id }) => ({
                type: "SupportTicket",
                id: _id,
              })),
              { type: "SupportTicket", id: "LIST" },
            ]
          : [{ type: "SupportTicket", id: "LIST" }],
    }),

    // Get single ticket with full chat history (authenticated)
    getMyTicketById: builder.query({
      query: (id) => `/marketplace/support/my-tickets/${id}`,
      providesTags: (result, error, id) => [{ type: "SupportTicket", id }],
    }),

    // Reply to own ticket (chat message)
    replyToTicket: builder.mutation({
      query: ({ id, message }) => ({
        url: `/marketplace/support/my-tickets/${id}/reply`,
        method: "POST",
        body: { message },
      }),
      // Optimistic update: add message immediately
      async onQueryStarted(
        { id, message },
        { dispatch, queryFulfilled, getState },
      ) {
        // Get current user info
        const user = getState().auth?.user;
        const optimisticResponse = {
          message,
          sender: "user",
          senderName: user
            ? `${user.firstName} ${user.lastName}`.trim()
            : "You",
          isRead: false,
          timestamp: new Date().toISOString(),
          _optimistic: true,
        };

        // Optimistically add the message to the ticket
        const patchResult = dispatch(
          supportApi.util.updateQueryData("getMyTicketById", id, (draft) => {
            if (draft?.data?.responses) {
              draft.data.responses.push(optimisticResponse);
            }
          }),
        );

        try {
          await queryFulfilled;
          // Invalidate to get server-confirmed data
          dispatch(
            supportApi.util.invalidateTags([{ type: "SupportTicket", id }]),
          );
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "SupportTicket", id: "LIST" },
      ],
    }),

    // Get support page settings (FAQs, categories, etc.) — public
    getSupportSettings: builder.query({
      query: () => "/marketplace/support/settings",
      keepUnusedDataFor: 300, // cache for 5 minutes
    }),
  }),
});

export const {
  useSubmitSupportTicketMutation,
  useGetMyTicketsQuery,
  useGetMyTicketByIdQuery,
  useReplyToTicketMutation,
  useGetSupportSettingsQuery,
} = supportApi;
