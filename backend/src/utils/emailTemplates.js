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
        <h1 style="margin: 0; font-size: 24px;">🔐 Password Reset Request</h1>
      </div>
      <div class="content">
        <h2 style="color: #1f2937; margin-top: 0;">Hi ${firstName},</h2>
        <p>We received a request to reset your password for your DevKant Kumar account. Click the button below to create a new password:</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" class="button" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 14px 40px; font-size: 16px;">Reset My Password</a>
        </div>

        <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">
            <strong>⏰ This link expires in 10 minutes</strong> for your security.
          </p>
        </div>

        <div class="warning">
          <strong>⚠️ Didn't request this?</strong> If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged and your account is secure.
        </div>

        <div class="details-box">
          <p style="margin: 0 0 10px; font-size: 14px; color: #6b7280;"><strong>Link not working?</strong> Copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; color: #ef4444; font-size: 12px; background: #fff5f5; padding: 12px; border-radius: 6px; margin: 0; font-family: monospace;">${resetUrl}</p>
        </div>

        <p style="margin-bottom: 0; margin-top: 25px;">Stay secure,<br><strong>DevKant Kumar Team</strong></p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} DevKant Kumar. All rights reserved.</p>
        <p style="font-size: 11px; color: #9ca3af;">This is an automated security email. Please do not reply.</p>
      </div>
    </div>
  </body>
  </html>
`;

const getPasswordResetSuccessTemplate = ({ firstName, resetTime, ipAddress, userAgent }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Changed Successfully</title>
    <style>${getBaseStyles()}</style>
  </head>
  <body style="background-color: #f4f6f8;">
    <div class="container">
      <div class="header" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
        <h1 style="margin: 0; font-size: 24px;">✅ Password Changed Successfully</h1>
      </div>
      <div class="content">
        <h2 style="color: #1f2937; margin-top: 0;">Hi ${firstName},</h2>
        <p>This is a confirmation that the password for your DevKant Kumar account was successfully changed.</p>

        <div class="details-box" style="border-left: 4px solid #10b981;">
          <h3 style="margin: 0 0 15px; color: #059669; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Change Details</h3>
          <p style="margin: 8px 0; font-size: 14px;"><strong>Time:</strong> ${resetTime}</p>
          ${ipAddress ? `<p style="margin: 8px 0; font-size: 14px;"><strong>IP Address:</strong> ${ipAddress}</p>` : ''}
          ${userAgent ? `<p style="margin: 8px 0; font-size: 14px;"><strong>Device:</strong> ${userAgent}</p>` : ''}
        </div>

        <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #dc2626; font-size: 14px;">
            <strong>🚨 Wasn't you?</strong> If you didn't change your password, your account may be compromised. Please <a href="${process.env.CORS_ORIGIN || 'http://localhost:5173'}/marketplace/auth/forgot-password" style="color: #dc2626; font-weight: bold;">reset your password immediately</a> and contact our support team.
          </p>
        </div>

        <p>You can now sign in to your account using your new password.</p>

        <div style="text-align: center; margin: 25px 0;">
          <a href="${process.env.CORS_ORIGIN || 'http://localhost:5173'}/marketplace/auth/signin" class="button" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 12px 35px;">Sign In Now</a>
        </div>

        <p style="margin-bottom: 0;">Stay secure,<br><strong>DevKant Kumar Team</strong></p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} DevKant Kumar. All rights reserved.</p>
        <p style="font-size: 11px; color: #9ca3af;">This is an automated security notification. Please do not reply.</p>
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

const getNewsletterWelcomeTemplate = ({ email }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to the Newsletter!</title>
    <style>${getBaseStyles()}</style>
  </head>
  <body style="background-color: #f4f6f8;">
    <div class="container">
      <div class="header" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);">
        <h1 style="margin: 0; font-size: 24px;">You're In! 🚀</h1>
      </div>
      <div class="content">
        <h2 style="color: #1f2937; margin-top: 0;">Hi there,</h2>
        <p>Thanks for subscribing to my newsletter! I'm thrilled to have you as part of my community.</p>
        <p>From now on, you'll be among the first to receive updates on:</p>
        <ul style="color: #4b5563;">
          <li>Latest projects and open-source contributions</li>
          <li>In-depth tech articles and blog posts</li>
          <li>Exclusive insights and announcements</li>
        </ul>

        <p>I promise to keep things interesting and only send you content that matters.</p>
        <p>In the meantime, feel free to explore my latest work on my portfolio or follow me on social media for real-time updates.</p>

        <p style="margin-bottom: 0;">Best regards,<br><strong>DevKant Kumar</strong></p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} DevKant Kumar. All rights reserved.</p>
        <p>You received this email because you subscribed at <a href="https://devkantkumar.com" style="color: #3b82f6; text-decoration: none;">devkantkumar.com</a></p>
        <p style="font-size: 11px; color: #aaa;">Want to take a break? You can unsubscribe at any time from your settings.</p>
      </div>
    </div>
  </body>
  </html>
`;

