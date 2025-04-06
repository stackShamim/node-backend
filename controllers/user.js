const User = require('../models/user');
const { validateEmail, validatePassword, generateToken } = require('../utils/auth');

// Register user
const signUpUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    try {
      validateEmail(email);
      validatePassword(password);
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }

    // Create new user
    const user = new User(req.body);
    await user.save();

    // Return the user data
    return res.status(200).json({
      status: 'success',
      message: 'User registered successfully.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to register user.',
      error: error.message,
    });
  }
};

const signInUser = async (req, res) => {
  try {
    const user = req.user;

    // Generate token
    const token = generateToken(user);

    // Return user data and token
    return res.status(200).json({
      status: 'success',
      message: 'User logged in successfully.',
      data: {
        user: user,
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to sign in.',
      error: error.message,
    });
  }
};
module.exports = {
  signUpUser,
  signInUser,
};
