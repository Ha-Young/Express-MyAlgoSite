const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('./middleware/auth');

const {
  getProblemList,
  login,
  loginGithub,
  githubCallback,
  logout
} = require('./controllers/index.controllers');

router.get('/', ensureAuthenticated, getProblemList);

router.get('/login', login);

router.get('/login/github', loginGithub);

router.get('/login/github/callback', githubCallback, function(req, res) {
  res.redirect('/');
});

router.get('/logout', logout);

module.exports = router;
