exports.handleLogout = function (req, res, next) {
  res.clearCookie("jwt").redirect("/");
};
