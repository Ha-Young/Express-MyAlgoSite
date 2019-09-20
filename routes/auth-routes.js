const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

router.get(
  '/google/redirect',
  function(req, res, next) {
    next();
  },
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
