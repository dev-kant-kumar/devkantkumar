const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const { getRedisClient } = require("../db/redis");

let io = null;

const getAllowedOrigins = () => {
  if (process.env.ALLOWED_ORIGINS) {
    return process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
  }
  return [
    "https://devkantkumar.com",
    "https://www.devkantkumar.com",
    "https://api.devkantkumar.com",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
  ];
};

/**
 * Initialize Socket.io with the HTTP server
 */
const initializeSocket = (httpServer) => {
  const allowedOrigins = getAllowedOrigins();

  io = new Server(httpServer, {
    cors: {
      origin: (origin, callback) => {
        if (
          !origin ||
          allowedOrigins.includes(origin) ||
          process.env.NODE_ENV === "development"
        ) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Attach Redis adapter so socket events propagate across all Node.js processes
  // behind a load balancer.  The adapter uses pub/sub on a dedicated client so the
  // main redis connection is never saturated by socket traffic.
  const redisClient = getRedisClient();
  if (redisClient) {
    try {
      const pubClient = redisClient.duplicate();
      const subClient = redisClient.duplicate();
      Promise.all([pubClient.connect(), subClient.connect()])
        .then(() => {
          io.adapter(createAdapter(pubClient, subClient));
          logger.info("Socket.io Redis adapter attached — events propagate across all instances");
        })
        .catch((err) => {
          logger.warn(`Socket.io Redis adapter setup failed, running single-instance: ${err.message}`);
        });
    } catch (err) {
      logger.warn(`Socket.io Redis adapter init error: ${err.message}`);
    }
  } else {
    logger.warn("Redis unavailable — Socket.io running without Redis adapter (single-instance only)");
  }

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth.token ||
        socket.handshake.headers.authorization?.split(" ")[1];

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.userRole = decoded.role;
      socket.userEmail = decoded.email;

      next();
    } catch (error) {
      logger.error("Socket authentication failed:", error.message);
      next(new Error("Invalid token"));
    }
  });

  // Connection handler
  io.on("connection", (socket) => {
    const { userId, userRole } = socket;

    logger.info(
      `Socket connected: ${socket.id} - User: ${userId} - Role: ${userRole}`,
    );

    // Join user-specific room
    socket.join(`user:${userId}`);

    // Join admin room if admin
    if (userRole === "admin") {
      socket.join("admin");
      logger.info(`Admin ${userId} joined admin room`);
    }

    // Handle manual room joining (for reconnection)
    socket.on("join:user", (roomUserId) => {
      if (roomUserId === userId) {
        socket.join(`user:${userId}`);
      }
    });

    // ==========================================
    // SUPPORT TICKET CHAT EVENTS
    // ==========================================

    // Join a specific ticket room (for real-time chat)
    socket.on("support:join", (ticketId) => {
      socket.join(`ticket:${ticketId}`);
      logger.info(`User ${userId} joined ticket room: ticket:${ticketId}`);
    });

    // Leave a ticket room
    socket.on("support:leave", (ticketId) => {
      socket.leave(`ticket:${ticketId}`);
      logger.info(`User ${userId} left ticket room: ticket:${ticketId}`);
    });

    // Typing indicator for support chat
    socket.on("support:typing", ({ ticketId, isTyping }) => {
      socket.to(`ticket:${ticketId}`).emit("support:typing", {
        ticketId,
        userId,
        userRole,
        isTyping,
      });
    });

    // Handle disconnection
    socket.on("disconnect", (reason) => {
      logger.info(
        `Socket disconnected: ${socket.id} - User: ${userId} - Reason: ${reason}`,
      );
    });

    // Handle errors
    socket.on("error", (error) => {
      logger.error(`Socket error for ${socket.id}:`, error);
    });
  });

  logger.info("Socket.io initialized");
  return io;
};

/**
 * Get the Socket.io instance
 */
const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized. Call initializeSocket first.");
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
    io.to("admin").emit(event, data);
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
 * Emit to a specific ticket room (for real-time chat)
 */
const emitToTicketRoom = (ticketId, event, data) => {
  if (io) {
    io.to(`ticket:${ticketId}`).emit(event, data);
    logger.debug(`Emitted ${event} to ticket:${ticketId}`);
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
  emitToTicketRoom,
  getOnlineUsersCount,
  isUserOnline,
};
