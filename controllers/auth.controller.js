const passport = require('passport');
const User = require('../models/User');
const catchAsync = require('../middlewares/catchAsync');
const generateHeaderData = require('../utils/generateHeaderData');
const validateEmail = require('../utils/validateEmail');

exports.getLoginForm = (req, res) => {
  const headerData = generateHeaderData(req.isAuthenticated(), req.user);
  const title = 'Log In';
  const message = req.flash('error');

  res.render('login', {
    ...headerData,
    title,
    message,
  });
};

exports.authenticateLocal = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth',
  failureFlash: true
});

exports.getSignUpForm = (req, res) => {
  const headerData = generateHeaderData(req.isAuthenticated(), req.user);
  const title = 'Sign Up';
  const message = req.flash('info');

  res.render('signup', {
    ...headerData,
    title,
    message,
  });
};

exports.createUser = catchAsync(async (req, res, next) => {
  if (!validateEmail(req.body.email)) {
    req.flash('info', 'please type valid email');
    return res.redirect('/auth/signup');
  }

  if (await User.findOne({ email: req.body.email })) {
    req.flash('info', 'email already exist');
    return res.redirect('/auth/signup');
  }

  if (await User.findOne({ username: req.body.username })) {
    req.flash('info', 'username already exist');
    return res.redirect('/auth/signup');
  }

  const user = await User.create(req.body);

  req.login(user, (err) => {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
});

exports.logOut = (req, res) => {
  req.logout();
  res.redirect('/');
};
