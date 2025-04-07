// controllers/productController.js
const asyncWrapper = require('../utils/asyncWrapper.util');
const productService = require('../services/product.service');
const { success } = require('../utils/response.util');
const AppError = require('../utils/appError.util');

// POST /products
const createProduct = asyncWrapper(async (req, res) => {
  const product = await productService.createProduct({ ...req.body, vendorId: req.user._id });
  return success({
    res,
    message: 'Product created successfully.',
    data: { product },
  });
});

// GET /products
const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await productService.getAllProducts();
  return success({
    res,
    message: 'Products fetched successfully.',
    data: { products },
  });
});

// GET /products/:id
const getProductById = asyncWrapper(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  return success({
    res,
    message: 'Product fetched successfully.',
    data: { product },
  });
});

// GET product by vendor ID
const getProductsByVendorId = asyncWrapper(async (req, res) => {
  const products = await productService.getProductsByVendorId(req.user._id);
  return success({
    res,
    message: 'Products fetched successfully.',
    data: { products },
  });
});

// PUT /products/:id
const updateProduct = asyncWrapper(async (req, res) => {
  // Update product
  const product = await productService.updateProduct(req.params.id, {
    ...req.body,
    vendorId: req.user._id,
  });
  return success({
    res,
    message: 'Product updated successfully.',
    data: { product },
  });
});

// DELETE /products/:id
const deleteProduct = asyncWrapper(async (req, res) => {
  // Delete product
  await productService.deleteProduct(req.params.id);
  return success({
    res,
    message: 'Product deleted successfully.',
  });
});

// Filter products with query params
const getFilterProducts = asyncWrapper(async (req, res) => {
  const filters = req.query;
  const products = await productService.filterProducts(filters);

  return success({
    res,
    message: 'Filtered products fetched successfully.',
    data: { products },
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFilterProducts,
  getProductsByVendorId,
};
