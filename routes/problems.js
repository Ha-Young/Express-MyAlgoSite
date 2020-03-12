const express = require('express');
const { VM } = require('vm2');

const Problem = require('../models/Problem');

const router = express.Router();

router.get('*', (req, res, next) => {
  if (req.session.isLogined) {
    next();
  } else {
    res.render('login', {
      isLogined: req.session.isLogined,
      message: '로그인이 필요합니다'
    });
  }
});

router.get('/:problem_id', async (req, res) => {
  const problem = (await Problem.find({ id: req.params.problem_id }))[0];
  res.render('problem', {
    problem,
    isLogined: req.session.isLogined,
  });
});

router.post('/:problem_id', async (req, res) => {
  const result = [];
  const problem = (await Problem.find({ id: req.params.problem_id }))[0];
  const vm = new VM({ sandbox: {} });
  vm.run(`const solution = ${req.body.code};`);

  problem.tests.forEach(test => {
    const answer = vm.run(test.code);
    if (answer === test.solution) {
      result.push(true);
    } else {
      result.push(false);
    }
  });

  if (result.some(res => !res)) {
    res.render('result', {
      isLogined: req.session.isLogined,
      message: '틀렸습니다',
      problem
    });
  } else {
    res.render('result', {
      isLogined: req.session.isLogined,
      message: '맞았습니다',
      problem
    });
  }
});

module.exports = router;
