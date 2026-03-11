# Marketplace REST API Reference

Base URL: `https://api.devkantkumar.com/api/v1`

Authentication uses **JWT Bearer tokens**. Include the token in every protected request:

```
Authorization: Bearer <token>
```

Regional pricing is determined by the `x-country-code` header (ISO 3166-1 alpha-2, e.g., `IN`, `US`).

---

## Authentication

### Register

`POST /auth/register`

**Rate limit:** 3 / hour per IP

**Body**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response 201**
```json
{
  "success": true,
  "token": "<jwt>",
  "user": { "id": "...", "firstName": "John", "email": "john@example.com" }
}
```

---

### Login

`POST /auth/login`

**Rate limit:** 50 / 15 min per IP

**Body**
```json
{ "email": "john@example.com", "password": "SecurePass123!" }
```

**Response 200**
```json
{
  "success": true,
  "token": "<jwt>",
  "user": { ... }
}
```

---

### Forgot Password

`POST /auth/forgot-password`

**Rate limit:** 3 / hour per IP

**Body**
```json
{ "email": "john@example.com" }
```

**Response 200**
```json
{ "success": true, "message": "Password reset email sent" }
```

---

## Marketplace — Products

### List Products

`GET /marketplace/products`

**Query params:**
| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 12) |
| `category` | string | Filter by category |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `search` | string | Full-text search |

**Response 200**
```json
{
  "products": [ { "_id": "...", "title": "...", "price": 999 } ],
  "pagination": { "page": 1, "limit": 12, "total": 45, "pages": 4 }
}
```

---

### Get Product by ID

`GET /marketplace/products/:id`

**Response 200**
```json
{
  "_id": "...",
  "title": "Premium React Template",
  "description": "...",
  "price": 999,
  "category": "Templates",
  "images": [ "https://..." ],
  "downloadFiles": [],
  "rating": { "average": 4.8, "count": 23 }
}
```

---

## Marketplace — Services

### List Services

`GET /marketplace/services`

Same query params as Products.

---

### Get Service by ID

`GET /marketplace/services/:id`

---

## Search

### Global Search

`GET /marketplace/search`

**Query params:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `q` | string | **Yes** | Search query |
| `type` | string | No | `products` or `services` (default: both) |

Returns `400` if `q` is missing.

**Response 200**
```json
{
  "products": [ ... ],
  "services": [ ... ]
}
```

---

## Categories

### Get All Categories

`GET /marketplace/categories`

**Response 200**
```json
{
  "products": ["Templates", "Scripts", "Plugins"],
  "services": ["Web Development", "UI/UX Design"]
}
```

---

## Cart

All cart routes require authentication (`Authorization: Bearer <token>`).

### Get Cart

`GET /cart`

Headers: `x-country-code: IN`

**Response 200**
```json
{
  "success": true,
  "cart": {
    "items": [
      {
        "_id": "...",
        "type": "product",
        "product": { "_id": "...", "title": "...", "price": 999 },
        "quantity": 1,
        "currentPrice": 999,
        "currency": "INR"
      }
    ],
    "updatedAt": "2026-03-01T00:00:00.000Z"
  }
}
```

---

### Add to Cart

`POST /cart`

**Body**
```json
{
  "productId": "<product_id>",
  "quantity": 1
}
```
or for a service with package:
```json
{
  "serviceId": "<service_id>",
  "package": "Professional",
  "quantity": 1
}
```

---

### Update Cart Item

`PUT /cart/:itemId`

**Body**
```json
{ "quantity": 2 }
```

Setting `quantity` to 0 removes the item.

---

### Remove Item

`DELETE /cart/:itemId`

---

### Clear Cart

`DELETE /cart`

---

## Orders

### Create Order (without payment)

`POST /marketplace/orders`

Creates a pending order from the authenticated user's cart.

**Body**
```json
{
  "billing": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+91-9000000000",
    "address": { "street": "123 Main St", "city": "Delhi", "state": "DL", "zipCode": "110001", "country": "IN" }
  },
  "paymentMethod": "razorpay",
  "currency": "INR",
  "couponCode": "SAVE20"
}
```

**Response 201**
```json
{
  "success": true,
  "order": { "_id": "...", "orderNumber": "ORD-...", "status": "pending" }
}
```

---

### Get My Orders

`GET /marketplace/orders`

**Response 200** — array of orders.

