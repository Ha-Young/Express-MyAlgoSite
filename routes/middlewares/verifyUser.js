function verifyUser(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect('/login');
  }
}

exports.verifyUser = verifyUser;
