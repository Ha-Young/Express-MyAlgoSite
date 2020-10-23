const passport = require('passport');

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
};
