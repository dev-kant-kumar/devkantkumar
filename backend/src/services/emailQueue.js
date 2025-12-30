const { Queue, Worker } = require('bullmq');
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');
const { emailQueueName, connection } = require('../db/redis'); // We might need to adjust redis.js export or define connection here
const IORedis = require('ioredis');

// --- Configuration ---
const REDIS_HOST = process.env.REDIS_HOST || 'redis-18949.c267.us-east-1-4.ec2.redns.redis-cloud.com';
const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 18949;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
// Redis connection options for BullMQ
const redisOptions = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  maxRetriesPerRequest: null, // Required by BullMQ
};

// Only add username if strictly defined in env (avoid sending 'default' which breaks some legacy Redis auth)
if (process.env.REDIS_USERNAME) {
  redisOptions.username = process.env.REDIS_USERNAME;
}

// Create the Queue
const emailQueue = new Queue('email-queue', {
  connection: redisOptions,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: true, // Keep queued jobs clean
    removeOnFail: 100 // Keep last 100 failed jobs for debugging
  }
});

// --- Worker Setup ---

// Re-use the transporter creation logic (or import from a shared config if possible)
// Ideally, we move transporter creation to a shared utility, but for now, we'll initialize it here to keep worker standalone.
const createTransporter = () => {
  const hasBrevoConfig = process.env.BREVO_API_KEY && process.env.BREVO_API_KEY !== 'your_brevo_api_key_here';
  const hasSmtpConfig = process.env.SMTP_USER && process.env.SMTP_PASS;

  if (hasBrevoConfig) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS || process.env.BREVO_API_KEY
      }
    });
  } else if (hasSmtpConfig) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return null;
};

// Worker Processor
const worker = new Worker('email-queue', async (job) => {
  logger.info(`Processing email job ${job.id} - Type: ${job.name}`);
  const { to, subject, html, text } = job.data;

  const transporter = createTransporter();
  if (!transporter) {
    throw new Error('Email transporter not configured. Cannot process job.');
  }

  const mailOptions = {
    from: `${process.env.BREVO_SENDER_NAME || 'DevKant Kumar'} <${process.env.BREVO_SENDER_EMAIL || process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    text
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    logger.info(`Email sent successfully to ${to} for job ${job.id}`);
    return result;
  } catch (error) {
    logger.error(`Failed to send email to ${to} (Job ${job.id}): ${error.message}`);
    throw error; // Let BullMQ handle retry
  }
}, { connection: redisOptions });

// Worker Events
worker.on('completed', (job) => {
  logger.info(`Email job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  logger.error(`Email job ${job.id} failed: ${err.message}`);
});

worker.on('error', (err) => {
  logger.error(`Worker error: ${err.message}`);
});

// --- Public API ---

/**
 * Add an email job to the queue
 * @param {Object} options - { to, subject, html, text, type }
 */
const addEmailToQueue = async (options) => {
  try {
    const jobName = options.type || 'generic-email';
    const job = await emailQueue.add(jobName, options);
    logger.info(`Added email job ${job.id} to queue (Type: ${jobName})`);
    return { success: true, jobId: job.id };
  } catch (error) {
    logger.error(`Failed to add email to queue: ${error.message}`);
    // Fallback: If Redis is down, we could try sending directly or just fail.
    // Failing is safer for now to avoid blocking.
    return { success: false, error: error.message };
  }
};

module.exports = {
  addEmailToQueue,
  emailQueue,
  worker // Export worker mostly for testing or graceful shutdown usage if needed
};
