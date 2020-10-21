const passport = require('passport');

exports.getLogin = function getLogin(req, res, next) {
  res.render('login');
};

exports.getLogout = function getLogout(req, res, next) {
  req.logout();
  res.redirect('/auth/login');
};

exports.postLogin = passport.authenticate('github');
exports.getGithubCallback = passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
});
