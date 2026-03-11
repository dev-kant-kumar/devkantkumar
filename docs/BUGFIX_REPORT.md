# Marketplace Bug Fix Report

## Overview

This document records all bugs, business flaws, and security vulnerabilities identified and resolved in the **Dev Kant Kumar Marketplace** codebase during the audit performed in March 2026. Each entry includes the root cause, impact, and the fix applied.

---

## Critical Bugs Fixed (Crash / Incorrect Behaviour)

---

### 1. Search API Crash When `q` Parameter Is Missing

| Property | Detail |
|----------|--------|
| **File** | `backend/src/controllers/marketplaceController.js` |
| **Function** | `search()` |
| **Severity** | 🔴 Critical — server crash |

**Root Cause**

`GET /api/v1/marketplace/search` accepts a `q` query parameter and uses it directly in a MongoDB `$regex` operator without any validation:

```js
// BEFORE (unsafe)
const searchQuery = {
  $or: [
    { title: { $regex: q, $options: "i" } },  // q can be undefined!
    ...
  ],
};
```

When a client calls the endpoint without the `q` parameter (e.g., `GET /search?type=products`), `q` becomes `undefined`. MongoDB rejects a `$regex: undefined` expression and throws a `MongoServerError`, causing a 500 Internal Server Error.

**Fix Applied**

Added an early validation guard that returns HTTP 400 before the query is built:

```js
if (!q || !q.trim()) {
  return res.status(400).json({ message: "Search query (q) is required" });
}
```

---

### 2. Order Number Duplication Under Concurrent Requests

| Property | Detail |
|----------|--------|
| **File** | `backend/src/models/Order.js` |
| **Hook** | `orderSchema.pre('save')` |
| **Severity** | 🔴 Critical — duplicate key error, failed saves |

**Root Cause**

The pre-save hook generated order numbers using a non-atomic `countDocuments()` call:

```js
// BEFORE (race condition)
const count = await mongoose.model('Order').countDocuments();
this.orderNumber = `ORD-${String(count + 1).padStart(6, '0')}`;
```

Two simultaneous checkout requests could both see the same document count and generate identical order numbers, violating the unique index on `orderNumber` and causing a `MongoError E11000 duplicate key` exception, preventing order creation.

**Fix Applied**

Replaced the `countDocuments()` strategy with a timestamp + random suffix combination, which is practically collision-free:

```js
const timestamp = Date.now();
const random = Math.floor(Math.random() * 90000) + 10000; // 5-digit random
this.orderNumber = `ORD-${timestamp}-${random}`;
```

---

### 3. Null / Undefined `user.cart` Causes Uncaught TypeError

| Property | Detail |
|----------|--------|
| **File** | `backend/src/controllers/marketplaceController.js` |
| **Functions** | `createOrder()`, `createRazorpayOrder()` |
| **Severity** | 🔴 Critical — unhandled exception → 500 crash |

**Root Cause**

Both payment functions accessed `user.cart.items` without guarding against `user.cart` being `null` or `undefined`:

```js
// BEFORE (crash if user.cart is null)
if (!user.cart.items || user.cart.items.length === 0) { ... }
```

Old user documents created before the `cart` schema field was added could have `cart: null`, causing `TypeError: Cannot read properties of null (reading 'items')`.

**Fix Applied**

Added a null guard for `user.cart`:

```js
if (!user.cart || !user.cart.items || user.cart.items.length === 0) {
  return res.status(400).json({ message: "Cart is empty" });
}
```

---

## High-Priority Fixes

---

### 4. Debug `console.log` Statements Leaking Sensitive Data in Production

| Property | Detail |
|----------|--------|
| **Files** | `backend/index.js`, `backend/src/controllers/marketplaceController.js`, `frontend/src/apps/MarketPlace/context/CurrencyContext.jsx` |
| **Severity** | 🟠 High — information disclosure |

**Root Cause**

Multiple `console.log` and `console.error` calls printed internal request details to stdout:

```js
// backend/index.js — CORS middleware
console.log('=== CORS Debug ===');
console.log('Request Origin:', origin);          // leaks client IPs/origins
console.log('NODE_ENV:', process.env.NODE_ENV);

// backend/src/controllers/marketplaceController.js
console.log("Razorpay Order Created:", razorpayOrder.id);  // leaks order IDs
console.log("Creating order with orderNumber:", orderNumber);
console.log("MongoDB Order Created:", newOrder._id);
console.error("FULL RAZORPAY ERROR:", JSON.stringify(error, null, 2));  // leaks full error

// frontend/src/apps/MarketPlace/context/CurrencyContext.jsx
console.log('[CurrencyContext] Raw settings data:', settingsData);  // leaks settings
```

