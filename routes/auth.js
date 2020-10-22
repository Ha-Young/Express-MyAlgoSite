const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res, next) => {
  res.render('login', {
    isAuthenticated: req.isAuthenticated()
  });
});

router.get(
  '/login/github',
  passport.authenticate('github')
);

router.get(
  '/login/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = router;
