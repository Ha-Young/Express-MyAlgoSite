const Problem = require('../../models/Problem');
const problems = require('../../models/sample_problems.json');

function checkLogin(req, res, next) {
  if (req.session.userId) {
    return next();
  }

  res.redirect('/login');
}

async function checkProblems(req, res, next) {
  let allQuestions;
  try {
    allQuestions = await Problem.find({});
  } catch (err) {
    return next({
      errorName: err.name || 'data fetch error in db',
      errorMessage: err.message,
      status: 500,
      reqUrl: `${req.url}`,
      location: 'checkProblems middleleware, try {  allQuestions = await Problem.find({}); }',
      displayToUser: '죄송합니다. 내부적인 문제가 발생했습니다. 조금만 기다려주세요.',
    });
  }

  if (!allQuestions.length) {
    for (let index = 0; index < problems.length; index++) {
      try {
        await Problem.create(problems[index]);
      } catch (err) {
        return next({
          errorName: err.name || 'data create error in db',
          errorMessage: err.message,
          status: 500,
          reqUrl: `${req.url}`,
          location: 'checkProblems mideeleware, try {  await Problem.create(problems[index]); }',
          displayToUser: '죄송합니다. 내부적인 문제가 발생했습니다. 조금만 기다려주세요....',
        });
      }
    }
  }

  next();
}

exports.checkLogin = checkLogin;
exports.checkProblems = checkProblems;
