const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET login page. */
router.get('/login', (req, res, next) => {
  res.render('login', { title: '바닐라코딩' });
});

// router.get('/login/github', passport.authenticate('github'));

router.get('/login/github', 
  passport.authenticate('github', { failureRedirect: '/login' }), 
  (req, res) => {
    res.redirect('/');
  });

/* GET home page. */
router.get('/', 
  require('connect-ensure-login').ensureLoggedIn(),
  (req, res, next) => {
    res.render('index', {
      title: '바닐라코딩',
      username: res.req.user.nickname,
      platformName: res.req.user.platform_name,
      profileImageUrl: res.req.user.profile_image_url
    });
  });

module.exports = router;
