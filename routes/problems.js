const express = require('express');
const router = express.Router();
const vm = require('vm');
const Problem = require('../models/Problem');
const forwardAuthenticated = require('./middlewares/forwardAuthenticated');

router.get('/:problems_id', forwardAuthenticated, async (req, res, next) => {
  const { id, title, tests } = await Problem.findOne({ id: req.params.problems_id });
  const codeParameterType = findParameterType(tests[0].code);
  res.render('problem', { id, title, codeParameterType });
});

router.post('/:problems_id', forwardAuthenticated, async (req, res, next) => {
  const { id, title, tests } = await Problem.findOne({ id: req.params.problems_id });
  const { userAnswer } = req.body;
  const sandbox = { result: [] };
  let isPass = true;

  vm.createContext(sandbox);

  try {
    for (let i = 0; i < tests.length; i++) {
      await vm.runInContext(userAnswer + `result.push(${tests[i].code});`, sandbox);
      if (sandbox.result[i] !== tests[i].solution) {
        isPass = false;
      }
    }

    const testResult = {
      id,
      title,
      tests,
      result: sandbox.result,
      isPass,
      userAnswer,
    };
    req.session.testResult = testResult;

    if (isPass) res.redirect('/problems/' + req.params.problems_id + '/success');
    res.redirect('/problems/' + req.params.problems_id + '/failure');
  } catch (e) {
    next(e);
  }
});

router.get('/:problems_id/success', forwardAuthenticated, async (req, res, next) => {
  const { id, title, tests, result, isPass, userAnswer } = req.session.testResult;

  res.render('success', { id, title, tests, result, isPass, userAnswer });
});

router.get('/:problems_id/failure', forwardAuthenticated, async (req, res, next) => {
  const { id, title, tests, result, isPass, userAnswer } = req.session.testResult;

  res.render('failure', { id, title, tests, result, isPass, userAnswer });
});

function findParameterType(solution) {
  const param = solution.slice(9, 10);

  if (param === "[") {
    return "array";
  }

  if (typeof Number(param) === 'number') {
    return "n";
  }
}

module.exports = router;
