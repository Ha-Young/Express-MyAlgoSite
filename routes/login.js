const express = require('express');
const router = express.Router();
var passport = require('passport');

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/', (req, res, next) => {
  res.render('login');
});

module.exports = router;
