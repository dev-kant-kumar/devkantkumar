/**
 * Email Templates - Premium, Robust, and Responsive
 * Stores the HTML structure for various system emails
 */

const COMPANY_INFO = {
  name: 'Dev Kant Kumar Marketplace',
  url: 'https://devkantkumar.com',
  logo: 'https://avatars.githubusercontent.com/u/101362859?v=4',
  supportEmail: 'hello@devkantkumar.com',
  address: 'Patna, Bihar, India',
  social: {
    twitter: 'https://x.com/dev_kant_kumar',
    linkedin: 'https://linkedin.com/in/devkantkumar',
    github: 'https://github.com/dev-kant-kumar',
    instagram: 'https://instagram.com/devkantkumar.in'
  }
};

const getBaseStyles = () => `
  /* Reset */
  body, p, h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; }
  body {
    font-family: 'Google Sans', Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: #374151;
    -webkit-font-smoothing: antialiased;
    background-color: #fce7f3; /* Fallback/Page bg */
  }

  /* Layout */
  .email-wrapper { background-color: #f9fafb; padding: 40px 10px; }
  .email-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
    border: 1px solid #f3f4f6;
  }

  /* Header */
  .email-header {
    background-color: #ffffff;
    padding: 32px 40px;
    text-align: center;
    border-bottom: 1px solid #f3f4f6;
  }

  /* Content */
  .email-content { padding: 40px; }

  /* Footer */
  .email-footer {
    background-color: #f9fafb;
    padding: 32px 40px;
    text-align: center;
    color: #9ca3af;
    font-size: 12px;
    border-top: 1px solid #e5e7eb;
  }

  /* Typography */
  h1 {
    font-size: 24px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 24px;
    letter-spacing: -0.025em;
    line-height: 1.3;
  }
  h2 { font-size: 18px; font-weight: 600; color: #374151; margin-bottom: 16px; margin-top: 32px; }
  p { margin-bottom: 24px; font-size: 16px; color: #4b5563; line-height: 1.625; }

  /* Components */
  .button {
    display: inline-block;
    padding: 14px 32px;
    background-color: #059669; /* Marketplace Emerald */
    color: #ffffff !important;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;
    text-align: center;
    transition: all 0.2s;
    box-shadow: 0 4px 6px -1px rgba(5, 150, 105, 0.2);
    border: 1px solid #059669;
  }
  .button:hover { background-color: #047857; box-shadow: 0 6px 8px -1px rgba(5, 150, 105, 0.3); }

  .link { color: #059669; text-decoration: none; font-weight: 500; }
  .link:hover { text-decoration: underline; color: #047857; }

  /* Info Boxes */
  .box { padding: 20px; border-radius: 8px; margin-bottom: 24px; font-size: 14px; line-height: 1.5; }
  .box-info { background-color: #ecfdf5; border: 1px solid #a7f3d0; color: #064e3b; }
  .box-warning { background-color: #fffbeb; border: 1px solid #fde68a; color: #92400e; }
  .box-danger { background-color: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }

  .code-block {
    background-color: #f3f4f6;
    color: #1f2937;
    padding: 24px;
    border-radius: 12px;
    font-family: 'SF Mono', 'Roboto Mono', Menlo, monospace;
    font-size: 28px;
    letter-spacing: 8px;
    text-align: center;
    margin: 32px 0;
    font-weight: 700;
    border: 1px solid #e5e7eb;
  }

  .divider { border-top: 1px solid #e5e7eb; margin: 32px 0; }

  /* Grid & Key-Value Pairs */
  .kv-row { margin-bottom: 12px; display: flex; justify-content: space-between; border-bottom: 1px solid #f3f4f6; padding-bottom: 12px; }
  .kv-label { font-size: 13px; color: #6b7280; font-weight: 500; }
  .kv-value { font-size: 15px; color: #111827; font-weight: 600; text-align: right; }

  /* Utilities */
  .text-center { text-align: center; }
  .text-sm { font-size: 14px; }
  .text-xs { font-size: 12px; }
  .text-muted { color: #9ca3af; }
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
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb;">
  <!-- Preheader -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    ${preheader}
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <div class="email-wrapper">
    <div class="email-container">
      <!-- Top Colored Bar -->
      <div style="height: 4px; background: linear-gradient(to right, #059669, #10b981);"></div>

      <div class="email-header">
        <a href="${COMPANY_INFO.url}" target="_blank" style="text-decoration: none;">
          <img src="${COMPANY_INFO.logo}" alt="${COMPANY_INFO.name}" style="height: 48px; width: 48px; border-radius: 8px; display: inline-block; vertical-align: middle;">
          <span style="display: block; margin-top: 12px; font-weight: 700; font-size: 18px; color: #111827; letter-spacing: -0.5px;">${COMPANY_INFO.name}</span>
        </a>
      </div>

      <div class="email-content">
        ${content}
      </div>

      <div class="email-footer">
        <div style="margin-bottom: 24px;">
           <a href="${COMPANY_INFO.social.twitter}" style="margin: 0 8px; text-decoration: none;"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="20" height="20" alt="Twitter" style="opacity: 0.6;"></a>
           <a href="${COMPANY_INFO.social.linkedin}" style="margin: 0 8px; text-decoration: none;"><img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" width="20" height="20" alt="LinkedIn" style="opacity: 0.6;"></a>
           <a href="${COMPANY_INFO.social.github}" style="margin: 0 8px; text-decoration: none;"><img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" width="20" height="20" alt="GitHub" style="opacity: 0.6;"></a>
        </div>

        <p style="margin-bottom: 12px; color: #6b7280;">
          &copy; ${new Date().getFullYear()} ${COMPANY_INFO.name}. All rights reserved.<br>
        </p>
        <p style="margin-bottom: 24px; line-height: 1.5;">
          ${COMPANY_INFO.address}<br>
          <span style="font-size: 11px;">You are receiving this email because you created an account or subscribed to updates.</span>
        </p>

        <p class="text-xs">
          <a href="${COMPANY_INFO.url}/privacy" class="link" style="color: #6b7280; font-weight: 400;">Privacy</a> &nbsp;&bull;&nbsp;
          <a href="${COMPANY_INFO.url}/terms" class="link" style="color: #6b7280; font-weight: 400;">Terms</a> &nbsp;&bull;&nbsp;
          <a href="${COMPANY_INFO.url}/support" class="link" style="color: #6b7280; font-weight: 400;">Support</a>
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
    <p>Welcome to ${COMPANY_INFO.name}! We're thrilled to have you join our community.</p>
    <p>To ensure the security of your account and get full access to all features, please verify your email address by clicking the button below.</p>

    <div class="text-center" style="margin: 32px 0;">
      <a href="${verificationUrl}" class="button">Verify Email</a>
    </div>

    <div class="box box-info">
      <p class="mb-0 text-sm"><strong>Note:</strong> This verification link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
    </div>

    <p class="text-sm text-muted" style="margin-top: 32px;">
      If the button doesn't work, copy and paste this link into your browser:<br>
      <a href="${verificationUrl}" class="link" style="word-break: break-all;">${verificationUrl}</a>
    </p>
  `;
  return wrapHtml(`Verify Email - ${COMPANY_INFO.name}`, content, 'Please verify your email address to complete your registration.');
};