const getAccountDeactivationTemplate = ({ firstName, scheduledDeletionDate, reactivationUrl }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Deactivation Confirmation</title>
    <style>${getBaseStyles()}</style>
  </head>
  <body style="background-color: #f4f6f8;">
    <div class="container">
      <div class="header" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
        <h1 style="margin: 0; font-size: 24px;">Account Deactivation</h1>
      </div>
      <div class="content">
        <h2 style="color: #1f2937; margin-top: 0;">Hi ${firstName},</h2>
        <p>We're sorry to see you go. Your account has been deactivated as requested.</p>

        <div class="warning" style="background: #fef3c7; border-color: #fcd34d;">
          <strong>⏳ Important:</strong> Your account and all associated data will be permanently deleted on <strong>${scheduledDeletionDate}</strong>.
        </div>

        <p>If you change your mind, you can reactivate your account at any time before the deletion date by:</p>
        <ul style="color: #4b5563;">
          <li>Simply signing in to your account, or</li>
          <li>Clicking the button below</li>
        </ul>

        <div style="text-align: center;">
          <a href="${reactivationUrl}" class="button" style="background: #10b981; color: white;">Reactivate My Account</a>
        </div>

        <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">After ${scheduledDeletionDate}, your account and all data will be permanently removed and cannot be recovered.</p>

        <p style="margin-bottom: 0;">Best regards,<br><strong>DevKant Kumar Team</strong></p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} DevKant Kumar. All rights reserved.</p>
        <p>Questions? Contact our support team.</p>
      </div>
    </div>
  </body>
  </html>
`;

const getAccountReactivationTemplate = ({ firstName }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Back!</title>
    <style>${getBaseStyles()}</style>
  </head>
  <body style="background-color: #f4f6f8;">
    <div class="container">
      <div class="header" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
        <h1 style="margin: 0; font-size: 24px;">Welcome Back! 🎉</h1>
      </div>
      <div class="content">
        <h2 style="color: #1f2937; margin-top: 0;">Hi ${firstName},</h2>
        <p>Great news! Your account has been successfully reactivated.</p>

        <div class="details-box" style="border-left: 4px solid #10b981;">
          <p style="margin: 0;"><strong>✅ Account Status:</strong> Active</p>
          <p style="margin: 10px 0 0;"><strong>✅ Scheduled Deletion:</strong> Cancelled</p>
        </div>

        <p>All your data, orders, and settings have been restored. You can continue using your account as before.</p>

        <p>We're glad to have you back in our community!</p>

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
  getPasswordResetSuccessTemplate,
  getOrderConfirmationTemplate,
  getAdminContactTemplate,
  getUserContactAutoReplyTemplate,
  getNewsletterWelcomeTemplate,
  getAccountDeactivationTemplate,
  getAccountReactivationTemplate
};
