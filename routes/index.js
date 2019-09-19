const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Problem = require('../models/Problem');
const passport = require('passport');
const auth = require('../middleware/auth');
const vm = require('vm');

router.get('/', auth, async (req, res, next) => {
  if(req.cookies.codeCookie){
    res.clearCookie('codeCookie');
  }
  const target = await User.findOne({ id: Number(req.user.id) });
  if (target) {
    Problem.find(function(err, problem) {
      res.render('index', {
        length: problem.length,
        problem: problem,
        username: req.user.username,
        collect: target.collect_problem
      });
      if (err) {
        throw new Error(e.message);
      }
    });
  }
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/login/github', passport.authenticate('github'));

router.get(
  '/login/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    sucessRedirect: '/'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logOut();
  res.status(301).redirect('/login');
});

router.post('/problems/:problem_id', auth, async (req, res) => {
  const problemInfo = await Problem.findOne({ id: Number(req.params.problem_id) });
  const userInfo = await User.findOne({ id: Number(req.user.id) });

  let result = [];
  let userAnswer = [];

  for (let i = 0; i < problemInfo.tests.length; i++) {
    try {
      code = `${req.body.code} ${problemInfo.tests[i].param}`;
      const script = new vm.Script(code);
      const context = vm.createContext({});
      var answer = script.runInContext(context, { timeout : 10000 });
      userAnswer.push(answer);
      if (answer === problemInfo.tests[i].solution) {
        result.push(true);
      } else {
        result.push(false);
        // throw new Error(
        //   `정답은 ${problemInfo.tests[i].solution}인데 너는 ${answer}가 나왔단다`
        // );
      }
    } catch (e) {
      res.render('failure', {
        username: req.user.username,
        title: problemInfo.title,
        difficulty_level: problemInfo.difficulty_level,
        completed_users: problemInfo.completed_users,
        message: e.message,
        result: '',
        userAnswer: userAnswer
      });
      return;
    }
  }

  function checkTrue(checkVal) {
    return checkVal === true;
  }

  if (result.every(checkTrue)) {
    let dup = true;
    for (let i = 0; i < userInfo.collect_problem.length; i++) {
      if (Number(userInfo.collect_problem[i]) === Number(req.params.problem_id)) {
        dup = false;
      }
    }
    if (dup) {
      await User.findOneAndUpdate(
        { id: Number(req.user.id) },
        { $push: { collect_problem: Number(req.params.problem_id)}}
      );
    }
    res.render('success',{
      username: req.user.username,
      title: problemInfo.title,
      difficulty_level: problemInfo.difficulty_level,
      completed_users: problemInfo.completed_users,
    });
  } else {
    await res.cookie('codeCookie', req.body.code,);
    res.render('failure', {
      username: req.user.username,
      title: problemInfo.title,
      difficulty_level: problemInfo.difficulty_level,
      completed_users: problemInfo.completed_users,
      message: '',
      result: result,
      userAnswer: userAnswer });
  }
});

router.get('/problems/:problem_id', auth, async (req, res, next) => {
  const initValue = req.cookies.codeCookie ? req.cookies.codeCookie : 'function solution(n){return n;}';
  const target = await Problem.findOne({ id: Number(req.params.problem_id) });
  if(target){
    try {
      res.render('problems', {
        id: target.id,
        username: req.user.username,
        title: target.title,
        difficulty_level: target.difficulty_level,
        description: target.description,
        completed_users: target.completed_users,
        tests: target.tests,
        limit : target.limit,
        initValue : initValue
      });
    } catch (e) {
      throw new Error(e.message);
    }
  } else {
    next();
  }
});

module.exports = router;
