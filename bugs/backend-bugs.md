Here is the comprehensive backend bug report for the Marketplace in `dev-kant-kumar/devkantkumar`:

---

## 🐛 Backend Marketplace Bug Report

### 🔴 Critical Bugs

---

#### 1. **Razorpay Webhook Returns `404` to Razorpay — Causes Retries & Double Payments**
**File:** [`backend/src/controllers/marketplaceController.js` (L1704–L1709)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L1704-L1709)

```javascript name=marketplaceController.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L1704-L1708
if (!order) {
  logger.error(`Order not found for Razorpay Order ID: ${razorpayOrderId}`);
  return res.status(404).json({ message: "Order not found" });  // ← BUG
}
```
**Bug:** Razorpay expects webhook handlers to always return `200 OK`. Any non-2xx response causes Razorpay to **retry the webhook** repeatedly (up to 24 hours). This causes duplicate order confirmation attempts and can have financial side effects.

**Fix:** Always return `200` from webhook, and log the error internally.
```javascript
return res.status(200).json({ status: "ok", warning: "Order not found" });
```

---

#### 2. **Coupon is Marked as Used Before Verifying Payment — Race Condition / Coupon Fraud**
**File:** [`backend/src/controllers/marketplaceController.js` (L468–L479)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L468-L479)

```javascript name=marketplaceController.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L466-L485
await order.save();

// Mark coupon as used if applied  ← BUG: coupon consumed before payment
if (couponApplied) {
  await Coupon.findByIdAndUpdate(couponApplied, {
    $push: { usedByUsers: { ... } },
    $inc: { usedCount: 1 },
  });
}

// Clear cart
user.cart.items = [];
```
**Bug:** `createOrder` marks the coupon as used at order creation time — **before** payment is confirmed. If the user abandons payment, the coupon is permanently burned. Additionally, the cart is cleared before payment, leaving users with no items and no confirmed order if payment fails.

**Fix:** Move coupon marking and cart clearing to `verifyRazorpayPayment` / the webhook handler, after `payment.status = "completed"`.

---

#### 3. **`verifyRazorpayPayment` Does Not Validate That the Order Belongs to the Requesting User**
**File:** [`backend/src/controllers/marketplaceController.js` (L740)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L740)

```javascript name=marketplaceController.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L740
const order = await Order.findById(orderId);  // ← BUG: no user check
```
**Bug:** Any authenticated user can submit a valid `razorpay_order_id + razorpay_payment_id + razorpay_signature` from **someone else's order** and get it confirmed under their own account. There is no check that `order.user === req.user.id`.

**Fix:**
```javascript
const order = await Order.findOne({ _id: orderId, user: req.user.id });
```

---

#### 4. **Razorpay Initialized with Plaintext Fallback Secrets**
**File:** [`backend/src/controllers/marketplaceController.js` (L16–L19)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L16-L19)

```javascript name=marketplaceController.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L16-L19
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "secret_placeholder",
});
```
**Bug:** If env vars are missing, the app silently initializes with placeholder keys. This means payment calls will use fake credentials in production without crashing, leading to failed payments with no clear error.

**Fix:** Throw a startup error if keys are missing (add to `requiredEnvVars` in `index.js`):
```javascript
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Missing Razorpay credentials");
}
```

---

#### 5. **`search` Controller Uses `status: "active"` But Products/Services Use `isActive: true`**
**File:** [`backend/src/controllers/marketplaceController.js` (L163–L169)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L163-L169)

```javascript name=marketplaceController.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L163-L179
const searchQuery = {
  $or: [
    { name: { $regex: q, $options: "i" } },  // ← BUG: field is "title", not "name"
    { description: { $regex: q, $options: "i" } },
  ],
  status: "active",  // ← BUG: should be isActive: true
};
```
**Bug — Two issues here:**
1. The field `name` doesn't exist on `Product` or `Service` models — it should be `title`. The `search` endpoint will **never match products/services by name**.
2. The filter `status: "active"` doesn't match the schema which uses `isActive: true` (boolean). This means **all inactive items also appear in search results**.

**Fix:**
```javascript
const searchQuery = {
  $or: [
    { title: { $regex: q, $options: "i" } },
    { description: { $regex: q, $options: "i" } },
  ],
  isActive: true,
};
```

---

#### 6. **`getOrderById` Calls `.sort()` on a Single Document (Not a Query)**
**File:** [`backend/src/controllers/marketplaceController.js` (L529)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L529)

