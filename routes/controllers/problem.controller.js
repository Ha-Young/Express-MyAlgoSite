const vm = require('vm');
const Problem = require('../../models/Problem');

exports.checkTestCases = async (req, res, next) => {
  try {
    const testResults = [];
    const { _id: userObjectId, username } = req.user;
    const { _id: problemId, tests: testCases } = req.problem;
    const targetSolution = req.body.solution;

    try {
      testCases.forEach(test => {
        const context = {};
        vm.createContext(context);

        const code = `${targetSolution} ${test.code}`;
        const executionResult = vm.runInContext(code, context, { timeout: 5000 });

        if (executionResult === test.solution) {
          testResults.push([true, executionResult]);
        } else {
          testResults.push([false, executionResult]);
        }
      });
    } catch (error) {
      return res.status(400).render('failure', {
        username,
        failureProblem: error.message,
        expectedAnswer: error.message,
        wrongAnswer: error.message,
        problemId,
      });
    }

    const isAllTestsPassed = testResults.every(result => result[0] === true);
    if (isAllTestsPassed) {
      await Problem.findByIdAndUpdate(problemId, {
        $addToSet: { completed_users: userObjectId }
      });
      return res.status(201).render('success', { username });
    }

    const failedTestIndex = testResults.findIndex(result => result[0] === false);
    return res.status(201).render('failure', {
        username,
        failureProblem: testCases[failedTestIndex].code,
        expectedAnswer: testCases[failedTestIndex].solution,
        wrongAnswer: testResults[failedTestIndex][1],
        problemId,
      });
  } catch (error) {
    next(error);
  }
};
