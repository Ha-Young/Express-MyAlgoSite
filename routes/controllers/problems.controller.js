const User = require("../../models/User");
const Problem = require("../../models/Problem");
const { judgeSolution } = require("../../utils/judger");
const {IS_CORRECT_SOLUTION, IS_WRONG_SOLUTION} = require("../../constants/ResultMessage");

exports.getProblem = async function (req, res, next) {
  const problemId = req.params.problem_id;
  const problem = await Problem.find({id: problemId});
  const parameters = problem[0].parameters.join(", ");
  const firstLine = "function solution (" + parameters + ") {}";
  const passed = problem[0].completed_count;

  res.render("problem", {
    problem: problem[0],
    firstLine: firstLine,
    passed: passed
  });
}

exports.postSolution = async function (req, res, next) {
  const problemId = req.params.problem_id;
  const problem = await Problem.find({id: problemId});
  const testcases = problem[0].tests;
  const solution = req.body.solution;

  const result = judgeSolution(testcases, solution);

  if (result.error) {
    res.render("failure", {
      name: result.error.name,
      message: result.error.message,
      stack: result.error.stack,
      originalUrl: req.originalUrl,
    });

    return;
  }

  const userGoogleId = req.session.passport.user.googleId;
  const userData = await User.find({googleId: userGoogleId});
  const problemList = userData[0].completed_problems;

  if (!problemList.includes(problemId)) {
    problemList.push(problemId);
    await User.updateOne(
      { googleId: userGoogleId },
      { $push: { completed_problems: problemId }}
    );
  }

  if (result.passed) {
    await Problem.updateOne(
      { id: problemId },
      { $set: { completed_count: problem[0].completed_count + 1 }}
    );
  } else {
    await Problem.updateOne(
      { id: problemId },
      { $set: { failure_count: problem[0].failure_count + 1 }}
    );
  }

  res.render("success", {
    message: result.passed ? IS_CORRECT_SOLUTION : IS_WRONG_SOLUTION,
    testcaseResult : result.testcaseResult,
    originalUrl: req.originalUrl
  });
}
