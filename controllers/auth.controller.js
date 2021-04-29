const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: "postmaster@sandbox52871f9cf2284b08829158f034eea6c4.mailgun.org",
    pass: "9f52b9ec21fbbcb5c52737e075433281-4b1aa784-7d1876fa",
  }
});


module.exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  }
  else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    docTitle: 'Login',
    errorMessage: message
  });
};

module.exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid Email or Password');
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
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  }
  else {
    message = null;
  }
  res.render('auth/signup', {
    docTitle: 'Sign Up',
    path: '/signup',
    errorMessage: message
  })
}

module.exports.postSignUp = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  UserModel.findOne({ email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'E-Mail exists already, please pick a different one');
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
          return transport.sendMail({
            to: email,
            from: 'shop@expressshop.com',
            subject: 'SignUp Complete',
            html: '<h1>Thanks for Creating an account in express shop</h1>'
          })
        })
        .catch(err => {
          console.log(err, "from mail error");
        })
    })
    .catch(err => console.log(err))
};

module.exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  }
  else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    docTitle: 'Reset Password',
    errorMessage: message
  })
}