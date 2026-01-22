import { baseApiSlice } from "../../../../store/api/baseApiSlice";

export const reviewsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: ({ productId, serviceId }) => ({
        url: productId
          ? `/marketplace/products/${productId}/reviews`
          : `/marketplace/services/${serviceId}/reviews`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => {
        if (arg.productId) return [{ type: 'Review', id: `Product-${arg.productId}` }];
        if (arg.serviceId) return [{ type: 'Review', id: `Service-${arg.serviceId}` }];
        return ['Review'];
      }
    }),
    addReview: builder.mutation({
      query: ({ productId, serviceId, ...reviewData }) => ({
        url: productId
          ? `/marketplace/products/${productId}/reviews`
          : `/marketplace/services/${serviceId}/reviews`,
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: (result, error, arg) => {
        const tags = ['Review'];
        if (arg.productId) tags.push({ type: 'Review', id: `Product-${arg.productId}` }, { type: 'Product', id: arg.productId });
        if (arg.serviceId) tags.push({ type: 'Review', id: `Service-${arg.serviceId}` }, { type: 'Service', id: arg.serviceId });
        return tags;
      }
    }),
    deleteReview: builder.mutation({
      query: ({ reviewId, productId, serviceId }) => ({
        url: productId
          ? `/marketplace/products/${productId}/reviews/${reviewId}`
          : `/marketplace/services/${serviceId}/reviews/${reviewId}`, // Nested route not defined for Delete in plan? Wait, I defined /:id route in global reviewRoutes.js
        // Actually, my reviewRoutes.js merged params.
        // But the global route `router.route('/:id')` handles update/delete.
        // So I can use /api/v1/marketplace/reviews/:id if I mounted it there?
        // In marketplaceRoutes.js, I mounted `router.use('/products/:productId/reviews', reviewRouter)`.
        // So the delete path would be `/marketplace/products/:productId/reviews/:id`.
        // This works because reviewRouter likely handles `/:id` relative to mount point.
        // Let's check reviewRoutes.js content again.
        method: 'DELETE',
      }),
      invalidatesTags: ['Review']
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
} = reviewsApiSlice;
