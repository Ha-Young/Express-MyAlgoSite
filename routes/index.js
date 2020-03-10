const express = require('express');
const router = express.Router();
const passportGithub = require('../auth/github');
const Problem = require('../models/Problem');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    if(!req.user) {
      res.redirect('login');
    } else {
      const problems = await Problem.find();
      problems.sort((a, b) => a.difficulty_level - b.difficulty_level);
      res.render('index', { users: [req.user], problems });
    }
  } catch(err) {
    next(err);
  }
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/auth/github', passportGithub.authenticate('github'));

router.get(
  '/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
