const express = require('express');
const router = express.Router();

const shopItemController = require('@controllers/modules/shop/shop.item.controller');

// Create a new shop item
// POST /api/shop/item
// router.post('/', shopItemController.createItem);

// Create a new shop item with variations
// POST /api/shop/item-with-variations
router.post('/', shopItemController.createItemWithVariations);

// Get all shop items
// GET /api/shop/item
router.get('/', shopItemController.getAllItems);

// Get a specific shop item by ID
// GET /api/shop/item/:id
router.get('/:id', shopItemController.getItem);

// Update an existing shop item by ID
// PUT /api/shop/item/:id
// router.put('/:id', shopItemController.updateItem);

// Update an existing shop item by ID with variations
// PUT /api/shop/item-with-variations/:id
router.put('/:id', shopItemController.updateItemWithVariations);

// Delete a shop item by ID
// DELETE /api/shop/item/:id
router.delete('/:id', shopItemController.deleteItem);

module.exports = router;
