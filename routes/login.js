const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/', (req, res) => {
  res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// auth with google+
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

// callback route for google to redirect to
router.get(
  '/google/redirect',
  passport.authenticate('google', { failureReirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