const getPasswordResetTemplate = ({ firstName, resetUrl }) => {
  const content = `
    <h1>Reset Your Password</h1>
    <p>Hi ${firstName},</p>
    <p>We received a request to reset the password for your ${COMPANY_INFO.name} account.</p>
    <p>If you made this request, please click the button below to create a new password. If you didn't make this request, you can safely ignore this email—your account remains secure.</p>

    <div class="text-center" style="margin: 32px 0;">
      <a href="${resetUrl}" class="button" style="background-color: #ef4444;">Reset Password</a>
    </div>

    <div class="box box-warning">
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
    <p>This email confirms that the password for your ${COMPANY_INFO.name} account was successfully changed.</p>

    <div class="box box-info">
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
    <div class="box box-info" style="background-color: #f3f4f6; border-color: #4b5563; color: #374151;">
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

    <div class="box box-info">
      <p class="mb-0 text-sm"><strong>Your Message:</strong><br>"${contactData.message}"</p>
    </div>

    <p class="text-sm text-muted">If your matter is urgent, please feel free to send a follow-up email.</p>
  `;
  return wrapHtml(`Message Received - ${COMPANY_INFO.name}`, content, 'Thanks for contacting us.');
};

const getNewsletterWelcomeTemplate = ({ email, unsubscribeUrl }) => {
  const content = `
    <h1>Welcome to the Inner Circle! 🚀</h1>
    <p>Hi there,</p>
    <p>You've just made a great decision. By joining the <strong>${COMPANY_INFO.name}</strong> newsletter, you're now part of a community dedicated to building better software, faster.</p>

    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 24px; margin: 32px 0;">
      <h3 style="margin-top: 0; color: #166534; font-size: 18px; margin-bottom: 16px;">Here's what you've unlocked:</h3>
      <ul style="margin-bottom: 0; color: #15803d; padding-left: 20px;">
        <li style="margin-bottom: 12px;"><strong>Early Access:</strong> Be the first to know about new products & templates.</li>
        <li style="margin-bottom: 12px;"><strong>Exclusive Discounts:</strong> Subscriber-only deals on premium assets.</li>
        <li style="margin-bottom: 0;"><strong>Tech Insights:</strong> Deep dives into scalable architecture and modern stack trends.</li>
      </ul>
    </div>

    <p>We believe in quality over quantity. You'll only hear from us when we have something valuable to share—like a game-changing tool or a critical industry update.</p>

    <div class="text-center" style="margin: 40px 0;">
      <a href="${COMPANY_INFO.url}/marketplace/products" class="button">Explore Marketplace</a>
    </div>

    <div class="box box-info" style="text-align: center; background-color: #eff6ff; border-color: #bfdbfe; color: #1e40af;">
      <p class="mb-0 text-sm">
        <strong>Tip:</strong> Add <a href="mailto:${COMPANY_INFO.supportEmail}" style="color: #2563eb; text-decoration: underline;">${COMPANY_INFO.supportEmail}</a> to your contacts to ensure you never miss an update.
      </p>
    </div>

    <p class="text-xs text-muted text-center" style="margin-top: 40px;">
      You subscribed with ${email}. <br>
      <a href="${unsubscribeUrl}" class="text-muted" style="text-decoration: underline;">Unsubscribe</a> if you need a break.
    </p>
  `;
  return wrapHtml('Welcome to the Community! 🚀', content, 'You\'re in! Get ready for exclusive updates and resources.');
};

