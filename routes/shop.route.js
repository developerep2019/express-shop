const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.controller');


router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/product/:productId', shopController.getProduct);
// router.get('/cart' , shopController.getCart);
router.post('/cart', shopController.postCart)
// router.post('/cart-delete-item', shopController.postCartDeleteProduct)
// router.get('/checkout' , shopController.getCheckout);


module.exports = router;