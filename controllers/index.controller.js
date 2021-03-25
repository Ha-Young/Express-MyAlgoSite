const Problem = require('../models/Problem');
const catchAsync = require('../middlewares/catchAsync');
const generateHeaderData = require('../utils/generateHeaderData');

exports.getHome = catchAsync(async (req, res) => {
  const headerData = generateHeaderData(req.isAuthenticated(), req.user);
  const problems = await Problem.find().lean();
  const problemData = problems.map(problem => {
    const problemRef = `/problems/${problem.id}`;
    return { problemRef, ...problem };
  });

  res.render('index', { problemData, ...headerData });
});

