const authenticateUser = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next();
    // res.status(301).redirect('/login');
  }
};

module.exports = authenticateUser;
