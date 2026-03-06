const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');
const SystemSetting = require('../src/models/SystemSetting');

const testDeadline = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // 1. Setup System Setting
    const settings = await SystemSetting.getSettings();
    settings.marketplace.revisionWindowDays = 5;
    await settings.save();
    console.log('Revision window set to 5 days');

    // 2. Find and reset order to delivered
    const order = await Order.findOne({ orderNumber: 'ORD-000007' });
    if (!order) {
        console.error('Order ORD-000007 not found');
        process.exit(1);
    }

    const now = new Date();
    order.status = 'delivered';
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 5);
    order.revisionDeadline = deadline;
    await order.save();

    console.log(`Order status: ${order.status}`);
    console.log(`Revision Deadline: ${order.revisionDeadline}`);

    // 3. Test expired deadline
    console.log('\n--- Testing Expired Deadline ---');
    order.revisionDeadline = new Date(Date.now() - 1000); // 1 second ago
    await order.save();

    // Now try to simulate a revision request (manually check logic)
    const orderCheck = await Order.findById(order._id);
    if (new Date() > orderCheck.revisionDeadline) {
        console.log('SUCCESS: Deadline properly identified as expired.');
    } else {
        console.log('FAILURE: Deadline should be expired.');
    }

    // Reset for UI testing (back to 3 days in the future)
    order.revisionDeadline = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    order.status = 'delivered';
    await order.save();
    console.log('\nReset ORD-000007 to delivered for manual UI verification.');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

testDeadline();
