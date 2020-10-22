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
  console.log('pn', problemNumber )
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

  // console.log(problem[0].tests)
  problem[0].tests.forEach(async (test, i) => {
    const code = `var result = ${test.code};`;
    vm.runInContext(code, context);
    console.log(test.solution, 'so')
    let answerSheet = Number(test.solution) || test.solution;
    console.log(answerSheet, 'as')
    
    if (answerSheet === 'false') answerSheet = false;
    else if (answerSheet === 'true') answerSheet = true;

    console.log(answerSheet, 'as3')
    const caseInfo = {...caseInfoDefault}
    caseInfo.testCase = i + 1;
    caseInfo.excutedCode = test.code;
    caseInfo.returned = context.result;

    // console.log(context.result, 'rel')
    // console.log(answerSheet, 'sh')
    if (context.result !== answerSheet) {
      isCorrect = false;
      caseInfo.isCorrect = false;
      result.push(caseInfo);
      return;
    }
    result.push(caseInfo);
  });

  // console.log(result, 'rslt')
  return isCorrect
  ? res.render('success', { result })
  : res.render('failure', { result });
});

{/* <button><a href="/problem/<%=result[0].problemNumber%>">다시풀기</a></button> */}