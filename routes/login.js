const express = require('express');
const router = express.Router();
const passport = require('passport');

/* const dotenv = require('dotenv');
dotenv.config(); */

router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
);

module.exports = router;