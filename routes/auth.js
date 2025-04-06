const express = require('express');
const router = express.Router();

// Controllers
const { signInUser, signUpUser } = require('../controllers/user');

// Middlewares
const { checkNewUser, checkUserPassword, checkUserEmail } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { signUpSchema, signInSchema } = require('../validation/user');

// USER AUTH ROUTES

// Signup
router.post('/user/signup', validate(signUpSchema), checkNewUser, signUpUser);

// Signin
router.post('/user/signin', validate(signInSchema), checkUserEmail, checkUserPassword, signInUser);

module.exports = router;
