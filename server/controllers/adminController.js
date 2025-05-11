// controllers/adminController.js
const Event = require('../models/Event');
const User = require('../models/User');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Count events by approval status
    const pendingEvents = await Event.countDocuments({ approvalStatus: 'pending' });
    const approvedEvents = await Event.countDocuments({ approvalStatus: 'approved' });
    const rejectedEvents = await Event.countDocuments({ approvalStatus: 'rejected' });
    const totalEvents = pendingEvents + approvedEvents + rejectedEvents;
    
    // Count users by role
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalOrganizers = await User.countDocuments({ role: 'organizer' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    
    // Count verified organizers
    const verifiedOrganizers = await User.countDocuments({ 
      role: 'organizer', 
      'organizerProfile.verified': true 
    });
    
    // Calculate percentage of pending events
    const pendingPercentage = totalEvents > 0 ? Math.round((pendingEvents / totalEvents) * 100) : 0;
    
    // Get recent events
    const recentEvents = await Event.find({})
      .populate('organizer', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Return all stats and recent events
    res.json({
      success: true,
      data: {
        events: {
          total: totalEvents,
          pending: pendingEvents,
          approved: approvedEvents,
          rejected: rejectedEvents,
          pendingPercentage
        },
        users: {
          total: totalUsers,
          organizers: totalOrganizers,
          admins: totalAdmins
        },
        organizers: {
          total: totalOrganizers,
          verified: verifiedOrganizers
        }
      },
      recentEvents
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all pending events
const getPendingEvents = async (req, res) => {
  try {
    const pendingEvents = await Event.find({ approvalStatus: 'pending' })
      .populate('organizer', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: pendingEvents });
  } catch (error) {
    console.error('Error fetching pending events:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({})
      .populate('organizer', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: events });
  } catch (error) {
    console.error('Error fetching all events:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email');
    
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    res.json({ success: true, data: event });
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Review event (approve or reject)
const reviewEvent = async (req, res) => {
  try {
    const { status, reviewNotes } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Status must be either "approved" or "rejected"' 
      });
    }
    
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    // Update event approval status and review notes
    event.approvalStatus = status;
    event.adminFeedback = reviewNotes || '';
    event.reviewedBy = req.user._id;
    event.reviewedAt = Date.now();
    
    await event.save();
    
    res.json({ 
      success: true, 
      message: `Event has been ${status}`, 
      data: event 
    });
  } catch (error) {
    console.error('Error reviewing event:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all organizers
const getAllOrganizers = async (req, res) => {
  try {
    const organizers = await User.find({ role: 'organizer' })
      .select('name email isVerified createdAt')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: organizers });
  } catch (error) {
    console.error('Error fetching organizers:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Verify or unverify an organizer
const verifyOrganizer = async (req, res) => {
  try {
    const { isVerified } = req.body;
    
    if (typeof isVerified !== 'boolean') {
      return res.status(400).json({ 
        success: false, 
        message: 'isVerified must be a boolean value' 
      });
    }
    
    const organizer = await User.findById(req.params.id);
    
    if (!organizer) {
      return res.status(404).json({ success: false, message: 'Organizer not found' });
    }
    
    if (organizer.role !== 'organizer') {
      return res.status(400).json({ 
        success: false, 
        message: 'This user is not an organizer' 
      });
    }
    
    // Update verification status
    organizer.isVerified = isVerified;
    await organizer.save();
    
    res.json({ 
      success: true, 
      message: `Organizer has been ${isVerified ? 'verified' : 'unverified'}`, 
      data: organizer 
    });
  } catch (error) {
    console.error('Error verifying organizer:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getDashboardStats,
  getPendingEvents,
  getAllEvents,
  getEventById,
  reviewEvent,
  getAllOrganizers,
  verifyOrganizer
}; 