const express = require('express');
const router = express.Router();
const { protect, organizerOnly } = require('../middleware/authMiddleware');
const Organizer = require('../models/Organizer');
const Company = require('../models/Company');

// Get current organizer's profile
router.get('/me', protect, organizerOnly, async (req, res) => {
  try {
    const organizer = await Organizer.findOne({ user: req.user._id })
      .populate('company');
    
    if (!organizer) {
      return res.status(404).json({ message: 'Organizer profile not found' });
    }

    res.json(organizer);
  } catch (error) {
    console.error('Error fetching organizer profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update organizer profile
router.post('/profile', protect, organizerOnly, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      position,
      phoneNumber,
      bio,
      company
    } = req.body;

    // Check if company exists or create new one
    let companyDoc = await Company.findOne({ registrationNumber: company.registrationNumber });
    
    if (!companyDoc) {
      companyDoc = new Company(company);
      await companyDoc.save();
    }

    // Check if organizer profile exists
    let organizer = await Organizer.findOne({ user: req.user._id });

    if (organizer) {
      // Update existing profile
      organizer.firstName = firstName;
      organizer.lastName = lastName;
      organizer.position = position;
      organizer.phoneNumber = phoneNumber;
      organizer.bio = bio;
      organizer.company = companyDoc._id;
    } else {
      // Create new profile
      organizer = new Organizer({
        user: req.user._id,
        firstName,
        lastName,
        position,
        phoneNumber,
        bio,
        company: companyDoc._id
      });
    }

    await organizer.save();
    
    // Populate company details before sending response
    await organizer.populate('company');
    
    res.json(organizer);
  } catch (error) {
    console.error('Error creating/updating organizer profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload verification documents
router.post('/documents', protect, organizerOnly, async (req, res) => {
  try {
    const { documents } = req.body;
    
    const organizer = await Organizer.findOne({ user: req.user._id });
    
    if (!organizer) {
      return res.status(404).json({ message: 'Organizer profile not found' });
    }

    organizer.verificationDocuments = documents;
    await organizer.save();

    res.json(organizer);
  } catch (error) {
    console.error('Error uploading documents:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 