const getProductNotificationTemplate = ({ productName, productDescription, productUrl, productPrice, productImageUrl, isService = false }) => {
  const typeLabel = isService ? 'New Service' : 'New Product';
  const actionLabel = isService ? 'View Service' : 'View Product';

  const content = `
    <div style="text-align: center; margin-bottom: 32px;">
      <span style="background-color: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">JUST LAUNCHED</span>
      <h1 style="margin-top: 16px; margin-bottom: 8px;">${productName}</h1>
      <p style="font-size: 18px; color: #4b5563;">${typeLabel} Alert 🚨</p>
    </div>

    ${productImageUrl ? `
    <div style="margin-bottom: 32px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
      <img src="${productImageUrl}" alt="${productName}" style="width: 100%; height: auto; display: block;">
    </div>
    ` : ''}

    <p>We've just released something new that we think you'll love.</p>

    <div style="background-color: #f9fafb; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; margin-bottom: 32px;">
      <p style="margin-bottom: 16px; font-size: 16px; color: #374151; line-height: 1.6;">${productDescription}</p>

      ${productPrice ? `
      <div style="font-size: 24px; font-weight: 800; color: #111827; margin-top: 8px;">
        ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(productPrice)}
      </div>
      ` : ''}
    </div>

    <p>This ${isService ? 'service' : 'product'} is designed to help you build faster and scale efficiently. Check out the full details on the marketplace.</p>

    <div class="text-center" style="margin: 40px 0;">
      <a href="${productUrl}" class="button">${actionLabel}</a>
    </div>

    <div class="divider"></div>

    <p class="text-sm text-center text-muted">
      You're receiving this because you subscribed to product updates.
    </p>
  `;
  return wrapHtml(`New Launch: ${productName}`, content, `Check out our latest ${isService ? 'service' : 'product'}: ${productName}`);
};

const getEmailChangeOtpTemplate = ({ otp, type }) => {
  const isNewEmail = type !== 'current';
  const title = isNewEmail ? 'Verify New Email' : 'Verify Email Change';
  const content = `
    <h1>${title}</h1>
    <p>Authorization is required to change the email address associated with your account.</p>
    <p>Please use the verification code below to confirm this request:</p>

    <div class="code-block">${otp}</div>

    <div class="box box-warning">
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

    <div class="box box-warning">
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

    <div class="box box-warning" style="border-color: #d97706; background-color: #fffbeb;">
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

    <div class="box box-info">
      <p class="mb-0"><strong>Status:</strong> Active</p>
      <p class="mb-0"><strong>Scheduled Deletion:</strong> Cancelled</p>
    </div>

    <p>All your data, settings, and purchase history have been restored. You can pick up right where you left off.</p>

    <div class="text-center" style="margin: 32px 0;">
      <a href="${dashboardUrl || COMPANY_INFO.url}" class="button">Go to Dashboard</a>
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
  getProductNotificationTemplate,
  getAccountDeactivationTemplate,
  getAccountReactivationTemplate,
  getEmailChangeOtpTemplate,
  getPasswordChangeOtpTemplate,
  COMPANY_INFO
};
