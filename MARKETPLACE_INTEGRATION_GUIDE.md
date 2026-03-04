# Marketplace Integration Points & Architecture

Visual guide for understanding how missing features connect to existing systems.

---

## 🏗️ Current vs. Proposed Architecture

### Current Flow (Simplified)

```
┌─────────────────────────────────────────────────────────────────┐
│                      MARKETPLACE SYSTEM                         │
└─────────────────────────────────────────────────────────────────┘

USER JOURNEY:
   Browse → View Product → Add to Cart → Checkout → Payment → Order

EXISTING SYSTEMS:
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Products    │───▶│   Cart       │───▶│ Order        │
│  Services    │    │  (in User)   │    │ & Payment    │
└──────────────┘    └──────────────┘    └──────────────┘
                           │                     │
                           ▼                     ▼
                    ┌────────────────────────────────┐
                    │   Payment (Razorpay)           │
                    │   Download Links               │
                    │   Notifications                │
                    └────────────────────────────────┘

⚠️ MISSING:
  • Wishlist (orphaned in User model)
  • Coupons (no model/validation)
  • Invoices (frontend only)
  • Stock management
  • Returns/Refunds
  • Guest checkout
  • Cart abandonment
```

### Proposed Complete Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPLETE MARKETPLACE                         │
└─────────────────────────────────────────────────────────────────┘

USER JOURNEY STAGE 1: DISCOVERY & RESEARCH
┌──────────────┐  ┌─────────────────┐  ┌──────────────┐
│  Products    │  │  Wishlist       │  │ Comparisons  │
│  Services    │  │  (NEW)          │  │ (NEW)        │
│              │  │  - Save items   │  │ - Side-by    │
│              │  │  - Share link   │  │   side view  │
└──────────────┘  └─────────────────┘  └──────────────┘
       ▲                 ▲                     ▲
       └─────────────────┼─────────────────────┘
              Product Detail Page
              (Reviews, ratings, images)

USER JOURNEY STAGE 2: PURCHASE CONSIDERATION
┌──────────────────────┐  ┌──────────────┐
│   Coupons/Discounts  │  │ Stock Check  │
│   (NEW)              │  │ (NEW)        │
│   - Apply code       │  │ - In stock?  │
│   - See savings      │  │             │
└──────────────────────┘  └──────────────┘
       ▲                        ▲
       └────────────────────────┘
              Cart Review Page

USER JOURNEY STAGE 3: CHECKOUT
┌─────────────────────────────────────────────┐
│   Checkout Options (NEW)                    │
│   ┌──────────────┐  ┌──────────────┐       │
│   │ Authenticated│  │ Guest        │       │
│   │ +Quick Buy   │  │ (NEW)        │       │
│   └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────┘
              ▼
┌──────────────────────┐
│   Final Order Page   │
│   - Items           │
│   - Coupon discount │
│   - Total           │
└──────────────────────┘
              ▼
┌──────────────────────┐
│   Payment (Razorpay) │
└──────────────────────┘
              ▼
┌──────────────────────┐
│   Order Confirmation │
│   + Invoice PDF (NEW)│
└──────────────────────┘

USER JOURNEY STAGE 4: POST-PURCHASE
┌──────────────────────────────────────────────┐
│   Order Management                           │
│   ┌──────────────┐  ┌──────────────┐        │
│   │ Downloads    │  │ Invoice      │        │
│   │              │  │ (PDF - NEW)  │        │
│   └──────────────┘  └──────────────┘        │
│   ┌──────────────┐  ┌──────────────┐        │
│   │ Returns      │  │ Reviews      │        │
│   │ (NEW)        │  │              │        │
│   └──────────────┘  └──────────────┘        │
└──────────────────────────────────────────────┘

ABANDONED CART RECOVERY (NEW)
┌──────────────────────────────────────────────┐
│   If user doesn't complete checkout:        │
│   1. Send reminder email after 1 hour       │
│   2. Send follow-up after 24 hours          │
│   3. Offer incentive/discount               │
└──────────────────────────────────────────────┘

