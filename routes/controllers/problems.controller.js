const Problem = require('../../models/Problem');

exports.getAll = async function (req, res) {
  Problem.find().lean()
  .exec(function (err, problems) {
    if (err) {
      return next(err.message);
    }

    res.locals.user = req.user;
    res.render('partial/problems', { problems });
  });
};

exports.getOne = async function (req, res) {
  Problem.findOne({ id: req.params.problem_id })
  .lean()
  .exec(function (err, problem) {
    res.render('partial/problemView', { problem, user: req.user });
  });
};

exports.post = async function (req, res) {
  console.log('post?!?!?')
  // console.log(req.body.code)
};
