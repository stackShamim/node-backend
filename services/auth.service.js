// services/authService.js
const User = require('../models/user.model');
const { generateToken, sanitizeUser } = require('../utils/auth.util');
const AppError = require('../utils/appError.util');

// Create a new user
const createUser = async (userData) => {
  const user = new User(userData);
  const savedUser = await user.save();
  return sanitizeUser(savedUser);
};

// Log in user and return token + user
const loginUser = async (user) => {
  if (!user) throw new AppError('Invalid credentials.', 401);
  const token = generateToken(user);
  return {
    user: sanitizeUser(user),
    token,
  };
};

module.exports = {
  createUser,
  loginUser,
};
