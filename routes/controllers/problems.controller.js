const Problem = require(`${__dirname}/../../models/Problem`);
exports.getProblem = async (req, res, next) => {
  const problem = await Problem.findOne({ id: Number(req.params.problem_id) }).exec();
  res.locals.problem = problem;
  res.render("problem");
};