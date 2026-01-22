/**
 * Email Templates - Premium, Robust, and Responsive
 * Stores the HTML structure for various system emails
 */

const getBaseStyles = () => `
  /* Reset */
  body, p, h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; -webkit-font-smoothing: antialiased; }

  /* Layout */
  .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); }
  .wrapper { background-color: #f3f4f6; padding: 40px 20px; }
  .header { padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #f3f4f6; }
  .content { padding: 40px; }
  .footer { background-color: #f9fafb; padding: 30px; text-align: center; color: #6b7280; font-size: 13px; border-top: 1px solid #e5e7eb; }

  /* Elements */
  h1 { font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 16px; letter-spacing: -0.5px; }
  h2 { font-size: 20px; font-weight: 600; color: #374151; margin-bottom: 16px; }
  p { margin-bottom: 24px; font-size: 16px; color: #4b5563; }
  .button { display: inline-block; padding: 14px 32px; background-color: #4f46e5; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; text-align: center; transition: background-color 0.2s; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3); }
  .button:hover { background-color: #4338ca; }
  .link { color: #4f46e5; text-decoration: underline; }

  /* Components */
  .info-box { background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 4px; margin-bottom: 24px; }
  .warning-box { background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 4px; margin-bottom: 24px; }
  .success-box { background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; border-radius: 4px; margin-bottom: 24px; }
  .code-block { background-color: #1f2937; color: #e5e7eb; padding: 20px; border-radius: 8px; font-family: 'Courier New', Courier, monospace; font-size: 24px; letter-spacing: 4px; text-align: center; margin: 24px 0; font-weight: 700; }
  .divider { border-top: 1px solid #e5e7eb; margin: 32px 0; }
  .field-label { font-size: 12px; text-transform: uppercase; color: #9ca3af; font-weight: 600; margin-bottom: 4px; letter-spacing: 0.5px; }
  .field-value { font-size: 16px; color: #111827; font-weight: 500; }

  /* Grid & Tables for Email */
  .row { width: 100%; display: flex; flex-wrap: wrap; margin-bottom: 16px; }
  .col { flex: 1; padding-right: 16px; }
  .col:last-child { padding-right: 0; }

  /* Utilities */
  .text-center { text-align: center; }
  .text-sm { font-size: 14px; }
  .text-xs { font-size: 12px; }
  .text-muted { color: #6b7280; }
  .mb-0 { margin-bottom: 0; }
  .mt-4 { margin-top: 16px; }
`;

