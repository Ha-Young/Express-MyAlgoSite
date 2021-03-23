const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/:problem_id', async (req, res, next) => {
  const problemId = req.params.problem_id;
  const problem = await Problem.find({ id: problemId });
  const {
    title,
    completed_users,
    difficulty_level,
    description
  } = problem[0];

  res.render('problem', {
    title,
    completed_users,
    difficulty_level,
    description
  });
});

module.exports = router;
