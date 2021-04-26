const UserModel = require('../models/user.model');
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
  UserModel.findById('606c7967dc4f1511a80033cd')
    .then((user) => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      req.session.save(err => {
        if (err) console.log(err);
        res.redirect('/');
      });
    })
    .catch((err) => console.log(err));
};

module.exports.postLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
