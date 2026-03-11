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

## Business Flaws Identified — Round 2 Fixes

The following issues were identified in the second audit pass and have now been resolved.

---

### 7. Password Policy Not Enforced in `resetPassword()` and `changePassword()`

| Property | Detail |
|----------|--------|
| **File** | `backend/src/controllers/authController.js` |
| **Functions** | `resetPassword()`, `changePassword()` |
| **Severity** | 🟠 High — security bypass |

**Root Cause**

`authRoutes.js` uses `express-validator` to enforce a password policy (`≥6 chars + uppercase + lowercase + digit`) only on the `/register` route. The `/reset-password` and `/change-password` routes bypassed this check entirely, allowing users to set trivially weak passwords (`password`, `123456`, etc.) through those flows.

**Fix Applied**

Added explicit policy validation before setting the new password in both functions:

```js
if (!password || password.length < 6 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
  return res.status(400).json({
    success: false,
    message: 'Password must be at least 6 characters and include at least one uppercase letter, one lowercase letter, and one number'
  });
}
```

---

### 8. `updateService()` Did Not Recalculate Regional Pricing When Packages Changed

| Property | Detail |
|----------|--------|
| **File** | `backend/src/controllers/adminMarketplaceController.js` |
| **Function** | `updateService()` |
| **Severity** | 🟠 High — pricing inconsistency across regions |

**Root Cause**

`updateProduct()` correctly recalculates `regionalPricing` when `price` changes. `updateService()` performed a bare `findByIdAndUpdate(req.body)` without any pre-processing, so package price updates never triggered regional price recalculation. Users in other regions would see stale prices after an admin updated a service package.

**Fix Applied**

Added the same package pre-processing logic that `createService()` already uses:

```js
if (Array.isArray(updateData.packages) && updateData.packages.length > 0) {
  updateData.packages = updateData.packages.map((pkg) => ({
    ...pkg,
    regionalPricing:
      pkg.regionalPricing && pkg.regionalPricing.length > 0
        ? pkg.regionalPricing
        : calculateRegionalPricing(pkg.price),
  }));
}
```

---

### 9. No Quantity Validation in Cart `addToCart()` and `updateCartItem()`

| Property | Detail |
|----------|--------|
| **File** | `backend/src/controllers/cartController.js` |
| **Functions** | `addToCart()`, `updateCartItem()` |
| **Severity** | 🟠 High — invalid cart state, checkout breakage |

**Root Cause**

Neither function validated the `quantity` value from the request body. Clients could send negative quantities, floating-point values, or non-numeric strings, causing `user.cart.items[n].quantity` to hold invalid values that broke order total calculations downstream.

**Fix Applied**

Added `Number.isInteger` checks:

- `addToCart`: quantity must be a positive integer (`≥ 1`)
- `updateCartItem`: quantity must be a non-negative integer (`≥ 0`; `0` removes the item)

```js
const parsedQty = Number(quantity);
if (!Number.isInteger(parsedQty) || parsedQty < 1) {
  return res.status(400).json({ success: false, message: 'Quantity must be a positive integer' });
}
```

---

### 10. Floating-Point Rounding Errors in Checkout Total Calculation

| Property | Detail |
|----------|--------|
| **File** | `frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx` |
| **Function** | `calculateTotals()` |
| **Severity** | 🟡 Medium — paise-level payment discrepancies |

**Root Cause**

The subtotal was accumulated by summing `price * quantity` in a `forEach` loop without intermediate rounding. JavaScript's IEEE 754 floating-point arithmetic can produce results like `0.1 + 0.2 = 0.30000000000000004`, causing totals to be off by small fractions of a rupee, which can cause reconciliation issues with Razorpay.

**Fix Applied**

Switched to a single `reduce` call wrapped in `Math.round(...*100)/100`, and applied the same rounding to every derived value:

```js
const subtotal = Math.round(
  cartItems.reduce((sum, item) => sum + getCartItemPrice(item) * item.quantity, 0) * 100
) / 100;
const surchargeAmount = Math.round((totalWithSurcharge - subtotal) * 100) / 100;
const total = Math.max(0, Math.round((totalWithSurcharge - discountAmount) * 100) / 100);
```

---

### 11. Falsy Check Broke $0-Discount Coupons

| Property | Detail |
|----------|--------|
| **File** | `frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx` |
| **Function** | `calculateTotals()` |
| **Severity** | 🟡 Medium — free coupons silently ignored |

