const asyncWrapper = require('@utils/asyncWrapper.util');
const itemService = require('@services/modules/shop/shop.item.service');
const { success } = require('@utils/response.util');

// Create new shop item
const createItem = asyncWrapper(async (req, res) => {
  const item = await itemService.createItem(req.body);
  return success({ res, message: 'Shop item created successfully.', data: item });
});

// Get all items
const getAllItems = asyncWrapper(async (_req, res) => {
  const items = await itemService.getAllItems();
  return success({ res, message: 'Shop items fetched successfully.', data: items });
});

// Get single item
const getItem = asyncWrapper(async (req, res) => {
  const item = await itemService.getItemById(req.params.id);
  return success({ res, message: 'Shop item fetched successfully.', data: item });
});

// Update item
const updateItem = asyncWrapper(async (req, res) => {
  const updated = await itemService.updateItem(req.params.id, req.body);
  return success({ res, message: 'Shop item updated.', data: updated });
});

// Delete item
const deleteItem = asyncWrapper(async (req, res) => {
  const deleted = await itemService.deleteItem(req.params.id);
  return success({ res, message: 'Shop item deleted.', data: deleted });
});

// Create new shop item and its variations
const createItemWithVariations = asyncWrapper(async (req, res) => {
  const { shopItemData, variations } = req.body; // Extract data from request
  const shopItem = await itemService.createItemWithVariations({
    shopItemData,
    variations,
  });

  return success({
    res,
    message: 'Shop item and variations created successfully.',
    data: shopItem,
  });
});

// Update item with variations
const updateItemWithVariations = asyncWrapper(async (req, res) => {
  const updated = await itemService.updateItemWithVariations(req.params.id, req.body);
  return success({ res, message: 'Shop item updated.', data: updated });
});

module.exports = {
  createItem,
  getAllItems,
  getItem,
  updateItem,
  deleteItem,
  createItemWithVariations,
  updateItemWithVariations,
};
