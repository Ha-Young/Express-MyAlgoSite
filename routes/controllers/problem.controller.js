const vm = require('vm');
const Problem = require('../../models/Problem');

exports.checkTestCases = async (req, res, next) => {
  try {
    const testResults = [];
    const { _id: userId, username } = req.user;
    const { _id: problemId, tests: testCases } = req.problem;
    const targetSolution = req.body.solution;

    try {
      testCases.forEach(test => {
        const context = {};
        vm.createContext(context);

        const code = `${targetSolution} ${test.code}`;
        const executionResult = vm.runInContext(code, context, { timeout: 5000 });

        testResults.push({
          isPassed: (executionResult === test.solution),
          answer: executionResult,
        });
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

    const failedTestIndex = testResults.findIndex(result => result.isPassed === false);
    if (failedTestIndex === -1) {
      await Problem.findByIdAndUpdate(problemId, {
        $addToSet: { completed_users: userId }
      });
      return res.status(201).render('success', { username });
    }
    return res.status(201).render('failure', {
      username,
      failureProblem: testCases[failedTestIndex].code,
      expectedAnswer: testCases[failedTestIndex].solution,
      wrongAnswer: testResults[failedTestIndex].answer,
      problemId,
    });
  } catch (error) {
    next(error);
  }
};
