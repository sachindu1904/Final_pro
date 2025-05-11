// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    match: [
      /^\+94\s\d{2}\s\d{3}\s\d{4}$/,
      'Phone number must be in format: +94 XX XXX XXXX'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Don't include password in query results by default
  },
  role: {
    type: String,
    enum: ['user', 'organizer', 'doctor', 'property-owner', 'admin'],
    default: 'user'
  },
  // Fields for Organizers
  organizerProfile: {
    company: String,
    verified: {
      type: Boolean,
      default: false
    },
    memberSince: {
      type: Date,
      default: Date.now
    },
    profileImage: String,
    description: String,
    website: String,
    social: {
      facebook: String,
      instagram: String,
      twitter: String
    }
  },
  // Fields for Doctors
  doctorProfile: {
    specialization: String,
    qualification: String,
    regNumber: {
      type: String,
      unique: true,
      sparse: true // Allow null/undefined values (only enforce uniqueness on non-null values)
    },
    verified: {
      type: Boolean,
      default: false
    },
    hospital: String,
    experience: Number,
    languages: [String],
    photo: String,
    videoConsultationFee: Number,
    inPersonFee: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

// Encrypt password using bcrypt before saving
UserSchema.pre('save', async function(next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);