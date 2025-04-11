const express = require('express');

const router = express.Router();

// Routes
router.use('/category', require('./shop.category.route'));
router.use('/subcategory', require('./shop.subcategory.route'));
router.use('/item-attribute', require('./shop.item.attribute.route'));
router.use('/item', require('./shop.item.route'));
router.use('/item-variation', require('./shop.item.variation.route'));

// Test
// GET /api/shop
router.get('/', (req, res) => {
    res.send('Shop Module');
});

module.exports = router;
