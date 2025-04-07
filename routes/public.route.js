const express = require('express');
const router = express.Router();

// Controllers
const productController = require('../controllers/product.controller');

// PRODUCT ROUTES
router.get('/product/all', productController.getAllProducts);
router.get('/product/details/:id', productController.getProductById);
router.get('/product/filter', productController.getFilterProducts);


module.exports = router;
