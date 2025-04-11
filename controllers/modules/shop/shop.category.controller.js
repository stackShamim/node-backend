const asyncWrapper = require('@utils/asyncWrapper.util');
const categoryService = require('@services/modules/shop/shop.category.service');
const { success } = require('@utils/response.util');

// Create new category
const createCategory = asyncWrapper(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  return success({ res, message: 'Category created successfully.', data: category });
});

// Get all categories
const getAllCategories = asyncWrapper(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  return success({ res, message: 'Categories fetched successfully.', data: categories });
});

// Get category by ID
const getCategory = asyncWrapper(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  return success({ res, message: 'Category fetched successfully.', data: category });
});

// Update category
const updateCategory = asyncWrapper(async (req, res) => {
  const updated = await categoryService.updateCategory(req.params.id, req.body);
  return success({ res, message: 'Category updated.', data: updated });
});

// Delete category
const deleteCategory = asyncWrapper(async (req, res) => {
  const deleted = await categoryService.deleteCategory(req.params.id);
  return success({ res, message: 'Category deleted.', data: deleted });
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
