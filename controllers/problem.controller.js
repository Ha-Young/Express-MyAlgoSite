const Problem = require("../models/Problem");

module.exports.problemDetailController = async function problemDetailController(req, res, next) {
  const problemId = req.params.problem_id;
  if (!problemId.match(/^[0-9a-fA-F]{24}$/)) {
    return next();
  }

  const problem = await Problem.findById(problemId);
  if (!problem) {
    return res.redirect('/');
  }

  res.render('problemDetail');
}
