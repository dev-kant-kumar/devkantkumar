const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  async initializeTransporter() {
    try {
      // Check if email credentials are configured
      const hasBrevoConfig = process.env.BREVO_API_KEY && process.env.BREVO_API_KEY !== 'your_brevo_api_key_here';
      const hasSmtpConfig = process.env.SMTP_USER && process.env.SMTP_PASS &&
                           process.env.SMTP_USER !== 'your_smtp_user' &&
                           process.env.SMTP_PASS !== 'your_smtp_password';

      if (!hasBrevoConfig && !hasSmtpConfig) {
        logger.warn('Email credentials not configured - email service disabled');
        this.transporter = null;
        return;
      }

      // Configure transporter based on environment
      if (hasBrevoConfig) {
        // Use Brevo (Sendinblue) SMTP
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
          port: parseInt(process.env.SMTP_PORT) || 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS || process.env.BREVO_API_KEY
          }
        });
      } else if (hasSmtpConfig) {
        // Fallback to Gmail or other SMTP
        this.transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });
      }

      // Verify connection
      await this.transporter.verify();
      logger.info('Email service initialized successfully');
    } catch (error) {
      logger.warn(`Email service initialization failed: ${error.message} - continuing without email`);
      this.transporter = null;
    }
  }

  async sendEmail(options) {
    if (!this.transporter) {
      logger.warn(`Email service not available - skipping email to ${options.to}`);
      return { messageId: 'email-service-disabled', info: 'Email service not configured' };
    }

    const mailOptions = {
      from: `${process.env.BREVO_SENDER_NAME || 'DevKant Kumar'} <${process.env.BREVO_SENDER_EMAIL || process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent successfully to ${options.to}`);
      return result;
    } catch (error) {
      logger.error(`Failed to send email to ${options.to}: ${error.message}`);
      throw error;
    }
  }

  async sendVerificationEmail(email, token, firstName) {
    const verificationUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/api/v1/auth/verify-email/${token}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to DevKant Kumar!</h1>
          </div>
          <div class="content">
            <h2>Hi ${firstName},</h2>
            <p>Thank you for registering with DevKant Kumar's platform. To complete your registration, please verify your email address by clicking the button below:</p>
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
            <p><strong>This link will expire in 24 hours.</strong></p>
            <p>If you didn't create an account with us, please ignore this email.</p>
            <p>Best regards,<br>DevKant Kumar Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 DevKant Kumar. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: 'Verify Your Email Address',
      html
    });
  }

  async sendPasswordResetEmail(email, token, firstName) {
    const resetUrl = `${process.env.CORS_ORIGIN || 'http://localhost:5173'}/reset-password/${token}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hi ${firstName},</h2>
            <p>We received a request to reset your password for your DevKant Kumar account.</p>
            <div class="warning">
              <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email and your password will remain unchanged.
            </div>
            <p>To reset your password, click the button below:</p>
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
            <p><strong>This link will expire in 10 minutes for security reasons.</strong></p>
            <p>Best regards,<br>DevKant Kumar Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 DevKant Kumar. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: 'Reset Your Password',
      html
    });
  }

  async sendOrderConfirmationEmail(email, order, firstName) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745; }
          .item { border-bottom: 1px solid #eee; padding: 10px 0; }
          .item:last-child { border-bottom: none; }
          .total { font-size: 18px; font-weight: bold; color: #28a745; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase</p>
          </div>
          <div class="content">
            <h2>Hi ${firstName},</h2>
            <p>Your order has been confirmed and is being processed. Here are the details:</p>

            <div class="order-details">
              <h3>Order #${order.orderNumber}</h3>
              <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Status:</strong> ${order.status}</p>

              <h4>Items:</h4>
              ${order.items.map(item => `
                <div class="item">
                  <strong>${item.name}</strong><br>
                  <span>Quantity: ${item.quantity} × ${item.price} = ${(item.quantity * item.price).toFixed(2)}</span>
                </div>
              `).join('')}

              <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #28a745;">
                <p class="total">Total: ${order.totalAmount}</p>
              </div>
            </div>

            <p>You will receive download links and access to your purchased items once payment is confirmed.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
            <p>Best regards,<br>DevKant Kumar Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 DevKant Kumar. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: `Order Confirmation - #${order.orderNumber}`,
      html
    });
  }

  async sendContactFormEmail(contactData) {
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .contact-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #007bff; }
          .message-box { background: #e9ecef; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="contact-details">
              <h3>Contact Information</h3>
              <p><strong>Name:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
              <p><strong>Subject:</strong> ${contactData.subject}</p>
              <p><strong>Type:</strong> ${contactData.type}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>

              <h4>Message:</h4>
              <div class="message-box">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          <div class="footer">
            <p>&copy; 2024 DevKant Kumar. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send to admin
    await this.sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New Contact: ${contactData.subject}`,
      html: adminHtml
    });

    // Send auto-reply to user
    const userHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Us</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .message-copy { background: #e9ecef; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #28a745; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You!</h1>
            <p>We've received your message</p>
          </div>
          <div class="content">
            <h2>Hi ${contactData.name},</h2>
            <p>Thank you for reaching out to us. We have received your message and will get back to you within 24-48 hours.</p>

            <h4>Your Message:</h4>
            <div class="message-copy">
              <strong>Subject:</strong> ${contactData.subject}<br><br>
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>

            <p>If you have any urgent questions, please don't hesitate to call us directly.</p>
            <p>Best regards,<br>DevKant Kumar Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 DevKant Kumar. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: contactData.email,
      subject: 'Thank you for contacting us!',
      html: userHtml
    });
  }
}

module.exports = new EmailService();
