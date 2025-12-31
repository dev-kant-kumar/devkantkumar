const logger = require('../utils/logger');
const { addEmailToQueue } = require('./emailQueue');
const {
  getVerificationEmailTemplate,
  getPasswordResetTemplate,
  getOrderConfirmationTemplate,
  getAdminContactTemplate,
  getUserContactAutoReplyTemplate,
  getNewsletterWelcomeTemplate
} = require('../utils/emailTemplates');

class EmailService {
  /**
   * Send a generic email via queue
   * @param {Object} options - { to, subject, html, text }
   */
  async sendEmail(options) {
    return addEmailToQueue({
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      type: 'generic-email'
    });
  }

  /**
   * Send verification email to new user
   * @param {string} email
   * @param {string} token
   * @param {string} firstName
   */
  async sendVerificationEmail(email, token, firstName) {
    const verificationUrl = `${process.env.CORS_ORIGIN || 'http://localhost:5173'}/marketplace/auth/verify-email/${token}`;
    const html = getVerificationEmailTemplate({ firstName, verificationUrl });

    return addEmailToQueue({
      to: email,
      subject: 'Verify Your Email Address - DevKant Kumar',
      html,
      type: 'verification-email'
    });
  }

  /**
   * Send password reset email
   * @param {string} email
   * @param {string} token
   * @param {string} firstName
   */
  async sendPasswordResetEmail(email, token, firstName) {
    const resetUrl = `${process.env.CORS_ORIGIN || 'http://localhost:5173'}/marketplace/auth/reset-password/${token}`;
    const html = getPasswordResetTemplate({ firstName, resetUrl });

    return addEmailToQueue({
      to: email,
      subject: 'Reset Your Password - DevKant Kumar',
      html,
      type: 'password-reset-email'
    });
  }

  /**
   * Send order confirmation email
   * @param {string} email
   * @param {Object} order
   * @param {string} firstName
   */
  async sendOrderConfirmationEmail(email, order, firstName) {
    const html = getOrderConfirmationTemplate({ firstName, order });

    return addEmailToQueue({
      to: email,
      subject: `Order Confirmation - #${order.orderNumber}`,
      html,
      type: 'order-confirmation-email'
    });
  }

  /**
   * Send contact form emails (Admin notification + User auto-reply)
   * @param {Object} contactData
   */
  async sendContactFormEmail(contactData) {
    // 1. Send notification to admin
    const adminHtml = getAdminContactTemplate(contactData);
    await addEmailToQueue({
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New Contact: ${contactData.subject}`,
      html: adminHtml,
      type: 'contact-admin-notification'
    });

    // 2. Send auto-reply to user
    const userHtml = getUserContactAutoReplyTemplate(contactData);
    return addEmailToQueue({
      to: contactData.email,
      subject: 'Thank you for contacting us - DevKant Kumar',
      html: userHtml,
      type: 'contact-user-auto-reply'
    });
  }

  /**
   * Send welcome email to new newsletter subscriber
   * @param {string} email
   */
  async sendNewsletterWelcomeEmail(email) {
    const html = getNewsletterWelcomeTemplate({ email });

    return addEmailToQueue({
      to: email,
      subject: 'Welcome to my Newsletter! 🚀',
      html,
      type: 'newsletter-welcome-email'
    });
  }

  /**
   * Send OTP for email change
   * @param {string} email
   * @param {string} otp
   * @param {string} type - 'current' or 'new'
   */
  async sendEmailChangeOTP(email, otp, type) {
    const subject = type === 'current'
      ? 'Verify Request to Change Email'
      : 'Verify Your New Email Address';

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>${subject}</h2>
        <p>Use the following OTP to verify your request:</p>
        <h1 style="background: #f4f4f4; padding: 20px; text-align: center; letter-spacing: 5px;">${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `;

    return addEmailToQueue({
      to: email,
      subject,
      html,
      type: 'email-change-otp'
    });
  }

  /**
   * Send OTP for password change
   * @param {string} email
   * @param {string} otp
   */
  async sendPasswordChangeOTP(email, otp) {
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verify Request to Change Password</h2>
        <p>Use the following OTP to verify your request:</p>
        <h1 style="background: #f4f4f4; padding: 20px; text-align: center; letter-spacing: 5px;">${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, please contact support immediately.</p>
      </div>
    `;

    return addEmailToQueue({
      to: email,
      subject: 'Verify Password Change Request',
      html,
      type: 'password-change-otp'
    });
  }
}

module.exports = new EmailService();
