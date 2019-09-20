const passport = require('passport');
const urls = require('../../constants');
require('dotenv').config();

exports.login = (req, res, err) => {
  res.render('login');
};

exports.logout = (req, res, err) => {
  req.logout();
  res.redirect('/');
};

exports.github = passport.authenticate('github', {
  scope: [ 'user: email' ]
});

exports.google = passport.authenticate('google', {
  scope: [urls.googleScope]
});

exports.githubCallback = passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/auth'
});

exports.googleCallback = passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/auth'
});
