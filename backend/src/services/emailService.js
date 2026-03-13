const logger = require("../utils/logger");
const { addEmailToQueue } = require("./emailQueue");
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
  getInvoiceEmailTemplate,
  getAbandonedCartEmailTemplate,
  getEmailChangeOtpTemplate,
  getPasswordChangeOtpTemplate,
} = require("../utils/emailTemplates");

class EmailService {
  /**
   * Get the client URL based on environment
   * @private
   */
  _getClientUrl() {
    if (process.env.CLIENT_URL) return process.env.CLIENT_URL;
    if (process.env.NODE_ENV === "production")
      return "https://devkantkumar.com";
    return process.env.CORS_ORIGIN || "http://localhost:5173";
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
      type: "generic-email",
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
      subject: "Verify Your Email Address - Dev Kant Kumar",
      html,
      type: "verification-email",
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
      subject: "Reset Your Password - Dev Kant Kumar",
      html,
      type: "password-reset-email",
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

    const resetTime = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    const html = getPasswordResetSuccessTemplate({
      firstName,
      resetTime,
      ipAddress: details.ipAddress,
      userAgent: details.userAgent,
      loginUrl,
      forgotPasswordUrl,
    });

    return addEmailToQueue({
      to: email,
      subject: "✅ Password Changed Successfully - Dev Kant Kumar",
      html,
      type: "password-reset-success-email",
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
    const orderUrl = `${clientUrl}/marketplace/dashboard/orders`;

    const html = getOrderConfirmationTemplate({ firstName, order, orderUrl });

    return addEmailToQueue({
      to: email,
      subject: `Order Confirmation - #${order.orderNumber}`,
      html,
      type: "order-confirmation-email",
    });
  }

  /**
   * Send invoice email with a link to view/download the invoice PDF
   * @param {string} email
   * @param {Object} order
   * @param {string} firstName
   */
  async sendInvoiceEmail(email, order, firstName) {
    const clientUrl = this._getClientUrl();
    const invoiceUrl = `${clientUrl}/marketplace/dashboard/orders/${order._id}/invoice`;

    const html = getInvoiceEmailTemplate({ firstName, order, invoiceUrl });

    return addEmailToQueue({
      to: email,
      subject: `Invoice for Order #${order.orderNumber} - Dev Kant Kumar Marketplace`,
      html,
      type: "invoice-email",
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
      type: "contact-admin-notification",
    });

    // 2. Send auto-reply to user
    const userHtml = getUserContactAutoReplyTemplate(contactData);
    return addEmailToQueue({
      to: contactData.email,
      subject: "Thank you for contacting us - Dev Kant Kumar",
      html: userHtml,
      type: "contact-user-auto-reply",
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
      subject: "Welcome to my Newsletter! 🚀",
      html,
      type: "newsletter-welcome-email",
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
    const productImageUrl =
      productDetails.imageUrl ||
      (productDetails.isService
        ? "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000"
        : "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000");

    const html = getProductNotificationTemplate({
      productName: productDetails.name,
      productDescription: productDetails.description,
      productPrice: productDetails.price,
      productUrl,
      productImageUrl,
      isService: productDetails.isService,
    });

    const subject = `🚀 New Launch: ${productDetails.name}`;

    return addEmailToQueue({
      to: email,
      subject,
      html,
      type: "product-notification-email",
    });
  }

  /**
   * Send OTP for email change
   * @param {string} email
   * @param {string} otp
   * @param {string} type - 'current' or 'new'
   */
  async sendEmailChangeOTP(email, otp, type) {
    const subject =
      type === "current"
        ? "Verify Request to Change Email"
        : "Verify Your New Email Address";

    const html = getEmailChangeOtpTemplate({ otp, type });

    return addEmailToQueue({
      to: email,
      subject,
      html,
      type: "email-change-otp",
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
      subject: "Verify Password Change Request",
      html,
      type: "password-change-otp",
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
    const formattedDate = new Date(scheduledDeletionDate).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );

    const html = getAccountDeactivationTemplate({
      firstName,
      scheduledDeletionDate: formattedDate,
      reactivationUrl,
    });

    return addEmailToQueue({
      to: email,
      subject: "Account Deactivation Confirmation - Dev Kant Kumar",
      html,
      type: "account-deactivation-email",
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
      subject: "Welcome Back! Your Account is Reactivated - Dev Kant Kumar",
      html,
      type: "account-reactivation-email",
    });
  }

  // ==========================================
  // SUPPORT TICKET EMAILS
  // ==========================================

  /**
   * Send ticket confirmation email to guest users
   */
  async sendSupportTicketConfirmation({ name, email, ticketNumber, subject }) {
    const clientUrl = this._getClientUrl();

    const html = `
      <!DOCTYPE html>
      <html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f5f5f5;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;margin-top:20px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(135deg,#2563eb,#4f46e5);padding:32px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:24px;">Support Ticket Created</h1>
          </div>
          <div style="padding:32px;">
            <p style="font-size:16px;color:#333;">Hi ${name},</p>
            <p style="font-size:15px;color:#555;line-height:1.6;">Thank you for reaching out! Your support ticket has been created. Our team will review it and respond within 24 hours.</p>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin:24px 0;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Ticket Number</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#2563eb;font-size:15px;">${ticketNumber}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Subject</td><td style="padding:8px 0;text-align:right;color:#333;font-size:14px;">${subject}</td></tr>
              </table>
            </div>
            <p style="font-size:14px;color:#64748b;line-height:1.6;">Since you submitted this as a guest, all responses from our team will be sent to <strong>${email}</strong>.</p>
            <p style="font-size:14px;color:#64748b;">To track your tickets in real-time with live chat, <a href="${clientUrl}/marketplace/auth/signup" style="color:#2563eb;text-decoration:none;font-weight:600;">create a free account</a>.</p>
            <div style="border-top:1px solid #e2e8f0;margin-top:24px;padding-top:16px;">
              <p style="font-size:13px;color:#94a3b8;margin:0;">— MarketPlace Support Team</p>
            </div>
          </div>
        </div>
      </body></html>`;

    return addEmailToQueue({
      to: email,
      subject: `Support Ticket ${ticketNumber} - We've received your request`,
      html,
      type: "support-ticket-confirmation",
    });
  }

  /**
   * Send admin response to guest user via email
   */
  async sendSupportTicketResponse({
    name,
    email,
    ticketNumber,
    subject,
    responseMessage,
    responderName,
  }) {
    const clientUrl = this._getClientUrl();

    const html = `
      <!DOCTYPE html>
      <html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f5f5f5;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;margin-top:20px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(135deg,#2563eb,#4f46e5);padding:32px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:24px;">New Response on Your Ticket</h1>
          </div>
          <div style="padding:32px;">
            <p style="font-size:16px;color:#333;">Hi ${name},</p>
            <p style="font-size:15px;color:#555;line-height:1.6;">You have a new response on your support ticket <strong>${ticketNumber}</strong>.</p>
            <div style="background:#f0f9ff;border-left:4px solid #2563eb;border-radius:0 12px 12px 0;padding:20px;margin:24px 0;">
              <p style="font-size:12px;color:#64748b;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">${responderName} — Support Team</p>
              <p style="font-size:15px;color:#333;margin:0;line-height:1.6;white-space:pre-wrap;">${responseMessage}</p>
            </div>
            <p style="font-size:14px;color:#64748b;line-height:1.6;">To reply, you can respond directly to this email or visit our <a href="${clientUrl}/marketplace/support" style="color:#2563eb;text-decoration:none;font-weight:600;">support page</a>.</p>
            <p style="font-size:14px;color:#64748b;">For real-time chat with our support team, <a href="${clientUrl}/marketplace/auth/signup" style="color:#2563eb;text-decoration:none;font-weight:600;">create a free account</a>.</p>
            <div style="border-top:1px solid #e2e8f0;margin-top:24px;padding-top:16px;">
              <p style="font-size:12px;color:#94a3b8;margin:0;">Regarding: ${subject}</p>
              <p style="font-size:13px;color:#94a3b8;margin:4px 0 0;">— MarketPlace Support Team</p>
            </div>
          </div>
        </div>
      </body></html>`;

    return addEmailToQueue({
      to: email,
      subject: `Re: ${subject} [${ticketNumber}]`,
      html,
      type: "support-ticket-response",
    });
  }

  /**
   * Send an abandoned cart recovery email to a user.
   *
   * @param {string} email       - Recipient email
   * @param {string} firstName   - Recipient's first name
   * @param {Array}  items       - Cart items: { title, imageUrl, price, currency, packageName }
   */
  async sendAbandonedCartEmail(email, firstName, items = []) {
    const clientUrl = this._getClientUrl();
    const cartUrl = `${clientUrl}/marketplace/cart`;
    const unsubscribeUrl = `${clientUrl}/marketplace/unsubscribe?email=${encodeURIComponent(email)}&type=cart`;

    const html = getAbandonedCartEmailTemplate({ firstName, items, cartUrl, unsubscribeUrl });

    return addEmailToQueue({
      to: email,
      subject: `🛒 You left something in your cart, ${firstName}!`,
      html,
      type: "abandoned-cart-email",
    });
  }
}

module.exports = new EmailService();