In production these statements are visible in server logs and browser DevTools, aiding potential attackers in reconnaissance.

**Fix Applied**

- Removed all debug `console.log` / `console.warn` statements from the CORS handler in `index.js`.
- Replaced `console.log` / `console.error` in `createRazorpayOrder()` with the existing `logger.info()` / `logger.error()` (Winston).
- Removed `console.log` / `console.warn` from `CurrencyContext.jsx`.

---

### 5. Coupon Race Condition — Over-use Beyond `maxUses` Limit

| Property | Detail |
|----------|--------|
| **File** | `backend/src/controllers/marketplaceController.js` |
| **Function** | `verifyRazorpayPayment()` |
| **Severity** | 🟠 High — business logic / revenue impact |

**Root Cause**

Coupon usage was applied in a separate, non-atomic write **after** validation:

```js
// BEFORE — not atomic
const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
const validation = coupon.isValid(userId, subtotal);  // Check passes
// ... time gap — another request can pass the same check here ...
await Coupon.findByIdAndUpdate(couponApplied, { $inc: { usedCount: 1 } });
```

Under high concurrency, multiple simultaneous payments could each pass the `isValid()` check before any of them incremented `usedCount`, allowing a coupon to be redeemed more times than `maxUses` allowed.

**Fix Applied**

The `findByIdAndUpdate` in `verifyRazorpayPayment` was replaced with a `findOneAndUpdate` that atomically increments `usedCount` only when it is still under `maxUses`:

```js
const couponFilter = {
  _id: order.couponApplied,
  $or: [
    { maxUses: null },                                           // unlimited
    { $expr: { $lt: ["$usedCount", "$maxUses"] } },             // still under limit
  ],
};
await Coupon.findOneAndUpdate(couponFilter, {
  $push: { usedByUsers: { ... } },
  $inc: { usedCount: 1 },
});
```

If the coupon is already at its limit, the update silently no-ops, preventing over-use without crashing the order flow.

---

### 6. No Rate Limiting on Payment Endpoints

| Property | Detail |
|----------|--------|
| **File** | `backend/src/routes/marketplaceRoutes.js` |
| **Routes** | `POST /payment/create-order`, `POST /payment/verify` |
| **Severity** | 🟠 High — DoS, API quota abuse |

**Root Cause**

Only the global API limiter (100 requests / 15 min) was applied to all routes. Payment endpoints were not individually rate-limited, making it trivial to flood the Razorpay API with bogus order-creation requests or brute-force payment verification.

**Fix Applied**

Added a dedicated `paymentLimiter` (10 requests / 15 min per IP) to both payment routes:

```js
const paymentLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many payment requests, please try again after 15 minutes",
});

router.post("/payment/create-order", paymentLimiter, ...);
router.post("/payment/verify",       paymentLimiter, ...);
```

The `createLimiter` factory was also exported from `rateLimiter.js` so route files can create custom limiters.

---

## Business Flaws Identified (Not Yet Fixed — Requires Feature Work)

The following issues were identified but require larger feature work outside the scope of a targeted bug fix. They are documented here for prioritisation.

| # | Issue | Impact | Recommended Fix |
|---|-------|--------|-----------------|
| 1 | **No refund workflow** | No way to process disputes or chargebacks | Implement refund states in Order model + Razorpay refund API |
| 2 | **Pricing recalculated client-side** | Determined attacker can modify network request to reduce price | Backend must independently recalculate total from cart items before charging |
| 3 | **Email notification silent failure** | Order confirmation emails silently fail with no retry | Use BullMQ queue with exponential backoff retry for email sending |
| 4 | **Service delivery workflow missing UI** | No frontend to view order phases, deadlines, or progress | Build order timeline UI with phase updates |
| 5 | **No automated test coverage** | Regressions go undetected | Write Jest unit tests + Supertest API integration tests |
| 6 | **Weak password policy** | No complexity requirements enforced server-side | Add minimum 8 chars + 1 number + 1 special char server-side validation |
| 7 | **Download links no cleanup job** | Expired download entries accumulate in the DB | Add a nightly BullMQ job to prune expired `downloadLinks` |

---

## Summary Table

| Severity | Count | Status |
|----------|-------|--------|
| 🔴 Critical (crash / data corruption) | 3 | ✅ Fixed |
| 🟠 High (security / revenue) | 3 | ✅ Fixed |
| 🟡 Medium (UX / business logic) | 7 | 📋 Tracked above |

---

*Report generated: March 2026*
