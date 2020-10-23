const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.get('/login', authController.renderLogin);

router.get(
  '/login/github',
  passport.authenticate('github')
);

router.get(
  '/login/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  function(req, res) {
    console.log(req.session);
    console.log('인증완료오 =>', req.user);

    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

router.get(
  '/logout',
  authController.logout
)

module.exports = router;
