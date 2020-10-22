const authenticateUser = (req, res, next) => {
  const isLoggedIn = req.isAuthenticated();

  isLoggedIn ? next() : res.status(301).redirect('/login');
};

module.exports = authenticateUser;