EMAIL MARKETING (NEW)
┌──────────────────────────────────────────────┐
│   Campaigns, newsletters, promotions         │
│   - New product launches                     │
│   - Flash sales                              │
│   - Personalized recommendations             │
└──────────────────────────────────────────────┘
```

---

## 📊 Data Model Integration

### Current Models & Where to Add New Ones

```
USER
├── auth fields
├── profile fields
├── cart (CartItemSchema) ✅
├── favorites
│   ├── products
│   └── services
│
PRODUCT
├── basic info
├── pricing ✅
├── discount field (%)
├── files
├── stock ❌ (partially)
├── reviews
│
SERVICE
├── basic info
├── packages with pricing ✅
├── discount (%)
├── reviews
│
ORDER
├── items
├── billing
├── payment ✅
├── fulfillment
├── timeline
├── downloadLinks
│
⭐ NEW MODELS NEEDED:
├── Coupon
├── Refund
├── Cart Abandonment Event
├── Invoice (optional - generate on demand)
├── Affiliate (if implementing referrals)
└── ProductComparison (optional)
```

### Schema Relationships

```
User
├──▶ Order (1:N)
│    ├──▶ Product/Service (N:M)
│    └──▶ Coupon (N:1) ⭐ NEW
│
├──▶ Wishlist Items (N:M)
│    ├──▶ Product (N:M)
│    └──▶ Service (N:M)
│
├──▶ Cart Items (1:N)
│    └──▶ Product/Service (N:M)
│
└──▶ Reviews (1:N)
     └──▶ Product/Service (N:1)

Coupon ⭐ NEW
├──▶ User (many have used)
└──▶ Order (applied to)

Refund ⭐ NEW
├──▶ Order (1:1)
└──▶ User (1:N)

CartAbandonmentEvent ⭐ NEW
├──▶ User (1:N)
└──▶ Cart Items (1:N)
```

---

## 🔗 API Integration Timeline

### Phase 1: Core Missing Features (Week 1)

```javascript
// WISH LIST ENDPOINTS
GET    /api/v1/marketplace/wishlist
POST   /api/v1/marketplace/wishlist/:itemId
DELETE /api/v1/marketplace/wishlist/:itemId
GET    /api/v1/marketplace/wishlist/check/:itemId

// COUPON ENDPOINTS (BACKEND)
POST   /api/v1/marketplace/coupons/validate (public)
POST   /api/v1/marketplace/admin/coupons (admin)
GET    /api/v1/marketplace/admin/coupons (admin)
PUT    /api/v1/marketplace/admin/coupons/:id (admin)
DELETE /api/v1/marketplace/admin/coupons/:id (admin)

// GUEST CHECKOUT (MODIFY EXISTING)
POST   /api/v1/marketplace/orders (allow guestEmail)

// INVOICE (NEW)
GET    /api/v1/marketplace/orders/:orderId/invoice (PDF)
GET    /api/v1/marketplace/orders/:orderId/invoice/preview (HTML)
POST   /api/v1/marketplace/orders/:orderId/send-invoice (email)
```

### Phase 2: Important Features (Week 2-3)

```javascript
// STOCK MANAGEMENT
GET    /api/v1/marketplace/products/:id/stock
PUT    /api/v1/marketplace/admin/products/:id/stock
POST   /api/v1/marketplace/admin/stock-alerts

// REFUND/RETURNS
POST   /api/v1/marketplace/orders/:orderId/refund-request (customer)
GET    /api/v1/marketplace/orders/:orderId/refund-status
PUT    /api/v1/marketplace/admin/refunds/:refundId (admin)

// REVIEWS MANAGEMENT
GET    /api/v1/marketplace/products/:id/reviews
POST   /api/v1/marketplace/products/:id/reviews
PUT    /api/v1/marketplace/reviews/:reviewId
DELETE /api/v1/marketplace/reviews/:reviewId
POST   /api/v1/marketplace/admin/reviews/:reviewId/approve (admin)

// CART ABANDONMENT
POST   /api/v1/marketplace/cart/save (auto-save)
GET    /api/v1/marketplace/abandoned-carts (admin)
POST   /api/v1/marketplace/cart/recovery-email (email)
```

### Phase 3: Growth Features (Week 4+)

```javascript
// PRODUCT RECOMMENDATIONS
GET    /api/v1/marketplace/products/:id/related
GET    /api/v1/marketplace/recommendations/personalized
GET    /api/v1/marketplace/recommendations/trending

// ANALYTICS
GET    /api/v1/marketplace/admin/analytics/dashboard
GET    /api/v1/marketplace/admin/analytics/sales
GET    /api/v1/marketplace/admin/analytics/products
GET    /api/v1/marketplace/admin/analytics/customers

// EMAIL MARKETING
POST   /api/v1/marketplace/admin/campaigns (create)
POST   /api/v1/marketplace/admin/campaigns/:id/send
GET    /api/v1/marketplace/admin/campaigns/:id/stats

