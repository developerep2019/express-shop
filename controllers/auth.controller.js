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
  req.session.isLoggedIn = true;
  res.redirect('/');
};
