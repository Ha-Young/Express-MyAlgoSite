const Problem = require('../../models/Problem');

exports.getAll = async (req, res, next) => {
  try {
    const problems = await Problem.find({}).lean().exec();
    req.problems = problems;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getTargetProblem = async (req, res, next) => {
  const { problem_id } = req.params;
  try {
    const targetProblem = await Problem.findOne({ id: problem_id });
    if (!targetProblem) {
      return next({
        status: 404,
        message: 'Not Found',
      });
    }
    req.problem = targetProblem;
    next();
  } catch (error) {
    next(error);
  }
};