// Helper for consistent HTML shell
const wrapHtml = (title, content, preheader = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>${getBaseStyles()}</style>
  <!--[if mso]>
  <style>
    table {border-collapse: collapse;}
    .code-block {letter-spacing: 4px;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6;">
  <!-- Hidden Preheader -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    ${preheader}
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <div class="wrapper">
    <div class="container">
      <div class="header">
        <img src="https://devkantkumar.com/assets/logo.png" alt="Dev Kant Kumar" style="height: 40px; width: auto;" onerror="this.style.display='none'">
        <div style="margin-top: 10px; font-weight: 700; font-size: 20px; color: #111827; display: ${'block' /* fallback if image breaks */}">Dev Kant Kumar</div>
      </div>

      <div class="content">
        ${content}
      </div>

      <div class="footer">
        <p class="text-xs mb-0">
          &copy; ${new Date().getFullYear()} Dev Kant Kumar. All rights reserved.<br>
          Made with ❤️ by Dev Kant Kumar Team.
        </p>
        <p class="text-xs mt-4">
          <a href="https://devkantkumar.com/privacy" class="text-muted">Privacy Policy</a> &bull;
          <a href="https://devkantkumar.com/terms" class="text-muted">Terms of Service</a> &bull;
          <a href="https://devkantkumar.com/support" class="text-muted">Support</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

const getVerificationEmailTemplate = ({ firstName, verificationUrl }) => {
  const content = `
    <h1>Verify Your Email Address</h1>
    <p>Hi ${firstName},</p>
    <p>Welcome to Dev Kant Kumar! We're thrilled to have you join our community of developers and creators.</p>
    <p>To ensure the security of your account and get full access to all features, please verify your email address by clicking the button below.</p>

    <div class="text-center" style="margin: 32px 0;">
      <a href="${verificationUrl}" class="button">Verify Email</a>
    </div>

    <div class="info-box">
      <p class="mb-0 text-sm"><strong>Note:</strong> This verification link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
    </div>

    <p class="text-sm text-muted" style="margin-top: 32px;">
      If the button doesn't work, copy and paste this link into your browser:<br>
      <a href="${verificationUrl}" class="link" style="word-break: break-all;">${verificationUrl}</a>
    </p>
  `;
  return wrapHtml('Verify Email - Dev Kant Kumar', content, 'Please verify your email address to complete your registration.');
};

const getPasswordResetTemplate = ({ firstName, resetUrl }) => {
  const content = `
    <h1>Reset Your Password</h1>
    <p>Hi ${firstName},</p>
    <p>We received a request to reset the password for your Dev Kant Kumar account.</p>
    <p>If you made this request, please click the button below to create a new password. If you didn't make this request, you can safely ignore this email—your account remains secure.</p>

    <div class="text-center" style="margin: 32px 0;">
      <a href="${resetUrl}" class="button" style="background-color: #ef4444;">Reset Password</a>
    </div>

    <div class="warning-box">
      <p class="mb-0 text-sm"><strong>Security Alert:</strong> This link expires in 10 minutes. Do not share this link with anyone.</p>
    </div>

    <p class="text-sm text-muted" style="margin-top: 32px;">
      Trouble formatting? Copy this link:<br>
      <a href="${resetUrl}" class="link" style="color: #ef4444; word-break: break-all;">${resetUrl}</a>
    </p>
  `;
  return wrapHtml('Reset Password', content, 'Action required: Reset your password.');
};

const getPasswordResetSuccessTemplate = ({ firstName, resetTime, ipAddress, userAgent, loginUrl, forgotPasswordUrl }) => {
  const content = `
    <h1 style="color: #10b981;">Password Changed</h1>
    <p>Hi ${firstName},</p>
    <p>This email confirms that the password for your Dev Kant Kumar account was successfully changed.</p>

    <div class="success-box">
      <div class="field-label">Time of Change</div>
      <div class="field-value" style="margin-bottom: 12px;">${resetTime}</div>

      ${ipAddress ? `
      <div class="field-label">IP Address</div>
      <div class="field-value" style="margin-bottom: 12px;">${ipAddress}</div>
      ` : ''}
    </div>

    <p>You can now sign in to your account with your new password.</p>

    <div class="text-center" style="margin: 32px 0;">
      <a href="${loginUrl}" class="button" style="background-color: #10b981;">Sign In to Account</a>
    </div>

    <div class="divider"></div>

    <p class="text-sm text-muted">
      <strong>Didn't do this?</strong> If you didn't change your password, someone else might have access to your account.
      <a href="${forgotPasswordUrl}" style="color: #ef4444; font-weight: 600;">Reset your password immediately</a> and contact support.
    </p>
  `;
  return wrapHtml('Password Changed Successfully', content, 'Your password has been successfully updated.');
};

const getOrderConfirmationTemplate = ({ firstName, order, orderUrl }) => {
  // Helper to format currency
  const formatCurrency = (amount, currency = 'INR') => {
    const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };
    const symbol = symbols[currency] || currency + ' ';
    return `${symbol}${(amount || 0).toFixed(2)}`;
  };

  const currency = order.payment?.currency || 'INR';
  const subtotal = order.payment?.amount?.subtotal || 0;
  const tax = order.payment?.amount?.tax || 0;
  const total = order.payment?.amount?.total || 0;
  const date = new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
        <div style="font-weight: 600; color: #111827;">${item.title || item.name}</div>
        <div style="font-size: 12px; color: #6b7280;">Qty: ${item.quantity}</div>
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 500;">
        ${formatCurrency(item.quantity * item.price, currency)}
      </td>
    </tr>
  `).join('');

  const content = `
    <div class="text-center">
      <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background-color: #ecfdf5; border-radius: 50%; color: #10b981; margin-bottom: 24px;">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32" stroke-width="2">
           <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
    <h1 class="text-center">Order Confirmed!</h1>
    <p class="text-center text-muted">Order #${order.orderNumber}</p>

    <p>Hi ${firstName},</p>
    <p>Thank you for your purchase! We've received your order and it is now being processed.</p>

    <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin: 24px 0;">
      <h3 style="margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">Order Summary</h3>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        ${itemsHtml}
      </table>

      <div style="margin-top: 16px; padding-top: 16px; border-top: 2px solid #e5e7eb;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding: 4px 0; color: #6b7280;">Subtotal</td>
            <td style="padding: 4px 0; text-align: right; font-weight: 500;">${formatCurrency(subtotal, currency)}</td>
          </tr>
          ${tax > 0 ? `
          <tr>
            <td style="padding: 4px 0; color: #6b7280;">Tax</td>
            <td style="padding: 4px 0; text-align: right; font-weight: 500;">${formatCurrency(tax, currency)}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 12px 0 0; font-weight: 700; font-size: 18px; color: #111827;">Total</td>
            <td style="padding: 12px 0 0; text-align: right; font-weight: 700; font-size: 18px; color: #111827;">${formatCurrency(total, currency)}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="text-center" style="margin: 32px 0;">
      <a href="${orderUrl}" class="button" style="background-color: #2563eb;">View Order Details</a>
    </div>

    <p class="text-sm text-center text-muted">
      Questions? Just reply to this email, and we'll be happy to help.
    </p>
  `;
  return wrapHtml(`Order Confirmation #${order.orderNumber}`, content, 'Your order has been confirmed successfully.');
};

const getAdminContactTemplate = (contactData) => {
  const content = `
    <h1>New Contact Message</h1>
    <div class="info-box" style="background-color: #f3f4f6; border-left-color: #4b5563;">
      <div class="field-label">Subject</div>
      <div class="field-value">${contactData.subject}</div>
    </div>

    <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
       <div class="field-label">Sender Name</div>
       <div class="field-value" style="margin-bottom: 16px;">${contactData.name}</div>

       <div class="field-label">Sender Email</div>
       <div class="field-value" style="margin-bottom: 16px;">
         <a href="mailto:${contactData.email}" class="link">${contactData.email}</a>
       </div>

       <div class="field-label">Phone</div>
       <div class="field-value" style="margin-bottom: 16px;">${contactData.phone || 'N/A'}</div>

       <div class="field-label">Type</div>
       <div class="field-value" style="margin-bottom: 16px;">${contactData.type}</div>

       <div class="divider"></div>

       <div class="field-label">Message</div>
       <p style="white-space: pre-wrap; margin-bottom: 0;">${contactData.message}</p>
    </div>

    <div class="text-center">
      <a href="mailto:${contactData.email}" class="button">Reply to User</a>
    </div>
  `;
  return wrapHtml(`New Contact: ${contactData.subject}`, content, `New message from ${contactData.name}`);
};

const getUserContactAutoReplyTemplate = (contactData) => {
  const content = `
    <h1>We've Received Your Message</h1>
    <p>Hi ${contactData.name},</p>
    <p>Thank you for reaching out! This is an automated confirmation that we've received your message regarding "<strong>${contactData.subject}</strong>".</p>
    <p>Our team will review your inquiry and get back to you within 24-48 hours.</p>

    <div class="info-box">
      <p class="mb-0 text-sm"><strong>Your Message:</strong><br>"${contactData.message}"</p>
    </div>

    <p class="text-sm text-muted">If your matter is urgent, please feel free to send a follow-up email.</p>
  `;
  return wrapHtml('Message Received - Dev Kant Kumar', content, 'Thanks for contacting us.');
};

const getNewsletterWelcomeTemplate = ({ email, unsubscribeUrl }) => {
  const content = `
    <h1>You're In! 🚀</h1>
    <p>Hi there,</p>
    <p>Thanks so much for subscribing to my newsletter. I'm thrilled to have you join this community of tech enthusiasts!</p>

    <div style="background-color: #f0fdf4; border-radius: 8px; padding: 24px; margin: 24px 0;">
      <h3 style="margin-top: 0; color: #166534;">What to expect:</h3>
      <ul style="margin-bottom: 0; color: #166534; padding-left: 20px;">
        <li style="margin-bottom: 8px;">Exclusive insights into my latest projects</li>
        <li style="margin-bottom: 8px;">Deep dives into web development & tech trends</li>
        <li>Early access to new tools and resources</li>
      </ul>
    </div>

    <p>I promise to respect your inbox—only high-quality, relevant content, no spam.</p>

    <div class="text-center" style="margin: 32px 0;">
      <a href="https://devkantkumar.com/blog" class="button" style="background-color: #059669;">Read Latest Articles</a>
    </div>

    <p class="text-xs text-muted text-center" style="margin-top: 40px;">
      You subscribed with ${email}. <br>
      <a href="${unsubscribeUrl}" class="text-muted" style="text-decoration: underline;">Unsubscribe</a> if you no longer wish to receive updates.
    </p>
  `;
  return wrapHtml('Welcome to the Newsletter', content, 'Thanks for subscribing! Here\'s what to expect.');
};

const getEmailChangeOtpTemplate = ({ otp, type }) => {
  const isNewEmail = type !== 'current';
  const title = isNewEmail ? 'Verify New Email' : 'Verify Email Change';
  const content = `
    <h1>${title}</h1>
    <p>Authorization is required to change the email address associated with your account.</p>
    <p>Please use the verification code below to confirm this request:</p>

    <div class="code-block">${otp}</div>

    <div class="warning-box">
      <p class="mb-0 text-sm"><strong>Security Note:</strong> This code expires in 10 minutes. Do not share it with anyone.</p>
    </div>

    <p class="text-sm text-muted">
      If you did not initiate this request, please contact support immediately.
    </p>
  `;
  return wrapHtml(title, content, `Your verification code is ${otp}`);
};

const getPasswordChangeOtpTemplate = ({ otp }) => {
  const content = `
    <h1>Verify Password Change</h1>
    <p>We received a request to change the password for your account.</p>
    <p>To confirm this change, please enter the following verification code:</p>

    <div class="code-block">${otp}</div>

    <div class="warning-box">
      <p class="mb-0 text-sm"><strong>Expires in 10 minutes.</strong> Never share your verification codes.</p>
    </div>

    <p class="text-sm text-muted">
      <strong>Didn't ask for this?</strong> If you didn't request a password update, someone may be trying to access your account. Secure your account immediately.
    </p>
  `;
  return wrapHtml('Verify Password Change', content, `Your verification code is ${otp}`);
};

const getAccountDeactivationTemplate = ({ firstName, scheduledDeletionDate, reactivationUrl }) => {
  const content = `
    <h1 style="color: #d97706;">Account Deactivated</h1>
    <p>Hi ${firstName},</p>
    <p>We're sorry to see you go. As requested, your account has been deactivated.</p>

    <div class="warning-box" style="border-color: #d97706; background-color: #fffbeb;">
      <h3 style="color: #92400e; margin-top: 0;">Final Deletion Date</h3>
      <div style="font-size: 18px; font-weight: 700; color: #b45309;">${scheduledDeletionDate}</div>
      <p style="margin-bottom: 0; margin-top: 8px; font-size: 14px;">Your data will be permanently removed on this date.</p>
    </div>

    <p>If you change your mind before the deletion date, simply sign in to reactivate your account instanty.</p>

    <div class="text-center" style="margin: 32px 0;">
      <a href="${reactivationUrl}" class="button" style="background-color: #d97706;">Reactivate Account</a>
    </div>
  `;
  return wrapHtml('Account Deactivation', content, 'Your account has been deactivated.');
};

const getAccountReactivationTemplate = ({ firstName, dashboardUrl }) => {
  const content = `
    <h1>Welcome Back! 🎉</h1>
    <p>Hi ${firstName},</p>
    <p>Great news! Your account has been successfully reactivated.</p>

    <div class="success-box">
      <p class="mb-0"><strong>Status:</strong> Active</p>
      <p class="mb-0"><strong>Scheduled Deletion:</strong> Cancelled</p>
    </div>

    <p>All your data, settings, and purchase history have been restored. You can pick up right where you left off.</p>

    <div class="text-center" style="margin: 32px 0;">
      <a href="${dashboardUrl || 'https://devkantkumar.com'}" class="button">Go to Dashboard</a>
    </div>
  `;
  return wrapHtml('Account Reactivated', content, 'Welcome back! Your account has been restored.');
};

module.exports = {
  getVerificationEmailTemplate,
  getPasswordResetTemplate,
  getPasswordResetSuccessTemplate,
  getOrderConfirmationTemplate,
  getAdminContactTemplate,
  getUserContactAutoReplyTemplate,
  getNewsletterWelcomeTemplate,
  getAccountDeactivationTemplate,
  getAccountReactivationTemplate,
  getEmailChangeOtpTemplate,
  getPasswordChangeOtpTemplate
};
