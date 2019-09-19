const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google',
function (req, res, next) {
  next();
},
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


router.get('/google/callback',
  function (req, res, next){
    next();
  },
  passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/' })
);

module.exports = router;
