const express = require('express');
const router = express.Router();
const passport = require('passport');
const problems =  require('../models/sample_problems.json');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: '바닐라코딩', problems });
});

router.get('/problems/:problem_id', (req, res, next) => {
  const id = Number(req.params.problem_id);
  const problem = problems.find(problem => problem.id === id);

  res.render('problemDetail', { problem });
});

router.post('/problems/:problem_id', (req, res, next) => {
  const id = Number(req.params.problem_id);
  const code = req.body.code;

  res.send(code);
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/logout', (req, res, next) => {
  req.logOut();
  res.redirect('/');
});

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', successRedirect: '/' })
);

module.exports = router;
