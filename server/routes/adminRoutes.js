// routes/adminRoutes.js
const express = require('express');
const {
  getPendingEvents,
  getAllEvents,
  getEventById,
  reviewEvent,
  getDashboardStats,
  getAllOrganizers,
  verifyOrganizer
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authentication and admin role middleware to all routes
router.use(protect);
router.use(adminOnly);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Event management routes
router.get('/events/pending', getPendingEvents);
router.get('/events', getAllEvents);
router.get('/events/:id', getEventById);
router.put('/events/:id/review', reviewEvent);

// Organizer management routes
router.get('/organizers', getAllOrganizers);
router.put('/organizers/:id/verify', verifyOrganizer);

module.exports = router; 