Fix the following issues. The issues can be from different files or can overlap on same lines in one file.

- Verify each finding against the current code and only fix it if needed.

In @backend/src/controllers/marketplaceController.js at line 1481, The assignment review.rating = Number(rating) lacks bounds and NaN validation; in the same function that handles updating reviews (where review.rating is set), parse and validate rating before assigning: convert to Number, check that it's a finite number between 1 and 5 inclusive (reject or respond with a 400 error if not), and only then set review.rating; reference the review.rating assignment and the surrounding update handler so the validation mirrors the createReview bounds check.

-

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/components/dashboard/AdminDashboard.jsx around lines 138 - 144, Import the missing PremiumButton component at the top of the file and stop applying the 'animate-spin' class directly to its className; instead, wire up the component's loading API so only the RefreshCw icon spins when isLoading is true. Concretely: add an import for PremiumButton, pass isLoading (or loading) to the PremiumButton (instead of using className to toggle 'animate-spin') so PremiumButton can render the RefreshCw icon with the spin class internally (or update PremiumButton to accept a loading/iconLoading prop and apply 'animate-spin' to the icon element).

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/BlogManagement/BlogManagement.jsx around lines 32 - 34, The header currently contains only a placeholder comment in the BlogManagement component, so replace the placeholder in the top <div> inside BlogManagement.jsx with a clear, accessible page header (e.g., an <h1> or your app's Typography/Heading component) and a short descriptive subtitle or paragraph that explains the page purpose (manage blog posts, drafts, categories). Ensure the heading is semantic and unique on the page and include any contextual UI elements you use elsewhere (breadcrumbs or action buttons) so users immediately understand they’re on the Blog Management page.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/BlogManagement/BlogManagement.jsx around lines 24 - 27, The searchTerm state is set but never used (leftover from a refactor) so restore filtering or remove the state; add a derived filtered list (e.g., filteredPosts) that uses searchTerm to filter the results returned by useGetAdminBlogPostsQuery (match against title/body/author as appropriate), and use that filteredPosts in the component's render instead of the raw data; alternatively, if you intentionally removed search, delete the searchTerm and its input to avoid unused state; locate references to searchTerm, setSearchTerm, and useGetAdminBlogPostsQuery in BlogManagement.jsx to implement the fix.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/BlogManagement/BlogManagement.jsx around lines 19 - 21, Module-level hardcoded arrays posts and filteredPosts prevent real data from being used; replace them so the component consumes the API result from useGetAdminBlogPostsQuery() (the hook called in BlogManagement.jsx) — derive posts from the hook’s data (or set it into local state via useState/useEffect) and compute filteredPosts from that posts array and the search/filter inputs (preferably via useMemo) so stats (Total/Live/Drafts) and the table reflect actual counts and search results; update any references to posts/filteredPosts in render and handlers to use the new derived/state variables.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/CustomerDetail.jsx around lines 92 - 95, The PremiumButton with label "Edit Profile" currently has an empty onClick (() => {}) which makes it non-functional; either replace the no-op with the real handler or, if the feature is not ready, make the intent explicit: verify that PremiumButton supports a disabled prop and add disabled={true} (and optionally a tooltip/fade) or remove the button; if keeping a placeholder, add a TODO comment above the PremiumButton referencing the pending handler (e.g., TODO: implement editProfileHandler) so future work is tracked.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Orders.jsx around lines 185 - 195, The Status dropdown is rendered directly inside the table row, producing invalid HTML; wrap the PremiumDropdown in a table cell element by placing it inside a <td> so the table structure stays valid. Locate the PremiumDropdown usage (props: value={order.status}, onChange={(newStatus) => handleStatusChange(order._id, newStatus)}, disabled={isUpdating}, options derived from STATUS_OPTIONS and styled via buttonClassName using STATUS_COLORS) and move that JSX into a <td> that preserves any className ("w-32") and styling so behavior and appearance remain unchanged.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Settings.jsx around lines 1 - 11, The file is missing the Loader2 icon import used when isUpdating is true; add Loader2 to the named imports from 'lucide-react' alongside Briefcase, Globe, Percent, Save, Settings (SettingsIcon), and ShoppingCart so the component can render the loading icon without a ReferenceError (update the import statement that currently declares those icons).

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/components/ProductForm.jsx around lines 1038 - 1043, The PremiumButton uses an icon prop referencing Save (and Loader) but Save is not imported from lucide-react, causing a runtime ReferenceError; open the imports at the top of ProductForm.jsx and add Save to the lucide-react import list (alongside Loader if already imported) so that the Save symbol used in the PremiumButton icon prop is defined.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/components/ServiceForm.jsx around lines 774 - 779, The Save icon is referenced in the ServiceForm component's PremiumButton props (used with isLoading/isUploading/initialData) but not imported, causing a runtime ReferenceError; add Save to the existing lucide-react import alongside Loader (or create a named import from 'lucide-react') so the Save symbol is defined when isLoading is false and the PremiumButton renders its icon prop.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Notifications/AdminNotifications.jsx around lines 159 - 165, The PremiumButton is receiving className={isFetching ? 'animate-spin' : ''} which spins the whole button (label + icon); change the call to only animate the icon by either passing a loading/iconClassName prop to PremiumButton (e.g., iconClassName={isFetching ? 'animate-spin' : ''} or loading={isFetching}) or, if PremiumButton lacks such props, update the component to accept and apply an iconClassName/loading prop and use that to add 'animate-spin' to the icon element (keep refetch, isFetching, RefreshCw as-is).

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/ProjectsManagement/ProjectsManagement.jsx at line 34, The header div in the ProjectsManagement component was left empty (placeholder `{/* ... */}`); restore the original header text by replacing the placeholder with the appropriate title and description elements (e.g., a heading and a subtitle) inside the header container so the UI shows the page title and short description; update the ProjectsManagement component's header area to include the title (e.g., an <h1> or Typography component) and a descriptive paragraph or subtitle component to match the app's design system.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/ProjectsManagement/ProjectsManagement.jsx at line 28, The placeholder comment "// ... existing code ..." in ProjectsManagement.jsx indicates either leftover scaffolding or missing implementation inside the ProjectsManagement component; remove the placeholder comment if no logic was intentionally removed, or restore the original component logic (handlers, state hooks, render markup) that was present before removal—look for the ProjectsManagement component definition and any related functions (e.g., useState/useEffect hooks, fetchProjects, renderProjectList or onDeleteProject handlers) and reintroduce or replace them so the component is complete and contains the expected behavior instead of the placeholder.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/ProjectsManagement/ProjectsManagement.jsx at line 17, The fetch result from useGetAdminProjectsQuery() is ignored: instead of rendering the hardcoded empty arrays, consume the returned data (e.g., the destructured data from useGetAdminProjectsQuery) in the ProjectsManagement component and pass it into whatever table/list is being rendered; replace the hardcoded [] values with data (or data.projects / data.items depending on the API shape) using safe checks (optional chaining or null coalescing) and keep using isLoading to show the skeleton until data is available; update references to useGetAdminProjectsQuery, data, and isLoading so the component renders real project rows when data exists.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/ProjectsManagement/ProjectsManagement.jsx around lines 36 - 42, The statsCount is using the hardcoded empty array named projects so it will always be 0; locate the hardcoded projects array in ProjectsManagement.jsx and replace its use with the real projects collection (e.g., the state or prop that holds fetched projects such as projectsState, fetchedProjects, or props.projects), then pass statsCount={yourRealProjectsArray.length} to PremiumButton (keep the PremiumButton call and props the same, only change the expression for statsCount to reference the actual data source).

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/ProjectsManagement/ProjectsManagement.jsx around lines 21 - 22, The module-level constants projects and filteredProjects are preventing the component from using API data from useGetAdminProjectsQuery; remove those hardcoded arrays and inside the ProjectsManagement component derive projects from the hook's data (e.g. const { data } = useGetAdminProjectsQuery(); const projects = data ?? []) and compute filteredProjects from that projects array using the existing search/filter state (e.g. filter by searchTerm or selected status). Ensure projects and filteredProjects are local to the component (not top-level constants) so the rendered list reflects the fetched data and search input.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Settings/Settings.jsx around lines 712 - 717, The form's submit handler onSubmitSite is being invoked twice because the form element already uses onSubmit={onSubmitSite} while the <PremiumButton> has both type="submit" and onClick={onSubmitSite}; remove the redundant onClick from the PremiumButton (leave type="submit") so the form's onSubmit calls onSubmitSite exactly once, or alternatively change the button to type="button" and keep onClick if you prefer click-only handling—update the PremiumButton usage accordingly to eliminate duplicate API calls and toasts.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/SkillsManagement/SkillsManagement.jsx around lines 183 - 188, The Loader icon passed into PremiumButton when isCreating is true may not animate because lucide-react icons are static by default; check the PremiumButton component to confirm it applies a spin/animation class or a loading prop, and if it does not, update the usage or component: either pass an animated spinner component or add a loading prop/extra className to PremiumButton so the Loader icon (or replacement spinner) is rendered with a CSS animation during the save state; locate references to PremiumButton, Loader, Save and isCreating to implement this change.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/MarketPlace/pages/Checkout/Checkout.jsx around lines 109 - 118, The computed total can become negative when discountAmount > totalWithSurcharge; update the calculation in Checkout.jsx (references: discountAmount, totalWithSurcharge, total) to clamp the final value to zero or reduce discount to at most the subtotal (e.g., compute total as the non-negative result of totalWithSurcharge minus discountAmount or cap discountAmount to totalWithSurcharge) so the returned total is never negative.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/index.css around lines 106 - 114, Add a keyboard focus style for .btn-realism by implementing a .btn-realism:focus-visible rule that provides clear visual feedback (e.g., outline, box-shadow or border contrast) consistent with the existing hover/active states; ensure the focus style is visible without disrupting layout and matches the color/contrast scheme used in .btn-realism:hover and .btn-realism:active so keyboard users can identify focus.

- Verify each finding against the current code and only fix it if needed.

In @MARKETPLACE_IMPLEMENTATION_GUIDE.md around lines 566 - 580, The orderSchema's user field is documented as nullable for guest orders but isn't explicitly marked optional; update the user field definition inside orderSchema to include required: false (and optionally default: null) so the schema clearly allows null/absent users for guestCheckout orders and avoid confusion when validating or reading the User ref.

- Verify each finding against the current code and only fix it if needed.

In @MARKETPLACE_IMPLEMENTATION_GUIDE.md around lines 352 - 380, The addToWishlist handler uses req.body.type without validation which can lead to undefined favoriteArray; validate that type is present and is either 'product' or 'service' before computing favoriteArray, and return a 400 response if invalid. In the addToWishlist function check req.body.type === 'product' || 'service' (explicitly compare both values), and only then set favoriteArray to user.favorites.products or user.favorites.services; otherwise respond with res.status(400).json({ message: 'Invalid type' }). Ensure the validation occurs before accessing user.favorites and before calling favoriteArray.includes/push.

- Verify each finding against the current code and only fix it if needed.

In @MARKETPLACE_IMPLEMENTATION_GUIDE.md around lines 164 - 210, The validateCoupon handler currently reads userId from req.body which allows impersonation; remove extraction of userId from req.body and instead derive it from the authenticated request (use const userId = req.user?.id || null) before calling coupon.isValid(userId, orderTotal), ensuring guest users pass null; update any references to userId in validateCoupon and rely on existing auth middleware to populate req.user (or add a guard) so you never trust a client-supplied userId.

- Verify each finding against the current code and only fix it if needed.

In @MARKETPLACE_IMPLEMENTATION_GUIDE.md around lines 110 - 140, The couponSchema.methods.isValid currently assumes userId is always present when computing userUsageCount; update isValid to handle guest checkouts by skipping or short-circuiting the "user usage limit" logic when userId is null/undefined (or an anonymous guest flag). Specifically, in the isValid function, guard the block that computes userUsageCount (and the subsequent comparison to maxUsesPerCustomer) with a check like if (!userId) { /* treat as guest: skip per-customer checks */ } or coerce safely using String(userId) only when userId exists; ensure you do not call toString() on undefined and that guests are allowed to proceed to the other validations (expiry, active, minOrderAmount, maxUses) unchanged.

- Verify each finding against the current code and only fix it if needed.

In @MARKETPLACE_IMPLEMENTATION_GUIDE.md around lines 263 - 277, The updateCoupon handler currently calls Coupon.findByIdAndUpdate(id, req.body, { new: true }) which bypasses Mongoose validators; modify update logic to run schema validation by either using findById + Object.assign(coupon, req.body) + coupon.save() or by adding Mongoose update options to findByIdAndUpdate: include runValidators: true and context: 'query' (keep new: true) and optionally whitelist allowed fields from req.body before updating to prevent unwanted properties; update the error/404 branches to work with the chosen approach in the updateCoupon function.

- Verify each finding against the current code and only fix it if needed.

In @MARKETPLACE_IMPLEMENTATION_GUIDE.md around lines 608 - 691, The generateInvoicePDF function currently accesses nested billing fields directly (order.billing.firstName, order.billing.lastName, order.billing.email, order.billing.phone, order.billing.address.street, order.billing.address.city, order.billing.address.state) which can throw if billing or address is null; update generateInvoicePDF to defensively check for order.billing and order.billing.address (use optional chaining or explicit null checks) and provide safe defaults (e.g., empty string or "N/A") before calling .text(); ensure you replace direct accesses in the billing block with these safe variables so PDF generation never crashes when billing/address is missing.

- Verify each finding against the current code and only fix it if needed.

In @MARKETPLACE_IMPLEMENTATION_GUIDE.md around lines 701 - 716, The route handler for router.get('/orders/:orderId/invoice') calls generateInvoicePDF without checking that the order belongs to the authenticated user; fetch the order (e.g., via your Order model or getOrderById function) using orderId, compare its owner field (order.userId / order.customerId) to req.user.id (and allow admin roles if applicable), and if the IDs don't match return 403 before calling generateInvoicePDF; place this ownership check immediately after extracting orderId and before invoking generateInvoicePDF and ensure error cases return proper 403/404 responses instead of generating the PDF.

- Verify each finding against the current code and only fix it if needed.

In @MARKETPLACE_INTEGRATION_GUIDE.md around lines 432 - 436, Sprint 1's 3-day timeline is unrealistic for completing "Wishlist (backend + frontend)", "Coupon System (backend + admin UI)", and "Invoice PDF Generation" plus full CRUD tests; update the plan by either extending Sprint 1 to 5 days or redistributing work across sprints (e.g., move Invoice PDF Generation or Coupon System UI to Sprint 2) and update the checklist under the "Sprint 1" heading so items reflect the chosen change (adjust the duration text and/or move the specific bullets for Wishlist, Coupon System, Invoice PDF Generation, and Tests into the appropriate sprints).

- Verify each finding against the current code and only fix it if needed.

In @MARKETPLACE_INTEGRATION_GUIDE.md around lines 217 - 223, Update the public coupon validation API specification for POST /api/v1/marketplace/coupons/validate to include explicit rate-limiting and abuse-mitigation rules: enforce a default rate limit of 10 requests per minute per IP, document progressive backoff behavior (e.g., increasing lockout windows or exponential delays on repeated failures), and require CAPTCHA verification after N consecutive failed validation attempts (define N). Add these controls to the endpoint description and cross-reference them in the security checklist so the implementation (rate limiter, backoff logic, CAPTCHA trigger) is clearly specified for backend and API gateway teams.

- Verify each finding against the current code and only fix it if needed.

In @MARKETPLACE_INTEGRATION_GUIDE.md around lines 343 - 348, Add an explicit "Verify order ownership" checklist item and implement a server-side check in the invoice download flow: ensure the invoice/order lookup (e.g., in the invoice download endpoint handler such as getInvoicePdf or serveInvoice) verifies the authenticated user's ID matches the order.ownerId before returning the PDF; extract this logic into a reusable helper like verifyOrderOwnership(userId, orderId) or middleware so the check is applied consistently alongside token/signature validation and rate limiting.

- Verify each finding against the current code and only fix it if needed.

In @backend/src/controllers/couponController.js around lines 11 - 21, In validateCoupon, stop trusting userId from req.body for this public endpoint: either remove passing userId into coupon.isValid (so validation is user-agnostic) or require authentication and use req.user.id instead; update the call sites that pass the userId to coupon.isValid to use the chosen approach (refer to validateCoupon and coupon.isValid). Also add strict validation for orderTotal in validateCoupon to ensure it's a number greater than zero (reject negatives/NaN) before proceeding. Ensure error responses reflect these validation failures.

- Verify each finding against the current code and only fix it if needed.

In @backend/src/controllers/couponController.js around lines 321 - 329, The aggregation's totalRevenueSaved uses a nested $sum that incorrectly sums arrays; replace it so each document's usedByUsers.discountApplied values are reduced to a scalar before grouping. Update the totalUsage group expression (totalRevenueSaved) to either 1) compute a per-document scalar (e.g., add a $project/$addFields field like revenueSaved: { $sum: "$usedByUsers.discountApplied" } and then use totalRevenueSaved: { $sum: "$revenueSaved" } in the $group) or 2) inline a $reduce inside the $group: totalRevenueSaved: { $sum: { $reduce: { input: "$usedByUsers", initialValue: 0, in: { $add: ["$$value", "$$this.discountApplied"] } } } } so usedByUsers.discountApplied is summed correctly.

