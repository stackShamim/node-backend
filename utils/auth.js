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

// Validate password
const validatePassword = (password) => {
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  } else if (password.length > 32) {
    throw new Error('Password must be less than 32 characters.');
  }
};

// Validate email
const validateEmail = (email) => {
  // Regular expression for validating an email address
  // This regular expression pattern matches most common email formats.
  // It consists of the following parts:
  // [a-zA-Z0-9._-]+ matches one or more characters that are alphanumeric or special characters like dot (.), hyphen (-), or underscore (_)
  // @ matches the @ symbol
  // [a-zA-Z0-9.-]+ matches one or more characters that are alphanumeric or special characters like dot (.), hyphen (-)
  // \. matches the dot (.) symbol
  // [a-zA-Z]{2,6} matches the domain extension (it must be between 2 and 6 characters long)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Check if the email format is valid
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email address format');
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  generateOTP,
  validatePassword,
  validateEmail,
};
