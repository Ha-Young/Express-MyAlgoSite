const express = require('express');
const router = express.Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
  res.render('login');
});

// auth logout
router.get('/logout', (req, res, next) => {
  // handle with passport
  req.logout(); // ????
  res.redirect('/');
});

// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// 받은 토큰으로 이제 유저 프로필을 받아오자.
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send(req.user);
  res.redirect('/profile/');
});

module.exports = router;
