const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
//const initializePassport = require('../passport-config');
const Users = require('../models/User');
const Problems = require('../models/Problem');
const UserSolution = require('../models/UserSolution');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy({ usernameField: 'email', passwordField: "password" },
  async function (email, password, done) {// email, password는 Field에서 받은 값. authenticate확인 후 done호출
    const user = await Users.find({ email: email }).exec();
    if (user.length === 0) {
      return done(null, false, { message: 'No user with this email address' });
    }

    try {
      const validPassword = await bcrypt.compare(password, user[0].password);
      if (validPassword) {
        return done(null, user[0]);// 성공 -> serializeUser
      } else {
        return done(null, false, { message: 'password incorrect' });
      }
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {// Strategy 성공 시 호출됨
  console.log("serialize", user);   // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {// 매개변수 id는 serializeUser의 done의 인자 user.id를 받은 것
  const a = await Users.find({ id: id}).exec();
  return done(null, a[0]);// 여기의 getUserById(id)가 req.user가 됨
});

/* GET home page. */
router.get('/', checkAuthenticated, async (req, res, next) => {
  console.log("from deserialize", req.user);//from deserialize...req.user
  try {
    const problems = await Problems.find({});
    res.render('index', { items: problems });
  } catch(err) {
    next(err);
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
  } catch(err) {
    next(err);
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

    try {
      const newUser = new UserSolution({
        problemId: req.params.problem_id,
        username: req.user.username,
        codeWritten: req.body.code
      });
      await newUser.save();
      console.log(await UserSolution.find({}));
    } catch (err) {
      next(err);
    }

    res.render('success');

  } catch (e) {
    res.render('error', { message: "There is error in your code", error: { stack: e } })
  }
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
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
    res.redirect(302, '/login');
  } catch(err) {
    next(err);
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
