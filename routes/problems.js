const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const authenticateUser = require('../middlewares/authorization');

router.get('/:problemId', authenticateUser, async (req, res, next) => {
  try {
    const problem = await Problem.findOne({ problem_id : req.params.problemId });
    res.render('problem', {
      title: '바닐라코딩',
      problem
    });
  } catch (error) {
    next();
  }
});

router.post('/:problemId', authenticateUser, async (req, res, next) => {
  // const summittedFn = new Function('return :', req.body.code)();
  try {
    const result = [];
    const problem = await Problem.findOne({ problem_id : req.params.problemId });
    console.log(problem.tests.length)
    problem.tests.forEach(test => {
      console.log(test)
    });
  } catch (error) {
    next();
  }

  res.render('failure');
});

module.exports = router;


/*
피보나치

function soultion(a) {
  let arr = [0,1];
  for (let i = 2; i <= a; i++ ) {
    arr.push(arr[i-1]+arr[i-2])
  }
  return arr[a]
}



수박수박수

function solution(a) {
   let result = ‘’
   if (a < 10000) {
    for (let i = 0; i < a; i++) {
       if(i % 2 === 0) { result +=‘수’ }
       else { result += ‘박’}
       }
   }
   return result
}


김서방

function solution(a) {

   let findKim;
   findKim = a.indexOf(‘Kim’);
  return “김서방은 “+findKim+“에 있다“;
}

하샤드

function soultion(a){
  let arr = a.toString().split(‘’), sum = 0;
  for ( let i = 0; i < arr.length; i++ ) {
    sum += parseInt(arr[i])
  }
  if ( a % sum == 0 ) {
    return true
  } else {
    return false
  }
}

*/