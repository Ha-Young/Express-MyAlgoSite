const express = require('express');
const router = express.Router();
const verifyLogin = require('./middlewares/authorization').verifyLogin;
const Problem = require('../models/Problem');
// const User = require('../models/User');
const {VM} = require('vm2');
const vm = new VM({
  console: 'inherit',
  timeout: 2000,
  sandbox: {}
});


// router.get('/:problem_id', async (req, res, next) => { // I have removed verifyLogin for convenience
router.get('/:problem_id', verifyLogin, async (req, res, next) => { // should be recovered
  const problem = await Problem.findOne({ id: req.params.problem_id }).exec();
  res.render('problem', { problem });
});

router.post('/:problem_id', verifyLogin, async (req, res, next) => {
// router.post('/:problem_id', async (req, res, next) => {


  let problem;
  try {
    problem = await Problem.findOne({ id: req.params.problem_id }).exec();
  } catch (err) {
    console.error('error occured during find a problem');
  }

  const tests = problem.tests;

  let codeToRun = req.body.code + '\n';
  
  for (let i = 0; i < tests.length; i++) {
    const testCode = tests[i].code;
    const solution = tests[i].solution;

    codeToRun += `\n
      if (${testCode} !== ${solution}) {
        const userSolution = ${testCode};
        const error = new Error();
        error.message = 'expected ${testCode.toString()} to be ${solution}, but received ' + userSolution;
        error.type = 'failed';
        throw error;
      }`
  }

  const problemId = problem.id;
  try {
    vm.run(codeToRun);
    // add user's code to user's solved
    
    // add problem's completed_users
    const filter = { id: problemId };
    const update = { $inc: { completed_users: 1 } }
    let problem = await Problem.findOneAndUpdate(filter, update, {
      new: true 
    }).exec();
    res.status(200).render('success', { problem });

  } catch (err) { // failure.ejs
    let detail;
    if (err.type === 'failed') {
      detail= 'user failed on a test : ' + err.message
    } else {
      detail = err.message + '\n' + err.stack;
    }
    // add user's code to user's incomplete
    res.status(200).render('failure', { detail, problemId });
  }
})

module.exports = router;
