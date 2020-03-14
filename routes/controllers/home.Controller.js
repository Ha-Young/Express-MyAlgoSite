const passport = require('passport');
const Problem = require('../../models/Problem');
const error = require('../../libs/error');

exports.showIndex = async function (req, res, next) {
  try {
    const problems = await Problem.find();
    res.render('index', { problems });
  } catch (err) {
    next(new error.GeneralError(err.message));
  }
};

exports.showLogin = async function (req, res, next) {
  try {
    res.render('login');
  } catch (err) {
    next(new error.GeneralError(err.message));
  }
};

exports.logOut = async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.status(302).redirect('/login');
};

exports.handleGithub = passport.authenticate('github');

exports.handleGithubCallback = passport.authenticate('github', {
  failureRedirect: '/login',
  successRedirect: '/'
});
