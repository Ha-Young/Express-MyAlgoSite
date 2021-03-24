const Problem = require("../../models/Problem");

exports.getAllProblems = async (req, res, next) => {
  const problems = await Problem.find();

  res.locals.problems = problems;
  next();
};

exports.getProblems = async (req, res, next) => {
  const level = req.params.level;
  const problems = await Problem.find({ difficultyLevel: level });

  res.locals.problems = problems;
  next();
};

exports.renderResult = async (req, res, next) => {
  const problem = await Problem.findOne({ id: req.params.id });
  const { status, results } = problem.checkCode(req.body.code);

  res.locals.results = results;
  res.locals.prevCode = req.body.code;
  res.locals.problem = problem;

  if (status === "success") {
    res.render("success");
  } else {
    res.render("failure");
  }
};
