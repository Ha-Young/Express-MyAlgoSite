const Problem = require('../models/Problem');
const catchAsync = require('../middlewares/catchAsync');

exports.getHome = catchAsync(async (req, res, next) => {
  const problems = await Problem.find().lean();

  let status = {
    problems,
    user: '',
    signupStatus: 'signup',
    loginStatus: 'login',
    signupRef: '/auth/signup',
    loginRef: '/auth'
  };

  if (req.user) {
    status = {
      problems,
      user: req.user,
      signupStatus: '',
      loginStatus: 'logout',
      signupRef: '',
      loginRef: '/auth/logout',
    }
  }

  res.render('index', status);
});

