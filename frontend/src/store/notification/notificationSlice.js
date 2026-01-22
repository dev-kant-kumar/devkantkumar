import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  unreadCount: 0,
  isConnected: false,
  notifications: [],
  showToast: false,
  toastNotification: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
    incrementUnreadCount: (state) => {
      state.unreadCount += 1;
    },
    decrementUnreadCount: (state) => {
      if (state.unreadCount > 0) {
        state.unreadCount -= 1;
      }
    },
    resetUnreadCount: (state) => {
      state.unreadCount = 0;
    },
    setSocketConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    showNotificationToast: (state, action) => {
      state.showToast = true;
      state.toastNotification = action.payload;
    },
    hideNotificationToast: (state) => {
      state.showToast = false;
      state.toastNotification = null;
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  setUnreadCount,
  incrementUnreadCount,
  decrementUnreadCount,
  resetUnreadCount,
  setSocketConnected,
  addNotification,
  showNotificationToast,
  hideNotificationToast,
  clearNotifications,
} = notificationSlice.actions;

export const selectUnreadCount = (state) => state.notifications?.unreadCount || 0;
export const selectIsSocketConnected = (state) => state.notifications?.isConnected || false;
export const selectNotifications = (state) => state.notifications?.notifications || [];

// Memoized selector to prevent unnecessary rerenders
const selectShowToast = (state) => state.notifications?.showToast || false;
const selectToastNotification = (state) => state.notifications?.toastNotification;

export const selectToastState = createSelector(
  [selectShowToast, selectToastNotification],
  (show, notification) => ({ show, notification })
);

export default notificationSlice.reducer;
