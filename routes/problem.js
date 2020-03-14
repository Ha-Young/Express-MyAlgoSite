const express = require('express');
const router = express.Router();

const errors = require('../helpers/error');
const Problem = require('../models/Problem');

const vm = require('vm');
const _ = require('lodash');

router.get('/', async (req, res, next) => {
  const problemList = await Problem.find();
  try {
    res.render('index', { problemList });
  } catch (error) {
    next(new errors.GeneralError(error));
  }
});

router.get('/problem/:problem_id', async (req, res, next) => {
  const problemId = req.params.problem_id;

  try {
    await Problem.find({ id: problemId }, (err, problem) => {
      res.render('problem', { problem });
    });
  } catch (error) {
    next(new errors.GeneralError(error));
  }
})

router.post('/problem/:problem_id', async (req, res, next) => {
  const id = req.params.problem_id;
  const codeInput = req.body.codeInput;

  const problem = await Problem.findOneAndUpdate({ id }, {
    attemptedCode: codeInput,
    attemptedAt: Date.now()
  }, { new: true }).lean();

  const failureCode = [];
  let passCount = 0;

  try {
    await problem.tests.forEach(test => {
      const { exampleCode, solution } = test;
      const code = vm.runInThisContext(`${codeInput} ${exampleCode}`);

      if (_.cloneDeep(code) === _.cloneDeep(solution)) {
        failureCode.push({
          exampleCode,
          solution,
          passed: '✔'
        });
        passCount++;
      } else {
        failureCode.push({
          exampleCode,
          code,
          solution,
          passed: '❌'
        });
      }
    })

  } catch (error) {
    return next(new errors.ValidationError(error));
  }

  if (passCount === problem.tests.length) {
    res.render('result', {
      result: 'Good job!',
      failureCode: null,
      passCount,
      id
    });
  } else {
    res.render('result', {
      result: 'Need improvement..',
      failureCode,
      passCount,
      id
    });
  }
})

module.exports = router;
