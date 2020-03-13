const mongoose = require('mongoose');
const Problem = require('../../models//Problem');
const User = require('../../models/User');
const { VM, VMScript } = require('vm2');

exports.getProblemId = async function (req, res, next) {
  try{
    const targetProblem = await Problem.findOne({ _id: req.params.problem_id });
    req.session.problem = targetProblem;
    res.locals.problem = targetProblem;
    next();
  } catch(err) {
    next(err);
  }
};

exports.showProblem = async function (req, res, next) {
  const problem = res.locals.problem;

  try {
    res.render('problem', problem );
  } catch (err) {
    next(err);
  }
}

exports.checkProblem = async function (req, res, next) {
  try{
    const problem = req.session.problem;
    const userCode = req.body.code;
    const vm = new VM();
    const checkedFailure = [];
    const checkedError = [];
    const problemId = req.params.problem_id;

    if(typeof(userCode) !== 'string'){
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
    } catch(err) {
      const errObj = {};
      Error.captureStackTrace(errObj);
      checkedError.push({
        errMessage : err.message,
        err : err,
        errstack : err.stack
      })
    }

    //궁금해서 주석처리했어요. 지금처럼 삼항연산자가 길어질경우에는 안쓰는게 좋을까요?
    //checkedFailure.length ? res.render('failure', { failInfo : checkedFailure, errorInfo : checkedError, problemId }) : res.render('success', { problemId });
    if(checkedFailure.length || checkedError.length){
      res.render('failure', {
        failInfo : checkedFailure,
        errorInfo : checkedError,
        problemId
      });
    } else {
      res.render('success', { problemId });
    }
  } catch(err) {
    next(err);
  }

  // 수박수박수 알고리즘 정답
  // function solution(n){
  //   return '수박'.repeat(n/2) + (n%2 === 1 ? '수' : '');
  // }
}
