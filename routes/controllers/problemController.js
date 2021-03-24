const Problem = require("../../models/Problem");

exports.getAllProblems = async (req, res, next) => {
  const problems = await Problem.find();

  res.locals.problems = problems;

  next();
};

exports.getProblems = async (req, res, next) => {
  const level = req.params.level;
  const problems = await Problem.find({ difficulty_level: level });

  res.locals.problems = problems;
  next();
};

exports.checkCode = async (req, res, next) => {
  

  next();
};
