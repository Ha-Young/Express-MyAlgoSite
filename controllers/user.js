const passport = require('passport');

const ErrorHandler = require('../util/ErrorHandler');
const User = require('../models/User');

exports.getJoin = (req, res, next) => {
  const { user } = req;
  if (user) return res.redirect('/');
  res.render('join', { title: 'JOIN' });
};

exports.postJoin = async (req, res, next) => {
  const {
    body: { username, email, password, confirmPassword },
  } = req;

  if (password !== confirmPassword) {
    return next(new ErrorHandler(400, 'Passwords do not match'));
  }

  try {
    const user = await User({ username, email });
    await User.register(user, password);
    next();
  } catch (err) {
    next(err);
  }
};

exports.getLogin = (req, res, next) => {
  const { user } = req;
  if (user) return res.redirect('/');
  res.render('login', { title: 'LOGIN' });
};

exports.postLogin = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/',
});

exports.getGithubLogin = passport.authenticate('github');

exports.getGithubCallback = passport.authenticate('github', {
  failureRedirect: '/login',
});

exports.postGithubLogin = (req, res, next) => {
  res.redirect('/');
};

exports.getLogout = (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) return next(err);
      req.logout();
      return res.redirect('/');
    });
  }
};
