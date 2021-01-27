const ProductObj = require('../models/product.model');

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product',
        {
            docTitle: "Add a product",
            path: '/admin/add-product'


        });
};

//creating a product via this controller function
module.exports.createAProduct = (req, res, next) => {
    const {title, imgUrl, description, price} = req.body;
    //Sending Products to products.model
    const product = new ProductObj(title, imgUrl, description, price);
    product.save();
    res.redirect('/');
};

//Getting all admin products
module.exports.getAllProductsAdmin = (req, res, next) => {
    ProductObj.fetchAll(products => {
        res.render('admin/products' , {
            docTitle : "welcome to express shop",
            prods : products,
            path : '/admin/products'
        })
    })
};