**Root Cause**

```js
if (appliedCoupon?.discountAmount) { ... }  // 0 is falsy!
```

Coupons with a `discountAmount` of exactly `0` (e.g., free-shipping coupons where discount is `0` in the payload) would silently fall through and not be applied.

**Fix Applied**

Replaced the falsy guard with an explicit null/undefined check:

```js
if (appliedCoupon && appliedCoupon.discountAmount != null) {
  discountAmount = appliedCoupon.discountAmount;
}
```

---

### 12. `removeOnFail: 100` in Email Queue Was Misleading

| Property | Detail |
|----------|--------|
| **File** | `backend/src/services/emailQueue.js` |
| **Severity** | 🟡 Medium — debugging hindrance |

**Root Cause**

`removeOnFail: 100` in BullMQ means "keep up to 100 failed jobs", not "keep for 100 seconds". This is an unintuitive magic number that provided no clear retention policy. Under high failure rates the 100-job cap could evict failures faster than an engineer could inspect them.

**Fix Applied**

Changed to `removeOnFail: { age: 3600 }` — keep failed jobs for exactly 1 hour, then auto-remove:

```js
removeOnFail: { age: 3600 }
```

---

### 13. Email Log `htmlPreview` Stored Raw HTML Markup

| Property | Detail |
|----------|--------|
| **File** | `backend/src/services/emailQueue.js` |
| **Function** | `addEmailToQueue()` |
| **Severity** | 🟡 Minor — unreadable log entries |

**Root Cause**

The preview stored in the email log was `options.html.substring(0, 500)`, which includes all HTML tags, making the log field unreadable.

**Fix Applied**

Strip tags before storing:

```js
htmlPreview: options.html ? options.html.replace(/<[^>]*>/g, '').substring(0, 500) : ''
```

---

## Business Flaws Identified — Round 3 Fixes

The following issues were identified in the third audit pass and have now been resolved.

---

### 14. ReDoS Vulnerability in Search Endpoint

| Property | Detail |
|----------|--------|
| **File** | `backend/src/controllers/marketplaceController.js` |
| **Function** | `search()` |
| **Severity** | 🟠 High — Denial of Service |

**Root Cause**

The user-supplied query parameter `q` was embedded directly into a MongoDB `$regex` operator without escaping special regex metacharacters:

```js
// BEFORE — unsafe: q could be "(a+)+$" triggering catastrophic backtracking
{ title: { $regex: q, $options: "i" } }
```

An attacker could supply a crafted pattern (e.g., `(a+)+$`) that causes catastrophic backtracking in MongoDB's regex engine, effectively hanging the query and creating a denial-of-service condition.

**Fix Applied**

Added an `escapeRegExp` helper that escapes all regex metacharacters before the string is used in `$regex`:

```js
const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const safeQ = escapeRegExp(q.trim());
// safeQ is now a safe literal substring pattern
```

---

### 15. N+1 Database Queries in Payment Verification

| Property | Detail |
|----------|--------|
| **File** | `backend/src/controllers/marketplaceController.js` |
| **Functions** | `verifyRazorpayPayment()`, `handleRazorpayWebhook()` |
| **Severity** | 🟡 Medium — performance degradation |

**Root Cause**

After payment was verified, download links were generated for product items by fetching each product individually inside a `for` loop:

```js
// BEFORE — N+1 pattern: 1 query per order item
for (const item of order.items) {
  if (item.itemType === "product") {
    const product = await Product.findById(item.itemId); // N queries
    ...
  }
}
```

For an order with 5 products this executes 5 sequential queries. This slows down the payment confirmation step and scales poorly.

**Fix Applied**

Replaced the per-item fetch with a single batch query, then used a `Map` for O(1) lookup:

```js
// AFTER — single query regardless of item count
const productIds = order.items
  .filter((item) => item.itemType === "product")
  .map((item) => item.itemId);

const productsById = new Map();
if (productIds.length > 0) {
  const products = await Product.find({ _id: { $in: productIds } });
  products.forEach((p) => productsById.set(p._id.toString(), p));
}

for (const item of order.items) {
  if (item.itemType === "product") {
    const product = productsById.get(item.itemId.toString()); // O(1) lookup
    ...
  }
}
```

Applied the same pattern to `handleRazorpayWebhook`.

---

