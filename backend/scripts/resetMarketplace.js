const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../src/db/connection');
const User = require('../src/models/User');
const Product = require('../src/models/Product');
const Service = require('../src/models/Service');
const Order = require('../src/models/Order');

const resetMarketplace = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected.');

    // Pre-check
    const orderCountBefore = await Order.countDocuments();
    console.log(`Orders before reset: ${orderCountBefore}`);

    // 1. Drop Collections
    const collections = ['orders', 'downloadlogs', 'quoterequests', 'transactions', 'reviews'];
    for (const name of collections) {
      try {
        await mongoose.connection.db.dropCollection(name);
        console.log(`Dropped collection: ${name}`);
      } catch (error) {
        if (error.code === 26) {
          console.log(`Collection ${name} does not exist, skipping.`);
        } else {
          console.error(`Error dropping ${name}:`, error.message);
        }
      }
    }

    // 2. Reset Users
    console.log('Resetting User stats...');
    const userRes = await User.updateMany({}, {
      $set: {
        'marketplace.totalOrders': 0,
        'marketplace.totalSpent': 0,
        'marketplace.reviews': [],
        'cart.items': []
      }
    });
    console.log(`Users updated: ${userRes.modifiedCount}`);

    // 3. Reset Products
    console.log('Resetting Product stats...');
    const prodRes = await Product.updateMany({}, {
      $set: {
        reviews: [],
        rating: { average: 0, count: 0 },
        downloads: 0,
        views: 0,
        likes: 0,
        'analytics.totalRevenue': 0,
        'analytics.totalSales': 0,
        'analytics.conversionRate': 0
      }
    });
    console.log(`Products updated: ${prodRes.modifiedCount}`);

    // 4. Reset Services
    console.log('Resetting Service stats...');
    const servRes = await Service.updateMany({}, {
      $set: {
        reviews: [],
        rating: { average: 0, count: 0 },
        totalOrders: 0,
        completedOrders: 0,
        views: 0,
        likes: 0,
        'analytics.totalRevenue': 0,
        'analytics.averageOrderValue': 0,
        'analytics.conversionRate': 0,
        'availability.currentMonthOrders': 0
      }
    });
    console.log(`Services updated: ${servRes.modifiedCount}`);

    // Verification
    const orderCountAfter = await Order.countDocuments();
    console.log(`Orders after reset: ${orderCountAfter}`);

    if (orderCountAfter === 0) {
      console.log('SUCCESS: Marketplace reset complete.');
    } else {
      console.error('WARNING: Orders still exist!');
    }

  } catch (error) {
    console.error('Reset Execution Failed:', error);
  } finally {
    console.log('Closing connection...');
    if (mongoose.connection) {
      await mongoose.connection.close();
    }
    process.exit(0);
  }
};

resetMarketplace();
