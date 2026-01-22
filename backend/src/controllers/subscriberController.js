const Subscriber = require('../models/Subscriber');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');
const emailService = require('../services/emailService');

// @desc    Subscribe to newsletter
// @route   POST /api/subscribers
// @access  Public
const subscribe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, source } = req.body;

  try {
    let subscriber = await Subscriber.findOne({ email: email.toLowerCase() });

    if (subscriber) {
      if (!subscriber.isActive) {
          subscriber.isActive = true;
          subscriber.emailsSentCount = (subscriber.emailsSentCount || 0) + 1;
          if (source) subscriber.source = source;
          await subscriber.save();

          // Send welcome email (non-blocking)
          emailService.sendNewsletterWelcomeEmail(email).catch(err =>
            logger.error('Failed to send resubscribe welcome email:', err)
          );

          return res.status(200).json({ success: true, message: 'Welcome back! You have successfully resubscribed.' });
      }
      return res.status(400).json({ success: false, message: 'Email is already subscribed' });
    }

    subscriber = await Subscriber.create({
      email: email.toLowerCase(),
      source: source || 'general',
      emailsSentCount: 1
    });

    // Send welcome email (non-blocking)
    emailService.sendNewsletterWelcomeEmail(email).catch(err =>
      logger.error('Failed to send welcome email:', err)
    );

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to the newsletter!',
      data: subscriber
    });
  } catch (error) {
    logger.error('Subscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all subscribers
// @route   GET /api/subscribers
// @access  Private (Admin only)
const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (error) {
    logger.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Unsubscribe (logic for eventual public unsubscribe link if needed)
// @route   PUT /api/subscribers/unsubscribe
// @access  Public
const unsubscribe = async (req, res) => {
    const { email } = req.body;
    try {
        const subscriber = await Subscriber.findOne({ email });
        if (!subscriber) {
             return res.status(404).json({ success: false, message: 'Subscriber not found' });
        }

        subscriber.isActive = false;
        await subscriber.save();

        res.status(200).json({ success: true, message: 'Successfully unsubscribed' });
    } catch (error) {
        logger.error('Unsubscribe error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}


module.exports = {
  subscribe,
  getSubscribers,
  unsubscribe
};
