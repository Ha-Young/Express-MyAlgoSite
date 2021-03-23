const Problem = require("../../models/Problem");

exports.getProblem = async function (req, res, next) {
  const problemId = req.params.problem_id;
  const problem = await Problem.find({id: problemId});

  res.render("problem", { problem: problem[0]});
}

exports.postSolution = async function (req, res,next) {
  console.log(req.body);


}