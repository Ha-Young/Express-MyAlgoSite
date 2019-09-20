const Problem = require('../../models/Problem');
const vm = require('vm');

exports.getAll = async (req, res, next) => {
  try {
    const problems = await Problem.find();
    res.render('index', { problems: problems });
  } catch(err) {
    next(err);
  }
}

exports.getOne = async (req, res, next) => {
  try {
    const curProblem = await Problem.findById(req.params.problem_id);
    res.render('problem', { problem: curProblem });
  } catch(err) {
    next(err);
  }
}

exports.checkSolution = async (req, res, next) => {
  try {
    var curProblem = await Problem.findById(req.params.problem_id);

    try {
      var results = curProblem.tests.map(test => {
        const script = new vm.Script(`try { ${req.body.solution} ${test.code} } catch (err) { throw new Error(err) }`);
        const context = vm.createContext({});

        if (script.runInContext(context, { timeout: 7000 }) === test.solution) {
          return true;
        } else {
          return `${script.runInContext(context, { timeout: 7000 })}`;
        }
      });
    } catch(err) {
      res.render('failure', {
        problem: curProblem,
        tests: curProblem.tests,
        results: null,
        errStack: err.stack,
        errMessage: err.message
      });
    }

    const isfailed = results.filter(result => result !== true);

    if (isfailed.length) {
      res.render('failure', {
        problem: curProblem,
        tests: curProblem.tests,
        results: results
      });
    } else {
      const isProblemSolved = curProblem.completed_users.find(user => user === req.user.username);

      if (!isProblemSolved) {
        curProblem.completed_users.push(req.user.username);
        curProblem.save();
      }

      res.render('success', {
        problem: curProblem,
        tests: curProblem.tests
      });
    }
  } catch(err) {
    next(err);
  }
}
