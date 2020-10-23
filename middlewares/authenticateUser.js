function authenticateUser(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.status(301).redirect('/login');
}

module.exports = authenticateUser;
