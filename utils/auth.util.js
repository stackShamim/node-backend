const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// Function to hash password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Function to compare password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Function to generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Function to generate a JWT
const generateToken = (user) => {
  const payload = {
    id: user._id, // User ID
    role: user.role, // User's role for role-based authentication
  };

  // Get token expiration time from env or use default 7 days
  const tokenExpiresIn = process.env.JWT_EXPIRES_IN || '7d';

  // Generate the token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: tokenExpiresIn,
  });

  return token;
};

// Utility to filter out sensitive fields (like password)
const sanitizeUser = (user) => {
  const { password, __v, ...safeUser } = user.toObject();
  return safeUser;
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  generateOTP,
  sanitizeUser,
};
