const { ResumeToken } = require('mongodb');
const vm = require('vm');
const Problem = require('../models/Problem');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getAllProblems = catchAsync(async (req, res, next) => {
  const featured = new APIFeatures(Problem.find(), req.query).filter().sort();
  const problems = await featured.query;
  res.render('index', { data: problems });
});

exports.getProblem = catchAsync(async (req, res, next) => {
  const id = req.params.problem_id;
  const problem = await Problem.find({ id });

  res.render('problem', {
    id: problem[0].id,
    title: problem[0].title,
    level: problem[0].difficulty_level,
    completeUsers: problem[0].complete_user,
    description: problem[0].description,
  });
});

exports.receiveUserSolution = catchAsync(async (req, res, next) => {

  const problemNumber = req.params.problem_id;
  const problem = await Problem.find({ id: problemNumber });
  const solution = await new Function(`return ${req.body.code}`)();

  const context = { solution };
  vm.createContext(context);

  let isCorrect = true;
  const caseInfoDefault = {
    isCorrect: true,
    problemNumber
  };
  const result = [];

  console.log(problem[0].tests)
  problem[0].tests.forEach(async (test, i) => {
    const code = `var result = ${test.code};`;
    vm.runInContext(code, context);
    const asnwerSheet = Number(test.solution) || test.solution;

    if (asnwerSheet === 'false' || asnwerSheet === 'true') {
      asnwerSheet = Boolean(asnwerSheet);
    }

    const caseInfo = {...caseInfoDefault}
    caseInfo.testCase = i + 1;
    caseInfo.excutedCode = test.code;
    caseInfo.returned = context.result;

    if (context.result !== asnwerSheet) {
      isCorrect = false;
      caseInfo.isCorrect = false;
      result.push(caseInfo);
      return;
    }
    result.push(caseInfo);
  });

  console.log(result, 'rslt')
  return isCorrect
  ? res.render('success')
  : res.render('failure', { result });
});

