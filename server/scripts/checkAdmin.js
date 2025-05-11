// scripts/checkAdmin.js
const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB connection URI
const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eventuraa';

// Function to check admin user
const checkAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(URI);
    console.log('MongoDB Connected');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@eventuraa.com' }).select('+password');
    
    if (!admin) {
      console.log('Admin user not found');
      await mongoose.connection.close();
      return;
    }

    console.log('Admin user found:');
    console.log({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      password: admin.password ? 'Password is present' : 'Password is missing'
    });
    
    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB disconnected');
    
  } catch (error) {
    console.error('Error checking admin user:', error);
    process.exit(1);
  }
};

// Run the function
checkAdminUser(); 