- Verify each finding against the current code and only fix it if needed.

In @backend/src/controllers/couponController.js around lines 126 - 131, Add validation for fixed discounts alongside the existing percentage check: when discountType === 'fixed' ensure discountValue is a number and discountValue >= 0, and return res.status(400).json({ message: 'Fixed discount must be non-negative' }) on failure; update the validation block that references discountType and discountValue in couponController (the same area as the percentage check) so negative fixed values are rejected.

- Verify each finding against the current code and only fix it if needed.

In @backend/src/controllers/couponController.js around lines 133 - 141, The controller creates a new Coupon using a spread of `...rest` from `req.body`, which introduces a mass-assignment vulnerability; replace the spread with an explicit whitelist of allowed fields (e.g., only include fields such as `description`, `maxUses`, `applicableProducts`, etc.) when constructing the `Coupon` instance so internal fields like `usedCount`, `usedByUsers`, `createdAt`, or `createdBy` cannot be set by clients; update the `new Coupon({...})` call (the block where `code`, `discountType`, `discountValue`, `validFrom`, `validUntil`, `createdBy` are set) to only assign properties from validated/whitelisted keys extracted from `req.body` instead of `rest`.

- Verify each finding against the current code and only fix it if needed.

In @backend/src/controllers/couponController.js around lines 176 - 178, The pagination variables page and limit in the coupon listing logic are parsed without validation (pageNum, limitNum, skip), which lets NaN or non-positive values slip into the query; validate and normalize them after parsing: parse page and limit into integers, if parseInt yields NaN or values < 1 set sensible defaults (e.g., pageNum = 1, limitNum = 10), ensure limitNum is capped if needed, then compute skip = (pageNum - 1) * limitNum (guaranteed >= 0). Update the logic in the couponController listing function where page, limit, pageNum, limitNum, and skip are defined to enforce these guards and use the normalized variables in the query.

