const express = require('express');
const router = express.Router();
const { verifyUser } = require('./middlewares/verifyUser');
const Problem = require('../models/Problem');
const creatError = require('http-errors');

router.get('/', verifyUser, async (req, res, next) => {
  try {
    const problems = await Problem.find();
    const acceptedRatio = problems.map(problem => {
      if (problem.submission === 0) return 0;

      return ((problem.accepted * 100) / problem.submission).toFixed(2);
    });

    res.render('index', { problems, acceptedRatio });
  } catch (err) {
    next(creatError(500, err));
  }
});

module.exports = router;
