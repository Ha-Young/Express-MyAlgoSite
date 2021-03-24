const Problem = require('../models/Problem');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getHome = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const problems = await Problem.find().lean();
  const loginStatus = req.user ? 'logout' : 'login';
  const ref = req.user ? '/auth/logout' : '/auth';

  res.render('index', { user: req.user, problems, loginStatus, ref });
});

