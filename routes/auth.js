const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
