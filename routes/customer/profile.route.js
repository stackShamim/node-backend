const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  res.send('Customer Profile');
});

module.exports = router;
