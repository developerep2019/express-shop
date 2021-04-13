const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.controller');

//All Routes For Shop --> GET
router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/product/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
// router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);

//All Routes for Shop --> POST
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
router.post('/create-order', shopController.postOrder);



module.exports = router;