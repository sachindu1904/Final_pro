// routes/eventRoutes.js
const express = require('express');
const { 
  createEvent, 
  getOrganizerEvents, 
  getEventById, 
  updateEvent, 
  deleteEvent,
  getApprovedEvents,
  getOrganizerEventById
} = require('../controllers/eventController');
const { protect, organizerOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes (no auth required)
router.get('/', getApprovedEvents); // Get all approved events

// Protected organizer-specific routes
router.get('/organizer/events', protect, organizerOnly, getOrganizerEvents);
router.get('/organizer/:id', protect, organizerOnly, getOrganizerEventById);

// Generic event routes
router.get('/:id', getEventById); // Get a single event by ID
router.post('/', protect, organizerOnly, createEvent);
router.put('/:id', protect, organizerOnly, updateEvent);
router.delete('/:id', protect, organizerOnly, deleteEvent);

module.exports = router; 