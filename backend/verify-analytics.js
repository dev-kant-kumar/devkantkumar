const mongoose = require('mongoose');
require('dotenv').config();
const Visit = require('./src/models/Visit');
const Project = require('./src/models/Project');
const BlogPost = require('./src/models/BlogPost');
const Order = require('./src/models/Order');

async function verify() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // 1. Simulate a visit
    const visit = await Visit.create({
      path: '/test-verification-' + Date.now(),
      userAgent: 'Verification Script',
      ip: '127.0.0.1'
    });
    console.log('✅ Visit recorded:', visit._id);

    // 2. Check counts
    const totalVisits = await Visit.countDocuments();
    const projectCount = await Project.countDocuments();
    const blogCount = await BlogPost.countDocuments();
    const orderCount = await Order.countDocuments();

    console.log('--- Stats Summary ---');
    console.log('Total Visits:', totalVisits);
    console.log('Total Projects:', projectCount);
    console.log('Total Blogs:', blogCount);
    console.log('Total Orders:', orderCount);

    // 3. Verify Trend Logic (Just check aggregation doesn't crash)
    const thirtyDaysAgo = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000));
    const recentActivity = await Visit.aggregate([
      { $match: { timestamp: { $gte: thirtyDaysAgo } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }, count: { $sum: 1 } } }
    ]);
    console.log('✅ Aggregation successful, days tracked:', recentActivity.length);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
}

verify();
