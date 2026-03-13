const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const mongoURI = process.env.NODE_ENV === 'test'
      ? process.env.MONGODB_URI_TEST
      : process.env.MONGODB_URI;

    const options = {
      // Raise the pool ceiling for high-concurrency production deployments.
      // 50 connections sustains ~10 K concurrent users when each request holds a
      // connection for ~5 ms on average (50 conns × 200 req/s per conn = 10 K RPS).
      maxPoolSize: process.env.NODE_ENV === 'production' ? 50 : 10,
      // Keep a warm minimum so the first burst of requests never waits for
      // connection establishment.
      minPoolSize: process.env.NODE_ENV === 'production' ? 5 : 1,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    };

    if (process.env.NODE_ENV === 'production') {
      options.retryWrites = true;
      options.w = 'majority';
    }

    const conn = await mongoose.connect(mongoURI, options);

    logger.info(`MongoDB connected to ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
