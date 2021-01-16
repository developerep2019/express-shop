const express = require('express');
const router = express.Router();

const path = require('path');

//utilities
const rootDir = require('../utilities/path');

const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {docTitle : "Add a product" , path : '/admin/add-product'})
});

router.post('/add-product', (req, res, next) => {
    products.push({title : req.body.title})
    res.redirect('/')
});


module.exports.routes = router;
module.exports.products = products;