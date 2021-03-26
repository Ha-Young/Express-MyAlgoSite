const passport = require('passport');

exports.get = (req, res, next) => {
  res.render('signIn');
};

exports.postLocal = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign-in',
  failureFlash: true,
});

exports.getGithub = passport.authenticate('github', {
  scope: [ 'user:email' ]
});

exports.postGithub = passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/sign-in',
  failureFlash: true,
});
