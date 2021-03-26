const passport = require('passport');
const User = require('../models/User');
const catchAsync = require('../middlewares/catchAsync');
const validateEmail = require('../utils/validateEmail');
const generateStatusData = require('../utils/generateStatusData');

exports.getLoginForm = (req, res) => {
  const statusData = generateStatusData(req.isAuthenticated(), req.user);
  const title = 'Log In';
  const message = req.flash('error');

  res.render('login', {
    ...statusData,
    title,
    message,
  });
};

exports.authenticateLocal = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
});

exports.getSignUpForm = (req, res) => {
  const statusData = generateStatusData(req.isAuthenticated(), req.user);
  const title = 'Sign Up';
  const message = req.flash('info');

  res.render('signup', {
    ...statusData,
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
  req.session.destroy();
  res.redirect('/');
};

exports.checkAuthentication = (req, res, next) => {
  if (req.path.includes('logout')) {
    if (req.isAuthenticated()) {
      return next();
    }

    return res.redirect('/');
  }

  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  return next();
};
