const express = require('express');
const router = express.Router();

// Controllers
const { signInUser, signUpUser } = require('../controllers/auth.controller');

// Middlewares
const { checkNewUser, checkUserPassword, checkUserEmail } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { signUpSchema, signInSchema } = require('../validation/user.schema');

// USER AUTH ROUTES

// Signup
router.post('/user/signup', validate(signUpSchema), checkNewUser, signUpUser);

// Signin
router.post('/user/signin', validate(signInSchema), checkUserEmail, checkUserPassword, signInUser);

module.exports = router;
