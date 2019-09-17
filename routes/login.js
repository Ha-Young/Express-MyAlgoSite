const express = require('express');
const router = express.Router();
const passport = require('passport');
require('dotenv').config();

router.get('/', (req, res, next) => {
  res.render('login', { title: '바닐라코딩' });
});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/'
  })
);
module.exports = router;
