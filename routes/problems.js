const express = require('express');
const verifyUser = require('./middlewares/authorization').verifyUser;
const router = express.Router();

const DUMMY = require('../models/sample_problems.json');

router.get('/:problem_id', verifyUser, (req, res, next) => {
  const { params: { problem_id } } = req;
  const targetProblem = DUMMY.find((problem) => problem.id === Number(problem_id));
  const testCaseList = targetProblem.tests.map(value => `assertEquals(${value.code}, ${value.solution});` + '\n');

  res.render('problem', { params: problem_id, user: 'TOGGO', list: testCaseList.join(''), problem: targetProblem });
});

router.post('/:problem_id', verifyUser, async (req, res, next) => {
  try {
    const { body: { user_solution }, params: { problem_id } } = req;
    const targetProblem = DUMMY.find((problem) => problem.id === Number(problem_id));
    const testCaseList = targetProblem.tests;
    const solution = new Function(`return ${user_solution.trim()};`)();
    const { message, problem } = await checkSolution(testCaseList, solution);

    if (message === 'Succeed') {
      // DB 연동하여 이미 풀었던 맴버인지 체크 로직 추가
      res.status(201).render('success');
    } else {
      if (!problem.result) problem.result = 'undefined';
      res.status(201).render('failure', { problem });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

function checkSolution(list, solution) {
  return new Promise((resolve, reject) => {
    const failedCase = {};
    const isPassed = list.every((test) => {
      const result = new Function(`solution`, `return ${test.code};`)(solution);
      if (result !== test.solution) {
        failedCase.code = test.code;
        failedCase.result = result;
        failedCase.expected = test.solution;
      }
      return result === test.solution;
    })

    if (isPassed) {
      resolve({ message: 'Succeed' });
    } else {
      resolve({ message: 'Failed', problem: failedCase });
    }
  });
}

/*

function solution(num) {
  if(num < 2) return num;
  return solution(num-1) + solution(num-2);
}

function solution(n) {
	if(n === 0) return 0;
	if(n === 1) return 1;
  return solution(n - 1) + solution(n - 2)
};

function solution(array) {
	const position	= array.indexOf('Kim');
  return `김서방은 ${position}에 있다`;
}

*/