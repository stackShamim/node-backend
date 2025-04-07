const express = require('express');

const router = express.Router();

// Routes
router.use(require('./profile.route'));

module.exports = router;
