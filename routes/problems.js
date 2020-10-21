const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/:problem_id', async function (req, res, next) {
  try {
    const problemList = await Problem.find();
    const problemId = req.params.problem_id;
    const problem = problemList.find(item => item.id === problemId);

    return res.render('problem', {
      problem: problem
    });
  } catch (err) {
    return res.status(400).json({
      error: 'error'
    });
  }
});

router.post('/:problem_id', (req, res, next) => {
  console.log('req', req.body);
});

module.exports = router;
