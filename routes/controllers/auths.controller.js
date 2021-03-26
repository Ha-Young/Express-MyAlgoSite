const passport = require("passport");

exports.fetchGoogleAccessToken = passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
);

exports.fetchGoogleUser = passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/login'
  }
);

exports.logout = function (req, res, next) {
  req.logout();
  res.redirect('/login');
}
