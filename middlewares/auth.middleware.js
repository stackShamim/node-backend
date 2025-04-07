const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { comparePassword } = require('../utils/auth.util');
const asyncWrapper = require('../utils/asyncWrapper.util');
const AppError = require('../utils/appError.util');
const productService = require('../services/product.service');

const authenticateJWT = asyncWrapper(async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    throw new AppError('No token, authorization denied.', 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;

  next();
});

// Authenticate Role
const authenticateRole = (role) =>
  asyncWrapper(async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new AppError('No token, authorization denied.', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== role) {
      throw new AppError('Forbidden', 403);
    }

    req.user = user;
    next();
  });

// Check if new user
const checkNewUser = asyncWrapper(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new AppError('Email already exists.', 400);
  }

  next();
});

// Check user email
const checkUserEmail = asyncWrapper(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('Invalid email address.', 400);
  }

  req.user = user;
  next();
});

// Check user password
const checkUserPassword = asyncWrapper(async (req, res, next) => {
  const id = req.user.id;
  const { password } = req.body;

  const user = await User.findById(id);
  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError('Invalid password.', 400);
  }

  req.user = user;
  next();
});

// Check product belongs to vendor
const checkProductOwnership = asyncWrapper(async (req, res, next) => {
  const product = await productService.getProductById(req.params.id);
  if (!req.user._id.equals(product.vendorId._id)) {
    throw new AppError('You are not authorized to modify this product.', 401);
  }
  next();
});


module.exports = {
  checkNewUser,
  checkUserEmail,
  checkUserPassword,
  authenticateRole,
  authenticateJWT,
  checkProductOwnership,
};
