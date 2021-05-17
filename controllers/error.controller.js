module.exports.get404 = (req, res, next) => {
  res.status(404).render('page-not-found', {
    docTitle: '404 :: Not Found',
    path: '/not-found',
  });
};

module.exports.get500 = (req, res, next) => {
  res.status(500).render('500', {
    docTitle: 'Internal server error',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  })
}