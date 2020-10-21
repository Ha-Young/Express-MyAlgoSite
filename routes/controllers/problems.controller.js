const vm = require('vm');

const Problem = require('../../models/Problem');
const User = require('../../models/User');

exports.getAllProblems = async function getAllProblems(req, res, next) {
  const { query: { filter }, user } = req;
  const options = {};
  if (filter) options.difficulty_level = filter;
  try {
    const list = await Problem.find(options).lean().exec();
    res.render('index', { title: 'Codewars', user: user.display_name, list });
  } catch (error) {
    next(error);
  }
};

exports.getProblem = async function getProblem(req, res, next) {
  const { params: { problem_id } } = req;
  try {
    const targetProblem = await Problem.findById(problem_id);
    const testCaseList = targetProblem.tests.map(value => `assertEquals(${value.code}, ${value.solution});` + '\n');

    res.render('problem', { params: problem_id, user: 'TOGGO', list: testCaseList.join(''), problem: targetProblem });
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
      case 'succeed':
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
        return;
      case 'failed':
        failedCase.result = 'undefined';
        res.status(200).render('failure', { failedCase });
        return;
      case 'execution-error':
        res.status(200).render('failure', { failedCase });
        return;
      default:
        const error = new Error('Bad request');
        error.status = 400;
        throw error;
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
        resolve({ testResult: 'succeed' });
      } else {
        resolve({ testResult: 'failed', failedCase });
      }
    } catch (error) {
      failedCase.message = error.message;
      resolve({ testResult: 'execution-error', failedCase });
    }
  })
}
