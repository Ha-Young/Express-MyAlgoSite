const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

router.get(
  '/google/redirect',
  passport.authenticate('google', { failureReirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
