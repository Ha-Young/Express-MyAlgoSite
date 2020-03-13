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
  //const problem = res.locals.problem;
  const { problem } = res.locals;

  try {
    res.render('problem', problem );
  } catch (err) {
    next(err);
  }
}

exports.checkProblem = async function (req, res, next) {
  const problem = req.session.problem;
  const userCode = req.body.code;
  const vm = new VM();
  const checkedFailure = [];

  if(typeof(userCode) !== 'string'){
    throw new Error();
  }

  try {
    for(let i = 0; i < problem.tests.length; i++){
      const test = problem.tests[i];

      try {
        const script = new VMScript(`${userCode} ${test.code}`, 'vm.js');
        const userSolution = vm.run(script);

        if(JSON.stringify(userSolution) !== JSON.stringify(test.solution)){
          checkedFailure.push({ result: false});
        }
      } catch(err) {
        checkedFailure.push({ })
        res.locals.result = false;
        res.locals.errMessage = err.message;
        res.locals.errStack = err.stack;
        next();
      }
    }
    if(!checkedFailure.length){
      res.locals.result = true;
      next();
    }
  } catch(err) {
    next(err);
  }

  //수박수박수 알고리즘 정답
  // function solution(n){
  //   return '수박'.repeat(n/2) + (n%2 === 1 ? '수' : '');
  // }
  // try {
  //   problem.test.forEach((test) => {
  //     //const script = new VMScript(`${userCode}`)
  //     if(userCode(test.code) === test.code){return 'hi'}
  //   })
  // } catch (err) {
  //   next(err);
  // }
}

exports.showResult = async function (req, res, next){
  const result = res.locals.result;
  const errMessage = res.locals.errMessage;
  const errStack = res.locals.errStack;

  console.log('rrr', result);

  result ? res.render('success') : res.render('failure', { errMessage, errStack });

}