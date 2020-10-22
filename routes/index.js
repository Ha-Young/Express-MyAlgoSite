const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const initializePassport = require('../passport-config');
const Users = require('../models/User');
const Problems = require('../models/Problem');
const UserSolution = require('../models/UserSolution');

let users = [];
console.log("USERS", Users);

async function getUserData() {
  try {
    users = await Users.find({});
    console.log("HI", users);
  } catch {
    throw new Error('Error occured while loading Users data from DB');
  }
}
getUserData();

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

/* GET home page. */
router.get('/', checkAuthenticated, async (req, res, next) => {
  //from deserialize...req.user
  console.log("from deserialize", req.user);

  try {
    const problems = await Problems.find({});
    res.render('index', { items: problems });
  } catch {
    //res.render.status()
    console.log("problems loading error");
  }
});

router.get('/problem/:problem_id', checkAuthenticated, async (req, res, next) => {
  try {
    const targetProblem = await Problems.find({ id: req.params.problem_id }).exec();
    const userHistory = await UserSolution.find({ problemId: req.params.problem_id, username: req.user.username }).exec();

    if (targetProblem.length === 0) {
      res.redirect('/');
    } else {
      if (userHistory.length > 0) {
        const codeWritten = userHistory[0].codeWritten;
        res.render('problem', { targetProblem, codeWritten });
      } else {
        res.render('problem', { targetProblem, codeWritten: '' });
      }
    }
  } catch {
    //res.render.status()
    console.log("get problem Id page error");
  }
});

router.post('/problem/:problem_id', checkAuthenticated, async (req, res, next) => {
  console.log(req.params.problem_id);
  const targetProblem = await Problems.find({ id: req.params.problem_id }).exec();
  console.log(targetProblem[0].tests);
  console.log("form으로 들어온 String 코드", req.body.code);
  const stringFunc = req.body.code;
  const anonymousFunc = new Function('return ' + stringFunc);
  const solution = anonymousFunc();//실행할 함수

  try {
    const newUser = new UserSolution({
      problemId: req.params.problem_id,
      username: req.user.username,
      codeWritten: req.body.code
    });
    await newUser.save();
    console.log(await UserSolution.find({}));
  } catch (e) {
    throw new Error("문제 제출 후 DB 저장 에러");
  }

  try {
    const failedTest = {};

    for (let i = 0; i < targetProblem[0].tests.length; i++) {
      const executeFunc = new Function('a', 'return function () { const solution = a; \n return ' + targetProblem[0].tests[i].code + '}');
      const answer = new Function('return ' + targetProblem[0].tests[i].solution);
      const result = executeFunc(solution);

      if (result() !== answer()) {
        failedTest[targetProblem[0].tests[i].code] = targetProblem[0].tests[i].solution;
        if (i === targetProblem[0].tests.length - 1) {
          res.render('failure', { problemId: req.params.problem_id, failedTest });
          return;
        }
      }
    }

    res.render('success');

  } catch (e) {
    console.log(e);
    console.log(e.message)
    console.log("stacK", e.stack)
    res.render('error', { message: "There is error in your code", error: { status: 404, stack: e } })
  }
});

router.get('/login', (req, res, next) => {
  console.log("LOGIN", req.app.get('env'));//development
  res.render('login');
});

router.post('/login', passport.authenticate('local', {//use passport authentication middleware
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true //passport-config에서 넣었던 message
}));

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', async (req, res, next) => {
  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new Users({
      id: Date.now(),
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    await newUser.save();
    console.log(await Users.find({}));
    res.redirect(302, '/login');
  } catch {
    res.redirect('/register');
  }
});

function checkAuthenticated(req, res, next) {//middleware
  console.log('로그인했니', req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
