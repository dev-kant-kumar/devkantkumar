const emailTemplates = require('../utils/emailTemplates');

/**
 * Admin Email Controller
 * Handles listing and previewing of email templates
 */

// Define available templates and their categories
const TEMPLATE_DEFINITIONS = [
  // AUTH
  { id: 'verification', name: 'Email Verification', category: 'Auth' },
  { id: 'passwordReset', name: 'Password Reset', category: 'Auth' },
  { id: 'passwordResetSuccess', name: 'Password Reset Success', category: 'Auth' },
  { id: 'emailChangeOtp', name: 'Email Change OTP', category: 'Auth' },
  { id: 'passwordChangeOtp', name: 'Password Change OTP', category: 'Auth' },
  { id: 'accountDeactivation', name: 'Account Deactivation', category: 'Auth' },
  { id: 'accountReactivation', name: 'Account Reactivation', category: 'Auth' },

  // MARKETPLACE
  { id: 'orderConfirmation', name: 'Order Confirmation', category: 'Marketplace' },

  // PORTFOLIO / GENERAL
  { id: 'newsletterWelcome', name: 'Newsletter Welcome', category: 'Portfolio' },
  { id: 'adminContact', name: 'Admin Contact Notification', category: 'Portfolio' },
  { id: 'userContactAutoReply', name: 'User Contact Auto-Reply', category: 'Portfolio' },
];

const adminEmailController = {

  /**
   * Get list of all available templates
   */
  getTemplates: (req, res) => {
    res.json({
      success: true,
      data: TEMPLATE_DEFINITIONS
    });
  },

  /**
   * Preview a specific template with sample data
   */
  previewTemplate: (req, res) => {
    try {
      const { templateId, customData } = req.body;
      const templateDef = TEMPLATE_DEFINITIONS.find(t => t.id === templateId);

      if (!templateDef) {
        return res.status(404).json({ success: false, message: 'Template not found' });
      }

      // Default sample data for previews
      const { COMPANY_INFO } = emailTemplates;
      const baseUrl = COMPANY_INFO.url;

      const sampleData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        verificationUrl: `${baseUrl}/verify/123xyz`,
        resetUrl: `${baseUrl}/reset/abc789`,
        loginUrl: `${baseUrl}/auth/login`,
        forgotPasswordUrl: `${baseUrl}/auth/forgot-password`,
        orderUrl: `${baseUrl}/marketplace/orders/ORD-123456`,
        unsubscribeUrl: `${baseUrl}/newsletter/unsubscribe/user123`,
        dashboardUrl: `${baseUrl}/dashboard`,
        reactivationUrl: `${baseUrl}/auth/reactivate`,
        otp: '123456',
        type: 'current', // for email change
        resetTime: new Date().toLocaleString(),
        scheduledDeletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',

        // Sample Order
        order: {
          orderNumber: 'ORD-20260122-885',
          createdAt: new Date(),
          payment: {
            currency: 'INR',
            amount: { subtotal: 4500, tax: 810, total: 5310 }
          },
          items: [
            { title: 'Premium UI Kit', quantity: 1, price: 2500 },
            { title: 'Advanced React Course', quantity: 1, price: 2000 }
          ]
        },

        // Sample Contact
        contactData: {
          name: 'Jane Smith',
          email: 'jane@client.com',
          phone: '+1 555-0123',
          subject: 'Project Inquiry: E-commerce Redesign',
          type: 'Project',
          message: 'Hi,\n\nI really like your portfolio and I would like to discuss a potential project for my company. We are looking to redesign our e-commerce platform.\n\nBest,\nJane'
        },

        // Allow overriding with custom data from frontend
        ...customData
      };

      let html = '';

      // Map ID to actual function call
      switch (templateId) {
        case 'verification':
          html = emailTemplates.getVerificationEmailTemplate(sampleData);
          break;
        case 'passwordReset':
          html = emailTemplates.getPasswordResetTemplate(sampleData);
          break;
        case 'passwordResetSuccess':
          html = emailTemplates.getPasswordResetSuccessTemplate(sampleData);
          break;
        case 'emailChangeOtp':
          html = emailTemplates.getEmailChangeOtpTemplate({ otp: sampleData.otp, type: sampleData.type });
          break;
        case 'passwordChangeOtp':
          html = emailTemplates.getPasswordChangeOtpTemplate({ otp: sampleData.otp });
          break;
        case 'accountDeactivation':
          html = emailTemplates.getAccountDeactivationTemplate(sampleData);
          break;
        case 'accountReactivation':
          html = emailTemplates.getAccountReactivationTemplate(sampleData);
          break;
        case 'orderConfirmation':
          html = emailTemplates.getOrderConfirmationTemplate(sampleData);
          break;
        case 'newsletterWelcome':
          html = emailTemplates.getNewsletterWelcomeTemplate(sampleData);
          break;
        case 'adminContact':
          html = emailTemplates.getAdminContactTemplate(sampleData.contactData);
          break;
        case 'userContactAutoReply':
          html = emailTemplates.getUserContactAutoReplyTemplate(sampleData.contactData);
          break;
        default:
          return res.status(400).json({ success: false, message: 'Template render logic not implemented' });
      }

      res.json({
        success: true,
        data: {
          html,
          subject: extractSubject(html) // Optional helper to parse title/subject from HTML
        }
      });

    } catch (error) {
      console.error('Preview error:', error);
      res.status(500).json({ success: false, message: 'Failed to render preview', error: error.message });
    }
  }
};

// Helper: Attempt to extract title/subject from the generated HTML
function extractSubject(html) {
  const match = html.match(/<title>(.*?)<\/title>/);
  return match ? match[1] : 'Preview';
}

module.exports = adminEmailController;
