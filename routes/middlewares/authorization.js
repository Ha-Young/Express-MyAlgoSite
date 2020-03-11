function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(302).redirect('/auth/github');
}

exports.ensureAuthenticated = ensureAuthenticated;
