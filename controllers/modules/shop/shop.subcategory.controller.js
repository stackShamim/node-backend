const asyncWrapper = require('@utils/asyncWrapper.util');
const subcategoryService = require('@services/modules/shop/shop.subcategory.service');
const { success } = require('@utils/response.util');

// Create new subcategory
const createSubcategory = asyncWrapper(async (req, res) => {
  const subcategory = await subcategoryService.createSubcategory(req.body);
  return success({ res, message: 'Subcategory created successfully.', data: subcategory });
});

// Get all subcategories
const getSubcategories = asyncWrapper(async (req, res) => {
  const subcategories = await subcategoryService.getAllSubcategories();
  return success({ res, message: 'Subcategories fetched successfully.', data: subcategories });
});

// Get subcategory by ID
const getSubcategory = asyncWrapper(async (req, res) => {
  console.log(req.params.id);
  const subcategory = await subcategoryService.getSubcategoryById(req.params.id);
  return success({ res, message: 'Subcategory fetched successfully.', data: subcategory });
});

// Update subcategory
const updateSubcategory = asyncWrapper(async (req, res) => {
  const updated = await subcategoryService.updateSubcategory(req.params.id, req.body);
  return success({ res, message: 'Subcategory updated.', data: updated });
});

// Delete subcategory
const deleteSubcategory = asyncWrapper(async (req, res) => {
  const deleted = await subcategoryService.deleteSubcategory(req.params.id);
  return success({ res, message: 'Subcategory deleted.', data: deleted });
});

// Get all subcategories by category ID
const getSubcategoriesByCategory = asyncWrapper(async (req, res) => {
  const subcategories = await subcategoryService.getAllSubcategoriesByCategory(
    req.params.categoryId
  );
  return success({ res, message: 'Subcategories fetched successfully.', data: subcategories });
});

module.exports = {
  createSubcategory,
  getSubcategories,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategoriesByCategory,
};
