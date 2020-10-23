function validateUser(req, res, next) {
  if (!req.user) {
    res.status(302).redirect('/login');

    return;
  }

  next();
}

exports.validateUser = validateUser;
