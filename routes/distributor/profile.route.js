const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  res.send('Distributor Profile');
});

module.exports = router;
