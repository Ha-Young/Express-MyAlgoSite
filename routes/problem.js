const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/:problem_id', async (req, res) => {
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
    problemId,
    completed_users,
    difficulty_level,
    description
  });
});

router.post('/:problem_id', (req, res) => {
  const func = req.body.solution;

  res.render('resultPage', { func });
});

module.exports = router;
