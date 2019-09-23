const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.render('logout', { user: req.user });
});

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile ']
}));

router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

module.exports = router;
