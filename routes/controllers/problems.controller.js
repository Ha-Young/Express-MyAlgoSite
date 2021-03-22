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
