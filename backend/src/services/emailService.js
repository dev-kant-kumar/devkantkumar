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
  getProductNotificationTemplate,
  getAccountDeactivationTemplate,
  getAccountReactivationTemplate,
  getEmailChangeOtpTemplate,
  getPasswordChangeOtpTemplate
} = require('../utils/emailTemplates');

class EmailService {
  /**
   * Get the client URL based on environment
   * @private
   */
  _getClientUrl() {
    if (process.env.CLIENT_URL) return process.env.CLIENT_URL;
    if (process.env.NODE_ENV === 'production') return 'https://devkantkumar.com';
    return process.env.CORS_ORIGIN || 'http://localhost:5173';
  }

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
    const clientUrl = this._getClientUrl();
    const verificationUrl = `${clientUrl}/marketplace/auth/verify-email/${token}`;
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
    const clientUrl = this._getClientUrl();
    const resetUrl = `${clientUrl}/marketplace/auth/reset-password/${token}`;
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
    const clientUrl = this._getClientUrl();
    const loginUrl = `${clientUrl}/marketplace/auth/signin`;
    const forgotPasswordUrl = `${clientUrl}/marketplace/auth/forgot-password`;

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
      userAgent: details.userAgent,
      loginUrl,
      forgotPasswordUrl
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
    const clientUrl = this._getClientUrl();
    const orderUrl = `${clientUrl}/marketplace/account/orders/${order._id}`;

    const html = getOrderConfirmationTemplate({ firstName, order, orderUrl });

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
    const clientUrl = this._getClientUrl();
    const unsubscribeUrl = `${clientUrl}/marketplace/account/settings`; // Assuming this exists or generic link
    // TODO: Implement actual unsubscribe link if needed

    const html = getNewsletterWelcomeTemplate({ email, unsubscribeUrl });

    return addEmailToQueue({
      to: email,
      subject: 'Welcome to my Newsletter! 🚀',
      html,
      type: 'newsletter-welcome-email'
    });
  }

  /**
   * Send notification about new product/service to subscriber
   * @param {string} email
   * @param {Object} productDetails - { name, description, price, imageUrl, url, isService }
   */
  async sendProductNotificationEmail(email, productDetails) {
    const clientUrl = this._getClientUrl();
    const productUrl = `${clientUrl}${productDetails.url}`;

    // Fallback images if not provided
    const productImageUrl = productDetails.imageUrl ||
      (productDetails.isService
        ? 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000'
        : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000');

    const html = getProductNotificationTemplate({
      productName: productDetails.name,
      productDescription: productDetails.description,
      productPrice: productDetails.price,
      productUrl,
      productImageUrl,
      isService: productDetails.isService
    });

    const subject = `🚀 New Launch: ${productDetails.name}`;

    return addEmailToQueue({
      to: email,
      subject,
      html,
      type: 'product-notification-email'
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

    const html = getEmailChangeOtpTemplate({ otp, type });

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
    const html = getPasswordChangeOtpTemplate({ otp });

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
    const clientUrl = this._getClientUrl();
    const reactivationUrl = `${clientUrl}/marketplace/auth/signin`;
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
    const clientUrl = this._getClientUrl();
    const dashboardUrl = `${clientUrl}/marketplace/dashboard`;

    const html = getAccountReactivationTemplate({ firstName, dashboardUrl });

    return addEmailToQueue({
      to: email,
      subject: 'Welcome Back! Your Account is Reactivated - Dev Kant Kumar',
      html,
      type: 'account-reactivation-email'
    });
  }
}

module.exports = new EmailService();
