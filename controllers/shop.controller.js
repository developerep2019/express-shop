const ProductModel = require('../models/product.model');
const CartModel = require('../models/cart.model');

module.exports.getProducts = (req, res, next) => {
    ProductModel.findAll({ raw: true })
        .then((result) => {
            res.render('shop/product-list', {
                docTitle: "Welcome to the shop",
                prods: result,
                path: '/products'
            })

        })
        .catch()
};

module.exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    ProductModel.findByPk(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                docTitle: `Details of ${product.title}`,
                prod: product,
                path: '/products'
            })
        })
}

module.exports.getIndex = (req, res, next) => {
    ProductModel.findAll({ raw: true })
        .then((result) => {
            res.render('shop/index', {
                docTitle: "Welcome to the shop",
                prods: result,
                path: '/'
            })
        })
        .catch()
};

module.exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    ProductModel.findById(prodId, product => {
        CartModel.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};


module.exports.getCart = (req, res, next) => {
    CartModel.getCart(cart => {
        ProductModel.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                docTitle: "This is Cart",
                path: '/cart',
                products: cartProducts

            })
        })
    })
};

module.exports.postCart = (req, res, next) => {
    const prodId = req.body.prodId;
    ProductModel.findById(prodId, product => {
        CartModel.addProduct(prodId, product.price);
    })
    res.redirect('/cart')
};


module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { docTitle: 'Make Your Payment', path: '/checkout' })
};