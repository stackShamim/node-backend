const express = require('express');
const router = express.Router();

const subcategoryController = require('@controllers/modules/shop/shop.subcategory.controller');

// Create a new shop subcategory
// POST /api/shop/subcategories
router.post('/', subcategoryController.createSubcategory);


// Get all subcategories for a specific shop category
// GET /api/shop/subcategories/category/:categoryId
router.get('/category/:categoryId', subcategoryController.getSubcategoriesByCategory);

// Get a specific shop subcategory by ID
// GET /api/shop/subcategories/:id
router.get('/:id', subcategoryController.getSubcategory);

// Update a specific shop subcategory by ID
// PUT /api/shop/subcategories/:id
router.put('/:id', subcategoryController.updateSubcategory);

// Delete a specific shop subcategory by ID
// DELETE /api/shop/subcategories/:id
router.delete('/:id', subcategoryController.deleteSubcategory);

module.exports = router;
