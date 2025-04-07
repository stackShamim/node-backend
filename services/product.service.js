// services/productService.js
const Product = require('../models/product.model');
const AppError = require('../utils/appError.util');

// Create a new product
const createProduct = async (productData) => {
  const product = new Product(productData);
  await product.save();
  return product;
};

// Get all products
const getAllProducts = async () => {
  const products = await Product.find().populate('vendorId', 'fullName');
  return products;
};

// Get a product by ID
const getProductById = async (id) => {
  const product = await Product.findById(id).populate('vendorId', 'fullName');
  if (!product) {
    throw new AppError('Product not found.', 404);
  }
  return product;
};

// Get product by vendor ID
const getProductsByVendorId = async (vendorId) => {
  const products = await Product.find({ vendorId }).populate('vendorId', 'fullName');
  return products;
};

// Update product by ID
const updateProduct = async (id, updateData) => {
  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).populate('vendorId', 'fullName');

  if (!product) {
    throw new AppError('Product not found.', 404);
  }

  return product;
};

// Delete a product by ID
const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new AppError('Product not found.', 404);
  }
  return product;
};

// Filter products
const filterProducts = async (filters) => {
  const query = {};

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.vendorId) {
    query.vendorId = filters.vendorId;
  }

  if (filters.isNewProduct !== undefined) {
    query.isNewProduct = filters.isNewProduct === 'true';
  }

  if (filters.hasFreeSample !== undefined) {
    query.hasFreeSample = filters.hasFreeSample === 'true';
  }

  if (filters.isCustomizable !== undefined) {
    query.isCustomizable = filters.isCustomizable === 'true';
  }

  if (filters.inStock === 'true') {
    query.stock = { $gt: 0 };
  }

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) {
      query.price.$gte = parseFloat(filters.minPrice);
    }
    if (filters.maxPrice) {
      query.price.$lte = parseFloat(filters.maxPrice);
    }
  }

  const products = await Product.find(query).populate('vendorId', 'fullName');
  return products;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  filterProducts,
  getProductsByVendorId,
};
