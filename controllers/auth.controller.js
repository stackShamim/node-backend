// controllers/authController.js

const asyncWrapper = require('../utils/asyncWrapper.util');
const authService = require('../services/auth.service');
const { success } = require('../utils/response.util');

// Register a new user
const signUpUser = asyncWrapper(async (req, res) => {
  const user = await authService.createUser(req.body);
  return success({
    res,
    message: 'User registered successfully.',
    data: { user },
  });
});

// Log in an existing user
const signInUser = asyncWrapper(async (req, res) => {
  const data = await authService.loginUser(req.user);
  return success({
    res,
    message: 'User logged in successfully.',
    data,
  });
});

module.exports = {
  signUpUser,
  signInUser,
};
