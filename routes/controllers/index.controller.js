const creatError = require('http-errors');
const Problem = require('../../models/Problem');

exports.getProblems = async function (req, res, next) {
  console.log(req.user)
  try {
    const problems = await Problem.find();
    const acceptedRatio = problems.map(problem => {
      if (problem.submission === 0) return 0;

      return ((problem.accepted * 100) / problem.submission).toFixed(2);
    });

    res.render('index', { problems, acceptedRatio });
  } catch (err) {
    next(creatError(500, err));
  }
}
