const passport = require('passport');

exports.getLoginPage = (req, res) => {
  res.render('login', { title: '바닐라코딩' });
};

exports.gitHubLogin = passport.authenticate('github');

exports.gitHubLoginCallback = passport.authenticate('github', {
  failureRedirect: '/login',
  successRedirect: '/'
});

exports.doLogout = (req, res) => {
  req.logout();
  res.status(301).redirect('/login');
};