// AFFILIATE SYSTEM
POST   /api/v1/marketplace/affiliate/register
GET    /api/v1/marketplace/affiliate/dashboard
POST   /api/v1/marketplace/affiliate/referral-link
GET    /api/v1/marketplace/affiliate/earnings
```

---

## 🧪 Integration Testing Checklist

### Wishlist Integration
- [ ] Add to wishlist from product page
- [ ] Check if item is in wishlist
- [ ] View all wishlist items
- [ ] Remove from wishlist
- [ ] Add to cart from wishlist
- [ ] Share wishlist link (future)

### Coupon Integration
- [ ] Validate coupon code
- [ ] Apply discount to order
- [ ] Check usage limits
- [ ] Verify minimum order amount
- [ ] Test product-specific coupons
- [ ] Verify one-time use restriction

### Checkout Integration
- [ ] Guest checkout (no email required initially)
- [ ] Apply coupon before payment
- [ ] See discount reflected in total
- [ ] Email confirmation sent
- [ ] Account creation after payment (optional)

### Invoice Integration
- [ ] Download PDF after order
- [ ] PDF contains correct info
- [ ] Send via email on request
- [ ] HTML preview works
- [ ] PDF generation doesn't timeout

### Stock Integration
- [ ] Check stock before adding to cart
- [ ] Prevent checkout if out of stock
- [ ] Show stock count on product page
- [ ] Show low stock warning
- [ ] Admin can update stock

---

## 🛡️ Security Checklist

### Coupon Security
- [ ] Validate coupon code server-side
- [ ] Prevent coupon code brute-force attacks (rate limit)
- [ ] Validate usage rules before applying
- [ ] Prevent duplicate use
- [ ] Validate coupon belongs to your store

### Wishlist Security
- [ ] Users can only see their own wishlist
- [ ] Cannot manipulate others' wishlist
- [ ] Token validation on all requests
- [ ] Check user authentication before modification

### Invoice Security
- [ ] Users can only download their own invoices
- [ ] Invoice data is accurate and immutable
- [ ] Token/signature validation
- [ ] Rate limit invoice downloads

### Guest Checkout Security
- [ ] Email validation (valid format)
- [ ] CSRF protection
- [ ] Rate limiting on order creation
- [ ] Validate all provided data

---

## 📱 Frontend Component Mapping

### Wishlist Components
```
└── MarketPlace/
    └── pages/
        ├── Wishlist/
        │   ├── Wishlist.jsx (main page)
        │   ├── WishlistEmptyState.jsx
        │   └── WishlistItem.jsx
        └── Shared/
            └── WishlistButton.jsx (heart icon on product cards)
```

### Coupon Components
```
└── MarketPlace/
    ├── pages/
    │   └── Checkout/
    │       └── CouponInput.jsx (add during checkout)
    └── AdminPanel/
        └── pages/
            ├── Coupons/
            │   ├── CouponManagement.jsx
            │   ├── CouponForm.jsx
            │   └── CouponList.jsx
            └── Marketplace/
                └── Overview.jsx (show active coupons)
```

### Invoice Components
```
└── MarketPlace/
    └── pages/
        ├── Orders/
        │   └── OrderDetail.jsx (add invoice download button)
        └── Invoice/ (existing)
            ├── Invoice.jsx (HTML view)
            └── InvoiceButton.jsx (download PDF)
```

---

## 🚀 Implementation Priority Matrix

```
                HIGH IMPACT
                    │
           ┌────────┼────────┐
           │                 │
QUICK      │ Wishlist   Guest│
(< 4h)     │ Coupons  Checkout    → DO NOW
           │ Invoice          │
           │                 │
           └────────┼────────┘
                    │
           ┌────────┼────────┐
           │                 │
MEDIUM     │ Returns   Cart  │
(4-8h)     │ Abandon   Stock    → NEXT WEEK
           │ Reviews   Email
           │                 │
           └────────┼────────┘
                    │
              LOW IMPACT

     QUICK & HIGH = PRIORITY ⭐

All Phase 1 features are in QUICK + HIGH quadrant!
```

---

## 📅 Sprint Planning Template

### Sprint 1 (3 days)
- [ ] Completed Wishlist (backend + frontend)
- [ ] Coupon System (backend + admin UI)
- [ ] Invoice PDF Generation
- **Tests:** All CRUD operations working

### Sprint 2 (3 days)
- [ ] Guest Checkout
- [ ] Cart Abandonment Detection
- [ ] Email Notifications
- **Tests:** End-to-end checkout flow

### Sprint 3 (4 days)
- [ ] Stock Management
- [ ] Return/Refund System
- [ ] Review Moderation
- **Tests:** Stock checks, refund workflow

### Sprint 4 (5 days)
- [ ] Advanced Search Filters
- [ ] Product Recommendations
- [ ] Analytics Dashboard
- **Tests:** Filter accuracy, analytics data

---

*Refer to MARKETPLACE_FEATURES_ANALYSIS.md for detailed feature descriptions*
*Refer to MARKETPLACE_IMPLEMENTATION_GUIDE.md for code templates*