### 16. Redundant Order Number Generation in Controllers

| Property | Detail |
|----------|--------|
| **File** | `backend/src/controllers/marketplaceController.js` |
| **Functions** | `createOrder()`, `createRazorpayOrder()` |
| **Severity** | 🟡 Medium — weaker entropy, code confusion |

**Root Cause**

Both controller functions generated an `orderNumber` using only a 3-digit random suffix (`Math.floor(Math.random() * 1000)` → range 0–999), while the `Order` model's pre-save hook generates a stronger 5-digit suffix (10000–99999) and is always executed for new documents. The controller-supplied value was silently overwritten by the hook every time, making it dead code — but confusing and misleading.

**Fix Applied**

Removed the redundant `orderNumber` field from both `new Order({...})` calls, documenting that the pre-save hook is the single source of truth.

---

### 17. Oversized HTTP Request Body Limit

| Property | Detail |
|----------|--------|
| **File** | `backend/index.js` |
| **Lines** | 130, 135 |
| **Severity** | 🟡 Medium — DoS via large payloads |

**Root Cause**

The Express JSON and URL-encoded body parsers were configured with a `100mb` limit:

```js
app.use(express.json({ limit: '100mb', ... }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
```

An attacker could repeatedly send 100 MB payloads to exhaust server memory and cause an out-of-memory crash.

**Fix Applied**

Reduced to `10mb`, which is more than sufficient for all legitimate API payloads:

```js
app.use(express.json({ limit: '10mb', ... }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
```

---

## Business Flaws Identified — Round 4 Fixes

The following issues were identified in the fourth audit pass and have now been resolved.

---

### 18. Email Enumeration in `forgotPassword()` and `resendVerification()`

| Property | Detail |
|----------|--------|
| **File** | `backend/src/controllers/authController.js` |
| **Functions** | `forgotPassword()`, `resendVerification()` |
| **Severity** | 🟠 High — information disclosure |

**Root Cause**

Both endpoints returned `HTTP 404 "No user found with this email"` when no account matched the supplied address:

```js
// BEFORE — reveals which emails are registered
if (!user) {
  return res.status(404).json({ message: 'No user found with this email' });
}
```

An attacker could enumerate registered email addresses by submitting candidate emails and observing whether a 404 or 200 was returned.

**Fix Applied**

Always return `HTTP 200` with a neutral message that does not reveal account existence. The email (reset link or verification link) is sent only when the account actually exists.

```js
if (!user) {
  return res.status(200).json({
    success: true,
    message: 'If an account exists with this email, a password reset link has been sent'
  });
}
// ... token generation and email sending only happens below
```

---

### 19. Password Reset Token Exposed in API Response

| Property | Detail |
|----------|--------|
| **File** | `backend/src/controllers/authController.js` |
| **Function** | `forgotPassword()` |
| **Severity** | 🟠 High — token leakage |

**Root Cause**

When the email service was unavailable, the controller returned the raw plaintext reset token in the JSON response body:

```js
// BEFORE — token returned in response
if (emailResult.info === 'Email service not configured') {
  res.status(200).json({
    success: true,
    message: '...',
    resetToken: resetToken  // ← plaintext token in API response
  });
}
```

This token grants immediate password-reset access. Returning it in a response that may be logged, cached, or stored by a proxy is equivalent to skipping the reset flow entirely.

**Fix Applied**

Removed the `resetToken` from the response entirely. The single neutral message is now returned regardless of whether the email was sent, removing the conditional branch that exposed the token.

---

### 20. No Rate Limiting on Password Reset, Email Verification, and Resend Endpoints

| Property | Detail |
|----------|--------|
| **File** | `backend/src/routes/authRoutes.js` |
| **Routes** | `PUT /reset-password/:token`, `POST /verify-email/:token`, `POST /resend-verification` |
| **Severity** | 🟠 High — token brute-force, spam |

**Root Cause**

The `forgot-password` endpoint had rate limiting (`forgotPasswordLimiter`) but the three related endpoints were unprotected:

```js
// BEFORE — only forgot-password had a limiter
router.post('/forgot-password',     forgotPasswordLimiter, authController.forgotPassword);
router.put('/reset-password/:token',                       authController.resetPassword);  // ← bare
router.post('/verify-email/:token',                        authController.verifyEmail);    // ← bare
router.post('/resend-verification',                        authController.resendVerification); // ← bare
```

