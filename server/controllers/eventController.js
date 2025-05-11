const Event = require('../models/Event');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private - Organizers only
exports.createEvent = async (req, res) => {
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
    } else {
      // Validate each ticket
      tickets.forEach((ticket, index) => {
        if (!ticket.name || ticket.name.trim() === '') {
          errors.push({ param: `tickets[${index}].name`, msg: 'Please provide a ticket name' });
        }
        
        if (ticket.price === undefined || ticket.price === '') {
          errors.push({ param: `tickets[${index}].price`, msg: 'Please provide a ticket price' });
        } else if (isNaN(ticket.price) || Number(ticket.price) < 0) {
          errors.push({ param: `tickets[${index}].price`, msg: 'Ticket price must be a non-negative number' });
        }
        
        if (ticket.quantity === undefined || ticket.quantity === '') {
          errors.push({ param: `tickets[${index}].quantity`, msg: 'Please provide ticket quantity' });
        } else if (isNaN(ticket.quantity) || Number(ticket.quantity) < 1) {
          errors.push({ param: `tickets[${index}].quantity`, msg: 'Ticket quantity must be at least 1' });
        }
      });
    }
    
    // Return validation errors
    if (errors.length > 0) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Create new event
    const newEvent = await Event.create({
      title,
      description,
      date,
      time,
      location,
      category,
      images: images || [],
      published: published !== undefined ? published : true,
      approvalStatus: 'pending',
      organizer: req.user.id,
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
};

// @desc    Get all events for the logged-in organizer
// @route   GET /api/events
// @access  Private - Organizers only
exports.getOrganizerEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id })
      .sort({ createdAt: -1 }); // Most recent first
    
    res.json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching events',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email organizerProfile');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // For public access, only return approved events
    if (event.approvalStatus !== 'approved') {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while fetching event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private - Organizer who created the event
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if the event belongs to the logged-in organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event'
      });
    }
    
    // Update the event
    event = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Event updated successfully',
      event
    });
  } catch (error) {
    console.error('Error updating event:', error);
    
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
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while updating event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private - Organizer who created the event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if the event belongs to the logged-in organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this event'
      });
    }
    
    await event.deleteOne();
    
    res.json({
      success: true,
      message: 'Event removed successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while deleting event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all approved events
// @route   GET /api/events
// @access  Public
exports.getApprovedEvents = async (req, res) => {
  try {
    // Get only approved events
    const events = await Event.find({ approvalStatus: 'approved' })
      .populate('organizer', 'name')
      .sort('-date');
    
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Error getting approved events:', error);
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single event by ID for organizer
// @route   GET /api/events/organizer/:id
// @access  Private - Organizer only
exports.getOrganizerEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if the event belongs to the logged-in organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this event'
      });
    }
    
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while fetching event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 