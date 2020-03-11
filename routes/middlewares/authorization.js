function verifyLogin(req, res, next) {
  if (req.user) {
    next();
  } else {
    const err = new Error();
    err.status = 403;
    err.message = 'User is not logged in';
    next(err);
  }
}

exports.verifyLogin = verifyLogin;
