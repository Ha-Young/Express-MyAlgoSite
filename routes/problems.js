const express = require('express');
const router = express.Router();
const vm = require('vm');
const Problem = require('../models/Problem');
const forwardAuthenticated = require('./middlewares/forwardAuthenticated');

router.get('/:problems_id', forwardAuthenticated, async (req, res, next) => {
  const problem = await Problem.findOne({ id: req.params.problems_id });
  res.render('problem', { problem: problem });
});

router.post('/:problems_id', forwardAuthenticated, async (req, res, next) => {
  const { id, title, tests } = await Problem.findOne({ id: req.params.problems_id });
  const { userAnswer } = req.body;
  const sandbox = { result: [] };

  vm.createContext(sandbox);

  try {
    for (let i = 0; i < tests.length; i++) {
      await vm.runInContext(userAnswer + `result.push(${tests[i].code});`, sandbox);
    }

    res.render('result', { id, title, tests, testResult: sandbox.result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
