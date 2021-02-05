const ProductModel = require('../models/product.model');
const CartModel = require('../models/cart.model');
module.exports.getProducts = (req, res, next) => {
    ProductModel.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/product-list' , {
            docTitle : "All Products",
            prods : rows,
            path : '/products'
        })
    })
};

module.exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    ProductModel.findById(prodId)
    .then(([product]) => {
        res.render('shop/product-detail' , {
            docTitle : `details of ${product[0].title}`,
            path : '/product',
            prod : product[0]
        })
    })
    .catch(err => console.log(err));


}

module.exports.getIndex = (req, res, next) => {
    ProductModel.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/index' , {
            prods : rows,
            docTitle : "Shop",
            path : '/'
        })
    })
    .catch(err => {
        console.log(err)
    })
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
            for(product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData) {
                    cartProducts.push({productData : product, qty : cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                docTitle: "This is Cart",
                path: '/cart',
                products : cartProducts

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