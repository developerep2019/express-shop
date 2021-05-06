//Models
const ProductModel = require('../models/product.model');
const { validationResult } = require('express-validator');

module.exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    docTitle: 'Add a product',
    path: '/admin/add-product',
    editingMode: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};
module.exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  ProductModel.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
      } else {
        res.render('admin/edit-product', {
          editingMode: editMode,
          docTitle: 'Edit Product',
          prod: product,
          path: '/edit-product',
          hasError: false,
          errorMessage: null,
          validationErrors: [],
        });
      }
    })
    .catch((err) => console.log(err));
};

module.exports.postEditProducts = (req, res, next) => {
  const { title, price, description, imageUrl, productId } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array())
    return res.status(422).render('admin/edit-product', {
      editingMode: true,
      docTitle: 'Edit Product',
      prod: {
        title,
        imageUrl,
        price,
        description,
        _id: productId
      },
      hasError: true,
      path: '/edit-product',
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
  ProductModel.findById(productId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      return product.save()
        .then(() => {
          res.redirect('/admin/products');
          console.log('UPDATED PRODUCT');
        })
    })
    .catch((err) => console.log(err));
};

//creating a product via this controller function
module.exports.createAProduct = (req, res, next) => {
  const { title, price, description, imageUrl } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array())
    return res.status(422).render('admin/edit-product', {
      editingMode: false,
      docTitle: 'Add Product',
      prod: {
        title,
        imageUrl,
        price,
        description
      },
      hasError: true,
      path: '/edit-product',
      errorMessage: errors.array()[0].msg
    });
  }
  const product = new ProductModel({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then((result) => {
      console.log('Product Created');
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

//Getting all admin products
module.exports.getAllProductsAdmin = (req, res, next) => {
  ProductModel.find({ userId: req.user._id })
    .then((products) => {
      res.render('admin/products', {
        docTitle: `Admin Products`,
        prods: products,
        path: '/admin/products',
      });
    })
    .catch((err) => console.log(err));
};

module.exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  ProductModel.deleteOne({ _id: prodId, userId: req.user._id })
    .then(() => {
      res.redirect('/admin/products');
      console.log('DELETED !!');
    })
    .catch((err) => console.log(err));
};
