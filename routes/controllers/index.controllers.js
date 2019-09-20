const passport = require('passport');
const User = require('../../models/User');
const Problem = require('../../models/Problem');
const objectId = require('mongoose').Types.ObjectId;

exports.getProblemList = async (req, res, next) => {
  if (req.cookies.codeCookie) {
    res.clearCookie('codeCookie');
  }
  try {
    if (!objectId.isValid(Number(req.user.id))) {
      next();
    }

    const target = await User.findOne({ id: Number(req.user.id) });
    if (target) {
      Problem.find(function(error, problem) {
        if (error) {
          throw new Error(error.message);
        }
        res.render('index', {
          length: problem.length,
          problem: problem,
          username: req.user.username,
          collect: target.collect_problem
        });
      });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      next();
    } else {
      next(error);
    }
  }
};

exports.login = async (req, res, ne2xt) => {
  res.render('login');
};

exports.loginGithub = passport.authenticate('github');

exports.githubCallback = passport.authenticate('github', {
  failureRedirect: '/login',
  sucessRedirect: '/'
});

exports.logOut = (req, res) => {
  req.logOut();
  res.status(301).redirect('/login');
};
