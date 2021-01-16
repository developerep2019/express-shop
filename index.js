//dependencies
const { EPERM } = require('constants');
const express = require('express');
const app = express();
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./utilities/path');
const pageNotFoundController = require('./controllers/page-not-found.controller');

//setting the view engine and view directory
app.set('view engine' , 'ejs');
app.set('views' , './views');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(rootDir, 'public')))
//routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/' , pageNotFoundController);



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening from port ${port}`));