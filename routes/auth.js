const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/user');

// Middlewares
const auth = require('../middlewares/auth');

// USER AUTH ROUTES

// Signup
router.post('/user/signup', auth.checkNewUser, userController.signUpUser);

// Signin
router.post('/user/signin', auth.checkUserEmail, auth.checkUserPassword, userController.signInUser);

module.exports = router;
