const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
module.exports.getLogin = (req, res, next) => {
  let isLoggedIn = null;
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    docTitle: 'Login',
    isLoggedIn: isLoggedIn,
  });
};

module.exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.redirect('/login');
      }
      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          };
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login')
        })
    })
    .catch((err) => console.log(err));
};

module.exports.postLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};

module.exports.getSignUp = (req, res, next) => {
  res.render('auth/signup', {
    docTitle: 'Sign Up',
    path: '/signup',
    isLoggedIn: req.session.isLoggedIn

  })
}

module.exports.postSignUp = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  UserModel.findOne({ email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPass => {
          const user = new UserModel({
            email,
            password: hashedPass,
            cart: { item: [] }
          });
          return user.save();
        })
        .then(() => {
          res.redirect('/login')
        })
    })
    .catch(err => console.log(err))
};