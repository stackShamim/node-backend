const asyncWrapper = require('../utils/asyncWrapper');
const userService = require('../services/user');
const { success } = require('../utils/response');

// Fetch all users
const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await userService.getAllUsers();
  return success({
    res,
    message: 'Users fetched successfully.',
    data: { users },
  });
});

// Fetch a user by ID
const getUser = asyncWrapper(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  return success({
    res,
    message: 'User fetched successfully.',
    data: { user },
  });
});

// Update a user's details
const updateUser = asyncWrapper(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  return success({
    res,
    message: 'User updated successfully.',
    data: { user },
  });
});

// Delete a user by ID
const deleteUser = asyncWrapper(async (req, res) => {
  await userService.deleteUser(req.params.id);
  return success({
    res,
    message: 'User deleted successfully.',
  });
});

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
