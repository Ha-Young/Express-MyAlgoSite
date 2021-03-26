const Problem = require('../models/Problem');
const AppError = require('../utils/appError');
const catchAsync = require('../middlewares/catchAsync');
const generateStatusData = require('../utils/generateStatusData');

exports.get = catchAsync(async (req, res, next) => {
  const headerData = generateStatusData(req.isAuthenticated(), req.user);
  const problem = await Problem.findOne({ id: req.params.id }).lean();

  if (problem === null) {
    return next(new AppError('No problem found with that ID', 404));
  }

  if (!problem.code) {
    problem.code = `function solution(${problem.params.toString()}) {
  let result;
    
  return result;
}`;
  }

  res.render('problem', { results: null, problem, ...headerData });
});

exports.post = catchAsync(async (req, res, next) => {
  const statusData = generateStatusData(req.isAuthenticated(), req.user);
  const problem = await Problem.findOne({ id: req.params.id }).lean();
  const results = await Problem.validateSolution(req.params.id, req.body.code, next);
  const finalResult = results.every(result => result.status === 'success') ? 'SUCCESS' : 'FAILURE';
  problem.code = results[0].code;

  res.render('problem', { finalResult, results, problem, ...statusData });
});
