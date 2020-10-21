const Problem = require('../models/Problem');

exports.getAll = async (req, res, next) => {
  try {
    const problems = await Problem.find().sort({ id: 1 }).lean();
    return res.render('index', { title: 'MAIN', problems });
  } catch (err) {
    next(err);
  }
};

exports.getProblem = async (req, res, next) => {
  const { problem_id } = req.params;

  try {
    const problem = await Problem.findOne({ id: problem_id });

    if (!problem) {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
    return res.render('problem', { title: 'Problem', problem });
  } catch (err) {
    next(err);
  }
};

exports.postProblem = (req, res, next) => {
  const { problem_id } = req.params;
  const isCorrect = true;

  if (isCorrect) {
    res.render('success', { problem_id });
  } else {
    res.render('failure', { problem_id });
  }
};
