const emailService = require('./emailService');
const logger = require('../utils/logger');

class NotificationService {
  // Send welcome email to new users
  async sendWelcomeEmail(user) {
    try {
      const subject = 'Welcome to DevKant Kumar Portfolio!';
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome ${user.firstName}!</h2>
          <p>Thank you for joining our community. We're excited to have you on board!</p>
          <p>You can now:</p>
          <ul>
            <li>Browse our marketplace for digital products and services</li>
            <li>View portfolio projects and case studies</li>
            <li>Access exclusive content and downloads</li>
          </ul>
          <p>If you have any questions, feel free to reach out to us.</p>
          <p>Best regards,<br>DevKant Kumar Team</p>
        </div>
      `;

      await emailService.sendEmail(user.email, subject, html);
      logger.info(`Welcome email sent to ${user.email}`);
    } catch (error) {
      logger.error('Error sending welcome email:', error);
      throw error;
    }
  }

  // Send order confirmation email
  async sendOrderConfirmation(user, order) {
    try {
      const subject = `Order Confirmation - #${order.orderNumber}`;
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Order Confirmation</h2>
          <p>Hi ${user.firstName},</p>
          <p>Thank you for your order! Here are the details:</p>

          <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3>Order #${order.orderNumber}</h3>
            <p><strong>Total:</strong> $${order.totalAmount}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          <h4>Items:</h4>
          <ul>
            ${order.items.map(item => `
              <li>${item.name} - $${item.price}</li>
            `).join('')}
          </ul>

          <p>You will receive download links once payment is confirmed.</p>
          <p>Best regards,<br>DevKant Kumar Team</p>
        </div>
      `;

      await emailService.sendEmail(user.email, subject, html);
      logger.info(`Order confirmation sent to ${user.email} for order ${order.orderNumber}`);
    } catch (error) {
      logger.error('Error sending order confirmation:', error);
      throw error;
    }
  }

  // Send order status update
  async sendOrderStatusUpdate(user, order, newStatus) {
    try {
      const subject = `Order Update - #${order.orderNumber}`;
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Order Status Update</h2>
          <p>Hi ${user.firstName},</p>
          <p>Your order status has been updated:</p>

          <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3>Order #${order.orderNumber}</h3>
            <p><strong>New Status:</strong> ${newStatus}</p>
            <p><strong>Total:</strong> $${order.totalAmount}</p>
          </div>

          ${newStatus === 'completed' ? `
            <p style="color: green;"><strong>Your order is complete! Download links are now available in your account.</strong></p>
          ` : ''}

          <p>Best regards,<br>DevKant Kumar Team</p>
        </div>
      `;

      await emailService.sendEmail(user.email, subject, html);
      logger.info(`Order status update sent to ${user.email} for order ${order.orderNumber}`);
    } catch (error) {
      logger.error('Error sending order status update:', error);
      throw error;
    }
  }

  // Send contact form notification to admin
  async sendContactNotification(contactData) {
    try {
      const subject = `New Contact Form Submission - ${contactData.subject}`;
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>

          <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
            <p><strong>Type:</strong> ${contactData.type}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-left: 4px solid #007bff;">
              ${contactData.message}
            </p>
          </div>

          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `;

      await emailService.sendEmail(process.env.ADMIN_EMAIL, subject, html);
      logger.info(`Contact form notification sent to admin for ${contactData.email}`);
    } catch (error) {
      logger.error('Error sending contact notification:', error);
      throw error;
    }
  }

  // Send auto-reply to contact form submitter
  async sendContactAutoReply(contactData) {
    try {
      const subject = 'Thank you for contacting us!';
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank You for Your Message!</h2>
          <p>Hi ${contactData.name},</p>
          <p>Thank you for reaching out to us. We have received your message and will get back to you within 24-48 hours.</p>

          <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h4>Your Message:</h4>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
            <p style="background: white; padding: 15px; border-left: 4px solid #007bff;">
              ${contactData.message}
            </p>
          </div>

          <p>If you have any urgent questions, please don't hesitate to call us directly.</p>
          <p>Best regards,<br>DevKant Kumar Team</p>
        </div>
      `;

      await emailService.sendEmail(contactData.email, subject, html);
      logger.info(`Contact auto-reply sent to ${contactData.email}`);
    } catch (error) {
      logger.error('Error sending contact auto-reply:', error);
      throw error;
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(user, resetToken) {
    try {
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      const subject = 'Password Reset Request';
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hi ${user.firstName},</p>
          <p>You requested a password reset. Click the button below to reset your password:</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>

          <p>This link will expire in 1 hour for security reasons.</p>
          <p>If you didn't request this reset, please ignore this email.</p>
          <p>Best regards,<br>DevKant Kumar Team</p>
        </div>
      `;

      await emailService.sendEmail(user.email, subject, html);
      logger.info(`Password reset email sent to ${user.email}`);
    } catch (error) {
      logger.error('Error sending password reset email:', error);
      throw error;
    }
  }

  // Send email verification
  async sendEmailVerification(user, verificationToken) {
    try {
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
      const subject = 'Verify Your Email Address';
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Verify Your Email Address</h2>
          <p>Hi ${user.firstName},</p>
          <p>Please verify your email address by clicking the button below:</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email
            </a>
          </div>

          <p>This link will expire in 24 hours.</p>
          <p>If you didn't create this account, please ignore this email.</p>
          <p>Best regards,<br>DevKant Kumar Team</p>
        </div>
      `;

      await emailService.sendEmail(user.email, subject, html);
      logger.info(`Email verification sent to ${user.email}`);
    } catch (error) {
      logger.error('Error sending email verification:', error);
      throw error;
    }
  }

  // Send newsletter confirmation
  async sendNewsletterConfirmation(email) {
    try {
      const subject = 'Newsletter Subscription Confirmed';
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to Our Newsletter!</h2>
          <p>Thank you for subscribing to our newsletter.</p>
          <p>You'll receive updates about:</p>
          <ul>
            <li>New portfolio projects</li>
            <li>Latest blog posts</li>
            <li>Marketplace updates</li>
            <li>Exclusive offers and discounts</li>
          </ul>
          <p>You can unsubscribe at any time by clicking the unsubscribe link in our emails.</p>
          <p>Best regards,<br>DevKant Kumar Team</p>
        </div>
      `;

      await emailService.sendEmail(email, subject, html);
      logger.info(`Newsletter confirmation sent to ${email}`);
    } catch (error) {
      logger.error('Error sending newsletter confirmation:', error);
      throw error;
    }
  }

  // Send bulk announcement
  async sendBulkAnnouncement(emails, subject, content) {
    try {
      const promises = emails.map(email =>
        emailService.sendEmail(email, subject, content)
      );

      await Promise.allSettled(promises);
      logger.info(`Bulk announcement sent to ${emails.length} recipients`);
    } catch (error) {
      logger.error('Error sending bulk announcement:', error);
      throw error;
    }
  }
}

module.exports = new NotificationService();