- Verify each finding against the current code and only fix it if needed.

In @backend/src/controllers/couponController.js around lines 243 - 250, The date-range check in the update path currently only runs when both updates.validFrom and updates.validUntil are provided; update the logic in the coupon update handler (the function containing the updates variable in couponController.js) to handle partial updates by loading the existing coupon's validFrom/validUntil when only one side is present and then validate: if updates.validUntil is provided compare it to either updates.validFrom or the existing validFrom, and if updates.validFrom is provided compare it to either updates.validUntil or the existing validUntil, returning the same 400 response when the resulting range is invalid.

- Verify each finding against the current code and only fix it if needed.

In @backend/src/controllers/couponController.js around lines 252 - 256, The update call currently spreads client-provided updates into Coupon.findByIdAndUpdate which allows mass assignment; restrict this by whitelisting allowed update fields (e.g., only permit public fields like code, discount, expiresAt, active, maxUses) and explicitly build an updates object from the incoming `updates` payload before passing it to Coupon.findByIdAndUpdate (do not spread the raw `updates`); update the controller function that calls Coupon.findByIdAndUpdate (look for the variable `updates` and the call `Coupon.findByIdAndUpdate(id, { ...updates, updatedAt: Date.now() }, ...)`) to pick only allowed keys, ignore or reject protected fields such as usedCount, usedByUsers, createdBy, createdAt, etc., and keep runValidators: true and updatedAt assignment.

