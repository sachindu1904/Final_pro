// utils/generateToken.js
const jwt = require('jsonwebtoken');

// Default secret for development - should be replaced with a proper environment variable in production
const DEFAULT_SECRET = 'eventuraa_jwt_secret_dev_environment_only';

// Generate JWT token
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || DEFAULT_SECRET;
  const expiry = process.env.JWT_EXPIRE || '30d'; // Default 30 days

  return jwt.sign({ id }, secret, {
    expiresIn: expiry
  });
};

module.exports = generateToken;