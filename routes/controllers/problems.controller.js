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
    const problem = await Problem.findById(req.params.problem_id);
    res.render('problem', { problem: problem });
  } catch(err) {
    next(err);
  }
}

exports.checkSolution = async (req, res, next) => {
  try {
    var problem = await Problem.findById(req.params.problem_id);

    try {
      var results = problem.tests.map(test => {
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
        problem: problem,
        tests: problem.tests,
        results: null,
        errStack: err.stack,
        errMessage: err.message
      });
    }

    const allPassed = results.every(result => result === true);

    if (!allPassed) {
      res.render('failure', {
        problem: problem,
        tests: problem.tests,
        results: results
      });
    } else {
      const isProblemSolved = problem.completed_users.find(user => user === req.user.username);

      if (!isProblemSolved) {
        problem.completed_users.push(req.user.username);
        problem.save();
      }

      res.render('success', {
        problem: problem,
        tests: problem.tests
      });
    }
  } catch(err) {
    next(err);
  }
}
