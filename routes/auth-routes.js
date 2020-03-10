const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  res.send('logging out')
});

router.get('/github', passport.authenticate('github', {
  scope: ['profile']
}));

router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.redirect('/auth');
  }
});




module.exports = router;
