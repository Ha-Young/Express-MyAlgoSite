function validateUser(req, res, next) {
  if (!req.user) {
    res.redirect('/login');

    return;
  }

  next();
}

exports.validateUser = validateUser;