```javascript name=marketplaceController.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L514-L530
const order = await Order.findOne({
  _id: req.params.id,
  user: req.user.id,
})
  .populate({ ... })
  .populate({ ... })
  .sort("-createdAt");  // ← BUG: .sort() on findOne does nothing
```
**Bug:** `.sort()` is chained on a `findOne()` query. Mongoose ignores `sort` on `findOne` (it returns the first document, not the sorted result). This is a no-op and indicates a mistake where `.sort()` should be on a `find()` query (e.g., for `getUserOrders`).

---

### 🟠 High Severity Bugs

---

#### 7. **`req.rawBody` Used in Webhook but Never Set Up in `index.js`**
**File:** [`backend/src/controllers/marketplaceController.js` (L1680)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L1680)

```javascript name=marketplaceController.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L1679-L1681
const shasum = crypto.createHmac("sha256", secret);
shasum.update(req.rawBody);  // ← BUG: req.rawBody is undefined
const digest = shasum.digest("hex");
```
**Bug:** `req.rawBody` is a non-standard property that must be explicitly set up with a custom body-parser middleware. With the standard `express.json()` middleware used in `index.js`, `req.rawBody` will be `undefined`. This means `shasum.update(undefined)` produces the wrong HMAC, and the webhook signature check will **always fail** — making webhook-based payment confirmation broken.

**Fix:** Add raw body capture in `index.js`:
```javascript
app.use('/api/v1/marketplace/payment/webhook', express.raw({ type: 'application/json' }));
// Then in webhook handler: shasum.update(req.body) after parsing
```
Or use a custom middleware to store `req.rawBody`.

---

#### 8. **`createOrder` Doesn't Validate Empty `orderItems` After Filtering**
**File:** [`backend/src/controllers/marketplaceController.js` (L296–L378)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L296-L378)

```javascript name=marketplaceController.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L300-L308
for (const item of user.cart.items) {
  const productOrService = item.type === "service" ? item.service : item.product;

  if (!productOrService) {
    continue; // Skip if reference is missing  ← BUG: no post-loop check
  }
  ...
}
// No check: if (orderItems.length === 0) return 400
```
**Bug:** If **all** cart items have orphaned/deleted product references, `orderItems` will be empty (`[]`) and the code proceeds to create a `₹0` order and charge the payment gateway for `₹0`. This can produce a degenerate order record and unexpected Razorpay API behavior.

**Fix:** After the loop, add:
```javascript
if (orderItems.length === 0) {
  return res.status(400).json({ message: "No valid items in cart" });
}
```

---

#### 9. **`regenerateDownloadLinks` Uses `itemId` from URL Params to Look Up Product, Not `item.itemId`**
**File:** [`backend/src/controllers/marketplaceController.js` (L1268)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L1268)