- Verify each finding against the current code and only fix it if needed.

In @backend/src/controllers/couponController.js around lines 169 - 174, The code builds Mongo $regex queries directly from the user-provided search string (variable "search") inside the query.$or block, creating a ReDoS risk; fix by escaping regex metacharacters and limiting input length before constructing the regex: add a helper like escapeRegex and use it when building the patterns for code and description (i.e., replace using raw search in the $regex with escapedSearch and a capped length), or alternatively switch to a safe exact/substring search (e.g., use indexable $regex anchored or Mongo text indexes) in the function that assembles query.$or to prevent untrusted regexes from being executed.

- Verify each finding against the current code and only fix it if needed.

In @backend/src/models/Coupon.js around lines 83 - 90, The embedded usedByUsers array on the Coupon model can grow unbounded and should be moved to a separate collection; create a new CouponUsage mongoose model (e.g., CouponUsage schema with fields couponId (ref 'Coupon', indexed), userId, orderId, usedAt, discountApplied and an index on {couponId:1, userId:1}) and remove or stop appending to usedByUsers on the Coupon document; update any code that reads or filters usage (notably the Coupon.isValid() method) to query CouponUsage (e.g., count or find for couponId/userId) instead of filtering the usedByUsers array so coupon documents remain small and queries remain efficient.

