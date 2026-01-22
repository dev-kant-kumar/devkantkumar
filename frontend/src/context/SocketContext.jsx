import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { API_URL } from '../config/api';
import { baseApiSlice } from '../store/api/baseApiSlice';
import {
    addNotification,
    setSocketConnected,
    setUnreadCount,
    showNotificationToast,
} from '../store/notification/notificationSlice';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

/**
 * Socket Provider for managing real-time WebSocket connections
 * Handles notification events and dispatches to Redux store
 */
export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  // Get auth tokens from different auth slices
  const marketplaceToken = useSelector((state) => state.auth?.token);
  const adminToken = useSelector((state) => state.adminAuth?.adminToken);
  const token = marketplaceToken || adminToken;

  const isAuthenticated = !!token;

  // Connect to Socket.io server
  const connect = useCallback(() => {
    if (!token || socketRef.current?.connected) return;

    const socketUrl = API_URL.replace('/api/v1', '');

    socketRef.current = io(socketUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });

    socketRef.current.on('connect', () => {
      console.log('🔌 Socket connected:', socketRef.current.id);
      dispatch(setSocketConnected(true));
    });

    socketRef.current.on('disconnect', (reason) => {
      console.log('🔌 Socket disconnected:', reason);
      dispatch(setSocketConnected(false));
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('🔌 Socket connection error:', error.message);
      dispatch(setSocketConnected(false));
    });

    // Handle new notification
    socketRef.current.on('notification:new', (notification) => {
      console.log('📬 New notification received:', notification);

      // Add to Redux store
      dispatch(addNotification(notification));

      // Show toast notification
      dispatch(showNotificationToast(notification));

      // Invalidate RTK Query cache to refetch
      dispatch(baseApiSlice.util.invalidateTags([
        { type: 'Notification', id: 'LIST' },
        { type: 'Notification', id: 'COUNT' },
      ]));
    });

    // Handle unread count update
    socketRef.current.on('notification:count', (count) => {
      dispatch(setUnreadCount(count));
    });

  }, [token, dispatch]);

  // Disconnect from Socket.io server
  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      dispatch(setSocketConnected(false));
    }
  }, [dispatch]);

  // Auto-connect when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [isAuthenticated, connect, disconnect]);

  // Emit event helper
  const emit = useCallback((event, data) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    }
  }, []);

  const value = {
    socket: socketRef.current,
    isConnected: socketRef.current?.connected || false,
    connect,
    disconnect,
    emit,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
