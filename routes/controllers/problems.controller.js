const Problem = require('../../models/Problem');
const vm = require('vm');

const limitTime = 3000;

exports.get = async (req, res, next) => {
  const { id, title, tests, description } = await Problem.findOne({ id: req.params.problems_id });
  const { userAnswer } = req.body;
  const codeParameter = findParameterType(tests[0].code);

  res.render('problem', { id, title, codeParameter, tests, description, userAnswer });
};

exports.restart = async (req, res, next) => {
  const { id, title, tests, description } = await Problem.findOne({ id: req.params.problems_id });
  const { userAnswer } = req.body;
  const codeParameter = findParameterType(tests[0].code);

  res.render('problem', { id, title, codeParameter, tests, description, userAnswer });
};

exports.post = async (req, res, next) => {
  const { id, title, tests } = await Problem.findOne({ id: req.params.problems_id });
  const { userAnswer } = req.body;
  const passOrFail = [];
  let isAllPass = true;

  const timeout = { timeout: limitTime }
  const sandbox = { result: [] };
  vm.createContext(sandbox);

  try {
    for (let i = 0; i < tests.length; i++) {
      await vm.runInContext(userAnswer + `result.push(${tests[i].code});`, sandbox, timeout);
      if (sandbox.result[i] === tests[i].solution) {
        passOrFail.push("pass");
      } else {
        passOrFail.push("fail");
        isAllPass = false;
      }
    }
  } catch (e) {
    const interimResult = {
      id,
      title,
      userAnswer,
    };
    const codeError = {
      errorMessage: e.message,
      errorName: e.name,
      errorStack: e.stack,
    };

    req.session.codeError = codeError;
    req.session.interimResult = interimResult;
    res.redirect('/problems/' + req.params.problems_id + '/codeError');

    return;
  }

  const testResult = {
    id,
    title,
    tests,
    isAllPass,
    userAnswer,
    passOrFail,
    result: sandbox.result,
  };

  req.session.testResult = testResult;
  res.redirect('/problems/' + req.params.problems_id + '/result');
};

exports.getResult = async (req, res, next) => {
  const { id, title, tests, result, isAllPass, userAnswer, passOrFail } = req.session.testResult;

  res.render('result', { id, title, tests, result, isAllPass, userAnswer, passOrFail });
};

exports.getCodeError = async (req, res, next) => {
  const { id, title, userAnswer } = req.session.interimResult;
  const { errorMessage, errorName, errorStack } = req.session.codeError;

  res.render('codeError', { errorMessage, errorName, errorStack, id, title, userAnswer });
  req.session.codeError = null;
};

function findParameterType(solution) {
  const param = solution.slice(9, 10);

  if (param === "[") {
    return "array";
  }

  if (typeof Number(param) === 'number') {
    return "n";
  }
}
