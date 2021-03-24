const assert = require("assert");
const Problem = require("../../models/Problem");
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
    res.render("error", {
      name: result.error.name,
      message: result.error.message,
      stack: result.error.stack
    });

    return;
  }

  res.render("success", {
    message: result.passed ? IS_CORRECT_SOLUTION : IS_WRONG_SOLUTION,
    testcaseResult : result.testcaseResult
  });
}