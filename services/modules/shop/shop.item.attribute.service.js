const ShopItemAttribute = require('@models/modules/shop/shop.attribute.model');
const AppError = require('@utils/appError.util');

// Create a new attribute
const createAttribute = async (data) => {
  const attribute = new ShopItemAttribute(data);
  return await attribute.save();
};

// Get all attributes
const getAllAttributes = async () => {
  return await ShopItemAttribute.find();
};

// Get a specific attribute
const getAttributeById = async (id) => {
  const attribute = await ShopItemAttribute.findById(id);
  if (!attribute) throw new AppError('Attribute not found', 404);
  return attribute;
};

// Update attribute
const updateAttribute = async (id, data) => {
  const updated = await ShopItemAttribute.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new AppError('Attribute not found', 404);
  return updated;
};

// Delete attribute
const deleteAttribute = async (id) => {
  const deleted = await ShopItemAttribute.findByIdAndDelete(id);
  if (!deleted) throw new AppError('Attribute not found', 404);
  return deleted;
};

module.exports = {
  createAttribute,
  getAllAttributes,
  getAttributeById,
  updateAttribute,
  deleteAttribute,
};
