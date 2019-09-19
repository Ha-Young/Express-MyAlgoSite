const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get('/logout', (req, res, next) => {
  res.render('logout', { title: 'Vanilla'});
});

router.get('/callback',
  passport.authenticate('google'), (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
