/**
 * Abandoned Cart Recovery Service
 *
 * Periodically scans for users who have items in their cart but have not
 * checked out.  An automated recovery email is sent 1 hour after the cart
 * was last updated, with a second follow-up email after 24 hours if the
 * cart is still not checked out.
 *
 * Design goals
 * ─────────────
 * - Non-blocking: errors are caught and logged, they never crash the server.
 * - Idempotent: we track sent reminders in the User document so the same
 *   user never gets the same reminder twice.
 * - Redis-gate: the job is only run on one server instance (via a short-TTL
 *   Redis lock) to avoid duplicate emails in a multi-instance deployment.
 */

const mongoose = require("mongoose");
const logger = require("../utils/logger");
const emailService = require("./emailService");

// ---------------------------------------------------------------------------
// Constants — all durations in milliseconds
// ---------------------------------------------------------------------------

/**
 * How long after a cart is updated before we send the first reminder.
 * Default: 1 hour.
 */
const FIRST_REMINDER_DELAY_MS = 60 * 60 * 1000;

/**
 * How long after the first reminder before we send the second (final) one.
 * Default: 23 hours (so total ≈ 24 h from abandon).
 */
const SECOND_REMINDER_DELAY_MS = 23 * 60 * 60 * 1000;

/**
 * How often the cron fires (every 15 minutes).
 */
const CHECK_INTERVAL_MS = 15 * 60 * 1000;

/**
 * Redis distributed lock TTL in seconds.  Must be ≤ CHECK_INTERVAL so only
 * one node runs the job per interval.
 */
const LOCK_TTL_SECONDS = 14 * 60;
const LOCK_KEY = "abandoned-cart-cron-lock";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Lazily load the User model to avoid circular-require issues at startup. */
function getUser() {
  return mongoose.model("User");
}

/** Lazily load the cache service (Redis). */
function getCache() {
  try {
    return require("./cacheService");
  } catch {
    return null;
  }
}

/**
 * Acquire a Redis lock so only one server process runs the cron job.
 * Returns true if the lock was acquired, false otherwise.
 */
async function acquireLock() {
  const cache = getCache();
  if (!cache) return true; // No Redis — allow single-node execution.
  try {
    const existing = await cache.get(LOCK_KEY);
    if (existing) return false;
    await cache.set(LOCK_KEY, "1", LOCK_TTL_SECONDS);
    return true;
  } catch (err) {
    logger.warn(`abandonedCartService: Redis lock error: ${err.message}`);
    return true; // Fall-through: allow execution when Redis is unavailable.
  }
}

/**
 * Build a plain-object representation of a cart item suitable for the email
 * template, from a populated User cart item.
 */
function cartItemToEmailItem(item) {
  const product = item.product || item.service;
  if (!product) return null;

  const title = product.title;
  const price =
    item.type === "service"
      ? product.packages?.find((p) => p.name === item.packageName)?.price ??
        product.packages?.[0]?.price ??
        0
      : product.price ?? 0;

  const imageUrl =
    product.images?.[0]?.url || product.image || null;

  return {
    title,
    imageUrl,
    price,
    currency: "INR",
    packageName: item.packageName || null,
  };
}

// ---------------------------------------------------------------------------
// Core job
// ---------------------------------------------------------------------------

async function runAbandonedCartJob() {
  if (!(await acquireLock())) {
    logger.debug("abandonedCartService: lock held by another instance, skipping");
    return;
  }

  try {
    const User = getUser();

    const now = Date.now();
    const firstReminderCutoff = new Date(now - FIRST_REMINDER_DELAY_MS);
    const secondReminderCutoff = new Date(now - SECOND_REMINDER_DELAY_MS);

    // Find users who:
    //  1. Have at least one item in their cart
    //  2. Have not had their cart updated in the past FIRST_REMINDER_DELAY_MS
    //  3. Are active and have email notifications enabled
    const candidates = await User.find({
      "cart.items.0": { $exists: true },
      "cart.updatedAt": { $lte: firstReminderCutoff },
      isActive: true,
      "preferences.notifications.email": { $ne: false },
    })
      .select(
        "email firstName cart preferences marketplace.abandonedCartRemindersSent",
      )
      .populate({
        path: "cart.items.product",
        select: "title price images category slug",
      })
      .populate({
        path: "cart.items.service",
        select: "title price image images category slug packages",
      })
      .lean();

    logger.info(
      `abandonedCartService: found ${candidates.length} candidate(s) with idle carts`,
    );

    let sent = 0;
    let skipped = 0;

    for (const user of candidates) {
      try {
        const remindersSent =
          user.marketplace?.abandonedCartRemindersSent || 0;
        const cartUpdatedAt = new Date(user.cart.updatedAt).getTime();

        // Determine which reminder to send (or skip if already sent both)
        const shouldSendFirst =
          remindersSent === 0 && cartUpdatedAt <= firstReminderCutoff.getTime();

        const shouldSendSecond =
          remindersSent === 1 &&
          cartUpdatedAt <= secondReminderCutoff.getTime();

        if (!shouldSendFirst && !shouldSendSecond) {
          skipped++;
          continue;
        }

        // Build email items
        const emailItems = user.cart.items
          .map(cartItemToEmailItem)
          .filter(Boolean);

        if (emailItems.length === 0) {
          skipped++;
          continue;
        }

        const firstName = user.firstName || "there";

        await emailService.sendAbandonedCartEmail(
          user.email,
          firstName,
          emailItems,
        );

        // Increment reminder counter so we don't send again
        await User.updateOne(
          { _id: user._id },
          {
            $inc: { "marketplace.abandonedCartRemindersSent": 1 },
          },
        );

        sent++;
        logger.info(
          `abandonedCartService: reminder #${remindersSent + 1} sent to ${user.email}`,
        );
      } catch (userErr) {
        logger.error(
          `abandonedCartService: failed for user ${user._id}: ${userErr.message}`,
        );
      }
    }

    logger.info(
      `abandonedCartService: job complete — sent=${sent}, skipped=${skipped}`,
    );
  } catch (err) {
    logger.error(`abandonedCartService: job error: ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

let _intervalHandle = null;

/**
 * Start the abandoned-cart cron.  Call once from index.js after DB/Redis are
 * ready.  Safe to call multiple times — subsequent calls are no-ops.
 */
function startAbandonedCartCron() {
  if (_intervalHandle) return;

  logger.info(
    `abandonedCartService: starting cron (interval ${CHECK_INTERVAL_MS / 60000} min)`,
  );

  // Run immediately once, then on the interval
  runAbandonedCartJob().catch(() => {});

  _intervalHandle = setInterval(() => {
    runAbandonedCartJob().catch(() => {});
  }, CHECK_INTERVAL_MS);

  // Allow the process to exit even if the interval is still active
  if (_intervalHandle.unref) _intervalHandle.unref();
}

/**
 * Stop the cron (used in tests or graceful shutdown).
 */
function stopAbandonedCartCron() {
  if (_intervalHandle) {
    clearInterval(_intervalHandle);
    _intervalHandle = null;
  }
}

module.exports = { startAbandonedCartCron, stopAbandonedCartCron, runAbandonedCartJob };
