const express = require('express');
const passport = require('passport');
const verifyUser = require('./middlewares/authorization').verifyUser;

const router = express.Router();

/* GET home page. */
router.get('/', verifyUser, (req, res, next) => {
  res.render('index', { title: '바닐라코딩' });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

router.get('/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

module.exports = router;
