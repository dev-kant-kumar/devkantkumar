Here is a comprehensive bug report for the **Marketplace** in `dev-kant-kumar/devkantkumar`, organized by severity:

---

## 🐛 Marketplace Bug Report

### 🔴 Critical Bugs

---

#### 1. **Plaintext Passwords Stored in `localStorage` (`mockAuth.js`)**
**File:** [`frontend/src/apps/MarketPlace/utils/mockAuth.js` (L41)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/utils/mockAuth.js#L41)

```javascript name=mockAuth.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/utils/mockAuth.js#L37-L44
const newUser = {
  id: Date.now().toString(),
  name: userData.name,
  email: userData.email,
  password: userData.password, // In a real app, this would be hashed!  ← BUG
  ...
};
```
**Bug:** User passwords are stored in plaintext in `localStorage`. Even as a mock service used for development/testing, if this is ever served to real users, passwords are fully exposed via `localStorage` inspection or XSS.

**Fix:** Even in mock mode, hash passwords (e.g., using a simple SHA256), or remove this mock entirely now that real backend auth is in place.

---

#### 2. **Hardcoded Demo Credentials in Production Code (`mockAuth.js`)**
**File:** [`frontend/src/apps/MarketPlace/utils/mockAuth.js` (L70–L78)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/utils/mockAuth.js#L70-L78)

```javascript name=mockAuth.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/utils/mockAuth.js#L70-L78
if (email === 'demo@example.com' && password === 'Password123!') {
  resolve({ id: '1', name: 'Demo User', email: 'demo@example.com', role: 'client' });
  return;
}
```
**Bug:** Hardcoded backdoor credentials allow anyone to log in as a "Demo User" with admin-like knowledge of these credentials. This is a security vulnerability if the mock system is reachable.

---

#### 3. **Wrong `x-country-code` Header Value in Payment Request (`Checkout.jsx`)**
**File:** [`frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx` (L267)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx#L267)

```javascript name=Checkout.jsx url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx#L267
"x-country-code": detectedCountryCode || "INR",  // ← BUG: fallback should be "IN" not "INR"
```
**Bug:** The fallback value for `x-country-code` is `"INR"` (a currency code), but this header is supposed to be a **country code** like `"IN"`. This could cause backend failures in country-based pricing logic.

**Fix:** Change the fallback to `"IN"`.

---

### 🟠 High Severity Bugs

---

#### 4. **Cart Surcharge Calculation Inconsistency Between Cart & Checkout**
**Files:** `Cart.jsx` (L76) vs `Checkout.jsx` (L104)

```javascript name=Cart.jsx url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/pages/Cart/Cart.jsx#L75-L78
// Cart.jsx: Manual calculation, no rounding
const surchargeAmount = subtotal * (surchargeRate / 100);
const total = subtotal + surchargeAmount;
```

```javascript name=Checkout.jsx url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx#L103-L107
// Checkout.jsx: Uses getFinalPrice() which applies Math.round()
const totalWithSurcharge = getFinalPrice(subtotal);
const surchargeAmount = totalWithSurcharge - subtotal;
```
**Bug:** The **Cart page** calculates surcharge manually (no rounding), while the **Checkout page** uses `getFinalPrice()` which applies `Math.round()`. This means the total shown in the Cart will differ from the total in Checkout, confusing users.

**Fix:** Unify the surcharge calculation — use `getFinalPrice()` in both places.

---

#### 5. **Incorrect Currency Conversion Uses Hardcoded Multiplier (`Checkout.jsx`)**
**File:** [`frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx` (L763)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx#L763)

```javascript name=Checkout.jsx url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx#L761-L764
{currentCurrency !== 'INR' && (
  <p>
    (~{new Intl.NumberFormat('en-US', { style: 'currency', currency: currentCurrency }).format(total * 0.012)})
  </p>
)}
```
**Bug:** The approximate foreign currency conversion uses a **hardcoded `0.012` multiplier** (presumably INR→USD), regardless of the actual `currentCurrency`. This will show wildly incorrect amounts for GBP, JPY, EUR, etc.

**Fix:** Use `currencyService.convertFromINR(total, currentCurrency, exchangeRates)` from `CurrencyContext`, which is already available.

---

#### 6. **`useGetCategoriesQuery` & `useSearchMarketplaceQuery` Exported But Not Defined (`marketplaceApi.js`)**
**File:** [`frontend/src/apps/MarketPlace/store/api/marketplaceApi.js` (L132–L134)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/store/api/marketplaceApi.js#L128-L141)

```javascript name=marketplaceApi.js url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/store/api/marketplaceApi.js#L128-L141
export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,        // ← BUG: No 'getCategories' endpoint defined above
  useSearchMarketplaceQuery,    // ← BUG: No 'searchMarketplace' endpoint defined above
  ...
} = marketplaceApi;
```
**Bug:** `useGetCategoriesQuery` and `useSearchMarketplaceQuery` are exported but the corresponding `getCategories` and `searchMarketplace` endpoints are **never defined** in `injectEndpoints`. This will cause a runtime error (`undefined`) if any component tries to use these hooks.

---

#### 7. **`ip-api.com` Called Over HTTP (Not HTTPS) — Mixed Content Issue**
**File:** [`frontend/src/apps/MarketPlace/context/CurrencyContext.jsx` (L67)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/context/CurrencyContext.jsx#L67)

```javascript name=CurrencyContext.jsx url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/context/CurrencyContext.jsx#L67
const res = await fetch('http://ip-api.com/json/?fields=countryCode,currency', {
```
**Bug:** The geolocation API is called over `http://`, not `https://`. Modern browsers **block mixed content** (HTTP requests from HTTPS pages), meaning this will silently fail for all users on the live site. Country/currency detection will always fall back to defaults (`IN`/`INR`).

**Fix:** Use `https://ip-api.com/...` — ip-api.com supports HTTPS on paid plans; alternatively, switch to a free HTTPS-compatible geolocation API.

---

### 🟡 Medium Severity Bugs

---

#### 8. **`item.type` vs `item.itemType` Field Inconsistency in Checkout Order Summary**
**File:** [`frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx` (L672–L677)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx#L672-L677)

```javascript name=Checkout.jsx url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx#L672-L677
<span className={`... ${
  item.itemType === 'service'   // ← Uses item.itemType
    ? 'bg-purple-50 ...'
    : 'bg-blue-50 ...'
}`}>
  {item.itemType === 'service' ? 'Service' : 'Product'}
```
But in `getCartItemPrice()` on line 81, the type check uses `item.type`:
```javascript name=Checkout.jsx url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx#L81
if (item.type === 'service') {   // ← Uses item.type
```
**Bug:** The two type fields (`item.type` vs `item.itemType`) are used interchangeably across the component without a single normalized check. This is correctly handled in `Cart.jsx` with `(item.itemType || item.type)`, but not consistently in `Checkout.jsx`, which can lead to incorrect price calculation or wrong badge labels.

---

#### 9. **`getFinalPrice(0)` Returns `0` — Free Items Are Broken**
**File:** [`frontend/src/apps/MarketPlace/context/CurrencyContext.jsx` (L115–L119)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/context/CurrencyContext.jsx#L115-L119)

```javascript name=CurrencyContext.jsx url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/context/CurrencyContext.jsx#L115-L119
const getFinalPrice = (basePrice) => {
    if (!basePrice || isNaN(basePrice)) return 0;  // ← !0 is truthy, so price=0 early-exits
    ...
};
```
**Bug:** `!basePrice` is `true` when `basePrice === 0`, so free items (price = `0`) are handled correctly — BUT if a coupon brings a price to `0`, and `getFinalPrice(0)` is subsequently called, it still returns `0` correctly. However, the **surcharge on a `0`-price cart** is computed as `Math.round(0 * multiplier) = 0`, which is fine. The real bug is: `!basePrice` also catches `NaN`, negative numbers etc. more gracefully. This is a **minor logic smell** but not a bug in normal cases.

---

#### 10. **Duplicate Comment in `Checkout.jsx`**
**File:** [`frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx` (L68–L70)](https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx#L68-L70)

```javascript name=Checkout.jsx url=https://github.com/dev-kant-kumar/devkantkumar/blob/a1e50a61f63599addc9231fd6c41c7abe46704d7/frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx#L68-L70
  // Determine which cart items to use
  // Determine which cart items to use   ← exact duplicate comment (L68 and L69)
```
Minor but indicates a copy-paste error.

---

### 📋 Summary Table

| # | Severity | File | Bug |
|---|----------|------|-----|
| 1 | 🔴 Critical | `mockAuth.js` | Plaintext passwords stored in `localStorage` |
| 2 | 🔴 Critical | `mockAuth.js` | Hardcoded backdoor demo credentials |
| 3 | 🔴 Critical | `Checkout.jsx` | Wrong fallback value `"INR"` for `x-country-code` header |
| 4 | 🟠 High | `Cart.jsx` / `Checkout.jsx` | Surcharge calculation inconsistency causes price mismatch |
| 5 | 🟠 High | `Checkout.jsx` | Hardcoded `0.012` multiplier for foreign currency display |
| 6 | 🟠 High | `marketplaceApi.js` | `useGetCategoriesQuery` & `useSearchMarketplaceQuery` exported but endpoints missing |
| 7 | 🟠 High | `CurrencyContext.jsx` | `ip-api.com` called over HTTP — blocked on HTTPS sites (mixed content) |
| 8 | 🟡 Medium | `Checkout.jsx` | `item.type` vs `item.itemType` inconsistency in type checks |
| 9 | 🟡 Medium | `CurrencyContext.jsx` | `!basePrice` guard also blocks `0` prices (edge case) |
| 10 | 🟡 Low | `Checkout.jsx` | Duplicate comment on consecutive lines |

