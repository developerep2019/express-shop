const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

//all the routes will get /admin prefix

// All Routes for Admin --> GET
router.get('/add-product', adminController.getAddProduct);
router.get('/products', adminController.getAllProductsAdmin);
router.get('/edit-product/:productId', adminController.getEditProduct);

// All Routes for Admin --> POST
router.post('/add-product', adminController.createAProduct);
router.post('/edit-product', adminController.postEditProducts);
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;