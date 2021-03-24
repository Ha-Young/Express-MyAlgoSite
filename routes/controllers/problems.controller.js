const Problem = require(`${__dirname}/../../models/Problem`);
exports.getProblem = async (req, res, next) => {
  const problem = await Problem.findOne({ id: req.params.problem_id }).exec();
  console.log(problem);
  res.render("problem");

};