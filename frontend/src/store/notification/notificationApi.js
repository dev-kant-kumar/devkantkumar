import { baseApiSlice } from '../api/baseApiSlice';

/**
 * Notification API endpoints using RTK Query
 * Extends the base API slice with notification-specific endpoints
 */
export const notificationApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get notifications with pagination
     */
    getNotifications: builder.query({
      query: ({ page = 1, limit = 20, unreadOnly = false, type = null } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          unreadOnly: unreadOnly.toString(),
        });
        if (type) params.append('type', type);
        return `/notifications?${params.toString()}`;
      },
      providesTags: (result) =>
        result?.notifications
          ? [
              ...result.notifications.map(({ _id }) => ({ type: 'Notification', id: _id })),
              { type: 'Notification', id: 'LIST' },
            ]
          : [{ type: 'Notification', id: 'LIST' }],
    }),

    /**
     * Get unread notification count
     */
    getUnreadCount: builder.query({
      query: () => '/notifications/unread-count',
      providesTags: [{ type: 'Notification', id: 'COUNT' }],
    }),

    /**
     * Mark a single notification as read
     */
    markAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}/read`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, notificationId) => [
        { type: 'Notification', id: notificationId },
        { type: 'Notification', id: 'COUNT' },
      ],
    }),

    /**
     * Mark all notifications as read
     */
    markAllAsRead: builder.mutation({
      query: () => ({
        url: '/notifications/mark-all-read',
        method: 'PUT',
      }),
      invalidatesTags: [{ type: 'Notification', id: 'LIST' }, { type: 'Notification', id: 'COUNT' }],
    }),

    /**
     * Delete a single notification
     */
    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, notificationId) => [
        { type: 'Notification', id: notificationId },
        { type: 'Notification', id: 'LIST' },
        { type: 'Notification', id: 'COUNT' },
      ],
    }),

    /**
     * Clear all notifications
     */
    clearAllNotifications: builder.mutation({
      query: () => ({
        url: '/notifications/clear-all',
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Notification', id: 'LIST' }, { type: 'Notification', id: 'COUNT' }],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
  useClearAllNotificationsMutation,
} = notificationApiSlice;
