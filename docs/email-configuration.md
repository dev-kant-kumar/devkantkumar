# Email Configuration for DevKantKumar.com

> Last Updated: January 8, 2026

## 📧 Available Email Addresses

All emails are configured via **Cloudflare Email Routing** and forward to `dev.techdeveloper@gmail.com`.

| Email Address | Purpose | Primary Use Case |
|---------------|---------|------------------|
| `devkant@devkantkumar.com` | Personal/Professional | Business cards, client communication |
| `hello@devkantkumar.com` | General Inquiries | Contact forms, website footer |
| `support@devkantkumar.com` | Customer Support | Help requests, issue resolution |
| `billing@devkantkumar.com` | Payments & Invoices | Payment issues, refund requests |
| `orders@devkantkumar.com` | Order Management | Order confirmations, shipping updates |
| `sales@devkantkumar.com` | Sales Inquiries | Purchase questions, pricing |
| `security@devkantkumar.com` | Security Alerts | Security notifications, 2FA alerts |
| `newsletter@devkantkumar.com` | Newsletter/Blog | Subscription emails, blog updates |
| `noreply@devkantkumar.com` | Automated Emails | OTP, password reset, system notifications |

---

## 🔧 Environment Variables Configuration

Add these to your `.env` file:

```bash
# ===== Email Configuration (Gmail SMTP) =====

# Gmail SMTP Configuration
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password

# Admin email for receiving notifications
ADMIN_EMAIL=devkant@devkantkumar.com

# ===== Custom Domain Email Addresses =====
# These are used as "From" addresses for different email types

NOREPLY_EMAIL=noreply@devkantkumar.com
SUPPORT_EMAIL=support@devkantkumar.com
BILLING_EMAIL=billing@devkantkumar.com
ORDERS_EMAIL=orders@devkantkumar.com
SALES_EMAIL=sales@devkantkumar.com
NEWSLETTER_EMAIL=newsletter@devkantkumar.com
SECURITY_EMAIL=security@devkantkumar.com
CONTACT_EMAIL=hello@devkantkumar.com
DEVKANT_EMAIL=devkant@devkantkumar.com
```

---

## 📨 Email Type → Sender Mapping

| Email Type | From Address | Purpose |
|------------|--------------|---------|
| Verification | `noreply@` | Account verification emails |
| Password Reset | `noreply@` | Password reset links |
| OTP (Email/Password Change) | `security@` | Security-sensitive OTPs |
| Order Confirmation | `orders@` | Order receipts |
| Payment/Refund | `billing@` | Billing notifications |
| Contact Auto-Reply | `support@` | Support responses |
| Newsletter Welcome | `newsletter@` | Blog/newsletter updates |
| Generic | `noreply@` | Default fallback |

---

## 📍 Where Emails Are Used in the Codebase

### Backend
| File | Current Value | Recommended Update |
|------|---------------|-------------------|
| `backend/src/services/emailQueue.js` | `SMTP_SENDER_EMAIL` env var | Use `noreply@devkantkumar.com` |
| `backend/src/models/SystemSetting.js` | `support@devkantkumar.com` | ✅ Already updated |
| `backend/src/services/emailService.js` | `ADMIN_EMAIL` or `SMTP_USER` | Use appropriate category email |

### Frontend
| File | Current Value | Recommended Update |
|------|---------------|-------------------|
| `frontend/src/apps/MarketPlace/pages/Contact/Contact.jsx` | `hello@devkantkumar.com` | ✅ Already correct |
| `frontend/src/apps/MarketPlace/common/components/Footer.jsx` | `hello@devkantkumar.com` | ✅ Already correct |
| `frontend/src/apps/AdminPanel/components/auth/AdminLogin.jsx` | `admin@devkantkumar.com` (placeholder) | ✅ Already correct |

---

## 📨 Email Usage by Type

### Transactional Emails (Automated)
- **From:** `noreply@devkantkumar.com`
- **Types:** OTP, password reset, order confirmations, welcome emails

### Support Emails
- **From:** `support@devkantkumar.com`
- **Types:** Help responses, ticket updates

### Marketing/Newsletter
- **From:** `newsletter@devkantkumar.com`
- **Types:** Blog updates, promotional content

### Security Alerts
- **From:** `security@devkantkumar.com`
- **Types:** 2FA codes, login alerts, suspicious activity

---

## ✅ Quick Setup Checklist

1. [ ] Configure all emails in Cloudflare Email Routing ✅ (Done)
2. [ ] Update `.env` with all email environment variables
3. [ ] Update `SystemSetting.js` default support email
4. [ ] Verify Brevo sender is set to `noreply@devkantkumar.com`
5. [ ] Test email sending from backend

---

## 🔗 Related Resources

- [Cloudflare Email Routing Dashboard](https://dash.cloudflare.com)
- [Gmail App Passwords](https://myaccount.google.com/apppasswords)
