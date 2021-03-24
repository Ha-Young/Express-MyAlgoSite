const Problem = require('../models/Problem');
const catchAsync = require('../middlewares/catchAsync');
const generateHeaderData = require('../utils/generateHeaderData');

exports.getHome = catchAsync(async (req, res, next) => {
  const headerData = generateHeaderData(req.isAuthenticated(), req.user);
  const problems = await Problem.find().lean();

  res.render('index', { problems, ...headerData });
});

