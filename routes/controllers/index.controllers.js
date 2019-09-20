const passport = require('passport');
const User = require('../../models/User');
const Problem = require('../../models/Problem');

exports.getProblemList = async (req, res, next) => {
  if (req.cookies.codeCookie) {
    res.clearCookie('codeCookie');
  }
  try {
    const target = await User.findOne({ id: Number(req.user.id) });
    if (target) {
      Problem.find(function(err, problem) {
        if (err) {
          throw new Error(e.message);
        }
        res.render('index', {
          length: problem.length,
          problem: problem,
          username: req.user.username,
          collect: target.collect_problem
        });
      });
    }
  } catch (err) {
    next(err);
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
