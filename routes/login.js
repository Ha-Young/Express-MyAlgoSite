const express = require('express');
const router = express.Router();
const passport = require('passport');
require('dotenv').config();

router.get('/', (req, res, next) => {
  console.log('로그인라우터의 콘솔입니다', req.isAuthenticated());
  res.render('login', { title: '바닐라코딩' });
});

router.get('/github',
  passport.authenticate('github'));

// router.get('/github/callback',
//   passport.authenticate('github', {
//     failureRedirect: '/login',
//     successRedirect: '/'
//   }),
// );

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    console.log('깃험요청이 성공했을경우 뜨게됨');
    res.redirect('/');
  }
);

module.exports = router;
