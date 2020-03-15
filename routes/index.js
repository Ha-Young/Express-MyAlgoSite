const express = require('express');
const router = express.Router();

const Problem = require('../models/Problem');
const problems = require('../models/problems.json');

/* GET home page. */
const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/auth/login');
};

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const problemsInDataBase = await Problem.find();

    if (!problemsInDataBase.length) {
      problemsParse.forEach(async problem => await new Problem(problem).save());
    }

    res.render('index', {
      user: req.user.username,
      problems
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
