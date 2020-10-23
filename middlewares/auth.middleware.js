const authenticateUser = (req, res, next) => {
  const isLoggedIn = req.isAuthenticated();

  isLoggedIn ? next() : res.status(200).redirect('/login');
};

module.exports = authenticateUser;
