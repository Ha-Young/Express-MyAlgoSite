const router = require('express').Router();
const passport = require('passport');

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

router.get('/logout', (req, res, next) => {
  console.log('before', req.session);
  req.logout();
  req.session.destroy();
  console.log('after', req.session);
  res.redirect('/');
});

module.exports = router;
