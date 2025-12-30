/**
 * Email Templates
 * Stores the HTML structure for various system emails
 */

const getBaseStyles = () => `
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { padding: 30px; text-align: center; border-radius: 10px 10px 0 0; color: white; }
  .content { background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
  .button { display: inline-block; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .footer { text-align: center; margin-top: 30px; color: #888; font-size: 13px; }
  .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; font-size: 14px; color: #856404; }
  .details-box { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e9ecef; }
  .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
  .item:last-child { border-bottom: none; }
  .total { font-size: 18px; font-weight: bold; margin-top: 15px; padding-top: 15px; border-top: 2px solid #ddd; text-align: right; }
`;

const getVerificationEmailTemplate = ({ firstName, verificationUrl }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>${getBaseStyles()}</style>
  </head>
  <body style="background-color: #f4f6f8;">
    <div class="container">
      <div class="header" style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);">
        <h1 style="margin: 0; font-size: 24px;">Welcome to DevKant Kumar!</h1>
      </div>
      <div class="content">
        <h2 style="color: #1f2937; margin-top: 0;">Hi ${firstName},</h2>
        <p>Thank you for joining our community. We're excited to have you on board!</p>
        <p>To get full access to all features, please verify your email address by clicking the button below:</p>

        <div style="text-align: center;">
          <a href="${verificationUrl}" class="button" style="background: #4f46e5; color: white;">Verify Email Address</a>
        </div>

        <p style="font-size: 14px; color: #6b7280;">Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #4f46e5; font-size: 12px; background: #f3f4f6; padding: 10px; border-radius: 4px;">${verificationUrl}</p>

        <div class="warning">
          <strong>Note:</strong> This link will expire in 24 hours for security purposes.
        </div>

        <p>If you didn't create an account, you can safely ignore this email.</p>
        <p style="margin-bottom: 0;">Best regards,<br><strong>DevKant Kumar Team</strong></p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} DevKant Kumar. All rights reserved.</p>
        <p>Questions? Reply to this email or contact support.</p>
      </div>
    </div>
  </body>
  </html>
`;

const getPasswordResetTemplate = ({ firstName, resetUrl }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>${getBaseStyles()}</style>
  </head>
  <body style="background-color: #f4f6f8;">
    <div class="container">
      <div class="header" style="background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);">
        <h1 style="margin: 0; font-size: 24px;">Password Reset Request</h1>
      </div>
      <div class="content">
        <h2 style="color: #1f2937; margin-top: 0;">Hi ${firstName},</h2>
        <p>We received a request to reset your password. If this was you, you can set a new password here:</p>

        <div style="text-align: center;">
          <a href="${resetUrl}" class="button" style="background: #ef4444; color: white;">Reset Password</a>
        </div>

        <div class="warning">
          <strong>⚠️ Security Notice:</strong> If you didn't request this, you can ignore this email. Your password will remain unchanged.
        </div>

        <p style="font-size: 14px; color: #6b7280;">Link not working? Paste this URL into your browser:</p>
        <p style="word-break: break-all; color: #ef4444; font-size: 12px; background: #fff5f5; padding: 10px; border-radius: 4px;">${resetUrl}</p>

        <p style="margin-bottom: 0;">Best regards,<br><strong>DevKant Kumar Team</strong></p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} DevKant Kumar. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
`;

const getOrderConfirmationTemplate = ({ firstName, order }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>${getBaseStyles()}</style>
  </head>
  <body style="background-color: #f4f6f8;">
    <div class="container">
      <div class="header" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
        <h1 style="margin: 0; font-size: 24px;">Order Confirmed!</h1>
        <p style="margin: 5px 0 0; opacity: 0.9;">Order #${order.orderNumber}</p>
      </div>
      <div class="content">
        <h2 style="color: #1f2937; margin-top: 0;">Hi ${firstName},</h2>
        <p>Thank you for your purchase! We've received your order and it's being processed.</p>

        <div class="details-box">
          <h3 style="margin-top: 0; color: #059669; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">Order Summary</h3>
          <p style="margin: 5px 0; color: #666;"><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p style="margin: 5px 0; color: #666;"><strong>Status:</strong> ${order.status}</p>

          <div style="margin-top: 15px;">
            ${order.items.map(item => `
              <div class="item">
                <div style="flex: 1;">
                  <strong>${item.name}</strong>
                  <div style="font-size: 12px; color: #888;">Qty: ${item.quantity}</div>
                </div>
                <div>${(item.quantity * item.price).toFixed(2)}</div>
              </div>
            `).join('')}
          </div>

          <div class="total" style="color: #059669;">
            Total: ${order.totalAmount}
          </div>
        </div>

        <p>You can access your purchased items and downloads from your account dashboard once payment is fully confirmed.</p>
        <p style="margin-bottom: 0;">Best regards,<br><strong>DevKant Kumar Team</strong></p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} DevKant Kumar. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
`;

const getAdminContactTemplate = (contactData) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Contact Submission</title>
    <style>${getBaseStyles()}</style>
  </head>
  <body style="background-color: #f4f6f8;">
    <div class="container">
      <div class="header" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);">
        <h1 style="margin: 0; font-size: 24px;">New Contact Message</h1>
      </div>
      <div class="content">
        <div class="details-box" style="border-left: 4px solid #3b82f6;">
          <h3 style="margin-top: 0;">From: ${contactData.name}</h3>
          <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
          <p><strong>Phone:</strong> ${contactData.phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Type:</strong> ${contactData.type}</p>

          <h4 style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">Message:</h4>
          <p style="white-space: pre-line; background: #fff; padding: 10px; border: 1px solid #eee; border-radius: 4px;">${contactData.message}</p>
        </div>
        <div style="text-align: center;">
          <a href="mailto:${contactData.email}" class="button" style="background: #3b82f6; color: white;">Reply via Email</a>
        </div>
      </div>
    </div>
  </body>
  </html>
`;

const getUserContactAutoReplyTemplate = (contactData) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>We Received Your Message</title>
    <style>${getBaseStyles()}</style>
  </head>
  <body style="background-color: #f4f6f8;">
    <div class="container">
      <div class="header" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
        <h1 style="margin: 0; font-size: 24px;">Message Received</h1>
      </div>
      <div class="content">
        <h2 style="color: #1f2937; margin-top: 0;">Hi ${contactData.name},</h2>
        <p>Thanks for reaching out! We've received your message and will get back to you within 24-48 hours.</p>

        <div class="details-box">
          <h3 style="margin-top: 0; font-size: 16px; color: #666;">Your Message Copy:</h3>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p style="font-style: italic; color: #555;">"${contactData.message}"</p>
        </div>

        <p>If your inquiry is urgent, please feel free to follow up.</p>
        <p style="margin-bottom: 0;">Best regards,<br><strong>DevKant Kumar Team</strong></p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} DevKant Kumar. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
`;

module.exports = {
  getVerificationEmailTemplate,
  getPasswordResetTemplate,
  getOrderConfirmationTemplate,
  getAdminContactTemplate,
  getUserContactAutoReplyTemplate
};
