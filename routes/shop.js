const express = require('express');
const router = express.Router();

//node core modules
const path = require('path');

const adminData = require('./admin');


router.get('/' , (req, res, next) => {
    res.render('shop' , {prods : adminData.products, docTitle : "My Shop", path : "/"});
})

module.exports = router;