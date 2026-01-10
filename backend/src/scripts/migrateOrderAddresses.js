/**
 * Migration Script: Sync Billing Addresses from Orders to User Profiles
 *
 * This script extracts billing addresses from completed orders and adds them
 * to the corresponding user's address book if not already present.
 *
 * Run: node src/scripts/migrateOrderAddresses.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const migrateAddresses = async () => {
  console.log('\n📦 Starting address migration...\n');

  // Find all orders with completed payment
  const orders = await Order.find({
    'payment.status': 'completed',
    'billing.address': { $exists: true }
  }).populate('user', 'addresses');

  console.log(`Found ${orders.length} orders with billing addresses to process\n`);

  let migratedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const order of orders) {
    try {
      const userId = order.user?._id || order.user;
      if (!userId) {
        console.log(`⚠️  Order ${order.orderNumber}: No user ID found, skipping`);
        skippedCount++;
        continue;
      }

      const billingAddr = order.billing?.address;
      if (!billingAddr || !billingAddr.street || !billingAddr.city) {
        console.log(`⚠️  Order ${order.orderNumber}: Incomplete address, skipping`);
        skippedCount++;
        continue;
      }

      // Fetch fresh user data
      const user = await User.findById(userId);
      if (!user) {
        console.log(`⚠️  Order ${order.orderNumber}: User not found, skipping`);
        skippedCount++;
        continue;
      }

      // Check if address already exists
      const addressExists = user.addresses?.some(addr =>
        addr.street === billingAddr.street &&
        addr.city === billingAddr.city &&
        addr.state === billingAddr.state &&
        addr.zipCode === billingAddr.zipCode &&
        addr.country === billingAddr.country
      );

      if (addressExists) {
        console.log(`⏭️  Order ${order.orderNumber}: Address already exists for user ${user.email}`);
        skippedCount++;
        continue;
      }

      // Add address to user's address book
      user.addresses = user.addresses || [];
      user.addresses.push({
        street: billingAddr.street,
        city: billingAddr.city,
        state: billingAddr.state,
        zipCode: billingAddr.zipCode,
        country: billingAddr.country,
        addressType: 'billing',
        isDefault: user.addresses.length === 0
      });

      await user.save();
      console.log(`✅ Order ${order.orderNumber}: Added address for ${user.email}`);
      migratedCount++;

    } catch (error) {
      console.error(`❌ Order ${order.orderNumber}: Error - ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n========================================');
  console.log('📊 MIGRATION SUMMARY');
  console.log('========================================');
  console.log(`✅ Migrated: ${migratedCount} addresses`);
  console.log(`⏭️  Skipped:  ${skippedCount} (already exist or incomplete)`);
  console.log(`❌ Errors:   ${errorCount}`);
  console.log(`📦 Total:    ${orders.length} orders processed`);
  console.log('========================================\n');
};

const run = async () => {
  await connectDB();
  await migrateAddresses();
  await mongoose.disconnect();
  console.log('🔌 Disconnected from MongoDB\n');
  process.exit(0);
};

run().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
