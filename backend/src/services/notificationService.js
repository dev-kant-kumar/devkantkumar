const emailService = require('./emailService');
const logger = require('../utils/logger');
const Notification = require('../models/Notification');
const { emitToUser, emitToAdmins, isUserOnline } = require('../config/socket');
const User = require('../models/User');

class NotificationService {
  // ==========================================
  // IN-APP NOTIFICATION METHODS
  // ==========================================

  /**
   * Create an in-app notification and emit via Socket.io
   */
  async createNotification(data) {
    try {
      const notification = await Notification.createAndPopulate({
        recipient: data.recipientId,
        sender: data.senderId || null,
        recipientRole: data.recipientRole || 'user',
        type: data.type,
        title: data.title,
        message: data.message,
        data: data.data || {},
        link: data.link || null,
        priority: data.priority || 'normal'
      });

      // Emit to user via Socket.io if online
      emitToUser(data.recipientId.toString(), 'notification:new', notification);

      logger.info(`In-app notification created for user ${data.recipientId}: ${data.type}`);
      return notification;
    } catch (error) {
      logger.error('Error creating notification:', error);
      throw error;
    }
  }

  /**
   * Send notification to all admins
   */
  async notifyAdmins(data) {
    try {
      // Get all admin users
      const admins = await User.find({ role: 'admin', isActive: true }).select('_id');

      const notifications = await Promise.all(
        admins.map(admin =>
          this.createNotification({
            ...data,
            recipientId: admin._id,
            recipientRole: 'admin'
          })
        )
      );

      // Also emit to admin room for real-time
      emitToAdmins('notification:new', notifications[0]);

      logger.info(`Admin notification sent to ${admins.length} admins: ${data.type}`);
      return notifications;
    } catch (error) {
      logger.error('Error notifying admins:', error);
      throw error;
    }
  }

  /**
   * Send notification to a specific user
   */
  async notifyUser(userId, data) {
    return this.createNotification({
      ...data,
      recipientId: userId,
      recipientRole: 'user'
    });
  }

  // ==========================================
  // ORDER NOTIFICATIONS
  // ==========================================

  /**
   * Notify about new order (to admin) and confirmation (to user)
   */
  async sendOrderNotifications(user, order) {
    try {
      // Notify admin about new order
      await this.notifyAdmins({
        type: 'order_created',
        title: `New Order #${order.orderNumber}`,
        message: `${user.firstName} ${user.lastName} placed an order for ${order.currency} ${order.totals?.finalTotal || order.totalAmount}`,
        data: { orderId: order._id, orderNumber: order.orderNumber },
        link: `/admin/marketplace/orders/${order._id}`,
        priority: 'high'
      });

      // Notify user with order confirmation
      await this.notifyUser(user._id, {
        type: 'order_status',
        title: `Order Confirmed #${order.orderNumber}`,
        message: 'Your order has been received and is being processed.',
        data: { orderId: order._id, orderNumber: order.orderNumber },
        link: `/marketplace/dashboard/orders/${order._id}`,
        priority: 'normal'
      });

      // Send email confirmation as well
      await this.sendOrderConfirmation(user, order);
    } catch (error) {
      logger.error('Error sending order notifications:', error);
    }
  }

  /**
   * Notify user about order status change
   */
  async sendOrderStatusNotification(user, order, newStatus) {
    try {
      const statusMessages = {
        processing: 'Your order is being processed.',
        shipped: 'Your order has been shipped!',
        delivered: 'Your order has been delivered.',
        completed: 'Your order is complete! Download links are available.',
        cancelled: 'Your order has been cancelled.',
        refunded: 'Your order has been refunded.'
      };

      await this.notifyUser(user._id, {
        type: newStatus === 'completed' ? 'order_completed' : 'order_status',
        title: `Order #${order.orderNumber} - ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
        message: statusMessages[newStatus] || `Order status updated to ${newStatus}`,
        data: { orderId: order._id, orderNumber: order.orderNumber, status: newStatus },
        link: `/marketplace/dashboard/orders/${order._id}`,
        priority: newStatus === 'completed' ? 'high' : 'normal'
      });

      // Send email as well
      await this.sendOrderStatusUpdate(user, order, newStatus);
    } catch (error) {
      logger.error('Error sending order status notification:', error);
    }
  }

  // ==========================================
  // SUPPORT TICKET NOTIFICATIONS
  // ==========================================

  /**
   * Notify admin about new support ticket
   */
  async sendNewTicketNotification(user, ticket) {
    try {
      await this.notifyAdmins({
        type: 'support_ticket',
        title: `New Support Ticket #${ticket.ticketNumber || ticket._id.toString().slice(-6)}`,
        message: `${user.firstName} ${user.lastName} submitted: ${ticket.subject}`,
        data: { ticketId: ticket._id },
        link: `/admin/support/${ticket._id}`,
        priority: 'high'
      });
    } catch (error) {
      logger.error('Error sending ticket notification:', error);
    }
  }

