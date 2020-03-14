const Problem = require('../../models//Problem');
const { VM, VMScript } = require('vm2');

exports.getProblemId = async function (req, res, next) {
  try{
    const targetProblem = await Problem.findOne({ _id: req.params.problem_id });
    req.session.problem = targetProblem;
    res.locals.problem = targetProblem;
    next();
  } catch (err) {
    next(err);
  }
};

exports.showProblem = async function (req, res, next) {
  const problem = res.locals.problem;

  try {
    res.render('problem', { problem });
  } catch (err) {
    next(err);
  }
};

exports.checkProblem = async function (req, res, next) {
  try{
    const problem = req.session.problem;
    const userCode = req.body.code;
    const vm = new VM();
    const checkedFailure = [];
    const checkedError = [];
    const problemId = req.params.problem_id;

    if (typeof(userCode) !== 'string') {
      throw new Error('invalid code value');
    }

    try {
      for(let i = 0; i < problem.tests.length; i++){
        const test = problem.tests[i];
        const script = new VMScript(`${userCode} ${test.code}`, 'vm.js');
        const userSolution = vm.run(script);

        if(JSON.stringify(userSolution) !== JSON.stringify(test.solution)){
          checkedFailure.push({
            case : test.code,
            expect : test.solution,
            result : userSolution || 'undefined'
          });
        }
      }
    } catch (err) {
      const errObj = {};
      Error.captureStackTrace(errObj);
      checkedError.push({
        errMessage : err.message,
        err : err
      });
    }

    if (checkedFailure.length || checkedError.length) {
      res.render('failure', {
        failInfo : checkedFailure,
        errorInfo : checkedError,
        problemId
      });
    } else {
      res.render('success', { problemId });
    }
  } catch (err) {
    next(err);
  }
};
