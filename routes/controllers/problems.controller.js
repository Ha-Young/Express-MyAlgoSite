const Problems = require('../../models/Problem');
const ObjectId = require('mongoose').Types.ObjectId;
const vm = require('vm');

exports.getAll = async function(req, res, next) {
  try {
    const data = await Problems.find();
    res.render('index', {
      title: 'CodeWars Hello',
      user: req.user,
      problems: data
    });
  } catch (err) {
    next();
  }
};

exports.getProblem = async function(req, res, next) {
  try {
    const data = await Problems.findById(req.params.problem_id);
    res.render('problem', {
      user: req.user,
      problem: data
    });
  } catch (err) {
    next();
  }
};

exports.checkSolution = async function(req, res, next) {
  try {
    const code = req.body.solution;
    const script = new vm.Script(code);
    const sandbox = vm.createContext({});
    script.runInContext(sandbox, {
      displayErrors: true,
      timeout: 2000
    });
  } catch (err) {
    return res.render('failure', {
      user: req.user,
      message: err.message,
      results: null
    });
  }

  try {
    const validation = ObjectId.isValid(req.params.problem_id);
    if (!validation) {
      return next();
    }

    const problem = await Problems.findById(req.params.problem_id);
    let results = problem.tests.map(test => {
      const code = req.body.solution + test.code;
      const script = new vm.Script(code);
      const sandbox = vm.createContext({});
      const answer = script.runInContext(sandbox, {
        displayErrors: true,
        timeout: 2000
      });
      if (answer === test.solution) {
        return { message: 'success', expect: test.solution, answer };
      } else {
        return { message: 'failure', expect: test.solution, answer };
      }
    });

    if (results.every(result => result.message === 'success')) {
      res.render('success', { user: req.user });
    } else {
      res.render('failure', { user: req.user, message: null, results });
    }
  } catch (err) {
    next(err);
  }
};
