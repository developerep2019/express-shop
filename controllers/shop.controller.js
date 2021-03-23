const ProductModel = require('../models/product.model');
// const CartModel = require('../models/cart.model');


module.exports.getProducts = (req, res, next) => {
    ProductModel.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                docTitle: "Welcome to the shop",
                prods: products,
                path: '/products'
            })

        })
        .catch(err => console.log(err))
};

module.exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    ProductModel.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                docTitle: `Details of ${product.title}`,
                prod: product,
                path: '/products'
            })
        })
}

module.exports.getIndex = (req, res, next) => {
    ProductModel.fetchAll()
        .then((result) => {
            res.render('shop/index', {
                docTitle: "Welcome to the shop",
                prods: result,
                path: '/'
            })
        })
        .catch(err => console.log(err));
};

module.exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    ProductModel.findById(prodId, product => {
        CartModel.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};


module.exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        docTitle: "This is Cart",
                        path: '/cart',
                        products: products
                    })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        })
};

module.exports.postCart = (req, res, next) => {
    const prodId = req.body.prodId;
    ProductModel.findById(prodId).then(product => {
        return req.user.addToCart(product)
    }).then(result => {
        console.log(result)
    })
    // let fetchedCart;
    // req.user.getCart()
    //     .then(cart => {
    //         fetchedCart = cart;
    //         return cart.getProducts({ where: { id: prodId } });

    //     })
    //     .then(products => {
    //         let product;
    //         if (products.length > 0) {
    //             product = products[0];
    //         }
    //         let newQty = 1;

    //         if (product) {
    //             // ...
    //         }
    //         return ProductModel.findByPk(prodId)
    //             .then(poduct => {
    //                 return fetchedCart.addProduct(product, { through: { quantity: newQty } })
    //             })
    //             .catch(err => console.log(err))
    //     })
    //     .catch(err => console.log(err))
};


module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { docTitle: 'Make Your Payment', path: '/checkout' })
};