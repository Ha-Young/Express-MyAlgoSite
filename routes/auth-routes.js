const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.locals.user = req.user;
  res.render('partial/login');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// 받은 토큰으로 이제 유저 프로필을 받아오자.
router.get('/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    console.log(req.user, 'gogogogo')
    res.redirect('/problems');
});

module.exports = router;