---

### Get Order by ID

`GET /marketplace/orders/:id`

---

### Submit Project Requirements

`POST /marketplace/orders/:id/requirements`

**Body**
```json
{
  "responses": [
    { "question": "What is your target audience?", "answer": "Developers" }
  ],
  "attachments": []
}
```

---

### Request Revision

`POST /marketplace/orders/:id/revision`

Available only when order status is `delivered`.

**Body**
```json
{ "message": "Please update the colour scheme" }
```

---

### Approve Delivery

`POST /marketplace/orders/:id/approve-delivery`

Marks order as `completed`.

---

## Payment

> **Rate limit:** 10 requests / 15 min per IP

### Create Razorpay Order

`POST /marketplace/payment/create-order`

Headers: `x-country-code: IN`

**Body**
```json
{
  "currency": "INR",
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+91-9000000000",
    "address": "123 Main St",
    "city": "Delhi",
    "state": "DL",
    "zipCode": "110001",
    "country": "IN"
  },
  "couponCode": "SAVE20"
}
```

**Response 200**
```json
{
  "id": "order_abc123",
  "amount": 99900,
  "currency": "INR",
  "orderId": "<mongodb_order_id>"
}
```

---

### Verify Razorpay Payment

`POST /marketplace/payment/verify`

Call this after the Razorpay SDK returns a successful payment.

**Body**
```json
{
  "razorpay_order_id": "order_abc123",
  "razorpay_payment_id": "pay_xyz789",
  "razorpay_signature": "<hmac_signature>",
  "orderId": "<mongodb_order_id>"
}
```

**Response 200**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "orderId": "...",
  "orderNumber": "ORD-..."
}
```

---

### Razorpay Webhook (Public)

`POST /marketplace/payment/webhook`

Handles `payment.captured` and `order.paid` events. Verifies the `x-razorpay-signature` header against `RAZORPAY_WEBHOOK_SECRET`.

---

## Downloads

### Download Purchased File

`GET /marketplace/orders/:orderId/items/:itemId/download?token=<download_token>`

Returns the file as a streamed attachment. Download tokens are generated on payment success and are valid for 48 hours with a max of 5 downloads.

**Error Codes**

| Code | Meaning |
|------|---------|
| `MISSING_TOKEN` | `token` query param not provided |
| `INVALID_TOKEN` | Token expired, already used, or invalid |
| `FILE_NOT_FOUND` | File URL is missing from the order |
| `UPSTREAM_ERROR` | Storage provider returned an error |

---

### Regenerate Download Links

`POST /marketplace/orders/:orderId/regenerate/:itemId`

Generates fresh download links (new tokens, new 48-hour expiry).

**Response 200**
```json
{
  "success": true,
  "message": "Download links regenerated",
  "data": { "downloadLinks": [ { "token": "...", "name": "source.zip", "expiresAt": "..." } ] }
}
```

---

## Invoices

### Download Invoice PDF

`GET /marketplace/orders/:orderId/invoice`

Returns a PDF attachment.

---

### Email Invoice

`POST /marketplace/orders/:orderId/invoice/send`

**Body (optional)**
```json
{ "email": "override@example.com" }
```

---

## Order Messages

### Get Messages

`GET /marketplace/orders/:orderId/messages`

---

### Send Message

`POST /marketplace/orders/:orderId/messages`

**Body**
```json
{
  "message": "Could you please include the Figma file?",
  "attachments": []
}
```

---

## Support

### Submit Support Ticket (Public)

`POST /marketplace/support`

**Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Download not working",
  "message": "I cannot download my file.",
  "category": "technical"
}
```

---

### Get My Tickets (Authenticated)

`GET /marketplace/support/my-tickets`

---

### Get Ticket by ID

`GET /marketplace/support/my-tickets/:id`

---

### Reply to Ticket

`POST /marketplace/support/my-tickets/:id/reply`

**Body**
```json
{ "message": "I have attached the screenshot." }
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error, coupon invalid, etc.) |
| 401 | Unauthorised — missing or invalid token |
| 403 | Forbidden — insufficient permissions |
| 404 | Resource not found |
| 429 | Too Many Requests — rate limit exceeded |
| 500 | Internal Server Error |

---

## Error Response Format

All errors return a consistent JSON body:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "field": "couponCode"   // optional — present on field-level validation errors
}
```

---

*Last updated: March 2026*
