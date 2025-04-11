const ShopSubcategory = require('@models/modules/shop/shop.subcategory.model');
const AppError = require('@utils/appError.util');

// Create a new subcategory
const createSubcategory = async (data) => {
  const subcategory = new ShopSubcategory(data);
  return await subcategory.save();
};

// Get all subcategories
const getAllSubcategories = async () => {
  return await ShopSubcategory.find().populate('categoryId', 'name');
};

// Get single subcategory by ID
const getSubcategoryById = async (id) => {
  const subcategory = await ShopSubcategory.findById(id).populate('categoryId', 'name');
  if (!subcategory) throw new AppError('Subcategory not found', 404);
  return subcategory;
};

// Update subcategory by ID
const updateSubcategory = async (id, data) => {
  const updated = await ShopSubcategory.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new AppError('Subcategory not found', 404);
  return updated;
};

// Delete subcategory by ID
const deleteSubcategory = async (id) => {
  const deleted = await ShopSubcategory.findByIdAndDelete(id);
  if (!deleted) throw new AppError('Subcategory not found', 404);
  return deleted;
};

// Get all subcategories by category ID
const getAllSubcategoriesByCategory = async (categoryId) => {
  return await ShopSubcategory.find({ categoryId: categoryId }).populate('categoryId', 'name');
};

module.exports = {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
    deleteSubcategory,
    getAllSubcategoriesByCategory,
};
