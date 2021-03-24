const passport = require('passport');
const User = require('../models/User');
const catchAsync = require('../middlewares/catchAsync');

exports.getLoginForm = (req, res) => {
  const flashMessage = req.flash().error?.[0] ?? '';

  res.render('login', {
    title: 'Login',
    flashMessage,
  });
};

exports.authenticateLocal = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth',
  failureFlash: true
});

exports.getSignUpForm = (req, res) => {
  res.render('signup', { message: req.flash('info') });
};

exports.createUser = catchAsync(async (req, res, next) => {
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
