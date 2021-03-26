const Problem = require('../models/Problem');
const catchAsync = require('../middlewares/catchAsync');
const generateStatusData = require('../utils/generateStatusData');

exports.getHome = catchAsync(async (req, res) => {
  const headerData = generateStatusData(req.isAuthenticated(), req.user);
  const problems = await Problem.find().lean();
  const problemData = problems.map(problem => {
    const problemRef = `/problems/${problem.id}`;
    return { problemRef, ...problem };
  });

  res.render('index', { problemData, ...headerData });
});

