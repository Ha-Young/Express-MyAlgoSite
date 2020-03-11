const express = require('express');
const router = express.Router();

// const inputProblems = require('../models/inputProblems');
const Problem = require('../models/Problem');
const sample_problems = require('../models/sample_problems.json')

/* GET home page. */
const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/auth/login');
};

router.get('/', isAuthenticated, async (req, res, next) => {
  const problems = JSON.parse(JSON.stringify(sample_problems));
  const problemsParse = await Problem.find();

  if (!problemsParse.length) {
    problems.forEach(async problem => await new Problem(problem).save());
  } 
  res.render('index', { user: req.user.username });
});

module.exports = router;
