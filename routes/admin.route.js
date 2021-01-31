const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

//all the routes will get /admin prefix
router.get('/add-product', adminController.getAddProduct);
router.get('/products' , adminController.getAllProductsAdmin)
router.post('/add-product' , adminController.createAProduct);
router.get('/edit-product/:productId' , adminController.getEditProduct);
router.post('/edit-product' , adminController.postEditProducts);
router.post('/delete-product' , adminController.postDeleteProduct);

module.exports = router;