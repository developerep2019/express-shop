const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

//all the routes will get /admin prefix

router.get('/add-product', adminController.getAddProduct);
router.get('/products' , adminController.getAllProductsAdmin)
router.post('/add-product' , adminController.createAProduct);


module.exports = router;