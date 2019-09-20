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

exports.postProblemInfo = async (req, res) => {
  const problemInfo = await Problem.findOne({
    id: Number(req.params.problem_id)
  });
  const userInfo = await User.findOne({ id: Number(req.user.id) });

  let result = [];
  let userAnswer = [];

  for (let i = 0; i < problemInfo.tests.length; i++) {
    try {
      code = `${req.body.code} ${problemInfo.tests[i].param}`;
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

  function checkTrue(checkVal) {
    return checkVal === true;
  }

  if (result.every(checkTrue)) {
    let dup = true;
    for (let i = 0; i < userInfo.collect_problem.length; i++) {
      if (
        Number(userInfo.collect_problem[i]) === Number(req.params.problem_id)
      ) {
        dup = false;
      }
    }
    if (dup) {
      await User.findOneAndUpdate(
        { id: Number(req.user.id) },
        { $push: { collect_problem: Number(req.params.problem_id) } }
      );
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
