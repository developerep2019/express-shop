const ProductObj = require('../models/product.model');

module.exports.getAddProduct = (req, res, next) => {
    res.render('add-product',
        {
            docTitle: "lets add product",
            path: '/admin/add-product'


        })
};


module.exports.createAProduct = (req, res, next) => {
    const product = new ProductObj(req.body.title);
    product.save();
    res.redirect('/')
};


module.exports.getAllProducts = (req, res, next) => {
    const products = ProductObj.fetchAll();
    res.render('shop', { prods: products, docTitle: "My Shop", path: "/" });
};