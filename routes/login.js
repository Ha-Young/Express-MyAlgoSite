const express = require('express');
const router = express.Router();
const passport = require('passport');
const { verifyAuth } = require('./middlewares/authorization')
router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), verifyAuth,
  (req, res, next) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
