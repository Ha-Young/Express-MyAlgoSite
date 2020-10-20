const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' })
);

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
};

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), ensureAuth,
  (req, res, next) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
