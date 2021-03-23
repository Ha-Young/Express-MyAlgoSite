function requiresLogin(req, res, next) {
  if (req.session && req.session.passport) {
    next();
  } else {
    res.redirect("/login");
  }
}

exports.requiresLogin = requiresLogin;