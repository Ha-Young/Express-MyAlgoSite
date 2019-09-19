const express = require('express');
const router = express.Router();
const authenticateUser = require('./middlewares/authenticateUser');
const {
  getUserCode,
  getProgramInfo,
  setCodeCookie,
  executeCode,
  checkAnswer,
  updateSuccessCodeToUser,
  updateSuccessUserToProblem
} = require('./controllers/problem.controller');

router.get('/:problemId', authenticateUser, getUserCode, getProgramInfo);
router.post('/:problemId',
  authenticateUser,
  setCodeCookie,
  executeCode,
  checkAnswer,
  updateSuccessCodeToUser,
  updateSuccessUserToProblem
);

module.exports = router;


/*
피보나치

function solution(a) {
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
  let findKim = a.indexOf('Kim');
  return "김서방은 "+findKim+"에 있다";
}

function solution (a) {
for (let i = 0; i < 1000000; i++) {
}
    let findKim = a.indexOf('Kim');
  return "김서방은 "+findKim+"에 있다";
};

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