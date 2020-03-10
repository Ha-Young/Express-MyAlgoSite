const passport = require('passport');

const getLogin = (req, res, next) => {
  res.render('login');
};

const getLogout = (req, res, next) => {
  req.logOut();
  res.redirect('/');
};

const getGithubLogin = passport.authenticate('github');

const getGithubCallback = (req, res, next) => {
  res.redirect('/');
}
module.exports = { getLogin, getLogout, getGithubLogin, getGithubCallback };
