//dependencies
const { EPERM } = require('constants');
const express = require('express');
const app = express();
const path = require('path');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./utilities/path');

//setting the view engine and view directory
app.set('view engine' , 'pug');
app.set('views' , './views');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(rootDir, 'public')))
//routes
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use('/', (req, res, next) => {
    res.status(404).render('page-not-found' , {docTitle : "404 :: Not Found"})
});



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening from port ${port}`));