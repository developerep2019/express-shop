//dependencies
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
require('dotenv').config();

//app initialization
const app = express();
const csrfProtection = csrf();

//envirement variables -->
const uri = process.env.MONGO_URI;

// Global Routes
const adminRoutes = require('./routes/admin.route');
const shopRoutes = require('./routes/shop.route');
const errorControllers = require('./controllers/error.controller');
const authRoutes = require('./routes/auth.route');

//working with users
const UserModel = require('./models/user.model');

// working with sessions {connect-mongodb-session => store}
const store = new MongoDBStore({
  uri,
  collection: 'sessions',
});
//setting the view engine and view directory
app.set('view engine', 'ejs');
app.set('views', './views');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
app.use(
  session({
    secret: 'xZI9M57QreeUopF0',
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  UserModel.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
});
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
})

//routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.get('/500', errorControllers.get500);
app.use(errorControllers.get404);

const port = process.env.PORT || 3000;

//mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose
  .connect(uri)
  .then((result) => {
    app.listen(port, () => console.log(`listening from port ${port}`));
  })
  .catch((err) => console.log(err));
