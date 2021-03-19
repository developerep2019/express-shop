const ProductModel = require('../models/product.model');
module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product',
        {
            docTitle: "Add a product",
            path: '/admin/add-product',
            editingMode: false


        });
};

// module.exports.getEditProduct = (req, res, next) => {
//     const editMode = req.query.edit;
//     if (!editMode) {
//         return res.redirect('/')
//     };
//     const productId = req.params.productId;
//     req.user.getProducts({ where: { id: productId } })
//         .then(product => {
//             if (!product) {
//                 return res.redirect('/')
//             }
//             else {
//                 res.render('admin/edit-product', {
//                     editingMode: editMode,
//                     docTitle: "Edit Product",
//                     prod: product[0],
//                     path: '/edit-product'
//                 })
//             }
//         })
//         .catch(err => console.log(err))
// };

// module.exports.postEditProducts = (req, res, next) => {
//     const { productId, imgUrl, title, description, price } = req.body;
//     ProductModel.findByPk(productId)
//         .then(product => {
//             product.title = title;
//             product.imgUrl = imgUrl;
//             product.description = description;
//             product.price = price;
//             return product.save();
//         })
//         .then(result => res.redirect('/admin/products'))
//         .catch(err => consols.log(err))
// }

//creating a product via this controller function
module.exports.createAProduct = (req, res, next) => {
    const { title, price, description, imgUrl } = req.body;

    const product = new ProductModel(title, price, description, imgUrl)
    product.save()
        .then(() => {
            res.redirect('/admin/products')
        })
};

//Getting all admin products
// module.exports.getAllProductsAdmin = (req, res, next) => {
//     req.user.getProducts()
//         .then((products) => {
//             res.render('admin/products', {
//                 docTitle: `Admin Products`,
//                 prods: products,
//                 path: '/admin/products'
//             })
//         })
//         .catch(err => console.log(err))
// };

// module.exports.postDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     ProductModel.findByPk(prodId)
//         .then(product => {

//             return function () {
//                 product.destroy();
//                 res.redirect('/')
//             }();
//         })
//         .then(res => console.log("DELETED"))
//         .catch(err => console.log(err))
// };