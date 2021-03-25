

module.exports.redirectToHome = function redirectToHome(req, res) {
  res.redirect("/");
}

module.exports.onlyAuthorizedAllowed = function onlyAuthorizedAllowed(req, res, next) {
  if (!req.user) return res.redirect("/");

  next();
}
