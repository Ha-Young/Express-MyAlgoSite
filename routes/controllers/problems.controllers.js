const Problem = require('../../models/Problem');
const User = require('../../models/User');
const vm = require('vm');

exports.getProblemInfo = async (req, res, next) => {
  const initValue = req.cookies.codeCookie
    ? req.cookies.codeCookie
    : 'function solution(n){return n;}';

  try {
    const target = await Problem.findOne({ id: Number(req.params.problem_id) });
    res.render('problems', {
      id: target.id,
      username: req.user.username,
      title: target.title,
      difficulty_level: target.difficulty_level,
      description: target.description,
      completed_users: target.completed_users,
      tests: target.tests,
      limit: target.limit,
      initValue: initValue
    });
  } catch (e) {
    next();
  }
};

exports.setCookies = (req, res, next) => {
  res.cookie('codeCookie', req.body.code);
  next();
};

exports.postProblemInfo = async (req, res, next) => {
  let problemInfo = [];
  let userInfo = [];
  let result = [];
  let userAnswer = [];

  try {
    problemInfo = await Problem.findOne({
      id: Number(req.params.problem_id)
    });
    userInfo = await User.findOne({ id: Number(req.user.id) });
  } catch (error) {
    if (error.name === 'CastError') {
      next();
    } else {
      next(error);
    }
  }

  for (let i = 0; i < problemInfo.tests.length; i++) {
    try {
      const code = `${req.body.code} ${problemInfo.tests[i].param}`;
      const script = new vm.Script(code);
      const context = vm.createContext({});
      var answer = script.runInContext(context, { timeout: 10000 });
      userAnswer.push(answer);
      if (answer === problemInfo.tests[i].solution) {
        result.push(true);
      } else {
        result.push(false);
      }
    } catch (e) {
      res.render('failure', {
        username: req.user.username,
        title: problemInfo.title,
        difficulty_level: problemInfo.difficulty_level,
        completed_users: problemInfo.completed_users,
        message: e.message,
        result: '',
        userAnswer: userAnswer
      });
      return;
    }
  }

  if (result.every(checkTrue)) {
    let dupId = true;
    for (let i = 0; i < userInfo.collect_problem.length; i++) {
      if (
        Number(userInfo.collect_problem[i]) === Number(req.params.problem_id)
      ) {
        dupId = false;
      }
    }
    if (dupId) {
      addCorrectProblem(req.user.id, req.params.problem_id);
    }
    res.render('success', {
      username: req.user.username,
      title: problemInfo.title,
      difficulty_level: problemInfo.difficulty_level,
      completed_users: problemInfo.completed_users
    });
  } else {
    res.render('failure', {
      username: req.user.username,
      title: problemInfo.title,
      difficulty_level: problemInfo.difficulty_level,
      completed_users: problemInfo.completed_users,
      message: '',
      result: result,
      userAnswer: userAnswer
    });
  }
};

function checkTrue(checkVal) {
  return checkVal === true;
}

async function addCorrectProblem(userId, problemId) {
  try {
    await User.findOneAndUpdate(
      { id: Number(userId) },
      { $push: { collect_problem: Number(problemId) } }
    );
  } catch (error) {
    if (error.name === 'CastError') {
      next();
    } else {
      next(error);
    }
  }
}
