const products = [];

module.exports.getAddProduct = (req, res, next) => {
    res.render('add-product',
        {
            docTitle: "lets add product",
            path: '/admin/add-product'


        })
};


module.exports.createAProduct = (req, res, next) => {
    products.push({title : req.body.title});
    res.redirect('/')
};

module.exports.getAllProducts = (req, res, next) => {
    res.render('shop' , {prods : products, docTitle : "My Shop", path : "/"});
};

module.exports.products = products;