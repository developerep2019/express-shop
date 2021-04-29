const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

require('dotenv').config();

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

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
          res.redirect('/login');
          return transport.sendMail({
            to: email,
            from: 'shop@expressshop.com',
            subject: 'SignUp Completed',
            html: '<h1>Thanks for Creating an account in express shop</h1>'
          });
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
};

module.exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    UserModel.findOne({ email: req.body.email })
      .then(user => {
        console.log(user);
        if (!user) {
          req.flash('error', `No Account with Email ${req.body.email}`);
          return res.redirect('/reset')
        }
        user.resetToken = token;
        user.resetTokenExpires = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        res.redirect('/')
        transport.sendMail({
          to: req.body.email,
          from: 'shop@express-shop.com',
          subject: 'password Reset Request',
          html: `
          <p>Password Reset Request</p>
          <p>Please Click this <a href='http://localhost:3000/reset/${token}'>link</a>`
        })
      })
      .catch(err => console.log(err, 'from auth error'))
  })
};

module.exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  UserModel.findOne({ resetToken: token, resetTokenExpires: { $gt: Date.now() } })
    .then(user => {
      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];
      }
      else {
        message = null;
      }
      res.render('auth/new-password', {
        path: '/new-password',
        docTitle: "Enter new Password",
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token
      })
    })
    .catch(err => console.log(err))
}

module.exports.postNewPassword = (req, res, next) => {
  const { newPassword, userId, passwordToken } = req.body;
  console.log(newPassword);
  let resetUser;

  UserModel.findOne({ resetToken: passwordToken, resetTokenExpires: { $gt: Date.now() }, _id: userId })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPass => {
      resetUser.password = hashedPass;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpires = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.redirect('/login')
    })
    .catch(err => console.log(err))

}