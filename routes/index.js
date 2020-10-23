const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const vm = require('vm');
const Users = require('../models/User');
const Problems = require('../models/Problem');
const UserSolution = require('../models/UserSolution');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy({ usernameField: 'email', passwordField: "password" },
  async function (email, password, done) {
    const user = await Users.find({ email }).exec();
    if (user.length === 0) {
      return done(null, false, { message: 'No user with this email address' });
    }

    try {
      const validPassword = await bcrypt.compare(password, user[0].password);

      if (validPassword) return done(null, user[0]);
      return done(null, false, { message: 'password incorrect' });
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const a = await Users.find({ id }).exec();
  return done(null, a[0]);
});

/* GET home page. */
router.get('/', checkAuthenticated, async (req, res, next) => {
  try {
    const problems = await Problems.find({});
    res.render('index', { items: problems });
  } catch (err) {
    next(err);
  }
});

router.get('/problem/:problem_id', checkAuthenticated, async (req, res, next) => {
  try {
    const targetProblem = await Problems.find({ id: req.params.problem_id }).exec();
    const userHistory = await UserSolution.find({ problemId: req.params.problem_id, username: req.user.username }).exec();

    if (targetProblem.length === 0) {
      res.redirect('/');
      return;
    }
    if (userHistory.length > 0) {
      const codeWritten = userHistory[0].codeWritten;
      res.render('problem', { targetProblem, codeWritten });
    } else {
      res.render('problem', { targetProblem, codeWritten: undefined });
    }

  } catch (err) {
    next(err);
  }
});

router.post('/problem/:problem_id', checkAuthenticated, async (req, res, next) => {
  const targetProblem = await Problems.find({ id: req.params.problem_id }).exec();
  const stringFuncSubmittedByUser = req.body.code;

  try {
    const failedTest = {};

    for (let i = 0; i < targetProblem[0].tests.length; i++) {
      const code = targetProblem[0].tests[i].code;
      const solution = targetProblem[0].tests[i].solution;
      const context = { result: undefined };
      const executtionScript = stringFuncSubmittedByUser + '\n' + 'result = ' + code;
      const script = new vm.Script(executtionScript);
      vm.createContext(context);
      script.runInContext(context);

      if (context.result !== solution) {
        failedTest[targetProblem[0].tests[i].code] = targetProblem[0].tests[i].solution;
        if (i === targetProblem[0].tests.length - 1) {
          res.render('failure', { problemId: req.params.problem_id, failedTest });
          return;
        }
      }
      else if (i === targetProblem[0].tests.length - 1) {
        try {
          const newUser = new UserSolution({
            problemId: req.params.problem_id,
            username: req.user.username,
            codeWritten: req.body.code
          });
          await newUser.save();
          res.render('success');
        } catch (err) {
          next(err);
        }
      }
    }
  } catch (err) {
    res.render('error', { message: "There is error in your code", error: { stack: err } });
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
  } catch (err) {
    next(err);
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect(302, '/login');
}

module.exports = router;
