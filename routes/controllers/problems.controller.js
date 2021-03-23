const Problem = require("../../models/Problem");

exports.getAll = async function (req, res, next) {
  const problems = await Problem.find();

  res.render("index", { problems });
};

exports.detail = async function (req, res, next) {
  const problemId = req.params.problem_id;
  const problem = await Problem.findById(problemId);

  res.render("problems", { problem });
};

exports.checkCode = async function (req, res, next) {
  const problemId = req.params.problem_id;
  const submitText = req.body.submit_text;

  try {
    const userCode = new Function("return " + submitText)();

    const problem = await Problem.findById(problemId);
    const testCodes = problem.tests;

    console.log(testCodes);
  } catch (error) {
    console.log(error.message);
  }
}
