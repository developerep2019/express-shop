//dependencies
const express = require('express')
const app = express();
const adminRoutes = require('./routes/admin.route');
const shopRoutes = require('./routes/shop.route');
const pageNotFoundController = require('./controllers/page-not-found.controller');

//Database and Models
const sequelize = require('./utilities/database');
const ProductModel = require('./models/product.model');
const UserModel = require('./models/user.model');
const CartModel = require('./models/cart.model');
const CartItemModel = require('./models/cartItem.Model');

//setting the view engine and view directory
app.set('view engine', 'ejs');
app.set('views', './views');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
app.use((req, res, next) => {
    UserModel.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err))
})



//routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(pageNotFoundController);


const port = process.env.PORT || 3000;

//Sequelize works
ProductModel.belongsTo(UserModel, { constraints: true, onDelete: 'CASCADE' });
UserModel.hasMany(ProductModel);
UserModel.hasOne(CartModel);
CartModel.belongsTo(UserModel);
CartModel.belongsToMany(ProductModel, { through: CartItemModel });
ProductModel.belongsToMany(CartModel, { through: CartItemModel });

sequelize.sync()
    .then(result => {
        return UserModel.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return UserModel.create({ name: "ethun", email: "developerep2019@gmail.com" });
        }
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(() => {
        app.listen(port, () => console.log(`listening from port ${port}`));
    })
    .catch(err => console.log(err));