const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const { productSchema, updateProductSchema } = require('../../validation/product.schema');

// PRODUCT ROUTES
router.post('/product/create', validate(productSchema), productController.createProduct);
router.get('/product/all', productController.getAllProducts);
router.get('/product/vendor', productController.getProductsByVendorId);
router.get('/product/filter', productController.getFilterProducts);
router.get('/product/details/:id', productController.getProductById);
router.put(
  '/product/update/:id',
  authMiddleware.checkProductOwnership,
  validate(updateProductSchema),
  productController.updateProduct
);
router.delete(
  '/product/delete/:id',
  authMiddleware.checkProductOwnership,
  productController.deleteProduct
);

module.exports = router;
