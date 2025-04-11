const express = require('express');
const router = express.Router();

const variationController = require('@controllers/modules/shop/shop.item.variation.controller');

// Create a new variation for a shop item
// POST /api/shop/item-variations
router.post('/', variationController.createVariation);

// Get all variations for a specific shop item
// GET /api/shop/item-variations/shop-item/:shopItemId
router.get('/shop-item/:shopItemId', variationController.getVariations);

// Get a specific variation by ID
// GET /api/shop/item-variations/:id
router.get('/:id', variationController.getVariation);

// Update a specific variation by ID
// PUT /api/shop/item-variations/:id
router.put('/:id', variationController.updateVariation);

// Delete a specific variation by ID
// DELETE /api/shop/item-variations/:id
router.delete('/:id', variationController.deleteVariation);

module.exports = router;
