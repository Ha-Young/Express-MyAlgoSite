const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login', {user: null});
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});  

router.get('/github', passport.authenticate('github', {
  scope: ['profile']
}));

router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.redirect('/auth/login');
  }
});




module.exports = router;
