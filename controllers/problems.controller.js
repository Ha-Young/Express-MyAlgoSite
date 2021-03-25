const Problem = require('../models/Problem');
const AppError = require('../utils/appError');
const catchAsync = require('../middlewares/catchAsync');
const generateHeaderData = require('../utils/generateHeaderData');

exports.get = catchAsync(async (req, res, next) => {
  const headerData = generateHeaderData(req.isAuthenticated(), req.user);
  const problem = await Problem.findOne({ id: req.params.id }).lean();

  if (problem === null) {
    return next(new AppError('No problem found with that ID', 404));
  }

  res.render('problem', { results: null, problem, ...headerData });
});

exports.post = catchAsync(async (req, res, next) => {
  const headerData = generateHeaderData(req.isAuthenticated(), req.user);
  const problem = await Problem.findOne({ id: req.params.id }).lean();
  const results = await Problem.validateSolution(req.params.id, req.body.code, next);
  res.render('problem', { results, problem, ...headerData });
});
