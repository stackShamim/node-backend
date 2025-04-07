const express = require('express');

const router = express.Router();

// Routes
router.use(require('./profile.route'));
router.use(require('./product.route'));

module.exports = router;
