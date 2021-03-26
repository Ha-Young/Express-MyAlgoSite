const creatError = require('http-errors');
const User = require('../../models/User');

exports.getUser = async function (req, res, next) {
  res.render('user');
}

exports.getUserSubmissions = async function (req, res, next) {
  try {
    const targetProblemId = Number(req.params['problem_id']);
    const userId = req.params['user_id'];
    const currentUser = await User.findById(userId).populate('submission_history');
    const targetProblemSubmissions = await currentUser.getTargetProblemSubmissions(targetProblemId);

    res.render('submission', { submissions: targetProblemSubmissions });
  } catch (err) {
    next(creatError(500, err));
  }
}
