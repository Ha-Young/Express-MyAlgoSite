const passport = require('passport');

const authenticateUser = (req, res, next) => {
  const isLoggedIn = req.isAuthenticated();

  isLoggedIn ? next() : res.status(301).redirect('/login');
};

const successLogin = passport.authenticate('github', {
  scope: ['profile'],
});

const failedLogin = passport.authenticate('github', {
  failureRedirect: '/login',
  successRedirect: '/',
});

module.exports = {
  successLogin: successLogin,
  failedLogin: failedLogin,
  authenticateUser: authenticateUser,
};