- Verify each finding against the current code and only fix it if needed.

In @backend/src/models/Coupon.js around lines 170 - 179, The current couponSchema.methods.markAsUsed is non-atomic and combined with isValid can allow over-usage under concurrent requests; change the flow to perform an atomic update (use Coupon.findOneAndUpdate) with the validation conditions included (isActive, validFrom/validUntil, and checks for maxUses and maxUsesPerCustomer) and the update performing $inc on usedCount and $push to usedByUsers in a single operation (or implement optimistic concurrency via the document version key and a conditional update using the current version); update callers to use this atomic function (or replace markAsUsed with a static method that runs findOneAndUpdate) so the increment and push only succeed when limits are not exceeded.

- Verify each finding against the current code and only fix it if needed.

In @backend/src/models/Coupon.js around lines 181 - 194, In couponSchema.pre('save', function(next) { ... }) the handler calls next(new Error(...)) on validation failures but doesn't return, so execution falls through and calls next() again; update the pre-save middleware in Coupon.js (the couponSchema.pre('save'...) function) to immediately return after calling next(error) for each failing check (or restructure with if/else) so next() is only invoked once when validation passes.

- Verify each finding against the current code and only fix it if needed.

In @backend/src/models/Coupon.js around lines 120 - 123, The current combined check using this.validUntil and this.validFrom returns "Coupon has expired" even when now < this.validFrom; update the conditionals so they are separate: first check if now > this.validUntil and return { valid: false, reason: 'Coupon has expired' }, then check if now < this.validFrom and return { valid: false, reason: 'Coupon is not yet valid' } (locate the logic using this.validUntil and this.validFrom in the validation method in Coupon.js and adjust the messages accordingly).

