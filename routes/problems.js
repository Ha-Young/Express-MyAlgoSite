const express = require('express');
const verifyUser = require('./middlewares/authorization').verifyUser;

const Problem = require('../models/Problem');
const User = require('../models/User');

const router = express.Router();

router.get('/:problem_id', verifyUser, async (req, res, next) => {
  const { params: { problem_id } } = req;
  try {
    const targetProblem = await Problem.findById(problem_id);
    const testCaseList = targetProblem.tests.map(value => `assertEquals(${value.code}, ${value.solution});` + '\n');

    res.render('problem', { params: problem_id, user: 'TOGGO', list: testCaseList.join(''), problem: targetProblem });
  } catch (error) {
    next(error);
  }
});

router.post('/:problem_id', verifyUser, async (req, res, next) => {
  const { body: { user_solution }, params: { problem_id }, user } = req;
  try {
    const targetProblem = await Problem.findById(problem_id);
    const solution = new Function(`return ${user_solution.trim()};`)();
    const { message, failedCase } = await checkSolution(targetProblem.tests, solution);

    if (message === 'Succeed') {
      const isUser = targetProblem.compledted_user_ids.includes(user._id);

      if (!isUser) {
        const count = targetProblem.completed_users += 1;
        await Problem.updateOne({ _id: problem_id }, {
          $push: { compledted_user_ids: [user._id] },
          completed_users: count
        });
        await User.updateOne({ _id: user._id }, {
          $push: { solutions: [{ problem_id, solution: user_solution }] }
        });
      }
      res.status(200).render('success');
    } else {
      if (!failedCase.result) failedCase.result = 'undefined';
      res.status(200).render('failure', { failedCase });
    }
  } catch (error) {
    next(error);
  }
});

function checkSolution(list, solution) {
  return new Promise((resolve, reject) => {
    const failedCase = {};
    const isPassed = list.every((test) => {
      const result = new Function('solution', `return ${test.code};`)(solution);
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
      resolve({ message: 'Failed', failedCase });
    }
  });
}

module.exports = router;