  /**
   * Notify user about ticket response
   */
  async sendTicketResponseNotification(userId, ticket) {
    try {
      await this.notifyUser(userId, {
        type: 'support_response',
        title: `Response to Your Ticket`,
        message: `You have a new response on your support ticket: ${ticket.subject}`,
        data: { ticketId: ticket._id },
        link: `/marketplace/dashboard/support/${ticket._id}`,
        priority: 'normal'
      });
    } catch (error) {
      logger.error('Error sending ticket response notification:', error);
    }
  }

  // ==========================================
  // QUOTE NOTIFICATIONS
  // ==========================================

  /**
   * Notify admin about new quote request
   */
  async sendQuoteRequestNotification(quoteData) {
    try {
      await this.notifyAdmins({
        type: 'quote_request',
        title: 'New Quote Request',
        message: `${quoteData.name} requested a quote for: ${quoteData.service || 'Custom Project'}`,
        data: { quoteId: quoteData._id },
        link: `/admin/marketplace/quotes/${quoteData._id}`,
        priority: 'normal'
      });
    } catch (error) {
      logger.error('Error sending quote notification:', error);
    }
  }

  /**
   * Notify user about quote response
   */
  async sendQuoteResponseNotification(userId, quote) {
    try {
      await this.notifyUser(userId, {
        type: 'quote_response',
        title: 'Quote Response Received',
        message: `Your quote request has been responded to.`,
        data: { quoteId: quote._id },
        link: `/marketplace/dashboard/quotes/${quote._id}`,
        priority: 'normal'
      });
    } catch (error) {
      logger.error('Error sending quote response notification:', error);
    }
  }

  // ==========================================
  // PAYMENT NOTIFICATIONS
  // ==========================================

  /**
   * Notify admin about successful payment
   */
  async sendPaymentReceivedNotification(user, payment, order) {
    try {
      await this.notifyAdmins({
        type: 'payment_received',
        title: 'Payment Received',
        message: `${user.firstName} ${user.lastName} paid ${payment.currency} ${payment.amount} for Order #${order.orderNumber}`,
        data: { orderId: order._id, paymentId: payment._id },
        link: `/admin/marketplace/orders/${order._id}`,
        priority: 'high'
      });
    } catch (error) {
      logger.error('Error sending payment notification:', error);
    }
  }

  // ==========================================
  // SYSTEM NOTIFICATIONS
  // ==========================================

  /**
   * Send system notification to user
   */
  async sendSystemNotification(userId, title, message, link = null) {
    try {
      await this.notifyUser(userId, {
        type: 'system',
        title,
        message,
        link,
        priority: 'low'
      });
    } catch (error) {
      logger.error('Error sending system notification:', error);
    }
  }

  /**
   * Send welcome notification to new user
   */
  async sendWelcomeNotification(user) {
    try {
      await this.notifyUser(user._id, {
        type: 'welcome',
        title: 'Welcome to DevKant Kumar!',
        message: 'Thank you for joining. Explore our marketplace for digital products and services.',
        link: '/marketplace/products',
        priority: 'normal'
      });

      // Also send welcome email
      await this.sendWelcomeEmail(user);
    } catch (error) {
      logger.error('Error sending welcome notification:', error);
    }
  }

  // ==========================================
  // EMAIL NOTIFICATION METHODS (Existing)
  // ==========================================

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
            <p><strong>Total:</strong> ${order.currency || '$'} ${order.totals?.finalTotal || order.totalAmount}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          <h4>Items:</h4>
          <ul>
            ${order.items.map(item => `
              <li>${item.name} - ${order.currency || '$'}${item.price}</li>
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
            <p><strong>Total:</strong> ${order.currency || '$'}${order.totals?.finalTotal || order.totalAmount}</p>
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
      // Also create in-app notification for admin
      await this.notifyAdmins({
        type: 'message',
        title: `Contact Form: ${contactData.subject}`,
        message: `New message from ${contactData.name} (${contactData.email})`,
        data: { contactData },
        link: '/admin/messages',
        priority: 'normal'
      });

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
      // Send system notification
      await this.sendSystemNotification(
        user._id,
        'Password Reset Requested',
        'A password reset was requested for your account. Check your email for instructions.',
        null
      );

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
