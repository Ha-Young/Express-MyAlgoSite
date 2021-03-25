const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);
// TODO 구글링해서 더 안전?하게 로그아웃 하는 방법으로 바꿔야함. 지금 방법은 로그아웃 제대로 안되는듯.. 쿠키가 안날라가는거같다.
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
})

module.exports = router;
