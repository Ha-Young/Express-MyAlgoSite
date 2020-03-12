const express = require('express');
const { VM } = require('vm2');

const Problem = require('../models/Problem');
const { isAuthenticated } = require('../routes/middlewares/authorization');
const { setProblemById } = require('../utils/index');

const router = express.Router();

router.get('/:problem_id', isAuthenticated, async (req, res) => {
  const problem = await setProblemById(req, res);

  res.render('problem', {
    problem,
    isLogined: req.isAuthenticated(),
  });
});

router.post('/:problem_id', isAuthenticated, async (req, res) => {
  const problem = await setProblemById(req, res);
  const vm = new VM({ sandbox: {} });
  let result = true;

  try {
    vm.run(`const solution = ${req.body.code};`);
  } catch (error) {
    res.render('result', {
      error,
      problem,
      message: '틀렸습니다',
      isLogined: req.isAuthenticated()
    });
  };

  problem.tests.forEach(test => {
    try {
      const answer = vm.run(test.code);
      result = result && (answer === test.solution)
    } catch (error) {
      res.render('failure', {
        error,
        problem,
        isLogined: req.isAuthenticated()
      });
    };
  });

  res.render(result ? 'success' : 'failure', {
    problem,
    error: undefined,
    isLogined: req.isAuthenticated()
  });
});

module.exports = router;
