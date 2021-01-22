const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.controller');


router.get('/' , shopController.getIndex)
router.get('/products' , shopController.getProducts);
router.get('/cart' , shopController.getCart);
router.post('/cart', shopController.postCart)
router.get('/checkout' , shopController.getCheckout);
router.get('/product/:productId' , shopController.getProduct); 

module.exports = router;