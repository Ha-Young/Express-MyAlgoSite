const express = require('express');
const router = express.Router();
const { verifyUser } = require('./middlewares/verifyUser');
const Problem = require('../models/Problem');

router.get('/', verifyUser, (req, res, next) => {
  res.render('problem');
});

router.get('/:problem_id', verifyUser, async (req, res, next) => {
  console.log('in problem_id')
  const targetProblemId = parseInt(req.params['problem_id']);

  const targetProblem = await Problem.findOne({ id: targetProblemId });
  console.log(targetProblemId)
  console.log(targetProblem)
  res.status(200).render('problem', { problem: targetProblem });
});

router.post('/:problem_id', verifyUser, (req, res, next) => {
  
});

module.exports = router;
