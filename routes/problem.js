const express = require('express');
const router = express.Router();

const errors = require('../helpers/error');
const Problem = require('../models/Problem');
const problemController = require('./middlewares/problemController')

const vm = require('vm');
const _ = require('lodash');

router.get('/', async (req, res, next) => {
  try {
    const problemList = await Problem.find();

    res.render('index', { problemList });
  } catch (error) {
    return next(new errors.GeneralError(error));
  }
});

router.get('/problem/:problem_id', async (req, res, next) => {
  const problemId = req.params.problem_id;

  try {
    await Problem.find({ id: problemId }, (err, problem) => {
      res.render('problem', { problem });
    });
  } catch (error) {
    return next(new errors.GeneralError(error));
  }
})

router.post('/problem/:problem_id', problemController.codeGrading);


module.exports = router;
