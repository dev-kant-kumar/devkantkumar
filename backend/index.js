const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

// Import configurations
require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please check your .env file and ensure all required variables are set.');
  process.exit(1);
}

const connectDB = require('./src/db/connection');
const { connectRedis } = require('./src/db/redis');
const logger = require('./src/utils/logger');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const portfolioRoutes = require('./src/routes/portfolioRoutes');
const marketplaceRoutes = require('./src/routes/marketplaceRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const pdfRoutes = require('./src/routes/pdfRoutes');
const cartRoutes = require('./src/routes/cartRoutes');

// Import middleware
const errorHandler = require('./src/middlewares/errorHandler');
const notFound = require('./src/middlewares/notFound');

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

const app = express();

// Trust proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      scriptSrc: ["'self'", "https:"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

app.use(cors({
  origin: function (origin, callback) {
    console.log('=== CORS Debug ===');
    console.log('Request Origin:', origin);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('Origin in allowed list?', allowedOrigins.indexOf(origin) !== -1);

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('✓ No origin - allowing');
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('✓ Origin in allowed list - allowing');
      return callback(null, true);
    }

    // In development mode, allow ANY origin to prevent CORS headaches
    if (process.env.NODE_ENV === 'development') {
      console.log('✓ Development mode - allowing');
      return callback(null, true);
    }

    console.log('✗ Blocked by CORS:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'x-country-code', 'x-environment'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Body parsing middleware
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cookieParser());

// Compression middleware
app.use(compression());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
  whitelist: ['sort', 'fields', 'page', 'limit', 'category', 'tags']
}));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
}

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'DevKant Kumar Backend API',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    endpoints: {
      health: '/health',
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      portfolio: '/api/v1/portfolio',
      marketplace: '/api/v1/marketplace',
      admin: '/api/v1/admin',
      upload: '/api/v1/upload'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Favicon endpoint (to prevent 404 errors)
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/portfolio', portfolioRoutes);
app.use('/api/v1/marketplace', marketplaceRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/pdf', pdfRoutes);
app.use('/api/v1/cart', cartRoutes);

// Serve uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Connect to Redis (optional - don't fail if Redis is unavailable)
    try {
      await connectRedis();
    } catch (redisError) {
      logger.warn(`Redis unavailable, continuing without caching: ${redisError.message}`);
    }

    // Start the server
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT received. Shutting down gracefully...');
      server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
