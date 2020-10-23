const express = require('express');
const router = express.Router();
const passport = require('passport');
const loginController = require('./controllers/login.controller');
const { isLoggedIn } = require('./middlewares/authorization');

router.get('/', loginController.renderLoginTemplate);

router.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  isLoggedIn,
  loginController.redirectToMain
);

router.get('/logout', isLoggedIn, loginController.logout);

module.exports = router;
