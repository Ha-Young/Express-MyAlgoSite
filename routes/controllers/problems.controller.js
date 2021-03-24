const assert = require("assert");
const Problem = require("../../models/Problem");
const User = require("../../models/User");
const { judgeSolution } = require("../../utils/judger");
const {IS_CORRECT_SOLUTION, IS_WRONG_SOLUTION} = require("../../constants/ResultMessage");


exports.getProblem = async function (req, res, next) {
  const problemId = req.params.problem_id;
  const problem = await Problem.find({id: problemId});
  const parameters = problem[0].parameters.join(", ");
  const firstLine = "function solution (" + parameters + ") {}";

  res.render("problem", { problem: problem[0], firstLine: firstLine});
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
      stack: result.error.stack
    });

    return;
  }

  const userGoogleId = req.session.passport.user.googleId;
  const userData = await User.find({googleId: userGoogleId});

  const problemList = userData[0].completed_problems;

  if (problemList.length === 0 || !problemList.includes(problemId)) {
    problemList.push(problemId);
    await User.updateOne(
      { googleId: userGoogleId},
      { $push: { completed_problems: problemId }}
    );
    await Problem.updateOne(
      { id: problemId},
      { $set: { completed_users: problem[0].completed_users + 1 }}
    );
  }

  res.render("success", {
    message: result.passed ? IS_CORRECT_SOLUTION : IS_WRONG_SOLUTION,
    testcaseResult : result.testcaseResult
  });
}