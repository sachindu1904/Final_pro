// controllers/authController.js
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    // Input validation
    const errors = [];
    
    if (!name || name.trim() === '') {
      errors.push({ param: 'name', msg: 'Please provide a name' });
    } else if (name.length > 50) {
      errors.push({ param: 'name', msg: 'Name cannot be more than 50 characters' });
    }
    
    if (!email || email.trim() === '') {
      errors.push({ param: 'email', msg: 'Please provide an email' });
    } else {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        errors.push({ param: 'email', msg: 'Please provide a valid email address' });
      }
    }
    
    if (phone) {
      const phoneRegex = /^\+94\s\d{2}\s\d{3}\s\d{4}$/;
      if (!phoneRegex.test(phone)) {
        errors.push({ param: 'phone', msg: 'Phone number must be in format: +94 XX XXX XXXX' });
      }
    }
    
    if (!password) {
      errors.push({ param: 'password', msg: 'Please provide a password' });
    } else if (password.length < 8) {
      errors.push({ param: 'password', msg: 'Password must be at least 8 characters' });
    }
    
    // Return validation errors if any
    if (errors.length > 0) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone: phone || undefined // Only save phone if provided
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error in signup:', error);
    
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
    
    // Handle duplicate key error (for unique fields)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Server error processing registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Register a new doctor
// @route   POST /api/auth/doctor/signup
// @access  Public
exports.doctorSignup = async (req, res, next) => {
  try {
    const { 
      name, 
      email, 
      password, 
      phone, 
      regNumber, 
      specialization, 
      qualification, 
      hospital 
    } = req.body;

    // Input validation
    const errors = [];
    
    if (!name || name.trim() === '') {
      errors.push({ param: 'name', msg: 'Please provide a name' });
    }
    
    if (!email || email.trim() === '') {
      errors.push({ param: 'email', msg: 'Please provide an email' });
    } else {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        errors.push({ param: 'email', msg: 'Please provide a valid email address' });
      }
    }
    
    if (!regNumber) {
      errors.push({ param: 'regNumber', msg: 'Please provide your SLMC registration number' });
    }
    
    if (!password || password.length < 8) {
      errors.push({ param: 'password', msg: 'Password must be at least 8 characters' });
    }
    
    // Return validation errors if any
    if (errors.length > 0) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    // Check if user already exists with same email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Check if doctor already exists with same registration number
    const regNumberExists = await User.findOne({ 'doctorProfile.regNumber': regNumber });
    if (regNumberExists) {
      return res.status(400).json({
        success: false,
        message: 'Registration number already exists'
      });
    }

    // Create new doctor user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: 'doctor',
      doctorProfile: {
        regNumber,
        specialization,
        qualification,
        hospital,
        verified: false // Doctors need verification before full access
      }
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        doctorProfile: user.doctorProfile
      }
    });
  } catch (error) {
    console.error('Error in doctor signup:', error);
    
    // Handle errors
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
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Doctor already exists with this email or registration number'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error processing registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Register a new organizer
// @route   POST /api/auth/organizer/signup
// @access  Public
exports.organizerSignup = async (req, res, next) => {
  try {
    const { 
      name, 
      email, 
      password, 
      phone, 
      company, 
      description, 
      website 
    } = req.body;

    // Input validation
    const errors = [];
    
    if (!name || name.trim() === '') {
      errors.push({ param: 'name', msg: 'Please provide a name' });
    }
    
    if (!email || email.trim() === '') {
      errors.push({ param: 'email', msg: 'Please provide an email' });
    } else {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        errors.push({ param: 'email', msg: 'Please provide a valid email address' });
      }
    }
    
    if (!company) {
      errors.push({ param: 'company', msg: 'Please provide your company name' });
    }
    
    if (!password || password.length < 8) {
      errors.push({ param: 'password', msg: 'Password must be at least 8 characters' });
    }
    
    // Return validation errors if any
    if (errors.length > 0) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create new organizer user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: 'organizer',
      organizerProfile: {
        company,
        description,
        website,
        verified: false, // Organizers need verification before full access
        memberSince: new Date()
      }
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        organizerProfile: user.organizerProfile
      }
    });
  } catch (error) {
    console.error('Error in organizer signup:', error);
    
    // Handle errors    
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
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Organizer already exists with this email'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error processing registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/signin
// @access  Public
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    console.log('Signin attempt:', { email, passwordProvided: !!password });

    // Check if email and password are provided
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email'
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a password'
      });
    }

    // Find user by email and include the password field
    const user = await User.findOne({ email }).select('+password');
    console.log('User found:', user ? { 
      id: user._id, 
      email: user.email, 
      role: user.role,
      passwordExists: !!user.password
    } : 'No user found');

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    console.log('Password match result:', isMatch);
    
    if (!isMatch) {
      // Use the same error message to prevent user enumeration
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Determine which profile to include based on role
    let responseData = {
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    };

    // Add role-specific profile data
    if (user.role === 'doctor' && user.doctorProfile) {
      responseData.user.doctorProfile = user.doctorProfile;
    } else if (user.role === 'organizer' && user.organizerProfile) {
      responseData.user.organizerProfile = user.organizerProfile;
    }

    res.json(responseData);
  } catch (error) {
    console.error('Error in signin:', error);
    
    res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prepare response based on user role
    let userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
    };

    // Add role-specific profile data
    if (user.role === 'doctor' && user.doctorProfile) {
      userData.doctorProfile = user.doctorProfile;
    } else if (user.role === 'organizer' && user.organizerProfile) {
      userData.organizerProfile = user.organizerProfile;
    }

    res.json({
      success: true,
      user: userData
    });
  } catch (error) {
    console.error('Error in getting user profile:', error);
    
    res.status(500).json({
      success: false,
      message: 'Server error retrieving user profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Register a new admin user (restricted for security)
// @route   POST /api/auth/admin/signup
// @access  Public (should be secured in production)
exports.adminSignup = async (req, res, next) => {
  try {
    const { name, email, password, phone, adminSecretKey } = req.body;

    // IMPORTANT: Verify admin secret key to restrict admin creation
    const correctSecretKey = process.env.ADMIN_SECRET_KEY || 'eventuraa_admin_secret_key';
    
    if (!adminSecretKey || adminSecretKey !== correctSecretKey) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin secret key'
      });
    }

    // Input validation
    const errors = [];
    
    if (!name || name.trim() === '') {
      errors.push({ param: 'name', msg: 'Please provide a name' });
    }
    
    if (!email || email.trim() === '') {
      errors.push({ param: 'email', msg: 'Please provide an email' });
    } else {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        errors.push({ param: 'email', msg: 'Please provide a valid email address' });
      }
    }
    
    if (!password || password.length < 8) {
      errors.push({ param: 'password', msg: 'Password must be at least 8 characters' });
    }
    
    // Return validation errors if any
    if (errors.length > 0) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new admin user
    const user = await User.create({
      name,
      email,
      password,
      phone: phone || undefined,
      role: 'admin'
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error in admin signup:', error);
    
    // Handle errors
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
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error processing registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};