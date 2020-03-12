function verifyLogin(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

exports.verifyLogin = verifyLogin;
