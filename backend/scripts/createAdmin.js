const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Import User model
const User = require("../src/models/User");

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Create admin user
    const adminData = {
      firstName: "Dev Kant ",
      lastName: "Kumar",
      email: "eyemdev@gmail.com",
      password: "1080=6mRltu;",
      role: "admin",
      isEmailVerified: true,
      isActive: true,
    };

    const adminUser = new User(adminData);
    await adminUser.save();

    console.log("Admin user created successfully!");
    console.log(`Email: ${adminData.email}`);
    console.log(`Password: ${adminData.password}`);
    console.log(`Role: ${adminData.role}`);
    console.log("Please change the password after first login.");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
};

createAdminUser();
