const mongoose = require('mongoose');
const vm = require('vm');
const Problems = require('../../models/Problem');

exports.getAll = async (req, res, next) => {
  try {
    const problems = await Problems.find();

    res.render('index', { user: req.user, problems });
  } catch(err) {
    next(err);
  }
};

exports.getProblem = async (req, res, next) => {
  const targetId = req.params.problem_id;

  if(!mongoose.Types.ObjectId.isValid(targetId)) return next();

  try {
    const problem = await Problems.findOne({ _id: targetId });

    res.render('problem', { user: req.user, problem });
  } catch(err) {
    next(err);
  }
};

exports.checkProblem = async (req, res, next) => {
  const targetId = req.params.problem_id;
  let results = [];

  if(!mongoose.Types.ObjectId.isValid(targetId)) {
    return next();
  }

  try {
    const problem = await Problems.findOne({ _id: targetId });
    let isAllPassed = true;
    try {
      results = problem.tests.map(test => {
        let code = `${req.body.code} ${test.code}`;
        const script = new vm.Script(code);
        const context = vm.createContext({});
        const result = script.runInNewContext(context, { timeout: 1000 });
        const isSameResult = result === test.solution;

        if(!isSameResult) isAllPassed = false;

        return {
          isPassed: isSameResult,
          expected: test.solution,
          insteadGot: String(result),
        };
      });
    } catch(error) {
      return res.render('failure', { results: null, user: req.user, error });
    }

    if (isAllPassed) {
      res.render('success', { error: null, user: req.user, results });
    } else {
      res.render('failure', { error: null, user: req.user, results });
    }
  } catch (error) {
    next(error);
  }
};
