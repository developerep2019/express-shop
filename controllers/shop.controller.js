const ProductObj = require('../models/product.model');

module.exports.getProducts = (req, res, next) => {
    ProductObj.fetchAll(products => {
        res.render('shop/product-list', {
            docTitle: "welcome to express shop",
            prods: products,
            path: '/products'
        })
    })
};

module.exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    ProductObj.findById(prodId, product => {
        res.render('shop/product-detail', {
            path: '/product-detail',
            prod: product,
            docTitle: `details of ${product.title}`
        })
    })

}

module.exports.getIndex = (req, res, next) => {
    ProductObj.fetchAll(products => {
        res.render('shop/index', {
            docTitle: "welcome to express shop",
            prods: products,
            path: '/'
        })
    })
};

module.exports.getCart = (req, res, next) => {
    res.render('shop/cart', { docTitle: "This is Cart", path: '/cart' })
};

module.exports.postCart = (req, res, next) => {
    const prodId = req.body.prodId;
    console.log(prodId)
    res.redirect('/cart')
}
module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { docTitle: 'Make Your Payment', path: '/checkout' })
}