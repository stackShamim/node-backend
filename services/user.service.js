const User = require('../models/user');
const AppError = require('../utils/appError');

// Get all users
const getAllUsers = async () => {
  const users = await User.find().select('-password');
  return users;
};

// Get user by ID
const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw new AppError('User not found.', 404);
  }
  return user;
};

// Update user
const updateUser = async (id, updateData) => {
  const user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  return user;
};

// Delete user
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  return user;
};

// 

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
