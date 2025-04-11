const asyncWrapper = require('@utils/asyncWrapper.util');
const variationService = require('@services/modules/shop/shop.item.variation.service');
const { success } = require('@utils/response.util');

// Create new item variation
const createVariation = asyncWrapper(async (req, res) => {
  const variation = await variationService.createVariation(req.body);
  return success({ res, message: 'Variation created successfully.', data: variation });
});

// Get all variations for a shop item
const getVariations = asyncWrapper(async (req, res) => {
  const variations = await variationService.getVariationsByItemId(req.params.shopItemId);
  return success({ res, data: variations });
});

// Get a specific variation
const getVariation = asyncWrapper(async (req, res) => {
  const variation = await variationService.getVariationById(req.params.id);
  return success({ res, data: variation });
});

// Update a variation
const updateVariation = asyncWrapper(async (req, res) => {
  const updated = await variationService.updateVariation(req.params.id, req.body);
  return success({ res, message: 'Variation updated.', data: updated });
});

// Delete a variation
const deleteVariation = asyncWrapper(async (req, res) => {
  const deleted = await variationService.deleteVariation(req.params.id);
  return success({ res, message: 'Variation deleted.', data: deleted });
});

module.exports = {
  createVariation,
  getVariations,
  getVariation,
  updateVariation,
  deleteVariation,
};
