function checkUser(req, res, next) {
  if (!req.user) return res.redirect('/login');

  next();
}

exports.checkUser = checkUser;