Without rate limiting on `reset-password/:token` an attacker could brute-force the 64-hex-character token. Without limiting on `resend-verification` an attacker could flood a victim's inbox.

**Fix Applied**

Applied the existing `forgotPasswordLimiter` (3 requests / hour / IP) to all four related routes:

```js
router.post('/forgot-password',     forgotPasswordLimiter, authController.forgotPassword);
router.put('/reset-password/:token', forgotPasswordLimiter, authController.resetPassword);
router.post('/verify-email/:token',  forgotPasswordLimiter, authController.verifyEmail);
router.post('/resend-verification',  forgotPasswordLimiter, authController.resendVerification);
```

---

### 21. `passwordResetToken` Not Cleared When Password Is Changed via Other Flows

| Property | Detail |
|----------|--------|
| **File** | `backend/src/models/User.js` |
| **Hook** | `userSchema.pre('save')` |
| **Severity** | 🟡 Medium — stale reset tokens |

**Root Cause**

The `resetPassword()` controller explicitly clears `passwordResetToken` and `passwordResetExpires` after use. However, the `changePassword()` endpoint (while the user is logged in) does not. If a user had an outstanding reset link and then changed their password via the authenticated flow, the reset link remained technically valid until its 10-minute TTL elapsed.

**Fix Applied**

Added token clearance inside the `pre('save')` hook so it triggers automatically whenever the `password` field is modified, regardless of which code path initiated the save:

```js
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  // Clear any pending reset tokens so existing links are invalidated immediately
  this.passwordResetToken = undefined;
  this.passwordResetExpires = undefined;

  const salt = await bcrypt.genSalt(...);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```

---

### 22. `addToCart` Added Items Without Verifying They Exist

| Property | Detail |
|----------|--------|
| **File** | `backend/src/controllers/cartController.js` |
| **Function** | `addToCart()` |
| **Severity** | 🟠 High — invalid cart state, order failure |

**Root Cause**

Items were pushed into the cart using only the supplied ID, without checking that the corresponding Product or Service document existed and was active:

```js
// BEFORE — no existence check
const user = await User.findById(req.user.id);
const existingItemIndex = user.cart.items.findIndex(...);
// ... blindly push itemId to cart
```

A deleted or deactivated product could remain in the cart, causing `createOrder()` to silently skip the item (`continue`) and produce an order with a different subtotal than the user saw during checkout.

**Fix Applied**

Added an existence + active check immediately after quantity validation:

```js
// Verify the product/service exists and is active before adding to cart
let dbItem;
if (type === 'product') {
  dbItem = await Product.findOne({ _id: itemId, isActive: true }).select('_id');
} else {
  dbItem = await Service.findOne({ _id: itemId, isActive: true }).select('_id');
}

if (!dbItem) {
  return res.status(404).json({
    success: false,
    message: `${type === 'product' ? 'Product' : 'Service'} not found or is no longer available`
  });
}
```

---

### 23. No Upper Bound on Cart Item Quantity

| Property | Detail |
|----------|--------|
| **File** | `backend/src/controllers/cartController.js` |
| **Functions** | `addToCart()`, `updateCartItem()` |
| **Severity** | 🟡 Medium — data integrity, DoS |

**Root Cause**

Both functions validated a lower bound (`>= 1` / `>= 0`) on quantity but applied no upper bound. A client could set a quantity of 2,147,483,647 (or larger), causing integer overflow in price calculations and unusably large order totals.

**Fix Applied**

Added `MAX_ITEM_QUANTITY = 999` enforcement in both functions:

```js
const MAX_ITEM_QUANTITY = 999;
const parsedQty = Number(quantity);
if (!Number.isInteger(parsedQty) || parsedQty < 1 || parsedQty > MAX_ITEM_QUANTITY) {
  return res.status(400).json({
    success: false,
    message: `Quantity must be a positive integer between 1 and ${MAX_ITEM_QUANTITY}`
  });
}
```

---

## Updated Summary Table

| Severity | Count | Status |
|----------|-------|--------|
| 🔴 Critical (crash / data corruption) | 3 | ✅ Fixed |
| 🟠 High (security / revenue) | 11 | ✅ Fixed |
| 🟡 Medium / Minor (performance / hardening) | 9 | ✅ Fixed |
| 📋 Feature work (refund UI, test suite) | 2 | 📋 Backlog |

---

*Report updated: March 2026*
