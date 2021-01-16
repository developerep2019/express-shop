const express = require('express');
const router = express.Router();

const productController = require('../controllers/products.controller.js')


router.get('/add-product', productController.getAddProduct);

router.post('/add-product' , productController.createAProduct);


module.exports = router;