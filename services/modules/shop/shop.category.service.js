const  ShopCategory  = require('@models/modules/shop/shop.category.model');
const AppError = require('@utils/appError.util');

// Create a new category
const createCategory = async (data) => {
  const category = new ShopCategory(data);
  return await category.save();
};

// Get all categories
const getAllCategories = async () => {
  return await ShopCategory.find();
};

// Get single category by ID
const getCategoryById = async (id) => {
  const category = await ShopCategory.findById(id);
  if (!category) {
    throw new AppError('Category not found', 404);
  }
  return category;
};

// Update category by ID
const updateCategory = async (id, data) => {
  const updated = await ShopCategory.findByIdAndUpdate(id, data, { new: true });
  if (!updated) {
    throw new AppError('Category not found', 404);
  }
  return updated;
};

// Delete category by ID
const deleteCategory = async (id) => {
  const deleted = await ShopCategory.findByIdAndDelete(id);
  if (!deleted) {
    throw new AppError('Category not found', 404);
  }
  return deleted;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
