const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const vm = require('vm');
const problems = require('../models/problems.json');
const _ = require('lodash');

router.get('/', async (req, res, next) => {
  problems.forEach(async el => {
    console.log(el)
    await new Problem(el).save();
  });

  const problemList = await Problem.find();
  res.render('index', { problemList });
});

router.get('/login', (req, res, next) => {
  res.render('socialLogin');
})

router.get('/problem/:problem_id', async (req, res, next) => {
  const problemId = req.params.problem_id;
  await Problem.find({ id: problemId }, (err, problem) => {
    if (err) {
      next(err);
    }
    res.render('problem', { problem });
  });
})

router.post('/problem/:problem_id', async (req, res, next) => {
  const id = req.params.problem_id;
  const codeInput = req.body.codeInput;
  const failureCode = [];
  let passCount = 0;

  const problem = await Problem.findOneAndUpdate({ id }, {
    attemptedCode: codeInput,
    attemptedAt: Date.now()
  }, { new: true }).lean();

  await problem.tests.forEach(test => {
    try {
      const { exampleCode, solution } = test;
      const code = vm.runInThisContext(`${codeInput} ${exampleCode}`);

      if (_.cloneDeep(code) === _.cloneDeep(solution)) {
        passCount++;
        failureCode.push({ exampleCode, solution, passed: '✔' });
      } else {
        failureCode.push({ exampleCode, code, solution, passed: '❌' });
      }
    } catch (err) {
      console.log('in')
      console.log(err)
    }
  })

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

