const express = require('express');
const router = express.Router();

const categoryController = require('@controllers/modules/shop/shop.category.controller');

// Create a new shop category
// POST /api/shop/categories
router.post('/', categoryController.createCategory);

// Get all shop categories
// GET /api/shop/categories
router.get('/', categoryController.getAllCategories);

// Get a specific shop category by ID
// GET /api/shop/categories/:id
router.get('/:id', categoryController.getCategory);

// Update an existing shop category by ID
// PUT /api/shop/categories/:id
router.put('/:id', categoryController.updateCategory);

// Delete a specific shop category by ID
// DELETE /api/shop/categories/:id
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
