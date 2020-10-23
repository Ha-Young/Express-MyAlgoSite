const Problem = require('../../models/Problem');
const mongoose = require('mongoose');

exports.getAllProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find({}).lean().exec();
    req.problems = problems;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getTargetProblem = async (req, res, next) => {
  try {
    const { problem_id } = req.params;
    if (!mongoose.isValidObjectId(problem_id)) {
      const error = new Error('Not Found');
      error.status = 404;
      return next(error);
    }

    const targetProblem = await Problem.findById(problem_id);
    req.problem = targetProblem;
    next();
  } catch (error) {
    next(error);
  }
};
