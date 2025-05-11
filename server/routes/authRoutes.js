// routes/authRoutes.js
const express = require('express');
const { 
  signup, 
  signin, 
  getUserProfile, 
  doctorSignup, 
  organizerSignup,
  adminSignup
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Debugging log for route registration
console.log('Registering auth routes:');
console.log(' - POST /api/auth/signup');
console.log(' - POST /api/auth/signin');
console.log(' - GET /api/auth/profile');
console.log(' - POST /api/auth/doctor/signup');
console.log(' - POST /api/auth/organizer/signup');
console.log(' - POST /api/auth/admin/signup');

// Regular user routes
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', protect, getUserProfile);

// Doctor routes
router.post('/doctor/signup', doctorSignup);

// Organizer routes
router.post('/organizer/signup', organizerSignup);

// Admin routes
router.post('/admin/signup', adminSignup);

module.exports = router;