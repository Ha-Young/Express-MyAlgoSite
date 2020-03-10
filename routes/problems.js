const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/:problem_id', async (req, res, next) => {
  testId = req.params.problem_id;
  const test = await Problem.findOne({ id: testId });
  console.log(test);
  res.render('problem', { test: test });
});

module.exports = router;

