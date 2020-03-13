const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const sampleProblems = require('../models/sample_problems');

router.get('/', async (req, res, next) => {
  try {
    sampleProblems.forEach(async problem => await Problem(problem).save());
    const allProblems = await Problem.find();
    res.render('index', { allProblems });
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

module.exports = router;
