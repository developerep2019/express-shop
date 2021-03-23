//dependencies
const express = require('express')
const app = express();
const adminRoutes = require('./routes/admin.route');
const shopRoutes = require('./routes/shop.route');
const pageNotFoundController = require('./controllers/page-not-found.controller');

// working with database
const mongoConnect = require('./utilities/database').mongoConnect;

//working with users
const UserModel = require('./models/user.model');

//setting the view engine and view directory
app.set('view engine', 'ejs');
app.set('views', './views');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
app.use((req, res, next) => {
    UserModel.findById('60571141e1092745807fd64d')
        .then(user => {
            console.log(`user name : ${user.name}, email : ${user.email}, id : ${user._id}`)
            console.log("cart", user.cart)
            req.user = new UserModel(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err))

})



//routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(pageNotFoundController);

const port = process.env.PORT || 3000;

mongoConnect(() => {

});

app.listen(port, () => console.log(`listening from port ${port}`))

