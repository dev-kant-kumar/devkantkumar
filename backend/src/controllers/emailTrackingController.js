const EmailLog = require('../models/EmailLog');
const { addEmailToQueue } = require('../services/emailQueue');
const logger = require('../utils/logger');

/**
 * Email Tracking Controller
 * Provides API endpoints for monitoring and managing email delivery
 */

// GET /admin/emails/stats - Get email statistics
exports.getEmailStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const dateRange = {};
    if (startDate) dateRange.start = startDate;
    if (endDate) dateRange.end = endDate;

    const stats = await EmailLog.getStats(dateRange);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    logger.error('Error fetching email stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email statistics',
      error: error.message
    });
  }
};

// GET /admin/emails - Get paginated email logs
exports.getEmailLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      type,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      startDate,
      endDate
    } = req.query;

    // Build query
    const query = {};

    if (status) query.status = status;
    if (type) query.type = type;

    if (search) {
      query.$or = [
        { to: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { from: { $regex: search, $options: 'i' } }
      ];
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [emails, total] = await Promise.all([
      EmailLog
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-htmlPreview -error.stack')
        .lean(),
      EmailLog.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        emails,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    logger.error('Error fetching email logs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email logs',
      error: error.message
    });
  }
};

// GET /admin/emails/:id - Get single email details
exports.getEmailById = async (req, res) => {
  try {
    const { id } = req.params;

    const email = await EmailLog.findById(id).lean();

    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email log not found'
      });
    }

    res.json({
      success: true,
      data: email
    });
  } catch (error) {
    logger.error('Error fetching email details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email details',
      error: error.message
    });
  }
};

// POST /admin/emails/:id/retry - Retry a failed email
exports.retryEmail = async (req, res) => {
  try {
    const { id } = req.params;

    const email = await EmailLog.findById(id);

    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email log not found'
      });
    }

    if (email.status !== 'failed') {
      return res.status(400).json({
        success: false,
        message: 'Only failed emails can be retried'
      });
    }

    // Re-queue the email
    const result = await addEmailToQueue({
      to: email.to,
      subject: email.subject,
      html: email.htmlPreview, // Note: We only have preview, might need full HTML
      type: email.type,
      retryOf: email._id.toString()
    });

    if (result.success) {
      // Update original email to note retry
      email.metadata = email.metadata || {};
      email.metadata.retriedAt = new Date();
      email.metadata.retryJobId = result.jobId;
      await email.save();

      res.json({
        success: true,
        message: 'Email has been re-queued for delivery',
        data: { jobId: result.jobId }
      });
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    logger.error('Error retrying email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retry email',
      error: error.message
    });
  }
};

// GET /admin/emails/types - Get all email types for filtering
exports.getEmailTypes = async (req, res) => {
  try {
    const types = await EmailLog.distinct('type');

    res.json({
      success: true,
      data: types
    });
  } catch (error) {
    logger.error('Error fetching email types:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email types',
      error: error.message
    });
  }
};

// DELETE /admin/emails/cleanup - Clean up old email logs (optional)
exports.cleanupOldLogs = async (req, res) => {
  try {
    const { daysOld = 90 } = req.body;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(daysOld));

    const result = await EmailLog.deleteMany({
      createdAt: { $lt: cutoffDate },
      status: { $in: ['sent', 'failed'] } // Keep pending ones
    });

    logger.info(`Cleaned up ${result.deletedCount} old email logs`);

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} email logs older than ${daysOld} days`
    });
  } catch (error) {
    logger.error('Error cleaning up email logs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cleanup email logs',
      error: error.message
    });
  }
};
