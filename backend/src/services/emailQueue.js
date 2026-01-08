const { Queue, Worker } = require('bullmq');
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');
const { emailQueueName, connection } = require('../db/redis');
const IORedis = require('ioredis');
const emailConfig = require('../config/emailConfig');
const EmailLog = require('../models/EmailLog');

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

// Only add username if strictly defined in env
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
    removeOnComplete: true,
    removeOnFail: 100
  }
});

// --- Worker Setup ---

// Email Transporter Configuration
const createTransporter = () => {
  const emailService = process.env.EMAIL_SERVICE || 'gmail';

  // Brevo SMTP
  if (emailService === 'brevo') {
    // Check for Brevo credentials
    if (!process.env.BREVO_SMTP_USER || !process.env.BREVO_SMTP_PASS) {
      logger.error('Brevo SMTP credentials missing');
      return null;
    }

    const port = parseInt(process.env.BREVO_SMTP_PORT || '465'); // Default to 465 for SSL, fallback to env
    const secure = port === 465; // True for 465, false for 587

    return nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
      port: port,
      secure: secure,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS
      },
      // Recommended settings for robust connection
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      connectionTimeout: 30000, // Increased to 30s
      greetingTimeout: 20000,   // Increased to 20s
      socketTimeout: 30000      // Increased to 30s
    });
  }

  // Gmail SMTP (Fallback)
  const hasGmailConfig = process.env.SMTP_USER && process.env.SMTP_PASS;
  if (hasGmailConfig) {
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

// Helper to update email log status
const updateEmailLogStatus = async (jobId, status, extra = {}) => {
  try {
    await EmailLog.findOneAndUpdate(
      { jobId: jobId.toString() },
      { status, ...extra },
      { new: true }
    );
  } catch (err) {
    logger.error(`Failed to update email log status: ${err.message}`);
  }
};

// Worker Processor
const worker = new Worker('email-queue', async (job) => {
  logger.info(`Processing email job ${job.id} - Type: ${job.name}`);
  const { to, subject, html, text } = job.data;

  // Update status to processing
  await updateEmailLogStatus(job.id, 'processing', { processedAt: new Date() });

  const transporter = createTransporter();
  if (!transporter) {
    throw new Error('Email transporter not configured. Cannot process job.');
  }

  // Get the appropriate sender based on email type
  const fromAddress = emailConfig.getFromAddress(job.name);

  const mailOptions = {
    from: fromAddress,
    to,
    subject,
    html,
    text
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    logger.info(`Email sent successfully to ${to} for job ${job.id}`);

    // Update log with success
    await updateEmailLogStatus(job.id, 'sent', {
      sentAt: new Date(),
      serverResponse: {
        messageId: result.messageId,
        response: result.response
      }
    });

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

worker.on('failed', async (job, err) => {
  logger.error(`Email job ${job.id} failed: ${err.message}`);

  // Update log with failure
  await updateEmailLogStatus(job.id, 'failed', {
    failedAt: new Date(),
    attempts: job.attemptsMade,
    error: {
      message: err.message,
      code: err.code,
      stack: err.stack
    }
  });
});

worker.on('error', (err) => {
  logger.error(`Worker error: ${err.message}`);
});

// --- Public API ---

/**
 * Add an email job to the queue and log it
 * @param {Object} options - { to, subject, html, text, type, metadata }
 */
const addEmailToQueue = async (options) => {
  try {
    const jobName = options.type || 'generic-email';
    const fromAddress = emailConfig.getFromAddress(jobName);

    // Add to BullMQ queue
    const job = await emailQueue.add(jobName, options);
    logger.info(`Added email job ${job.id} to queue (Type: ${jobName})`);

    // Create email log entry
    try {
      await EmailLog.create({
        to: options.to,
        from: fromAddress,
        subject: options.subject,
        type: jobName,
        status: 'pending',
        jobId: job.id.toString(),
        queuedAt: new Date(),
        htmlPreview: options.html ? options.html.substring(0, 500) : '',
        metadata: options.metadata || {}
      });
    } catch (logError) {
      logger.error(`Failed to create email log: ${logError.message}`);
      // Don't fail the queue operation if logging fails
    }

    return { success: true, jobId: job.id };
  } catch (error) {
    logger.error(`Failed to add email to queue: ${error.message}`);
    return { success: false, error: error.message };
  }
};

module.exports = {
  addEmailToQueue,
  emailQueue,
  worker
};
