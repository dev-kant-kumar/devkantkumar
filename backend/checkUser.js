// Script to check user account and optionally reset password
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const bcrypt = require('bcryptjs');

const checkAndResetPassword = async (email, newPassword) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find the user with password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      console.log('❌ User not found with email:', email);
      process.exit(1);
    }

    console.log('\n📋 User Account Details:');
    console.log('========================');
    console.log(`Email: ${user.email}`);
    console.log(`Name: ${user.firstName} ${user.lastName}`);
    console.log(`Role: ${user.role}`);
    console.log(`Active: ${user.isActive}`);
    console.log(`Email Verified: ${user.isEmailVerified}`);
    console.log(`2FA Enabled: ${user.isTwoFactorEnabled}`);
    console.log(`Login Attempts: ${user.loginAttempts || 0}`);
    console.log(`Is Locked: ${user.isLocked ? 'YES ⚠️' : 'NO ✅'}`);

    if (user.lockUntil) {
      console.log(`Lock Until: ${new Date(user.lockUntil)}`);
    }

    if (user.lastLogin) {
      console.log(`Last Login: ${new Date(user.lastLogin)}`);
    }

    if (newPassword) {
      console.log('\n🔄 Resetting password...');

      // Hash the new password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password and unlock account
      await User.updateOne(
        { _id: user._id },
        {
          $set: { password: hashedPassword },
          $unset: { loginAttempts: 1, lockUntil: 1 }
        }
      );

      console.log('✅ Password reset successfully!');
      console.log('✅ Account unlocked!');
      console.log(`\n🔑 New password: ${newPassword}`);
      console.log('\n⚠️  Please change this password after logging in!');
    } else {
      console.log('\n💡 To reset password, run:');
      console.log(`   node checkUser.js ${email} "YourNewPassword"`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

// Get email and optional new password from command line
const email = process.argv[2];
const newPassword = process.argv[3];

if (!email) {
  console.log('Usage: node checkUser.js <email> [newPassword]');
  console.log('\nExamples:');
  console.log('  Check account: node checkUser.js eyemdev.in@gmail.com');
  console.log('  Reset password: node checkUser.js eyemdev.in@gmail.com "NewPassword123"');
  process.exit(1);
}

checkAndResetPassword(email, newPassword);
