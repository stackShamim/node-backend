const express = require('express');

const router = express.Router();

// Routes
router.use('/shop', require('./modules/shop'));

module.exports = router;
