const Problem = require("../../models/Problem");

exports.getProblems = async function (req, res, next) {
  const problems = await Problem.find();
  res.render("index", {problems: problems});
};

exports.getProblem = async function (req, res, next) {
  const problemId = req.params.problem_id;

  const problem = await Problem.findById(problemId);

  res.render("problem", {problem: problem})
}

exports.postProblem = async function (req, res, next) {
  console.log(req.body);
}
