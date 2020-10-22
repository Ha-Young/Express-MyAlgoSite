const vm = require('vm');
const Problem = require('../../models/Problem');

exports.checkTestCases = async (req, res, next) => {
  try {
    const testResults = [];
    const problemId = req.params.problem_id;
    const username = req.user.username;
    const targetSolution = req.body.solution;
    const testCases = req.problem.tests;

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
      return res.render('failure', {
        username,
        failureProblem: error.message,
        expectedAnswer: error.message,
        wrongAnswer: error.message,
        problemId,
      });
    }

    const isAllTestsPassed = testResults.every(result => result[0] === true);

    if (isAllTestsPassed) {
      const problemObjectId = await Problem.findOne({ id: problemId });
      await Problem.findByIdAndUpdate(problemObjectId, {
        $addToSet: { completed_users: req.user._id }
      });
      return res.render('success', { username });
    }

    const failedTestIndex = testResults.findIndex(result => result[0] === false);
    return res.render('failure', {
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
