const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { comparePassword } = require('../utils/auth');

// Authenticate JWT
const authenticateJWT = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token, authorization denied.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Token is not valid',
      error: error.message,
    });
  }
};

const authenticateRole = (role) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({
          status: 'error',
          message: 'No token, authorization denied.',
        });
      }
      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Validate role
      const user = await User.findById(decoded.id);

      console.log('role');
      console.log(user);
      if (!user || user.role !== role) {
        return res.status(403).json({
          status: 'error',
          message: 'Forbidden',
        });
      }
      req.user = user;

      next();
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Server error',
        error: error.message,
      });
    }
  };
};

// Check if user exists
const checkNewUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      if (user.email === email) {
        return res.status(400).json({
          status: 'error',
          message: 'Email already exists.',
        });
      } else {
        return res.status(400).json({
          status: 'error',
          message: 'Username already exists.',
        });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to check if user exists.',
      error: error.message,
    });
  }
};

// Check user email address
const checkUserEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check all required fields are provided
    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is required.',
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid email address.',
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to check user email address.',
      error: error.message,
    });
  }
};

// Check user password
const checkUserPassword = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { password } = req.body;

    // Check password is provided
    if (!password) {
      return res.status(400).json({
        status: 'error',
        message: 'Password is required.',
      });
    }

    // Check if user exists
    const user = await User.findById(id);

    // Compare password
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid password.',
      });
    }

    // Add user to request object
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to check user password.',
      error: error.message,
    });
  }
};

module.exports = {
  checkNewUser,
  checkUserEmail,
  checkUserPassword,
  authenticateRole,
  authenticateJWT,
};
