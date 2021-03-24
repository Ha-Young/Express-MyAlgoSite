const Problem = require("../../models/Problem");

exports.viewProblem = async function (req, res, next) {
  const { problem_id: problemId } = req.params;

  try {
    const problem = await Problem.findOne({ id: problemId });

    res.render("pages/problem", { problem });

  } catch (err) {
    next(err);
  }
};

exports.solveProblem = function (req, res, next) {
  const {
    code,
    testCase,
  } = req.body;

  try {
    const parsedTestCase = JSON.parse(testCase);

  } catch (err) {
    return next(err);
  }
};
