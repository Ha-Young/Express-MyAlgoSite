const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getHome, getSuccess, getFailure } = require('../controls/problems');
const { getLogin, getLogout, getGithubLogin, getGithubCallback } = require('../controls/users');
const { onlyPrivate, onlyPublic } = require('../middlewares');

/* GET home page. */
router.get('/', getHome);

router.get('/login', onlyPublic, getLogin);

router.get('/logout', onlyPrivate, getLogout);

router.get('/auth/github', onlyPublic, getGithubLogin);

router.get(
  '/auth/github/callback',
  onlyPublic,
  passport.authenticate('github', { failureRedirect: '/login' }),
  getGithubCallback
);

router.get('/success', onlyPrivate, getSuccess);

router.get('/failure', onlyPrivate, getFailure);

module.exports = router;
