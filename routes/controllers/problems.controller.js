const Problem = require('../../models/Problem');
const { getTestCaseById } = require('../../util/problem_db');

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
  const checkTestCode = (test) => {
    const resultValue = req.body.newFunction(test.arguments);

    return {
      answer: resultValue,
      solution: test.solution,
      isSuccess: resultValue == test.solution
    };
  };

  try {
    res.locals.user = req.user;
    res.locals.problemId = req.body.problemId
    const testCases = await getTestCaseById(req.body.problemId);
    const result = testCases.map(checkTestCode);
    const checkResult = result.every(data => data.isSuccess === true);

    if (checkResult) {
      res.render('partial/success');
    } else {
      res.render('partial/failure', { result });
    }
  } catch (err) {
    res.render('partial/failure', { message: err.message });
  }
};