```javascript name=marketplaceController.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L1257-L1268
const item = order.items.find(
  (i) => i.itemId && i.itemId.toString() === itemId,
);
...
// Fetch product for fresh download links
const product = await Product.findById(itemId);  // ← BUG: itemId is the cart itemId, same as item.itemId
```
**Bug:** The route is `/orders/:orderId/regenerate/:itemId` but the semantics are ambiguous. `itemId` from the URL is matched against `order.items[].itemId` (the product's `_id`). This means it works only when the URL `:itemId` is the **product's** `_id`, not the order item's subdocument `_id`. This is misleading and breaks if a client passes the order subdocument ID.

---

#### 10. **`addOrderMessage` Does NOT Sanitize Attachment URLs — SSRF / Stored XSS Risk**
**File:** [`backend/src/controllers/marketplaceController.js` (L1344–L1351)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L1344-L1351)

```javascript name=marketplaceController.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L1341-L1351
const newMessage = {
  sender: userId,
  message: message.trim(),
  timestamp: new Date(),
  attachments: attachments.map((att) => ({
    name: att.name,   // ← BUG: no sanitization
    url: att.url,     // ← BUG: no URL validation (can be file:// or javascript:)
    size: att.size || 0,
    mimetype: att.mimetype || '',
  })),
};
```
**Bug:** Attachment `url` and `name` are taken directly from user input and stored without validation. A malicious user could store `javascript:` URIs for XSS or `file://` / internal URLs for SSRF if the URLs are later rendered/fetched.

---

### 🟡 Medium Severity Bugs

---

#### 11. **`createOrder` Has `// ... existing imports ...` Comment Left in Production Code**
**File:** [`backend/src/controllers/marketplaceController.js` (L275)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L275)

```javascript name=marketplaceController.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L271-L277
// Order management
const SystemSetting = require("../models/SystemSetting");
const emailService = require("../services/emailService");

// ... existing imports ...  ← stale development comment

// Order management
const createOrder = async (req, res) => {
```
**Bug:** `SystemSetting` and `emailService` are `require()`d **in the middle of the file**, not at the top. Node.js caches modules so this works, but it's a code smell and means these imports aren't visible at file start. It also duplicates the `// Order management` comment.

---

#### 12. **`createReview` Allows Reviewing Services as if They Were Products**
**File:** [`backend/src/controllers/marketplaceController.js` (L1525)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L1525)

```javascript name=marketplaceController.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L1528-L1533
const hasPurchased = await Order.findOne({
  user: userId,
  "items.itemId": productId,         // ← only matches by ID, not itemType
  "payment.status": "completed",
});
```
**Bug:** The purchase verification for reviews only checks `items.itemId` but not `items.itemType === "product"`. A user who purchased a **service** with the same `_id` (edge case but theoretically possible with ObjectID collision) or who specifically has an item with a matching ID could bypass the product-purchase verification. The review is then stored on the `Product` model but without confirming the user bought a *product*.

**Fix:** Add `"items.itemType": "product"` to the query.

---

#### 13. **`submitRequirements` Uses `$or` Query Which Can Match by `orderNumber` Regardless of User**
**File:** [`backend/src/controllers/marketplaceController.js` (L1805–L1808)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L1805-L1808)

```javascript name=marketplaceController.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/backend/src/controllers/marketplaceController.js#L1805-L1808
const order = await Order.findOne({
  $or: [{ _id: id }, { orderNumber: id }],
  user: req.user._id
});
```
**Bug:** This is actually OK as written (the `user` filter AND-combines with `$or`). However, the `{ _id: id }` branch will **throw a Mongoose CastError** (unhandled) if `id` is a valid `orderNumber` string (e.g. `"ORD-123-456"`), not a valid ObjectId — because Mongoose tries to cast it to `ObjectId` first before applying `$or`. This causes an unhandled 500 response instead of a clean 404.

**Fix:** Validate `id` before running the query:
```javascript
const isObjectId = mongoose.Types.ObjectId.isValid(id);
const query = isObjectId
  ? { $or: [{ _id: id }, { orderNumber: id }], user: req.user._id }
  : { orderNumber: id, user: req.user._id };
```

---

### 📋 Summary Table

| # | Severity | File | Bug |
|---|----------|------|-----|
| 1 | 🔴 Critical | `marketplaceController.js` | Webhook returns 404 → Razorpay retries indefinitely |
| 2 | 🔴 Critical | `marketplaceController.js` | Coupon burned & cart cleared before payment confirmed |
| 3 | 🔴 Critical | `marketplaceController.js` | `verifyRazorpayPayment` doesn't verify order belongs to user |
| 4 | 🔴 Critical | `marketplaceController.js` | Razorpay initialized with hardcoded fallback placeholder secrets |
| 5 | 🔴 Critical | `marketplaceController.js` | `search` uses wrong field (`name`) and wrong status field (`status: "active"`) — returns no results |
| 6 | 🔴 Critical | `marketplaceController.js` | `.sort()` chained on `findOne()` — no-op, misleading code |
| 7 | 🟠 High | `marketplaceController.js` | `req.rawBody` is `undefined` — webhook signature always fails |
| 8 | 🟠 High | `marketplaceController.js` | Empty `orderItems` after filtering creates ₹0 order |
| 9 | 🟠 High | `marketplaceController.js` | `regenerateDownloadLinks` `itemId` semantic ambiguity |
| 10 | 🟠 High | `marketplaceController.js` | No attachment URL sanitization — SSRF / XSS risk |
| 11 | 🟡 Medium | `marketplaceController.js` | Mid-file `require()` calls and stale dev comment |
| 12 | 🟡 Medium | `marketplaceController.js` | `createReview` purchase check doesn't validate `itemType === "product"` |
| 13 | 🟡 Medium | `marketplaceController.js` | `submitRequirements` `$or` with `_id` CastError on non-ObjectId strings |

---

Would you like me to **create a pull request** to fix any or all of these bugs? 🚀
