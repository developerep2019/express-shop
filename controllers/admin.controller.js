//dependencies
const { ObjectId } = require('bson');
const ProductModel = require('../models/product.model');

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product',
        {
            docTitle: "Add a product",
            path: '/admin/add-product',
            editingMode: false


        });
};

module.exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/')
    };
    const prodId = req.params.productId;
    ProductModel.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/')
            }
            else {
                res.render('admin/edit-product', {
                    editingMode: editMode,
                    docTitle: "Edit Product",
                    prod: product,
                    path: '/edit-product'
                })
            }
        })
        .catch(err => console.log(err))
};

module.exports.postEditProducts = (req, res, next) => {
    // const { productId, imgUrl, title, description, price } = req.body;
    const { title, price, description, imageUrl, productId } = req.body;

    const product = new ProductModel(title, price, description, imageUrl, productId);
    product.save()
        .then(result => {
            console.log('UPDATED PRODUCT !!')
            res.redirect('/admin/products')
        })
        .catch(err => consols.log(err))
}

//creating a product via this controller function
module.exports.createAProduct = (req, res, next) => {
    const { title, price, description, imageUrl } = req.body;
    const product = new ProductModel(title, price, description, imageUrl)
    product.save()
        .then(() => {
            res.redirect('/admin/products')
        })
};

//Getting all admin products
module.exports.getAllProductsAdmin = (req, res, next) => {
    ProductModel.fetchAll()
        .then((products) => {
            res.render('admin/products', {
                docTitle: `Admin Products`,
                prods: products,
                path: '/admin/products'
            })
        })
        .catch(err => console.log(err))
};

module.exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    ProductModel.deleteById(prodId)
        .then(() => {
            res.redirect("/admin/products");
            console.log('DELETED !!')
        })
        .catch(err => console.log(err));
};