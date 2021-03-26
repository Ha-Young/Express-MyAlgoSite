const creatError = require('http-errors');
const { VM } = require('vm2');
const Problem = require('../../models/Problem');
const User = require('../../models/User');
const Submission = require('../../models/Submission');

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
    const testResults = [];
    const vm = new VM({
      timeout: 500,
      sandbox: {
        tests: targetProblem.tests,
        testResults,
      }
    });

    await targetProblem.addSubmissionCount();
    await currentUser.addTotalSubmissionCount();

    try {
      vm.run(`
        ${userSolution}

        for (let i = 0; i < tests.length; i++) {
          const actualReturn = eval(tests[i].code);

          if (actualReturn === tests[i].solution) {
            testResults.push({ actualReturn, result: true});
          } else {
            testResults.push({ actualReturn, result: false});
          }
        }
      `);
    } catch (err) {
      return res.render('failure', { err, problem: targetProblem, userSolution });
    }

    const isPassEveryTest = testResults.every(testCase => testCase.result === true);

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
