const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const User = require('../src/models/User');

const deleteTestUsers = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    // Count before
    const countBefore = await User.countDocuments();
    console.log(`Total users before: ${countBefore}`);

    // Delete test buyers
    const result = await User.deleteMany({
      email: { $regex: /testbuyer.*@example\.com/i }
    });
    console.log(`Deleted test users: ${result.deletedCount}`);

    // Count after
    const countAfter = await User.countDocuments();
    console.log(`Total users after: ${countAfter}`);

    console.log('SUCCESS: Test users deleted.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

deleteTestUsers();
