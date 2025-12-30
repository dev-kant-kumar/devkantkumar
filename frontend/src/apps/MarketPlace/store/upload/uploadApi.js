import { API_ENDPOINTS } from "../../../../config/api";
import { baseApiSlice } from "../../../../store/api/baseApiSlice";

export const uploadApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('image', file);
        return {
          url: API_ENDPOINTS.UPLOAD.IMAGE,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [],
    }),
  }),
});

export const {
  useUploadImageMutation,
} = uploadApi;
