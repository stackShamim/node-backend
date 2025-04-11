const mongoose = require('mongoose');
const ShopItem = require('@models/modules/shop/shop.item.model');
const ShopItemVariation = require('@models/modules/shop/shop.item.variation.model');
const AppError = require('@utils/appError.util');
const shopItemVariationService = require('@services/modules/shop/shop.item.variation.service');

// Create a new shop item
const createItem = async (data) => {
  const item = new ShopItem(data);
  return await item.save();
};

// Get all shop items with category, subcategory, and variations
const getAllItems = async () => {
  return await ShopItem.find()
    .populate('categoryId', 'name')
    .populate('subcategoryId', 'name')
    .populate('variations'); // uses virtual field
};

// Get a single item by ID
const getItemById = async (id) => {
  const item = await ShopItem.findById(id)
    .populate('categoryId', 'name')
    .populate('subcategoryId', 'name')
    .populate('variations');

  if (!item) throw new AppError('Shop item not found', 404);
  return item;
};

// Update an item by ID
const updateItem = async (id, data) => {
  const updated = await ShopItem.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new AppError('Shop item not found', 404);
  return updated;
};

// Delete an item by ID
const deleteItem = async (id) => {
  const deleted = await ShopItem.findByIdAndDelete(id);
  if (!deleted) throw new AppError('Shop item not found', 404);
  return deleted;
};

// Create a new shop item along with its variations
const createItemWithVariations = async (data) => {
  const session = await mongoose.startSession(); // Start a new session

  try {
    session.startTransaction(); // Begin the transaction

    // Create the ShopItem
    const shopItem = new ShopItem(data.shopItemData);
    await shopItem.save({ session });

    // Create associated variations
    const variations = data.variations.map((variation) => ({
      ...variation,
      shopItemId: shopItem._id, // Link variations to the created ShopItem
    }));

    // Save all variations at once
    await ShopItemVariation.insertMany(variations, { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return shopItem; // Return the created ShopItem
  } catch (error) {
    console.error('Error creating shop item and variations:', error);
    // Rollback the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    throw new AppError('Failed to create shop item and variations', 500);
  }
};

// Update shop item and optionally its variations
const updateItemWithVariations = async (id, updateData) => {
  const { variations, ...itemFields } = updateData;

  // Update shop item fields
  const updatedItem = await ShopItem.findByIdAndUpdate(id, itemFields, {
    new: true,
  })
    .populate('categoryId', 'name')
    .populate('subcategoryId', 'name')
    .populate('variations');

  // Replace variations if provided
  if (variations) {
    await shopItemVariationService.replaceVariations(id, variations);
  }

  return updatedItem;
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  createItemWithVariations,
  updateItemWithVariations,
};
