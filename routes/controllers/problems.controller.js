const creatError = require('http-errors');
const { VM } = require('vm2');
const Problem = require('../../models/Problem');
const User = require('../../models/User');
const Submission = require('../../models/Submission');
const { runCodeInVM } = require('../../utils');

exports.getOneProblem = async function (req, res, next) {
  try {
    const targetProblemId = parseInt(req.params['problem_id']);
    const targetProblem = await Problem.findOne({ id: targetProblemId });

    res.render('problem', { problem: targetProblem });
  } catch (err) {
    next(creatError(500, err));
  }
}

exports.getOneAndUpdateProblem = async function (req, res, next) {
  try{
    const targetProblemId = parseInt(req.params['problem_id']);
    const targetProblem = await Problem.findOne({ id: targetProblemId });
    const currentUser = await User.findById(req.user);
    const userSolution = req.body.solution;
    const { testResults, err } = runCodeInVM(userSolution, targetProblem.tests);

    await targetProblem.addSubmissionCount();
    await currentUser.addTotalSubmissionCount();

    if (err) {
      const newSubmission = await Submission.create({
        problem_id: targetProblemId,
        code: userSolution,
        result: err.message
      });

      await currentUser.addSubmissionHistory(newSubmission._id);
      await currentUser.addFailedProblem(targetProblemId);

      return res.render('failure', { err, problem: targetProblem, userSolution });
    }

    const isPassEveryTest = testResults.every(testCase => testCase.result === true);
    const newSubmission = await Submission.create({
      problem_id: targetProblemId,
      code: userSolution,
      result: isPassEveryTest ? '정답입니다!!' : '틀렸습니다.'
    });

    await currentUser.addSubmissionHistory(newSubmission._id);

    if (isPassEveryTest) {
      await targetProblem.addSolver(req.user);
      await targetProblem.addAcceptedCount();
      await currentUser.addSolvedProblem(targetProblemId);
      await currentUser.addAcceptedSubmissionCount();

      res.render('success');
    } else {
      await currentUser.addFailedProblem(targetProblemId);

      const failTests = [];

      testResults.forEach((testResult, index) => {
        if (testResult.result === false) {
          failTests.push({
            expect: targetProblem.tests[index],
            actual: testResults[index].actualReturn
          });
        }
      });

      res.render('failure', { failTests, problem: targetProblem, userSolution });
    }
  } catch (err) {
    next(creatError(500, err));
  }
}
