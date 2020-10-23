const Problem = require('../models/Problem');
const ErrorHandler = require('../util/ErrorHandler');
const getResultLog = require('../util/getResultLog');

exports.getAll = async (req, res, next) => {
  try {
    const problems = await Problem.find().lean();
    return res.render('index', { title: 'MAIN', problems });
  } catch (err) {
    next(err);
  }
};

exports.getProblem = async (req, res, next) => {
  const { problem_id } = req.params;

  try {
    const problem = await Problem.findById(problem_id);

    if (!problem) {
      return next(new ErrorHandler(404, 'Not Found'));
    }

    return res.render('problem', { title: '🎯Problem🎯', problem });
  } catch (err) {
    next(err);
  }
};

exports.postProblem = async (req, res, next) => {
  const {
    params: { problem_id },
    body: { usercode },
    user,
  } = req;

  try {
    const problem = await Problem.findById(problem_id);
    const results = getResultLog(usercode, problem.tests);
    const isAllCorrect = results.every(result => result.isCorrect);

    if (isAllCorrect) {
      problem.completed_users.addToSet(user._id);
      await problem.save();
      res.render('success', { title: '✨Success✨', problem, results, usercode });
    } else {
      res.render('failure', { title: '🤦‍♀️Failure🤦‍♂️', problem, results, usercode });
    }
  } catch (err) {
    next(err);
  }
};
