const logger = require('../utils/logger');
const { addEmailToQueue } = require('./emailQueue');
const {
  getVerificationEmailTemplate,
  getPasswordResetTemplate,
  getPasswordResetSuccessTemplate,
  getOrderConfirmationTemplate,
  getAdminContactTemplate,
  getUserContactAutoReplyTemplate,
  getNewsletterWelcomeTemplate,
  getAccountDeactivationTemplate,
  getAccountReactivationTemplate
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
    const verificationUrl = `${process.env.CORS_ORIGIN || 'https://devkantkumar.com'}/marketplace/auth/verify-email/${token}`;
    const html = getVerificationEmailTemplate({ firstName, verificationUrl });

    return addEmailToQueue({
      to: email,
      subject: 'Verify Your Email Address - Dev Kant Kumar',
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
    const resetUrl = `${process.env.CORS_ORIGIN || 'https://devkantkumar.com'}/marketplace/auth/reset-password/${token}`;
    const html = getPasswordResetTemplate({ firstName, resetUrl });

    return addEmailToQueue({
      to: email,
      subject: 'Reset Your Password - Dev Kant Kumar',
      html,
      type: 'password-reset-email'
    });
  }

  /**
   * Send password reset success confirmation email
   * @param {string} email
   * @param {string} firstName
   * @param {Object} details - { ipAddress, userAgent }
   */
  async sendPasswordResetSuccessEmail(email, firstName, details = {}) {
    const resetTime = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    const html = getPasswordResetSuccessTemplate({
      firstName,
      resetTime,
      ipAddress: details.ipAddress,
      userAgent: details.userAgent
    });

    return addEmailToQueue({
      to: email,
      subject: '✅ Password Changed Successfully - Dev Kant Kumar',
      html,
      type: 'password-reset-success-email'
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
      subject: 'Thank you for contacting us - Dev Kant Kumar',
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
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f6f8;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="padding: 30px; text-align: center; border-radius: 10px 10px 0 0; color: white; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);">
            <h1 style="margin: 0; font-size: 24px;">🔐 ${subject}</h1>
          </div>
          <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <p>Use the following verification code to complete your request:</p>
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px dashed #0ea5e9; padding: 25px; text-align: center; border-radius: 12px; margin: 25px 0;">
              <h1 style="margin: 0; font-size: 36px; letter-spacing: 8px; color: #0284c7; font-family: 'Courier New', monospace;">${otp}</h1>
            </div>
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>⏰ This code expires in 10 minutes</strong> for your security.
              </p>
            </div>
            <p style="font-size: 14px; color: #6b7280;">If you didn't request this code, please ignore this email or contact support if you have concerns.</p>
            <p style="margin-bottom: 0; margin-top: 25px;">Stay secure,<br><strong>Dev Kant Kumar Team</strong></p>
          </div>
          <div style="text-align: center; margin-top: 30px; color: #888; font-size: 13px;">
            <p>&copy; ${new Date().getFullYear()} Dev Kant Kumar. All rights reserved.</p>
            <p style="font-size: 11px; color: #9ca3af;">This is an automated security email. Please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
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
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Password Change Request</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f6f8;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="padding: 30px; text-align: center; border-radius: 10px 10px 0 0; color: white; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
            <h1 style="margin: 0; font-size: 24px;">🔒 Password Change Verification</h1>
          </div>
          <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <p>You've requested to change your password. Use the verification code below to confirm:</p>
            <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px dashed #ef4444; padding: 25px; text-align: center; border-radius: 12px; margin: 25px 0;">
              <h1 style="margin: 0; font-size: 36px; letter-spacing: 8px; color: #dc2626; font-family: 'Courier New', monospace;">${otp}</h1>
            </div>
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>⏰ This code expires in 10 minutes</strong> for your security.
              </p>
            </div>
            <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #dc2626; font-size: 14px;">
                <strong>⚠️ Didn't request this?</strong> If you didn't initiate this password change, please contact our support team immediately as your account may be at risk.
              </p>
            </div>
            <p style="margin-bottom: 0; margin-top: 25px;">Stay secure,<br><strong>Dev Kant Kumar Team</strong></p>
          </div>
          <div style="text-align: center; margin-top: 30px; color: #888; font-size: 13px;">
            <p>&copy; ${new Date().getFullYear()} Dev Kant Kumar. All rights reserved.</p>
            <p style="font-size: 11px; color: #9ca3af;">This is an automated security notification. Please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return addEmailToQueue({
      to: email,
      subject: 'Verify Password Change Request',
      html,
      type: 'password-change-otp'
    });
  }

  /**
   * Send account deactivation confirmation email
   * @param {string} email
   * @param {string} firstName
   * @param {Date} scheduledDeletionDate
   */
  async sendAccountDeactivationEmail(email, firstName, scheduledDeletionDate) {
    const reactivationUrl = `${process.env.CORS_ORIGIN || 'https://devkantkumar.com'}/marketplace/auth/signin`;
    const formattedDate = new Date(scheduledDeletionDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const html = getAccountDeactivationTemplate({ firstName, scheduledDeletionDate: formattedDate, reactivationUrl });

    return addEmailToQueue({
      to: email,
      subject: 'Account Deactivation Confirmation - Dev Kant Kumar',
      html,
      type: 'account-deactivation-email'
    });
  }

  /**
   * Send account reactivation confirmation email
   * @param {string} email
   * @param {string} firstName
   */
  async sendAccountReactivationEmail(email, firstName) {
    const html = getAccountReactivationTemplate({ firstName });

    return addEmailToQueue({
      to: email,
      subject: 'Welcome Back! Your Account is Reactivated - Dev Kant Kumar',
      html,
      type: 'account-reactivation-email'
    });
  }
}

module.exports = new EmailService();
