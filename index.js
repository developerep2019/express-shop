//dependencies
const express = require('express')
const app = express();
const adminRoutes = require('./routes/admin.route');
const shopRoutes = require('./routes/shop.route');
const pageNotFoundController = require('./controllers/page-not-found.controller');

// working with database
const mongoConnect = require('./utilities/database').mongoConnect;


//setting the view engine and view directory
app.set('view engine', 'ejs');
app.set('views', './views');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
app.use((req, res, next) => {
    //     UserModel.findByPk(1)
    //         .then(user => {
    //             req.user = user;
    //             next();
    //         })
    //         .catch(err => console.log(err))
    next();
})



//routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(pageNotFoundController);

const port = process.env.PORT || 3000;

mongoConnect(client => {
    console.log(client);
});

app.listen(port)