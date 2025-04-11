const asyncWrapper = require('@utils/asyncWrapper.util');
const attributeService = require('@services/modules/shop/shop.item.attribute.service');
const { success } = require('@utils/response.util');

// Create new attribute
const createAttribute = asyncWrapper(async (req, res) => {
  const attribute = await attributeService.createAttribute(req.body);
  return success({ res, message: 'Attribute created successfully.', data: attribute });
});

// Get all attributes for a shop item
const getAttributes = asyncWrapper(async (req, res) => {
  const attributes = await attributeService.getAllAttributes();
  return success({ res, data: attributes });
});

// Get one attribute
const getAttribute = asyncWrapper(async (req, res) => {
  const attribute = await attributeService.getAttributeById(req.params.id);
  return success({ res, data: attribute });
});

// Update attribute
const updateAttribute = asyncWrapper(async (req, res) => {
  const updated = await attributeService.updateAttribute(req.params.id, req.body);
  return success({ res, message: 'Attribute updated.', data: updated });
});

// Delete attribute
const deleteAttribute = asyncWrapper(async (req, res) => {
  const deleted = await attributeService.deleteAttribute(req.params.id);
  return success({ res, message: 'Attribute deleted.', data: deleted });
});

module.exports = {
  createAttribute,
  getAttributes,
  getAttribute,
  updateAttribute,
  deleteAttribute,
};
