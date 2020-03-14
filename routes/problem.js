const express = require('express');
const router = express.Router();
const { VM } = require('vm2');
const vm = new VM();
const _ = require('lodash');
const Problem = require('../models/Problem');
const errors = require('../lib/errors');

router.get('/:problem_id', async (req, res, next) => {
  try {
    const problemInfo = await Problem.findById(req.params.problem_id).lean();
    res.render('problem', { problemInfo });
  } catch(err) {
    if (err.name === 'CastError') {
      return next(new errors.NotFoundError());
    }
    next(err);
  }
})

router.post('/:problem_id', async (req, res, next) => {
  try {
    const { submitCode } = req.body;
    const problemInfo = await Problem.findById(req.params.problem_id).lean();
    const testList = problemInfo.tests;
    const failureList = [];
    let isFailure = false;

    vm.run(submitCode);

    const testRun = (test) => {
      if (!_.isEqual(vm.run(test.code), test.solution)) {
        if (!isFailure) isFailure = true;
        failureList.push({
          testCode: test.code,
          expected: test.solution,
          instead: String(vm.run(test.code))
        })
      }
    };

    testList.forEach(testRun);

    if (isFailure) {
      res.render('failure', { failureList });
    } else {
      res.render('success');
    }
  } catch (err) {
    if (err instanceof ReferenceError) {
      res.render('failure', { error: err });
    }
    if (err instanceof SyntaxError) {
      res.render('failure', { error: err });
    }
    next(err);
  }
})

module.exports = router;
