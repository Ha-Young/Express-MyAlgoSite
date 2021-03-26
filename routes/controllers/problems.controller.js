const Problem = require('../../models/Problem');
const { getTestCaseById, updateCompletedUser } = require('../../util/QueryPlugin');
const vm = require('vm');

exports.getAll = async function (req, res) {
  await Problem.find().lean()
  .exec(function (err, problems) {
    if (err) {
      return next(err.message);
    }

    res.locals.user = req.user;
    res.render('partial/problems', { problems });
  });
};

exports.getOne = async function (req, res) {
  await Problem.findOne({ id: req.params.problem_id })
  .lean()
  .exec(function (err, problem) {
    res.render('partial/problemView', { problem, user: req.user });
  });
};

exports.post = async function (req, res) {
  res.locals.user = req.user;
  res.locals.problemId = req.body.problemId;

  try {
    const testCases = await getTestCaseById(req.body.problemId);

    const result = testCases.map(test => {
      const code = req.body.code + test.code;
      return vm.runInNewContext(code,
        { timeout: 500, microtaskMode: 'afterEvaluate' }
      );
    });

    const checkResult = testCases.every((data, index) => {
      return data.solution === result[index];
    });

    if (checkResult) {
      await updateCompletedUser(req.body.problemId, req.user._id);
      res.render('partial/success');
    } else {
      res.render('partial/failure', { result, testCases });
    }
  } catch (err) {
    res.render('error', err.message);
  }
};
