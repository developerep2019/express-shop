//dependencies
const express = require('express')
const app = express();
const path = require('path');
const adminRoutes = require('./routes/admin.route');
const shopRoutes = require('./routes/shop.route');
const pageNotFoundController = require('./controllers/page-not-found.controller');

//setting the view engine and view directory
app.set('view engine', 'ejs');
app.set('views', './views');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'))



//routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(pageNotFoundController);


//write test codes here

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening from port ${port}`));