const creatError = require('http-errors');
const Submission = require('../../models/Submission');

exports.getUser = async function (req, res, next) {
  res.render('user');
}

exports.getUserSubmissions = async function (req, res, next) {
  try {
    const problemId = Number(req.params['problem_id']);
    const submissions = await Submission.findOne({ user_id: req.user });
    const targetProblemSubmissions = submissions.history.find(problem => problem.id === problemId);

    res.render('submission', { history: targetProblemSubmissions });
  } catch (err) {
    next(creatError(500, err));
  }
}
