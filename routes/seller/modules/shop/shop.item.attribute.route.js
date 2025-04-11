const express = require('express');
const router = express.Router();

const attributeController = require('@controllers/modules/shop/shop.item.attribute.controller');

// Create a new attribute for a shop item
// POST /api/shop/item-attributes
router.post('/', attributeController.createAttribute);

// Get all attributes
// GET /api/shop/item-attributes/
router.get('/', attributeController.getAttributes);

// Get a specific attribute by ID
// GET /api/shop/item-attributes/:id
router.get('/:id', attributeController.getAttribute);

// Update a specific attribute by ID
// PUT /api/shop/item-attributes/:id
router.put('/:id', attributeController.updateAttribute);

// Delete a specific attribute by ID
// DELETE /api/shop/item-attributes/:id
router.delete('/:id', attributeController.deleteAttribute);

module.exports = router;