- Verify each finding against the current code and only fix it if needed.

In @backend/src/models/Coupon.js around lines 101 - 108, The createdAt and updatedAt fields defined with default: Date.now only set on creation and updatedAt won't auto-update; remove these manual fields from the Coupon schema and enable Mongoose's timestamps option when constructing the schema (or add timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } if you need those exact names) so Mongoose automatically manages createdAt and updatedAt for the Coupon model.

- Verify each finding against the current code and only fix it if needed.

In @backend/src/routes/couponRoutes.js around lines 12 - 16, Protect public coupon endpoints: require authentication or filter sensitive data for the active coupons route and add rate limiting to coupon validation. Update the router.get('/active', couponController.getActiveCoupons) registration to enforce auth middleware (or modify getActiveCoupons to exclude campaign-specific/one-time codes) and ensure the router.post('/validate', couponController.validateCoupon) uses a rate-limiting middleware (e.g., existing rateLimiter or express-rate-limit) to throttle requests and prevent brute-force attempts; reference the route handlers couponController.getActiveCoupons and couponController.validateCoupon when making these changes.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/common/components/PremiumButton.jsx at line 17, The className in PremiumButton.jsx mixes conflicting Tailwind transition utilities (transition-transform and transition-colors) and is very long/hard to maintain; update the button's className string used in the PremiumButton component to use a single transition utility (e.g., replace with transition-all or a specific combined list like transition-transform transition-colors removed in favor of transition-all) and move the large concatenated string into a named constant (e.g., PREMIUM_BUTTON_CLASSES) and/or compose it with a small helper (clsx/cn) so className in the JSX references that constant for readability and maintainability.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/common/components/PremiumDropdown.jsx at line 14, selectedOption uses options.find(...) which will throw if options is null/undefined; update the component to default options to an empty array (either in props destructuring or at top) or replace usages with a safe access like (options || []).find(...) and likewise guard the rendering map (e.g., (options || []).map(...) or options?.map(...)) so both selectedOption and the dropdown list handle undefined/null options safely; adjust the symbols selectedOption and any map call that renders option items.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/common/components/PremiumDropdown.jsx around lines 49 - 51, The onClick handler in the option rendering calls onChange(opt.value) unguarded which will throw if onChange is undefined; update the PremiumDropdown component to either provide a default no-op for onChange in the component props destructuring (e.g., onChange = () => {}) or add a defensive check before calling inside the onClick (e.g., if (typeof onChange === 'function') onChange(opt.value)); keep the setIsOpen(false) behavior unchanged.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/common/components/PremiumDropdown.jsx around lines 18 - 25, The button in PremiumDropdown.jsx currently strips focus styles and lacks ARIA attributes; restore an accessible focus ring (remove or replace `focus:ring-0 outline-none` with a visible focus utility/class so keyboard users see focus) and add proper ARIA for the dropdown (e.g., include aria-expanded={isOpen} and aria-haspopup="listbox" and aria-controls pointing to the dropdown list id) while keeping the existing onClick handler (setIsOpen) and visual rotation on ChevronDown; ensure the target list element uses the matching id and appropriate role (listbox/menu) for screen readers.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Coupons/CouponForm.jsx around lines 110 - 114, When updating state in the setFormData handler, avoid storing NaN for cleared number inputs: change the number branch that currently does parseFloat(value) to check for an empty string first and store a sensible empty value (e.g., '' or null) instead of NaN; for example in the setFormData callback (the code using name, type, value, checked) use type === 'number' ? (value === '' ? '' : parseFloat(value)) so clearing a numeric field doesn't write NaN into state.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Coupons/CouponForm.jsx at line 147, The onSuccess call in CouponForm.jsx is invoked unguarded and will throw if the parent didn't pass it; update the submission success path (where onSuccess() is currently called) to check that onSuccess exists and is a function before calling it (e.g., guard with a typeof check or optional chaining) so that CouponForm safely handles missing callbacks.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Coupons/CouponForm.jsx at line 156, The div contains an invalid Tailwind class token "p-6 or p-8" which will be ignored; open the CouponForm component and replace that token with a valid Tailwind class (e.g., choose a single padding class like "p-6" or use a responsive/conditional class such as "p-6 md:p-8" or apply a conditional class via a template string/clsx in the JSX) so the container has a valid padding rule; look for the div with className containing "bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm p-6 or p-8 relative z-0" and correct the padding portion only.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Coupons/CouponForm.jsx around lines 61 - 62, The code maps coupon.applicableProductIds and coupon.applicableServiceIds but applies the || [] fallback after .map(), which will throw if those arrays are null/undefined; update the expressions used where applicableProductIds and applicableServiceIds are built (the mapping of coupon.applicableProductIds and coupon.applicableServiceIds in CouponForm.jsx) to ensure a safe default before mapping—e.g. use a pre-check or default like (coupon.applicableProductIds || []) or optional chaining with nullish coalescing so the .map() always runs on an array and then extract id._id as before.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Coupons/CouponStats.jsx around lines 144 - 148, The "Performance" widget in CouponStats.jsx currently uses hardcoded text ("Growth Active") and a fixed progress bar width class (w-3/4); update the component to be data-driven by accepting a performance label and numeric value (e.g., performanceLabel and performancePercent) and render the label instead of "Growth Active" and set the progress width dynamically (use inline style width: `${performancePercent}%` or compute a responsive class) so the bar reflects real data, or alternatively remove the block or add a clear placeholder badge/notice (e.g., "(placeholder)") if it is decorative; locate the JSX snippet with the "Growth Active" string and the inner div with class w-3/4 to apply the change.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjectFiles.jsx around lines 178 - 180, The UI text in AdminProjectFiles.jsx is misleading because it mentions "Drag & drop" but no drag/drop handlers exist; fix by either (A) updating the paragraph that uses isUploading to remove "Drag & drop" and use wording like "Click to browse or select files" (edit the <p> that currently renders the isUploading ternary), or (B) implement drag/drop support by adding onDragOver/onDragEnter/onDrop handlers on the upload container (add handlers such as handleDragOver and handleDrop and attach them to the upload area div, and ensure handleDrop calls the existing file upload logic used by the click/browse flow). Ensure the chosen fix updates the text/handlers in AdminProjectFiles.jsx and references the isUploading state and the upload container div or handler names (handleDrop/handleDragOver) so reviewers can find the change.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjectFiles.jsx around lines 106 - 149, The handler handleFileUpload currently uploads whatever the user selects despite the UI saying "Max 50MB"; add client-side size validation before creating FormData by checking each file.size <= 50 * 1024 * 1024, reject or skip oversized files, and show a toast.error listing offending filenames (and do not call uploadFiles for them). If you choose to skip oversized files, only append valid files to formData and if none remain, reset fileInputRef.current.value and setIsUploading(false) without calling addMessage; keep existing flows for uploadFiles, addMessage, and state updates (setIsUploading).

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjectFiles.jsx around lines 67 - 68, The comment is wrong: reverse() only flips array order, it doesn't sort by date; change the logic where the component returns "files" (variable files in AdminProjectFiles.jsx) to sort by a numeric timestamp field (e.g., rawDate) instead of using files.reverse(); ensure each file object includes a rawDate (timestamp) and replace the reverse step with an Array.prototype.sort comparator that orders by rawDate descending (newest first) so the UI shows true date-based descending order while keeping the formatted date field for display.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjectFiles.jsx around lines 71 - 76, The formatFileSize function fails for negative values, fractions <1, and >=1TB; update formatFileSize to validate input (return 'N/A' for null/undefined and for negative bytes), handle bytes >0 but <1 by returning a small-bytes string (e.g., '<1 B'), extend the units array to include 'TB' (and more if desired), compute index i but clamp it between 0 and sizes.length-1 to avoid out-of-bounds, and format the value using that safe index so sizes[i] is always defined.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjectMessages.jsx around lines 1 - 5, The component references the icon MessageSquare but it wasn't imported from lucide-react; update the import line that currently imports Loader2, Send, User, UserCheck from 'lucide-react' to also include MessageSquare so the symbol MessageSquare used around line 71 is defined and prevents a runtime ReferenceError when rendering the empty state.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjectMessages.jsx around lines 99 - 102, The timestamp renders without a space after the bullet because the JSX concatenates "•" and the time directly; update the JSX in AdminProjectMessages.jsx (around the span that uses isAdmin, msg.sender?.name, and msg.timestamp) to include a space after the bullet (e.g., " • " instead of "•") so the display becomes "Admin (You) • 10:30 AM" or "Client • 10:30 AM".

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjectMessages.jsx around lines 42 - 50, The component currently only checks isLoading but not isError from useGetAdminOrderByIdQuery, so add an error-state branch immediately after the isLoading check to handle failed queries (use the existing useGetAdminOrderByIdQuery return values: isError and error). Render a similar centered panel (matching the Loader container styles) that displays a clear error message (e.g., "Failed to load messages. Please try again.") and, optionally, include error?.message for more detail; update the render flow that references messages (const messages = data?.order?.communication?.messages || []) so it only runs when not loading and not errored (keep function/component names unchanged).

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjectMessages.jsx around lines 38 - 40, The effect currently watching data?.order?.communication?.messages causes scrollToBottom to run on every poll because that array reference changes; modify the effect (useEffect that calls scrollToBottom) to depend on a stable signal such as messages.length or the last message id instead of the messages array itself (e.g., derive const lastMessageId = messages?.[messages.length-1]?.id or const messageCount = messages?.length and use that in the dependency list), and store the previous value with a ref to only call scrollToBottom when the count/lastMessageId increases (new message arrived) so users who scroll up aren’t forced to the bottom on every poll; update references to useEffect, scrollToBottom, and data?.order?.communication?.messages accordingly.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjectTimeline.jsx around lines 88 - 129, The motion.form is using an invalid animatable property `mb` and is not wrapped in AnimatePresence, so update the animation props on the element rendered when isAdding is true (the motion.form used in the isAdding conditional that calls handleAddMilestone) to replace `mb` with a valid CSS property like `marginBottom` (or remove margin animation and rely on Tailwind spacing on a wrapper), and ensure the conditional element is wrapped by framer-motion's <AnimatePresence> (import AnimatePresence from 'framer-motion') around the block that renders the motion.form so the exit animation runs; keep the form internals (STATUS_OPTIONS mapping, newStatus/newMessage, PremiumButton and isSubmitting) unchanged.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjectWorkspace.jsx around lines 151 - 153, The current display uses order.status?.replace('_', ' ') which only replaces the first underscore; update the formatting call on order.status (the span rendering in AdminProjectWorkspace.jsx that uses STATUS_COLORS[order.status]) to replace all underscores (e.g., use replaceAll('_', ' ') or replace(/_/g, ' ')) so multi-underscore statuses like payment_in_progress render correctly.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjectWorkspace.jsx around lines 92 - 98, formatCurrency can throw a RangeError for invalid currency codes; update the function (formatCurrency) to defensively validate or sanitize the currency argument (e.g. ensure it's a 3-letter ISO uppercase code like /^[A-Z]{3}$/) and/or wrap the Intl.NumberFormat call in a try/catch that falls back to a safe default currency (e.g. 'INR') and returns a formatted or numeric fallback (amount || 0) if formatting fails; ensure the change only affects formatCurrency so callers like order.payment?.amount?.currency are protected.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjectWorkspace.jsx around lines 254 - 258, formatDate returns "N/A" for falsy inputs, so the current fallback using || 'TBD' never runs; update the display logic in AdminProjectWorkspace.jsx (the Est. Delivery span that renders {formatDate(order.estimatedDelivery) || 'TBD'}) to explicitly show 'TBD' when order.estimatedDelivery is falsy or when formatDate(order.estimatedDelivery) === 'N/A', otherwise render the formatted date; reference formatDate and the Est. Delivery span to locate the change.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjects.jsx around lines 193 - 195, The Filter button in AdminProjects.jsx is non-functional because it lacks an onClick handler; either remove the button or implement a handler such as toggleFilters to open the filter UI: add component state (e.g., const [showFilters, setShowFilters] = useState(false)) and a function toggleFilters() { setShowFilters(s => !s) }, wire that function to the button's onClick (onClick={toggleFilters}), and ensure the filter panel/modal component (or conditional JSX) is rendered when showFilters is true so the button actually opens/closes the filter UI; alternatively remove the button and any unused Filter import if you decide not to support filtering.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjects.jsx around lines 226 - 228, The current projects.map callback can throw when project.items exists but is an empty array because it uses project.items[0] as a fallback; change the logic in the projects.map block (where serviceItem is computed) to defensively handle empty arrays by using optional chaining and a nullish/fallback check (e.g., use project.items?.find(...) ?? project.items?.[0] ?? null or check project.items.length before indexing) so serviceItem is safely set to undefined/null when no items exist; ensure downstream code that uses serviceItem (and calculateProgress(project)) can handle a null/undefined value.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/AdminPanel/pages/Marketplace/Projects/AdminProjects.jsx around lines 116 - 126, The search input currently updates searchTerm on every keystroke and passes it directly to useGetAdminOrdersQuery (causing excessive API calls); introduce a debounced value (e.g., debouncedSearchTerm) that updates from searchTerm using a useEffect with setTimeout and clearTimeout (or a useDebounce hook) and pass debouncedSearchTerm to useGetAdminOrdersQuery instead of searchTerm, keeping existing page/limit/status props and ensuring you clean up the timer on unmount or when searchTerm changes.

- Verify each finding against the current code and only fix it if needed.

In @frontend/src/apps/MarketPlace/pages/Checkout/CouponInput.jsx around lines 90 - 99, The component is referencing an undefined variable validateMutation (used as validateMutation.isPending) while the mutation hook actually exposes isValidating; update all occurrences of validateMutation.isPending (in the input disabled prop and the submit button disabled/conditional render) to use isValidating instead, or alternatively rename the hook's destructured value to validateMutation to match the existing references—ensure consistency between the mutation hook return (isValidating) and the places using validateMutation.isPending (or adjust those callers to use isValidating).
