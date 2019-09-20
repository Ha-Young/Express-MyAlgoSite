const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Problem = require('../models/Problem');
const auth = require('../middleware/auth');
const vm = require('vm');

const {
  getProblemList,
  login,
  loginGithub,
  githubCallback,
  logOut
} = require('./controllers/index.controllers');

router.get('/', auth, getProblemList);

router.get('/login', login);

router.get('/login/github', loginGithub);

router.get('/login/github/callback', githubCallback, function(req, res) {
  res.redirect('/');
});

router.get('/logout', logOut);

module.exports = router;
