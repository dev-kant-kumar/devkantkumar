import { baseApiSlice } from "../../../../store/api/baseApiSlice";

/**
 * Portfolio API Slice
 *
 * Extends the base API slice with Portfolio-specific endpoints.
 * This follows the scalable architecture where each panel extends the base API.
 */
export const portfolioApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Projects endpoints
    getProjects: builder.query({
      query: (params = {}) => ({
        url: "/portfolio/projects",
        params,
      }),
      providesTags: ["Project"],
    }),

    getProjectById: builder.query({
      query: (id) => `/portfolio/projects/${id}`,
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),

    // Skills endpoints
    getSkills: builder.query({
      query: () => "/portfolio/skills",
      providesTags: ["Skill"],
    }),

    // Blog endpoints
    getBlogPosts: builder.query({
      query: (params = {}) => ({
        url: "/portfolio/blog",
        params,
      }),
      providesTags: ["Blog"],
      transformResponse: (response) => {
        // Handle both direct array and wrapped response
        const posts = response?.data || response || [];
        return {
          data: posts,
          stats: {
            totalPosts: posts.length,
            totalReaders: "10K+",
            totalCategories: [...new Set(posts.map((post) => post.category))]
              .length,
          },
        };
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || "Failed to fetch blog posts",
      }),
    }),

    getBlogPostBySlug: builder.query({
      query: (slug) => `/portfolio/blog/${slug}`,
      providesTags: (result, error, slug) => [
        { type: "BlogPost", id: slug },
        "Blog",
      ],
      transformResponse: (response) => response?.data || response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || "Blog post not found",
      }),
    }),

    // Contact form endpoint
    submitContactForm: builder.mutation({
      query: (formData) => ({
        url: "/portfolio/contact",
        method: "POST",
        body: formData,
      }),
    }),

    // Newsletter subscription
    subscribeNewsletter: builder.mutation({
      query: (email) => ({
        url: "/portfolio/newsletter/subscribe",
        method: "POST",
        body: { email },
      }),
    }),

    // Analytics (if needed for portfolio)
    trackPageView: builder.mutation({
      query: (data) => ({
        url: "/analytics/pageview",
        method: "POST",
        body: data,
      }),
    }),
  }),

  // Override tags for portfolio-specific caching
  overrideExisting: false,
});

// Export hooks for use in components
export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useGetSkillsQuery,
  useGetBlogPostsQuery,
  useGetBlogPostBySlugQuery,
  useSubmitContactFormMutation,
  useSubscribeNewsletterMutation,
  useTrackPageViewMutation,
} = portfolioApiSlice;
