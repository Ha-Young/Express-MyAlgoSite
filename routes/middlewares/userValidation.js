function validateUser(req, res, next) {
  console.log(req.user);
  if (!req.user) {
    res.redirect('/login');

    return;
  }

  next();
}

exports.validateUser = validateUser;
