const express = require('express');

const router = express.Router();
const vm = require('vm');
const { render } = require('ejs');
const indexController = require('./controllers/index.controller');
const { checkLogin, checkProblems } = require('./middlewares/check');
const { authenticate } = require('./middlewares/authentication');
const Problem = require('../models/Problem');

router.get('/', checkLogin, indexController.index);
router.get('/login', indexController.moveLoginPage);
router.get('/register', indexController.moveRegisterPage);
router.get('/logout', indexController.logout);
router.post('/login', authenticate, indexController.login);
router.post('/register', authenticate, indexController.register);

router.get('/problems', checkLogin, checkProblems, async (req, res, next) => {
  let allQuestions;
  try {
    allQuestions = await Problem.find({});
  } catch (err) {
    return next({
      errorName: err.name || 'data fetch error in db',
      errorMessage: err.message,
      status: 500,
      reqUrl: `GET ${url}`,
      location: 'try {  allQuestions = await Problem.find({}); }',
      displayToUser: '죄송합니다. 내부적인 문제가 발생했습니다. 조금만 기다려주세요....',
    });
  }

  return res.render('index', { allQuestions, length: allQuestions.length });
});

router.get('/problems/:id', checkLogin, checkProblems, async (
  {
    url,
    params: { id },
  },
  res,
  next,
) => {
  const holder = `function solution(n) {
    let result;

    return result;
  };`;

  let allQuestions;
  try {
    allQuestions = await Problem.find({});
  } catch (err) {
    return next({
      errorName: err.name || 'data fetch error in db',
      errorMessage: err.message,
      status: 500,
      reqUrl: `GET ${url}`,
      location: 'try {  allQuestions = await Problem.find({}); }',
      displayToUser: '죄송합니다. 내부적인 문제가 발생했습니다. 조금만 기다려주세요....',
    });
  }

  return res.render('problems', {
    question: allQuestions[id],
    id,
    holder,
  });
});

router.post('/problems/:id', async (
  {
    params: { id },
    body: { code },
    url,
  },
  res,
  next,
) => {
  try {
    let allQuestions;
    try {
      allQuestions = await Problem.find({});
    } catch (err) {
      return next({
        errorName: err.name || 'data fetch error in db',
        errorMessage: err.message,
        status: 500,
        reqUrl: `POST ${url}`,
        location: 'try {  allQuestions = await Problem.find({}); }',
        displayToUser: '죄송합니다. 내부적인 문제가 발생했습니다. 조금만 기다려주세요....',
      });
    }
    const targetQuestion = allQuestions[id];
    const passedTests = [];
    const notPassedTests = [];

    for (let index = 0; index < targetQuestion.tests.length; index++) {
      const answerCode = targetQuestion.tests[index].code;
      const answer = targetQuestion.tests[index].solution;

      const script = new vm.Script(code + answerCode);
      const result = script.runInNewContext({}, { timeout: 5000 });

      if (result === answer) {
        passedTests.push(targetQuestion.tests[index]);
        continue;
      }

      notPassedTests.push(targetQuestion.tests[index]);
    }

    if (notPassedTests.length) {
      return res.render('failure', {
        passedTests,
        passedTestsLength: passedTests.length,
        notPassedTests,
        notPassedTestsLength: notPassedTests.length,
        errorName: null,
        holder: code,
      });
    }
    return res.render('success', { holder: code, question: targetQuestion });
  } catch (err) {
    res.render('failure', {
      errorName: err.name,
      errorMessage: err.message,
      errorStack: err.stack,
      holder: code,
    });
  }
});
module.exports = router;
