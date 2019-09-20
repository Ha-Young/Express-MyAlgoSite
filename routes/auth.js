const router = require('express').Router();
const passport = require('passport');

// GET /auth/github
router.get(
  '/github',
  passport.authenticate('github')
);

// GET /auth/github/callback
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function(req, res, next) {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
