const express = require('express');
const passport = require('passport');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/', loginController.renderLoginPage);

router.get(
  '/github',
  passport.authenticate('github', { failureRedirect: '/login' })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/',
  })
);

router.get('/github/logout', loginController.logout);

module.exports = router;
