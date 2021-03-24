const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const vm = require('vm');

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

router.post('/:problem_id', async (req, res) => {
  const func = req.body.solution;
  const problemId = req.params.problem_id;
  const problem = await Problem.find({ id: problemId });
  const tests = problem[0].tests;
  const resultArr = [];
  const sandbox = {
    result: null
  };

  let correctCount = 0;
  let wrongCount = 0;

  try {
    for (let i = 0; i < tests.length; i ++) {
      const code = func + `result = ${tests[i].code}`;
      const context = new vm.createContext(sandbox);
      const script = new vm.Script(code);

      const result = script.runInContext(context);

      resultArr.push(result);

      if (sandbox.result !== tests[i].solution) {
        wrongCount+= 1;
      } else {
        correctCount+= 1;
      }
    }

    if (wrongCount !== 0) {
      res.render('failure', {
        resultArr,
        tests
      });
      return;
    }

    res.render('success', {
      resultArr,
      tests
    });
  } catch (err) {
    res.render('error');
  }
});

module.exports = router;
