const creatError = require('http-errors');
const Problem = require('../../models/Problem');

exports.getProblems = async function (req, res, next) {
  try {
    const problems = await Problem.find();
    const acceptedRatio = problems.map(problem => problem.getAcceptedRatio());

    res.render('index', { problems, acceptedRatio });
  } catch (err) {
    next(creatError(500, err));
  }
}
