const express = require('express');
const router = express.Router();

const Problem = require('../models/Problem');
const problems = require('../models/problems.json');

const app = express();

/* GET home page. */
const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/auth/login');
};

router.get('/', isAuthenticated, async (req, res, next) => {
  const problemsParse = JSON.parse(JSON.stringify(problems));
  const problemsInDataBase = await Problem.find();

  // app.locals.title = "home";
  // app.locals.user = req.user.username;
  // app.locals.problems = problemsParse;

  // console.log('/ res' , app)

  if (!problemsInDataBase.length) {
    problemsParse.forEach(async problem => await new Problem(problem).save());
  } 
  // res.render('index');

  res.render('index', {
    user: req.user.username,
    problems: problemsParse,
    title: "home"
  });
});

module.exports = router;
