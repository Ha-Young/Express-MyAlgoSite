const passport = require('passport');
const User = require('../../models/User');
const Problem = require('../../models/Problem');

exports.getProblemList = async (req, res, next) => {
  try {
    const currentUser = await User.findOne({ _id : req.user._id });
    const problems = await Problem.find();
    const userSuccess = currentUser.success_problems.length;

    res.render('index', {
      title: '바닐라코딩',
      problems,
      userProfileImg: currentUser.profile_img_url,
      userName: currentUser.username,
      userSuccess,
      userChallenging: problems.length - userSuccess
    });
  } catch (error) {
    next();
  }
};

exports.getLoginPage = (req, res, next) => {
  res.render('login', { title: '바닐라코딩' });
};

exports.gitHubLogin = passport.authenticate('github');

exports.gitHubLoginCallback = passport.authenticate('github', {
  failureRedirect: '/login',
  successRedirect: '/'
});

exports.doLogout = (req, res, next) => {
  res.clearCookie('writtenCode');
  req.logout();
  res.status(301).redirect('/login');
};
