// Order statuses that represent a successfully paid/active order.
// "pending", "cancelled", and "refunded" are excluded because payment
// is either not yet captured or has been reversed.
const PAID_STATUSES = [
  "confirmed",
  "awaiting_requirements",
  "in_progress",
  "revising",
  "delivered",
  "completed",
];

module.exports = { PAID_STATUSES };
