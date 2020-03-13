const { VM } = require('vm2');

const User = require('../../models/User');
const Problem = require('../../models/Problem');

const findUser = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const user = await User.findById(req.session.passport.user);

      if (!user) {
        next({
          status: 404,
          message: 'Not Found'
        });
      }
      res.locals.user = user;
      next();
    } catch (error) {
      next({
        status: 500,
        message: 'Internal Server Error'
      });
    };
  } else {
    res.locals.user = null;
    next();
  }
};

const findProblems = async (req, res, next) => {
  try {
    let problems = null;

    if (req.params.level) {
      problems = await Problem.find({ difficulty_level: req.params.level });
    } else {
      problems = await Problem.find();
    }
    
    if (!problems) {
      next({
        status: 404,
        message: 'Not Found'
      });
    }

    res.locals.problems = problems;
    next();
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  };
};

const findProblemById = async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.problem_id);

    if (!problem) {
      next({
        status: 404,
        message: 'Not Found'
      });
    }
    
    res.locals.problem = problem;
    next();
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  }
};

const setSolutionResult = async (req, res, next) => {
  try {
    const problem = res.locals.problem;
    const vm = new VM({
      timeout: 1000,
      sandbox: {}
    });

    let result = true;

    vm.run(`const solution = ${req.body.code}`);

    problem.tests.forEach(test => {
      const answer = vm.run(test.code);
      result = result && (answer === test.solution);
    });
    res.locals.result = result;
    next();
  } catch (error) {
    res.locals.result = false;
    res.locals.error = error;
    next();
  }
};

module.exports = {
  findUser,
  findProblems,
  findProblemById,
  setSolutionResult
}
