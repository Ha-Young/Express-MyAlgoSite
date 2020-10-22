exports.renderLoginPage = (req, res, next) => {
  res.status(200).render('login');
};

exports.logout = (req, res, next) => {
  req.logOut();
  res.status(302).redirect('/login');
};
