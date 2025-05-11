// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Default secret for development - should be replaced with a proper environment variable in production
const DEFAULT_SECRET = 'eventuraa_jwt_secret_dev_environment_only';

// Protect routes - Authentication middleware
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    try {
      // Get the JWT secret from env or use default
      const secret = process.env.JWT_SECRET || DEFAULT_SECRET;
      
      // Verify token
      const decoded = jwt.verify(token, secret);

      // Get user from the token
      const user = await User.findById(decoded.id).select('-password');
      
      // Check if user still exists
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'The user belonging to this token no longer exists'
        });
      }
      
      // Check if token was issued before password change
      // This would require a passwordChangedAt field in the User model
      // if (user.passwordChangedAt && ...) {...}

      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token. Please log in again.'
        });
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Your session has expired. Please log in again.'
        });
      }
      
      return res.status(401).json({
        success: false,
        message: 'Authentication failed. Please log in again.'
      });
    }
  } catch (error) {
    console.error('Error in auth middleware:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

// Check user role
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. ${req.user.role} role is not authorized to access this resource`
      });
    }
    next();
  };
};

// Organizer only middleware
exports.organizerOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }
  
  if (req.user.role !== 'organizer') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Only organizers can access this resource'
    });
  }
  
  // Check if organizer is verified (optional validation)
  if (req.user.organizerProfile && req.user.organizerProfile.verified === false) {
    return res.status(403).json({
      success: false,
      message: 'Your organizer account is pending verification. Please wait for approval.'
    });
  }
  
  next();
};

// Admin only middleware
exports.adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Only administrators can access this resource'
    });
  }
  
  next();
};