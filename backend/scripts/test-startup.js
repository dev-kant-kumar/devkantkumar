// Simple startup test to verify all modules can be loaded
require('dotenv').config();

console.log('Testing server startup...');

try {
  // Test environment variables
  const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    console.error('❌ Missing environment variables:', missingEnvVars.join(', '));
    process.exit(1);
  }
  console.log('✅ Environment variables check passed');

  // Test module imports
  const express = require('express');
  console.log('✅ Express imported successfully');

  const connectDB = require('./src/db/connection');
  console.log('✅ Database connection module imported');

  const { connectRedis } = require('./src/db/redis');
  console.log('✅ Redis connection module imported');

  const logger = require('./src/utils/logger');
  console.log('✅ Logger imported successfully');

  // Test route imports
  const authRoutes = require('./src/routes/authRoutes');
  const userRoutes = require('./src/routes/userRoutes');
  const portfolioRoutes = require('./src/routes/portfolioRoutes');
  const marketplaceRoutes = require('./src/routes/marketplaceRoutes');
  const adminRoutes = require('./src/routes/adminRoutes');
  const uploadRoutes = require('./src/routes/uploadRoutes');
  console.log('✅ All route modules imported successfully');

  // Test middleware imports
  const { protect } = require('./src/middlewares/auth');
  const adminAuth = require('./src/middlewares/adminAuth');
  const errorHandler = require('./src/middlewares/errorHandler');
  const notFound = require('./src/middlewares/notFound');
  console.log('✅ All middleware modules imported successfully');

  // Test model imports
  const User = require('./src/models/User');
  const Product = require('./src/models/Product');
  const Service = require('./src/models/Service');
  const Order = require('./src/models/Order');
  console.log('✅ All model modules imported successfully');

  // Test service imports
  const emailService = require('./src/services/emailService');
  const paymentService = require('./src/services/paymentService');
  const cacheService = require('./src/services/cacheService');
  const cloudinaryService = require('./src/services/cloudinaryService');
  console.log('✅ All service modules imported successfully');

  console.log('\n🎉 All modules loaded successfully! Server should start without import errors.');

} catch (error) {
  console.error('❌ Startup test failed:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}
