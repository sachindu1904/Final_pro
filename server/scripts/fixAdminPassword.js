const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables
dotenv.config();

// MongoDB connection URI
const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eventuraa';

// Admin credentials
const adminEmail = 'admin@eventuraa.com';
const newPassword = 'adminpass123';

// Function to fix admin password
const fixAdminPassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(URI);
    console.log('MongoDB Connected');
    
    // Find admin user
    const admin = await User.findOne({ email: adminEmail });
    
    if (!admin) {
      console.log('Admin user not found');
      await mongoose.connection.close();
      return;
    }

    console.log('Found admin user:', {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    });

    // Generate password hash manually
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password directly in DB without triggering middleware
    const result = await User.updateOne(
      { _id: admin._id },
      { $set: { password: hashedPassword } }
    );
    
    if (result.modifiedCount === 1) {
      console.log('Admin password updated successfully');
      console.log(`Email: ${adminEmail}`);
      console.log(`New password: ${newPassword}`);
    } else {
      console.log('Failed to update password');
    }
    
    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB disconnected');
    
  } catch (error) {
    console.error('Error fixing admin password:', error);
    process.exit(1);
  }
};

// Run the function
fixAdminPassword(); 