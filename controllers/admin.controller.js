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
    const productId = req.params.productId;

    ProductModel.fetchAll(products => {
        if (!products) {
            return res.redirect('/')
        }
        else {
            const editableProduct = products.find(prod => prod.id === productId)
            res.render('admin/edit-product', {
                docTitle: `Edit Product :: ${editableProduct.title}`,
                path: '/admin/edit-product',
                editingMode: editMode,
                prod: editableProduct
            })
        }
    })
};

module.exports.postEditProducts = (req, res, next) => {
    const { productId, imgUrl, title, description, price } = req.body;
    const updateProduct = new ProductModel(productId, title, imgUrl, description, price);
    updateProduct.save();
    res.redirect('/admin/products');
}

//creating a product via this controller function
module.exports.createAProduct = (req, res, next) => {
    const { title, imgUrl, description, price } = req.body;
    //Sending Products to products.model
    ProductModel.create({
        title: title,
        price: price,
        imgUrl: imgUrl,
        description: description
    })
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.log(err));
};

//Getting all admin products
module.exports.getAllProductsAdmin = (req, res, next) => {
    ProductModel.fetchAll(products => {
        res.render('admin/products', {
            docTitle: "welcome to express shop",
            prods: products,
            path: '/admin/products'
        })
    })
};

module.exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    ProductModel.deleteById(prodId);
    res.redirect('/admin/products');
};