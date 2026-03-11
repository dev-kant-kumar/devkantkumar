# Deployment Guide

## Overview

This guide covers deploying the **Dev Kant Kumar** full-stack application to production.

- **Frontend:** React 19 + Vite — deployed to [Vercel](https://vercel.com)
- **Backend:** Node.js + Express — deployed to any Node-compatible PaaS/VPS (e.g., Railway, Render, DigitalOcean, AWS EC2)
- **Database:** MongoDB Atlas (managed)
- **Cache / Queue:** Redis (e.g., Upstash or self-hosted)
- **File Storage:** Cloudinary
- **Payments:** Razorpay

---

## Prerequisites

| Tool | Minimum Version |
|------|----------------|
| Node.js | 18.x LTS |
| npm | 9.x |
| MongoDB | 6.x (Atlas M0 free tier works for staging) |
| Redis | 6.x |

---

## 1. Clone the Repository

```bash
git clone https://github.com/dev-kant-kumar/devkantkumar.git
cd devkantkumar
```

---

## 2. Backend Setup

### 2.1 Install Dependencies

```bash
cd backend
npm install
```

### 2.2 Environment Variables

Copy the sample env file and fill in your values:

```bash
cp .env.example .env
```

**Required variables:**

```env
# Server
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/devkantkumar

# Authentication
JWT_SECRET=<minimum-32-character-random-string>
JWT_EXPIRE=7d

# Razorpay
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Redis
REDIS_URL=redis://...

# Email (Brevo / SMTP)
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
EMAIL_FROM=noreply@devkantkumar.com
EMAIL_FROM_NAME=Dev Kant Kumar

# CORS — comma-separated list of allowed frontend origins
ALLOWED_ORIGINS=https://devkantkumar.com,https://www.devkantkumar.com

# Rate limiting (optional — defaults shown)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 2.3 Start Production Server

```bash
npm start
```

Or with PM2 for process management:

```bash
npm install -g pm2
pm2 start index.js --name devkant-backend --env production
pm2 save
pm2 startup
```

---

## 3. Frontend Setup

### 3.1 Install Dependencies

```bash
cd frontend
npm install
```

### 3.2 Environment Variables

```bash
cp .env.example .env.production
```

```env
VITE_API_URL=https://api.devkantkumar.com/api/v1
VITE_RAZORPAY_KEY_ID=rzp_live_...
VITE_SOCKET_URL=https://api.devkantkumar.com
```

### 3.3 Build

```bash
npm run build
# Output is in dist/
```

### 3.4 Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Or connect the GitHub repo to Vercel via the dashboard for automatic CI/CD deployments.

**Vercel project settings:**
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `frontend`

---

## 4. Database

### MongoDB Atlas Setup

1. Create a **free M0 cluster** at [cloud.mongodb.com](https://cloud.mongodb.com).
2. Create a database user with read/write access.
3. Add your server IP to the **Network Access** whitelist (or use `0.0.0.0/0` for PaaS hosting).
4. Copy the connection string to `MONGODB_URI`.

### Seed Initial Data (Optional)

```bash
cd backend
node src/scripts/seedSettings.js    # Creates default SystemSettings
node src/scripts/seedProducts.js    # Adds sample products (development only)
```

---

## 5. Razorpay Webhook Configuration

1. Go to **Razorpay Dashboard → Settings → Webhooks**.
2. Add a new webhook:
   - URL: `https://api.devkantkumar.com/api/v1/marketplace/payment/webhook`
   - Events: `payment.captured`, `order.paid`
3. Copy the **Webhook Secret** into `RAZORPAY_WEBHOOK_SECRET`.

---

## 6. Health Check

After deployment, verify the server is running:

```bash
curl https://api.devkantkumar.com/health
```

Expected response:
```json
{ "status": "success", "message": "Server is running", "environment": "production" }
```

---

## 7. Checklist Before Go-Live

- [ ] All required env vars set in production environment
- [ ] `NODE_ENV=production` confirmed
- [ ] HTTPS enforced (via reverse proxy / Vercel)
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Razorpay webhook URL registered and tested
- [ ] Redis connected (check logs for `Redis connected`)
- [ ] Email SMTP verified (check logs for `Email service verified`)
- [ ] CORS `ALLOWED_ORIGINS` contains only production domains
- [ ] `npm audit` run — no high/critical vulnerabilities
- [ ] PM2 or equivalent process manager keeping the backend alive

---

## 8. Reverse Proxy (Nginx — Optional)

If self-hosting on a VPS, use Nginx as a reverse proxy in front of the Node.js backend:

```nginx
server {
    listen 80;
    server_name api.devkantkumar.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name api.devkantkumar.com;

    ssl_certificate     /etc/letsencrypt/live/api.devkantkumar.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.devkantkumar.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Use **Certbot** for free Let's Encrypt SSL certificates.

---

## 9. Monitoring & Logs

- Logs are written to `backend/logs/` by Winston.
- In production, `combined.log` captures all info/warn/error entries.
- `error.log` captures only errors.
- Consider shipping logs to an external service (e.g., Logtail, Datadog, or Papertrail) for centralised monitoring.

---

*Last updated: March 2026*
