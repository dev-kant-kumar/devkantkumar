# Security Guidelines & Checklist

## Overview

This document describes the security architecture of the **Dev Kant Kumar Marketplace** and provides a checklist of practices that must be followed to keep the platform secure.

---

## 1. Authentication & Authorisation

### Implementation

- **JWT (JSON Web Tokens)** are used for stateless session management.
- Tokens are signed with `JWT_SECRET` (minimum 32-character random string).
- Tokens are validated on every protected route via the `protect` middleware.
- Role-based access control (`user` | `admin`) is enforced via the `authorize` middleware.

### Checklist

- [x] Tokens verified using `jsonwebtoken.verify` before accessing protected routes
- [x] Expired tokens rejected with HTTP 401
- [x] Deactivated / locked accounts blocked in `protect` middleware
- [x] Passwords stored as bcrypt hashes (never plain-text)
- [x] `select: false` on password field in Mongoose schema prevents accidental leakage
- [ ] Refresh-token rotation not yet implemented — TODO
- [ ] Account lock after N failed login attempts — partially implemented; verify enforcement

---

## 2. Payment Security

### Razorpay Integration

- Payment amount is computed **server-side** from the authenticated user's cart, not from the client request body.
- Razorpay webhook signature is verified using HMAC-SHA256 against `RAZORPAY_WEBHOOK_SECRET` before processing.
- Payment verification uses Razorpay signature validation (`crypto.createHmac`).

### Checklist

- [x] Razorpay signature verified on `/payment/verify`
- [x] Webhook signature verified before processing `payment.captured` events
- [x] Idempotency check on webhook — already-confirmed orders skip re-processing
- [x] Rate limiting on payment endpoints (10 requests / 15 min per IP)
- [ ] Independent server-side price recalculation before passing amount to Razorpay — **TODO (high priority)**
- [ ] Refund API integration — not yet implemented

---

## 3. Input Validation & Sanitisation

### Middleware in Place

| Middleware | Protection |
|------------|-----------|
| `express-mongo-sanitize` | Strips `$` and `.` from request bodies/params (NoSQL injection) |
| `xss-clean` | Escapes XSS characters in request body |
| `hpp` | Prevents HTTP parameter pollution |
| `helmet` | Sets secure HTTP headers (X-Frame-Options, HSTS, etc.) |

### Checklist

- [x] NoSQL injection protection via `mongoSanitize`
- [x] XSS cleaning applied globally
- [x] HTTP parameter pollution prevented
- [x] Secure HTTP headers via Helmet
- [ ] Input validation middleware (`express-validator`) on admin product/order creation — TODO
- [ ] File upload type and size restricted — partially via Multer; verify allowed MIME types

---

## 4. Rate Limiting

| Endpoint Group | Limit |
|---------------|-------|
| All API routes | 100 requests / 15 min / IP |
| `POST /auth/login` | 50 requests / 15 min / IP |
| `POST /auth/register` | 3 requests / 60 min / IP |
| `POST /auth/forgot-password` | 3 requests / 60 min / IP |
| `POST /marketplace/payment/create-order` | 10 requests / 15 min / IP |
| `POST /marketplace/payment/verify` | 10 requests / 15 min / IP |

---

## 5. CORS

- The CORS whitelist is configured via the `ALLOWED_ORIGINS` environment variable.
- In development (`NODE_ENV=development`) any origin is allowed to ease local development.
- In production, only origins in the whitelist are accepted; blocked origins receive an error (logged via Winston — never exposed to the client).

```
ALLOWED_ORIGINS=https://devkantkumar.com,https://www.devkantkumar.com
```

---

## 6. Digital Download Security

- Download links are token-based (UUID tokens stored in the Order document).
- Each token has a 48-hour expiry and a max-download count (default 5).
- Tokens are validated server-side before serving the file — the raw file URL is never exposed to the client.
- Downloads are proxied through the backend; Cloudinary signed URLs are generated on-demand.

---

## 7. Sensitive Data Handling

### Environment Variables

All secrets are loaded from `.env` via `dotenv`. **Never commit `.env` to version control.**

Required secrets:

```
MONGODB_URI            # MongoDB connection string
JWT_SECRET             # Minimum 32 random characters
RAZORPAY_KEY_ID        # Razorpay API key ID
RAZORPAY_KEY_SECRET    # Razorpay API key secret
RAZORPAY_WEBHOOK_SECRET # Razorpay webhook verification secret
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

### Logging

- **Winston** is used for structured logging.
- `console.log` / `console.error` are **not** used in application code — only Winston loggers.
- Sensitive values (passwords, tokens, full error stacks) are not written to log files in production.
- Log level is configurable via `LOG_LEVEL` env var (default: `info` in production, `debug` in development).

---

## 8. Security Vulnerability Disclosure

If you discover a security vulnerability, please **do not** open a public GitHub issue. Instead, email the maintainer directly at the address listed in the project README.

---

## 9. Dependency Security

Run the following commands regularly to identify vulnerable packages:

```bash
# Backend
cd backend && npm audit

# Frontend
cd frontend && npm audit
```

Fix or update packages with known high/critical vulnerabilities before each production deploy.

## 10. CSRF Protection

### Current Status

**The application uses JWT Bearer tokens (`Authorization: Bearer <token>`) as the primary authentication mechanism.** Bearer-token APIs are inherently CSRF-resistant because:
- CSRF attacks exploit cookie-based authentication
- Malicious cross-origin sites cannot read or inject `Authorization` headers
- No sensitive state is changed via `GET` requests

The `cookieParser` middleware is present as a secondary fallback (JWT can also be read from an `httpOnly` cookie). This secondary path is **not** protected by a CSRF token.

### Recommendation

If cookie-based session flows are expanded in the future, add CSRF protection:

```bash
npm install csurf
```

```js
// backend/index.js
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: { httpOnly: true, secure: true } });

// Apply to state-mutating routes that use cookie auth
app.use('/api/v1/auth', csrfProtection, authRoutes);
```

Until then, ensure that the `Authorization: Bearer` header is always used in the frontend API calls (currently enforced in all marketplace API calls).

---

*Last updated: March 2026*
