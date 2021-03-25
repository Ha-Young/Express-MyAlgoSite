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
  let result = [];

  // try {
  //   const checkTestCode = (test) => {
  //     const resultValue = req.body.newFunction(test.arguments);

  //     result.push([resultValue, test.solution]);
  //     console.log(result)
  //     return resultValue === JSON.parse(test.solution);
  //   };

  //   const checkResult = req.body.tests.every(checkTestCode);
  //   res.locals.user = req.user;

  //   if (checkResult) {
  //     res.render('partial/success', { problemId: req.body.problemId });
  //   } else {
  //     res.render('partial/failure', { result: result.pop() });
  //   }
  // } catch (err) {
  //   res.locals.user = req.user;
  //   res.render('error', err.message);
  // }

  // 정답일 때 db 업데이트

};
