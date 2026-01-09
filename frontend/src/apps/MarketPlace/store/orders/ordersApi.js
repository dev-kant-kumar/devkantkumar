import { API_ENDPOINTS } from "../../../../config/api";
import { baseApiSlice } from "../../../../store/api/baseApiSlice";

export const ordersApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all user orders
    getUserOrders: builder.query({
      query: () => API_ENDPOINTS.MARKETPLACE.ORDERS,
      providesTags: ['Orders'],
    }),

    // Get single order by ID
    getOrderById: builder.query({
      query: (orderId) => `${API_ENDPOINTS.MARKETPLACE.ORDERS}/${orderId}`,
      providesTags: (result, error, orderId) => [{ type: 'Order', id: orderId }],
    }),

    // Get order messages
    getOrderMessages: builder.query({
      query: (orderId) => `${API_ENDPOINTS.MARKETPLACE.ORDERS}/${orderId}/messages`,
      providesTags: (result, error, orderId) => [{ type: 'OrderMessages', id: orderId }],
    }),

    // Send message to order
    sendOrderMessage: builder.mutation({
      query: ({ orderId, message, attachments }) => ({
        url: `${API_ENDPOINTS.MARKETPLACE.ORDERS}/${orderId}/messages`,
        method: 'POST',
        body: { message, attachments },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'OrderMessages', id: orderId },
        { type: 'Order', id: orderId },
      ],
    }),

    // Download purchased item
    downloadItem: builder.query({
      query: ({ orderId, itemId }) => ({
        url: `${API_ENDPOINTS.MARKETPLACE.ORDERS}/${orderId}/download/${itemId}`,
        responseHandler: async (response) => {
          // For download, we want to return redirect info or blob
          if (response.redirected) {
            return { redirectUrl: response.url };
          }
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            return response.json();
          }
          return { blob: await response.blob() };
        },
      }),
    }),

    // Regenerate download links
    regenerateDownloadLinks: builder.mutation({
      query: ({ orderId, itemId }) => ({
        url: `${API_ENDPOINTS.MARKETPLACE.ORDERS}/${orderId}/regenerate/${itemId}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { orderId }) => [{ type: 'Order', id: orderId }],
    }),

    // Create Razorpay order
    createPaymentOrder: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.MARKETPLACE.PAYMENT.CREATE_ORDER,
        method: 'POST',
        body: data,
      }),
    }),

    // Verify payment
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.MARKETPLACE.PAYMENT.VERIFY,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Orders', 'Cart'],
    }),
  }),
});

export const {
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrderMessagesQuery,
  useSendOrderMessageMutation,
  useLazyDownloadItemQuery,
  useRegenerateDownloadLinksMutation,
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
} = ordersApi;
