const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('partial/login', { user: req.user });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/problems');
});

module.exports = router;
