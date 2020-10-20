const express = require('express');

const Problem = require('../../models/Problem');
const asyncWrapper = require('../../middleware/asyncWrapper');

const router = express.Router();

const athenticate = require('../../middleware/athenticate');

router.get('/', athenticate(), asyncWrapper(async (req, res, next) => {
  const problems = await Problem.find({});

  res.render('index', {
    data: problems,
  });
}));

router.post('/', asyncWrapper(async (req, res, next) => {
  //TODO: valid check
  await Problem.create(req.body);

  res.status(201).json({ status: 'ok' });
}));

router.get('/:problem_id', asyncWrapper(async (req, res, next) => {
  const problemId = req.params.problem_id;
  const currentProblem = await Problem.findById({ _id: problemId });

  res.render('article', {
    data: currentProblem,
  });
}));

module.exports = router;
