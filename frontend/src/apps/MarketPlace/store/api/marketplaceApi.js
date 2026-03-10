import { baseApiSlice } from "../../../../store/api/baseApiSlice";

/**
 * Marketplace API Slice
 *
 * RTK Query endpoints for fetching products and services from the backend.
 * Uses the baseApiSlice pattern for consistent configuration and caching.
 */
export const marketplaceApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Services
    getServices: builder.query({
      query: ({ page = 1, limit = 12, category, minPrice, maxPrice, search } = {}) => {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', limit);
        if (category && category !== 'all') params.append('category', category);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (search) params.append('search', search);

        return `/marketplace/services?${params.toString()}`;
      },
      providesTags: (result) =>
        result?.services
          ? [
              ...result.services.map(({ _id }) => ({ type: 'Service', id: _id })),
              { type: 'Service', id: 'LIST' },
            ]
          : [{ type: 'Service', id: 'LIST' }],
    }),

    getServiceById: builder.query({
      query: (id) => `/marketplace/services/${id}`,
      providesTags: (result, error, id) => [{ type: 'Service', id }],
    }),

    // Products
    getProducts: builder.query({
      query: ({ page = 1, limit = 12, category, minPrice, maxPrice, search } = {}) => {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', limit);
        if (category && category !== 'all') params.append('category', category);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (search) params.append('search', search);

        return `/marketplace/products?${params.toString()}`;
      },
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map(({ _id }) => ({ type: 'Product', id: _id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    getProductById: builder.query({
      query: (id) => `/marketplace/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    // Reviews
    getProductReviews: builder.query({
      query: (productId) => `/marketplace/products/${productId}/reviews`,
      providesTags: (result, error, productId) => [{ type: 'Reviews', id: `product-${productId}` }],
    }),

    getServiceReviews: builder.query({
      query: (serviceId) => `/marketplace/services/${serviceId}/reviews`,
      providesTags: (result, error, serviceId) => [{ type: 'Reviews', id: `service-${serviceId}` }],
    }),

    createReview: builder.mutation({
      query: ({ productId, serviceId, rating, comment }) => ({
        url: productId
          ? `/marketplace/products/${productId}/reviews`
          : `/marketplace/services/${serviceId}/reviews`,
        method: 'POST',
        body: { rating, comment },
      }),
      invalidatesTags: (result, error, { productId, serviceId }) => [
        ...(productId ? [{ type: 'Reviews', id: `product-${productId}` }, { type: 'Product', id: productId }] : []),
        ...(serviceId ? [{ type: 'Reviews', id: `service-${serviceId}` }, { type: 'Service', id: serviceId }] : []),
      ],
    }),

    updateReview: builder.mutation({
      query: ({ reviewId, productId, serviceId, rating, comment }) => ({
        url: productId
          ? `/marketplace/products/${productId}/reviews/${reviewId}`
          : `/marketplace/services/${serviceId}/reviews/${reviewId}`,
        method: 'PATCH',
        body: { rating, comment },
      }),
      invalidatesTags: (result, error, { productId, serviceId }) => [
        ...(productId ? [{ type: 'Reviews', id: `product-${productId}` }, { type: 'Product', id: productId }] : []),
        ...(serviceId ? [{ type: 'Reviews', id: `service-${serviceId}` }, { type: 'Service', id: serviceId }] : []),
      ],
    }),

    deleteReview: builder.mutation({
      query: ({ reviewId, productId, serviceId }) => ({
        url: productId
          ? `/marketplace/products/${productId}/reviews/${reviewId}`
          : `/marketplace/services/${serviceId}/reviews/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { productId, serviceId }) => [
        ...(productId ? [{ type: 'Reviews', id: `product-${productId}` }, { type: 'Product', id: productId }] : []),
        ...(serviceId ? [{ type: 'Reviews', id: `service-${serviceId}` }, { type: 'Service', id: serviceId }] : []),
      ],
    }),

    // Newsletter
    subscribe: builder.mutation({
      query: (data) => ({
        url: '/subscribers',
        method: 'POST',
        body: data,
      }),
    }),

    // Categories
    getCategories: builder.query({
      query: () => `/marketplace/categories`,
      providesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    // Search
    searchMarketplace: builder.query({
      query: ({ q, type } = {}) => {
        const params = new URLSearchParams();
        if (q) params.append('q', q);
        if (type) params.append('type', type);
        return `/marketplace/search?${params.toString()}`;
      },
      providesTags: () => [{ type: 'Product', id: 'SEARCH' }, { type: 'Service', id: 'SEARCH' }],
    }),

    // Coupons
    validateCoupon: builder.mutation({
      query: (data) => ({
        url: '/coupons/validate',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in components
export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useSearchMarketplaceQuery,
  useGetProductReviewsQuery,
  useGetServiceReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useSubscribeMutation,
  useValidateCouponMutation,
} = marketplaceApi;
