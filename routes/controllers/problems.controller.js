const createError = require('http-errors');
const vm = require('vm');
const Problem = require('../../models/Problem');
const { getTestCaseById, updateCompletedUser } = require('../../util/QueryPlugin');

exports.getAll = async function (req, res) {
  await Problem.find().lean()
  .exec(function (err, problems) {
    if (err) {
      next(createError(err.status));
      return;
    }

    res.locals.user = req.user;
    res.render('partial/problems', { problems });
  });
};

exports.getOne = async function (req, res, next) {
  try {
    const problem = await Problem.find({ id: req.params.problem_id }).lean();
    if (!problem.length) {
      next(createError(404));
      return;
    }

    res.render('partial/problemView', {
      problem: problem[0],
      user: req.user
    });
  } catch (err) {
    next(createError(500));
  }
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
    next(createError(500));
  }
};
