const passport = require('passport');

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }

  res.status(301).redirect('/login');
};

exports.isNotLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return res.status(301).redirect('/');

  next();
};

exports.renderLogin = (req, res) => {
  // hangle with passport
  res.render('login');
};

exports.authenticateGoogle = passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login']
});

exports.failureGoogleLogin = passport.authenticate('google', { failureRedirect : '/login' });

exports.successGoogleLogin = (req, res) => {
  // hangle with passport
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};
