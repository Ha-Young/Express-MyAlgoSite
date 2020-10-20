const Problem = require('../models/Problem');

exports.getAll = async (req, res, next) => {
  try {
    const problems = await Problem.find().sort({ id: 1 }).lean();
    return res.render('index', { title: 'MAIN', problems });
  } catch (err) {
    next(err);
  }
};

exports.getProblem = (req, res, next) => {
  const { problem_id } = req.params;

  res.render('problem', { problem_id });
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
