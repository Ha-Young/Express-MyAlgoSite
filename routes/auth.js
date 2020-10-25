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
    res.redirect('/');
  }
);

router.get(
  '/logout',
  authController.logout
)

module.exports = router;
