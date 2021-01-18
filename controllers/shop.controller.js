const ProductObj = require('../models/product.model');

module.exports.getProducts = (req, res, next) => {
    
    ProductObj.fetchAll(products => {
        res.render('shop/product-list' , {
            docTitle : "welcome to express shop",
            prods : products,
            path : '/products'
        })
    }) 
};

module.exports.getIndex = (req, res, next) => {
    ProductObj.fetchAll(products => {
        res.render('shop/index' , {
            docTitle : "welcome to express shop",
            prods : products,
            path : '/'
        })
    })
};

module.exports.getCart = (req, res, next) => {
    res.render('shop/cart' , {docTitle : "This is Cart" , path : '/cart'})
};

module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout' , {docTitle : 'Make Your Payment' , path : '/checkout'})
}