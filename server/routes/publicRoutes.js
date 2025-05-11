// routes/publicRoutes.js
const express = require('express');
const Event = require('../models/Event');
const mongoose = require('mongoose');

const router = express.Router();

// Public test version of events API (no auth required)
router.get('/events', async (req, res) => {
  try {
    // Get all approved and published events
    const events = await Event.find({ 
      approvalStatus: 'approved',
      published: true 
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    console.error('Error in public events route:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching events'
    });
  }
});

// Public test endpoint to create events (no auth required)
router.post('/events', async (req, res) => {
  try {
    const { 
      title, 
      description, 
      date, 
      time, 
      location, 
      category, 
      images, 
      published,
      tickets 
    } = req.body;

    console.log('Received event data:', req.body);

    // Input validation
    const errors = [];
    
    if (!title || title.trim() === '') {
      errors.push({ param: 'title', msg: 'Please provide an event title' });
    }
    
    if (!description || description.trim() === '') {
      errors.push({ param: 'description', msg: 'Please provide a description' });
    }
    
    if (!date) {
      errors.push({ param: 'date', msg: 'Please provide an event date' });
    }
    
    if (!time) {
      errors.push({ param: 'time', msg: 'Please provide an event time' });
    }
    
    if (!location || location.trim() === '') {
      errors.push({ param: 'location', msg: 'Please provide a location' });
    }
    
    if (!category) {
      errors.push({ param: 'category', msg: 'Please provide a category' });
    }
    
    if (!tickets || !Array.isArray(tickets) || tickets.length === 0) {
      errors.push({ param: 'tickets', msg: 'Please provide at least one ticket type' });
    }
    
    // Return validation errors
    if (errors.length > 0) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Create a valid ObjectId for the organizer
    const dummyOrganizerId = new mongoose.Types.ObjectId();

    // Create new event with generated organizer ID
    const newEvent = await Event.create({
      title,
      description,
      date,
      time,
      location,
      category,
      images: images || [],
      published: published !== undefined ? published : true,
      approvalStatus: 'pending', // All new events need admin approval
      organizer: dummyOrganizerId, // Using a valid ObjectId
      tickets: tickets.map(ticket => ({
        name: ticket.name,
        price: Number(ticket.price),
        quantity: Number(ticket.quantity),
        sold: 0
      }))
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully and is pending admin approval',
      event: newEvent
    });
  } catch (error) {
    console.error('Error creating event:', error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        param: err.path,
        msg: err.message
      }));
      
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 