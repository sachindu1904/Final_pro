// Script to create an admin user
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import the User model
const User = require('../models/User');

// MongoDB connection URI
const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eventuraa';

// Admin user details
const adminUser = {
  name: 'Admin User',
  email: 'admin@eventuraa.com',
  password: 'adminpass123',
  role: 'admin'
};

// Function to create admin user
const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(URI);
    console.log('MongoDB Connected');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      await mongoose.connection.close();
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminUser.password, salt);

    // Create new admin
    const newAdmin = new User({
      name: adminUser.name,
      email: adminUser.email,
      password: hashedPassword,
      role: adminUser.role
    });

    // Save admin to DB
    await newAdmin.save();
    
    console.log('Admin user created successfully');
    console.log(`Email: ${adminUser.email}`);
    console.log(`Password: ${adminUser.password}`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB disconnected');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

// Run the function
createAdminUser(); 