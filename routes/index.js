const express = require('express');
const passport = require('passport');
const Problem = require('../models/Problem');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const problemList = await Problem.find({});
  res.render('index', { problemList });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/problem/:problem_id', async (req, res, next) => {
  const {
    params: { problem_id: problemId }
  } = req;

  const problem = await Problem.findOne({ id: problemId });

  res.render('problem', { problem });
});

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

module.exports = router;
