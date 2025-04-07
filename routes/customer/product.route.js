const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const { productSchema, updateProductSchema } = require('../../validation/product.schema');

// PRODUCT ROUTES
router.get('/product/all', productController.getAllProducts);
router.get('/product/filter', productController.getFilterProducts);
router.get('/product/details/:id', productController.getProductById);


module.exports = router;
