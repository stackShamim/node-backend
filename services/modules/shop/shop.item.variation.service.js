const ShopItemVariation = require('@models/modules/shop/shop.item.variation.model');
const AppError = require('@utils/appError.util');

// Create a new variation
const createVariation = async (data) => {
  const variation = new ShopItemVariation(data);
  return await variation.save();
};

// Get all variations for a specific ShopItem
const getVariationsByItemId = async (shopItemId) => {
  return await ShopItemVariation.find({ shopItemId }).populate('shopItemId', 'name');
};

// Get single variation by ID
const getVariationById = async (id) => {
  const variation = await ShopItemVariation.findById(id).populate('shopItemId', 'name');
  if (!variation) throw new AppError('Item variation not found', 404);
  return variation;
};

// Update variation by ID
const updateVariation = async (id, data) => {
  const updated = await ShopItemVariation.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new AppError('Item variation not found', 404);
  return updated;
};

// Delete variation by ID
const deleteVariation = async (id) => {
  const deleted = await ShopItemVariation.findByIdAndDelete(id);
  if (!deleted) throw new AppError('Item variation not found', 404);
  return deleted;
};

// Replace all variations of a given shopItem
const replaceVariations = async (shopItemId, newVariations) => {
  if (!Array.isArray(newVariations)) return;

  // Remove old ones
  await ShopItemVariation.deleteMany({ shopItemId });

  // Insert new ones
  const variationsWithItemId = newVariations.map((v) => ({
    ...v,
    shopItemId,
  }));

  await ShopItemVariation.insertMany(variationsWithItemId);
};

module.exports = {
  createVariation,
  getVariationsByItemId,
  getVariationById,
  updateVariation,
  deleteVariation,
  replaceVariations,
};
