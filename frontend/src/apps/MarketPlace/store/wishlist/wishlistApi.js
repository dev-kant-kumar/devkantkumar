import { baseApiSlice } from "../../../../store/api/baseApiSlice";

export const wishlistApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => "/users/favorites",
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation({
      query: ({ itemId, type }) => ({
        url: `/users/favorites/${itemId}`,
        method: "POST",
        body: { type },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: ({ itemId, type }) => ({
        url: `/users/favorites/${itemId}`,
        method: "DELETE",
        body: { type },
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
