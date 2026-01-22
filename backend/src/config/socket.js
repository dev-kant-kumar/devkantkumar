const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

let io = null;

/**
 * Initialize Socket.io with the HTTP server
 */
const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true
    },
    pingTimeout: 60000,
    pingInterval: 25000
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        return next(new Error('Authentication required'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.userRole = decoded.role;
      socket.userEmail = decoded.email;

      next();
    } catch (error) {
      logger.error('Socket authentication failed:', error.message);
      next(new Error('Invalid token'));
    }
  });

  // Connection handler
  io.on('connection', (socket) => {
    const { userId, userRole } = socket;

    logger.info(`Socket connected: ${socket.id} - User: ${userId} - Role: ${userRole}`);

    // Join user-specific room
    socket.join(`user:${userId}`);

    // Join admin room if admin
    if (userRole === 'admin') {
      socket.join('admin');
      logger.info(`Admin ${userId} joined admin room`);
    }

    // Handle manual room joining (for reconnection)
    socket.on('join:user', (roomUserId) => {
      if (roomUserId === userId) {
        socket.join(`user:${userId}`);
      }
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      logger.info(`Socket disconnected: ${socket.id} - User: ${userId} - Reason: ${reason}`);
    });

    // Handle errors
    socket.on('error', (error) => {
      logger.error(`Socket error for ${socket.id}:`, error);
    });
  });

  logger.info('Socket.io initialized');
  return io;
};

/**
 * Get the Socket.io instance
 */
const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized. Call initializeSocket first.');
  }
  return io;
};

/**
 * Emit notification to a specific user
 */
const emitToUser = (userId, event, data) => {
  if (io) {
    io.to(`user:${userId}`).emit(event, data);
    logger.debug(`Emitted ${event} to user:${userId}`);
  }
};

/**
 * Emit notification to all admins
 */
const emitToAdmins = (event, data) => {
  if (io) {
    io.to('admin').emit(event, data);
    logger.debug(`Emitted ${event} to admin room`);
  }
};

/**
 * Emit to all connected clients
 */
const emitToAll = (event, data) => {
  if (io) {
    io.emit(event, data);
    logger.debug(`Emitted ${event} to all clients`);
  }
};

/**
 * Get online users count
 */
const getOnlineUsersCount = () => {
  if (!io) return 0;
  return io.sockets.sockets.size;
};

/**
 * Check if a user is online
 */
const isUserOnline = (userId) => {
  if (!io) return false;
  const room = io.sockets.adapter.rooms.get(`user:${userId}`);
  return room && room.size > 0;
};

module.exports = {
  initializeSocket,
  getIO,
  emitToUser,
  emitToAdmins,
  emitToAll,
  getOnlineUsersCount,
  isUserOnline
};
