/**
 * Email Configuration
 * Centralized configuration for all email addresses used in the system
 */

const emailConfig = {
  // Sender addresses for different email types
  senders: {
    // Automated transactional emails (OTP, password reset, verification)
    noreply: {
      email: process.env.NOREPLY_EMAIL || 'noreply@devkantkumar.com',
      name: 'Dev Kant Kumar (No Reply)'
    },
    // Customer support related emails
    support: {
      email: process.env.SUPPORT_EMAIL || 'support@devkantkumar.com',
      name: 'Support - Dev Kant Kumar'
    },
    // Order and billing related emails
    orders: {
      email: process.env.ORDERS_EMAIL || 'orders@devkantkumar.com',
      name: 'Orders - Dev Kant Kumar Marketplace'
    },
    billing: {
      email: process.env.BILLING_EMAIL || 'billing@devkantkumar.com',
      name: 'Billing - Dev Kant Kumar Marketplace'
    },
    // Sales and inquiries
    sales: {
      email: process.env.SALES_EMAIL || 'sales@devkantkumar.com',
      name: 'Sales - Dev Kant Kumar Marketplace'
    },
    // General contact
    hello: {
      email: process.env.CONTACT_EMAIL || 'hello@devkantkumar.com',
      name: 'Dev Kant Kumar'
    },
    // Newsletter and blog updates
    newsletter: {
      email: process.env.NEWSLETTER_EMAIL || 'newsletter@devkantkumar.com',
      name: 'Newsletter - Dev Kant Kumar'
    },
    // Security alerts
    security: {
      email: process.env.SECURITY_EMAIL || 'security@devkantkumar.com',
      name: 'Security - Dev Kant Kumar'
    },
    // Personal/professional
    devkant: {
      email: process.env.DEVKANT_EMAIL || 'devkant@devkantkumar.com',
      name: 'Dev Kant Kumar'
    }
  },

  // Admin email for receiving notifications
  adminEmail: process.env.ADMIN_EMAIL || 'devkant@devkantkumar.com',

  // Map email types to senders
  getFromAddress(type) {
    const mapping = {
      // Transactional (automated)
      'verification-email': this.senders.noreply,
      'password-reset-email': this.senders.noreply,
      'email-change-otp': this.senders.security,
      'password-change-otp': this.senders.security,

      // Orders & Billing
      'order-confirmation-email': this.senders.orders,
      'payment-receipt': this.senders.billing,
      'refund-notification': this.senders.billing,

      // Contact & Support
      'contact-admin-notification': this.senders.hello,
      'contact-user-auto-reply': this.senders.support,

      // Newsletter
      'newsletter-welcome-email': this.senders.newsletter,
      'newsletter-update': this.senders.newsletter,

      // Default
      'generic-email': this.senders.noreply
    };

    const sender = mapping[type] || this.senders.noreply;
    return `${sender.name} <${sender.email}>`;
  }
};

module.exports = emailConfig;
