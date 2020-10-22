const vm = require('vm');

const Problem = require('../../models/Problem');
const User = require('../../models/User');

const RequestError = require('../error/RequestError');
const { VIEWS, TEST } = require('../../constants');

exports.getAllProblems = async function getAllProblems(req, res, next) {
  const { query: { filter }, user } = req;
  const options = {};
  if (filter) options.difficulty_level = filter;
  try {
    const list = await Problem.find(options).lean().exec();
    res.render(VIEWS.HOME, { title: 'Codewars', user: user.display_name, list });
  } catch (error) {
    next(error);
  }
};

exports.getProblem = async function getProblem(req, res, next) {
  const { params: { problem_id }, user } = req;
  try {
    const targetProblem = await Problem.findById(problem_id);
    const testCaseList = targetProblem.tests.map(value => `assertEquals(${value.code}, ${value.solution});` + '\n');

    res.render(VIEWS.PROBLEM, { params: problem_id, user: user.display_name, list: testCaseList.join(''), problem: targetProblem });
  } catch (error) {
    next(error);
  }
};

exports.postSolution = async function postSolution(req, res, next) {
  const { body: { user_solution }, params: { problem_id }, user } = req;
  try {
    const targetProblem = await Problem.findById(problem_id);
    const { testResult, failedCase } = await checkSolution(targetProblem.tests, user_solution);

    switch (testResult) {
      case TEST.SUCCEED:
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
        res.status(200).render(VIEWS.SUCCESS);
        return;
      case TEST.FAILED:
        failedCase.result = 'undefined';
        res.status(200).render(VIEWS.FAILURE, { failedCase });
        return;
      case TEST.EXECUTION_ERROR:
        res.status(200).render(VIEWS.FAILURE, { failedCase });
        return;
      default:
        throw RequestError.badRequest();
    }
  } catch (error) {
    next(error);
  }
}

function checkSolution(list, solution) {
  return new Promise((resolve, reject) => {
    const failedCase = {};
    try {
      const isPassed = list.every((test) => {
        const testCode = solution + test.code;
        const result = vm.runInNewContext(testCode, {}, {
          timeout: 5000,
        });

        if (result !== test.solution) {
          failedCase.code = test.code;
          failedCase.result = result;
          failedCase.expected = test.solution;
        }
        return result === test.solution;
      });

      if (isPassed) {
        resolve({ testResult: TEST.SUCCEED });
      } else {
        resolve({ testResult: TEST.FAILED, failedCase });
      }
    } catch (error) {
      failedCase.message = error.message;
      resolve({ testResult: TEST.EXECUTION_ERROR, failedCase });
    }
  })
}
