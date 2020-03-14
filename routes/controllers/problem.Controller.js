const mongoose = require('mongoose');
const Problem = require('../../models//Problem');
const { VM, VMScript } = require('vm2');
const error = require('../../libs/error');

exports.getProblemId = async function (req, res, next) {
  try{
    const { ObjectId } = mongoose.Types;
    const { problem_id: problemId } = req.params;

    if(!ObjectId.isValid(problemId)){
      throw new error.InvalidObjectIdError(err.message, problemId);
    }

    const targetProblem = await Problem.findOne({ _id: problemId });

    res.locals.problem = targetProblem;
    next();
  } catch (err) {
    if (err instanceof error.InvalidObjectIdError) {
      return next(err);
    }

    next(new error.GeneralError(err.message));
  }
};

exports.showProblem = async function (req, res, next) {
  const { problem } = res.locals;

  try {
    res.render('problem', { problem });
  } catch (err) {
    next(new error.GeneralError(err.message));
  }
};

exports.checkProblem = async function (req, res, next) {
  try{
    const { ObjectId } = mongoose.Types;
    const { problem } = res.locals;
    const { problem_id: problemId } = req.params;
    const userCode = req.body.code;
    const vm = new VM();
    const checkedFailure = [];
    const checkedError = [];

    if(!ObjectId.isValid(problemId)){
      throw new error.InvalidObjectIdError(err.message, problemId);
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
    if (err instanceof error.InvalidObjectIdError) {
      next(err);
    }

    next(new error.GeneralError(err.message));
  }
};
