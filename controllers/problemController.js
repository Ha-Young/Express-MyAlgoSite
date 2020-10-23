const vm = require('vm');
const Problem = require('../models/Problem');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllProblems = catchAsync(async (req, res, next) => {
  const featured = new APIFeatures(Problem.find(), req.query).filter().sort();
  const problems = await featured.query;

  res.render('index', { data: problems });
});

exports.getProblem = catchAsync(async (req, res, next) => {
  const id = req.params.problem_id;
  const problem = await Problem.findById(id);

  if (!problem) return next(new AppError('Not Found', 404));

  res.render('problem', {
    _id: problem._id,
    title: problem.title,
    level: problem.difficulty_level,
    completeUsers: problem.complete_user,
    description: problem.description,
  });
});

exports.receiveUserSolution = catchAsync(async (req, res, next) => {
  const problemNumber = req.params.problem_id;
  const problem = await Problem.find({ _id: problemNumber });

  const solution = await new Function(`return ${req.body.code}`)();

  const context = { solution };
  vm.createContext(context);

  let isCorrect = true;
  const caseInfoDefault = {
    isCorrect: true,
    problemNumber,
  };
  const result = [];

  problem[0].tests.forEach(async (test, i) => {
    const code = `var result = ${test.code};`;
    vm.runInNewContext(code, context);
    let answerSheet = Number(test.solution) || test.solution;

    if (answerSheet === 'false') answerSheet = false;
    else if (answerSheet === 'true') answerSheet = true;

    const caseInfo = { ...caseInfoDefault };
    caseInfo.testCase = i + 1;
    caseInfo.excutedCode = test.code;
    caseInfo.returned = context.result;

    if (context.result !== answerSheet) {
      isCorrect = false;
      caseInfo.isCorrect = false;
      result.push(caseInfo);
      return;
    }
    result.push(caseInfo);
  });

  return isCorrect
    ? res.render('success', { result })
    : res.render('failure', { result });
});
