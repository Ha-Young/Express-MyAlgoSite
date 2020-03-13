const express = require('express');
const router = express.Router();
const passport = require('passport');
const authorization = require('../middleware/auth');
const Problem = require('../models/Problem');
const problemsData = require('../models/problemsData.json');

router.get('/', authorization, async (req, res, next) => {
  // const problems = await Problem.find();
  // 이부분은 전체 지울것
  // if(!problems.length){
  //   problemsData.forEach(async problem => await Problem(problem).save());
  // }
  // console.log(problemsData[0]);
  // req.session.problems = problemsData;
  // console.log(req.session.problems[0]._id);
  const problems = await Problem.find();
  res.render('index', {
    problems
  });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: '바닐라코딩' });
});

router.get('/login/github',
  passport.authenticate('github'));

router.get('/login/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/'
  }),
);

module.exports = router;
