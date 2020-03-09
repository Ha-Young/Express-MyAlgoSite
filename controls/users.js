const passport = require('passport');
const problems =  require('../models/sample_problems.json');

const getHome = (req, res, next) => {
  res.render('index', { problems });
};

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
module.exports = { getHome, getLogin, getLogout, getGithubLogin, getGithubCallback };
