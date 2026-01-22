// Quick script to unlock a user account
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const unlockUser = async (email) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find and unlock the user
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log('❌ User not found with email:', email);
      process.exit(1);
    }

    console.log(`Found user: ${user.email}`);
    console.log(`Current lock status: ${user.isLocked ? 'LOCKED' : 'UNLOCKED'}`);
    console.log(`Login attempts: ${user.loginAttempts}`);

    if (user.lockUntil) {
      console.log(`Lock until: ${new Date(user.lockUntil)}`);
    }

    // Reset login attempts and unlock
    await user.updateOne({
      $unset: { loginAttempts: 1, lockUntil: 1 }
    });

    console.log('✅ Account unlocked successfully!');
    console.log('✅ Login attempts reset to 0');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.log('Usage: node unlockUser.js <email>');
  console.log('Example: node unlockUser.js eyemdev.in@gmail.com');
  process.exit(1);
}

unlockUser(email);
